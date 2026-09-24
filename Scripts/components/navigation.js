export function initNavigation() {
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  if (!navToggle || !navLinks) {
    return;
  }

  navToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('is-open');

    navToggle.setAttribute('aria-expanded', isOpen);
  });

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}