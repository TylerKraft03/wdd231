async function loadDirectory() {
  const container = document.getElementById('directory');
  
  const response = await fetch('./data/members.json');
  const companies = await response.json();
  
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


function setupViewControls() {
  const container = document.getElementById('directory');
  const gridBtn = document.getElementById('grid-view-btn');
  const listBtn = document.getElementById('list-view-btn');

  gridBtn.addEventListener('click', () => {
    container.className = 'grid-layout'; 
    gridBtn.className = 'active-btn';
    listBtn.className = '';
  });

  listBtn.addEventListener('click', () => {
    container.className = 'list-layout'; 
    listBtn.className = 'active-btn';
    gridBtn.className = '';
  });
}

loadDirectory();
setupViewControls();

const today = new Date(); // Define the today variable
const year = document.querySelector("#currentyear");
year.innerHTML = `<span class="highlight">${today.getFullYear()}</span>`;

document.getElementById("lastModified").innerHTML = `Last Modified: ${document.lastModified}`;