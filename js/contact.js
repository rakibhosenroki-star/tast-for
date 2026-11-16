/**
 * ALEX MORGAN — FUTURISTIC PORTFOLIO
 * Contact Form Validation & Communication Relay Logic
 */

document.addEventListener('DOMContentLoaded', () => {
  const contactForm = document.getElementById('contact-form');
  const submitBtn = document.getElementById('contact-submit-btn');

  // Copy to clipboard buttons
  document.querySelectorAll('.copy-trigger').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const textToCopy = btn.getAttribute('data-copy');
      const label = btn.getAttribute('data-label') || 'Item';

      if (textToCopy) {
        navigator.clipboard.writeText(textToCopy).then(() => {
          if (window.cyberAudio) window.cyberAudio.play('success');
          if (window.showToast) {
            window.showToast(
              'COPIED TO CLIPBOARD',
              `${label}: "${textToCopy}" copied successfully.`
            );
          }
          // Temporary badge change
          const originalText = btn.innerHTML;
          btn.innerHTML = '<span>✓ Copied!</span>';
          setTimeout(() => {
            btn.innerHTML = originalText;
          }, 2000);
        });
      }
    });
  });

  if (!contactForm) return;

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const nameInput = document.getElementById('contact-name');
    const emailInput = document.getElementById('contact-email');
    const subjectInput = document.getElementById('contact-subject');
    const messageInput = document.getElementById('contact-message');

    let isValid = true;

    // Validate Name
    if (!nameInput.value.trim() || nameInput.value.trim().length < 2) {
      setError(nameInput, 'Please input your full name or callsign.');
      isValid = false;
    } else {
      clearError(nameInput);
    }

    // Validate Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailInput.value.trim())) {
      setError(emailInput, 'Valid communication transmission email required.');
      isValid = false;
    } else {
      clearError(emailInput);
    }

    // Validate Subject
    if (!subjectInput.value.trim()) {
      setError(subjectInput, 'Please specify the transmission subject.');
      isValid = false;
    } else {
      clearError(subjectInput);
    }

    // Validate Message
    if (!messageInput.value.trim() || messageInput.value.trim().length < 10) {
      setError(messageInput, 'Transmission payload must be at least 10 characters.');
      isValid = false;
    } else {
      clearError(messageInput);
    }

    if (!isValid) {
      if (window.cyberAudio) window.cyberAudio.play('hover');
      return;
    }

    // Simulate High-Tech Transmission
    if (window.cyberAudio) window.cyberAudio.play('transmit');

    const originalBtnHtml = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = `
      <span style="display: inline-flex; align-items: center; gap: 8px;">
        <span class="status-dot"></span> ENCRYPTING & TRANSMITTING...
      </span>
    `;

    setTimeout(() => {
      submitBtn.innerHTML = `
        <span style="color: #10B981; display: inline-flex; align-items: center; gap: 8px;">
          ✓ TRANSMISSION ACKNOWLEDGED (200 OK)
        </span>
      `;

      if (window.cyberAudio) window.cyberAudio.play('success');

      if (window.showToast) {
        window.showToast(
          'SIGNAL RECEIVED',
          `Thank you, ${nameInput.value.trim()}. Your message has been encrypted and routed directly to Alex Morgan. Response within 24h.`
        );
      }

      contactForm.reset();

      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnHtml;
      }, 4000);
    }, 1400);
  });

  function setError(inputEl, message) {
    const parent = inputEl.closest('.form-group');
    if (parent) {
      parent.classList.add('has-error');
      const feedback = parent.querySelector('.form-feedback');
      if (feedback) feedback.textContent = message;
    }
  }

  function clearError(inputEl) {
    const parent = inputEl.closest('.form-group');
    if (parent) {
      parent.classList.remove('has-error');
    }
  }
});
