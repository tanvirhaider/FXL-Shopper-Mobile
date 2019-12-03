
var numberOfitem = 5;
var currentSlideHDepth = 1;





function init () {

    for (var i = 1; i <= numberOfitem; i++) {
        var tempNavItem = document.getElementById("nav-" + i);
        tempNavItem.setAttribute('data-index-number', i);
        tempNavItem.addEventListener("click",function() {
            updateSlide (event.target.dataset.indexNumber);
        })

        if (i == numberOfitem){
            document.getElementById("slide-" + 1).style.zIndex = ++currentSlideHDepth;
        }
    }



    function updateSlide (selectedOne) {
        //currentSlideHDepth++;
        document.getElementById("slide-" + selectedOne).style.zIndex = ++currentSlideHDepth;

    }





}


init ();