
// ------- GLOBAL VARS --------------

var numberOfitem = 5;
//var currentSlideHDepth = 1;
var allNests = ["nav","slide","headline","summary","ad-to-cart","find-store"];
var defaultIndex = 1;
var device = "desktop"; // "mobile", "desktop"
var deviceHeight; 
var deviceWidth;
var DEBUG = true;
var navposition = "bottom";  // "top", "bottom"
var gradientToggle = "hidden"; // "visible", "hidden";

var ETLink =
        "https://et.nytimes.com/?subject=dfp-ad-events&dfp_creativeid=%ecid!&dfp_lineitemid=%eaid!&dfp_orderid=%ebuy!&dfp_viewport=%%PATTERN:vp%%&pageviewid=%%PATTERN:page_view_id%%&dfp_pos=%%PATTERN:pos%%&dfp_prop=%%PATTERN:prop%%";
        
// -------- end of global variables


// -------- ET tracking functions -----------------
// ------------------------------------------------
// ------------------------------------------------

function productTracking (type, curr) {
    if (DEBUG) {console.log("ETSlideCall: ", type, curr);}
    var trackingLink = ETLink + "&dfp_event_type=" + type + "&dfp_event_location=product-" + curr;
    try { document.createElement("img").src = trackingLink; } catch (Error) {}
};


function clickThroughTracking (type, curr) {
    var redirectLink = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "";
    event.preventDefault();
    var trackingLink = ETLink + "&dfp_event_type=" + type + "&dfp_event_location=" + curr;
    try { document.createElement("img").src = trackingLink; } catch (Error) {}
    if (redirectLink != "") { window.open(redirectLink, "_blank"); }

    try {
        parent.postMessage({
                event: "send-direct",
                payload: {
                    dfp_creativeid: "%ecid!",
                    dfp_orderid: "%ebuy!",
                    dfp_viewport: "%%PATTERN:vp%%",
                    dfp_pos: "%%PATTERN:pos%%",
                    dfp_prop: "%%PATTERN:prop%%",
                    dfp_event_type: type,
                    dfp_event_location: curr,
                    subject: "dfp-ad-events"
                }
            },
            "https://www.nytimes.com/"
        );
    } catch (Error) {}
}

// -------- End of ET tracking ---------------------



// -------- FLEX XL MOBILE FULL SCREEN CODE --------
// -------------------------------------------------
// -------------------------------------------------


function FullScreenTheUnitPlease () {
  var adContainer = document.getElementById("wrapper");
  var adBody = document.getElementsByTagName("BODY")[0];

  if (window["$sf"]) {
    var SFGeom = $sf.ext.geom();
    deviceHeight = SFGeom.win.h;
    deviceWidth = SFGeom.win.w;

    if (deviceHeight < 600) {deviceHeight = 568;}
    
    if (DEBUG) {
        console.log("device width: ",deviceWidth);
        console.log("device height: ",deviceHeight);
    }
  

    adBody.style.height = deviceHeight + "px";
    adBody.style.width = deviceWidth + "px";
    adContainer.style.height = deviceHeight + "px";
    adContainer.style.width = deviceWidth + "px";

    var w = window, sf = w["$sf"], ext = sf && sf.ext;
    if (ext) {ext.expand({l:deviceWidth,t:deviceHeight});} else {
        if (DEBUG) { console.log("SF api expansion is not supporting"); }
    }
 
  }
  
  else {
    adContainer.style.height = 600 + "px";
    adContainer.style.width = window.innerWidth + "px";
    adBody.style.height = 600 + "px";
    adBody.style.width = window.innerWidth + "px";
  }
}


function stopTheFunc() {
	//console.log("stop it ...... ");
	if (deviceWidth >= 350 ) {
		clearInterval(myStop)
		clearInterval(setStage)
		//  console.log("setStage cleared")
		//  console.log("myStop cleared")
	}
}

if (window.device == "mobile") {
	var setStage = setInterval(FullScreenTheUnitPlease, 100); 
	var myStop = setInterval(stopTheFunc, 100); 
}

// ------------ END OF FULL SCREEN CODE --------------


// ------------ starter function ---------------------
// ---------------------------------------------------
// ---------------------------------------------------

