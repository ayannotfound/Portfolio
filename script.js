// Counter animation for stats
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const increment = target / 60; // 60 frames for smooth animation
        let current = 0;
        
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                counter.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target + '+';
            }
        };
        
        updateCounter();
    });
}

// Trigger counter animation when hero section is visible
const heroStatsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                animateCounters();
            }, 1000); // Start after 1 second delay
            heroStatsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

// Dark mode toggle functionality
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

// Function to update navbar background based on theme
function updateNavbarTheme() {
    const nav = document.querySelector('.nav');
    const isLightMode = body.classList.contains('light-mode');
    
    if (window.scrollY > 100) {
        if (isLightMode) {
            nav.style.background = 'rgba(255, 255, 255, 0.98)';
        } else {
            nav.style.background = 'rgba(15, 23, 42, 0.98)';
        }
        nav.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        if (isLightMode) {
            nav.style.background = 'rgba(255, 255, 255, 0.95)';
        } else {
            nav.style.background = 'rgba(15, 23, 42, 0.95)';
        }
        nav.style.boxShadow = 'none';
    }
}

// Check for saved theme preference or default to dark mode
const currentTheme = localStorage.getItem('theme') || 'dark';
if (currentTheme === 'light') {
    body.classList.add('light-mode');
    themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
} else {
    themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
}

// Update navbar on initial load
updateNavbarTheme();

themeToggle.addEventListener('click', () => {
    body.classList.toggle('light-mode');
    
    if (body.classList.contains('light-mode')) {
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        localStorage.setItem('theme', 'light');
    } else {
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        localStorage.setItem('theme', 'dark');
    }
    
    // Update navbar immediately when theme changes
    updateNavbarTheme();
    
    // Update Vanta background colors
    setTimeout(() => {
        updateVantaTheme();
    }, 100);
});

// Handle window resize to update Vanta mobile optimization
window.addEventListener('resize', () => {
    clearTimeout(window.resizeTimeout);
    window.resizeTimeout = setTimeout(() => {
        updateVantaTheme();
    }, 250);
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Mobile navigation toggle
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
});

// Close mobile menu when clicking on links
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

// Active navigation link highlighting
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === current) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', updateActiveNavLink);
window.addEventListener('load', updateActiveNavLink);

// Smooth scroll with progress indicator
function updateScrollProgress() {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    
    // Update custom scrollbar if exists
    const progressBar = document.querySelector('.scroll-progress');
    if (progressBar) {
        progressBar.style.width = scrolled + '%';
    }
}

// Parallax effect for hero section
function updateParallax() {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const rate = scrolled * -0.3;
    
    if (hero && scrolled < hero.offsetHeight) {
        hero.style.transform = `translateY(${rate}px)`;
    }
}

// Enhanced navbar scroll behavior
function enhancedNavbarScroll() {
    const nav = document.querySelector('.nav');
    const scrolled = window.scrollY;
    
    if (scrolled > 100) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
    
    updateNavbarTheme();
}

// Throttled scroll handler for better performance
let ticking = false;
function requestTick() {
    if (!ticking) {
        requestAnimationFrame(() => {
            updateScrollProgress();
            updateParallax();
            enhancedNavbarScroll();
            updateActiveNavLink();
            updateScrollToTopButton();
            ticking = false;
        });
        ticking = true;
    }
}

// Scroll to top button functionality
function updateScrollToTopButton() {
    const scrollToTopBtn = document.getElementById('scroll-to-top');
    if (scrollToTopBtn) {
        if (window.scrollY > 500) {
            scrollToTopBtn.classList.add('visible');
        } else {
            scrollToTopBtn.classList.remove('visible');
        }
    }
}

// Initialize scroll to top button
function initScrollToTop() {
    const scrollToTopBtn = document.getElementById('scroll-to-top');
    if (scrollToTopBtn) {
        scrollToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

window.addEventListener('scroll', requestTick);

// Enhanced Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -80px 0px'
};

const scrollAnimationObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Add a small delay to make animations feel more natural
            setTimeout(() => {
                entry.target.classList.add('animate-in');
            }, 100);
            
            // Unobserve after animation to improve performance
            scrollAnimationObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

// Enhanced staggered animations for grids
function observeStaggeredElements() {
    const staggerContainers = document.querySelectorAll('.stagger-animation');
    
    staggerContainers.forEach(container => {
        const items = container.querySelectorAll('.animate-on-scroll');
        
        const staggerObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const items = entry.target.querySelectorAll('.animate-on-scroll');
                    
                    items.forEach((item, index) => {
                        setTimeout(() => {
                            item.classList.add('animate-in');
                        }, index * 150); // Stagger delay of 150ms
                    });
                    
                    staggerObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.2,
            rootMargin: '0px 0px -50px 0px'
        });
        
        staggerObserver.observe(container);
    });
}

