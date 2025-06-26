
let images = document.querySelectorAll(".pizza-slides img");
let imageIndex = 0;

document.addEventListener("DOMContentLoaded", Initializer);
console.log(images);
 

function Initializer() {   

    if (images.length > 0)
    {
        images[imageIndex].classList.add("show");
        setInterval(NextSlide, 5000);
    }      
}


function ShowSlide(index) {

    if (index >= images.length) {
        imageIndex = 0;
    }
    else if (index < 0) {
        imageIndex = images.length - 1;
    }

    images.forEach(image => {
        image.classList.remove("show");
    });

    images[imageIndex].classList.add("show");

}

function PrevSlide() {
    imageIndex--;
    ShowSlide(imageIndex);
}


function NextSlide() {
    imageIndex++;
    ShowSlide(imageIndex);
}


//angular

var app = angular.module("HomePageModule", ["ngAnimate"]);

app.controller("HomePageController", function ($http,$scope) {
    $http.get("/Data/menuData.json").then(
        function (response) {
            $scope.MenuData = response.data.splice(0,4);
           /* $scope.data = $scope.MenuData.splice(0, 3);*/
        },
        function (error) {
            console.error("Error fetching menu data:", error);
        }
    );
})