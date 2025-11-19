 document.addEventListener("DOMContentLoaded", function() {
  function animateNumber(el, start, end, duration) {
    const range = end - start;
    const startTime = performance.now();

    function update(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const value = Math.floor(start + progress * range);
      el.textContent = value.toLocaleString();
      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        el.textContent = end.toLocaleString();
      }
    }

    requestAnimationFrame(update);
  }

  const numbersSection = document.querySelector('.numbers');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const counters = numbersSection.querySelectorAll('.counter');

      if (entry.isIntersecting) {
        counters.forEach(counter => {
          const target = parseInt(counter.dataset.target);
          animateNumber(counter, 1, target, 1500);
        });
      } else {
        counters.forEach(counter => counter.textContent = '0');
      }
    });
  }, { threshold: 0.4 });

  observer.observe(numbersSection);
});