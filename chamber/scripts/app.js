// 1. Fetch the data and display it on the page
async function loadDirectory() {
  const container = document.getElementById('directory');
  
  // Directly fetch the JSON file
  const response = await fetch('./data/members.json');
  const companies = await response.json();
  
  // Loop through companies and create the HTML cards
  container.innerHTML = companies.map(company => {
    return `
      <div class="card">
        <img src="images/${company.image}" alt="${company.companyName} Logo">
        
        <div class="card-body">
          <h2>${company.companyName}</h2>
          <span class="badge">Tier ${company.membershipLevel}</span>
          
          <div class="contact-info">
            <p><strong>Address:</strong> ${company.address.street}, ${company.address.city}, ${company.address.state} ${company.address.zip}</p>
            <p><strong>Phone:</strong> ${company.phone}</p>
          </div>
        </div>
        
        <a href="${company.website}" target="_blank" class="website-link">
          Visit Website
        </a>
      </div>
    `;
  }).join('');
}

// 2. Simple layout toggle logic
function setupViewControls() {
  const container = document.getElementById('directory');
  const gridBtn = document.getElementById('grid-view-btn');
  const listBtn = document.getElementById('list-view-btn');

  gridBtn.addEventListener('click', () => {
    container.className = 'grid-layout'; // Directly swap classes
    gridBtn.className = 'active-btn';
    listBtn.className = '';
  });

  listBtn.addEventListener('click', () => {
    container.className = 'list-layout'; // Directly swap classes
    listBtn.className = 'active-btn';
    gridBtn.className = '';
  });
}

// Run functions when page loads
loadDirectory();
setupViewControls();