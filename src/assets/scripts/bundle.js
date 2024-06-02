/* global Splide */

window.addEventListener('DOMContentLoaded', () => {
	// Sliders
	const mediaSlider = document.querySelector('#media-slider');
	const photoSlider = document.querySelector('#photo-slider');

	if (mediaSlider) {
		new Splide(mediaSlider, {
			pagination: false,
			grid: {
				rows: 2,
				cols: 4,
				gap: {
					row: '20px',
					col: '20px',
				},
			},
			breakpoints: {
				1100: {
					grid: {
						cols: 3,
					},
				},
				767: {
					grid: {
						rows: 1,
						cols: 2,
						gap: {
							row: '10px',
							col: '10px',
						},
					},
				},
				575: {
					grid: {
						cols: 1,
					},
				},
			},
		}).mount(window.splide.Extensions);
	}

	if (photoSlider) {
		new Splide(photoSlider, {
			type: 'slide',
			gap: '20px',
			pagination: false,
		}).mount(window.splide.Extensions);
	}
});
