// Initialize Global LocalStorage State for UI Session
if (!localStorage.getItem('pw_unit_selected')) {
    localStorage.setItem('pw_unit_selected', 'HT'); // Default selected unit is High Tension
}

// Global Toast System Handler
function triggerToast(message, type = 'success') {
    let container = document.getElementById('toast-container');
    if (!container) {
        container = document.createElement('div');
        container.id = 'toast-container';
        container.style.cssText = "position: fixed; bottom: 24px; right: 24px; z-index: 10000; display: flex; flex-direction: column; gap: 8px;";
        document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.style.cssText = `
        background-color: #0f172a;
        color: #ffffff;
        padding: 12px 16px;
        border-radius: 8px;
        box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
        display: flex;
        align-items: center;
        gap: 10px;
        font-family: sans-serif;
        font-size: 13.5px;
        border-left: 4px solid ${type === 'success' ? '#10b981' : type === 'warning' ? '#f59e0b' : '#ef4444'};
        animation: toastIn 0.2s ease-out forwards;
    `;

    toast.innerHTML = `<span>${message}</span>`;
    container.appendChild(toast);

    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transition = 'opacity 0.2s';
        setTimeout(() => toast.remove(), 200);
    }, 3000);
}

// Simple dynamic styling animation helper
const styleSheet = document.createElement("style");
styleSheet.innerText = `
    @keyframes toastIn {
        from { transform: translateY(20px); opacity: 0; }
        to { transform: translateY(0); opacity: 1; }
    }
`;
document.head.appendChild(styleSheet);
