
const categoryList = document.querySelector(".categoryList");
const productList = document.querySelector(".productList");
const cartBtn = document.querySelector("#cart");
const closeBtn = document.querySelector("#closeBtn");
const modal = document.querySelector(".modalWrapper");
const cartItemWrapper = document.querySelector(".cartItemWrapper");
const total = document.querySelector("#total");
const emptyCart = document.querySelector("#emptyCart");

// fetching actions
document.addEventListener("DOMContentLoaded", () => {
    fetchCategories();
    fetchProducts();
});

function fetchCategories() {
    fetch("https://api.escuelajs.co/api/v1/categories")
        .then((res) => res.json())
        .then((data) => data.slice(1, 4).forEach((category) => {
            const categoryDiv = document.createElement("div");
            categoryDiv.classList.add("category")
            categoryDiv.innerHTML = `
        <img src="${category.image}">
        <span>${category.name}</span>
        `;
            categoryList.appendChild(categoryDiv);

        }))
        .catch((err) => console.log(err));
}

function fetchProducts() {
    fetch("https://api.escuelajs.co/api/v1/products")
        .then((res) => res.json())
        .then((data) => data.slice(1, 21).forEach((product) => {
            const productDiv = document.createElement("div");
            productDiv.classList.add("product")
            productDiv.innerHTML = `<div class="product">
        <img src="${product.images[0]}">
        <h5>${product.title}</h5>
        <p>${product.category.name}</p>
        <div class="productInfo">
            <span>${product.price}$</span>
            <button id="addtoCart" onclick="addtoCart({name:'${product.title}', id:'${product.id}',price:'${product.price}', amount:1})">Add to cart</button>
        </div>
        `;
            productList.appendChild((productDiv));
        }))
        .catch((err) => console.log(err))
}

//cart actions
const cart = []
let totalPrice = 0;

//cart listing function
function listCart() {
    cart.forEach((item) => {
        const cartItems = document.createElement("div")
        cartItems.classList.add("cartItem");
        cartItems.innerHTML = `<h4>${item.name}</h4>
        <h4><span>${item.price}</span> $</h4>
        <p>${item.amount}</p>
        <img id="deleteItem"
        src="./imgs/empty.png"
        style="width:25px"/>
        `;
        cartItemWrapper.appendChild(cartItems);
        totalPrice += Number(item.price) * item.amount
    })
    total.innerText = totalPrice
}
//clicking on cart button
cartBtn.addEventListener("click", () => {
    toggleCart(),
    listCart();
})
//clicking on close button in cart
closeBtn.addEventListener("click", () => {
    toggleCart();
    cartItemWrapper.innerHTML = "";
})
//clicking on empty cart button
emptyCart.addEventListener("click", () => {
    cartItemWrapper.remove();
    total.innerText = 0


})

// opening and closing cart
function toggleCart() {
    modal.classList.toggle("active")
}

// adding products to cart
function addtoCart(productstoCart) {
    const productInCart = cart.find((i) => i.id === productstoCart.id)
    if (productInCart) {
        productInCart.amount += 1;
    } else {
        cart.push(productstoCart)
    }
}

// removing cart item and reducing prize

cartItemWrapper.addEventListener("click", handleClick)

function handleClick(e) {
    const item = e.target;
    if (item.id === "deleteItem") {
        const willBeRemoved = item.parentElement;
        willBeRemoved.remove();

        var deletedPrice = willBeRemoved.querySelector("span").innerText;

        totalPrice -= deletedPrice;
        total.innerText = totalPrice

    }
}