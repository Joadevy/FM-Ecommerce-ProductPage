/* --------------- Getting page elements --------------- */
const toggleMenuElement = document.getElementById('toggle-menu');
const navbarMenuElement = document.getElementById('navbar-menu');

/* --------------- Event listeners --------------- */

toggleMenuElement.addEventListener('click', () => {
    navbarMenuElement.classList.toggle('navbar-menu--show');
    navbarMenuElement.classList.contains('navbar-menu--show') 
    ? toggleMenuElement.firstElementChild.src = 'src/assets/icon/icon-close.svg'
    : toggleMenuElement.firstElementChild.src = 'src/assets/icon/icon-menu.svg';
})