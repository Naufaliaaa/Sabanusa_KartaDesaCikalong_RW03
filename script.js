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
    //   PROFIL SLIDER + DOTS
    // ================================
    const fullSliderTrack = document.getElementById('fullSliderTrack');
    const fullPrevBtn = document.getElementById('fullPrevBtn');
    const fullNextBtn = document.getElementById('fullNextBtn');
    const dots = document.querySelectorAll('.dot');
    let currentFullSlide = 0;
    const totalFullSlides = document.querySelectorAll('.full-slide').length || 2;

    if (fullSliderTrack && fullPrevBtn && fullNextBtn) {

        function showFullSlide(index) {
            fullSliderTrack.style.transform = `translateX(-${index * 100}%)`;
            document.querySelectorAll('.full-slide').forEach((slide, i) => {
                slide.classList.toggle('active', i === index);
            });
            // Update dots
            dots.forEach((dot, i) => {
                dot.classList.toggle('active', i === index);
            });
            currentFullSlide = index;
        }

        fullNextBtn.addEventListener('click', () => {
            showFullSlide((currentFullSlide + 1) % totalFullSlides);
        });

        fullPrevBtn.addEventListener('click', () => {
            showFullSlide((currentFullSlide - 1 + totalFullSlides) % totalFullSlides);
        });

        // Dot click navigation
        dots.forEach((dot, i) => {
            dot.addEventListener('click', () => showFullSlide(i));
        });

        // Auto-slide every 5 seconds
        let autoSlideInterval = setInterval(() => {
            showFullSlide((currentFullSlide + 1) % totalFullSlides);
        }, 5000);

        // Pause auto-slide on hover
        fullSliderTrack.closest('.full-hero-slider').addEventListener('mouseenter', () => {
            clearInterval(autoSlideInterval);
        });
        fullSliderTrack.closest('.full-hero-slider').addEventListener('mouseleave', () => {
            autoSlideInterval = setInterval(() => {
                showFullSlide((currentFullSlide + 1) % totalFullSlides);
            }, 5000);
        });
    }

    // ================================
    //   LEADERSHIP DROPDOWN
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