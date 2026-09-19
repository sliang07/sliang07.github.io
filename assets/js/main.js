/*
	Stanley Liang — portfolio
	Vanilla JS: mobile nav, scroll-spy, reveal on scroll
*/

(function () {

	// Dynamic year in footer.
	var yearEl = document.getElementById('year');
	if (yearEl) {
		yearEl.textContent = new Date().getFullYear();
	}

	// Mobile nav toggle.
	var toggle = document.getElementById('nav-toggle');
	var navLinks = document.getElementById('nav-links');

	if (toggle && navLinks) {
		toggle.addEventListener('click', function () {
			var open = navLinks.classList.toggle('open');
			toggle.classList.toggle('open', open);
			toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
		});

		navLinks.addEventListener('click', function (e) {
			if (e.target.closest('a')) {
				navLinks.classList.remove('open');
				toggle.classList.remove('open');
				toggle.setAttribute('aria-expanded', 'false');
			}
		});
	}

	// Scroll-spy: highlight the nav link for the section in view.
	var sectionIds = ['about', 'experience', 'projects', 'skills'];
	var sections = [];
	sectionIds.forEach(function (id) {
		var el = document.getElementById(id);
		if (el) {
			sections.push(el);
		}
	});
	var navAs = document.querySelectorAll('.nav-links a');

	function updateSpy() {
		var pos = window.scrollY + 100;
		var current = '';
		sections.forEach(function (s) {
			if (s.offsetTop <= pos) {
				current = s.id;
			}
		});
		navAs.forEach(function (a) {
			a.classList.toggle('active', a.getAttribute('href') === '#' + current);
		});
	}

	window.addEventListener('scroll', updateSpy, { passive: true });
	window.addEventListener('resize', updateSpy, { passive: true });
	updateSpy();

	// Reveal on scroll (respects the reduced-motion preference).
	var revealEls = document.querySelectorAll('.reveal');
	var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

	if ('IntersectionObserver' in window && !reduceMotion) {
		var io = new IntersectionObserver(function (entries) {
			entries.forEach(function (entry) {
				if (entry.isIntersecting) {
					entry.target.classList.add('visible');
					io.unobserve(entry.target);
				}
			});
		}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
		revealEls.forEach(function (el) { io.observe(el); });
	} else {
		revealEls.forEach(function (el) { el.classList.add('visible'); });
	}

})();