$( document ).ready( function() {

	/* main lottie bg */
	var ani1 = bodymovin.loadAnimation({
		wrapper: document.getElementById( 'mainBg1' ),
		renderer: 'svg',
		loop: true,
		prerender: false,
		autoplay: true,
		animationData: eval( 'mainBg1' ),
		rendererSettings: {
			preserveAspectRatio: 'xMidYMid slice',
			clearCanvas: false
		}
	});

	/* main lottie bg2 */
	var ani2 = bodymovin.loadAnimation({
		wrapper: document.getElementById( 'mainBg2' ),
		renderer: 'svg',
		loop: true,
		prerender: false,
		autoplay: true,
		animationData: eval( 'mainBg2' ),
		rendererSettings: {
			preserveAspectRatio: 'xMidYMid slice',
			clearCanvas: false
		}
	});

	/* main lottie bg3 */
	var ani3 = bodymovin.loadAnimation({
		wrapper: document.getElementById( 'mainBg3' ),
		renderer: 'svg',
		loop: true,
		prerender: false,
		autoplay: true,
		animationData: eval( 'mainBg3' ),
		rendererSettings: {
			preserveAspectRatio: 'xMidYMid slice',
			clearCanvas: false
		}
	});

});