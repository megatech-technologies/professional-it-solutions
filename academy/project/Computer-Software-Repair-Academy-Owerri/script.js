const WHATSAPP_NUMBER = '2348134319544';
const COURSE_NAME = 'Computer Software Repair Academy Owerri';
const HEADER_SCROLL_THRESHOLD = 10;

const NAME_PATTERN = /^[\p{L}][\p{L}.'-]*(\s+[\p{L}][\p{L}.'-]*)+$/u;
const PHONE_CLEAN_PATTERN = /[\s\-().]/g;
const PHONE_PATTERN = /^\+?\d{10,14}$/;

function initHeader() {
  const header = document.getElementById('site-header');
  const toggle = document.getElementById('nav-toggle');
  const nav = document.getElementById('site-nav');

  const updateHeaderState = () => {
    header.classList.toggle('is-scrolled', window.scrollY > HEADER_SCROLL_THRESHOLD);
  };

  const setMenuOpen = (isOpen) => {
    nav.classList.toggle('is-open', isOpen);
    toggle.setAttribute('aria-expanded', String(isOpen));
    toggle.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
  };

  toggle.addEventListener('click', () => {
    setMenuOpen(toggle.getAttribute('aria-expanded') !== 'true');
  });

  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => setMenuOpen(false));
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') setMenuOpen(false);
  });

  window.addEventListener('scroll', updateHeaderState, { passive: true });
  updateHeaderState();
}

function initPackageSelection(onSelect) {
  const packageButtons = document.querySelectorAll('[data-package-name]');

  packageButtons.forEach((button) => {
    button.addEventListener('click', () => {
      onSelect({
        name: button.dataset.packageName,
        price: button.dataset.packagePrice,
      });
      document.getElementById('contact').scrollIntoView({ behavior: 'smooth', block: 'start' });
      document.getElementById('full-name').focus({ preventScroll: true });
    });
  });
}

function renderSelectedPackage(selectedPackage) {
  const container = document.getElementById('selected-package');
  const valueElement = document.getElementById('selected-package-value');

  if (!selectedPackage) {
    container.classList.remove('is-selected');
    valueElement.textContent = 'No package selected yet. Choose Standard or Premium above.';
    return;
  }

  container.classList.add('is-selected');
  valueElement.textContent = `${selectedPackage.name} – ${selectedPackage.price}`;
}

function setFieldError(inputId, errorId, message) {
  const input = document.getElementById(inputId);
  const errorElement = document.getElementById(errorId);

  input.setAttribute('aria-invalid', message ? 'true' : 'false');
  errorElement.textContent = message;
  errorElement.hidden = !message;
}

function validateFullName(value) {
  if (!value) return 'Please enter your full name.';
  if (!NAME_PATTERN.test(value)) return 'Please enter your first and last name using letters only.';
  return '';
}

function validatePhoneNumber(value) {
  if (!value) return 'Please enter your phone number.';
  if (!PHONE_PATTERN.test(value.replace(PHONE_CLEAN_PATTERN, ''))) {
    return 'Please enter a valid phone number, for example 08012345678.';
  }
  return '';
}

function buildWhatsAppMessage(selectedPackage, fullName, phoneNumber) {
  return [
    'Hello MegaTech Technologies Academy,',
    '',
    `I am interested in registering for the ${COURSE_NAME}.`,
    '',
    `Selected Package: ${selectedPackage.name}`,
    `Package Price: ${selectedPackage.price}`,
    '',
    `Full Name: ${fullName}`,
    `Phone Number: ${phoneNumber}`,
    '',
    'Please provide further registration information.',
    '',
    'Thank you.',
  ].join('\n');
}

function initRegistrationForm() {
  let selectedPackage = null;
  const form = document.getElementById('registration-form');
  const formError = document.getElementById('form-error');

  initPackageSelection((packageChoice) => {
    selectedPackage = packageChoice;
    renderSelectedPackage(selectedPackage);
    formError.hidden = true;
  });

  renderSelectedPackage(selectedPackage);

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const fullName = form.fullName.value.trim();
    const phoneNumber = form.phoneNumber.value.trim();

    const nameError = validateFullName(fullName);
    const phoneError = validatePhoneNumber(phoneNumber);
    setFieldError('full-name', 'full-name-error', nameError);
    setFieldError('phone-number', 'phone-number-error', phoneError);

    if (!selectedPackage) {
      formError.textContent = 'Please choose the Standard or Premium package above before submitting.';
      formError.hidden = false;
      return;
    }

    if (nameError || phoneError) {
      formError.textContent = 'Please correct the highlighted fields.';
      formError.hidden = false;
      return;
    }

    formError.hidden = true;

    const message = buildWhatsAppMessage(selectedPackage, fullName, phoneNumber);
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank', 'noopener');
  });
}

initHeader();
initRegistrationForm();
