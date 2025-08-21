document.addEventListener('DOMContentLoaded', function() {
    // ===== DARK MODE TOGGLE =====
    const body = document.querySelector("body");
    const toggleSwitch = document.getElementById("toggle-switch");
    const moonIcon = document.getElementById("moon");
    const sunIcon = document.getElementById("sun");

    // Check for saved user preference or use system preference
    const savedTheme = localStorage.getItem('theme') || 
                      (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    
    if (savedTheme === 'dark') {
        body.classList.add('dark');
    }

    toggleSwitch.addEventListener('click', () => {
        body.classList.toggle("dark");
        
        // Save user preference
        const currentTheme = body.classList.contains('dark') ? 'dark' : 'light';
        localStorage.setItem('theme', currentTheme);
    });

    // ===== MOBILE MENU FUNCTIONALITY =====
    const navMenu = document.getElementById('navMenu');
    const navMenuBtn = document.querySelector('.nav_menu_btn');
    const closeMenuBtn = document.querySelector('.close-menu');
    const navLinks = document.querySelectorAll('.link_list .link');

    function toggleMenu() {
        navMenu.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : 'auto';
    }

    function closeMenu() {
        navMenu.classList.remove('active');
        document.body.style.overflow = 'auto';
    }

    navMenuBtn.addEventListener('click', toggleMenu);
    closeMenuBtn.addEventListener('click', closeMenu);

    // Close menu when clicking on nav links
    navLinks.forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    // ===== MODAL FUNCTIONALITY =====
    const modalTriggers = document.querySelectorAll('.modal-trigger');
    const modals = document.querySelectorAll('.modal');
    const closeButtons = document.querySelectorAll('.close');

    function openModal(modalId) {
        const modal = document.querySelector(modalId);
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        modals.forEach(modal => {
            modal.classList.remove('show');
        });
        document.body.style.overflow = 'auto';
    }

    // Open modal when clicking trigger
    modalTriggers.forEach(trigger => {
        trigger.addEventListener('click', function(e) {
            e.preventDefault();
            const modalId = this.getAttribute('href');
            openModal(modalId);
        });
    });

    // Close modal when clicking close button
    closeButtons.forEach(button => {
        button.addEventListener('click', closeModal);
    });

    // Close modal when clicking outside
    modals.forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                closeModal();
            }
        });
    });

    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeModal();
        }
    });

    // ===== BACK TO TOP BUTTON =====
    const backToTopBtn = document.querySelector('.back-to-top');

    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });

    backToTopBtn.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // ===== FORM SUBMISSION =====
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Here you would typically send the form data to a server
            // For demo purposes, we'll just show an alert
            alert('Thank you for your message! I will get back to you soon.');
            this.reset();
        });
    }

    // ===== ANIMATED COUNTERS =====
    const counters = document.querySelectorAll('[data-count]');
    const speed = 200;
    let animated = false;

    function animateCounters() {
        if (animated) return;
        
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-count');
            const count = +counter.innerText;
            const increment = target / speed;
            
            if (count < target) {
                counter.innerText = Math.ceil(count + increment);
                setTimeout(animateCounters, 1);
            } else {
                counter.innerText = target;
                animated = true;
            }
        });
    }

    // Initialize counters when stats section is in view
    const statsSection = document.querySelector('.stats-container');
    if (statsSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounters();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        observer.observe(statsSection);
    }

    // ===== SMOOTH SCROLLING FOR ANCHOR LINKS =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Adjust for fixed header
                    behavior: 'smooth'
                });
            }
        });
    });

    // ===== STICKY NAVBAR ON SCROLL =====
    window.addEventListener('scroll', function() {
        const nav = document.querySelector('.nav');
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    }); 
});