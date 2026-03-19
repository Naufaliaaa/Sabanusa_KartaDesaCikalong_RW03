// Common navigation for all pages
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

// Close menu when clicking link (nav-link + logo)
        document.querySelectorAll('.nav-link, .logo').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }

    // Logo click to home
    document.querySelector('.logo').addEventListener('click', () => {
        window.location.href = 'index.html';
    });

    // Set active nav link based on current page
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-link').forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });

    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        const nav = document.querySelector('nav');
        if (window.scrollY > 50) {
            nav.style.background = 'rgba(255, 255, 255, 0.98)';
            nav.style.boxShadow = '0 4px 30px rgba(0,0,0,0.1)';
        } else {
            nav.style.background = 'rgba(255, 255, 255, 0.95)';
            nav.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
        }
    });
});

// Contact form handler (only on kontak.html)
if (document.getElementById('contactForm')) {
    document.getElementById('contactForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const nama = document.getElementById('nama').value;
        const email = document.getElementById('email').value;
        const pesan = document.getElementById('pesan').value;
        
        if (nama && email && pesan) {
            alert(`Terima kasih ${nama}!\nPesan Anda telah terkirim ke info@karangtaruna.org\nKami akan balas dalam 24 jam.`);
            this.reset();
        } else {
            alert('Mohon lengkapi semua field wajib (*)');
        }
    });
}

// Leadership dropdown toggle (profil.html)
const leadershipBtn = document.getElementById('leadershipBtn');
const leadershipDropdown = document.getElementById('leadershipDropdown');
if (leadershipBtn && leadershipDropdown) {
    leadershipBtn.addEventListener('click', () => {
        leadershipDropdown.classList.toggle('active');
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
        if (!leadershipBtn.contains(e.target) && !leadershipDropdown.contains(e.target)) {
            leadershipDropdown.classList.remove('active');
        }
    });
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});
