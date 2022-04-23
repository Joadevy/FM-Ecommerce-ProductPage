import data from './products.json' assert {type: 'json'};

/* --------------- Getting page elements --------------- */

const addCartBtn = document.getElementById('addToCart');
const cartBtn = document.getElementById('cart-btn');
const amountItems = document.getElementById('amount-items');

/* --------------- Event listeners --------------- */

addCartBtn.addEventListener('click',()=>{addToCart(parseInt(amountItems.textContent),0)})
cartBtn.addEventListener('click',()=>{console.log('CARRITO PADRINO')})

/* --------------- Global variables --------------- */
let cart = [];

/* --------------- General functions --------------- */

function addToCart(amount,id){
    if (amount>0){
            // check if product already exist in the cart
        if(cart.some((item) => item.id === id)){
            const item = data.find((product)=> product.id === id); // Looking for the item in the products.json
            for (let product in cart){
                cart[product].id === item.id ? cart[product].numberOfUnits+=amount : '';
            }
        } else {
            const item = data.find((product)=>product.id === id);
                cart.push({
                    ...item,
                    "numberOfUnits":1
                });
        }
        renderAmountCartItems();
        updateCart();
    }
}


function updateCart(){

}


function renderAmountCartItems(){
    console.log(cartBtn.parentElement)
    // If not exists the container, then creates it
    if(cartBtn.parentElement.lastElementChild.classList !== 'user-menu__cart-bubble'){
        const bubble = document.createElement('div');
        bubble.classList.add('user-menu__cart-bubble');
        cartBtn.parentElement.appendChild(bubble);
    }
    let amountOfCartUnits = 0;
    cart.forEach(product => {
        amountOfCartUnits+=product.numberOfUnits // Acumulating all of the units of the cart products.
    })
    console.log(amountOfCartUnits);
    cartBtn.parentElement.lastElementChild.textContent = amountOfCartUnits // 
}



const cleanCart = () => {
}

const renderCart = () => {
    let cart = createCart();
}

const createCart = () => {
    let cart = document.createElement('div');
    let closebtn = document.createElement('button');
    let product = document.createElement('div');
    let checkoutbtn = document.createElement('button');
    return cart.append(closebtn,product,checkoutbtn);
}



