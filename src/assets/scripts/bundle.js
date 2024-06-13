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

class Tabs {
	constructor(element = '.js-tabs', { activeClass = 'is-current' } = {}) {
		this.tabsRoot = typeof element === 'string' ? document.querySelector(element) : element;

		if (this.tabsRoot) {
			this.tabsTrigger = this.tabsRoot.querySelectorAll('.js-tabs-trigger');
			this.tabsContent = this.tabsRoot.querySelectorAll('.js-tabs-content');

			this.options = {
				activeClass,
			};

			this.update = this.update.bind(this);

			this.init();
		}
	}

	update(tabId) {
		this.tabsTrigger.forEach((trigger) => {
			if (trigger.dataset.tabId === tabId) trigger.classList.add(this.options.activeClass);
			if (trigger.dataset.tabId !== tabId) trigger.classList.remove(this.options.activeClass);
		});

		this.tabsContent.forEach((content) => {
			if (content.dataset.tabId === tabId) content.classList.add(this.options.activeClass);
			if (content.dataset.tabId !== tabId) content.classList.remove(this.options.activeClass);
		});
	}

	init() {
		this.tabsTrigger.forEach((trigger) => {
			trigger.addEventListener('click', () => this.update(trigger.dataset.tabId));
		});

		this.update(this.tabsTrigger[0].dataset.tabId);
	}
}

class Popup {
	constructor(element = '.js-popup', { activeClass = 'is-active', needLock = true } = {}) {
		this.popupRoot = typeof element === 'string' ? document.querySelector(element) : element;

		if (this.popupRoot) {
			this.popupTrigger = document.querySelectorAll(`.js-popup-trigger`);

			this.options = {
				needLock,
				activeClass,
			};

			this.init();
		}
	}

	show() {
		this.popupRoot.classList.add(this.options.activeClass);

		if (this.options.needLock) document.body.style['overflow'] = 'hidden';
		if (this.options.needLock) document.body.style['scrollbar-gutter'] = 'stable';
		if (this.options.needLock) document.documentElement.style['scrollbar-gutter'] = 'stable';
	}

	hide() {
		this.popupRoot.classList.remove(this.options.activeClass);

		if (this.options.needLock) document.body.style.removeProperty('overflow');
		if (this.options.needLock) document.body.style.removeProperty('scrollbar-gutter');
		if (this.options.needLock) document.documentElement.style.removeProperty('scrollbar-gutter');
	}

	init() {
		this.popupRoot.addEventListener('click', (e) => {
			if (e.target && e.target === this.popupRoot) this.hide();
		});

		this.popupTrigger.forEach((trigger) => {
			trigger.addEventListener('click', () => {
				if (trigger.dataset.showPopup === this.popupRoot.id) this.show();
				if (trigger.dataset.hidePopup === this.popupRoot.id) this.hide();
			});
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

	// Site tabs
	new Tabs();

	// Site Popup
	new Popup();

	// Sticky header
	new Sticky();

	// Sliders
	const mediaSlider = document.querySelector('#media-slider');
	const photoSlider = document.querySelector('#photo-slider');
	const compareSlider = document.querySelector('#compare-slider');
	const popupMainSlider = document.querySelector('#popup-slider');

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

	if (popupMainSlider) {
		new Splide(popupMainSlider, {
			arrows: false,
			pagination: true,
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
