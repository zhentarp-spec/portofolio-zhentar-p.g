// ==========================================
// JAVASCRIPT PORTOFOLIO ZHENTAR
// ==========================================

// Menunggu HTML selesai dimuat
document.addEventListener("DOMContentLoaded", function () {

    console.log("JavaScript berhasil terhubung!");

    // ======================================
    // EFEK HALAMAN SAAT DIBUKA
    // ======================================

    document.body.style.opacity = "0";

    setTimeout(function () {
        document.body.style.transition = "opacity 0.8s ease";
        document.body.style.opacity = "1";
    }, 100);


    // ======================================
    // EFEK PADA TOMBOL
    // ======================================

    const tombol = document.querySelectorAll("button");

    tombol.forEach(function (button) {

        button.style.transition = "0.3s";

        button.addEventListener("mouseenter", function () {
            button.style.transform = "scale(1.05)";
            button.style.cursor = "pointer";
        });

        button.addEventListener("mouseleave", function () {
            button.style.transform = "scale(1)";
        });

        button.addEventListener("mousedown", function () {
            button.style.transform = "scale(0.95)";
        });

        button.addEventListener("mouseup", function () {
            button.style.transform = "scale(1.05)";
        });
    });


    // ======================================
    // KONFIRMASI LINK SOSIAL MEDIA
    // ======================================

    const linkSosmed = document.querySelectorAll(
        'a[href*="tiktok.com"], a[href*="instagram.com"], a[href*="wa.me"]'
    );

    linkSosmed.forEach(function (link) {

        link.addEventListener("click", function (event) {

            const tujuan = link.href;

            let nama = "sosial media";

            if (tujuan.includes("tiktok.com")) {
                nama = "TikTok";
            }

            if (tujuan.includes("instagram.com")) {
                nama = "Instagram";
            }

            if (tujuan.includes("wa.me")) {
                nama = "WhatsApp";
            }

            const yakin = confirm(
                "Apakah kamu ingin membuka " + nama + "?"
            );

            if (!yakin) {
                event.preventDefault();
            }
        });
    });


    // ======================================
    // EFEK GAMBAR
    // ======================================

    const gambar = document.querySelectorAll("img");

    gambar.forEach(function (img) {

        img.style.transition = "0.3s";

        img.addEventListener("mouseenter", function () {
            img.style.transform = "scale(1.05)";
        });

        img.addEventListener("mouseleave", function () {
            img.style.transform = "scale(1)";
        });

        img.addEventListener("click", function () {

            // Membuka gambar dalam tampilan baru
            window.open(img.src, "_blank");

        });
    });


    // ======================================
    // MENAMPILKAN TAHUN OTOMATIS
    // ======================================

    const tahun = document.getElementById("tahun");

    if (tahun) {
        tahun.textContent = new Date().getFullYear();
    }


    // ======================================
    // JAM DIGITAL
    // ======================================

    function updateJam() {

        const jamElement = document.getElementById("jam");

        if (!jamElement) {
            return;
        }

        const sekarang = new Date();

        const jam = String(
            sekarang.getHours()
        ).padStart(2, "0");

        const menit = String(
            sekarang.getMinutes()
        ).padStart(2, "0");

        const detik = String(
            sekarang.getSeconds()
        ).padStart(2, "0");

        jamElement.textContent =
            jam + ":" + menit + ":" + detik;
    }

    updateJam();

    setInterval(updateJam, 1000);


    // ======================================
    // TANGGAL OTOMATIS
    // ======================================

    function updateTanggal() {

        const tanggalElement =
            document.getElementById("tanggal");

        if (!tanggalElement) {
            return;
        }

        const sekarang = new Date();

        const pilihan = {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric"
        };

        tanggalElement.textContent =
            sekarang.toLocaleDateString(
                "id-ID",
                pilihan
            );
    }

    updateTanggal();


    // ======================================
    // PESAN SELAMAT DATANG
    // ======================================

    const halaman =
        window.location.pathname.toLowerCase();

    if (
        halaman.includes("index.html") ||
        halaman.endsWith("/")
    ) {

        console.log(
            "Selamat datang di halaman utama!"
        );

    }

});


// ==========================================
// FUNGSI UNTUK TOMBOL SAPAAN
// ==========================================

function salam() {

    alert(
        "Halo! 👋\n\n" +
        "Selamat datang di website portofolio Zhentar.\n" +
        "Semoga website saya bisa menjadi lebih baik lagi."
    );

}


// ==========================================
// FUNGSI INFORMASI DIRI
// ==========================================

function informasi() {

    alert(
        "Nama: Zhentar P.G\n" +
        "Jurusan: RPL\n" +
        "Kegiatan: Belajar membuat website\n\n" +
        "Saya masih belajar HTML, CSS, JavaScript, " +
        "dan pemrograman lainnya."
    );

}


// ==========================================
// FUNGSI KEMBALI KE HALAMAN UTAMA
// ==========================================

function kembaliKeHome() {

    window.location.href = "index.html";

}


// ==========================================
// FUNGSI NOTIFIKASI
// ==========================================

function pesan(teks) {

    alert(teks);

}