
const categoryList = document.querySelector(".categoryList");
const productList = document.querySelector(".productList");
const cartBtn = document.querySelector("#cart");
const closeBtn = document.querySelector("#closeBtn");
const modal = document.querySelector(".modalWrapper");
const cartItemWrapper = document.querySelector(".cartItemWrapper");
const total = document.querySelector("#total");

document.addEventListener("DOMContentLoaded", ()=>{
    fetchCategories ();
    fetchProducts ();
});

function fetchCategories () {
    fetch("https://api.escuelajs.co/api/v1/categories")
    .then((res) => res.json())
    .then((data) => data.slice(1,4).forEach((category) => {
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

function fetchProducts () {
    fetch("https://api.escuelajs.co/api/v1/products")
    .then((res)=> res.json())
    .then((data) => data.slice(1, 21).forEach((product)=>{
        const productDiv = document.createElement("div");
        productDiv.classList.add("product")
        productDiv.innerHTML = `<div class="product">
        <img src="${product.images[0]}">
        <h5>${product.title}</h5>
        <p>${product.category.name}</p>
        <div class="productInfo">
            <span>${product.price}$</span>
            <button onclick="addtoCart({name:'${product.title}', id:'${product.id}',price:'${product.price}', amount:1})">Add to cart</button>
        </div>
        `;
        productList.appendChild((productDiv));
    }))
    .catch((err)=>console.log(err))
}



const cart = []
let totalPrice = 0;

function listCart () {
    cart.forEach((item)=> {
        console.log(item);
        const cartItems = document.createElement("div")
        cartItems.classList.add("cartItem");
        cartItems.innerHTML = `<h4>${item.name}</h4>
        <h4>${item.price} $</h4>
        <p>${item.amount}</p>`;
        cartItemWrapper.appendChild(cartItems);
        totalPrice += Number(item.price)*item.amount
        console.log(totalPrice);
    })

    total.innerText = totalPrice

}
cartBtn.addEventListener("click", ()=>{
    toggleCart(),
    listCart();
})
closeBtn.addEventListener("click", ()=>{
    toggleCart();
    cartItemWrapper.innerHTML = "";

})

function toggleCart () {
    modal.classList.toggle("active")
}

function addtoCart(productstoCart) {
const productInCart = cart.find((i)=>i.id === productstoCart.id)
if(productInCart){
    productInCart.amount += 1;
} else{
    cart.push(productstoCart)
}}