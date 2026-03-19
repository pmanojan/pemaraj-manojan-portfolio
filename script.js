// ============================================
// PROJECT DATA
// ============================================
const projectsData = {
    'campus-network': {
        title: 'Campus Network Infrastructure Design',
        description: 'A comprehensive network infrastructure project for BCAS Campus featuring enterprise-grade networking solutions. The project involved designing and implementing a scalable network architecture with VLAN segmentation for different departments, OSPF routing for efficient traffic management, and FortiGate firewall integration for security. The infrastructure supports 500+ concurrent users with 99.9% uptime and includes redundant links for high availability.',
        icon: 'fa-network-wired',
        category: 'Networking',
        duration: '4 Months',
        status: 'Completed',
        role: 'Network Architect',
        techStack: ['VLAN', 'OSPF', 'FortiGate', 'Cisco'],
        demoUrl: '#',
        githubUrl: 'https://github.com/pmanojan/BCAS-Campus-Network-Simulation-using-Packet-Tracer-BCAS-Assignment-#'
    },
    'pentest-tool': {
        title: 'Crawler – Email, Phone & Social Media Scraper',
        description: 'An asynchronous Python 3 crawler that extracts emails, phone numbers, and social media links from target websites. Features include handling obfuscated formats, random user-agents, SSL bypass, and flexible page limits.',
        icon: 'fa-spider',
        category: 'Development',
        duration: '1 Month',
        status: 'Completed',
        role: 'Python Developer',
        techStack: ['Python 3.8+', 'aiohttp', 'BeautifulSoup4', 'lxml'],
        demoUrl: '#',
        githubUrl: 'https://github.com/pmanojan/crawler-email-phone-scraper'
    },
    'inventory': {
        title: 'Point of Sale System for LankaPC',
        description: 'A comprehensive Point of Sale (POS) system developed for LankaPC Sri Lanka as a BCAS assignment. Built using Java with NetBeans IDE, featuring inventory management, sales tracking, billing, and reporting functionalities. The system includes customer management, product inventory, sales transactions, invoice generation, and daily/monthly sales reports.',
        icon: 'fa-cash-register',
        category: 'Development',
        duration: '2 Months',
        status: 'Completed',
        role: 'Full Stack Developer',
        techStack: ['Java', 'NetBeans', 'MySQL', 'Swing'],
        demoUrl: '#',
        githubUrl: 'https://github.com/pmanojan/Point-of-Sale-System-for-LankaPC-Sri-Lanka-BCAS-Assignment---Developed-in-Java-using-NetBeans-IDE'
    },
    'wifi-analyzer': {
        title: 'CCNA Exam Preparation Lab in Packet Tracer',
        description: 'Comprehensive CCNA lab developed using Cisco Packet Tracer, providing hands-on experience with core networking concepts and protocols. The lab includes configuration of OSPF routing, VLANs and Inter-VLAN routing, extended ACLs, DHCP and DNS services, FTP server setup, and Layer 3 switching. It also covers link aggregation (PAgP & LACP), IPv4 addressing and subnetting, port security using MAC addresses, and router & switch management for real-world enterprise network scenarios.',
        icon: 'fa-network-wired',
        category: 'Networking',
        duration: '8 Weeks',
        status: 'Completed',
        role: 'Network Engineer',
        techStack: ['Packet Tracer', 'OSPF', 'VLAN', 'ACL'],
        demoUrl: '#',
        githubUrl: 'https://github.com/pmanojan/CCNA-Exam-Preparation-Lab-in-Packet-Tracer'
    },
    'firewall': {
        title: 'Network Automation using GNS3 & Netmiko',
        description: 'Developed a network automation project using GNS3, Python, and Netmiko to automate configuration and management of network devices. The topology includes OSPF routing, VLANs, IPv4 addressing, and subnetting. Integrated a real WiFi connection for practical testing, enhancing automation skills and real-world network deployment experience.',
        icon: 'fa-code',
        category: 'Networking',
        duration: 'Ongoing',
        status: 'In Progress',
        role: 'Network Automation Engineer',
        techStack: ['GNS3', 'Python', 'Netmiko', 'OSPF'],
        demoUrl: '#',
        githubUrl: 'https://github.com/pmanojan/Excited-to-share-my-latest-network-automation-project-using-GNS3-and-Netmiko-'
    }
};

