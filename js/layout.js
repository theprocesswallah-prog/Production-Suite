document.addEventListener('DOMContentLoaded', () => {
    // 1. Path-depth mapping auto-determination
    const prefix = getPathPrefix();

    // 2. Inject Modular Shell Components
    injectSidebar(prefix);
    injectHeader();
    injectFooter();

    // 3. Highlight Dynamic Active Links
    highlightActiveSidebar(prefix);

    // 4. Trigger Lucide Icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
});

// Resilient path-depth selector setup for local & GitHub Pages usage
function getPathPrefix() {
    const path = window.location.pathname;
    
    // Agar path blank hai, index.html hai, ya root levels represent karta hai
    if (path.endsWith('index.html') || path.endsWith('/') || path === '') {
        return '';
    }
    // Agar page sibling modules directory (/sales/, /production/) ke andur hai
    return '../';
}

function injectSidebar(prefix) {
    const sidebarContainer = document.getElementById('app-sidebar');
    if (!sidebarContainer) return;

    // Direct redirection paths mapped using detected prefix
    sidebarContainer.innerHTML = `
        <div class="sidebar-brand">
            <i class="logo-icon" data-lucide="cog" style="animation: spin 10s linear infinite;"></i>
            <span>ProcessWallah</span>
            <span class="suite-v">V1</span>
        </div>
        <nav class="sidebar-nav">
            <a href="${prefix}index.html" class="sidebar-link" id="nav-dashboard">
                <i data-lucide="layout-dashboard"></i>Dashboard
            </a>
            
            <div class="nav-label">Sales Operations</div>
            <a href="${prefix}sales/sales-orders.html" class="sidebar-link" id="nav-sales-orders">
                <i data-lucide="shopping-cart"></i>Sales Orders
            </a>
            <a href="${prefix}sales/scheduling.html" class="sidebar-link" id="nav-scheduling">
                <i data-lucide="calendar"></i>Scheduling
            </a>
            <a href="${prefix}sales/work-orders.html" class="sidebar-link" id="nav-work-orders">
                <i data-lucide="clipboard-list"></i>Work Orders
            </a>

            <div class="nav-label">Manufacturing WIP</div>
            <a href="${prefix}production/wip.html" class="sidebar-link" id="nav-wip">
                <i data-lucide="play-circle"></i>Work In Progress
            </a>
            <a href="${prefix}production/material-issue.html" class="sidebar-link" id="nav-material-issue">
                <i data-lucide="package-open"></i>Material Issue
            </a>
            <a href="${prefix}production/core-winding.html" class="sidebar-link" id="nav-core-winding">
                <i data-lucide="rotate-cw"></i>Core Winding
            </a>
            <a href="${prefix}production/stacking.html" class="sidebar-link" id="nav-stacking">
                <i data-lucide="layers"></i>Core Stacking
            </a>
            <a href="${prefix}production/assembly.html" class="sidebar-link" id="nav-assembly">
                <i data-lucide="cpu"></i>Assembly Unit
            </a>
            <a href="${prefix}production/internal-qc.html" class="sidebar-link" id="nav-internal-qc">
                <i data-lucide="shield-check"></i>Internal QC
            </a>
            <a href="${prefix}production/ready-dispatch.html" class="sidebar-link" id="nav-ready-dispatch">
                <i data-lucide="warehouse"></i>Ready Dispatch
            </a>
            <a href="${prefix}production/dispatch.html" class="sidebar-link" id="nav-dispatch">
                <i data-lucide="truck"></i>Final Dispatch
            </a>

            <div class="nav-label">Analytics & Setup</div>
            <a href="${prefix}reports/reports.html" class="sidebar-link" id="nav-reports">
                <i data-lucide="bar-chart-3"></i>Reports
            </a>
            <a href="${prefix}masters/customer-master.html" class="sidebar-link" id="nav-customer-master">
                <i data-lucide="users"></i>Customer Master
            </a>
            <a href="${prefix}masters/product-master.html" class="sidebar-link" id="nav-product-master">
                <i data-lucide="database"></i>Product Master
            </a>
            <a href="${prefix}masters/employee-master.html" class="sidebar-link" id="nav-employee-master">
                <i data-lucide="user-cog"></i>Employee Master
            </a>
            <a href="${prefix}settings/settings.html" class="sidebar-link" id="nav-settings">
                <i data-lucide="settings"></i>Settings
            </a>
        </nav>
        <div class="sidebar-footer">
            <div class="user-profile">
                <div class="avatar">PW</div>
                <div class="user-info">
                    <span class="user-name">Alex Miller</span>
                    <span class="user-role">Operations Manager</span>
                </div>
            </div>
        </div>
    `;
}