// Observe individual elements for scroll animations
function observeScrollAnimations() {
    const animateElements = document.querySelectorAll('.animate-on-scroll:not(.stagger-animation .animate-on-scroll)');
    animateElements.forEach(el => scrollAnimationObserver.observe(el));
}

// Form submission - Web3Forms implementation (simplest solution)
const contactForm = document.getElementById('contact-form');

contactForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const submitBtn = this.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    
    // Show loading state
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    
    try {
        // Get form data
        const formData = new FormData(this);
        
        // Simple validation
        const name = formData.get('name');
        const email = formData.get('email');
        const customSubject = formData.get('custom_subject');
        const message = formData.get('message');
        
        if (!name || !email || !customSubject || !message) {
            throw new Error('Please fill in all fields.');
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            throw new Error('Please enter a valid email address.');
        }
        
        // Check if access key is configured
        const accessKey = formData.get('access_key');
        if (!accessKey || accessKey === 'YOUR_ACCESS_KEY_HERE') {
            throw new Error('Contact form not configured yet');
        }
        
        // Submit to Web3Forms
        const response = await fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            body: formData
        });
        
        const result = await response.json();
        
        if (result.success) {
            // Success - show success message and reset form
            this.reset();
            showSuccessMessage('Message sent successfully! I\'ll get back to you soon.');
        } else {
            throw new Error(result.message || 'Failed to send message');
        }
        
    } catch (error) {
        console.log('Form submission error:', error.message);
        
        if (error.message.includes('not configured')) {
            showErrorMessage('Contact form is being set up. Please email me directly at ayanwastaken0@gmail.com for now.');
        } else {
            showErrorMessage('Sorry, there was an error sending your message. Please try again or contact me directly at ayanwastaken0@gmail.com');
        }
    } finally {
        // Reset button state
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }
});

// Success message function
function showSuccessMessage(message) {
    removeExistingMessages();
    const messageDiv = document.createElement('div');
    messageDiv.className = 'form-message success';
    messageDiv.textContent = message;
    
    const form = document.getElementById('contact-form');
    form.appendChild(messageDiv);
    
    setTimeout(() => {
        messageDiv.remove();
    }, 5000);
}

// Error message function
function showErrorMessage(message) {
    removeExistingMessages();
    const messageDiv = document.createElement('div');
    messageDiv.className = 'form-message error';
    messageDiv.textContent = message;
    
    const form = document.getElementById('contact-form');
    form.appendChild(messageDiv);
    
    setTimeout(() => {
        messageDiv.remove();
    }, 5000);
}

// Remove existing messages to prevent duplicates
function removeExistingMessages() {
    const existingMessages = document.querySelectorAll('.form-message');
    existingMessages.forEach(msg => msg.remove());
}

// Typing animation for code window - fast and clean
function typeCode() {
    const codeLines = document.querySelectorAll('.code-line .code-text');
    let currentLine = 0;
    
    function typeLine(lineElement) {
        const text = lineElement.innerHTML;
        lineElement.innerHTML = '';
        lineElement.style.opacity = '1';
        
        let i = 0;
        const typeInterval = setInterval(() => {
            if (i < text.length) {
                lineElement.innerHTML = text.substring(0, i + 1);
                i++;
            } else {
                clearInterval(typeInterval);
                currentLine++;
                
                // Type next line immediately after current line is complete
                if (currentLine < codeLines.length) {
                    setTimeout(() => {
                        typeLine(codeLines[currentLine]);
                    }, 50); // Very short delay between lines
                }
            }
        }, 30); // Much faster typing speed
    }
    
    // Start typing from first line
    if (codeLines.length > 0) {
        // Hide all lines initially
        codeLines.forEach(line => {
            line.style.opacity = '0';
        });
        
        // Start typing first line immediately
        setTimeout(() => {
            typeLine(codeLines[0]);
        }, 100);
    }
}

