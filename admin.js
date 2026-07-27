const ADMIN_USER = "admin";
const ADMIN_PASS = "2014";

function isAdminPage() {
    return window.location.pathname.includes('admin.html');
}

function isDashboardPage() {
    return window.location.pathname.includes('dashboard.html');
}

function checkAuth() {
    if (isDashboardPage() && !sessionStorage.getItem('adminLoggedIn')) {
        window.location.href = 'admin.html';
    }
}

function handleLogin() {
    const form = document.getElementById('login-form');
    if (!form) return;

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const user = document.getElementById('username').value;
        const pass = document.getElementById('password').value;
        const errorMsg = document.getElementById('error-msg');

        if (user === ADMIN_USER && pass === ADMIN_PASS) {
            sessionStorage.setItem('adminLoggedIn', 'true');
            window.location.href = 'dashboard.html';
        } else {
            errorMsg.textContent = 'Invalid username or password';
            errorMsg.style.display = 'block';
        }
    });
}

function loadMessages() {
    const grid = document.getElementById('messages-grid');
    if (!grid) return;

    const messages = JSON.parse(localStorage.getItem('contactMessages') || '[]');

    if (messages.length === 0) {
        grid.innerHTML = '<p class="no-messages">No messages yet.</p>';
        return;
    }

    grid.innerHTML = messages.map((msg, index) => `
        <div class="message-card">
            <div class="message-header">
                <span class="message-name">${msg.name}</span>
                <span class="message-date">${msg.date}</span>
            </div>
            <p class="message-email">${msg.email}</p>
            <p class="message-text">${msg.message}</p>
            <div class="message-actions">
                <button class="btn-delete" onclick="deleteMessage(${index})">Delete</button>
            </div>
        </div>
    `).join('');
}

function deleteMessage(index) {
    const messages = JSON.parse(localStorage.getItem('contactMessages') || '[]');
    messages.splice(index, 1);
    localStorage.setItem('contactMessages', JSON.stringify(messages));
    loadMessages();
}

function handleSendForm() {
    const form = document.getElementById('send-form');
    if (!form) return;

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const title = document.getElementById('send-title').value;
        const message = document.getElementById('send-message').value;

        const sent = JSON.parse(localStorage.getItem('sentMessages') || '[]');
        sent.push({
            title: title,
            message: message,
            date: new Date().toLocaleString()
        });
        localStorage.setItem('sentMessages', JSON.stringify(sent));

        form.reset();
        loadSentMessages();
        alert('Message sent successfully!');
    });
}

function loadSentMessages() {
    const grid = document.getElementById('sent-grid');
    if (!grid) return;

    const sent = JSON.parse(localStorage.getItem('sentMessages') || '[]');

    if (sent.length === 0) {
        grid.innerHTML = '<p class="no-messages">No sent messages yet.</p>';
        return;
    }

    grid.innerHTML = sent.map((msg, index) => `
        <div class="message-card">
            <div class="message-header">
                <span class="message-name">${msg.title}</span>
                <span class="message-date">${msg.date}</span>
            </div>
            <p class="message-text">${msg.message}</p>
            <div class="message-actions">
                <button class="btn-delete" onclick="deleteSentMessage(${index})">Delete</button>
            </div>
        </div>
    `).join('');
}

function deleteSentMessage(index) {
    const sent = JSON.parse(localStorage.getItem('sentMessages') || '[]');
    sent.splice(index, 1);
    localStorage.setItem('sentMessages', JSON.stringify(sent));
    loadSentMessages();
}

function handleProjectForm() {
    const form = document.getElementById('project-form');
    if (!form) return;

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const title = document.getElementById('project-title').value;
        const desc = document.getElementById('project-desc').value;
        const link = document.getElementById('project-link').value;
        const image = document.getElementById('project-image').value;
        const tags = document.getElementById('project-tags').value;

        const projects = JSON.parse(localStorage.getItem('projects') || '[]');
        projects.push({
            title: title,
            description: desc,
            link: link,
            image: image,
            tags: tags.split(',').map(t => t.trim()),
            date: new Date().toLocaleString()
        });
        localStorage.setItem('projects', JSON.stringify(projects));

        form.reset();
        loadProjects();
        alert('Project added successfully!');
    });
}

