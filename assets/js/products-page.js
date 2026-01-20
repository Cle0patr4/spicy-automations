// Load products data
let productsData = {};
let currentCategory = 'sales';
let selectedProductIndex = null;

// Get URL parameters
function getUrlParams() {
    const params = new URLSearchParams(window.location.search);
    return {
        category: params.get('category'),
        index: params.get('index')
    };
}

// Fetch products from JSON
async function loadProductsData() {
    try {
        const response = await fetch('data/products.json');
        productsData = await response.json();

        // Check if there are URL parameters
        const urlParams = getUrlParams();

        if (urlParams.category && urlParams.index !== null) {
            // Set the category from URL
            currentCategory = urlParams.category;

            // Update active tab
            document.querySelectorAll('.tab-btn').forEach(btn => {
                btn.classList.remove('active');
                btn.setAttribute('aria-selected', 'false');
                if (btn.getAttribute('data-category') === currentCategory) {
                    btn.classList.add('active');
                    btn.setAttribute('aria-selected', 'true');
                }
            });

            // Display products for this category
            displayProducts(currentCategory);

            // Select the specific product after a short delay to ensure cards are rendered
            setTimeout(() => {
                const productCards = document.querySelectorAll('.product-card');
                const index = parseInt(urlParams.index);
                if (productCards[index]) {
                    showProductDetail(currentCategory, index, productCards[index]);
                }
            }, 100);
        } else {
            // No URL params, display default category
            displayProducts(currentCategory);
        }
    } catch (error) {
        console.error('Error loading products:', error);
    }
}

// Display products for a specific category
function displayProducts(category) {
    const productsGrid = document.getElementById('productsGrid');
    productsGrid.innerHTML = '';
    selectedProductIndex = null;

    if (productsData[category]) {
        productsData[category].forEach((product, index) => {
            const productCard = document.createElement('div');
            productCard.className = 'product-card';
            productCard.innerHTML = `
                <h3>${product.title}</h3>
                <p>${product.shortDescription}</p>
            `;

            // Add smooth transition for all properties
            if (window.innerWidth <= 768) {
                productCard.style.transition = 'all 0.3s ease';
            }

            // Make entire card clickable
            productCard.addEventListener('click', () => {
                showProductDetail(category, index, productCard);
            });

            productsGrid.appendChild(productCard);
        });

        // Trigger animation after cards are added
        setTimeout(() => {
            const productCards = productsGrid.querySelectorAll('.product-card');
            productCards.forEach(card => {
                card.classList.add('animate-in');
            });
        }, 10);

        // Auto-select center card on scroll (for mobile)
        if (window.innerWidth <= 768) {
            setupCenterCardSelection(productsGrid, category);
        }
    }
}

// Function to auto-select the card in the center of the viewport
function setupCenterCardSelection(grid, category) {
    let scrollTimeout;
    let rafId = null;

    const selectCenterCard = () => {
        const cards = grid.querySelectorAll('.product-card');
        const viewportCenterX = window.innerWidth / 2;
        const cardWidth = window.innerWidth * 0.85; // Card is 85% of viewport
        const maxDistance = cardWidth * 0.6; // Distance threshold

        let closestCard = null;
        let closestDistance = Infinity;
        let closestIndex = 0;

        cards.forEach((card, index) => {
            const cardRect = card.getBoundingClientRect();
            const cardCenterX = cardRect.left + cardRect.width / 2;
            const distance = Math.abs(viewportCenterX - cardCenterX);

            // Calculate proximity factor (1 = at center, 0 = far from center)
            const proximityFactor = Math.max(0, 1 - (distance / maxDistance));

            // Is this card close enough to be considered "centered"?
            const isCentered = proximityFactor > 0.5;

            if (isCentered) {
                // Card is centered - apply full effect
                card.style.transform = 'translateY(-10px)';
                card.style.boxShadow = '0 12px 30px rgba(242, 140, 69, 0.3)';
                card.style.background = '#f28c45';
                card.classList.add('selected');

                const h3 = card.querySelector('h3');
                const p = card.querySelector('p');
                if (h3) h3.style.color = '#ffffff';
                if (p) p.style.color = '#ffffff';
            } else {
                // Card is not centered - remove effect
                card.style.transform = 'translateY(0)';
                card.style.boxShadow = 'none';
                card.style.background = '';
                card.classList.remove('selected');

                const h3 = card.querySelector('h3');
                const p = card.querySelector('p');
                if (h3) h3.style.color = '';
                if (p) p.style.color = '';
            }

            if (distance < closestDistance) {
                closestDistance = distance;
                closestCard = card;
                closestIndex = index;
            }
        });

        // Show product detail for the closest card
        if (closestCard && closestDistance < maxDistance) {
            updateProductDetailOnly(category, closestIndex);
        }
    };

    // Use requestAnimationFrame for smooth updates during scroll
    const onScroll = () => {
        if (rafId) cancelAnimationFrame(rafId);
        rafId = requestAnimationFrame(selectCenterCard);

        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            selectCenterCard();
        }, 100);
    };

    grid.addEventListener('scroll', onScroll, { passive: true });

    // Select initial center card
    setTimeout(selectCenterCard, 200);
}