// Start typing animation when code window is visible
const codeWindow = document.querySelector('.code-window');
const codeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            setTimeout(typeCode, 1000);
            codeObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

if (codeWindow) {
    codeObserver.observe(codeWindow);
}

// Navbar background on scroll - updated for dark mode
window.addEventListener('scroll', updateNavbarTheme);

// Particle effect for hero section (optional enhancement)
function createParticle() {
    const hero = document.querySelector('.hero');
    const particle = document.createElement('div');
    particle.style.cssText = `
        position: absolute;
        width: 4px;
        height: 4px;
        background: var(--primary-color);
        border-radius: 50%;
        opacity: 0.6;
        pointer-events: none;
        z-index: -1;
    `;
    
    const x = Math.random() * hero.offsetWidth;
    const y = Math.random() * hero.offsetHeight;
    
    particle.style.left = x + 'px';
    particle.style.top = y + 'px';
    
    hero.appendChild(particle);
    
    // Animate particle
    const duration = Math.random() * 3000 + 2000;
    const angle = Math.random() * 360;
    const distance = Math.random() * 100 + 50;
    
    const deltaX = Math.cos(angle * Math.PI / 180) * distance;
    const deltaY = Math.sin(angle * Math.PI / 180) * distance;
    
    particle.animate([
        { transform: 'translate(0, 0)', opacity: 0.6 },
        { transform: `translate(${deltaX}px, ${deltaY}px)`, opacity: 0 }
    ], {
        duration: duration,
        easing: 'ease-out'
    }).onfinish = () => particle.remove();
}

// Create particles periodically
setInterval(createParticle, 300);

// Enhanced skill tag hover effects with ripple animation
function initSkillTagEffects() {
    document.querySelectorAll('.skill-tag').forEach(tag => {
        // Enhanced hover effect
        tag.addEventListener('mouseenter', function(e) {
            this.style.transform = 'translateY(-3px) scale(1.05)';
            this.style.boxShadow = '0 8px 25px rgba(99, 102, 241, 0.3)';
        });
        
        tag.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = 'none';
        });
        
        // Ripple effect on click
        tag.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s linear;
                pointer-events: none;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        });
    });
}

