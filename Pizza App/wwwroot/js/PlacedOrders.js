let orderContainer = document.querySelector(".placed-order-container");
let stepProgressbar = document.querySelector(".order-status-tracker");
let noOrders = document.querySelector(".no-orders");
let interval;
//step progress bar elements
let firstStep = document.querySelector(".progress-item:nth-child(1)");
let secondStep = document.querySelector(".progress-item:nth-child(2)");
let thirdStep = document.querySelector(".progress-item:nth-child(3)");
 
var app = angular.module("OrdersModule", ["ngAnimate"]);

app.controller("OrdersController", function ($scope) {
      
    $scope.TotalPrice = 0;
    $scope.Orders = JSON.parse(localStorage.getItem("placedOrder"));     
});

window.addEventListener("DOMContentLoaded", function () {
    let data = JSON.parse(localStorage.getItem("placedOrder"));
    UpdateStepProgressBar();
    if (data == null) {
        noOrders.style.display = "block";
        orderContainer.style.display = "none";
        stepProgressbar.style.display = "none";
       
    }
    else {
        noOrders.style.display = "none";
        orderContainer.style.display = "block"; 
        interval = setInterval(UpdateStepProgressBar, 1000); 
    } 
});
 

function UpdateStepProgressBar() {
    let statusBarData = JSON.parse(localStorage.getItem("statusSchedule")) || [];

    // Get current time in HH:MM:SS format
    const now = new Date();
    const currentTime = now.toTimeString().split(" ")[0];

    // Proceed only if there's at least one scheduled status
    if (statusBarData.length > 0 && currentTime >= statusBarData[0].time) {
        // Remove the first item
        statusBarData.shift();

        // Update localStorage
        localStorage.setItem("statusSchedule", JSON.stringify(statusBarData));
    }

    // Handle progress based on how many are left
    if (statusBarData.length === 3) {
        if (!firstStep.classList.contains("line-blue")) {
            firstStep.classList.add("line-blue");
        }

    } else if (statusBarData.length === 2) {

        if (!secondStep.classList.contains("line-blue")) {
            firstStep.classList.add("line-blue");
            secondStep.classList.add("line-blue");
        }
    } else if (statusBarData.length === 1) {

        if (!thirdStep.classList.contains("line-blue")) {
            firstStep.classList.add("line-blue");
            secondStep.classList.add("line-blue");
            thirdStep.classList.add("line-blue");
        }
    }
    else if (statusBarData.length == 0) { 
        clearInterval(interval);
        stepProgressbar.style.display = "none";
        noOrders.style.display = "block";
        orderContainer.style.display = "none";
        localStorage.removeItem("placedOrder")
        localStorage.removeItem("statusSchedule")
    }
}
