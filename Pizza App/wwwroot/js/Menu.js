 
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

    $scope.selectedSize = "";

    $scope.filterPizzas = function (pizza) {
        console.log(pizza);
        let matchesSearch = !$scope.search || pizza.pizzaName.toLowerCase().includes($scope.search.toLowerCase());
        let matchesSize = !$scope.selectedSize || pizza.size === $scope.selectedSize;
        return matchesSearch && matchesSize;
    };

    $scope.addToCart = function addToCart(item) {
        let cart = JSON.parse(localStorage.getItem("orders")) || [];

        let existingItem = cart.find(cartItem => cartItem.id === item.id);

        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({ ...item, quantity: 1 });
        }

        localStorage.setItem("orders", JSON.stringify(cart));
        CountOrdersInCart();
    };
});

window.addEventListener("DOMContentLoaded", CountOrdersInCart);

function CountOrdersInCart() {
    let orders = JSON.parse(localStorage.getItem("orders"));
    let ordersCount = document.querySelector(".orders-number");

    if (Array.isArray(orders)) {
        ordersCount.innerHTML = orders.length;
    } else {
        console.log("No orders in localStorage or data is not an array.");
    }
}

