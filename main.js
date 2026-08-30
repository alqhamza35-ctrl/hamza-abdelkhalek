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
        themeBtn.textContent = theme === 'light' ? '\u{1F319}' : '\u{2600}\u{FE0F}';
    }
}

// --- Mobile Menu ---
function initMobileMenu() {
    const mobileMenu = document.querySelector('.mobile-menu');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenu && navLinks) {
        mobileMenu.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            mobileMenu.classList.toggle('active');
        });

        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                mobileMenu.classList.remove('active');
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

    document.querySelectorAll('.project-card, .skill-item, .contact-item, .certificate-card, .stat-item').forEach(el => {
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
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// --- Scroll to Top ---
function initScrollToTop() {
    const scrollTopBtn = document.getElementById('scrollTop');

    if (scrollTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                scrollTopBtn.classList.add('visible');
            } else {
                scrollTopBtn.classList.remove('visible');
            }
        });
    }
}

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// --- Project Filter ---
function initProjectFilter() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    if (filterBtns.length === 0 || projectCards.length === 0) return;

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.getAttribute('data-filter');

            projectCards.forEach(card => {
                const tags = card.getAttribute('data-tags');

                if (filter === 'all' || tags.includes(filter)) {
                    card.classList.remove('hidden');
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 100);
                } else {
                    card.classList.add('hidden');
                }
            });

            updateProjectCount();
        });
    });
}

function updateProjectCount() {
    const visibleCards = document.querySelectorAll('.project-card:not(.hidden)');
    const countEl = document.getElementById('projectCount');
    if (countEl) {
        countEl.textContent = visibleCards.length;
    }
}

// --- Contact Form ---
function initContactForm() {
    const form = document.getElementById('contactForm');
    if (form) {
        form.addEventListener('submit', handleSubmit);
    }
}

function handleSubmit(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;

    const mailtoLink = `mailto:alqhamza35@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`)}`;

    window.location.href = mailtoLink;

    const btn = event.target.querySelector('button[type="submit"]');
    const originalText = btn.textContent;
    btn.textContent = currentLang === 'ar' ? 'تم الإرسال!' : 'Sent!';
    btn.style.background = '#22c55e';

    setTimeout(() => {
        btn.textContent = originalText;
        btn.style.background = '';
        event.target.reset();
    }, 2000);
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

// --- Active Nav Link ---
function initActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-links a').forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage) {
            link.classList.add('active');
        }
    });
}

// --- Init ---
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initMobileMenu();
    initScrollAnimation();
    initSkillsAnimation();
    initNavbarScroll();
    initScrollToTop();
    initProjectFilter();
    initContactForm();
    initClickGlow();
    initActiveNavLink();
});
