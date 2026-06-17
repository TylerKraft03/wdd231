import { getStoredObject, setStoredObject } from './utils.js';

const catalog = document.getElementById('catalog');
const modal = document.getElementById('flavor-modal');
const modalContent = document.getElementById('modal-content');
const filterButtons = document.querySelectorAll('.filter-btn');

let popcornData = [];
let selectedFilter = 'all';

async function loadFlavors() {
  try {
    const response = await fetch('./data/popcorn.json');
    if (!response.ok) {
      throw new Error(`Failed to fetch flavors: ${response.status}`);
    }
    popcornData = await response.json();
    renderFlavors();
    saveCatalogToStorage();
  } catch (error) {
    console.error(error);
    catalog.innerHTML = '<p class="error-message">Unable to load popcorn flavors right now. Please try again later.</p>';
  }
}

function saveCatalogToStorage() {
  setStoredObject('popcornCatalog', popcornData);
}

function renderFlavors() {
  const filtered = selectedFilter === 'all'
    ? popcornData
    : popcornData.filter((item) => item.category === selectedFilter);

  catalog.innerHTML = filtered.map((item) => `
    <article class="catalog-card">
      <div class="card-top">
        <span class="card-badge">${item.emoji}</span>
        <span class="rating-pill">${item.rating}</span>
      </div>
      <h3>${item.name}</h3>
      <p>${item.description}</p>
      <p class="meta-pill">${item.category} · ${item.price}</p>
      <div class="card-actions">
        <button class="button primary details-btn" data-id="${item.id}">Details</button>
      </div>
    </article>
  `).join('');

  document.querySelectorAll('.details-btn').forEach((button) => {
    button.addEventListener('click', (event) => {
      const id = Number(event.currentTarget.dataset.id);
      openModal(id);
    });
  });

}

function openModal(id) {
  const item = popcornData.find((entry) => entry.id === id);
  if (!item) return;

  modalContent.innerHTML = `
    <h2>${item.name}</h2>
    <p><strong>Category:</strong> ${item.category}</p>
    <p><strong>Price:</strong> ${item.price}</p>
    <p><strong>Best for:</strong> ${item.bestFor}</p>
    <p><strong>Ingredients:</strong> ${item.ingredients.join(', ')}</p>
    <p>${item.description}</p>
  `;
  modal.showModal();
}

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    selectedFilter = button.dataset.filter;
    filterButtons.forEach((btn) => btn.classList.remove('active'));
    button.classList.add('active');
    renderFlavors();
  });
});

loadFlavors();
