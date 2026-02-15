const setDirection = (dir) => {
    document.documentElement.setAttribute('dir', dir);
    localStorage.setItem('v-direction', dir);
    updateRtlUI(dir);
};

const toggleDirection = () => {
    const currentDir = document.documentElement.getAttribute('dir') || 'ltr';
    const newDir = currentDir === 'ltr' ? 'rtl' : 'ltr';
    setDirection(newDir);
};

const updateRtlUI = (dir) => {
    const toggleBtn = document.getElementById('rtl-toggle-btn');
    if (toggleBtn) {
        toggleBtn.textContent = dir === 'ltr' ? 'RTL' : 'LTR';
        toggleBtn.title = dir === 'ltr' ? 'Switch to RTL' : 'Switch to LTR';

        if (dir === 'rtl') {
            toggleBtn.classList.add('is-rtl');
        } else {
            toggleBtn.classList.remove('is-rtl');
        }

        // Visual indicator
        if (dir === 'rtl') {
            toggleBtn.style.color = 'var(--gold)';
            toggleBtn.style.borderColor = 'var(--gold)';
        } else {
            toggleBtn.style.color = 'var(--fg)';
            toggleBtn.style.borderColor = 'var(--border)';
        }
    }
};

// Initialize
window.addEventListener('DOMContentLoaded', () => {
    const savedDir = localStorage.getItem('v-direction') || 'ltr';
    setDirection(savedDir);
});
