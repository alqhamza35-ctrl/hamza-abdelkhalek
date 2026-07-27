/* ========================================
   main.js - الوظائف الرئيسية للموقع
   يحتوي على: تبديل الوضع الداكن، القائمة المتجاوبة، التأثيرات
   ======================================== */

// --- تبديل الوضع الداكن/الفاتح (Dark/Light Theme Toggle) ---
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

// --- قائمة الجوال (Mobile Menu) ---
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

// --- تأثير الظهور عند التمرير (Scroll Animation) ---
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

// --- تأثير شريط المهارات (Skills Bar Animation) ---
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

// --- تأثير الناف بار عند التمرير (Navbar Scroll Effect) ---
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

// --- تأثير الجسيمات الذهبية (Gold Particles) ---
function initGoldParticles() {
    const hero = document.querySelector('.hero');
    if (!hero) return;

    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.className = 'gold-particle';
        particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 6 + 2}px;
            height: ${Math.random() * 6 + 2}px;
            background: rgba(212, 175, 55, ${Math.random() * 0.5 + 0.2});
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            pointer-events: none;
            animation: float ${Math.random() * 6 + 4}s ease-in-out infinite;
            animation-delay: ${Math.random() * 5}s;
        `;
        hero.appendChild(particle);
    }

    // إضافة CSS للجسيمات
    const style = document.createElement('style');
    style.textContent = `
        @keyframes float {
            0%, 100% {
                transform: translateY(0) translateX(0);
                opacity: 0.3;
            }
            50% {
                transform: translateY(-30px) translateX(20px);
                opacity: 0.8;
            }
        }
    `;
    document.head.appendChild(style);
}

// --- تأثير التوهج عند النقر (Click Glow Effect) ---
function initClickGlow() {
    document.addEventListener('click', (e) => {
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

    // إضافة CSS للتأثير
    const style = document.createElement('style');
    style.textContent = `
        @keyframes clickGlow {
            0% {
                transform: scale(1);
                opacity: 1;
            }
            100% {
                transform: scale(5);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

// --- تأثير النص الذهبي المتدرج (Gold Text Gradient) ---
function initGoldText() {
    const logo = document.querySelector('.logo');
    if (logo) {
        logo.style.background = 'linear-gradient(135deg, #D4AF37, #FFD700, #D4AF37)';
        logo.style.webkitBackgroundClip = 'text';
        logo.style.webkitTextFillColor = 'transparent';
        logo.style.backgroundClip = 'text';
    }
}

// --- نموذج الاتصال (Contact Form) ---
function initContactForm() {
    const form = document.querySelector('.contact-form');

    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const formData = new FormData(form);
            const name = formData.get('name');
            const email = formData.get('email');
            const subject = formData.get('subject');
            const message = formData.get('message');

            if (!name || !email || !message) {
                alert(currentLang === 'ar' ? 'يرجى ملء جميع الحقول المطلوبة' : 'Please fill in all required fields');
                return;
            }

            alert(currentLang === 'ar' ? 'تم إرسال رسالتك بنجاح! سأتواصل معك قريباً.' : 'Your message has been sent successfully! I will contact you soon.');
            form.reset();
        });
    }
}

// --- تهيئة جميع الوظائف عند تحميل الصفحة ---
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initMobileMenu();
    initScrollAnimation();
    initSkillsAnimation();
    initNavbarScroll();
    initContactForm();
    initGoldParticles();
    initClickGlow();
    initGoldText();
});
