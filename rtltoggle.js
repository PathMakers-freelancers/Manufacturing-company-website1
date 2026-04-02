window.setDirection = (dir) => {
    document.documentElement.setAttribute('dir', dir);
    localStorage.setItem('v-direction', dir);
    window.updateRtlUI(dir);
};

window.toggleDirection = () => {
    const currentDir = document.documentElement.getAttribute('dir') || 'ltr';
    const newDir = currentDir === 'ltr' ? 'rtl' : 'ltr';
    window.setDirection(newDir);
};

window.updateRtlUI = (dir) => {
    const toggleBtn = document.getElementById('rtl-toggle-btn');
    if (toggleBtn) {
        const accent = getComputedStyle(document.documentElement).getPropertyValue('--v-accent') ||
            getComputedStyle(document.documentElement).getPropertyValue('--accent') ||
            '#007aff';

        if (dir === 'rtl') {
            toggleBtn.style.background = 'var(--gold)';
            toggleBtn.style.color = '#000000';
            toggleBtn.style.borderColor = 'var(--gold)';
            toggleBtn.classList.add('is-rtl');
            toggleBtn.title = 'Switch to LTR';
        } else {
            toggleBtn.style.background = '';
            toggleBtn.style.color = '';
            toggleBtn.style.borderColor = '';
            toggleBtn.classList.remove('is-rtl');
            toggleBtn.title = 'Switch to RTL';
        }
    }
};

// Initialize
window.addEventListener('DOMContentLoaded', () => {
    const savedDir = localStorage.getItem('v-direction') || 'ltr';
    window.setDirection(savedDir);
});
