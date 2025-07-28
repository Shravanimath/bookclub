document.addEventListener('DOMContentLoaded', () => {
    const taskbook = document.getElementById('taskbook');
    const addpopup = document.querySelector('.addpopup');
    const closebutton = document.getElementById('closebutton');
    const savebutton = document.getElementById('savebutton');
    const entertitle = document.getElementById('entertitle');
    const enterwritter = document.getElementById('enterwritter');
    const tasklibrary = document.querySelector('.tasklibrary');

    const category = 'task';

    function loadBooks() {
        const books = JSON.parse(localStorage.getItem(category)) || [];
        books.forEach(book => {
            createBookElement(book.title, book.author, book.id);
        });
    }

    function saveBooks(books) {
        localStorage.setItem(category, JSON.stringify(books));
    }

    function createBookElement(title, author, id) {
        const bookElement = document.createElement('div');
        bookElement.className = 'book';
        bookElement.dataset.id = id;
        bookElement.innerHTML = `
            <h3 class="book-title">${title}</h3>
            <p>by ${author || 'Unknown'}</p>
            <button class="delete-btn"></button>
        `;

        bookElement.addEventListener('click', (e) => {
            if (!e.target.classList.contains('delete-btn')) {
                localStorage.setItem('currentBookId', id);
                window.location.href = 'taskbook.html?id=' + id + '&category=' + category;
            }
        });

        bookElement.querySelector('.delete-btn').addEventListener('click', (e) => {
            e.stopPropagation();
            deleteBook(id);
        });

        tasklibrary.insertBefore(bookElement, taskbook);
    }

    function deleteBook(id) {
        const books = JSON.parse(localStorage.getItem(category)) || [];
        const updatedBooks = books.filter(book => book.id !== id);
        saveBooks(updatedBooks);

        document.querySelector(`.book[data-id="${id}"]`).remove();
    }

    taskbook.addEventListener('click', () => {
        addpopup.classList.add('active');
    });

    closebutton.addEventListener('click', () => {
        addpopup.classList.remove('active');
    });

    savebutton.addEventListener('click', () => {
        console.log("SAVED");
        const title = entertitle.value.trim();
        const author = enterwritter.value.trim();

        if (!title) {
            alert("Please enter a title!");
            return;
        }

        const books = JSON.parse(localStorage.getItem(category)) || [];
        const newBook = {
            id: Date.now().toString(),
            title,
            author,
            createdAt: new Date().toISOString()
        };

        books.push(newBook);
        saveBooks(books);
        createBookElement(title, author, newBook.id);

        entertitle.value = '';
        enterwritter.value = '';
        addpopup.classList.remove('active');
    });

    loadBooks();
});
