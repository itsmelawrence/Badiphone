const menuButton = document.querySelector('.menu-toggle');
const menu = document.querySelector('.main-nav');

function closeMenu() {
  menu.classList.remove('open');
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', 'Ouvrir le menu');
  document.body.classList.remove('menu-open');
}

menuButton.addEventListener('click', () => {
  const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
  menu.classList.toggle('open', !isOpen);
  menuButton.setAttribute('aria-expanded', String(!isOpen));
  menuButton.setAttribute('aria-label', isOpen ? 'Ouvrir le menu' : 'Fermer le menu');
  document.body.classList.toggle('menu-open', !isOpen);
});

menu.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape') closeMenu();
});

const motionOK = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const choices = [...document.querySelectorAll('.choice')];
const feedback = document.querySelector('.demo-feedback');
choices.forEach(choice => {
  choice.addEventListener('click', () => {
    choices.forEach(item => item.classList.remove('active'));
    choice.classList.add('active');
    feedback.textContent = `${choice.dataset.device} sélectionné — le parcours détaillé sera conçu avec les règles de reprise.`;
  });
});

const quoteForm = document.querySelector('#quote-form');
quoteForm.addEventListener('submit', event => {
  event.preventDefault();
  if (!quoteForm.reportValidity()) return;
  const device = document.querySelector('#device').value;
  const model = document.querySelector('#model').value.trim();
  const fault = document.querySelector('#fault').value.trim();
  const summary = `Appareil : ${device}\nMarque et modèle : ${model}\nPanne : ${fault}`;
  document.querySelector('#quote-summary').textContent = summary;
  const result = document.querySelector('#quote-result');
  result.hidden = false;
  result.scrollIntoView({ behavior: motionOK ? 'smooth' : 'instant', block: 'nearest' });
});

document.querySelector('#copy-summary').addEventListener('click', async event => {
  const button = event.currentTarget;
  const summary = document.querySelector('#quote-summary').textContent;
  try {
    await navigator.clipboard.writeText(summary);
    button.textContent = 'Récapitulatif copié';
  } catch {
    button.textContent = 'Sélectionnez le texte ci-dessus pour le copier';
  }
});
