// Load navbar component
async function loadNavbar() {
    try {
        const response = await fetch('components/navbar.html');
        const html = await response.text();
        const navbarContainer = document.getElementById('navbar-container');
        if (navbarContainer) {
            navbarContainer.innerHTML = html;
        }
    } catch (error) {
        console.error('Error loading navbar:', error);
    }
}

// Load footer component
async function loadFooter() {
    try {
        const response = await fetch('components/footer.html');
        const html = await response.text();
        const footerContainer = document.getElementById('footer-container');
        if (footerContainer) {
            footerContainer.innerHTML = html;
        }
    } catch (error) {
        console.error('Error loading footer:', error);
    }
}

// Load components when DOM is ready
async function loadComponents() {
    await loadNavbar();
    await loadFooter();
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadComponents);
} else {
    loadComponents();
}