function loadProjects() {
    const grid = document.getElementById('projects-grid');
    if (!grid) return;

    const projects = JSON.parse(localStorage.getItem('projects') || '[]');

    if (projects.length === 0) {
        grid.innerHTML = '<p class="no-messages">No projects yet.</p>';
        return;
    }

    grid.innerHTML = projects.map((proj, index) => `
        <div class="message-card">
            <div class="message-header">
                <span class="message-name">${proj.title}</span>
                <span class="message-date">${proj.date}</span>
            </div>
            <p class="message-text">${proj.description}</p>
            ${proj.image ? `<img src="${proj.image}" style="max-width:200px; border-radius:8px; margin-top:10px;">` : ''}
            ${proj.link ? `<p style="margin-top:10px;"><a href="${proj.link}" target="_blank" style="color:#d4a843;">${proj.link}</a></p>` : ''}
            <div class="portfolio-tags" style="margin-top:10px;">
                ${proj.tags.map(tag => `<span>${tag}</span>`).join('')}
            </div>
            <div class="message-actions">
                <button class="btn-delete" onclick="deleteProject(${index})">Delete</button>
            </div>
        </div>
    `).join('');
}

function deleteProject(index) {
    const projects = JSON.parse(localStorage.getItem('projects') || '[]');
    projects.splice(index, 1);
    localStorage.setItem('projects', JSON.stringify(projects));
    loadProjects();
}

function handleCertificateForm() {
    const form = document.getElementById('certificate-form');
    if (!form) return;

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const title = document.getElementById('cert-title').value;
        const issuer = document.getElementById('cert-issuer').value;
        const date = document.getElementById('cert-date').value;
        const link = document.getElementById('cert-link').value;
        const image = document.getElementById('cert-image').value;

        const certs = JSON.parse(localStorage.getItem('certificates') || '[]');
        certs.push({
            title: title,
            issuer: issuer,
            date: date,
            link: link,
            image: image,
            dateAdded: new Date().toLocaleString()
        });
        localStorage.setItem('certificates', JSON.stringify(certs));

        form.reset();
        loadCertificates();
        alert('Certificate added successfully!');
    });
}

function loadCertificates() {
    const grid = document.getElementById('certificates-grid');
    if (!grid) return;

    const certs = JSON.parse(localStorage.getItem('certificates') || '[]');

    if (certs.length === 0) {
        grid.innerHTML = '<p class="no-messages">No certificates yet.</p>';
        return;
    }

    grid.innerHTML = certs.map((cert, index) => `
        <div class="message-card">
            <div class="message-header">
                <span class="message-name">${cert.title}</span>
                <span class="message-date">${cert.date}</span>
            </div>
            <p class="message-email">${cert.issuer}</p>
            ${cert.image ? `<img src="${cert.image}" style="max-width:200px; border-radius:8px; margin-top:10px;">` : ''}
            ${cert.link ? `<p style="margin-top:10px;"><a href="${cert.link}" target="_blank" style="color:#02b788;">${cert.link}</a></p>` : ''}
            <div class="message-actions">
                <button class="btn-delete" onclick="deleteCertificate(${index})">Delete</button>
            </div>
        </div>
    `).join('');
}

function deleteCertificate(index) {
    const certs = JSON.parse(localStorage.getItem('certificates') || '[]');
    certs.splice(index, 1);
    localStorage.setItem('certificates', JSON.stringify(certs));
    loadCertificates();
}

function handleClearAll() {
    const btn = document.getElementById('clear-all');
    if (!btn) return;

    btn.addEventListener('click', function() {
        if (confirm('Are you sure you want to delete all data?')) {
            localStorage.removeItem('contactMessages');
            localStorage.removeItem('sentMessages');
            localStorage.removeItem('projects');
            localStorage.removeItem('certificates');
            loadMessages();
            loadSentMessages();
            loadProjects();
            loadCertificates();
        }
    });
}

function handleLogout() {
    const btn = document.getElementById('logout-btn');
    if (!btn) return;

    btn.addEventListener('click', function() {
        sessionStorage.removeItem('adminLoggedIn');
        window.location.href = 'admin.html';
    });
}

checkAuth();
handleLogin();
loadMessages();
loadSentMessages();
loadProjects();
loadCertificates();
handleSendForm();
handleProjectForm();
handleCertificateForm();
handleClearAll();
handleLogout();
