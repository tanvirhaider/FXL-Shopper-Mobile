
// ------- GLOBAL VARS --------------

var numberOfitem = 4;
var currentSlideHDepth = 1;
var allNests = ["nav","slide","headline","summary","ad-to-cart","find-store"];
var defaultIndex = 1;
var device = "desktop"; // "mobile", "desktop"
var deviceHeight; 
var deviceWidth;

var ETLink =
		"https://et.nytimes.com/?subject=dfp-ad-events&dfp_creativeid=%ecid!&dfp_lineitemid=%eaid!&dfp_orderid=%ebuy!&dfp_viewport=%%PATTERN:vp%%&pageviewid=%%PATTERN:page_view_id%%&dfp_pos=%%PATTERN:pos%%&dfp_prop=%%PATTERN:prop%%";


function productTracking (type, curr) {
    console.log("ETSlideCall: ", type, curr);
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


function FullScreenTheUnitPlease () {

 // console.log("set the stage yo");

  var adContainer = document.getElementById("wrapper");
  var adBody = document.getElementsByTagName("BODY")[0];

  if (window["$sf"]) {
    var SFGeom = $sf.ext.geom();
    deviceHeight = SFGeom.win.h;
    deviceWidth = SFGeom.win.w;

    if (deviceHeight < 600) {deviceHeight = 568;}
    
   // console.log("device width: ",deviceWidth);
   // console.log("device height: ",deviceHeight);

    adBody.style.height = deviceHeight + "px";
    adBody.style.width = deviceWidth + "px";
    adContainer.style.height = deviceHeight + "px";
    adContainer.style.width = deviceWidth + "px";

    var w = window, sf = w["$sf"], ext = sf && sf.ext;
    if (ext) {ext.expand({l:deviceWidth,t:deviceHeight});} else {console.log("SF api expansion is not supporting");}
 
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


(function(){

    var logo = document.getElementById("logo");
    logo.addEventListener("click",function() {  clickThroughTracking('clickURL', 'logo', '%%CLICK_URL_UNESC%%%%DEST_URL_UNESC%%');  })

    if (numberOfitem < 5) {for (var i = 5; i > numberOfitem; i--) {for (var j = 0; j < allNests.length; j++) { document.getElementById(allNests[j] + "-" + i).remove(); }}}

    for (var i = 1; i <= numberOfitem; i++) {
        var tempNavItem = document.getElementById("nav-" + i);
        tempNavItem.setAttribute('data-index-number', i);
        tempNavItem.addEventListener("click",function() {updateSlide (event.target.dataset.indexNumber);})

        try {
            var tempCart = document.getElementById("ad-to-cart-" + i);
            tempCart.setAttribute('data-index-number', i);
            tempCart.addEventListener("click",function() {openCart (event.target.dataset.indexNumber,event.target.dataset.url);})
        }
        catch (Error) {}

        try {
            var tempStore = document.getElementById("find-store-" + i);
            tempStore.setAttribute('data-index-number', i);
            tempStore.addEventListener("click",function() {openStore (event.target.dataset.indexNumber,event.target.dataset.url);})
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
        console.log(whichOne);
        clickThroughTracking ('clickURL', 'cart-' + whichOne, whichURL);
    }

    function openStore (whichOne,whichURL) {
        console.log(whichOne);
        clickThroughTracking ('clickURL', 'store-' + whichOne, whichURL);
    }

    function updateSlide (whichOne) {
        navSelected (whichOne);
        for (var i = 1; i <= numberOfitem; i++) {
            if (i == whichOne) {
                document.getElementById("headline-" + i).style.display = "block";
                document.getElementById("summary-" + i).style.display = "block";
                document.getElementById("ad-to-cart-" + i).style.display = "block";
                document.getElementById("find-store-" + i).style.display = "block";
                document.getElementById("slide-" + i).style.display = "block";
            }
            else {
                document.getElementById("headline-" + i).style.display = "none";
                document.getElementById("summary-" + i).style.display = "none";
                document.getElementById("ad-to-cart-" + i).style.display = "none";
                document.getElementById("find-store-" + i).style.display = "none";
                document.getElementById("slide-" + i).style.display = "none";
            }
        }
    }

    updateSlide (defaultIndex);

})();


