const hamBugerBtn = document.querySelector(".ham-burger");
const closeBtn = document.querySelector(".close-btn");
const modal = document.querySelector(".modal");
const modalBackground = document.querySelector(".modal-background");

hamBugerBtn.addEventListener("click", function () {
    modal.classList.remove("hide-modal");
    modal.classList.add("show-modal");
});

closeBtn.addEventListener("click", function () {
    modal.classList.remove("show-modal");
    modal.classList.add("hide-modal");
});

modalBackground.addEventListener("click", function () {
    modal.classList.remove("show-modal");
    modal.classList.add("hide-modal");
});


window.addEventListener("load", function () {
    let loader = document.querySelector('.loader');

    loader.classList.add("loader-hidden");

    loader.addEventListener("transitioned", () => {
        document.body.removeChild(loader);
    });
});

 

window.addEventListener("DOMContentLoaded", CountOrdersInCart);


function CountOrdersInCart() {
    // Retrieve and parse the data from localStorage
    let orders = JSON.parse(localStorage.getItem("orders"));
    let ordersCount = document.querySelector(".orders-number");

    // Check if orders is an array and log the length
    if (Array.isArray(orders)) {
        ordersCount.innerHTML = orders.length;
    } else {
        console.log("No orders in localStorage or data is not an array.");
    }
}