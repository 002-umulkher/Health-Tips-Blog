const searchInput = document.getElementById('searchInput');

if (searchInput) {
  searchInput.addEventListener('keyup', (e) => {
    const term = e.target.value.toLowerCase();
    const cards = document.querySelectorAll('.card');

    cards.forEach((card) => {
      const title = card.querySelector('h3').innerText.toLowerCase();
      const category = card.querySelector('.category').innerText.toLowerCase();

      if (title.includes(term) || category.includes(term)) {
        card.style.display = 'block';
        card.style.opacity = '1';
      } else {
        card.style.display = 'none';
        card.style.opacity = '0';
      }
    });
  });
}

const tips = [
  'Drink at least 8 glasses of water today—especially in this Isiolo heat!',
  'Chewing sugar-free gum can help prevent cavities after meals.',
  'Always finish your full dose of antibiotics, even if you feel better.',
  'Walking for 30 minutes a day significantly lowers your blood pressure.',
  'Rinse your mouth with water after drinking sugary sodas.',
];

const tipText = document.getElementById('tip-text');
if (tipText) {
  const randomTip = tips[Math.floor(Math.random() * tips.length)];
  tipText.innerText = randomTip;
}

fetch('posts.json')
  .then((response) => response.json())
  .then((data) => {
    const container = document.getElementById('blog-container');
    if (!container) return;

    data.forEach((post) => {
      const card = `
        <article class="card">
          <div class="card-image" style="background-color: ${post.imageColor};"></div>
          <div class="card-content">
            <span class="category">${post.category}</span>
            <h3>${post.title}</h3>
            <p>${post.summary}</p>
            <a href="post.html?id=${post.id}" class="read-btn">Read More</a>
          </div>
        </article>
      `;
      container.innerHTML += card;
    });
  })
  .catch((err) => {
    console.error('Error loading posts:', err);
  });

  if (searchInput) {
    const noResultsMsg = document.createElement('p');
  noResultsMsg.id = 'no-results';
  noResultsMsg.style.display = 'none';
  noResultsMsg.style.textAlign = 'center';
  noResultsMsg.innerText = "No matching health tips found. Try another search!";
  container.parentNode.insertBefore(noResultsMsg, container.nextSibling);

  searchInput.addEventListener('keyup', (e) => {
    const term = e.target.value.toLowerCase();
    const cards = document.querySelectorAll('.card');
    let foundAny = false;

    cards.forEach((card) => {
      const title = card.querySelector('h3').innerText.toLowerCase();
      const category = card.querySelector('.category').innerText.toLowerCase();

      if (title.includes(term) || category.includes(term)) {
        card.style.display = 'block';
        foundAny = true;
      } else {
        card.style.display = 'none';
      }
    });
    noResultsMsg.style.display = (!foundAny && term !== "") ? 'block' : 'none';
  });
}