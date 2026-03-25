/* ══════════════════════════════════════════
   PORTAFOLIO — Full Stack Developer
   js/main.js
══════════════════════════════════════════ */

'use strict';

/* ──────────────────────────────────────────
   1. SCROLL REVEAL
   Detecta elementos .reveal y los anima
   cuando entran en el viewport
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

  // Animación escalonada para hijos dentro de grids
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
   Marca el link activo según la sección
   visible en pantalla
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
   Maneja el envío del formulario
────────────────────────────────────────── */
function initContactForm() {
  const btn = document.querySelector('.btn-send');
  if (!btn) return;

  btn.addEventListener('click', handleForm);
}

function handleForm() {
  const nombre  = document.querySelector('#contacto input[type="text"]')?.value?.trim();
  const correo  = document.querySelector('#contacto input[type="email"]')?.value?.trim();
  const asunto  = document.querySelector('#contacto input:nth-of-type(3)')?.value?.trim();
  const mensaje = document.querySelector('#contacto textarea')?.value?.trim();

  if (!nombre || !correo || !mensaje) {
    alert('⚠️ Por favor completa los campos requeridos: nombre, correo y mensaje.');
    return;
  }

  // ✏️ EDITA: conecta aquí Formspree, EmailJS u otro servicio
  // Ejemplo con Formspree:
  // fetch('https://formspree.io/f/TU_ID', { method: 'POST', body: formData })

  alert(
    `✅ ¡Mensaje recibido, ${nombre}!\n\nPronto me pondré en contacto contigo.\n\n💜 Gracias por escribir.\n\n(Conecta este formulario a Formspree o EmailJS para activarlo en producción.)`
  );
}

/* ──────────────────────────────────────────
   4. INIT — Punto de entrada
────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  initScrollReveal();
  initActiveNav();
  initContactForm();
});
