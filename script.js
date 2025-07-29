// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initNavigation();
    initScrollEffects();
    initContactForm();
    initAnimations();
    initSmoothScrolling();
    initThemeToggle();
});

// Navigation functionality
function initNavigation() {
    const header = document.querySelector('.header');
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-menu a');

    // Header scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Mobile menu toggle
    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.classList.toggle('nav-open');
    });

    // Close mobile menu when clicking on links
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.classList.remove('nav-open');
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.nav') && navMenu.classList.contains('active')) {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.classList.remove('nav-open');
        }
    });
}

// Scroll effects and animations
function initScrollEffects() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.service-card, .stat, .contact-info, .contact-form-container');
    animateElements.forEach(el => observer.observe(el));
}

// Smooth scrolling for navigation links
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Contact form handling
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', handleFormSubmit);
    }
}

async function handleFormSubmit(e) {
    e.preventDefault();
    
    const form = e.target;
    const submitBtn = form.querySelector('button[type="submit"]');
    const formData = new FormData(form);
    
    // Show loading state
    submitBtn.classList.add('loading');
    submitBtn.disabled = true;
    
    // Remove any existing messages
    removeMessages();
    
    try {
        // Validate form
        if (!validateForm(formData)) {
            throw new Error('Please fill in all required fields.');
        }
        
        // Prepare data for API
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            company: formData.get('company'),
            phone: formData.get('phone'),
            currentSystem: formData.get('currentSystem'),
            targetSystem: formData.get('targetSystem'),
            message: formData.get('message'),
            timestamp: new Date().toISOString(),
            source: 'TechBridge Solutions Website'
        };
        
        // Send to API
        //const response = await fetch('https://contact.oursite.com/contact', {
        //    method: 'POST',
        //    headers: {
        //        'Content-Type': 'application/json',
        //    },
        //    body: JSON.stringify(data)
        //});
        //
        //if (!response.ok) {
        //    throw new Error('Failed to send message. Please try again.');
        //}
        
        // Success

        showMessage('Thank you! Your message has been sent successfully. We\'ll get back to you soon.', 'success');
        form.reset();
        
    } catch (error) {
        console.error('Form submission error:', error);
        showMessage(error.message || 'An error occurred. Please try again.', 'error');
    } finally {
        // Reset button state
        submitBtn.classList.remove('loading');
        submitBtn.disabled = false;
    }
}

function validateForm(formData) {
    const requiredFields = ['name', 'email', 'message'];
    
    for (const field of requiredFields) {
        const value = formData.get(field);
        if (!value || value.trim() === '') {
            return false;
        }
    }
    
    // Basic email validation
    const email = formData.get('email');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return false;
    }
    
    return true;
}

