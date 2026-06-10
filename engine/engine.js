const revealObs = new IntersectionObserver((entries) => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) {
      setTimeout(() => e.target.classList.add('visible'), i * 80);
      revealObs.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal, .number-item').forEach(el => revealObs.observe(el));

// ── Service cards: staggered entry on scroll ──
const cardObs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      // Cards stagger via CSS transition-delay already set; just add class
      e.target.querySelectorAll('.service-card').forEach((card, i) => {
        setTimeout(() => card.classList.add('card-visible'), i * 130);
      });
      cardObs.unobserve(e.target);
    }
  });
}, { threshold: 0.1 });
const servicesGrid = document.querySelector('.services-grid');
if (servicesGrid) cardObs.observe(servicesGrid);

// ── ROI bars ──
const barObs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('visible'); barObs.unobserve(e.target); }
  });
}, { threshold: 0.3 });
document.querySelectorAll('.roi-bar-item').forEach(el => barObs.observe(el));

// ── Count up ──
function countUp(el) {
  const target = parseInt(el.dataset.target);
  const dur = 1800, start = Date.now();
  const run = () => {
    const p = Math.min((Date.now()-start)/dur, 1);
    const e = 1 - Math.pow(1-p, 3);
    el.textContent = Math.round(e * target);
    if (p < 1) requestAnimationFrame(run);
  };
  run();
}
const countObs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      document.querySelectorAll('.count-up').forEach(el => countUp(el));
      countObs.unobserve(e.target);
    }
  });
}, { threshold: 0.5 });
const nb = document.querySelector('.numbers-band');
if (nb) countObs.observe(nb);