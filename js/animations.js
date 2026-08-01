/* ==========================================================================
   DESIGN MVN STUDIO - Animations & Scroll Observer
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Scroll Reveal Intersection Observer
  const revealElements = document.querySelectorAll('.reveal, .reveal-fade-up, .reveal-fade-in, .reveal-slide-left, .reveal-slide-right, .reveal-zoom-in, .text-reveal');

  if ('IntersectionObserver' in window) {
    const observerOptions = {
      root: null,
      rootMargin: '0px 0px -80px 0px',
      threshold: 0.15
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    // Fallback for non-supporting browsers
    revealElements.forEach(el => el.classList.add('active'));
  }

  // 2. Statistics Counter Up Animation
  const statNumbers = document.querySelectorAll('.stat-number');

  if (statNumbers.length > 0 && 'IntersectionObserver' in window) {
    const counterObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    statNumbers.forEach(stat => counterObserver.observe(stat));
  }

  function animateCounter(element) {
    const targetText = element.getAttribute('data-target') || element.innerText;
    const numericTarget = parseInt(targetText.replace(/\D/g, ''), 10);
    const suffix = targetText.replace(/[0-9]/g, '');

    if (isNaN(numericTarget)) return;

    let start = 0;
    const duration = 2000;
    const startTime = performance.now();

    function updateCounter(currentTime) {
      const elapsedTime = currentTime - startTime;
      const progress = Math.min(elapsedTime / duration, 1);
      
      // Easing function (easeOutQuad)
      const currentVal = Math.floor(progress * (2 - progress) * numericTarget);
      element.innerText = currentVal + suffix;

      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      } else {
        element.innerText = numericTarget + suffix;
      }
    }

    requestAnimationFrame(updateCounter);
  }

  // 3. Simple Parallax Effect on Scroll
  const parallaxBg = document.querySelectorAll('.parallax-bg');
  if (parallaxBg.length > 0) {
    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;
      parallaxBg.forEach(bg => {
        const speed = bg.getAttribute('data-speed') || 0.3;
        bg.style.transform = `translateY(${scrolled * speed}px)`;
      });
    }, { passive: true });
  }
});