// Update product detail without affecting card selection
function updateProductDetailOnly(category, index) {
    const product = productsData[category][index];
    const detailTitle = document.getElementById('detailTitle');
    const detailSubtitle = document.getElementById('detailSubtitle');
    const detailDescription = document.getElementById('detailDescription');
    const placeholder = document.getElementById('placeholderText');
    const productDetailContent = document.getElementById('productDetailContent');
    const interestBtn = document.getElementById('interestBtn');

    selectedProductIndex = index;

    // Hide placeholder and show product detail
    placeholder.style.display = 'none';
    productDetailContent.style.display = 'block';

    // Update detail section
    detailTitle.textContent = product.title;
    detailSubtitle.textContent = product.shortDescription;
    detailDescription.innerHTML = product.longDescription || product.shortDescription;

    // Update interest button link
    const encodedTitle = encodeURIComponent(product.title);
    interestBtn.href = `contact.html?product=${encodedTitle}`;

    const newInterestBtn = interestBtn.cloneNode(true);
    interestBtn.parentNode.replaceChild(newInterestBtn, interestBtn);

    newInterestBtn.addEventListener('click', (e) => {
        e.preventDefault();
        window.location.href = `contact.html?product=${encodedTitle}`;
    });
}

// Show product detail
function showProductDetail(category, index, cardElement) {
    const product = productsData[category][index];
    const detailTitle = document.getElementById('detailTitle');
    const detailSubtitle = document.getElementById('detailSubtitle');
    const detailDescription = document.getElementById('detailDescription');
    const placeholder = document.getElementById('placeholderText');
    const productDetailContent = document.getElementById('productDetailContent');
    const interestBtn = document.getElementById('interestBtn');

    // Remove selected class from all cards
    document.querySelectorAll('.product-card').forEach(card => {
        card.classList.remove('selected');
    });

    // Add selected class to clicked card
    cardElement.classList.add('selected');
    selectedProductIndex = index;

    // Hide placeholder and show product detail
    placeholder.style.display = 'none';
    productDetailContent.style.display = 'block';

    // Update detail section with SEO-friendly format
    detailTitle.textContent = product.title; // H1
    detailSubtitle.textContent = product.shortDescription; // Subtitle
    detailDescription.innerHTML = product.longDescription || product.shortDescription; // Detailed description (supports HTML)

    // Update interest button link with product title
    const encodedTitle = encodeURIComponent(product.title);
    interestBtn.href = `contact.html?product=${encodedTitle}`;

    // Remove any previous click listeners and add new one
    const newInterestBtn = interestBtn.cloneNode(true);
    interestBtn.parentNode.replaceChild(newInterestBtn, interestBtn);

    newInterestBtn.addEventListener('click', (e) => {
        e.preventDefault();
        window.location.href = `contact.html?product=${encodedTitle}`;
    });

    // Scroll to detail section
    document.getElementById('productDetail').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// Tab switching
document.addEventListener('DOMContentLoaded', () => {
    const tabButtons = document.querySelectorAll('.tab-btn');

    tabButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            tabButtons.forEach(b => {
                b.classList.remove('active');
                b.setAttribute('aria-selected', 'false');
            });
            // Add active class to clicked button
            btn.classList.add('active');
            btn.setAttribute('aria-selected', 'true');

            // Get category and display products
            currentCategory = btn.getAttribute('data-category');
            displayProducts(currentCategory);

            // Reset detail section - show placeholder
            document.getElementById('placeholderText').style.display = 'block';
            document.getElementById('productDetailContent').style.display = 'none';
        });
    });

    // Load products on page load
    loadProductsData();
});
