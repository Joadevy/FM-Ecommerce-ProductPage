/* --------------- Getting page elements --------------- */
const toggleMenuElement = document.getElementById('toggle-menu');
const navbarMenuElement = document.getElementById('navbar-menu');

/* --------------- Event listeners --------------- */

toggleMenuElement.addEventListener('click', () => {
    navbarMenuElement.classList.toggle('navbar-menu--show');
    if(navbarMenuElement.classList.contains('navbar-menu--show')){
        toggleMenuElement.firstElementChild.src = 'src/assets/icon/icon-close.svg';
    } else {
        toggleMenuElement.firstElementChild.src = 'src/assets/icon/icon-menu.svg';
    }
})