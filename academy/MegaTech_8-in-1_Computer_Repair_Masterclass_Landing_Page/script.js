/* MegaTech Masterclass landing page interactions */
(() => {
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav-links');

  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(isOpen));
      toggle.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
    });

    nav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        nav.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.setAttribute('aria-label', 'Open navigation');
      });
    });

    document.addEventListener('click', event => {
      if (!nav.contains(event.target) && !toggle.contains(event.target)) {
        nav.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.setAttribute('aria-label', 'Open navigation');
      }
    });
  }

  // Prefill WhatsApp with the selected package when a pricing CTA is clicked.
  const registrationLink = document.getElementById('whatsapp-register');
  document.querySelectorAll('[data-package]').forEach(button => {
    button.addEventListener('click', () => {
      const packageName = button.getAttribute('data-package');
      if (!registrationLink || !packageName) return;
      const message = `Hello MegaTech Technologies, I am interested in the 8-in-1 Computer Software Repair & Troubleshooting Masterclass. My preferred package is ${packageName}. Please share registration details.`;
      registrationLink.href = `https://wa.me/2348134319544?text=${encodeURIComponent(message)}`;
    });
  });

  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
})();
