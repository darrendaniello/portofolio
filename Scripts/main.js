import { initNavigation } from './components/navigation.js';
import { initTerminal } from './components/terminal.js';
import { initProjects } from './components/projects.js';
import { initGitHub } from './components/github.js';
import { initCursor } from './components/cursor.js';
import { initScrollProgress } from './components/scrollProgress.js';

import { initReveal } from './utils/reveal.js';

function initApp() {
  initNavigation();
  initTerminal();
  initProjects();
  initGitHub();
  initCursor();
  initScrollProgress();
  initReveal();
}

document.addEventListener(
  'DOMContentLoaded',
  initApp
);