// Enhanced project card tilt and glow effects
function initProjectCardEffects() {
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.1s ease';
        });
        
        card.addEventListener('mousemove', function(e) {
            if (window.innerWidth > 768) { // Only enable on desktop
                const rect = this.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = (y - centerY) / 8;
                const rotateY = (centerX - x) / 8;
                
                this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px) scale(1.02)`;
                this.style.boxShadow = '0 25px 50px rgba(0, 0, 0, 0.25)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transition = 'all 0.3s ease';
            this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0) scale(1)';
            this.style.boxShadow = '';
        });
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Set initial active nav link
    updateActiveNavLink();
    
    // Add loading animation classes
    document.body.classList.add('loaded');
    
    // Initialize scroll animations
    observeScrollAnimations();
    observeStaggeredElements();
    
    // Initialize enhanced effects
    initSkillTagEffects();
    initProjectCardEffects();
    initScrollToTop();
    
    // Initialize Vanta.js background effect
    setTimeout(() => {
        initVantaBackground();
    }, 100);
    
    // Observe hero stats for counter animation
    const heroStats = document.querySelector('.hero-stats');
    if (heroStats) {
        heroStatsObserver.observe(heroStats);
    }
    
    // Performance optimization: lazy load images
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                        imageObserver.unobserve(img);
                    }
                }
            });
        });
        
        document.querySelectorAll('img[data-src]').forEach(img => {
            // Prepare load/error handlers before setting src so we can toggle visibility
            img.addEventListener('load', () => img.classList.add('loaded'), { once: true });
            img.addEventListener('error', () => img.classList.add('error'), { once: true });
            imageObserver.observe(img);
        });
    }
    
    // Add subtle entrance animation to the whole page
    setTimeout(() => {
        document.body.style.opacity = '1';
        
        // Fallback: ensure hero content is visible
        const heroElements = document.querySelectorAll('.hero-content > *');
        heroElements.forEach(el => {
            if (getComputedStyle(el).opacity === '0') {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }
        });
    }, 200);
});

// Easter egg: Konami code
const konamiCode = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];
let konamiIndex = 0;

document.addEventListener('keydown', (e) => {
    if (e.keyCode === konamiCode[konamiIndex]) {
        konamiIndex++;
        if (konamiIndex === konamiCode.length) {
            // Easter egg triggered
            document.body.style.filter = 'hue-rotate(180deg)';
            setTimeout(() => {
                document.body.style.filter = 'none';
            }, 2000);
            konamiIndex = 0;
        }
    } else {
        konamiIndex = 0;
    }
});

// Console message
console.log(`
    ╔═══════════════════════════════════════════════════════════════╗
    ║                                                               ║
    ║                    👋 Hey there, fellow dev!                  ║
    ║                                                               ║
    ║        Thanks for checking out the console! If you're        ║
    ║        curious about how this portfolio was built or         ║
    ║        want to collaborate on something cool, feel free      ║
    ║        to reach out at ayanwastaken0@gmail.com              ║
    ║                                                               ║
    ║                        Happy coding! 🚀                      ║
    ║                                                               ║
    ╚═══════════════════════════════════════════════════════════════╝
`);

// Vanta.js background initialization
let vantaEffect = null;

function initVantaBackground() {
    console.log('Initializing Vanta background...');
    console.log('VANTA available:', typeof VANTA !== 'undefined');
    console.log('THREE available:', typeof THREE !== 'undefined');
    
    const heroElement = document.querySelector('#home');
    console.log('Hero element found:', heroElement);
    
    if (typeof VANTA !== 'undefined' && typeof THREE !== 'undefined' && heroElement) {
        try {
            // Destroy existing effect if it exists
            if (vantaEffect) {
                vantaEffect.destroy();
            }
            
            const isLightMode = document.body.classList.contains('light-mode');
            const isMobile = window.innerWidth <= 768;
            
            vantaEffect = VANTA.NET({
                el: "#home",
                mouseControls: true,
                touchControls: true,
                gyroControls: false,
                minHeight: window.innerHeight,
                minWidth: 200.00,
                scale: 1.00,
                scaleMobile: 1.00,
                color: isLightMode ? 0x6366f1 : 0x808080,
                backgroundColor: isLightMode ? 0xf8fafc : 0x0f172a,
                points: isMobile ? 6.00 : 12.00,
                maxDistance: isMobile ? 15.00 : 22.00,
                spacing: isMobile ? 20.00 : 16.00
            });
            
            console.log('Vanta effect initialized:', vantaEffect);
            
            // Make sure the effect covers the full viewport including navbar
            setTimeout(() => {
                if (vantaEffect && vantaEffect.el) {
                    const canvas = vantaEffect.el.querySelector('canvas');
                    if (canvas) {
                        canvas.style.position = 'fixed';
                        canvas.style.top = '0';
                        canvas.style.left = '0';
                        canvas.style.width = '100%';
                        // Use small viewport height on mobile to avoid jump when address bar hides
                        canvas.style.height = '100svh';
                        canvas.style.zIndex = '-1';
                    }
                }
            }, 100);
            
        } catch (error) {
            console.error('Error initializing Vanta effect:', error);
        }
    } else {
        console.log('Requirements not met:');
        console.log('- VANTA:', typeof VANTA !== 'undefined');
        console.log('- THREE:', typeof THREE !== 'undefined');
        console.log('- Hero element:', !!heroElement);
    }
}

// Update Vanta colors when theme changes
function updateVantaTheme() {
    if (vantaEffect) {
        const isLightMode = document.body.classList.contains('light-mode');
        const isMobile = window.innerWidth <= 768;
        
        try {
            vantaEffect.setOptions({
                color: isLightMode ? 0x6366f1 : 0x404040,
                backgroundColor: isLightMode ? 0xf8fafc : 0x0f172a,
                points: isMobile ? 6.00 : 12.00,
                maxDistance: isMobile ? 15.00 : 22.00,
                spacing: isMobile ? 20.00 : 16.00
            });
            console.log('Vanta theme updated:', isLightMode ? 'light' : 'dark');
        } catch (error) {
            console.error('Error updating Vanta theme:', error);
        }
    }
}