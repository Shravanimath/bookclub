$(document).ready(function () {
    const urlParams = new URLSearchParams(window.location.search);
    const bookId = urlParams.get('id');
    const category = urlParams.get('category') || 'story'; 
    const books = JSON.parse(localStorage.getItem(category)) || [];
    const book = books.find(b => b.id === bookId);

    if (!book) {
        alert("Book not found!");
        window.location.href = "index.html";
        return;
    }

    if (!book.pages || book.pages.length === 0) {
        book.pages = [""];
        saveBooks(books);
    }

    const $flipbook = $('.flipbook');

    const add=document.querySelector('#add-page');

    add.addEventListener('click',()=>{
        book.pages.push('');
        saveBooks(books);
        rebuildFlipbook();
    });

    const deletepage=document.querySelector('#delete-page');

    deletepage.addEventListener('click',()=>{
        if(book.pages.length>1){
            book.pages.pop();
            saveBooks(books);
            rebuildFlipbook();
        }

        else{
            alert('Book must contain at least one page.')
        }
    })

    const backbutton=document.querySelector('#back-button');

    backbutton.addEventListener('click',()=>{
        window.location.href=`${category}.html`
    });

    function initializeFlipbook() {
        $flipbook.empty();

        $flipbook.append(`
            <div class="hard front-cover">
                <h1>${book.title || "Untitled"}</h1>
                <p>by ${book.author || "Unknown Author"}</p>
            </div>
            <div class="hard"></div>
        `);

        book.pages.forEach((content, index) => {
    $flipbook.append(`
        <div class="page">
            <div class="page-content" data-page="${index}">
                <textarea>${content}</textarea>
            </div>
        </div>
    `);
});

if (book.pages.length % 2 !== 0) {
    $flipbook.append(`<div class="page"></div>`);
}

        $flipbook.append(`
            <div class="hard"></div>
            <div class="hard back-cover">
                <h2>The End</h2>
            </div>
        `);

        setTimeout(() => {
            $flipbook.turn({
                width: 1000,
                height: 600,
                acceleration: true,
                autoCenter: true,
                pages: book.pages.length * 2 + 4
            });
        }, 50);
    }

    function rebuildFlipbook() {
        const currentPage = $flipbook.turn('page');
        $flipbook.turn('destroy');
        initializeFlipbook();
        setTimeout(() => {
            if (currentPage) {
                const newPage = Math.min(currentPage, $flipbook.turn('pages'));
                $flipbook.turn('page', newPage);
            }
        }, 100);
    }

    function saveBooks(updatedBooks) {
        localStorage.setItem(category, JSON.stringify(updatedBooks));
    }

    $(document).on('input', '.page-content textarea', function () {
        const pageIndex = $(this).parent().data('page');
        book.pages[pageIndex] = $(this).val();
        saveBooks(books);
    });

    initializeFlipbook();
});