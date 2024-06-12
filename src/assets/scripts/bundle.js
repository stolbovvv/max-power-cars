/* global Splide SlimSelect */

class Menu {
	constructor({ openClass = 'is-open', lockClass = 'is-lock', activeClass = 'is-active' } = {}) {
		this.element = document.querySelector('.js-menu');
		this.trigger = document.querySelector('.js-menu-trigger');

		this.options = {
			openClass,
			lockClass,
			activeClass,
		};

		this.init();
	}

	open = () => {
		this.element.classList.add(this.options.openClass);
		this.trigger.classList.add(this.options.activeClass);
		document.body.classList.add(this.options.lockClass);
	};

	hide = () => {
		this.element.classList.remove(this.options.openClass);
		this.trigger.classList.remove(this.options.activeClass);
		document.body.classList.remove(this.options.lockClass);
	};

	init() {
		const { element, trigger, options } = this;

		if (!element) return;

		window.addEventListener('resize', this.hide);

		trigger.addEventListener('click', () => {
			if (element.classList.contains(options.openClass)) {
				this.hide();
			} else {
				this.open();
			}
		});

		element.addEventListener('click', ({ target }) => {
			if (target && target.matches('.js-menu-hide')) this.hide();
		});
	}
}

class Sticky {
	constructor(selector = '.js-sticky', { activeClass = 'is-active' } = {}) {
		this.element = document.querySelector(selector);
		this.options = {
			activeClass,
		};

		this.init();
	}

	onScroll = () => {
		if (window.scrollY) {
			if (this.element.matches(this.options.activeClass)) return;

			this.element.classList.add(this.options.activeClass);
		} else {
			this.element.classList.remove(this.options.activeClass);
		}
	};

	init() {
		if (!this.element) return;

		window.addEventListener('scroll', this.onScroll);
	}
}

window.addEventListener('DOMContentLoaded', () => {
	// Site menu
	new Menu();

	// Sticky header
	new Sticky();

	// Sliders
	const mediaSlider = document.querySelector('#media-slider');
	const photoSlider = document.querySelector('#photo-slider');
	const compareSlider = document.querySelector('#compare-slider');

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

	if (compareSlider) {
		new Splide(compareSlider, {
			gap: 0,
			perMove: 1,
			perPage: 2,
			pagination: false,
			breakpoints: {
				575: {
					perPage: 1,
				},
			},
		}).mount();
	}

	// Selects
	const selects = document.querySelectorAll('.select');

	selects.forEach((select) => {
		new SlimSelect({
			select: select,
			settings: {
				showSearch: false,
			},
		});
	});
});
