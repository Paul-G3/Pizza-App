 
var app = angular.module("CartModule", ["ngAnimate"]);
app.controller("CartController", function ($scope) {
    // Retrieve data from localStorage and parse it
    let storedCarts = JSON.parse(localStorage.getItem("orders")) || [];
      
    // Remove $$hashKey from each object
    $scope.carts = storedCarts.map(cart => {
        let cleanCart = { ...cart }; // Create a shallow copy
        delete cleanCart.$$hashKey;  // Remove the AngularJS hash key
        return cleanCart;
    });    

    $scope.AddingMore = function (item) {
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

        $scope.carts = cart;

        // Force the UI update
        $scope.$applyAsync(); 
    }

    $scope.RemoveFromCart = function (item) {
        let cart = JSON.parse(localStorage.getItem("orders")) || [];

        // Find if the item already exists in the cart
        let existingItem = cart.find(cartItem => cartItem.id === item.id);
        /* console.log(existingItem);*/

        if (existingItem) {
            if (existingItem.quantity > 1) {
                // Decrease quantity if it's more than 1
                existingItem.quantity -= 1;
            } else {
                // Remove the item entirely if quantity is 1 or less
                cart = cart.filter(cartItem => cartItem.id !== item.id);
            }
        }

        // Save back to localStorage
        localStorage.setItem("orders", JSON.stringify(cart));
        CountOrdersInCart();

        $scope.carts = cart;

        // Force the UI update
        $scope.$applyAsync();
    }
});

window.addEventListener("DOMContentLoaded", CountOrdersInCart);

function CountOrdersInCart() {
    // Retrieve and parse the data from localStorage
    let orders = JSON.parse(localStorage.getItem("orders")); //convert from string to json
    let ordersCount = document.querySelector(".orders-number");

    // Check if orders is an array and display the length
    if (Array.isArray(orders)) {
        ordersCount.innerHTML = orders.length;
    } else {
        console.log("No orders in localStorage or data is not an array.");
    }
}

 