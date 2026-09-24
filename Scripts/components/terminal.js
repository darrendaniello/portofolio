import { terminalScript } from '../data/terminalData.js';
import { delay } from '../utils/delay.js';

const commands = {
  help: [
    'Available commands:',
    '  about',
    '  projects',
    '  skills',
    '  contact',
    '  clear',
  ],

  about: [
    'Darren Daniello',
    'Computer Science student @ BINUS University',
    'Focus: backend architecture, full-stack development, AI integration',
  ],

  projects: [
    'FoodSaver',
    'GlucoSense',
    'Honkai Star Retail',
    'SupplyHub',
  ],

  skills: [
    'TypeScript · Python · Java · C++ · Dart',
    'Next.js · NestJS · Django · FastAPI · Flutter',
    'PostgreSQL · MySQL · Supabase · Neon',
  ],

  contact: [
    'Email: darrendaniello62@gmail.com',
    'LinkedIn: linkedin.com/in/darren-daniello',
  ],
};

function getLineClass(type) {
  if (type === 'cmd') return 'line-cmd';
  if (type === 'accent') return 'line-accent';

  return 'line-out';
}

function getPrefix(type) {
  return type === 'cmd' ? '$ ' : '';
}

async function typeLine(element, text, speed) {
  for (let i = 0; i <= text.length; i++) {
    element.textContent = text.slice(0, i);
    await delay(speed);
  }
}

function addTerminalLine(body, text, className = 'line-out') {
  const row = document.createElement('div');

  row.className = className;
  row.textContent = text;

  body.appendChild(row);

  return row;
}

function addCaret(body) {
  const row = document.createElement('div');

  row.innerHTML = `
    <span class="line-cmd">$ </span>
    <span class="caret"></span>
  `;

  body.appendChild(row);
}

function scrollTerminal(body) {
  body.scrollTop = body.scrollHeight;
}

async function bootTerminal(body) {
  const reduceMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches;

  body.innerHTML = '';

  for (const line of terminalScript) {
    const row = document.createElement('div');

    row.className = getLineClass(line.type);

    body.appendChild(row);

    const text = getPrefix(line.type) + line.text;

    if (reduceMotion) {
      row.textContent = text;
    } else {
      await typeLine(
        row,
        text,
        line.type === 'cmd' ? 32 : 10
      );

      await delay(
        line.type === 'cmd' ? 180 : 260
      );
    }
  }

  addCaret(body);
}

function createInput(body) {
  const wrapper = document.createElement('div');

  wrapper.className = 'terminal__input-row';

  wrapper.innerHTML = `
    <span class="line-cmd">$ </span>
    <input
      class="terminal__input"
      type="text"
      autocomplete="off"
      spellcheck="false"
      aria-label="Terminal command"
    >
  `;

  body.appendChild(wrapper);

  const input = wrapper.querySelector('input');

  input.focus();

  input.addEventListener('keydown', event => {
    if (event.key !== 'Enter') {
      return;
    }

    const command = input.value.trim().toLowerCase();

    input.value = '';

    addTerminalLine(
      body,
      `$ ${command}`,
      'line-cmd'
    );

    if (!command) {
      scrollTerminal(body);
      return;
    }

    if (command === 'clear') {
      body.innerHTML = '';
      createInput(body);
      return;
    }

    if (commands[command]) {
      commands[command].forEach(line => {
        addTerminalLine(body, line);
      });
    } else {
      addTerminalLine(
        body,
        `command not found: ${command}`
      );
    }

    addTerminalLine(
      body,
      'Type "help" to see available commands.'
    );

    createInput(body);

    scrollTerminal(body);
  });

  return input;
}

export function initTerminal() {
  const body = document.getElementById('terminalBody');

  if (!body) return;

  setTimeout(async () => {
    await bootTerminal(body);
    createInput(body);
  }, 400);
}