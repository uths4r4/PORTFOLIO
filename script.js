// script.js - Core portfolio interactions

document.addEventListener('DOMContentLoaded', () => {

    // 1. Intersection Observer for Scroll Animations
    const fadeElements = document.querySelectorAll('.fade-in-up');
    const observerOptions = { root: null, rootMargin: '0px 0px -50px 0px', threshold: 0.1 };

    const scrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); 
            }
        });
    }, observerOptions);

    fadeElements.forEach(el => scrollObserver.observe(el));

    // 2. Smooth Scrolling for Navigation Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetAttr = this.getAttribute('href');
            if(targetAttr !== '#') {
                e.preventDefault();
                const targetElement = document.querySelector(targetAttr);
                if (targetElement) {
                    const headerOffset = 80; 
                    const elementPosition = targetElement.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      
                    window.scrollTo({ top: offsetPosition, behavior: "smooth" });
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
            navbar.style.background = 'transparent';
            navbar.style.boxShadow = 'none';
        }
    });

    // 4. Project Accordion Logic
    document.querySelectorAll('.expand-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation(); // prevent double clicking if event bubbles
            const accordion = btn.closest('.project-accordion');
            
            // Close others
            document.querySelectorAll('.project-accordion').forEach(item => {
                if (item !== accordion) {
                    item.classList.remove('active');
                    item.querySelector('.btn-text').textContent = 'Click to read more';
                }
            });
            
            // Toggle current
            accordion.classList.toggle('active');
            
            // Update button text
            const btnText = btn.querySelector('.btn-text');
            if(accordion.classList.contains('active')) {
                btnText.textContent = 'Close Details';
                setTimeout(() => {
                    const offset = accordion.getBoundingClientRect().top + window.pageYOffset - 120;
                    window.scrollTo({ top: offset, behavior: 'smooth' });
                }, 300);
            } else {
                btnText.textContent = 'Click to read more';
            }
        });
    });

    // 5. Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenuBtn.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

        document.querySelectorAll('.nav-links li a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenuBtn.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
    }
});
