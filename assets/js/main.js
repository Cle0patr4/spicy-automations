// ===================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ===================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && href !== '') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// ===================================
// FLAMES VIDEO SCROLL EFFECT
// ===================================
const heroSection = document.querySelector('.hero');
const flamesContainers = document.querySelectorAll('.flames-container');

if (heroSection && flamesContainers.length > 0) {
    window.addEventListener('scroll', () => {
        const heroBottom = heroSection.getBoundingClientRect().bottom;

        // When hero section goes above the viewport, hide flames
        if (heroBottom <= 0) {
            flamesContainers.forEach(container => {
                container.style.opacity = '0';
            });
        } else {
            // Calculate opacity based on how much of hero is visible
            const opacity = Math.max(0, heroBottom / window.innerHeight);
            flamesContainers.forEach(container => {
                container.style.opacity = opacity;
            });
        }
    });
}

// ===================================
// FLAMES ANIMATION ON FIRST LOAD
// ===================================
const flamesRight = document.querySelector('.flames-right');
const flamesLeft = document.querySelector('.flames-left');

if (flamesRight && flamesLeft) {
    // Check if animation has already been shown
    const hasFlamesAnimated = sessionStorage.getItem('flamesAnimated');

    if (!hasFlamesAnimated) {
        // Wait a bit for page to load, then animate
        setTimeout(() => {
            flamesRight.classList.add('animate-flames');
            flamesLeft.classList.add('animate-flames');

            // Mark as animated in session storage
            sessionStorage.setItem('flamesAnimated', 'true');
        }, 300);
    } else {
        // If already animated, show flames immediately
        flamesRight.style.opacity = '1';
        flamesRight.style.transform = 'translateY(0)';
        flamesLeft.style.opacity = '1';
        flamesLeft.style.transform = 'translateY(0)';
    }
}

// ===================================
// NAVBAR BACKGROUND ON SCROLL
// ===================================
// Navbar se mantiene fijo con color café, no cambia al hacer scroll

// ===================================
// ANIMATION ON SCROLL (OPTIONAL)
// ===================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.product-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});