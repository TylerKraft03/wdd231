import { getStoredObject, setStoredObject } from './utils.js';

const recipeForm = document.getElementById('recipe-form');
const firstName = document.getElementById('first-name');
const lastName = document.getElementById('last-name');
const email = document.getElementById('email');
const favoriteFlavor = document.getElementById('favorite-flavor');
const recipeSummary = document.getElementById('recipe-summary');
const recipeCards = document.getElementById('recipe-cards');
const recipeModal = document.getElementById('recipe-modal');
const recipeModalContent = document.getElementById('recipe-modal-content');

const recipes = [
  {
    name: 'Buttery Classic',
    time: '10 min',
    difficulty: 'Easy',
    ingredients: ['3 cups popped popcorn', '2 tbsp melted butter', '1/2 tsp salt'],
    steps: ['Melt butter and drizzle over popcorn.', 'Toss gently and season to taste.']
  },
  {
    name: 'Sweet Cinnamon Twist',
    time: '7 min',
    difficulty: 'Easy',
    ingredients: ['3 cups popcorn', '1 tbsp sugar', '1/2 tsp cinnamon', '1 tsp oil'],
    steps: ['Mix sugar and cinnamon in a bowl.', 'Warm oil, toss with popcorn, and coat evenly.']
  },
  {
    name: 'Cheesy Snack Mix',
    time: '12 min',
    difficulty: 'Medium',
    ingredients: ['4 cups popcorn', '1/4 cup parmesan', '1/2 tsp garlic powder'],
    steps: ['Combine seasonings in a bowl.', 'Add popcorn and toss until fully coated.']
  },
  {
    name: 'Spicy Lime Crunch',
    time: '8 min',
    difficulty: 'Easy',
    ingredients: ['3 cups popcorn', '1 tbsp lime juice', '1/2 tsp chili powder'],
    steps: ['Spritz lime over warm popcorn.', 'Dust with chili powder and toss well.']
  },
  {
    name: 'Caramel Drizzle Bowl',
    time: '15 min',
    difficulty: 'Medium',
    ingredients: ['4 cups popcorn', '2 tbsp caramel sauce', '1 tbsp sea salt'],
    steps: ['Warm caramel until pourable.', 'Drizzle carefully and sprinkle with sea salt.']
  }
];

function renderRecipes() {
  recipeCards.innerHTML = recipes.map((recipe) => `
    <article class="recipe-card">
      <div class="recipe-top">
        <h3>${recipe.name}</h3>
        <span class="meta-pill">${recipe.difficulty}</span>
      </div>
      <p>${recipe.time}</p>
      <p>${recipe.ingredients.slice(0, 2).join(' • ')}</p>
      <button class="button secondary recipe-btn" data-name="${recipe.name}">View recipe</button>
    </article>
  `).join('');

  document.querySelectorAll('.recipe-btn').forEach((button) => {
    button.addEventListener('click', () => {
      openRecipeModal(button.dataset.name);
    });
  });
}

function openRecipeModal(name) {
  const recipe = recipes.find((item) => item.name === name);
  if (!recipe) return;

  recipeModalContent.innerHTML = `
    <h2>${recipe.name}</h2>
    <p><strong>Time:</strong> ${recipe.time}</p>
    <p><strong>Difficulty:</strong> ${recipe.difficulty}</p>
    <ul>${recipe.ingredients.map((ingredient) => `<li>${ingredient}</li>`).join('')}</ul>
    <ol>${recipe.steps.map((step) => `<li>${step}</li>`).join('')}</ol>
  `;
  recipeModal.showModal();
}

function savePreference(event) {
  const preference = {
    firstName: firstName.value,
    lastName: lastName.value,
    email: email.value,
    favoriteFlavor: favoriteFlavor.value
  };
  setStoredObject('recipePreference', preference);
  updateSummary();
}

function updateSummary() {
  const preference = getStoredObject('recipePreference', {
    firstName: '',
    lastName: '',
    email: '',
    favoriteFlavor: 'Caramel Sea Salt'
  });

  firstName.value = preference.firstName || '';
  lastName.value = preference.lastName || '';
  email.value = preference.email || '';
  favoriteFlavor.value = preference.favoriteFlavor || 'Caramel Sea Salt';

  recipeSummary.innerHTML = `
    <h3>Your favorite pick</h3>
    <p>${preference.favoriteFlavor} is your current crowd-pleaser.</p>
  `;
}

recipeForm.addEventListener('submit', savePreference);
recipeModal.addEventListener('click', (event) => {
  if (event.target === recipeModal) {
    recipeModal.close();
  }
});

updateSummary();
renderRecipes();
