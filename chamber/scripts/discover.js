import { discoverItems } from '../data/discover-items.mjs';

const storageKey = 'discover-last-visit';

function renderVisitMessage() {
  const messageBox = document.getElementById('visit-message');
  if (!messageBox) return;

  const previousVisit = Number(localStorage.getItem(storageKey));
  const now = Date.now();

  if (!previousVisit) {
    messageBox.textContent = 'Welcome! Let us know if you have any questions.';
  } else {
    const daysSinceVisit = Math.floor((now - previousVisit) / (1000 * 60 * 60 * 24));
    if (daysSinceVisit < 1) {
      messageBox.textContent = 'Back so soon! Awesome!';
    } else if (daysSinceVisit === 1) {
      messageBox.textContent = 'You last visited 1 day ago.';
    } else {
      messageBox.textContent = `You last visited ${daysSinceVisit} days ago.`;
    }
  }

  localStorage.setItem(storageKey, now.toString());
}

function renderDiscoverCards() {
  const grid = document.getElementById('discover-grid');
  if (!grid) return;

  grid.innerHTML = discoverItems.map((item, index) => `
    <article class="discover-card card-${index + 1}">
      <h2>${item.name}</h2>
      <figure>
        <img src="./images/${item.image}" alt="${item.name}" loading="lazy">
      </figure>
      <address>${item.address}</address>
      <p>${item.description}</p>
      <button type="button" class="learn-more">Learn more</button>
    </article>
  `).join('');
}

document.addEventListener('DOMContentLoaded', () => {
  renderDiscoverCards();
  renderVisitMessage();
});
