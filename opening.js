/* ============================================================
   OPENING SCREEN LOGIC — ZHENTAR P.G.
   Menampilkan opening saat pertama kali masuk, lalu hilang otomatis.
   Menggunakan sessionStorage supaya tidak muncul terus saat pindah halaman.
   ============================================================ */

(function () {
    'use strict';

    const OPENING_DURATION = 3200; // durasi opening (ms)
    const STORAGE_KEY = 'zhentar_opening_seen';

    // Cek apakah opening sudah pernah dilihat di sesi ini
    const alreadySeen = sessionStorage.getItem(STORAGE_KEY);

    // Kalau sudah pernah, langsung skip opening
    if (alreadySeen) {
        document.body.classList.add('opening-done');
        return;
    }

    // ====== Bangun struktur HTML opening ======
    const opening = document.createElement('div');
    opening.className = 'opening-screen';
    opening.setAttribute('aria-hidden', 'true');
    opening.innerHTML = `
        <div class="opening-ring ring-1"></div>
        <div class="opening-ring ring-2"></div>
        <div class="opening-ring ring-3"></div>

        <span class="opening-particle"></span>
        <span class="opening-particle"></span>
        <span class="opening-particle"></span>
        <span class="opening-particle"></span>
        <span class="opening-particle"></span>
        <span class="opening-particle"></span>

        <div class="opening-content">
            <h1 class="opening-logo">
                ZHENTAR<span> P.G</span>
                <svg class="opening-bolt" viewBox="0 0 500 200" preserveAspectRatio="none" aria-hidden="true">
                    <polyline points="350,0 320,48 345,70 270,105 295,128 245,200"></polyline>
                </svg>
            </h1>
            <p class="opening-subtitle">
                Front-End Developer
                <span class="dot"></span>
                Portofolio
            </p>
            <div class="opening-loader"></div>
            <p class="opening-loading-text">Memuat</p>
        </div>

        <div class="opening-percent">
            <span id="openingPercent">0</span>%
        </div>
    `;

    // Tampilkan opening sebelum body render
    document.body.classList.add('opening-active');
    document.body.appendChild(opening);

    // ====== Animasi counter persentase ======
    const percentEl = opening.querySelector('#openingPercent');
    let current = 0;
    const lightningTimers = [];
    const stepTime = OPENING_DURATION / 100;
    const counter = setInterval(() => {
        current += 1;
        if (current >= 100) {
            current = 100;
            clearInterval(counter);
        }
        if (percentEl) percentEl.textContent = current;
    }, stepTime);

    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        const scheduleLightning = (delay) => {
            lightningTimers.push(setTimeout(() => {
                if (!opening.isConnected) return;

                opening.classList.add('lightning-strike');
                lightningTimers.push(setTimeout(() => {
                    opening.classList.remove('lightning-strike');
                }, 520));
            }, delay));
        };

        scheduleLightning(1250);
        scheduleLightning(2150);
    }

    // ====== Selesai: sembunyikan opening ======
    const finishOpening = () => {
        lightningTimers.forEach(clearTimeout);
        opening.classList.add('hidden');
        document.body.classList.remove('opening-active');
        document.body.classList.add('opening-done');
        sessionStorage.setItem(STORAGE_KEY, 'true');

        // Hapus elemen setelah transisi selesai
        setTimeout(() => {
            if (opening.parentNode) opening.parentNode.removeChild(opening);
        }, 1000);
    };

    // Selesai otomatis
    const autoFinish = setTimeout(finishOpening, OPENING_DURATION);

    // Bisa di-skip dengan klik / tombol Escape
    const skipOpening = () => {
        clearTimeout(autoFinish);
        clearInterval(counter);
        finishOpening();
    };

    opening.addEventListener('click', skipOpening);
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') skipOpening();
    });

    // Safety: kalau user pindah tab lalu balik, tetap selesai
    window.addEventListener('load', () => {
        setTimeout(() => {
            if (document.body.classList.contains('opening-active')) {
                // biarkan autoFinish bekerja
            }
        }, OPENING_DURATION + 500);
    });
})();