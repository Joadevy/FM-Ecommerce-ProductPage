import data from './data.json' assert {type: 'json'};

/* --------------- Getting page elements --------------- */
const toggleMenuElement = document.getElementById('toggle-menu');
const navbarMenuElement = document.getElementById('navbar-menu');

 // Buttons next/previous of the big image.
const previousbtn = document.querySelector('.big-container__options-container-previous');
const previousbtnlabel = document.querySelector('.big-container__options-previous');
const nextbtn = document.querySelector('.big-container__options-container-next');
const nextbtnlabel = document.querySelector('.big-container__options-next');

const productImage = document.querySelector('.big-container__img');

/* --------------- Event listeners --------------- */

toggleMenuElement.addEventListener('click',() => displayMenu());
nextbtn.addEventListener('click',()=> updateGallery('next'));
previousbtn.addEventListener('click',()=> updateGallery('previous'))

/* --------------- General functions --------------- */

// Displays the mobile nav menu.
const displayMenu = () => {
    navbarMenuElement.classList.toggle('navbar-menu--show');
    navbarMenuElement.classList.contains('navbar-menu--show') 
    ? toggleMenuElement.firstElementChild.src = 'src/assets/icon/icon-close.svg'
    : toggleMenuElement.firstElementChild.src = 'src/assets/icon/icon-menu.svg';
}

// Uses the index from the file name to take reference of the current photo so it needs to keep the files names unmutable.
const updateGallery = (btn) => {
    let imageIndex = parseInt(productImage.src.split('/').pop().replace('.jpg', '').replace('image-product-', ''));
    if (btn === 'next' && imageIndex !==3){
        previousbtnlabel.style.opacity = 1; 
        nextbtnlabel.style.opacity = 1; 
        productImage.src = data[imageIndex+1];
        imageIndex+1 === 3 ? nextbtnlabel.style.opacity = 0.2 : '';
    } else if (btn === 'previous' && imageIndex !==0){
        nextbtnlabel.style.opacity = 1; 
        previousbtnlabel.style.opacity = 1; 
        productImage.src = data[imageIndex-1];
        imageIndex-1 === 0 ? previousbtnlabel.style.opacity = 0.2 : '';
    } 
}


