var MenuModule = angular.module("MenuModule", ["ngAnimate"]);

MenuModule.controller("MenuController", function ($http, $scope) {
    $http.get("/Data/menuData.json").then(
        function (response) {
            $scope.MenuData = response.data; 
        },
        function (error) {
            console.error("Error fetching menu data:", error);
        }
    ); 

    $scope.addToCart = function addToCart(item) {
        let cart = JSON.parse(localStorage.getItem("orders")) || [];

        // Find if the item already exists in the cart
        let existingItem = cart.find(cartItem => cartItem.id === item.id);
        /* console.log(existingItem);*/

        if (existingItem) {
            // Increase quantity if it already exists
            existingItem.quantity += 1;
        } else {
            // Add new item with quantity = 1
            cart.push({ ...item, quantity: 1 });
        }

        // Save back to localStorage
        localStorage.setItem("orders", JSON.stringify(cart));
        CountOrdersInCart();
    }

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
 

