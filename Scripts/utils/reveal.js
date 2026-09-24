export function initReveal() {
  const elements = document.querySelectorAll(
    '.section-head, .about__grid, .project, .skill-group, .timeline li, .now__item, .github__panel, .contact__inner'
  );

  if (!elements.length) return;

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;

        entry.target.classList.add('is-visible');

        observer.unobserve(entry.target);
      });
    },
    {
      threshold: 0.12,
    }
  );

  elements.forEach(element => {
    element.classList.add('reveal');

    observer.observe(element);
  });
}