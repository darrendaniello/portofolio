export function initScrollProgress() {
  const progress =
    document.getElementById('scrollProgress');

  if (!progress) return;

  function updateProgress() {
    const scrollTop = window.scrollY;

    const documentHeight =
      document.documentElement.scrollHeight -
      window.innerHeight;

    const percentage =
      documentHeight > 0
        ? (scrollTop / documentHeight) * 100
        : 0;

    progress.style.width = `${percentage}%`;
  }

  window.addEventListener(
    'scroll',
    updateProgress,
    { passive: true }
  );

  updateProgress();
}