// ============================================
// GLOBAL VARIABLES
// ============================================
let particles = [];
const particleCount = 80;
const connectionDistance = 150;
let countersAnimated = false;

// Typing effect variables
const phrases = [
    'Network Administrator',
    'IT & System Administrator',
    'Penetration Tester',
    'Python Developer',
    'Java Developer',
    'IT Educator'
];
let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 100;

// ============================================
// DOM ELEMENTS
// ============================================
let canvas, ctx, navbar, navMenu, mobileMenuBtn, scrollTopBtn, typingTextElement, projectModal;

// ============================================
// PARTICLE CLASS
// ============================================
class Particle {
    constructor(canvasWidth, canvasHeight) {
        this.x = Math.random() * canvasWidth;
        this.y = Math.random() * canvasHeight;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.radius = Math.random() * 2 + 1;
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > this.canvasWidth) this.vx *= -1;
        if (this.y < 0 || this.y > this.canvasHeight) this.vy *= -1;
    }

    draw(context) {
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        context.fillStyle = 'rgba(0, 212, 255, 0.5)';
        context.fill();
    }
}

// ============================================
// PARTICLES ANIMATION FUNCTIONS
// ============================================
function resizeCanvas() {
    if (!canvas) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    initParticles();
}

function initParticles() {
    if (!canvas) return;
    particles = [];
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle(canvas.width, canvas.height));
    }
}

function connectParticles() {
    if (!ctx) return;
    for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < connectionDistance) {
                const opacity = 1 - (distance / connectionDistance);
                ctx.beginPath();
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.strokeStyle = `rgba(0, 212, 255, ${opacity * 0.2})`;
                ctx.lineWidth = 1;
                ctx.stroke();
            }
        }
    }
}

function animateParticles() {
    if (!ctx || !canvas) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach(particle => {
        particle.update();
        particle.draw(ctx);
    });

    connectParticles();
    requestAnimationFrame(animateParticles);
}

// ============================================
// TYPING EFFECT
// ============================================
function typeEffect() {
    if (!typingTextElement) return;
    
    const currentPhrase = phrases[phraseIndex];

    if (isDeleting) {
        typingTextElement.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 50;
    } else {
        typingTextElement.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 100;
    }

    if (!isDeleting && charIndex === currentPhrase.length) {
        isDeleting = true;
        typingSpeed = 2000;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        typingSpeed = 500;
    }

    setTimeout(typeEffect, typingSpeed);
}

// ============================================
// COUNTER ANIMATION
// ============================================
function animateCounters() {
    if (countersAnimated) return;
    
    const counters = document.querySelectorAll('.stat-number');
    if (counters.length === 0) return;
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-count'));
        if (isNaN(target)) return;
        
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;

        const updateCounter = () => {
            current += increment;
            if (current < target) {
                counter.textContent = Math.ceil(current) + '+';
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target + '+';
            }
        };

        updateCounter();
    });
    
    countersAnimated = true;
}

// ============================================
// SKILL BARS ANIMATION
// ============================================
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    if (skillBars.length === 0) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const width = entry.target.getAttribute('data-width');
                if (width) {
                    entry.target.style.width = width + '%';
                }
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    skillBars.forEach(bar => observer.observe(bar));
}

// ============================================
// REVEAL ON SCROLL
// ============================================
function revealOnScroll() {
    const reveals = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
    if (reveals.length === 0) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                
                // Trigger counter animation when hero section is visible
                if (entry.target.closest('.hero')) {
                    animateCounters();
                }
                
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    reveals.forEach(reveal => observer.observe(reveal));
}

