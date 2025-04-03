
let images = document.querySelectorAll(".pizza-slides img");
let ImageIndex = 0;

document.addEventListener("DOMContentLoaded", Initializer);
console.log(images);


function Initializer() {   

    images[ImageIndex].classList.add("show");
   
}

function showSlides() {
    
}

function NextSlide(index) {
    index++;
    showSlides()
}