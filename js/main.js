/* Semana do Empreendedorismo 2026 — LEI Ibmec */

// ── SPARKLES (hero background) ───────────────────────────────────
(function initSparkles() {
  const canvas = document.getElementById('sparkles-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  // Speaker accent colors + white (white weighted more)
  const PALETTE = [
    [255,255,255],[255,255,255],[255,255,255],[255,255,255],[255,255,255],
    [41, 151,255],  // blue  (dominant — azul e preto)
    [41, 151,255],
    [191, 90,242],  // purple
    [255,107, 53],  // orange
    [48, 209, 88],  // green
    [255,214, 10],  // yellow
  ];

  function resize() {
    canvas.width  = canvas.offsetWidth  || window.innerWidth;
    canvas.height = canvas.offsetHeight || window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  const NUM = 160;
  const particles = Array.from({ length: NUM }, () => {
    const col = PALETTE[Math.floor(Math.random() * PALETTE.length)];
    return {
      x:      Math.random(),
      y:      Math.random(),
      r:      Math.random() * 1.6 + 0.3,
      col,
      op:     Math.random(),
      opDir:  Math.random() > 0.5 ? 1 : -1,
      opSpd:  Math.random() * 0.006 + 0.002,
      vy:    -(Math.random() * 0.1 + 0.03),
      vx:     (Math.random() - 0.5) * 0.05,
    };
  });

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (const p of particles) {
      p.y += p.vy * 0.001;
      p.x += p.vx * 0.001;
      p.op += p.opDir * p.opSpd;
      if (p.op >= 1) { p.op = 1; p.opDir = -1; }
      if (p.op <= 0) {
        p.op = 0; p.opDir = 1;
        p.x = Math.random(); p.y = 1.02;
      }
      if (p.x < 0) p.x = 1;
      if (p.x > 1) p.x = 0;

      ctx.beginPath();
      ctx.arc(p.x * canvas.width, p.y * canvas.height, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${p.col[0]},${p.col[1]},${p.col[2]},${p.op * 0.7})`;
      ctx.fill();
    }
    requestAnimationFrame(draw);
  }
  draw();
})();


// ── SCROLL-DRIVEN SPEAKER ANIMATION ─────────────────────────────
const track     = document.getElementById('convidados');
const spkPages  = Array.from(document.querySelectorAll('.spk-page'));
const dots      = Array.from(document.querySelectorAll('.dot'));
const divider   = document.querySelector('.panel-divider');
const N         = spkPages.length;
let currentSpk  = -1;

function showSpeaker(idx) {
  if (idx === currentSpk) return;

  spkPages.forEach((p, i) => p.classList.toggle('active', i === idx));
  dots.forEach((d, i) => d.classList.toggle('active', i === idx));

  // Divider takes speaker's accent color
  const c = spkPages[idx].style.getPropertyValue('--c');
  document.documentElement.style.setProperty('--divider-c', c || 'rgba(255,255,255,0.07)');

  currentSpk = idx;
}

function onScroll() {
  if (!track) return;
  const rect     = track.getBoundingClientRect();
  const scrolled = -rect.top;

  if (scrolled < 0 || scrolled > track.offsetHeight - window.innerHeight) return;

  const totalScrollable = track.offsetHeight - window.innerHeight;
  const progress = scrolled / totalScrollable;
  const idx = Math.min(Math.floor(progress * N), N - 1);
  showSpeaker(idx);
}

window.addEventListener('scroll', onScroll, { passive: true });

// Show first speaker immediately (panels slide in from their off positions)
showSpeaker(0);

// Also keep in sync as user scrolls
const trackObserver = new IntersectionObserver(entries => {
  if (entries[0].isIntersecting) onScroll();
}, { threshold: 0 });
if (track) trackObserver.observe(track);

// Dots click → scroll to that speaker's position in the track
dots.forEach((d, i) => {
  d.addEventListener('click', () => {
    const totalScrollable = track.offsetHeight - window.innerHeight;
    const targetY = track.offsetTop + (i / N) * totalScrollable + 1;
    window.scrollTo({ top: targetY, behavior: 'smooth' });
  });
});


// ── BUTTON UNLOCK + BLUR LOGIC ───────────────────────────────────
const TWO_DAYS_MS  = 2 * 24 * 60 * 60 * 1000;
const FOUR_DAYS_MS = 4 * 24 * 60 * 60 * 1000;

function updateSpeakers() {
  const now    = new Date();

  // Find next upcoming event
  let nextEl = null, minDiff = Infinity;
  spkPages.forEach(el => {
    const d = new Date(el.dataset.eventDate) - now;
    if (d > 0 && d < minDiff) { minDiff = d; nextEl = el; }
  });

  spkPages.forEach(el => {
    const diff      = new Date(el.dataset.eventDate) - now;
    const nameEl    = el.querySelector('.spk-name');
    const photoCard = el.querySelector('.photo-card');
    const btnIbmec  = el.querySelector('.spk-cta-ibmec');
    const btnPublic = el.querySelector('.spk-cta-public');
    const note      = el.querySelector('.spk-cta-note');
    const lumaIbmec  = el.dataset.lumaIbmec;
    const lumaPublic = el.dataset.lumaPublic;
    const forceOpen  = el.dataset.forceOpen === 'true';

    // Name blur until 4 days before; photo blur until 2 days before
    if (nameEl)    nameEl.classList.toggle('name-blurred',  diff > FOUR_DAYS_MS);
    if (photoCard) photoCard.classList.toggle('photo-blurred', diff > TWO_DAYS_MS);

    // Reset both buttons
    [btnIbmec, btnPublic].forEach(btn => {
      if (!btn) return;
      btn.classList.remove('active', 'past');
      btn.setAttribute('data-luma-event-id', '');
      btn.onclick = null;
    });
    if (note) note.textContent = '';

    if (diff < 0) {
      [btnIbmec, btnPublic].forEach(btn => { if (btn) btn.classList.add('past'); });
      if (btnIbmec) btnIbmec.querySelector('.spk-cta-label').textContent = 'Encerrado';
      if (btnPublic) btnPublic.querySelector('.spk-cta-label').textContent = 'Encerrado';

    } else if (forceOpen || el === nextEl) {
      if (forceOpen || diff <= TWO_DAYS_MS) {
        if (btnIbmec) {
          if (lumaIbmec) {
            btnIbmec.classList.add('active');
            btnIbmec.setAttribute('data-luma-event-id', lumaIbmec);
            btnIbmec.querySelector('.spk-cta-label').textContent = 'Sou aluno Ibmec';
          } else {
            btnIbmec.querySelector('.spk-cta-label').textContent = 'Aluno Ibmec — Em breve';
          }
        }
        if (btnPublic) {
          if (lumaPublic) {
            btnPublic.classList.add('active');
            btnPublic.setAttribute('data-luma-event-id', lumaPublic);
            btnPublic.querySelector('.spk-cta-label').textContent = 'Não sou aluno';
          } else {
            btnPublic.querySelector('.spk-cta-label').textContent = 'Público — Em breve';
          }
        }
        if (note) note.textContent = 'Vagas limitadas · Gratuito';
      } else {
        const days = Math.ceil(diff / (24 * 60 * 60 * 1000));
        const msg  = days === 1 ? 'Abre amanhã' : `Abre em ${days} dias`;
        if (btnIbmec) btnIbmec.querySelector('.spk-cta-label').textContent = msg;
        if (btnPublic) btnPublic.querySelector('.spk-cta-label').textContent = msg;
        if (note) note.textContent = 'Inscrições abertas 2 dias antes';
      }
    } else {
      if (btnIbmec) btnIbmec.querySelector('.spk-cta-label').textContent = 'Em breve';
      if (btnPublic) btnPublic.querySelector('.spk-cta-label').textContent = 'Em breve';
    }
  });
}

updateSpeakers();
setInterval(updateSpeakers, 60 * 1000);
