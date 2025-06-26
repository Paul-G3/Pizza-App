var app = angular.module("CartModule", ["ngAnimate"]);

app.controller("CartController", function ($scope) {
    // Retrieve data from localStorage and parse it
    let cart = JSON.parse(localStorage.getItem("orders")) || [];
    let storedCarts = JSON.parse(localStorage.getItem("orders")) || [];
      
    // Remove $$hashKey from each object
    $scope.carts = storedCarts.map(cart => {
        let cleanCart = { ...cart }; // Create a shallow copy
        delete cleanCart.$$hashKey;  // Remove the AngularJS hash key
        return cleanCart;
    });    

    $scope.AddingMore = function (item) { 

        // Find if the item already exists in the cart
        let existingItem = cart.find(cartItem => cartItem.id === item.id); 

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
        CartTotalAmount() 

        $scope.carts = cart;

        // Force the UI update
        $scope.$applyAsync(); 
    }

    $scope.RemoveFromCart = function (item) { 

        // Find if the item already exists in the cart
        let cart = JSON.parse(localStorage.getItem("orders")) || [];
        let existingItem = cart.find(cartItem => cartItem.id === item.id); 

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
       

        $scope.carts = cart;
        CountOrdersInCart();
        CartTotalAmount() 
        // Force the UI update
        $scope.$applyAsync();
    } 
     
});


function CountOrdersInCart() { 
    let ordersCount = document.querySelector(".orders-number"); 
    let orders = JSON.parse(localStorage.getItem("orders")) || []; 

    if (Array.isArray(orders) && orders.length === 0) {
        cartMessage.style.display = "block";
    } else if (Array.isArray(orders)) {
        ordersCount.innerHTML = orders.length;
    }  

    CartTotalAmount();
}


function CartTotalAmount() {
    let totalDiv = document.querySelector(".total");
    let orders = JSON.parse(localStorage.getItem("orders")) || [];
    let total = 0;

    if(orders.length > 0)
    orders.forEach(order => {
        total += order.price * order.quantity;
    }); 

     
    if (totalDiv > 0) {
        totalDiv.textContent = "R" + total.toFixed(2);
    }
    else {

        totalDiv.textContent = "R " + total.toFixed(2);
    }
}

//modal code

let closeButtonModal = document.querySelector(".close-btn-modal-user");
let modalUserDetails = document.querySelector(".cart-modal");
let ModalBackground = document.querySelector(".modal-background");
let checkOut = document.querySelector(".checkout-btn");
let userModal = document.querySelector(".user-details-modal");
let PayementModal = document.querySelector(".payment-modal");
let closeButtonPaymentModal = document.querySelector(".close-btn-payment");
let PaymentBackButton = document.querySelector(".back");
let payNowButton = document.querySelector(".pay-now-btn");
let OkSUccessBtn = document.querySelector(".success-ok-btn");
let SuccessModal = document.querySelector(".order-placed-modal");
let cartMessage = document.querySelector(".cart-message");
let nextButton = document.querySelector(".next-button"); 

//inputs
let username = document.querySelector('.name-input');
let Surname = document.querySelector('.surname-input');
let email = document.querySelector('.email-input');
let confirmEmail = document.querySelector('.confirm-email-input');
let phoneNumber = document.querySelector('.phone-number-input');
let confirmPhoneNumber = document.querySelector('.confirm-phone-number-input');
let streetNumber = document.querySelector('.street-number-input');
let confirmStreetNumber = document.querySelector('.confirm-street-number-input'); 


//inputs for user details validation
let nameValidation = document.querySelector('.name-validation');
let surnameValidation = document.querySelector('.surname-validation');
let emailValidation = document.querySelector('.email-validation');
let confirmEmailValidation = document.querySelector('.confirm-email-validation');
let phoneNumberValidation = document.querySelector('.phoneNumber-validation');
let confirmPhoneNumberValidation = document.querySelector('.confirm-phoneNumber-validation');
let streetNumberValidation = document.querySelector('.street-number-validation');
let confirmStreetNumberValidation = document.querySelector('.confirm-street-number-validation');

//inputs for the payment modal
let cardHolderName = document.querySelector(".card-holder-name");
let cardNumber = document.querySelector(".card-number");
let expriryDate = document.querySelector(".expriry-date");
let cvvNumber = document.querySelector(".cvv-number");

//inputs for payment validation
let cardHolderValidation = document.querySelector(".card-holder-validation");
let cardNumberValidation = document.querySelector(".card-number-valiation");
let expiryValidation = document.querySelector(".expiry-date-validation");
let cvvValidation = document.querySelector(".cvv-validation");

//evennt listers 
window.addEventListener("DOMContentLoaded", CountOrdersInCart);

expriryDate.addEventListener("input", function () {
    let value = expriryDate.value.replace(/\D/g, ""); // Remove non-digits

    if (value.length >= 3) {
        expriryDate.value = value.slice(0, 2) + "/" + value.slice(2, 4);
    } else {
        expriryDate.value = value;
    }
});