// ============================================
// NAVBAR FUNCTIONS
// ============================================
function handleNavbarScroll() {
    if (!navbar) return;
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
}

function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    if (sections.length === 0 || navLinks.length === 0) return;

    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 200;
        const sectionHeight = section.offsetHeight;

        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

// ============================================
// MOBILE MENU FUNCTIONS
// ============================================
function toggleMobileMenu() {
    if (!mobileMenuBtn || !navMenu) return;
    mobileMenuBtn.classList.toggle('active');
    navMenu.classList.toggle('active');
    document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
}

function closeMobileMenu() {
    if (!mobileMenuBtn || !navMenu) return;
    mobileMenuBtn.classList.remove('active');
    navMenu.classList.remove('active');
    document.body.style.overflow = '';
}

// ============================================
// SCROLL TO TOP FUNCTIONS
// ============================================
function handleScrollTopVisibility() {
    if (!scrollTopBtn) return;
    if (window.scrollY > 500) {
        scrollTopBtn.classList.add('visible');
    } else {
        scrollTopBtn.classList.remove('visible');
    }
}

function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ============================================
// PROJECT MODAL FUNCTIONS
// ============================================
function openProjectModal(projectId) {
    const project = projectsData[projectId];
    if (!project || !projectModal) {
        console.warn(`Project "${projectId}" not found in projectsData`);
        return;
    }

    const modalTitle = document.getElementById('modal-title');
    const modalDescription = document.getElementById('modal-description');
    const modalIcon = document.getElementById('modal-icon');
    const modalCategory = document.getElementById('modal-category');
    const modalDuration = document.getElementById('modal-duration');
    const modalStatus = document.getElementById('modal-status');
    const modalRole = document.getElementById('modal-role');
    const modalDemoBtn = document.getElementById('modal-demo-btn');
    const modalGithubBtn = document.getElementById('modal-github-btn');

    if (modalTitle) modalTitle.textContent = project.title;
    if (modalDescription) modalDescription.textContent = project.description;
    if (modalIcon) modalIcon.className = `fas ${project.icon}`;
    if (modalCategory) modalCategory.textContent = project.category;
    if (modalDuration) modalDuration.textContent = project.duration;
    if (modalStatus) modalStatus.textContent = project.status;
    if (modalRole) modalRole.textContent = project.role;
    if (modalDemoBtn) modalDemoBtn.href = project.demoUrl;
    if (modalGithubBtn) modalGithubBtn.href = project.githubUrl;

    // Handle tech stack display
    const techStackContainer = document.getElementById('modal-tech-stack');
    if (techStackContainer && project.techStack) {
        techStackContainer.innerHTML = project.techStack
            .map(tech => `<span class="tech-tag">${tech}</span>`)
            .join('');
    }

    projectModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeProjectModal() {
    if (!projectModal) return;
    projectModal.classList.remove('active');
    document.body.style.overflow = '';
}

// ============================================
// CERTIFICATION TABS
// ============================================
function initCertTabs() {
    const certTabs = document.querySelectorAll('.cert-tab');
    const certCards = document.querySelectorAll('.cert-card');

    if (certTabs.length === 0 || certCards.length === 0) return;

    certTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active class from all tabs
            certTabs.forEach(t => t.classList.remove('active'));
            // Add active class to clicked tab
            tab.classList.add('active');

            const filter = tab.getAttribute('data-filter');

            certCards.forEach(card => {
                const category = card.getAttribute('data-category');
                
                if (filter === 'all' || category === filter) {
                    card.style.display = 'flex';
                    card.style.opacity = '0';
                    setTimeout(() => {
                        card.style.opacity = '1';
                    }, 50);
                } else {
                    card.style.opacity = '0';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// ============================================
// PROJECT TABS
// ============================================
function initProjectTabs() {
    const projectTabs = document.querySelectorAll('.project-tab');
    const projectCards = document.querySelectorAll('.project-card');

    if (projectTabs.length === 0 || projectCards.length === 0) return;

    projectTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active class from all tabs
            projectTabs.forEach(t => t.classList.remove('active'));
            // Add active class to clicked tab
            tab.classList.add('active');

            const filter = tab.getAttribute('data-filter');

            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                
                if (filter === 'all' || category === filter) {
                    card.style.display = 'flex';
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// ============================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ============================================
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#' || href === '#!') return;
            
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                closeMobileMenu();
            }
        });
    });
}

// ============================================
// FORM SUBMISSION HANDLING
// ============================================
function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            const submitBtn = this.querySelector('.form-submit');
            if (!submitBtn) return;
            
            const originalText = submitBtn.innerHTML;
            
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;
            
            // Re-enable after form submission
            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }, 3000);
        });
    }
}

