export function initProjects() {
  const buttons = document.querySelectorAll(
    '.project__architecture'
  );

  buttons.forEach(button => {
    button.addEventListener('click', () => {
      const projectId = button.dataset.project;

      const panel = document.querySelector(
        `[data-panel="${projectId}"]`
      );

      if (!panel) return;

      const isHidden = panel.hidden;

      panel.hidden = !isHidden;

      button.textContent = isHidden
        ? 'Hide architecture ↑'
        : 'View architecture →';
    });
  });
}