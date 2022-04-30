import data from './products.json' assert {type: 'json'};

/* --------------- Global variables --------------- */
let cart = [];

/* --------------- Getting page elements --------------- */

const addCartBtn = document.getElementById('addToCart');
const cartBtn = document.getElementById('cart-btn');
const amountItems = document.getElementById('amount-items');
const main = document.querySelector('.main');

/* --------------- Event listeners --------------- */

addCartBtn.addEventListener('click',()=>{addToCart(parseInt(amountItems.textContent),0)});
cartBtn.addEventListener('click',()=>renderCart(cart));

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
        renderAmountCartItems(cart);
    }
    // If the cart is displayed on the screen.
    let mainNodes = main.children;
    let cartExist = mainNodes.namedItem("cart");
    if(cartExist){
        uploadCartRender(cart);
    }  
}


function renderAmountCartItems(cart){
    // If not exists the bubble container, then creates it
    if(!cartBtn.parentElement.lastElementChild.classList.contains('user-menu__cart-bubble')){
        const bubble = document.createElement('div');
        bubble.classList.add('user-menu__cart-bubble');
        cartBtn.parentElement.appendChild(bubble);

        let amountOfCartUnits = 0;
        // Acumulating all of the units of the cart products.
        cart.forEach(product => {
            amountOfCartUnits+=product.numberOfUnits
        })
        // Rendering the cart amount of units into the bubble.
        cartBtn.parentElement.lastElementChild.textContent = amountOfCartUnits;
    } 

    // Updating the bubble number if there are already items in the cart.
    else if (cartBtn.parentElement.lastElementChild.classList.contains('user-menu__cart-bubble') && cart.length>0){
        let amountOfCartUnits = 0;
        // Acumulating all of the units of the cart products.
        cart.forEach(product => {
            amountOfCartUnits+=product.numberOfUnits
        });
        document.querySelector('.user-menu__cart-bubble').textContent = amountOfCartUnits;
    }

    // If the cart doesn't have products && the bubble notification is on the screen
    else if (cartBtn.parentElement.lastElementChild.classList.contains('user-menu__cart-bubble') && cart.length == 0){
        document.querySelector('.user-menu__cart-bubble').remove();
    }
}

function createCart(cart){
    let mainNodes = main.children;
    let cartExist = mainNodes.namedItem("cart");
    // Checking if the cart doesn't exist in the HTML.
    if (cartExist === null){
        // Creating the container element
        const containerCart = document.createElement('div');
        containerCart.classList.add('cart');
        containerCart.setAttribute("id","cart");

        // Creating the templates for the cart & product
        const TemplateCart = document.getElementById('cart-template');
        const TemplateProduct = document.getElementById('product-template');

        // Creating a clone of the cart template.
        const cartClone = TemplateCart.content.cloneNode(true); 

        // Appending the cartClone to the HTML document.
        containerCart.appendChild(cartClone);

        // Selecting elements from the containerCart
        const containerProducts = containerCart.querySelector('.cart__products');

        // If there are at least one item in the cart
        if (cart.some(item => item)){
            // Adding the checkout to the button of the cart.
            containerCart.querySelector(".cart__checkout").textContent = "Checkout";
            containerCart.querySelector(".cart__checkout").classList.remove("empty");
            cart.forEach((item) => {
                // Creating a product by their template
                const productClone = TemplateProduct.content.cloneNode(true);
                // Adding the information
                productClone.querySelector('.cart__img-product').src = item.imgSrc;
                let totalPrice = item.price * item.numberOfUnits;
                productClone.querySelector('.cart__product-description').innerHTML = item.name + ' $' + item.price + ' x ' + item.numberOfUnits + ' ' + `<span class="cart__product-description--bolder">$${totalPrice}</span>`
                productClone.querySelector('.cart__delete-product').onclick = function(){
                    // This should cause bugs (but for this solution works)
                    cart.splice(item.id,1);
                    uploadCartRender(cart);
                    renderAmountCartItems(cart);
                };
                // Appending each product into the container
                containerProducts.appendChild(productClone);
            })
        } else {
            containerCart.querySelector(".cart__checkout").textContent = "Your cart is empty.";
            containerCart.querySelector(".cart__checkout").classList.add("empty");
        }
        return containerCart;
    } else {
        // if the cart is already displayed on the screen.
        cartExist.remove();
    }
} 

const renderCart = (cart) => {
    let cartRender = createCart(cart);
    // If there is something in cartRender (it means that the cart isn't already in the HTMl)
    if (cartRender){
        main.appendChild(cartRender);
    }
}

function uploadCartRender(cart){
    // Checking if there is something in the cart.
    if (cart.some(item=>item)){
    const TemplateProduct = document.getElementById('product-template');
    const containerProducts = document.createElement('div');
    containerProducts.classList.add('cart__products');
    containerProducts.setAttribute("id","cart__products");
        cart.forEach(item => {
            let mainNodes = document.querySelector('.cart').children;
            let nodeProducts = mainNodes.namedItem("cart__products");
            // If the cart is already rendered, only updates the data.
            if(nodeProducts){
                document.querySelector('.cart__img-product').src = item.imgSrc;
                document.querySelector('.cart__product-description').textContent = item.name;
            }  else {
                // Creating a product by their template
                const productClone = TemplateProduct.content.cloneNode(true);
                // Adding the information
                productClone.querySelector('.cart__img-product').src = item.imgSrc;
                productClone.querySelector('.cart__product-description').textContent = item.name;
                productClone.querySelector('.cart__delete-product').onclick = function(){
                    // This should cause bugs (but for this solution works)
                    cart.splice(item.id,1);
                    uploadCartRender(cart);
                    renderAmountCartItems(cart);
                }; 
                // Updating the button to checkout
                document.querySelector(".cart__checkout").textContent = "Checkout"; 
                document.querySelector(".cart__checkout").classList.remove("empty");
                containerProducts.appendChild(productClone);
            }
        })
    // Appending the products into the HTML.
    document.getElementById('cart').insertBefore(containerProducts,document.querySelector('.cart__checkout'));
    } else { // If there isn't something in the cart
        document.querySelector('.cart__products').remove();
        document.querySelector(".cart__checkout").textContent = "Your cart is empty.";
        document.querySelector(".cart__checkout").classList.add("empty");
    }
}