// ============================================
// IMAGE ERROR FALLBACK
// ============================================
function initImageFallback() {
    document.querySelectorAll('img').forEach(img => {
        img.addEventListener('error', function() {
            if (this.hasAttribute('data-fallback-handled')) return;
            this.setAttribute('data-fallback-handled', 'true');
            
            this.style.display = 'none';
            const parent = this.parentElement;
            if (parent && !parent.querySelector('.image-fallback')) {
                const fallback = document.createElement('div');
                fallback.className = 'image-fallback';
                fallback.innerHTML = '<i class="fas fa-user-tie"></i>';
                parent.appendChild(fallback);
            }
        });
    });
}

// ============================================
// EVENT LISTENERS
// ============================================
function initEventListeners() {
    // Scroll events with throttle
    const throttledScroll = throttle(() => {
        handleNavbarScroll();
        updateActiveNavLink();
        handleScrollTopVisibility();
    }, 100);
    
    window.addEventListener('scroll', throttledScroll);

    // Resize event with debounce
    const debouncedResize = debounce(resizeCanvas, 250);
    window.addEventListener('resize', debouncedResize);

    // Mobile menu toggle
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', toggleMobileMenu);
    }

    // Close mobile menu when clicking nav links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (navMenu && mobileMenuBtn && 
            !navMenu.contains(e.target) && 
            !mobileMenuBtn.contains(e.target) && 
            navMenu.classList.contains('active')) {
            closeMobileMenu();
        }
    });

    // Scroll to top button
    if (scrollTopBtn) {
        scrollTopBtn.addEventListener('click', scrollToTop);
    }

    // Close modal on outside click
    if (projectModal) {
        projectModal.addEventListener('click', function(e) {
            if (e.target === this) {
                closeProjectModal();
            }
        });
    }

    // Close modal button
    const modalCloseBtn = document.querySelector('.modal-close');
    if (modalCloseBtn) {
        modalCloseBtn.addEventListener('click', closeProjectModal);
    }

    // Close modal on ESC key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeProjectModal();
        }
    });

    // Keyboard navigation shortcuts
    document.addEventListener('keydown', function(e) {
        // Don't trigger if typing in input fields
        if (document.activeElement.tagName === 'INPUT' || 
            document.activeElement.tagName === 'TEXTAREA') {
            return;
        }
        
        // Press 'H' to go home
        if (e.key === 'h' || e.key === 'H') {
            const homeSection = document.querySelector('#home');
            if (homeSection) {
                homeSection.scrollIntoView({ behavior: 'smooth' });
            }
        }
        
        // Press 'T' to scroll to top
        if (e.key === 't' || e.key === 'T') {
            scrollToTop();
        }
    });
}

// ============================================
// PARALLAX EFFECT FOR HERO
// ============================================
function initParallax() {
    const heroVisual = document.querySelector('.hero-visual');
    if (!heroVisual) return;
    
    const throttledParallax = throttle(() => {
        if (window.scrollY < window.innerHeight) {
            const scrolled = window.scrollY;
            heroVisual.style.transform = `translateY(${scrolled * 0.3}px)`;
        }
    }, 16);
    
    window.addEventListener('scroll', throttledParallax);
}

