// Dashboard Interactivity

// Sidebar toggle for mobile
document.addEventListener('DOMContentLoaded', function () {
    const sidebar = document.getElementById('sidebar');
    const toggleBtn = document.getElementById('sidebarToggle');

    if (toggleBtn) {
        toggleBtn.addEventListener('click', function () {
            sidebar.classList.toggle('open');
        });
    }

    // Active nav item
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', function (e) {
            e.preventDefault();
            navItems.forEach(i => i.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Update clock every second
    updateClock();
    setInterval(updateClock, 1000);
});

// Toast notification
let toastTimer;

function showToast(message) {
    const toast = document.getElementById('toast');
    const msg = document.getElementById('toastMsg');

    if (!toast || !msg) return;

    msg.textContent = message;
    toast.classList.add('show');

    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
        toast.classList.remove('show');
    }, 2500);
}

// Live clock in stat card
function updateClock() {
    const clockEl = document.querySelector('.stat-value.clock-value');
    if (!clockEl) return;

    const now = new Date();
    let hours = now.getHours();
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12;

    clockEl.textContent = `${hours}:${minutes}:${seconds} ${ampm}`;
}

