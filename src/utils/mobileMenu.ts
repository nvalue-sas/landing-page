/**
 * Mobile menu utilities
 * Handles mobile menu toggle and UI state management
 */

interface MenuElements {
  menu: HTMLElement | null;
  hamburgerIcon: HTMLElement | null;
  closeIcon: HTMLElement | null;
  navbarContainer: HTMLElement | null;
}

/**
 * Gets all required menu elements from the DOM
 */
function getMenuElements(): MenuElements {
  return {
    menu: document.getElementById("mobile-menu"),
    hamburgerIcon: document.getElementById("hamburger-icon"),
    closeIcon: document.getElementById("close-icon"),
    navbarContainer: document.getElementById("navbar-container"),
  };
}

/**
 * Checks if the mobile menu is currently hidden
 */
function isMenuHidden(menu: HTMLElement | null): boolean {
  return menu?.classList.contains("hidden") ?? true;
}

/**
 * Updates the navbar container styling when menu opens/closes
 */
function updateNavbarStyling(
  container: HTMLElement | null,
  isOpen: boolean
): void {
  if (!container) return;

  if (isOpen) {
    container.classList.remove("rounded-3xl");
    container.classList.add("rounded-t-3xl", "border-b-0");
  } else {
    container.classList.remove("rounded-t-3xl", "border-b-0");
    container.classList.add("rounded-3xl");
  }
}

/**
 * Toggles the visibility of menu icons (hamburger/close)
 */
function toggleIcons(
  hamburgerIcon: HTMLElement | null,
  closeIcon: HTMLElement | null
): void {
  hamburgerIcon?.classList.toggle("hidden");
  closeIcon?.classList.toggle("hidden");
}

/**
 * Opens the mobile menu
 */
export function openMobileMenu(): void {
  const elements = getMenuElements();

  elements.menu?.classList.remove("hidden");
  elements.hamburgerIcon?.classList.add("hidden");
  elements.closeIcon?.classList.remove("hidden");
  updateNavbarStyling(elements.navbarContainer, true);
}

/**
 * Closes the mobile menu
 */
export function closeMobileMenu(): void {
  const elements = getMenuElements();

  elements.menu?.classList.add("hidden");
  elements.hamburgerIcon?.classList.remove("hidden");
  elements.closeIcon?.classList.add("hidden");
  updateNavbarStyling(elements.navbarContainer, false);
}

/**
 * Toggles the mobile menu open/closed
 */
export function toggleMobileMenu(): void {
  const elements = getMenuElements();
  const isHidden = isMenuHidden(elements.menu);

  if (isHidden) {
    openMobileMenu();
  } else {
    closeMobileMenu();
  }
}

/**
 * Initializes mobile menu event listeners
 */
export function initMobileMenu(): void {
  // Toggle button listener
  const toggleButton = document.getElementById("mobile-menu-toggle");
  toggleButton?.addEventListener("click", toggleMobileMenu);

  // Close menu when clicking on a link
  const menuLinks = document.querySelectorAll(".mobile-menu-link");
  menuLinks.forEach((link) => {
    if (link.tagName === "A") {
      link.addEventListener("click", closeMobileMenu);
    }
  });
}