/* ==========================================================================
   DESIGN MVN STUDIO - Sliders & Interactive Drag Controls
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Hero Background Slideshow Sequence
  const heroSlides = document.querySelectorAll('.hero-slide');
  if (heroSlides.length > 1) {
    let currentSlide = 0;
    setInterval(() => {
      heroSlides[currentSlide].classList.remove('active');
      currentSlide = (currentSlide + 1) % heroSlides.length;
      heroSlides[currentSlide].classList.add('active');
    }, 6500);
  }

  // 2. Before / After Image Comparison Dragging Slider
  const baContainers = document.querySelectorAll('.before-after-container');
  baContainers.forEach(container => {
    const handle = container.querySelector('.ba-slider-handle');
    const afterWrapper = container.querySelector('.after-img-wrapper');
    if (!handle || !afterWrapper) return;

    let isDragging = false;

    const setPosition = (x) => {
      const rect = container.getBoundingClientRect();
      let pos = x - rect.left;
      if (pos < 0) pos = 0;
      if (pos > rect.width) pos = rect.width;

      const percentage = (pos / rect.width) * 100;
      afterWrapper.style.width = `${percentage}%`;
      handle.style.left = `${percentage}%`;
    };

    // Mouse events
    handle.addEventListener('mousedown', (e) => {
      isDragging = true;
      e.preventDefault();
    });

    window.addEventListener('mouseup', () => {
      isDragging = false;
    });

    container.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      setPosition(e.clientX);
    });

    // Touch events
    handle.addEventListener('touchstart', (e) => {
      isDragging = true;
    }, { passive: true });

    window.addEventListener('touchend', () => {
      isDragging = false;
    });

    container.addEventListener('touchmove', (e) => {
      if (!isDragging) return;
      if (e.touches[0]) setPosition(e.touches[0].clientX);
    }, { passive: true });
  });

  // 3. Testimonial Slider Carousel Logic
  const testimonialContainer = document.querySelector('.testimonials-slider');
  if (testimonialContainer) {
    const slides = testimonialContainer.querySelectorAll('.testimonial-slide');
    const prevBtn = document.querySelector('.testimonial-prev');
    const nextBtn = document.querySelector('.testimonial-next');
    const dotsContainer = document.querySelector('.testimonial-dots');

    if (slides.length > 0) {
      let currentIndex = 0;

      // Create dots
      if (dotsContainer) {
        dotsContainer.innerHTML = '';
        slides.forEach((_, i) => {
          const dot = document.createElement('button');
          dot.className = `testimonial-dot ${i === 0 ? 'active' : ''}`;
          dot.setAttribute('aria-label', `Go to testimonial slide ${i + 1}`);
          dot.addEventListener('click', () => goToSlide(i));
          dotsContainer.appendChild(dot);
        });
      }

      function goToSlide(index) {
        slides[currentIndex].style.display = 'none';
        slides[currentIndex].classList.remove('active');
        
        currentIndex = (index + slides.length) % slides.length;

        slides[currentIndex].style.display = 'block';
        setTimeout(() => slides[currentIndex].classList.add('active'), 20);

        if (dotsContainer) {
          const dots = dotsContainer.querySelectorAll('.testimonial-dot');
          dots.forEach((dot, i) => {
            if (i === currentIndex) dot.classList.add('active');
            else dot.classList.remove('active');
          });
        }
      }

      // Initial setup
      slides.forEach((slide, i) => {
        if (i !== 0) slide.style.display = 'none';
        else slide.style.display = 'block';
      });

      if (prevBtn) prevBtn.addEventListener('click', () => goToSlide(currentIndex - 1));
      if (nextBtn) nextBtn.addEventListener('click', () => goToSlide(currentIndex + 1));

      // Auto rotation
      setInterval(() => {
        goToSlide(currentIndex + 1);
      }, 7000);
    }
  }
});
