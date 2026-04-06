'use strict';

/* ──────────────────────────────────────────
   1. SCROLL REVEAL
────────────────────────────────────────── */
function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  reveals.forEach((el) => observer.observe(el));

  const grids = document.querySelectorAll(
    '.projects-grid, .certs-grid, .testimonios-grid, .cv-grid'
  );

  grids.forEach((grid) => {
    const cards = grid.querySelectorAll(
      '.project-card, .cert-card, .testimonio-card, .cv-block'
    );
    cards.forEach((card, i) => {
      card.style.transitionDelay = `${i * 0.1}s`;
      card.classList.add('reveal');
      observer.observe(card);
    });
  });
}

/* ──────────────────────────────────────────
   2. NAV ACTIVO AL SCROLL
────────────────────────────────────────── */
function initActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  const highlightNav = () => {
    let current = '';
    sections.forEach((section) => {
      if (window.scrollY >= section.offsetTop - 120) {
        current = section.id;
      }
    });
    navLinks.forEach((link) => {
      link.style.color =
        link.getAttribute('href') === `#${current}`
          ? 'var(--purple-700)'
          : '';
    });
  };

  window.addEventListener('scroll', highlightNav, { passive: true });
}

/* ──────────────────────────────────────────
   3. FORMULARIO DE CONTACTO
────────────────────────────────────────── */
function initContactForm() {
  const btn = document.querySelector('.btn-send');
  if (!btn) return;
  btn.addEventListener('click', handleForm);
}

function handleForm() {
  const lang    = document.documentElement.lang;
  const nombre  = document.querySelector('#contacto input[type="text"]')?.value?.trim();
  const correo  = document.querySelector('#contacto input[type="email"]')?.value?.trim();
  const mensaje = document.querySelector('#contacto textarea')?.value?.trim();

  if (!nombre || !correo || !mensaje) {
    alert(
      lang === 'en'
        ? '⚠️ Please fill in the required fields: name, email and message.'
        : '⚠️ Por favor completa los campos requeridos: nombre, correo y mensaje.'
    );
    return;
  }

  alert(
    lang === 'en'
      ? `✅ Message received, ${nombre}!\n\nI'll get back to you soon.\n\n💜 Thank you for reaching out.`
      : `✅ ¡Mensaje recibido, ${nombre}!\n\nPronto me pondré en contacto contigo.\n\n💜 Gracias por escribir.`
  );
}

/* ──────────────────────────────────────────
   4. SISTEMA DE TRADUCCIÓN
────────────────────────────────────────── */
function initLangToggle() {
  const btn = document.getElementById('langBtn');
  if (!btn) return;

  let currentLang = localStorage.getItem('portfolioLang') || 'es';
  applyLang(currentLang, false);

  btn.addEventListener('click', () => {
    currentLang = currentLang === 'es' ? 'en' : 'es';
    localStorage.setItem('portfolioLang', currentLang);
    applyLang(currentLang, true);
  });
}

function applyLang(lang, animate) {
  const btn       = document.getElementById('langBtn');
  const flagEl    = btn.querySelector('.lang-flag');
  const labelEl   = btn.querySelector('.lang-label');
  const isEN      = lang === 'en';

  // Actualizar botón
  flagEl.textContent  = isEN ? '🇪🇸' : '🇬🇧';
  labelEl.textContent = isEN ? 'ES' : 'EN';
  btn.setAttribute('aria-label', isEN ? 'Switch to Spanish' : 'Cambiar a Inglés');

  // Atributo lang en <html>
  document.documentElement.lang = lang;

  // Traducir todos los elementos con data-es / data-en
  document.querySelectorAll('[data-es][data-en]').forEach((el) => {
    const text = el.getAttribute(`data-${lang}`);
    if (animate) el.classList.add('lang-fade');
    el.innerHTML = text;
    if (animate) {
      el.addEventListener('animationend', () => el.classList.remove('lang-fade'), { once: true });
    }
  });

  // Traducir placeholders de inputs/textareas
  document.querySelectorAll('[data-es-placeholder][data-en-placeholder]').forEach((el) => {
    el.placeholder = el.getAttribute(`data-${lang}-placeholder`);
  });
}

/* ──────────────────────────────────────────
   5. INIT
────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  initScrollReveal();
  initActiveNav();
  initContactForm();
  initLangToggle();
});