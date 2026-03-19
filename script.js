// ================================
//   SABANUSA - script.js
// ================================

document.addEventListener('DOMContentLoaded', function () {

    // ================================
    //   MOBILE MENU TOGGLE
    // ================================
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        document.querySelectorAll('.nav-link, .logo').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }

    // ================================
    //   LOGO CLICK → HOME
    // ================================
    const logo = document.querySelector('.logo');
    if (logo) {
        logo.addEventListener('click', () => {
            window.location.href = 'index.html';
        });
    }

    // ================================
    //   ACTIVE NAV LINK (auto-detect page)
    // ================================
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });

    // ================================
    //   NAVBAR SCROLL EFFECT
    // ================================
    window.addEventListener('scroll', () => {
        const nav = document.querySelector('nav');
        if (nav) {
            if (window.scrollY > 50) {
                nav.style.background = 'rgba(255, 255, 255, 0.98)';
                nav.style.boxShadow = '0 4px 30px rgba(0,0,0,0.1)';
            } else {
                nav.style.background = 'rgba(255, 255, 255, 0.95)';
                nav.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
            }
        }
    });

    // ================================
    //   TOAST NOTIFICATION
    // ================================
    window.showToast = function (message, type = 'default', duration = 3500) {
        const toast = document.getElementById('toast');
        if (!toast) return;
        toast.textContent = message;
        toast.className = 'toast show';
        if (type === 'success') toast.classList.add('success');
        if (type === 'error') toast.classList.add('error');
        clearTimeout(window._toastTimer);
        window._toastTimer = setTimeout(() => {
            toast.classList.remove('show');
        }, duration);
    };

    // ================================
    //   CONTACT FORM (kontak.html)
    // ================================
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const nama = document.getElementById('nama').value.trim();
            const email = document.getElementById('email').value.trim();
            const pesan = document.getElementById('pesan').value.trim();
            const submitBtn = document.getElementById('submitBtn');

            if (!nama || !email || !pesan) {
                showToast('⚠️ Mohon isi semua field yang wajib diisi.', 'error');
                return;
            }

            // Simple email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showToast('⚠️ Format email tidak valid.', 'error');
                return;
            }

            // Loading state
            if (submitBtn) {
                submitBtn.classList.add('loading');
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Mengirim...';
            }

            // Simulate sending (replace with actual API call if needed)
            setTimeout(() => {
                if (submitBtn) {
                    submitBtn.classList.remove('loading');
                    submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Kirim Pesan';
                }
                showToast(`✅ Terima kasih, ${nama}! Pesan berhasil dikirim.`, 'success');
                contactForm.reset();
            }, 1500);
        });
    }

    // ================================
    //   DATA SEMUA PERIODE KEPEMIMPINAN
    // ================================
    const periodsData = [
        {
            id: 'p2025',
            label: '2025 – 2030',
            isCurrent: true,
            ketua: {
                name: 'Budi Santoso',
                position: 'Ketua Karang Taruna',
                photo: 'img/profil.jpeg',
                visi: 'Menciptakan generasi muda yang mandiri dan kreatif melalui program kepemimpinan yang inovatif.',
                misi: [
                    'Membangun karakter kepemimpinan pemuda.',
                    'Meningkatkan keterampilan manajerial.',
                    'Memperkuat jaringan kerja sama.'
                ]
            },
            wakil: {
                name: 'Siti Nurhaliza',
                position: 'Wakil Ketua Karang Taruna',
                photo: 'img/profil.jpeg',
                visi: 'Meningkatkan pemberdayaan perempuan muda dan kesetaraan gender dalam organisasi kepemudaan.',
                misi: [
                    'Program pemberdayaan perempuan muda.',
                    'Kegiatan kesetaraan gender.',
                    'Pengembangan keterampilan sosial.'
                ]
            }
        },
        {
            id: 'p2020',
            label: '2020 – 2025',
            isCurrent: false,
            ketua: {
                name: 'Ahmad Fauzi',
                position: 'Ketua Karang Taruna',
                photo: 'img/profil.jpeg',
                visi: 'Mewujudkan karang taruna yang solid, aktif, dan berdaya saing tinggi di tingkat kecamatan maupun kabupaten.',
                misi: [
                    'Meningkatkan solidaritas antar anggota.',
                    'Mengembangkan program wirausaha pemuda.',
                    'Menjalin kerjasama lintas organisasi.'
                ]
            },
            wakil: {
                name: 'Rina Kartika',
                position: 'Wakil Ketua Karang Taruna',
                photo: 'img/profil.jpeg',
                visi: 'Meningkatkan partisipasi perempuan dalam kegiatan sosial dan pemberdayaan masyarakat.',
                misi: [
                    'Mendorong peran aktif perempuan dalam organisasi.',
                    'Program pelatihan keterampilan berbasis komunitas.',
                    'Penguatan jaringan antar pemuda desa.'
                ]
            }
        },
        {
            id: 'p2015',
            label: '2015 – 2020',
            isCurrent: false,
            ketua: {
                name: 'Dewi Sartika',
                position: 'Ketua Karang Taruna',
                photo: 'img/profil.jpeg',
                visi: 'Membangun pondasi organisasi yang kuat dan menciptakan program berkelanjutan bagi generasi muda.',
                misi: [
                    'Menyusun struktur organisasi yang sistematis.',
                    'Merintis program sosial kemasyarakatan.',
                    'Membangun budaya gotong royong pemuda.'
                ]
            },
            wakil: {
                name: 'Reza Pratama',
                position: 'Wakil Ketua Karang Taruna',
                photo: 'img/profil.jpeg',
                visi: 'Menciptakan generasi muda yang tangguh, berkarakter, dan berdedikasi tinggi terhadap masyarakat.',
                misi: [
                    'Program pembinaan karakter pemuda.',
                    'Kegiatan olahraga dan seni budaya.',
                    'Pemberdayaan ekonomi kreatif pemuda.'
                ]
            }
        }
    ];

    // ================================
    //   PROFIL SLIDER + DOTS + PERIOD SWITCH
    // ================================
    const fullSliderTrack = document.getElementById('fullSliderTrack');
    const fullPrevBtn = document.getElementById('fullPrevBtn');
    const fullNextBtn = document.getElementById('fullNextBtn');
    const dots = document.querySelectorAll('.dot');
    const periodList = document.getElementById('periodList');
    const periodBadgeText = document.getElementById('periodBadgeText');
    let currentFullSlide = 0;
    let activePeriodId = 'p2025';

    // Render slide content from data
    function renderPeriod(periodId) {
        const period = periodsData.find(p => p.id === periodId);
        if (!period) return;

        activePeriodId = periodId;

        // Update badge
        if (periodBadgeText) {
            periodBadgeText.textContent = `Periode ${period.label}${period.isCurrent ? ' (Aktif)' : ''}`;
        }

        // Animate slide content out
        const slides = document.querySelectorAll('.full-slide');
        slides.forEach(s => s.classList.add('switching'));

        setTimeout(() => {
            // Ketua slide
            const ketuaNameEl = document.getElementById('slideKetuaName');
            const ketuaPosEl  = document.getElementById('slideKetuaPos');
            const ketuaRightEl = document.getElementById('slideKetuaRight');
            const ketuaPhotoEl = document.getElementById('slideKetuaPhoto');

            if (ketuaNameEl) ketuaNameEl.textContent = period.ketua.name;
            if (ketuaPosEl)  ketuaPosEl.textContent  = period.ketua.position;
            if (ketuaPhotoEl) ketuaPhotoEl.src = period.ketua.photo;
            if (ketuaRightEl) {
                ketuaRightEl.innerHTML = `
                    <h2>Visi Ketua</h2>
                    <p>${period.ketua.visi}</p>
                    <h2>Misi Ketua</h2>
                    <ol class="misi-list">
                        ${period.ketua.misi.map(m => `<li>${m}</li>`).join('')}
                    </ol>`;
            }

            // Wakil slide
            const wakilNameEl  = document.getElementById('slideWakilName');
            const wakilPosEl   = document.getElementById('slideWakilPos');
            const wakilRightEl = document.getElementById('slideWakilRight');
            const wakilPhotoEl = document.getElementById('slideWakilPhoto');

            if (wakilNameEl) wakilNameEl.textContent = period.wakil.name;
            if (wakilPosEl)  wakilPosEl.textContent  = period.wakil.position;
            if (wakilPhotoEl) wakilPhotoEl.src = period.wakil.photo;
            if (wakilRightEl) {
                wakilRightEl.innerHTML = `
                    <h2>Visi Wakil Ketua</h2>
                    <p>${period.wakil.visi}</p>
                    <h2>Misi Wakil Ketua</h2>
                    <ol class="misi-list">
                        ${period.wakil.misi.map(m => `<li>${m}</li>`).join('')}
                    </ol>`;
            }

            // Reset slider to first slide
            showFullSlide(0);

            slides.forEach(s => s.classList.remove('switching'));

            // Update active period in dropdown
            document.querySelectorAll('.period-item').forEach(el => {
                el.classList.toggle('active-period', el.dataset.periodId === periodId);
            });

        }, 200);
    }

    // Build dropdown list
    if (periodList) {
        periodsData.forEach(period => {
            const li = document.createElement('li');
            li.innerHTML = `
                <div class="period-item${period.isCurrent ? ' active-period' : ''}" data-period-id="${period.id}">
                    <span class="period-label">
                        ${period.label}
                        ${period.isCurrent ? ' <span style="background:#dc2626;color:white;font-size:0.7rem;padding:2px 7px;border-radius:20px;margin-left:4px;">Aktif</span>' : ''}
                    </span>
                    <span class="period-names">
                        Ketua: ${period.ketua.name}
                        <span>Wakil: ${period.wakil.name}</span>
                    </span>
                </div>`;
            li.querySelector('.period-item').addEventListener('click', () => {
                renderPeriod(period.id);
                leadershipDropdown.classList.remove('active');
            });
            periodList.appendChild(li);
        });
    }

    // Init with current period
    renderPeriod('p2025');

    if (fullSliderTrack && fullPrevBtn && fullNextBtn) {
        function showFullSlide(index) {
            const totalSlides = document.querySelectorAll('.full-slide').length || 2;
            if (index < 0) index = 0;
            if (index >= totalSlides) index = totalSlides - 1;
            fullSliderTrack.style.transform = `translateX(-${index * 100}%)`;
            document.querySelectorAll('.full-slide').forEach((slide, i) => {
                slide.classList.toggle('active', i === index);
            });
            dots.forEach((dot, i) => {
                dot.classList.toggle('active', i === index);
            });
            currentFullSlide = index;
        }

        fullNextBtn.addEventListener('click', () => {
            const total = document.querySelectorAll('.full-slide').length || 2;
            showFullSlide((currentFullSlide + 1) % total);
        });

        fullPrevBtn.addEventListener('click', () => {
            const total = document.querySelectorAll('.full-slide').length || 2;
            showFullSlide((currentFullSlide - 1 + total) % total);
        });

        dots.forEach((dot, i) => {
            dot.addEventListener('click', () => showFullSlide(i));
        });

        // Auto-slide setiap 5 detik
        let autoSlideInterval = setInterval(() => {
            const total = document.querySelectorAll('.full-slide').length || 2;
            showFullSlide((currentFullSlide + 1) % total);
        }, 5000);

        const sliderEl = fullSliderTrack.closest('.full-hero-slider');
        sliderEl.addEventListener('mouseenter', () => clearInterval(autoSlideInterval));
        sliderEl.addEventListener('mouseleave', () => {
            autoSlideInterval = setInterval(() => {
                const total = document.querySelectorAll('.full-slide').length || 2;
                showFullSlide((currentFullSlide + 1) % total);
            }, 5000);
        });
    }

    // ================================
    //   LEADERSHIP DROPDOWN TOGGLE
    // ================================
    const leadershipBtn = document.getElementById('leadershipBtn');
    const leadershipDropdown = document.getElementById('leadershipDropdown');

    if (leadershipBtn && leadershipDropdown) {
        leadershipBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            leadershipDropdown.classList.toggle('active');
        });

        document.addEventListener('click', (e) => {
            if (!leadershipBtn.contains(e.target) && !leadershipDropdown.contains(e.target)) {
                leadershipDropdown.classList.remove('active');
            }
        });
    }

    // ================================
    //   SCROLL REVEAL ANIMATION
    // ================================
    const revealElements = document.querySelectorAll('.reveal');

    if (revealElements.length > 0) {
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    // Stagger delay for sibling elements
                    const siblings = Array.from(entry.target.parentElement.querySelectorAll('.reveal'));
                    const siblingIndex = siblings.indexOf(entry.target);
                    entry.target.style.transitionDelay = `${siblingIndex * 0.1}s`;
                    entry.target.classList.add('visible');
                    revealObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.12,
            rootMargin: '0px 0px -40px 0px'
        });

        revealElements.forEach(el => revealObserver.observe(el));
    }

    // ================================
    //   COUNTER ANIMATION (profil.html)
    // ================================
    const counters = document.querySelectorAll('.counter');

    if (counters.length > 0) {
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const el = entry.target;
                    const target = parseInt(el.getAttribute('data-target'));
                    const suffix = el.getAttribute('data-suffix') || '+';
                    const duration = 1800;
                    const stepTime = 20;
                    const steps = duration / stepTime;
                    const increment = target / steps;
                    let current = 0;

                    const timer = setInterval(() => {
                        current += increment;
                        if (current >= target) {
                            current = target;
                            clearInterval(timer);
                        }
                        el.textContent = Math.floor(current) + suffix;
                    }, stepTime);

                    counterObserver.unobserve(el);
                }
            });
        }, { threshold: 0.5 });

        counters.forEach(counter => counterObserver.observe(counter));
    }

    // ================================
    //   SCROLL TO TOP BUTTON
    // ================================
    const scrollTopBtn = document.getElementById('scrollTopBtn');

    if (scrollTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 400) {
                scrollTopBtn.classList.add('visible');
            } else {
                scrollTopBtn.classList.remove('visible');
            }
        });

        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // ================================
    //   SMOOTH SCROLL FOR ANCHOR LINKS
    // ================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

});