(function(){

    var logo = document.getElementById("logo");
    logo.addEventListener("click",function() {  clickThroughTracking('clickURL', 'logo', '%%CLICK_URL_UNESC%%%%DEST_URL_UNESC%%');  });

    var navContainer = document.getElementById("nav-container");
    navContainer.classList.add("nav-" + navposition);

    var copyContainer = document.getElementById("copy-container");
    copyContainer.classList.add("copy-position-" + navposition);

    var slideContainer = document.getElementById("slide-container");
    slideContainer.classList.add("slide-position-" + navposition);

    var gradient = document.getElementById("gradient");
    gradient.style.visibility = gradientToggle;

    var background = document.getElementById("background");
    background.addEventListener("click",function() {  clickThroughTracking('clickURL', 'background', '%%CLICK_URL_UNESC%%%%DEST_URL_UNESC%%');  });
  

    if (numberOfitem < 5) {for (var i = 5; i > numberOfitem; i--) {for (var j = 0; j < allNests.length; j++) { document.getElementById(allNests[j] + "-" + i).remove(); }}}



    for (var i = 1; i <= numberOfitem; i++) {
        var tempNavItem = document.getElementById("nav-" + i);
        tempNavItem.setAttribute('data-index-number', i);
        tempNavItem.addEventListener("click",function() {updateSlide (event.target.dataset.indexNumber);})

        try {
            var tempSlide = document.getElementById("slide-" + i);
            tempSlide.setAttribute('data-index-number', i);
            tempSlide.addEventListener("click",function() {openCart (event.target.dataset.indexNumber,event.target.dataset.url);})
        }
        catch (Error) {}

        try {
            var tempCart = document.getElementById("ad-to-cart-" + i);
            if (tempCart.innerHTML != "") {
                tempCart.setAttribute('data-index-number', i);
                tempCart.addEventListener("click",function() {openCart (event.target.dataset.indexNumber,event.target.dataset.url);})
            }
            else {
                console.log(tempCart);
                tempCart.style.display = "none";
        
            }
           
        }
        catch (Error) {}

        try {
            var tempStore = document.getElementById("find-store-" + i);
            if (tempStore.innerHTML != "") {
                tempStore.setAttribute('data-index-number', i);
                tempStore.addEventListener("click",function() {openStore (event.target.dataset.indexNumber,event.target.dataset.url);})
            }
            else {
                console.log(tempStore);
                tempStore.style.display = "none";
            }
           
        }
        catch (Error) {}
       
    }

    function navSelected (whichOne) {
        for (var i = 1; i <= numberOfitem; i++) {
            var tempNav = document.getElementById("nav-" + i);
            if (i == whichOne) { tempNav.classList.add("nav-selected-style");}
            else { tempNav.classList.remove("nav-selected-style"); }
        }

        productTracking ("product",whichOne);
    }

    function openCart (whichOne,whichURL) {
        if (DEBUG) {console.log("index: ",whichOne, "  url: ", whichURL);}
        clickThroughTracking ('clickURL', 'cart-' + whichOne, whichURL);
    }

    function openStore (whichOne,whichURL) {
        if (DEBUG) {console.log("index: ",whichOne, "  url: ", whichURL);}
        clickThroughTracking ('clickURL', 'store-' + whichOne, whichURL);
    }

    function updateSlide (whichOne) {
        navSelected (whichOne);
        for (var i = 1; i <= numberOfitem; i++) {
            if (i == whichOne) {
                try { document.getElementById("headline-" + i).style.display = "block"; } catch(Error) {}
                try { document.getElementById("summary-" + i).style.display = "block"; } catch(Error) {}
                try { document.getElementById("button-set-" + i).style.display = "flex"; } catch(Error) {}
               // try { document.getElementById("find-store-" + i).style.display = "block"; } catch(Error) {}
                try { document.getElementById("slide-" + i).style.display = "block"; } catch(Error) {}
            }
            else {

                try { document.getElementById("headline-" + i).style.display = "none"; } catch(Error) {}
                try { document.getElementById("summary-" + i).style.display = "none"; } catch(Error) {}
                try { document.getElementById("button-set-" + i).style.display = "none"; } catch(Error) {}
                //try { document.getElementById("find-store-" + i).style.display = "none"; } catch(Error) {}
                try { document.getElementById("slide-" + i).style.display = "none";} catch(Error) {}
  
            }
        }
    }

    updateSlide (defaultIndex);

})();

// -------- end of starter function -----------------

