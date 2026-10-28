/* ============================================================
   ZHENTAR P.G. — PORTFOLIO INTERACTIONS
   Animasi & Ikon Teknologi untuk Foto Profil
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
    initTechIcons();
    initScrollReveal();
    initParallaxGlow();
    initProfileHover();

    /* ==== TAMBAHAN ANIMASI BARU ==== */
    initMarquee();          // teks berjalan
    initTypingEffect();     // teks ngetik di hero
    initTiltCard();         // kartu miring 3D saat mouse gerak
    initCursorDot();        // titik putih mengikuti kursor
    initCounterNumbers();   // angka chart naik dari 0
});

/* ------------------------------------------------------------
   1. IKON TEKNOLOGI MELAYANG DI SEKITAR FOTO PROFIL
   ------------------------------------------------------------ */
function initTechIcons() {
    const visual = document.querySelector('.hero-visual');
    if (!visual) return;
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

    targets.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
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

/* ============================================================
   ============ TAMBAHAN ANIMASI BARU =========================
   ============================================================ */

/* ------------------------------------------------------------
   5. MARQUEE — teks berjalan otomatis
   ------------------------------------------------------------ */
function initMarquee() {
    // Cari semua <div class="marquee">, lalu isi dengan teks berulang
    document.querySelectorAll('.marquee').forEach((marquee) => {
        // Kalau sudah ada isinya, biarkan
        if (marquee.querySelector('.marquee-track')) return;

        const text = marquee.dataset.text || 'HTML • CSS • JAVASCRIPT • PYTHON • PHP • RPL • ';
        const track = document.createElement('div');
        track.className = 'marquee-track';

        // Bikin 2 span: satu isi teks, satu duplikat (biar loop mulus)
        for (let i = 0; i < 2; i++) {
            const span = document.createElement('span');
            span.textContent = text + ' ';
            track.appendChild(span);
        }

        marquee.appendChild(track);
        marquee.classList.add('marquee-ready');
    });
}

/* ------------------------------------------------------------
   6. TYPING EFFECT — teks ngetik di hero
   ------------------------------------------------------------ */
function initTypingEffect() {
    // Cari elemen dengan class .typing-text
    const typingEls = document.querySelectorAll('.typing-text');
    if (!typingEls.length) return;

    typingEls.forEach((el) => {
        const words = JSON.parse(el.dataset.words || '["Web Developer","Siswa RPL","Pembelajar"]');
        let wordIndex = 0;
        let charIndex = 0;
        let deleting = false;

        const type = () => {
            const current = words[wordIndex];
            if (deleting) {
                el.textContent = current.substring(0, charIndex--);
            } else {
                el.textContent = current.substring(0, charIndex++);
            }

            let speed = deleting ? 50 : 100;

            if (!deleting && charIndex === current.length + 1) {
                speed = 1500;
                deleting = true;
            } else if (deleting && charIndex === 0) {
                deleting = false;
                wordIndex = (wordIndex + 1) % words.length;
                speed = 400;
            }

            setTimeout(type, speed);
        };

        type();
    });
}

/* ------------------------------------------------------------
   7. TILT CARD — kartu miring 3D mengikuti mouse
   ------------------------------------------------------------ */
function initTiltCard() {
    if (window.matchMedia('(hover: none)').matches) return;

    const cards = document.querySelectorAll('.card, .sosmed-card, .routine-item');
    cards.forEach((card) => {
        card.classList.add('tilt-card');

        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;
            card.style.transform =
                `perspective(900px) rotateX(${-y * 6}deg) rotateY(${x * 6}deg) translateY(-4px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });
}

/* ------------------------------------------------------------
   8. CURSOR DOT — titik putih mengikuti kursor
   ------------------------------------------------------------ */
function initCursorDot() {
    if (window.matchMedia('(hover: none)').matches) return;
    if (document.querySelector('.cursor-dot')) return;

    const dot = document.createElement('div');
    dot.className = 'cursor-dot';
    dot.setAttribute('aria-hidden', 'true');
    document.body.appendChild(dot);

    document.addEventListener('mousemove', (e) => {
        dot.style.left = `${e.clientX}px`;
        dot.style.top = `${e.clientY}px`;
        dot.style.opacity = '1';
    });

    const hideDot = () => {
        dot.style.opacity = '0';
    };

    document.addEventListener('mouseleave', hideDot);
    window.addEventListener('blur', hideDot);
    window.addEventListener('mouseout', (e) => {
        if (!e.relatedTarget) hideDot();
    });
}

/* ------------------------------------------------------------
   9. COUNTER NUMBERS — angka chart naik dari 0 ke target
   ------------------------------------------------------------ */
function initCounterNumbers() {
    const fills = document.querySelectorAll('.chart-bar .fill');
    if (!fills.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;

            const el = entry.target;
            const target = parseInt(el.style.width) || 0;
            let current = 0;

            el.style.width = '0%';
            el.textContent = '0%';

            const duration = 1200;
            const startTime = performance.now();

            const step = (now) => {
                const progress = Math.min((now - startTime) / duration, 1);
                const eased = 1 - Math.pow(1 - progress, 3); // ease-out
                current = Math.round(target * eased);
                el.style.width = current + '%';
                el.textContent = current + '%';

                if (progress < 1) requestAnimationFrame(step);
            };
            requestAnimationFrame(step);

            observer.unobserve(el);
        });
    }, { threshold: 0.4 });

    fills.forEach((fill) => observer.observe(fill));
}