payNowButton.addEventListener("click", function () {

    let paymentvalid = true;

    //validations
    if (cardHolderName.value.trim() == "") {//card holder validation
        cardHolderValidation.textContent = "This field is required. Enter Name";
        cardHolderValidation.classList.add("show-payment-validation");
        paymentvalid = false;
    } else if (!/^[A-Za-z]+$/.test(cardHolderName.value.trim())) {
        cardHolderValidation.textContent = "Card holder  name should contain letters only";
        cardHolderValidation.classList.add("show-payment-validation");
        paymentvalid = false;
    }
    else {
        cardHolderValidation.classList.remove("show-payment-validation");
    }

    if (cardNumber.value.trim() == "") {//card number validation validation
        cardNumberValidation.textContent = "This field is required. Enter card number";
        cardNumberValidation.classList.add("show-payment-validation");
        paymentvalid = false;
    } else if (!/^\d+$/.test(cardNumber.value.trim())) {
        cardNumberValidation.textContent = "Card number should contain numbers only.";
        cardNumberValidation.classList.add("show-payment-validation");
        paymentvalid = false;
    } else if (cardNumber.value.trim().length != 16)
    {
        cardNumberValidation.textContent = "Card number should 16 digits long.";
        cardNumberValidation.classList.add("show-payment-validation");
        paymentvalid = false;
    }
    else {
        cardNumberValidation.classList.remove("show-payment-validation");
    }

    if (expriryDate.value.trim() == "") {//expirty date validation
        expiryValidation.textContent = "This field is required.";
        expiryValidation.classList.add("show-payment-validation");
        paymentvalid = false;
    }
    else {
        expiryValidation.classList.remove("show-payment-validation");
    }

    if (cvvNumber.value.trim() === "") // cvv validation 
    {
        cvvValidation.textContent = "This field is requied";
        cvvValidation.classList.add("show-payment-validation");
        paymentvalid = false;
    }
    else if (cvvNumber.value.length !== 3) {
        cvvValidation.textContent = "Cvv must 3 digits long";
        cvvValidation.classList.add("show-payment-validation");
        paymentvalid = false;
    }
    else {
        cvvValidation.classList.remove("show-payment-validation");
    }

    if (paymentvalid) {
        PlaceOrder();
        initScheduledStatuses();
        PayementModal.style.display = "none";
        SuccessModal.style.display = "block";
    }
    
});

PaymentBackButton.addEventListener("click", function () { //back button
    PayementModal.style.display = "none";
    userModal.style.display = "block";  
});

closeButtonPaymentModal.addEventListener("click", function () { //close modal button
    modalUserDetails.style.display = "none";
    userModal.style.display = "none";
    PayementModal.style.display = "none";
});

checkOut.addEventListener("click", function () { //checkout button 
    let orders = JSON.parse(localStorage.getItem("orders")) || [];

    if (Array.isArray(orders) && orders.length > 0) {
        modalUserDetails.style.display = "block";
        userModal.style.display = "block";
    } 
});

closeButtonModal.addEventListener("click", function () {
    modalUserDetails.style.display = "none";  
    userModal.style.display = "none";
});

nextButton.addEventListener("click", UserDetailsValidation);

phoneNumber.addEventListener('input', function () {
    if (this.value.length > 10) {
        this.value = this.value.slice(0, 10);
    }
});

confirmPhoneNumber.addEventListener('input', function () {
    if (this.value.length > 10) {
        this.value = this.value.slice(0, 10);
    }   
});



