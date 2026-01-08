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

            // Make entire card clickable
            productCard.addEventListener('click', () => {
                showProductDetail(category, index, productCard);
            });

            productsGrid.appendChild(productCard);
        });
    }
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
