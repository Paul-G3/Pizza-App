const hamBugerBtn = document.querySelector(".ham-burger");
const closeBtn = document.querySelector(".close-btn");
const modal = document.querySelector(".modal");

hamBugerBtn.addEventListener("click", function () {
    modal.classList.remove("hide-modal"); 
    modal.classList.add("show-modal");
});

closeBtn.addEventListener("click", function () {
    modal.classList.remove("show-modal");  
    modal.classList.add("hide-modal");
});
