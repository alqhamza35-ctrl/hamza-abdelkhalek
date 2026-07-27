// --- Theme Toggle ---
function initTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
}

function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
}

function updateThemeIcon(theme) {
    const themeBtn = document.querySelector('.theme-toggle');
    if (themeBtn) {
        themeBtn.textContent = theme === 'light' ? '🌙' : '☀️';
    }
}

// --- Mobile Menu ---
function initMobileMenu() {
    const mobileMenu = document.querySelector('.mobile-menu');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenu && navLinks) {
        mobileMenu.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });

        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
            });
        });
    }
}

// --- Scroll Animation ---
function initScrollAnimation() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    document.querySelectorAll('.project-card, .skill-item, .contact-item, .certificate-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });
}

// --- Skills Bar Animation ---
function initSkillsAnimation() {
    const skillBars = document.querySelectorAll('.skill-bar .progress');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const width = entry.target.getAttribute('data-width');
                entry.target.style.width = width;
            }
        });
    }, { threshold: 0.5 });

    skillBars.forEach(bar => {
        bar.style.width = '0';
        observer.observe(bar);
    });
}

// --- Navbar Scroll Effect ---
function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.boxShadow = '0 2px 20px rgba(212, 175, 55, 0.2)';
        } else {
            navbar.style.boxShadow = '0 2px 15px rgba(0, 0, 0, 0.1)';
        }
    });
}

// --- Click Glow Effect (throttled) ---
function initClickGlow() {
    let lastGlow = 0;
    document.addEventListener('click', (e) => {
        const now = Date.now();
        if (now - lastGlow < 100) return;
        lastGlow = now;

        const glow = document.createElement('div');
        glow.style.cssText = `
            position: fixed;
            width: 20px;
            height: 20px;
            background: radial-gradient(circle, rgba(212, 175, 55, 0.8), transparent);
            border-radius: 50%;
            pointer-events: none;
            left: ${e.clientX - 10}px;
            top: ${e.clientY - 10}px;
            animation: clickGlow 0.6s ease-out forwards;
            z-index: 9999;
        `;
        document.body.appendChild(glow);
        setTimeout(() => glow.remove(), 600);
    });

    const style = document.createElement('style');
    style.textContent = `
        @keyframes clickGlow {
            0% { transform: scale(1); opacity: 1; }
            100% { transform: scale(5); opacity: 0; }
        }
    `;
    document.head.appendChild(style);
}

// --- Init ---
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initMobileMenu();
    initScrollAnimation();
    initSkillsAnimation();
    initNavbarScroll();
    initClickGlow();
});