function UserDetailsValidation() {
    let valid = true;

    if (!username || username.value.trim() === "") {//name validation
        nameValidation.textContent = "This field is required. Please enter Name";
        nameValidation.style.display = "block";
        valid = false;
    } else if (!/^[A-Za-z]+$/.test(username.value.trim())) {
        nameValidation.textContent = "Name should contain letters only"
        nameValidation.style.display = "block";
        valid = false;
    } else if (username) {
        nameValidation.style.display = "none";
    }

    if (!Surname || Surname.value.trim() === "") { //surname validation
        surnameValidation.textContent = "This field is required. Please enter Surname";
        surnameValidation.style.display = "block";
        valid = false;
    } else if (!/^[A-Za-z]+$/.test(Surname.value.trim())) {
        surnameValidation.textContent = "Surname should contain letters only"
        surnameValidation.style.display = "block";
        valid = false;
    } else if (Surname) {
        surnameValidation.style.display = "none";
    }


    //if (email.value.trim() !== confirmEmail.value.trim()) { //validation for both emails if they match
    //    confirmEmailValidation.textContent = "Email does not match";
    //    emailValidation.textContent = "Email does not match";
    //    emailValidation.style.setProperty("display", "block", "important");
    //    confirmEmailValidation.style.setProperty("display", "block", "important");
    //    console.log("worked");
    //    console.log(confirmEmailValidation);
    //    console.log(emailValidation);
    //    valid = false;
    //}
    //else {
    //    emailValidation.style.display = "none";
    //    confirmEmailValidation.style.display = "none";
    //}

    if (!email || email.value.trim() === "") { //email validation
        emailValidation.textContent = "This field is required. Please enter Email";
        emailValidation.style.display = "block";
        valid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) {
        emailValidation.textContent = "Incorrect Email. Enter a valid email";
        emailValidation.style.display = "block";
        valid = false;
    } else if (email) {
        emailValidation.style.display = "none";
    }

    if (!confirmEmail || confirmEmail.value.trim() === "") { //confirm email validation
        confirmEmailValidation.textContent = "This field is required. Please enter Email";
        confirmEmailValidation.style.display = "block";
        valid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(confirmEmail.value.trim())) {
        confirmEmailValidation.textContent = "Incorrect Email. Enter a valid email";
        confirmEmailValidation.style.display = "block";
        valid = false;
    } else {
        confirmEmailValidation.style.display = "none";
    } 

    if (phoneNumber.value.trim() !== confirmPhoneNumber.value.trim()) { //validation for both phone numbers if they match
        phoneNumberValidation.textContent = "Phone number doesnt match";
        phoneNumberValidation.style.display = "block";
        confirmPhoneNumberValidation.textContent = "Phone number doesnt match";
        confirmPhoneNumberValidation.style.display = "block";
        valid = false; 
    }
    else {
        phoneNumberValidation.style.display = "none";
        confirmPhoneNumberValidation.style.display = "none";
    }
    
    if (phoneNumber.value.trim().length !== 10) {//phone number validation
        phoneNumberValidation.textContent = "Phone number must be 10 digits long";
        phoneNumberValidation.style.display = "block";
        valid = false; 
    } else {  
        phoneNumberValidation.style.display = "none";
        
    }

    if (confirmPhoneNumber.value.trim().length !== 10) {// confirm phone number validation
        confirmPhoneNumberValidation.textContent = "Phone number must be 10 digits long";
        confirmPhoneNumberValidation.style.display = "block";
        valid = false;
    } else {
        confirmPhoneNumberValidation.style.display = "none";
    } 

    //if (streetNumber.value.trim() !== confirmStreetNumber.value.trim()) {// validation for both street addresses
    //    confirmStreetNumberValidation.textContent = "Street number doesnt match";
    //    confirmStreetNumberValidation.style.display = "block";
    //    streetNumberValidation.textContent = "Street number doesnt match";
    //    streetNumberValidation.style.display = "block";
    //    valid = false;
    //} else {
    //    confirmStreetNumberValidation.style.display = "none";
    //    streetNumberValidation.style.display = "none";
    //} 


    if (!streetNumber || streetNumber.value.trim() === "") {//street number validation
        streetNumberValidation.textContent = "This field is required. Please street number";
        streetNumberValidation.style.display = "block";
        valid = false;
    } else  {
        streetNumberValidation.style.display = "none";
    }

    if (!confirmStreetNumber || confirmStreetNumber.value.trim() === "") {// confirm street number validation
        confirmStreetNumberValidation.textContent = "This field is required. Please street number";
        confirmStreetNumberValidation.style.display = "block";
        valid = false;
    } else {
        confirmStreetNumberValidation.style.display = "none";
    } 

    if (valid) {
        userModal.style.display = "none"; 
        PayementModal.style.display = "block"; 
    }
} 

function PlaceOrder() {
    let cart = JSON.parse(localStorage.getItem("orders")) || [];
    const now = new Date();

    // Format date: 2025 June 24
    const orderDate = `${now.getFullYear()} ${now.toLocaleString('en-US', { month: 'long' })} ${String(now.getDate()).padStart(2, '0')}`;

    // Format time (you can make this 24hr format if needed)
    const orderTime = now.toLocaleTimeString();  // e.g., "10:57:01 AM"

    // Function to generate a random 6-digit order number
    function generateOrderNumber() {
        return Math.floor(100000 + Math.random() * 900000);
    }

    // Calculate total price
    let total = cart.reduce((sum, item) => sum + parseFloat(item.price), 0);

    // Create a single placed order object
    let placedOrder = {
        orderNumber: generateOrderNumber(),
        orderDate: orderDate,     // formatted as "2025 June 24"
        orderTime: orderTime,     // e.g., "10:57:01 AM"
        items: cart.map(item => ({
            pizzaName: item.pizzaName,
            size: item.size,
            price: item.price,
            quantity: item.quantity
        })),
        status: "pending",
        TotalPrice: total
    };

    // Save the placed order to localStorage
    localStorage.setItem("placedOrder", JSON.stringify(placedOrder));

    // Clear the cart
    localStorage.removeItem("orders");
}



function initScheduledStatuses() {//addes the timer and status on the database for updating the status progress bar
    if (!localStorage.getItem("statusSchedule")) {
        const now = new Date();
        const schedule = [
            { status: "received", time: new Date(now.getTime() + 10 * 60000).toTimeString().split(" ")[0] }, // now + 2 min
            { status: "baking", time: new Date(now.getTime() + 20 * 60000).toTimeString().split(" ")[0] },   // now + 4 min
            { status: "out_for_delivery", time: new Date(now.getTime() + 30 * 60000).toTimeString().split(" ")[0] },
            { status: "delivered", time: new Date(now.getTime() + 40 * 60000).toTimeString().split(" ")[0] }
        ];

        localStorage.setItem("statusSchedule", JSON.stringify(schedule));
    }
}


