/* ============================================================
   ZHENTAR P.G. — PORTFOLIO INTERACTIONS
   Animasi & Ikon Teknologi untuk Foto Profil
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
    initTechIcons();
    initScrollReveal();
    initParallaxGlow();
    initProfileHover();
});

/* ------------------------------------------------------------
   1. IKON TEKNOLOGI MELAYANG DI SEKITAR FOTO PROFIL
   ------------------------------------------------------------ */
function initTechIcons() {
    const visual = document.querySelector('.hero-visual');
    if (!visual) return;

    // Cek apakah ikon sudah ada di HTML (biar tidak dobel)
    if (visual.querySelector('.tech-icon')) return;

    const icons = [
        { cls: 'html',  label: '</>' },
        { cls: 'css',   label: 'CSS' },
        { cls: 'js',    label: 'JS' },
        { cls: 'react', label: '⚛' },
        { cls: 'node',  label: '⬢' },
        { cls: 'figma', label: '🎨' }
    ];

    icons.forEach(({ cls, label }) => {
        const el = document.createElement('div');
        el.className = `tech-icon ${cls}`;
        const labelEl = document.createElement('span');
        labelEl.textContent = label;
        el.appendChild(labelEl);
        el.setAttribute('aria-hidden', 'true');
        el.title = cls.toUpperCase();

        // Efek hover: sedikit mengangkat & glow (sudah diatur CSS,
        // tapi kita tambahkan class aktif saat disentuh di mobile)
        el.addEventListener('touchstart', () => {
            el.classList.add('touch-active');
            setTimeout(() => el.classList.remove('touch-active'), 400);
        }, { passive: true });

        visual.appendChild(el);
    });
}

/* ------------------------------------------------------------
   2. SCROLL REVEAL — elemen muncul halus saat di-scroll
   ------------------------------------------------------------ */
function initScrollReveal() {
    const targets = document.querySelectorAll(
        '.card, .project-section, .cta, .hero-text, .hero-visual'
    );
    if (!targets.length) return;

    // Set state awal
    targets.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Delay bertingkat untuk efek bertahap
                const delay = entry.target.dataset.revealDelay || 0;
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, delay);
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px'
    });

    targets.forEach((el, i) => {
        el.dataset.revealDelay = i * 80;
        observer.observe(el);
    });
}

/* ------------------------------------------------------------
   3. PARALLAX GLOW — cahaya foto mengikuti mouse
   ------------------------------------------------------------ */
function initParallaxGlow() {
    const glow = document.querySelector('.profile-glow');
    if (!glow) return;

    // Hanya aktif di perangkat dengan mouse
    if (window.matchMedia('(hover: none)').matches) return;

    const parent = glow.closest('.hero-visual') || glow.parentElement;

    parent.addEventListener('mousemove', (e) => {
        const rect = parent.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;

        glow.style.setProperty('--mx', `${x * 12}px`);
        glow.style.setProperty('--my', `${y * 12}px`);
    });

    parent.addEventListener('mouseleave', () => {
        glow.style.setProperty('--mx', '0px');
        glow.style.setProperty('--my', '0px');
    });
}

/* ------------------------------------------------------------
   4. PROFILE HOVER — efek zoom + glow tambahan saat hover
   ------------------------------------------------------------ */
function initProfileHover() {
    const frame = document.querySelector('.profile-glow');
    if (!frame) return;

    frame.addEventListener('mouseenter', () => {
        frame.style.animationPlayState = 'paused';
    });

    frame.addEventListener('mouseleave', () => {
        frame.style.animationPlayState = 'running';
    });
}
