const navbar=document.querySelector('.navbar');

window.addEventListener('scroll',()=>{
    if(window.scrollY>50){
        navbar.classList.add('scrolled');
    }

    else{
        navbar.classList.remove('scrolled');
    }
});

const popup=document.querySelector('.popup');
const signin=document.querySelector('#signin');
const closebutton=document.querySelector('#closebutton');

signin.addEventListener('click',()=>{
    popup.classList.add('active');
});

closebutton.addEventListener('click',()=>{
    popup.classList.remove('active');
});

