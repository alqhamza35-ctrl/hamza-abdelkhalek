function initTheme() {
    const theme = localStorage.getItem("theme") || "light";
    document.documentElement.dataset.theme = theme;
    updateThemeControl(theme);

    const button = document.querySelector(".theme-toggle");
    if (button) {
        button.addEventListener("click", () => {
            const nextTheme = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
            document.documentElement.dataset.theme = nextTheme;
            localStorage.setItem("theme", nextTheme);
            updateThemeControl(nextTheme);
        });
    }
}

function updateThemeControl(theme) {
    const button = document.querySelector(".theme-toggle");
    if (!button) return;

    button.setAttribute("aria-pressed", String(theme === "dark"));
    const symbol = button.querySelector(".theme-symbol");
    if (symbol) symbol.textContent = theme === "dark" ? "○" : "◐";
}

function initMobileMenu() {
    const button = document.querySelector(".mobile-menu");
    const navigation = document.querySelector(".nav-links");
    const header = document.querySelector(".site-header");
    if (!button || !navigation || !header) return;

    const closeMenu = () => {
        navigation.classList.remove("active");
        button.setAttribute("aria-expanded", "false");
        button.setAttribute("aria-label", getTranslation("mobile-menu"));
        document.body.classList.remove("menu-open");
    };

    const openMenu = () => {
        navigation.classList.add("active");
        button.setAttribute("aria-expanded", "true");
        button.setAttribute("aria-label", getTranslation("close-menu"));
        document.body.classList.add("menu-open");
    };

    button.addEventListener("click", () => {
        if (navigation.classList.contains("active")) closeMenu();
        else openMenu();
    });

    navigation.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && navigation.classList.contains("active")) {
            closeMenu();
            button.focus();
        }
    });

    document.addEventListener("click", (event) => {
        if (navigation.classList.contains("active") && !header.contains(event.target)) closeMenu();
    });
}

function initNavbar() {
    const header = document.querySelector(".site-header");
    if (!header) return;

    const updateHeader = () => header.classList.toggle("scrolled", window.scrollY > 12);
    updateHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });
}

function initScrollTop() {
    const button = document.getElementById("scrollTop");
    if (!button) return;

    const updateButton = () => button.classList.toggle("visible", window.scrollY > 500);
    updateButton();
    window.addEventListener("scroll", updateButton, { passive: true });
    button.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
}

function initReveal() {
    const items = document.querySelectorAll("[data-reveal]");
    if (!items.length) return;

    document.body.classList.add("js");
    const observer = new IntersectionObserver((entries, currentObserver) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("is-visible");
                currentObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });

    items.forEach((item) => observer.observe(item));
}

function initSkillBars() {
    const bars = document.querySelectorAll(".progress");
    if (!bars.length) return;

    const observer = new IntersectionObserver((entries, currentObserver) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("is-filled");
                currentObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    bars.forEach((bar) => observer.observe(bar));
}

function initCardFilter({ buttonSelector, cardSelector, countSelector, emptySelector }) {
    const buttons = [...document.querySelectorAll(buttonSelector)];
    const cards = [...document.querySelectorAll(cardSelector)];
    const count = document.querySelector(countSelector);
    const emptyState = document.querySelector(emptySelector);
    if (!buttons.length || !cards.length) return;

    const applyFilter = (filter) => {
        let visibleCount = 0;

        buttons.forEach((button) => {
            const active = button.dataset.filter === filter;
            button.classList.toggle("active", active);
            button.setAttribute("aria-pressed", String(active));
        });

        cards.forEach((card) => {
            const visible = filter === "all" || card.dataset.tags.split(" ").includes(filter);
            card.hidden = !visible;
            if (visible) visibleCount += 1;
        });

        if (count) count.textContent = visibleCount;
        if (emptyState) emptyState.hidden = visibleCount !== 0;
    };

    buttons.forEach((button) => button.addEventListener("click", () => applyFilter(button.dataset.filter)));
    applyFilter(buttons.find((button) => button.classList.contains("active"))?.dataset.filter || "all");
}

function initCertificateDialog() {
    const dialog = document.getElementById("certificateModal");
    const triggers = document.querySelectorAll(".certificate-view");
    if (!dialog || !triggers.length || typeof dialog.showModal !== "function") return;

    const image = dialog.querySelector("#certificateModalImage");
    const title = dialog.querySelector("#certificateModalTitle");
    const issuer = dialog.querySelector("#certificateModalIssuer");
    const metadata = dialog.querySelector("#certificateModalMetadata");
    let trigger = null;

    const closeDialog = () => dialog.close();

    triggers.forEach((button) => {
        button.addEventListener("click", () => {
            const card = button.closest(".certificate-card");
            trigger = button;
            image.src = button.dataset.image;
            image.alt = card.querySelector("img").alt;
            title.textContent = card.querySelector("h2, h3").textContent;
            issuer.textContent = card.querySelector(".certificate-issuer").textContent;
            metadata.textContent = card.querySelector(".certificate-meta").textContent;
            dialog.showModal();
        });
    });

    dialog.querySelector("[data-dialog-close]").addEventListener("click", closeDialog);
    dialog.addEventListener("click", (event) => {
        if (event.target === dialog) closeDialog();
    });
    dialog.addEventListener("close", () => trigger?.focus());
}

function initContactForm() {
    const form = document.getElementById("contactForm");
    const status = document.getElementById("formStatus");
    if (!form || !status) return;

    form.addEventListener("submit", (event) => {
        event.preventDefault();
        const values = new FormData(form);
        const name = values.get("name");
        const email = values.get("email");
        const subject = values.get("subject");
        const message = values.get("message");
        const body = `Name: ${name}\nEmail: ${email}\n\n${message}`;

        status.textContent = getTranslation("contact-mailto-status");
        window.location.href = `mailto:alqhamza35@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    });
}

async function copyEmail() {
    const email = "alqhamza35@gmail.com";
    const status = document.getElementById("contactStatus");

    try {
        if (navigator.clipboard && window.isSecureContext) {
            await navigator.clipboard.writeText(email);
        } else {
            const textArea = document.createElement("textarea");
            textArea.value = email;
            textArea.style.position = "fixed";
            textArea.style.opacity = "0";
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand("copy");
            textArea.remove();
        }
        if (status) status.textContent = getTranslation("email-copied");
    } catch {
        if (status) status.textContent = email;
    }
}

function initCopyEmail() {
    const button = document.querySelector("[data-copy-email]");
    if (button) button.addEventListener("click", copyEmail);
}

function initLanguageToggle() {
    document.querySelector(".lang-toggle")?.addEventListener("click", toggleLanguage);
}

function initActiveNavLink() {
    const currentPage = window.location.pathname.split("/").pop() || "index.html";
    document.querySelectorAll(".nav-links a").forEach((link) => {
        if (link.getAttribute("href") === currentPage) link.classList.add("active");
    });
}

document.addEventListener("DOMContentLoaded", () => {
    initTheme();
    initMobileMenu();
    initNavbar();
    initScrollTop();
    initReveal();
    initSkillBars();
    initCardFilter({
        buttonSelector: ".project-filter-button",
        cardSelector: ".project-card",
        countSelector: "#projectCount",
        emptySelector: "#projectEmptyState"
    });
    initCardFilter({
        buttonSelector: ".certificate-filter-button",
        cardSelector: ".certificate-card",
        countSelector: "#certificateCount",
        emptySelector: "#certificateEmptyState"
    });
    initCertificateDialog();
    initContactForm();
    initCopyEmail();
    initLanguageToggle();
    initActiveNavLink();
});
