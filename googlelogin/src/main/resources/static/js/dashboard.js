// Dashboard Interactivity (optimized)

let toastTimer;
let _toastEl = null;
let _toastMsgEl = null;
let _clockEl = null;

document.addEventListener('DOMContentLoaded', function () {
    const sidebar = document.getElementById('sidebar');
    const toggleBtn = document.getElementById('sidebarToggle');
    const sidebarNav = document.querySelector('.sidebar-nav');

    // cache frequently used elements
    _toastEl = document.getElementById('toast');
    _toastMsgEl = document.getElementById('toastMsg');
    _clockEl = document.querySelector('.stat-value.clock-value');

    if (toggleBtn && sidebar) {
        toggleBtn.addEventListener('click', function () {
            sidebar.classList.toggle('open');
        });
    }

    // Use event delegation for nav items (better for dynamic lists)
    if (sidebarNav) {
        sidebarNav.addEventListener('click', function (e) {
            const item = e.target.closest('.nav-item');
            if (!item) return;
            e.preventDefault();
            // remove active from current
            const active = sidebarNav.querySelector('.nav-item.active');
            if (active && active !== item) active.classList.remove('active');
            item.classList.add('active');
        });
    }

    // Update clock every second using cached element
    updateClock();
    setInterval(updateClock, 1000);
});

function showToast(message) {
    // fallback to cached elements, otherwise query once
    const toast = _toastEl || document.getElementById('toast');
    const msg = _toastMsgEl || document.getElementById('toastMsg');
    if (!toast || !msg) return;

    msg.textContent = message;
    toast.classList.add('show');

    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
        toast.classList.remove('show');
    }, 2500);
}

function updateClock() {
    const clockEl = _clockEl || document.querySelector('.stat-value.clock-value');
    if (!clockEl) return;

    const now = new Date();
    let hours = now.getHours();
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12;

    clockEl.textContent = `${hours}:${minutes}:${seconds} ${ampm}`;
}

