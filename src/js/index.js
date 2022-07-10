import data from './data.json' assert {type: 'json'};

/* --------------- Getting page elements --------------- */
const toggleMenuElement = document.getElementById('toggle-menu');
const navbarMenuElement = document.getElementById('navbar-menu');

 // Buttons next/previous of the big image.
const previousbtn = document.querySelector('.big-container__option-previous');
const previousbtnlabel = document.querySelector('.big-container__img-previous');
const nextbtn = document.querySelector('.big-container__option-next');
const nextbtnlabel = document.querySelector('.big-container__img-next');

// Add/remove amount
const addbtn = document.getElementById('addbtn');
const removebtn = document.getElementById('removebtn');
const amountItems = document.getElementById('amount-items');

// Images
const productImage = document.querySelector('.big-container__img');
const smallImages = document.querySelectorAll('.small-container__container-image');

/* --------------- Event listeners --------------- */

toggleMenuElement.addEventListener('click',() => displayMenu());
nextbtn.addEventListener('click',()=> updateGallery('next'));
previousbtn.addEventListener('click',()=> updateGallery('previous'));
addbtn.addEventListener('click', () => updateAmountItems('add'))
removebtn.addEventListener('click',()=>updateAmountItems('minus'));
smallImages.forEach(image => image.addEventListener('click', (e) => updateSmallImages(e.target.id)));


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

// Updates the small images when the user clicks on one of them.
const updateSmallImages = (id) => {
    let index = id.split('').pop();
    productImage.src = data[index];
    focusOnSmallImg(id)
}

const focusOnSmallImg = (id) => {
    smallImages.forEach(image => {
        if (image.firstElementChild.id === id){
            image.firstElementChild.style.opacity = 0.25;
            image.style.border = '2px solid var(--primary-orange)';
        }
        else {
            image.firstElementChild.style.opacity = 1;
            image.style.border = 'none'
        }
    });
}

// Updates the amount of items to add to the cart
const updateAmountItems = (option) => {
    if (option === 'add'){
        amountItems.textContent++;
    } else if (option === 'minus' && amountItems.textContent>0){
        amountItems.textContent--;
    }
}


