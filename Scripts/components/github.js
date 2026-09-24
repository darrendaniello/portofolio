const GITHUB_USERNAME = 'darrendaniello';

const GITHUB_USER_API =
  `https://api.github.com/users/${GITHUB_USERNAME}`;

const GITHUB_CONTRIBUTION_API =
  `https://github-contributions-api.jogruber.de/v4/${GITHUB_USERNAME}?y=last`;


export async function initGitHub() {
  await Promise.all([
    loadGitHubStats(),
    loadGitHubContributions(),
  ]);
}


/* =========================
   GitHub Stats
========================= */

async function loadGitHubStats() {
  const stats = document.getElementById('githubStats');

  if (!stats) return;

  try {
    const response = await fetch(GITHUB_USER_API);

    if (!response.ok) {
      throw new Error(
        `GitHub API error: ${response.status}`
      );
    }

    const data = await response.json();

    const values = stats.querySelectorAll(
      '.github__stat-value'
    );

    values[0].textContent = data.public_repos;
    values[1].textContent = data.followers;
    values[2].textContent = data.following;

  } catch (error) {
    console.error(
      'GitHub stats error:',
      error
    );
  }
}


/* =========================
   GitHub Contributions
========================= */

async function loadGitHubContributions() {
  const container =
    document.getElementById('githubContributions');

  const total =
    document.getElementById(
      'githubContributionTotal'
    );

  if (!container) return;

  try {
    const response = await fetch(
      GITHUB_CONTRIBUTION_API
    );

    if (!response.ok) {
      throw new Error(
        `Contribution API error: ${response.status}`
      );
    }

    const data = await response.json();

    renderContributions(
      container,
      data.contributions
    );

    if (total && data.total) {
      const years = Object.values(data.total);

      const totalContributions =
        years.reduce(
          (sum, value) => sum + value,
          0
        );

      total.textContent =
        `${totalContributions} contributions`;
    }

  } catch (error) {
    console.error(
      'GitHub contribution error:',
      error
    );

    container.innerHTML = `
      <p class="github__error">
        Contribution activity unavailable.
      </p>
    `;
  }
}


/* =========================
   Render Contribution Grid
========================= */

function renderContributions(
  container,
  contributions
) {
  container.innerHTML = '';

  if (!contributions?.length) {
    container.innerHTML = `
      <p class="github__error">
        No contribution data available.
      </p>
    `;

    return;
  }

  contributions.forEach(day => {
    const cell =
      document.createElement('div');

    cell.className =
      'github__contribution-cell';

    cell.dataset.level =
      getContributionLevel(day.count);

    cell.title =
      `${day.count} contributions on ${day.date}`;

    container.appendChild(cell);
  });
}


/* =========================
   Contribution Level
========================= */

function getContributionLevel(count) {
  if (count === 0) return '0';
  if (count <= 2) return '1';
  if (count <= 5) return '2';
  if (count <= 9) return '3';

  return '4';
}