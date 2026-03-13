// Scroll reveal
const revealEls = document.querySelectorAll('.reveal,.reveal-left,.reveal-right,.pop');
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.12 });
revealEls.forEach(el => observer.observe(el));

// Active nav link
const sections = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.nav-links a');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(s => { if (window.scrollY >= s.offsetTop - 140) current = s.id; });
  navLinks.forEach(a => {
    a.classList.remove('active');
    if (a.getAttribute('href') === `#${current}`) a.classList.add('active');
  });
});

// Hamburger menu
const hamburger = document.getElementById('hamburger');
const navMenu   = document.querySelector('.nav-links');
if (hamburger) {
  hamburger.addEventListener('click', () => navMenu.classList.toggle('open'));
  navMenu.querySelectorAll('a').forEach(l => l.addEventListener('click', () => navMenu.classList.remove('open')));
}

// Contact form → mailto
document.getElementById('contactForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const name  = document.getElementById('senderName').value.trim();
  const email = document.getElementById('senderEmail').value.trim();
  const msg   = document.getElementById('senderMsg').value.trim();
  const msgEl = document.getElementById('formMsg');
  if (!name || !email || !msg) {
    msgEl.textContent = '⚠️ Please fill in all fields.';
    msgEl.className = 'form-msg error'; return;
  }
  const subject = encodeURIComponent(`Portfolio Message from ${name}`);
  const body    = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${msg}`);
  window.location.href = `mailto:nikithas1009@gmail.com?subject=${subject}&body=${body}`;
  msgEl.textContent = '✅ Your email client has opened — just hit Send!';
  msgEl.className = 'form-msg success';
  setTimeout(() => { this.reset(); msgEl.textContent = ''; }, 6000);
});