/* ==========================================================================
   DESIGN MVN STUDIO - Main JavaScript
   Global Interactivity, Header, Forms, Accordions & Lightbox
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Loader Screen Fade Out
  const loaderScreen = document.getElementById('loaderScreen');
  if (loaderScreen) {
    setTimeout(() => {
      loaderScreen.classList.add('hidden');
    }, 600);
  }

  // 2. Sticky Header Scroll Effect
  const header = document.querySelector('.header');
  if (header) {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check
  }

  // 3. Mobile Navigation Menu Toggle
  const mobileToggle = document.getElementById('mobileToggle');
  const mobileClose = document.getElementById('mobileClose');
  const mobileNavOverlay = document.getElementById('mobileNavOverlay');

  if (mobileToggle && mobileNavOverlay) {
    mobileToggle.addEventListener('click', () => {
      mobileNavOverlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  }

  if (mobileClose && mobileNavOverlay) {
    mobileClose.addEventListener('click', () => {
      mobileNavOverlay.classList.remove('active');
      document.body.style.overflow = '';
    });
  }

  // Close mobile nav when clicking a link
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-item a');
  mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (mobileNavOverlay) {
        mobileNavOverlay.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  });

  // 4. Highlight Active Navigation Link
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const allNavLinks = document.querySelectorAll('.nav-link, .mobile-nav-item a, .nav-dropdown-item a');
  allNavLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  // 5. Accordion Interactivity
  const accordionItems = document.querySelectorAll('.accordion-item');
  accordionItems.forEach(item => {
    const headerBtn = item.querySelector('.accordion-header');
    if (headerBtn) {
      headerBtn.addEventListener('click', () => {
        const isOpen = item.classList.contains('active');
        
        // Close other items in same accordion if desired
        const parent = item.closest('.accordion');
        if (parent) {
          parent.querySelectorAll('.accordion-item').forEach(other => {
            if (other !== item) {
              other.classList.remove('active');
              const content = other.querySelector('.accordion-content');
              if (content) content.style.maxHeight = null;
            }
          });
        }

        const content = item.querySelector('.accordion-content');
        if (isOpen) {
          item.classList.remove('active');
          if (content) content.style.maxHeight = null;
        } else {
          item.classList.add('active');
          if (content) content.style.maxHeight = content.scrollHeight + 'px';
        }
      });
    }
  });

  // 6. Project Category Filtering Logic
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('[data-category]');

  if (filterBtns.length > 0 && projectCards.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filterValue = btn.getAttribute('data-filter');

        projectCards.forEach(card => {
          const cardCategories = card.getAttribute('data-category').split(' ');
          if (filterValue === 'all' || cardCategories.includes(filterValue)) {
            card.style.display = 'block';
            setTimeout(() => {
              card.style.opacity = '1';
              card.style.transform = 'scale(1)';
            }, 50);
          } else {
            card.style.opacity = '0';
            card.style.transform = 'scale(0.95)';
            setTimeout(() => {
              card.style.display = 'none';
            }, 300);
          }
        });
      });
    });
  }

  // 7. Lightbox Modal for Gallery Images
  const galleryItems = document.querySelectorAll('[data-lightbox]');
  const lightboxModal = document.getElementById('lightboxModal');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxClose = document.getElementById('lightboxClose');

  if (galleryItems.length > 0 && lightboxModal && lightboxImg) {
    galleryItems.forEach(item => {
      item.addEventListener('click', (e) => {
        e.preventDefault();
        const src = item.getAttribute('href') || item.getAttribute('src');
        if (src) {
          lightboxImg.src = src;
          lightboxModal.classList.add('active');
          document.body.style.overflow = 'hidden';
        }
      });
    });

    const closeLightbox = () => {
      lightboxModal.classList.remove('active');
      document.body.style.overflow = '';
    };

    if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
    lightboxModal.addEventListener('click', (e) => {
      if (e.target === lightboxModal) closeLightbox();
    });
  }

  // 8. Back to Top Button
  const backToTopBtn = document.getElementById('backToTop');
  if (backToTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 500) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    }, { passive: true });

    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // 9. Interactive Forms Handling (Consultation & Contact)
  const forms = document.querySelectorAll('form[data-handle-submit]');
  forms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const submitBtn = form.querySelector('button[type="submit"]');
      const originalText = submitBtn ? submitBtn.innerHTML : 'Submit';
      
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = 'Sending Request...';
      }

      setTimeout(() => {
        // Show confirmation modal or alert box
        showNotificationModal('Thank you! Your request has been received. Our senior architect will contact you within 24 business hours.');
        form.reset();
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalText;
        }
      }, 1000);
    });
  });

  // 10. Newsletter Form Handling
  const newsletterForms = document.querySelectorAll('.newsletter-form');
  newsletterForms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = form.querySelector('input[type="email"]');
      if (input && input.value) {
        showNotificationModal('Thank you for subscribing to Design MVN Studio Journal!');
        input.value = '';
      }
    });
  });

  // Global Notification Modal helper
  function showNotificationModal(message) {
    let modal = document.getElementById('notificationModal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'notificationModal';
      modal.className = 'lightbox-modal';
      modal.innerHTML = `
        <div style="background:#fff; color:#0f0e0d; padding:2.5rem 3rem; border-radius:8px; max-width:500px; text-align:center; border:1px solid #c5a059; position:relative;">
          <h3 style="font-family:var(--font-heading); font-size:2rem; margin-bottom:1rem; color:#0f0e0d;">Design MVN STUDIO</h3>
          <p style="color:#555; line-height:1.6; margin-bottom:1.5rem;">${message}</p>
          <button id="closeNotifBtn" class="btn btn-primary" style="width:100%;">Close Window</button>
        </div>
      `;
      document.body.appendChild(modal);

      modal.querySelector('#closeNotifBtn').addEventListener('click', () => {
        modal.classList.remove('active');
      });
    } else {
      modal.querySelector('p').textContent = message;
    }

    setTimeout(() => {
      modal.classList.add('active');
    }, 50);
  }
});
