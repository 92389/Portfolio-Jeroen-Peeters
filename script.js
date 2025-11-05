// Theme Toggle Functionality
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

// Check for saved theme preference or default to light mode
const currentTheme = localStorage.getItem('theme') || 'light';
body.setAttribute('data-theme', currentTheme);

// Update theme toggle button appearance
function updateThemeToggle() {
    const isDark = body.getAttribute('data-theme') === 'dark';
    themeToggle.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
}

// Initialize theme toggle
updateThemeToggle();

// Theme toggle event listener
themeToggle.addEventListener('click', () => {
    const currentTheme = body.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

    body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeToggle();

    // Add a smooth transition effect
    body.style.transition = 'background-color 0.3s ease, color 0.3s ease';
    setTimeout(() => {
        body.style.transition = '';
    }, 300);
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 70;
            const elementPosition = target.offsetTop;
            const offsetPosition = elementPosition - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Intersection Observer for Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.project-card, .skill-category, .stat').forEach(el => {
    observer.observe(el);
});

// Typing Animation for Hero Title
class TypeWriter {
    constructor(element, text, speed = 100) {
        this.element = element;
        this.text = text;
        this.speed = speed;
        this.index = 0;
        this.type();
    }

    type() {
        if (this.index < this.text.length) {
            this.element.innerHTML += this.text.charAt(this.index);
            this.index++;
            setTimeout(() => this.type(), this.speed);
        }
    }
}

// Initialize typing animation on page load
document.addEventListener('DOMContentLoaded', () => {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.innerHTML;
        heroTitle.innerHTML = 'Hello, I\'m ';
        setTimeout(() => {
            new TypeWriter(heroTitle, 'Jeroen Peeters', 150);
        }, 1000);
    }
});

// Parallax Effect for Hero Section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.backgroundPositionY = -(scrolled * 0.5) + 'px';
    }
});

// Skill Tags Hover Effect
document.querySelectorAll('.skill-tag').forEach(tag => {
    tag.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.1) rotate(2deg)';
    });

    tag.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1) rotate(0deg)';
    });
});

// Project Cards Hover Effect Enhancement
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-15px) rotateX(5deg)';
    });

    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) rotateX(0deg)';
    });
});

// Contact Form Handling
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Get form data
        const formData = new FormData(this);
        const name = formData.get('name');
        const email = formData.get('email');
        const message = formData.get('message');

        // Basic validation
        if (!name || !email || !message) {
            alert('Please fill in all fields.');
            return;
        }

        // Simulate form submission (replace with actual submission logic)
        alert('Thank you for your message! I\'ll get back to you soon.');

        // Reset form
        this.reset();
    });
}

// Scroll Progress Indicator
const scrollProgress = document.createElement('div');
scrollProgress.className = 'scroll-progress';
scrollProgress.innerHTML = '<div class="scroll-progress-bar"></div>';
document.body.appendChild(scrollProgress);

const scrollProgressBar = document.querySelector('.scroll-progress-bar');

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset;
    const docHeight = document.body.offsetHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;

    scrollProgressBar.style.width = scrollPercent + '%';
});

// Add CSS for scroll progress
const scrollProgressCSS = `
.scroll-progress {
    position: fixed;
    top: 70px;
    left: 0;
    width: 100%;
    height: 3px;
    background-color: var(--bg-secondary);
    z-index: 1000;
}

.scroll-progress-bar {
    height: 100%;
    background: linear-gradient(90deg, var(--accent-primary), var(--accent-secondary));
    width: 0%;
    transition: width 0.3s ease;
}
`;

const style = document.createElement('style');
style.textContent = scrollProgressCSS;
document.head.appendChild(style);

// Mobile Menu Toggle (if needed for smaller screens)
function initMobileMenu() {
    const nav = document.querySelector('nav');
    const navLinks = document.querySelector('.nav-links');

    if (window.innerWidth <= 768) {
        navLinks.style.display = 'none';

        const menuToggle = document.createElement('button');
        menuToggle.className = 'menu-toggle';
        menuToggle.innerHTML = '☰';
        menuToggle.style.cssText = `
            background: none;
            border: none;
            font-size: 1.5rem;
            cursor: pointer;
            color: var(--text-primary);
            margin-left: 20px;
        `;

        nav.appendChild(menuToggle);

        menuToggle.addEventListener('click', () => {
            navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
            navLinks.style.flexDirection = 'column';
            navLinks.style.position = 'absolute';
            navLinks.style.top = '70px';
            navLinks.style.left = '0';
            navLinks.style.width = '100%';
            navLinks.style.backgroundColor = 'var(--bg-primary)';
            navLinks.style.padding = '20px';
            navLinks.style.boxShadow = '0 5px 15px var(--shadow)';
        });
    }
}

// Initialize mobile menu on load and resize
window.addEventListener('load', initMobileMenu);
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        document.querySelector('.nav-links').style.display = 'flex';
    } else {
        initMobileMenu();
    }
});

// Performance optimization: Debounce scroll events
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

// Apply debounced scroll handler
window.addEventListener('scroll', debounce(() => {
    // Scroll-based animations or effects can be added here
}, 16));

// Accessibility: Keyboard navigation for theme toggle
themeToggle.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        themeToggle.click();
    }
});

// Add ARIA labels for better accessibility
themeToggle.setAttribute('aria-label', 'Toggle theme');
document.querySelectorAll('.btn').forEach(btn => {
    btn.setAttribute('role', 'button');
});

// Lazy loading for images (if more images are added)
const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.remove('lazy');
            observer.unobserve(img);
        }
    });
});

document.querySelectorAll('img[data-src]').forEach(img => {
    imageObserver.observe(img);
});

// Console message for developers
console.log('%cPortfolio Website', 'color: #4A90E2; font-size: 20px; font-weight: bold;');
console.log('%cBuilt with ❤️ by a Year 3 Software Development Student', 'color: #666; font-size: 14px;');
console.log('%cCheck out the source code on GitHub!', 'color: #E94B3C; font-size: 14px;');