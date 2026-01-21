// ===================================
// LOAD PRODUCTS FROM JSON
// ===================================

// Function to trigger product cards animation
function animateProductCards() {
    const activeTabContent = document.querySelector('.tab-content.active');
    if (activeTabContent) {
        const productCards = activeTabContent.querySelectorAll('.product-card');

        // Remove animation class first
        productCards.forEach(card => {
            card.classList.remove('animate-in');
        });

        // Trigger reflow to restart animation
        void activeTabContent.offsetWidth;

        // Add animation class
        productCards.forEach(card => {
            card.classList.add('animate-in');
        });
    }
}

async function loadProducts() {
    try {
        const response = await fetch('data/products.json');
        const data = await response.json();

        // Populate each category
        Object.keys(data).forEach(category => {
            const tabContent = document.querySelector(`[data-content="${category}"]`);
            if (tabContent) {
                const productsGrid = tabContent.querySelector('.products-grid');
                if (productsGrid) {
                    productsGrid.innerHTML = ''; // Clear existing content

                    // Limit to 3 products per category on home page
                    data[category].slice(0, 3).forEach((product, index) => {
                        const productCard = document.createElement('div');
                        productCard.className = 'product-card';
                        const timestamp = Date.now();
                        productCard.innerHTML = `
                            <h3>${product.title}</h3>
                            <p>${product.shortDescription}</p>
                            <a href="products.html?category=${category}&index=${index}&v=${timestamp}" class="btn-primary">LEARN MORE</a>
                        `;
                        productsGrid.appendChild(productCard);
                    });
                }
            }
        });

        // Set up Intersection Observer for products section
        const productsSection = document.querySelector('.products-section');
        if (productsSection) {
            const sectionObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        animateProductCards();
                    }
                });
            }, {
                threshold: 0.2
            });

            sectionObserver.observe(productsSection);
        }

        // Initial animation for visible cards
        setTimeout(() => {
            animateProductCards();
        }, 100);
    } catch (error) {
        console.error('Error loading products:', error);
    }
}

// Load products when DOM is ready
if (document.querySelector('.products-section')) {
    loadProducts();
}

// ===================================
// TABS FUNCTIONALITY
// ===================================
const tabBtns = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const targetTab = btn.getAttribute('data-tab');

        // Remove active class from all buttons and contents
        tabBtns.forEach(b => {
            b.classList.remove('active');
            b.setAttribute('aria-selected', 'false');
        });
        tabContents.forEach(c => c.classList.remove('active'));

        // Add active class to clicked button and corresponding content
        btn.classList.add('active');
        btn.setAttribute('aria-selected', 'true');
        const targetContent = document.querySelector(`[data-content="${targetTab}"]`);
        if (targetContent) {
            targetContent.classList.add('active');

            // Trigger animation for the new category
            setTimeout(() => {
                animateProductCards();
            }, 50);
        }
    });
});

// ===================================
// TESTIMONIALS SLIDER
// ===================================
if (document.querySelector('.testimonials-slider')) {
    const swiper = new Swiper('.testimonials-slider', {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        breakpoints: {
            768: {
                slidesPerView: 1,
            },
            1024: {
                slidesPerView: 1,
            }
        }
    });
}

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
// CTA SECTION STEPS ANIMATION (ONE TIME ONLY)
// ===================================
const ctaSection = document.querySelector('.cta-section');
const processSteps = document.querySelectorAll('.step');

if (ctaSection && processSteps.length > 0) {
    // Check if animation has already been shown
    const hasAnimated = sessionStorage.getItem('ctaStepsAnimated');

    if (!hasAnimated) {
        const ctaObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Add animation class to all steps
                    processSteps.forEach(step => {
                        step.classList.add('animate-step');
                    });

                    // Mark as animated in session storage
                    sessionStorage.setItem('ctaStepsAnimated', 'true');

                    // Stop observing after animation
                    ctaObserver.disconnect();
                }
            });
        }, {
            threshold: 0.3
        });

        ctaObserver.observe(ctaSection);
    } else {
        // If already animated, show steps immediately
        processSteps.forEach(step => {
            step.style.opacity = '1';
            step.style.transform = 'translateY(0)';
        });
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
document.querySelectorAll('.product-card, .stat-card, .benefit-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});