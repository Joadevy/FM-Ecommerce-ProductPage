import data from './products.json' assert {type: 'json'};

/* --------------- Getting page elements --------------- */

const addCartBtn = document.getElementById('addToCart');
const cartBtn = document.getElementById('cart-btn');
const amountItems = document.getElementById('amount-items');
const main = document.querySelector('.main');

/* --------------- Event listeners --------------- */

addCartBtn.addEventListener('click',()=>{addToCart(parseInt(amountItems.textContent),0)})
cartBtn.addEventListener('click',()=>renderCart())

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
                    "numberOfUnits":amount
                });
        }
        renderAmountCartItems();
    }
}


function renderAmountCartItems(){
    // If not exists the bubble container, then creates it
    if(cartBtn.parentElement.lastElementChild.classList !== 'user-menu__cart-bubble'){
        const bubble = document.createElement('div');
        bubble.classList.add('user-menu__cart-bubble');
        cartBtn.parentElement.appendChild(bubble);
    }
    let amountOfCartUnits = 0;
    // Acumulating all of the units of the cart products.
    cart.forEach(product => {
        amountOfCartUnits+=product.numberOfUnits
    })
    console.log(amountOfCartUnits);
    // Rendering the cart amount of units into the bubble.
    cartBtn.parentElement.lastElementChild.textContent = amountOfCartUnits;
    console.log(cart)
}

const cleanCart = (id) => {
    // Removing the product for the array, it removes all the units of this type of.
    cart.splice(id,1);
}

const renderCart = () => {
    let cart = createCart();
    main.appendChild(cart);
}

function createCart(){
    // Creating the container element
    const containerCart = document.createElement('div');
    containerCart.classList.add('cart')

    // Creating the templates for the cart & product
    const TemplateCart = document.getElementById('cart-template');
    const TemplateProduct = document.getElementById('product-template');

    // Creating a clone of the cart template.
    const cartClone = TemplateCart.content.cloneNode(true); 

    // Appending the cartClone to the HTML document.
    containerCart.appendChild(cartClone);
    const containerProducts = containerCart.querySelector('.cart__products');

    cart.forEach((item) => {
        // Creating a product by their template
        const productClone = TemplateProduct.content.cloneNode(true);
        // Adding the information
        productClone.querySelector('.cart__img-product').src = item.imgSrc;
        productClone.querySelector('.cart__product-description').textContent = item.name;
        // Appending each product into the container
        containerProducts.appendChild(productClone);
    })

    return containerCart;
}