// ============================================
// LAZY LOADING IMAGES
// ============================================
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    if (images.length === 0) return;
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                const src = img.getAttribute('data-src');
                if (src) {
                    img.src = src;
                    img.removeAttribute('data-src');
                }
                observer.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

// ============================================
// TOOLTIP INITIALIZATION
// ============================================
function initTooltips() {
    const tooltipElements = document.querySelectorAll('[data-tooltip]');
    
    tooltipElements.forEach(el => {
        el.addEventListener('mouseenter', function() {
            const title = this.getAttribute('data-tooltip');
            if (!title) return;
            
            const tooltip = document.createElement('div');
            tooltip.className = 'custom-tooltip';
            tooltip.textContent = title;
            document.body.appendChild(tooltip);
            
            const rect = this.getBoundingClientRect();
            tooltip.style.top = `${rect.top - tooltip.offsetHeight - 10}px`;
            tooltip.style.left = `${rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2)}px`;
            
            this.tooltipElement = tooltip;
        });
        
        el.addEventListener('mouseleave', function() {
            if (this.tooltipElement) {
                this.tooltipElement.remove();
                this.tooltipElement = null;
            }
        });
    });
}

// ============================================
// CONSOLE EASTER EGG
// ============================================
function showConsoleMessage() {
    const styles = {
        title: 'font-size: 20px; font-weight: bold; color: #00d4ff;',
        subtitle: 'font-size: 14px; color: #7c3aed;',
        contact: 'font-size: 12px; color: #10b981;'
    };
    
    console.log('%c👋 Hello there, fellow developer!', styles.title);
    console.log('%c🔒 Interested in cybersecurity? Let\'s connect!', styles.subtitle);
    console.log('%c📧 Contact: pemarajmanojan2000@gmail.com', styles.contact);
}

// ============================================
// DEBOUNCE UTILITY FUNCTION
// ============================================
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

// ============================================
// THROTTLE UTILITY FUNCTION
// ============================================
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// ============================================
// INITIALIZE DOM ELEMENTS
// ============================================
function initDOMElements() {
    canvas = document.getElementById('particles-canvas');
    if (canvas) {
        ctx = canvas.getContext('2d');
    }
    navbar = document.getElementById('navbar');
    navMenu = document.getElementById('nav-menu');
    mobileMenuBtn = document.getElementById('mobile-menu-btn');
    scrollTopBtn = document.getElementById('scroll-top');
    typingTextElement = document.getElementById('typing-text');
    projectModal = document.getElementById('project-modal');
}

// ============================================
// INITIALIZE APPLICATION
// ============================================
function init() {
    // Initialize DOM elements first
    initDOMElements();
    
    // Initialize canvas and particles
    if (canvas && ctx) {
        resizeCanvas();
        initParticles();
        animateParticles();
    }
    
    // Initialize typing effect
    if (typingTextElement) {
        typeEffect();
    }
    
    // Initialize animations
    animateSkillBars();
    revealOnScroll();
    
    // Initialize UI components
    initCertTabs();
    initProjectTabs();
    initSmoothScroll();
    initContactForm();
    initImageFallback();
    initEventListeners();
    initParallax();
    initLazyLoading();
    initTooltips();
    
    // Show console message
    showConsoleMessage();
}

// ============================================
// DOM CONTENT LOADED EVENT
// ============================================
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

// ============================================
// WINDOW LOAD EVENT
// ============================================
window.addEventListener('load', () => {
    // Additional initialization after all assets loaded
    document.body.classList.add('loaded');
    
    // Trigger counter animation if hero is visible
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        const rect = heroSection.getBoundingClientRect();
        if (rect.top < window.innerHeight) {
            animateCounters();
        }
    }
});

// ============================================
// EXPOSE FUNCTIONS TO GLOBAL SCOPE
// ============================================
window.openProjectModal = openProjectModal;
window.closeProjectModal = closeProjectModal;