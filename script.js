// script.js - Core portfolio interactions

document.addEventListener('DOMContentLoaded', () => {

    // 1. Intersection Observer for Scroll Animations
    // Finds all elements with .fade-in-up and animates them on scroll
    const fadeElements = document.querySelectorAll('.fade-in-up');

    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -50px 0px', // trigger slightly before it comes fully into view
        threshold: 0.1
    };

    const scrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    fadeElements.forEach(el => {
        scrollObserver.observe(el);
    });

    // 2. Smooth Scrolling for Navigation Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetAttr = this.getAttribute('href');
            if(targetAttr !== '#') {
                e.preventDefault();
                const targetElement = document.querySelector(targetAttr);
                if (targetElement) {
                    // Add an offset for sticky header
                    const headerOffset = 80; 
                    const elementPosition = targetElement.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      
                    window.scrollTo({
                         top: offsetPosition,
                         behavior: "smooth"
                    });
                }
            }
        });
    });

    // 3. Navbar solid background on scroll
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(252, 251, 249, 0.98)';
            navbar.style.boxShadow = '0 4px 6px -1px rgba(0,0,0,0.05)';
        } else {
            navbar.style.background = 'rgba(252, 251, 249, 0.8)';
            navbar.style.boxShadow = 'none';
        }
    });

});
