// Main Interactivity

document.addEventListener('DOMContentLoaded', () => {

    // Theme Toggle Logic
    const themeToggleBtn = document.getElementById('themeToggle');
    const sunIcon = document.querySelector('.sun-icon');
    const moonIcon = document.querySelector('.moon-icon');

    // Check local storage
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme === 'light') {
        document.body.classList.add('light-theme');
        updateIcons(true);
    }

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            document.body.classList.toggle('light-theme');
            const isLight = document.body.classList.contains('light-theme');
            localStorage.setItem('theme', isLight ? 'light' : 'dark');
            updateIcons(isLight);
        });
    }

    function updateIcons(isLight) {
        if (!sunIcon || !moonIcon) return;
        if (isLight) {
            // Light mode active -> Show Moon (to switch to dark)
            sunIcon.style.display = 'none';
            moonIcon.style.display = 'block';
        } else {
            // Dark mode active -> Show Sun (to switch to light)
            sunIcon.style.display = 'block';
            moonIcon.style.display = 'none';
        }
    }

    // Ensure icons are correct on load for default dark theme
    if (!currentTheme || currentTheme === 'dark') {
        updateIcons(false);
    }
    // Mobile Menu Toggle
    const menuBtn = document.getElementById('menuBtn');
    const mobileMenu = document.getElementById('mobileMenu');

    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener('click', () => {
            const isActive = mobileMenu.classList.contains('active');
            if (isActive) {
                mobileMenu.classList.remove('active');
                menuBtn.setAttribute('aria-label', 'Open Menu');
            } else {
                mobileMenu.classList.add('active');
                menuBtn.setAttribute('aria-label', 'Close Menu');
            }
        });

        // Close menu when clicking a link
        const links = mobileMenu.querySelectorAll('a');
        links.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('active');
            });
        });
    }

    // Sticky Navbar Glass Effect refinement on scroll
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 20) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Add fade-in classes to elements
    const animatedElements = document.querySelectorAll('.job-card, .hero-title, .hero-subtitle, .stat-item, .cta-container');

    // Simple inline style injection for animation classes
    const style = document.createElement('style');
    style.innerHTML = `
        .fade-in-visible {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);

    animatedElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        el.style.transitionDelay = `${index * 0.1}s`; // Stagger effect
        observer.observe(el);
    });
});
