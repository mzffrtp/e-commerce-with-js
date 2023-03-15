
const categoryList = document.querySelector(".categoryList");
const productList = document.querySelector(".productList");

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
        <p>${product.title}</p>
        <p>${product.category.name}</p>
        <div class="productInfo">
            <span>${product.price}$</span>
            <button>Add to cart</button>
        </div>
    </div>
        `;
        productList.appendChild((productDiv));
    }))
    .catch((err)=>console.log(err))
}