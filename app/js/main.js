


var numberOfitem = 3;
var currentSlideHDepth = 1;
var allNests = ["nav","slide","headline","summary","ad-to-cart","find-store"];


function init () {

    if (numberOfitem < 5) {for (var i = 5; i > numberOfitem; i--) {for (var j = 0; j < allNests.length; j++) { document.getElementById(allNests[j] + "-" + i).remove(); }}}

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
        showAndHide (selectedOne);
        document.getElementById("slide-" + selectedOne).style.zIndex = ++currentSlideHDepth;

    }

    function showAndHide (whichOne) {
        for (var i = 1; i <= numberOfitem; i++) {
            if (i == whichOne) {
                document.getElementById("headline-" + i).style.display = "block";
                document.getElementById("summary-" + i).style.display = "block";
                document.getElementById("ad-to-cart-" + i).style.display = "block";
                document.getElementById("find-store-" + i).style.display = "block";
            }
            else {
                document.getElementById("headline-" + i).style.display = "none";
                document.getElementById("summary-" + i).style.display = "none";
                document.getElementById("ad-to-cart-" + i).style.display = "none";
                document.getElementById("find-store-" + i).style.display = "none";
            }
        }
    }

    showAndHide (1);





}


init ();