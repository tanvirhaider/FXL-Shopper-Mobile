//Native Tracking Code ---------------------------------------------

var eventTracker = (function () {
	var ETLink =
		"https://et.nytimes.com/?subject=dfp-ad-events&dfp_creativeid=%ecid!&dfp_lineitemid=%eaid!&dfp_orderid=%ebuy!&dfp_viewport=%%PATTERN:vp%%&pageviewid=%%PATTERN:page_view_id%%&dfp_pos=%%PATTERN:pos%%&dfp_prop=%%PATTERN:prop%%";

	var slideCSSClass = "slide";
	var slideNavType = "slideURL";
	var slideClickType = "clickURL";

	//Slide navigation control
	var slidesNum = window.numberOfitem;
	var currentSlide = 1;

	console.log(" et current slide: ", currentSlide);

	/*
	 * function to call the Nytimes ET pixel link for the slide templte
	 * @param curr - current slide
	 * @param type - event type
	 */
	var ETSlideCall = function ETSlideCall(type, curr) {
		console.log("ETSlideCall: ", type, curr);
		var next = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "";
		var trackingLink = ETLink + "&dfp_event_type=" + type + "&dfp_event_location=slide-" + curr;
		if (next != "") { trackingLink += "_" + "slide-" + next; }
		try { document.createElement("img").src = trackingLink; } catch (Error) {}
	};
	//Public functions
	return {
		/*
		 *Next slide function - Updates the current slide and call the ET function
		 */
		nextSlideET: function nextSlideET() {
			
			var prevSlide = currentSlide;
			if (currentSlide >= slidesNum) {
				currentSlide = 1;
			} else {
				currentSlide++;
			}
			try {ETSlideCall(slideNavType, prevSlide, currentSlide);} catch (Error) {}
			console.log(" et next current slide: ", currentSlide);
		},

		/*
		 * Previous slide function - Updates the current slide and call the ET function
		 */
		prevSlideET: function prevSlideET() {
			
			var prevSlide = currentSlide;
			if (currentSlide <= 1) {
				currentSlide = slidesNum;
			} else {
				currentSlide--;
			}
			try {ETSlideCall(slideNavType, prevSlide, currentSlide);} catch (Error) {}
			console.log(" et prev current slide: ", currentSlide);
		},

		/*
		 * Click slide function - Redirects to target url
		 * @param tag - HTML anchor tag the called this func.
		 * @param next - sums up to the current slide number
		 * usage: <a href="link-to-the-ad-redirect" onclick="eventTracker.slideClickET(this)">
		 */
		slideClickET: function slideClickET(tag) {
			var next =
				arguments.length > 1 && arguments[1] !== undefined ?
				arguments[1] :
				false;

			// console.log("this", tag);
			event.preventDefault();
			var slideTrack = currentSlide;
			if (next) {
				slideTrack = currentSlide == slidesNum ? 1 : currentSlide + 1;
			}
			ETSlideCall(slideClickType, slideTrack);
			var url = tag.href;
			window.open(url, "_blank");
		},

		/*
		 * General event tracker call
		 * @param eventType - event type to be tracked
		 * @param eventLocation - event location to be tracked
		 * @param redirectLink - Link to ad page to be called after eventtracker
		 */

		generalEventTrack: function generalEventTrack(type, curr) {
			var redirectLink =
				arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "";

			event.preventDefault();
			var trackingLink = ETLink + "&dfp_event_type=" + type + "&dfp_event_location=" + curr;

			try { document.createElement("img").src = trackingLink; } catch (Error) {}

			

			if (redirectLink != "") {
				window.open(redirectLink, "_blank");
			}

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
		},

		setETLink: function setETLink(link) {
			ETLink = link;
		},

		setSlideCSSClass: function setSlideCSSClass(cssClass) {
			slideCSSClass = cssClass;
			slidesNum = document.getElementsByClassName(slideCSSClass).length;
		},
		setSlideClicktype: function setSlideClicktype(type) {
			slideClickType = type;
		},

		setSlideNavType: function setSlideNavType(type) {
			slideNavType = type;
		}
	};
})();