function injectHeader() {
    const headerContainer = document.getElementById('app-header');
    if (!headerContainer) return;

    const activeUnit = localStorage.getItem('pw_unit_selected') || 'HT';

    headerContainer.innerHTML = `
        <div class="header-left">
            <button class="hamburger" id="nav-hamburger"><i data-lucide="menu"></i></button>
            <div class="unit-selector">
                <button class="unit-btn ${activeUnit === 'HT' ? 'active' : ''}" onclick="switchUnit('HT')">HT Unit</button>
                <button class="unit-btn ${activeUnit === 'LT' ? 'active' : ''}" onclick="switchUnit('LT')">LT Unit</button>
            </div>
        </div>
        <div class="header-actions">
            <button class="action-btn" onclick="triggerToast('Alarms system active on floor.', 'success')">
                <i data-lucide="shield-alert" style="color: var(--success)"></i>
            </button>
            <button class="action-btn" onclick="triggerToast('Alerts logs up to date.', 'info')">
                <i data-lucide="bell"></i>
                <span class="badge-count">2</span>
            </button>
        </div>
    `;

    // Responsive toggle bindings
    const burger = document.getElementById('nav-hamburger');
    const sidebar = document.getElementById('app-sidebar');
    if (burger && sidebar) {
        burger.addEventListener('click', (e) => {
            e.stopPropagation();
            sidebar.classList.toggle('open');
        });
        document.addEventListener('click', (e) => {
            if (sidebar.classList.contains('open') && !sidebar.contains(e.target)) {
                sidebar.classList.remove('open');
            }
        });
    }
}

function injectFooter() {
    const footerContainer = document.getElementById('app-footer');
    if (footerContainer) {
        footerContainer.innerHTML = `
            <span>&copy; 2026 ProcessWallah MES Suite V1 • Sibling Depth Normalization Patched</span>
        `;
    }
}

function switchUnit(unit) {
    localStorage.setItem('pw_unit_selected', unit);
    triggerToast(`Switched active environment successfully to: ${unit} Unit`, 'success');
    setTimeout(() => {
        window.location.reload();
    }, 300);
}

function highlightActiveSidebar(prefix) {
    const path = window.location.pathname;
    let targetId = "nav-dashboard";

    if (path.includes('/sales-orders.html')) targetId = "nav-sales-orders";
    else if (path.includes('/scheduling.html')) targetId = "nav-scheduling";
    else if (path.includes('/work-orders.html')) targetId = "nav-work-orders";
    else if (path.includes('/wip.html')) targetId = "nav-wip";
    else if (path.includes('/material-issue.html')) targetId = "nav-material-issue";
    else if (path.includes('/core-winding.html')) targetId = "nav-core-winding";
    else if (path.includes('/stacking.html')) targetId = "nav-stacking";
    else if (path.includes('/assembly.html')) targetId = "nav-assembly";
    else if (path.includes('/internal-qc.html')) targetId = "nav-internal-qc";
    else if (path.includes('/ready-dispatch.html')) targetId = "nav-ready-dispatch";
    else if (path.includes('/dispatch.html')) targetId = "nav-dispatch";
    else if (path.includes('/reports.html')) targetId = "nav-reports";
    else if (path.includes('/customer-master.html')) targetId = "nav-customer-master";
    else if (path.includes('/product-master.html')) targetId = "nav-product-master";
    else if (path.includes('/employee-master.html')) targetId = "nav-employee-master";
    else if (path.includes('/settings.html')) targetId = "nav-settings";

    const link = document.getElementById(targetId);
    if (link) {
        link.classList.add('active');
    }
}
