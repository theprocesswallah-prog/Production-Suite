document.addEventListener('DOMContentLoaded', () => {
    const prefix = getPathPrefix();

    // Inject layout parts
    injectSidebar(prefix);
    injectHeader();
    injectFooter();

    // Setup active accordion items highlight and expand
    highlightActiveSidebar(prefix);

    // Initial lucide markers triggers
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
});

function getPathPrefix() {
    const path = window.location.pathname;
    if (path.endsWith('index.html') || path.endsWith('/') || path === '') {
        return '';
    }
    return '../';
}

function injectSidebar(prefix) {
    const sidebarContainer = document.getElementById('app-sidebar');
    if (!sidebarContainer) return;

    sidebarContainer.innerHTML = `
        <div class="sidebar-brand">
            <div class="brand-title">
                <i class="logo-icon" data-lucide="shield"></i>
                <span>ALFA INTERCONTINENTAL</span>
            </div>
            <div class="brand-subtitle">Manufacturing Suite V1</div>
        </div>
        
        <nav class="sidebar-nav">
            <!-- Standalone Dashboard -->
            <a href="${prefix}index.html" class="sidebar-link" id="nav-dashboard">
                <i data-lucide="layout-dashboard"></i>Dashboard
            </a>
            
            <!-- Accordion Group: Sales -->
            <div class="accordion-group">
                <div class="accordion-header" id="header-sales" onclick="toggleAccordion('sales')">
                    <span class="accordion-header-left">
                        <i data-lucide="shopping-cart"></i>Sales Operations
                    </span>
                    <i class="chevron-icon" data-lucide="chevron-down"></i>
                </div>
                <div class="accordion-content" id="accordion-sales">
                    <a href="${prefix}sales/sales-orders.html" class="sidebar-link" id="nav-sales-orders">Sales Orders</a>
                    <a href="${prefix}sales/scheduling.html" class="sidebar-link" id="nav-scheduling">Scheduling</a>
                    <a href="${prefix}sales/work-orders.html" class="sidebar-link" id="nav-work-orders">Work Orders</a>
                </div>
            </div>

            <!-- Accordion Group: Production -->
            <div class="accordion-group">
                <div class="accordion-header" id="header-production" onclick="toggleAccordion('production')">
                    <span class="accordion-header-left">
                        <i data-lucide="activity"></i>Production WIP
                    </span>
                    <i class="chevron-icon" data-lucide="chevron-down"></i>
                </div>
                <div class="accordion-content" id="accordion-production">
                    <a href="${prefix}production/wip.html" class="sidebar-link" id="nav-wip">Work In Progress</a>
                    <a href="${prefix}production/material-issue.html" class="sidebar-link" id="nav-material-issue">Material Issue</a>
                    <a href="${prefix}production/core-winding.html" class="sidebar-link" id="nav-core-winding">Core Winding</a>
                    <a href="${prefix}production/stacking.html" class="sidebar-link" id="nav-stacking">Core Stacking</a>
                    <a href="${prefix}production/assembly.html" class="sidebar-link" id="nav-assembly">Assembly Unit</a>
                    <a href="${prefix}production/internal-qc.html" class="sidebar-link" id="nav-internal-qc">Internal QC</a>
                    <a href="${prefix}production/ready-dispatch.html" class="sidebar-link" id="nav-ready-dispatch">Ready Dispatch</a>
                    <a href="${prefix}production/dispatch.html" class="sidebar-link" id="nav-dispatch">Final Dispatch</a>
                </div>
            </div>

            <!-- Standalone Reports -->
            <a href="${prefix}reports/reports.html" class="sidebar-link" id="nav-reports">
                <i data-lucide="bar-chart-3"></i>Reports
            </a>

            <!-- Accordion Group: Masters -->
            <div class="accordion-group">
                <div class="accordion-header" id="header-masters" onclick="toggleAccordion('masters')">
                    <span class="accordion-header-left">
                        <i data-lucide="database"></i>System Masters
                    </span>
                    <i class="chevron-icon" data-lucide="chevron-down"></i>
                </div>
                <div class="accordion-content" id="accordion-masters">
                    <a href="${prefix}masters/customer-master.html" class="sidebar-link" id="nav-customer-master">Customer Master</a>
                    <a href="${prefix}masters/product-master.html" class="sidebar-link" id="nav-product-master">Product Master</a>
                    <a href="${prefix}masters/employee-master.html" class="sidebar-link" id="nav-employee-master">Employee Master</a>
                </div>
            </div>

            <!-- Standalone Settings -->
            <a href="${prefix}settings/settings.html" class="sidebar-link" id="nav-settings">
                <i data-lucide="settings"></i>Settings
            </a>
        </nav>
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
        <div class="header-right">
            <button class="action-btn" onclick="triggerToast('Alarms system fully operational.', 'success')">
                <i data-lucide="shield-alert" style="color: var(--success); width: 18px; height: 18px;"></i>
            </button>
            <button class="action-btn" style="margin-right: 0.5rem;" onclick="triggerToast('Notifications checked.', 'info')">
                <i data-lucide="bell" style="width: 18px; height: 18px;"></i>
                <span class="badge-count">2</span>
            </button>
            
            <!-- Shipped Profile Card in Header -->
            <div class="header-profile-card" onclick="triggerToast('Profile dropdown feature locks in future sprint.', 'info')">
                <div class="profile-avatar">AM</div>
                <div class="profile-details">
                    <span class="profile-name">Alex Miller</span>
                    <div class="profile-meta">
                        <span>Ops Manager</span>
                        <span class="profile-unit-tag">${activeUnit}</span>
                    </div>
                </div>
                <i data-lucide="chevron-down" style="width: 14px; height: 14px; margin-left: 4px; color: var(--text-muted);"></i>
            </div>
        </div>
    `;

    // Dynamic drawer bindings
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
            <span>Created by ProcessWallah</span>
        `;
    }
}

function toggleAccordion(sectionId) {
    const allContents = document.querySelectorAll('.accordion-content');
    const allHeaders = document.querySelectorAll('.accordion-header');
    
    const targetContent = document.getElementById(`accordion-${sectionId}`);
    const targetHeader = document.getElementById(`header-${sectionId}`);
    const isOpen = targetContent.classList.contains('open');

    // Accordion behavior: Close all open accordions first
    allContents.forEach(c => c.classList.remove('open'));
    allHeaders.forEach(h => h.classList.remove('open'));

    // Toggle target
    if (!isOpen) {
        targetContent.classList.add('open');
        targetHeader.classList.add('open');
    }

    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
}

function switchUnit(unit) {
    localStorage.setItem('pw_unit_selected', unit);
    triggerToast(`Active Unit altered directly to: ${unit} Division`, 'success');
    setTimeout(() => {
        window.location.reload();
    }, 300);
}

function highlightActiveSidebar(prefix) {
    const path = window.location.pathname;
    let targetId = "nav-dashboard";
    let expandSection = null;

    if (path.includes('/sales-orders.html')) {
        targetId = "nav-sales-orders";
        expandSection = "sales";
    } else if (path.includes('/scheduling.html')) {
        targetId = "nav-scheduling";
        expandSection = "sales";
    } else if (path.includes('/work-orders.html')) {
        targetId = "nav-work-orders";
        expandSection = "sales";
    } else if (path.includes('/wip.html')) {
        targetId = "nav-wip";
        expandSection = "production";
    } else if (path.includes('/material-issue.html')) {
        targetId = "nav-material-issue";
        expandSection = "production";
    } else if (path.includes('/core-winding.html')) {
        targetId = "nav-core-winding";
        expandSection = "production";
    } else if (path.includes('/stacking.html')) {
        targetId = "nav-stacking";
        expandSection = "production";
    } else if (path.includes('/assembly.html')) {
        targetId = "nav-assembly";
        expandSection = "production";
    } else if (path.includes('/internal-qc.html')) {
        targetId = "nav-internal-qc";
        expandSection = "production";
    } else if (path.includes('/ready-dispatch.html')) {
        targetId = "nav-ready-dispatch";
        expandSection = "production";
    } else if (path.includes('/dispatch.html')) {
        targetId = "nav-dispatch";
        expandSection = "production";
    } else if (path.includes('/reports.html')) {
        targetId = "nav-reports";
    } else if (path.includes('/customer-master.html')) {
        targetId = "nav-customer-master";
        expandSection = "masters";
    } else if (path.includes('/product-master.html')) {
        targetId = "nav-product-master";
        expandSection = "masters";
    } else if (path.includes('/employee-master.html')) {
        targetId = "nav-employee-master";
        expandSection = "masters";
    } else if (path.includes('/settings.html')) {
        targetId = "nav-settings";
    }

    const link = document.getElementById(targetId);
    if (link) {
        link.classList.add('active');
    }

    // Auto-expand dynamic accordion active section parent matching link
    if (expandSection) {
        const content = document.getElementById(`accordion-${expandSection}`);
        const header = document.getElementById(`header-${expandSection}`);
        if (content && header) {
            content.classList.add('open');
            header.classList.add('open');
        }
    }
}
