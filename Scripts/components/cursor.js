export function initCursor() {
  const cursor = document.querySelector('.custom-cursor');

  if (!cursor) return;

  const isTouchDevice =
    window.matchMedia('(pointer: coarse)').matches;

  const reduceMotion =
    window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

  if (isTouchDevice || reduceMotion) {
    cursor.remove();
    return;
  }

  window.addEventListener('mousemove', event => {
    cursor.style.transform = `
      translate3d(
        ${event.clientX}px,
        ${event.clientY}px,
        0
      )
    `;
  });

  const interactiveElements =
    document.querySelectorAll(
      'a, button, input, .project--interactive'
    );

  interactiveElements.forEach(element => {
    element.addEventListener('mouseenter', () => {
      cursor.classList.add('is-active');
    });

    element.addEventListener('mouseleave', () => {
      cursor.classList.remove('is-active');
    });
  });
}