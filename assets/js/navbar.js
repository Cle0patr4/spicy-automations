// Inject a shared component into its container.
// Paths are root-relative: pages live at varying depths, so a relative
// path would 404 from anywhere but the site root.
async function loadComponent(name, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return; // page doesn't use this component

    try {
        const response = await fetch(`/components/${name}.html`);
        // Without this check a 404 page would be injected as the component,
        // rendering the server's error HTML inside the navbar.
        if (!response.ok) {
            throw new Error(`${response.status} fetching ${name}.html`);
        }
        container.innerHTML = await response.text();
    } catch (error) {
        console.error(`Error loading ${name}:`, error);
    }
}

const loadNavbar = () => loadComponent('navbar', 'navbar-container');
const loadFooter = () => loadComponent('footer', 'footer-container');

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
