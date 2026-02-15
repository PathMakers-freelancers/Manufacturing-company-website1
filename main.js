/**
 * SENTINEL HUB // EXPERIMENTAL KINETIC CORE v4.0
 * Avant-Garde Interaction Engine
 */

document.addEventListener('DOMContentLoaded', () => {
    // --- 1. Custom High-Inertia Cursor ---
    const cursor = document.createElement('div');
    const follower = document.createElement('div');
    cursor.className = 'cursor';
    follower.className = 'cursor-follower';
    document.body.appendChild(cursor);
    document.body.appendChild(follower);

    let mouseX = 0, mouseY = 0;
    let ballX = 0, ballY = 0;
    let followX = 0, followY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    const animateCursor = () => {
        // Linear interpolation for smooth lag
        ballX += (mouseX - ballX) * 0.2;
        ballY += (mouseY - ballY) * 0.2;
        followX += (mouseX - followX) * 0.1;
        followY += (mouseY - followY) * 0.1;

        cursor.style.transform = `translate3d(${ballX}px, ${ballY}px, 0)`;
        follower.style.transform = `translate3d(${followX - 16}px, ${followY - 16}px, 0)`;

        requestAnimationFrame(animateCursor);
    };
    animateCursor();

    // --- 2. Advanced Typography Magnetic Effect ---
    const magElements = document.querySelectorAll('.nav-link, .v-logo, .v-btn-mag');
    magElements.forEach(el => {
        el.addEventListener('mousemove', (e) => {
            const rect = el.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            el.style.transform = `translate3d(${x * 0.4}px, ${y * 0.4}px, 0)`;
            follower.style.transform = `translate3d(${followX - 25}px, ${followY - 25}px, 0) scale(1.5)`;
            follower.style.borderColor = 'var(--accent)';
        });
        el.addEventListener('mouseleave', () => {
            el.style.transform = `translate3d(0, 0, 0)`;
            follower.style.transform = `translate3d(${followX - 16}px, ${followY - 16}px, 0) scale(1)`;
            follower.style.borderColor = 'rgba(255, 255, 255, 0.3)';
        });
    });

    // --- 3. Kinetic Reveal Engine ---
    const revealOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -100px 0px"
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, revealOptions);

    document.querySelectorAll('.reveal-wrap').forEach(el => revealObserver.observe(el));

    // --- 4. Deep Parallax & Scroll Fluidity ---
    const scrollProgress = document.querySelector('.scroll-progress');

    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = (scrolled / totalHeight) * 100;

        if (scrollProgress) scrollProgress.style.height = `${progress}%`;

        // Parallax depth layering
        document.querySelectorAll('.parallax-layer').forEach(layer => {
            const speed = layer.getAttribute('data-speed') || 0.1;
            const yPos = -(scrolled * speed);
            layer.style.transform = `translate3d(0, ${yPos}px, 0)`;
        });

        // Massive heading skew on scroll
        const headings = document.querySelectorAll('.massive-heading');
        const skew = Math.min(Math.max((scrolled - window.lastScroll || 0) * 0.1, -5), 5);
        headings.forEach(h => {
            // h.style.transform = `skewY(${skew}deg)`;
        });
        window.lastScroll = scrolled;
    });

    // --- 5. Theme Switching Persistence ---
    window.toggleTheme = () => {
        const html = document.documentElement;
        const currentTheme = html.getAttribute('data-theme') || 'dark';
        const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
        html.setAttribute('data-theme', nextTheme);
        localStorage.setItem('v-theme', nextTheme);

        // Update Icons
        const themeBtn = document.querySelector('.nav-tool-btn i[data-lucide="sun"], .nav-tool-btn i[data-lucide="moon"]');
        if (themeBtn) {
            themeBtn.setAttribute('data-lucide', nextTheme === 'dark' ? 'sun' : 'moon');
            if (window.lucide) window.lucide.createIcons();
        }
    };

    // Load saved theme
    const savedTheme = localStorage.getItem('v-theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);

    // Set initial icon
    const themeBtn = document.querySelector('.nav-tool-btn i');
    if (themeBtn) {
        themeBtn.setAttribute('data-lucide', savedTheme === 'dark' ? 'sun' : 'moon');
    }

    // --- 6. Initial Animation ---
    setTimeout(() => {
        document.querySelector('.hero-content .massive-heading')?.classList.add('active');
    }, 500);

    // --- 7. Mobile Menu Logic ---
    const mobileToggle = document.querySelector('.v-mobile-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (mobileToggle && navLinks) {
        mobileToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            mobileToggle.classList.toggle('active');
        });
    }


    // --- 8. Lucide Icon Initialization ---
    if (window.lucide) {
        window.lucide.createIcons();
    }
    // --- 9. Tactical Module Scroll-Spy ---
    const moduleItems = document.querySelectorAll('.module-item');
    const sections = Array.from(moduleItems).map(item => {
        const id = item.getAttribute('href');
        return id && id.startsWith('#') ? document.querySelector(id) : null;
    }).filter(s => s);

    if (moduleItems.length > 0 && sections.length > 0) {
        const updateActive = () => {
            let current = "";
            let bestMatch = null;
            const scrollPos = window.scrollY + (window.innerHeight * 0.35); // Trigger point
            const viewportCenter = window.innerWidth / 2;

            sections.forEach(section => {
                const rect = section.getBoundingClientRect();
                const absTop = rect.top + window.scrollY;

                if (scrollPos >= absTop - 10) {
                    if (!bestMatch || absTop > bestMatch.absTop) {
                        // New lower section found
                        bestMatch = { id: section.getAttribute('id'), absTop, rect };
                    } else if (bestMatch && Math.abs(absTop - bestMatch.absTop) < 10) {
                        // Same row! Check which one is closer to horizontal center
                        const currentMidX = rect.left + (rect.width / 2);
                        const bestMidX = bestMatch.rect.left + (bestMatch.rect.width / 2);

                        if (Math.abs(viewportCenter - currentMidX) < Math.abs(viewportCenter - bestMidX)) {
                            bestMatch = { id: section.getAttribute('id'), absTop, rect };
                        }
                    }
                }
            });

            // Special handle for bottom of page
            const isAtBottom = (window.innerHeight + window.scrollY >= document.body.offsetHeight - 5);
            if (isAtBottom && bestMatch) {
                // If we are at the bottom, we might want to stick to the the last section
                // but only if we've passed its top. The loop above handles this already.
            }

            if (bestMatch) current = bestMatch.id;

            if (current) {
                moduleItems.forEach(item => {
                    item.classList.toggle('active', item.getAttribute('href') === `#${current}`);
                });
            }
        };

        window.addEventListener('scroll', updateActive);
        window.addEventListener('resize', updateActive);
        updateActive();
    }
});