function showMessage(message, type) {
    const form = document.body
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}`;
    messageDiv.textContent = message;
    form.insertBefore(messageDiv, form.firstChild);
     
    setTimeout(() => {
        if (messageDiv.parentNode) {
            messageDiv.remove();
        }
    }, 5000);
}

function removeMessages() {
    const messages = document.querySelectorAll('.message');
    messages.forEach(msg => msg.remove());
}

// Additional animations
function initAnimations() {
    // Animate stats on scroll
    const stats = document.querySelectorAll('.stat-animate');
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateNumber(entry.target); //TODO: Put back in
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    stats.forEach(stat => statsObserver.observe(stat));
    
    // Parallax effect for hero section
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        if (hero) {
            const rate = scrolled * -0.5;
            hero.style.transform = `translateY(${rate}px)`;
        }
    });
}

function animateMaskedNumber(element) {
    const startRaw = element.getAttribute('data-start');
    const endRaw = element.getAttribute('data-target') || element.getAttribute('data-targer'); // typo fallback
    if (!startRaw || !endRaw) return;

    // Extract parts: ["00", "/", "0"] and ["24", "/", "7"], or ["0", "%"] and ["98", "%"]
    const startParts = startRaw.match(/(\d+|\D+)/g);
    const endParts = endRaw.match(/(\d+|\D+)/g);

    if (!startParts || !endParts || startParts.length !== endParts.length) {
        console.error("Mismatch in start and end format:", element);
        return;
    }

    const numericIndexes = [];
    const startNums = startParts.map((part, i) => {
        const target = endParts[i];
        if (/^\d+$/.test(part) && /^\d+$/.test(target)) {
            numericIndexes.push(i);
            return parseInt(part, 10);
        }
        return part;
    });

    const endNums = endParts.map((part, i) => {
        if (numericIndexes.includes(i)) {
            return parseInt(part, 10);
        }
        return part;
    });

    let progress = 0;
    const steps = 50;
    const interval = 20;

    const timer = setInterval(() => {
        progress += 1;
        const rendered = startNums.map((val, i) => {
            if (numericIndexes.includes(i)) {
                const current = val + (endNums[i] - val) * (progress / steps);
                return Math.floor(current);
            }
            return val;
        });

        element.textContent = rendered.join('');

        if (progress >= steps) {
            element.textContent = endRaw;
            clearInterval(timer);
        }
    }, interval);
}


function animateNumber(element) {
    animateMaskedNumber(element);
}


// Performance optimizations
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Optimize scroll events
const optimizedScrollHandler = debounce(() => {
    // Scroll-based animations and effects
}, 16);

window.addEventListener('scroll', optimizedScrollHandler);

// Add loading animation for images
document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('load', () => {
            img.classList.add('loaded');
        });
    });
});

// Add keyboard navigation support
document.addEventListener('keydown', (e) => {
    // Close mobile menu with Escape key
    if (e.key === 'Escape') {
        const navMenu = document.querySelector('.nav-menu');
        const navToggle = document.querySelector('.nav-toggle');
        
        if (navMenu.classList.contains('active')) {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.classList.remove('nav-open');
        }
    }
});

// Add focus management for accessibility
document.addEventListener('DOMContentLoaded', () => {
    const focusableElements = document.querySelectorAll(
        'a[href], button, textarea, input[type="text"], input[type="email"], input[type="tel"], select'
    );
    
    // Trap focus in mobile menu
    const navMenu = document.querySelector('.nav-menu');
    const firstFocusable = navMenu.querySelector('a');
    const lastFocusable = navMenu.querySelector('a:last-child');
    
    if (firstFocusable && lastFocusable) {
        lastFocusable.addEventListener('keydown', (e) => {
            if (e.key === 'Tab' && !e.shiftKey) {
                e.preventDefault();
                firstFocusable.focus();
            }
        });
        
        firstFocusable.addEventListener('keydown', (e) => {
            if (e.key === 'Tab' && e.shiftKey) {
                e.preventDefault();
                lastFocusable.focus();
            }
        });
    }
});

// Add service worker for offline functionality (optional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}

// Add analytics tracking (example)
function trackEvent(eventName, eventData = {}) {
    // Example analytics tracking
    if (typeof gtag !== 'undefined') {
        gtag('event', eventName, eventData);
    }
    
    // Track form submissions
    if (eventName === 'form_submit') {
        console.log('Form submitted:', eventData);
    }
}

// Theme Toggle Functionality
function initThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    const themeDropdown = document.getElementById('themeDropdown');
    const themeOptions = document.querySelectorAll('.theme-option');
    
    // Load saved theme from localStorage
    const savedTheme = localStorage.getItem('selectedTheme') || 'light';
    setTheme(savedTheme);
    
    // Toggle dropdown
    themeToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        themeDropdown.classList.toggle('active');
    });
    
    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.theme-toggle')) {
            themeDropdown.classList.remove('active');
        }
    });
    
    // Handle theme selection
    themeOptions.forEach(option => {
        option.addEventListener('click', () => {
            const theme = option.getAttribute('data-theme');
            setTheme(theme);
            themeDropdown.classList.remove('active');
            
            // Update active state
            themeOptions.forEach(opt => opt.classList.remove('active'));
            option.classList.add('active');
        });
    });
    
    // Set initial active state
    themeOptions.forEach(option => {
        if (option.getAttribute('data-theme') === savedTheme) {
            option.classList.add('active');
        }
    });
}

function setTheme(theme) {
    // Find the theme-specific stylesheet link
    const themeLinks = document.querySelectorAll('link[rel="stylesheet"]');
    let themeLink = null;
    
    // Find the theme-specific stylesheet (not base.css)
    for (let link of themeLinks) {
        if (link.href.includes('style-') && !link.href.includes('base.css')) {
            themeLink = link;
            break;
        }
    }
    
    // Map theme names to CSS files
    const themeFiles = {
        'light': 'style-0.css',
        'dark': 'style-1.css',
        'yellow': 'style-2.css',
        'sunset': 'style-3.css',
        'tropical': 'style-4.css',
        'business': 'style-5.css',
        'delux': 'style-6.css',
        'scorchedsand': 'style-7.css',
        'wine': 'style-8.css',
        'clear': 'style-9.css',
        'purplehaze': 'style-10.css'
    };
    
    const newHref = themeFiles[theme];
    
    if (newHref && themeLink && !themeLink.href.includes(newHref)) {
        // Create new link element
        const newLink = document.createElement('link');
        newLink.rel = 'stylesheet';
        newLink.href = newHref;
        
        // Replace the old theme stylesheet
        themeLink.parentNode.replaceChild(newLink, themeLink);
        
        // Save theme preference
        localStorage.setItem('selectedTheme', theme);
        
        // Add transition effect
        document.body.style.transition = 'all 0.3s ease';
        setTimeout(() => {
            document.body.style.transition = '';
        }, 300);
    }
}

// Export functions for potential external use
window.TechBridge = {
    trackEvent,
    showMessage,
    validateForm,
    setTheme
}; 