document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);
  const fields = [
    { name: 'firstName', label: 'First Name' },
    { name: 'lastName', label: 'Last Name' },
    { name: 'email', label: 'Email Address' },
    { name: 'phone', label: 'Mobile Number' },
    { name: 'organizationName', label: 'Business Name' },
    { name: 'timestamp', label: 'Submitted On' }
  ];

  const container = document.getElementById('submission-details');
  const title = document.getElementById('submission-title');

  if (!container || !title) return;

  const rows = fields.map((field) => {
    let value = params.get(field.name) || 'Not provided';
    if (field.name === 'timestamp' && value !== 'Not provided') {
      const date = new Date(value);
      if (!Number.isNaN(date.getTime())) {
        value = date.toLocaleString(undefined, {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: 'numeric',
          minute: '2-digit'
        });
      }
    }

    return `
      <div class="summary-row">
        <dt>${field.label}</dt>
        <dd>${escapeHTML(value)}</dd>
      </div>
    `;
  }).join('');

  if (params.has('firstName')) {
    container.innerHTML = rows;
  } else {
    title.textContent = 'No submission data was found.';
    container.innerHTML = '<p>Please return to the <a href="./join.html">membership form</a> to submit your details.</p>';
  }
});

function escapeHTML(value) {
  const div = document.createElement('div');
  div.textContent = value;
  return div.innerHTML;
}
