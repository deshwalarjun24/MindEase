document.addEventListener('DOMContentLoaded', function() {
    // Cache DOM elements
    const header = document.querySelector('.header');
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const backToTopButton = document.getElementById('back-to-top');
    const loadingSpinner = document.querySelector('.loading-spinner');
    const body = document.body;
    const navHeight = header ? header.offsetHeight : 0;
    const scrollOffset = 100; // Offset for scroll position
    
    // Sidebar elements
    const sidebar = document.getElementById('sidebar');
    const closeSidebar = document.getElementById('closeSidebar');
    const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');
    
    // Remove loading state when page is fully loaded
    window.addEventListener('load', function() {
        // Add a small delay to ensure all assets are loaded
        setTimeout(function() {
            if (loadingSpinner) {
                loadingSpinner.style.display = 'none';
            }
            body.classList.remove('loading');
        }, 500);
    });

    // Smooth scrolling with offset for fixed header
    const scrollToSection = (targetId) => {
        if (!targetId || targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (!targetElement) return;
        
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
        const offsetPosition = targetPosition - navHeight - 20; // 20px extra space

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    };

    // Handle anchor link clicks
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            // Close mobile menu if open
            if (navLinks && navLinks.classList.contains('active')) {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
                document.body.classList.remove('no-scroll');
            }
            
            // Only prevent default for same-page anchors
            if (targetId !== '#') {
                e.preventDefault();
                scrollToSection(targetId);
            }
        });
    });

    // Header scroll effect
    if (header) {
        // Add scrolled class if page is loaded with scroll position
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        }
        
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    // Mobile menu toggle functionality
    function toggleSidebar(show) {
        const isExpanded = hamburger.getAttribute('aria-expanded') === 'true' || false;
        const shouldShow = typeof show === 'boolean' ? show : !isExpanded;
        
        hamburger.setAttribute('aria-expanded', shouldShow);
        
        if (shouldShow) {
            sidebar.classList.add('active');
            mobileMenuOverlay.classList.add('active');
            body.style.overflow = 'hidden';
            // Focus the close button when opening
            setTimeout(() => closeSidebar.focus(), 100);
        } else {
            sidebar.classList.remove('active');
            mobileMenuOverlay.classList.remove('active');
            body.style.overflow = '';
            // Return focus to hamburger button when closing
            hamburger.focus();
        }
    }
    
    // Toggle sidebar when hamburger is clicked
    if (hamburger && sidebar) {
        hamburger.addEventListener('click', () => toggleSidebar());
    }
    
    // Close sidebar when close button is clicked
    if (closeSidebar) {
        closeSidebar.addEventListener('click', () => toggleSidebar(false));
    }
    
    // Close sidebar when clicking outside
    if (mobileMenuOverlay) {
        mobileMenuOverlay.addEventListener('click', () => toggleSidebar(false));
    }
    
    // Close sidebar when pressing Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && sidebar.classList.contains('active')) {
            toggleSidebar(false);
        }
    });
    
    // Close sidebar when clicking on a sidebar link
    const sidebarLinks = document.querySelectorAll('.sidebar-link');
    sidebarLinks.forEach(link => {
        link.addEventListener('click', () => {
            toggleSidebar(false);
        });
    });

    // Mobile menu toggle for old navigation (keeping for reference, but will be hidden on mobile)
    if (hamburger && navLinks) {
        // Hide the old navigation on mobile
        if (window.innerWidth <= 992) {
            navLinks.style.display = 'none';
        }
        
        // Handle window resize
        window.addEventListener('resize', () => {
            if (window.innerWidth > 992) {
                navLinks.style.display = 'flex';
                // Ensure sidebar is closed on desktop
                toggleSidebar(false);
            } else {
                navLinks.style.display = 'none';
            }
        });
    }

    // Back to top button functionality
    if (backToTopButton) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                backToTopButton.classList.add('visible');
            } else {
                backToTopButton.classList.remove('visible');
            }
        });
        
        backToTopButton.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
            
            // Move focus to the top of the page for keyboard users
            const mainContent = document.getElementById('main-content');
            if (mainContent) {
                mainContent.setAttribute('tabindex', '-1');
                mainContent.focus();
            }
        });
    }
    
    // Animation on scroll
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.fade-in, .slide-up, .slide-left, .slide-right, .animate-on-scroll');
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('animate');
            }
        });
    };

    // Initialize animations
    animateOnScroll();
    window.addEventListener('scroll', animateOnScroll);
    
    // Add focus styles for keyboard navigation
    document.addEventListener('keyup', function(e) {
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-nav');
        }
    });
    
    document.addEventListener('mousedown', function() {
        document.body.classList.remove('keyboard-nav');
    });
    
    // Handle skip to content link
    const skipLink = document.querySelector('.skip-to-content');
    if (skipLink) {
        skipLink.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.setAttribute('tabindex', '-1');
                targetElement.focus();
                
                // Remove tabindex after blur to avoid focus trap
                targetElement.addEventListener('blur', function handleBlur() {
                    targetElement.removeAttribute('tabindex');
                    targetElement.removeEventListener('blur', handleBlur);
                }, { once: true });
            }
        });
    }

    // Add loading class to body for initial load animations
    document.body.classList.add('loaded');

    // Handle page transitions
    const handlePageTransition = (e) => {
        e.preventDefault();
        const targetUrl = e.currentTarget.href;
        
        document.body.classList.add('page-transition-out');
        
        setTimeout(() => {
            window.location.href = targetUrl;
        }, 300);
    };

    // Add transition effect to internal links
    document.querySelectorAll('a:not([href^="#"])').forEach(link => {
        if (link.hostname === window.location.hostname) {
            link.addEventListener('click', handlePageTransition);
        }
    });
});

// Handle page load transitions
window.addEventListener('load', function() {
    document.body.classList.add('page-loaded');
    
    // Remove loading class after a delay
    setTimeout(() => {
        document.body.classList.remove('loading');
    }, 500);
});
