/* =============================================
   SEMANA DO EMPREENDEDORISMO — LEI Ibmec 2025
   animations.js — Interações & Efeitos Visuais
   ============================================= */

/* ============ DADOS DOS CONVIDADOS ============ */
const SPEAKERS = {
  dc: {
    day: '04 de Maio',
    name: 'Daniel Cavaretti',
    role: 'Empreendedorismo de Impacto',
    desc: 'TEDx Speaker. TOYP 2020 (Top Outstanding Young Person). Participou de reality show de empreendedorismo com Cris Arcangeli. Atuou em M&A, ESG e desenvolvimento em favelas de todos os estados do Brasil.',
    tags: ['Impacto Social', 'Startups', 'ESG'],
    hook: '"Do zero ao impacto real — como empreender onde o mercado ignora"',
  },
  mv: {
    day: '05 de Maio',
    name: 'Matias Von Oertzen',
    role: 'Investimentos & Nova Geração',
    desc: 'Ex-XP Inc. & Itaú BBA. Criador do canal "Filho Rico" (161K seguidores). Fundador da Explica+ e Madra Investimentos. Traduz o mercado financeiro para jovens universitários.',
    tags: ['Finanças', 'Investimento', 'FinTech'],
    hook: '"Dinheiro inteligente para quem quer empreender antes dos 30"',
  },
  kz: {
    day: '06 de Maio',
    name: 'KondZilla',
    role: 'Konrad Dantas — Holding, Creator, Forbes 30U30',
    desc: 'De favela do Guarujá ao maior canal de música do mundo com 66M inscritos. Criou KondZilla Filmes, KondZilla Records e a série Sintonia na Netflix. Forbes BR mais influentes abaixo de 30 anos. Fundou a Escola de Criadores para jovens de favela.',
    tags: ['Criatividade', 'Negócios Digitais', 'Periferia'],
    hook: '"Como transformar identidade em império — do baile de favela ao palco global"',
    featured: true,
  },
  tb: {
    day: '07 de Maio',
    name: 'Theo Braga',
    role: 'Venture Capital & Nova Economia',
    desc: '26 anos. Fundador e CEO da SME, maior escola de negócios da nova economia da América Latina. Investidor-anjo em 20+ startups. Presidente do Pool Smart Money (Bossa Invest). Filho de João Kepler, co-fundador da Bossa Invest.',
    tags: ['Venture Capital', 'Startups', 'Smart Money'],
    hook: '"Startups que investidores financiam — o que eles olham antes de assinar o cheque"',
  },
  ng: {
    day: '08 de Maio',
    name: 'Nizan Guanaes',
    role: 'Publicidade, Branding & Negócios',
    desc: 'CEO N Ideias. Fundador do Grupo ABC, vendido por R$1 bilhão. Financial Times: top 5 brasileiros mais influentes. Fast Company: 100 mais criativos do mundo. Cannes Gold Lion. Harvard OPM 2023. Embaixador UNESCO.',
    tags: ['Publicidade', 'Branding', 'Legado'],
    hook: '"Vender a ideia antes de vender o produto — o que ninguém te ensina sobre posicionamento"',
  },
};

/* ============ DADOS DAS CONEXÕES ============ */
const CONNECTIONS = [
  {
    id: 'dc-kz',
    from: 'gnode-dc', to: 'gnode-kz',
    arcOffset: -80,  // arco à esquerda da spine
    fromName: 'Cavaretti', toName: 'KondZilla',
    title: 'Empreendedorismo na Periferia',
    text: 'Cavaretti investiu e atuou no G10 Favelas — o mesmo ecossistema de onde KondZilla emergiu. A ideia de empreender dentro de contextos ignorados pelo mercado é o fio condutor: Cavaretti com ESG e desenvolvimento nas periferias de todos os estados, Konrad com a cultura periférica como produto de alcance global. Dois homens que escolheram o que o mercado descartou.',
  },
  {
    id: 'mv-tb',
    from: 'gnode-mv', to: 'gnode-tb',
    arcOffset: 80,   // arco à direita da spine
    fromName: 'Matias', toName: 'Theo Braga',
    title: 'Smart Money — dos dois lados',
    text: 'Matias traduz finanças para jovens — Theo opera finanças para startups. Ambos vivem o "smart money": Matias na educação financeira antes do investimento, Theo no capital inteligente após o pitch. São os dois lados do mesmo ecossistema: um forma o empreendedor que vai captar, o outro é quem decide se capta.',
  },
  {
    id: 'tb-ng',
    from: 'gnode-tb', to: 'gnode-ng',
    arcOffset: 55,
    fromName: 'Theo Braga', toName: 'Nizan Guanaes',
    title: 'VC + Branding = Cheque Assinado',
    text: 'Investidores como Theo avaliam marcas, posicionamento e narrativa antes de assinar cheques. Nizan representa exatamente o que uma startup precisa dominar para atrair capital: identidade clara, proposta de valor vendida antes do produto. O que Nizan constrói, Theo compra — e essa lógica define startups que crescem vs. startups que fecham.',
  },
  {
    id: 'kz-ng',
    from: 'gnode-kz', to: 'gnode-ng',
    arcOffset: -55,
    fromName: 'KondZilla', toName: 'Nizan Guanaes',
    title: 'Narrativa vs. Publicidade Clássica',
    text: 'Konrad construiu uma holding multimidiática sem escola de publicidade — Nizan construiu o maior grupo de publicidade do Brasil partindo do zero. A mesma pergunta, dois caminhos opostos: como transformar uma ideia em marca de impacto global? Um fez com cultura de rua; o outro com estratégia de Madison Avenue. Tensão criativa perfeita no encerramento.',
  },
  {
    id: 'dc-mv',
    from: 'gnode-dc', to: 'gnode-mv',
    arcOffset: 40,
    fromName: 'Cavaretti', toName: 'Matias',
    title: 'Impacto que precisa de capital',
    text: 'Todo negócio de impacto social precisa de sustentabilidade financeira para escalar. Cavaretti mostra o propósito e o modelo de impacto; Matias mostra como monetizar, captar e crescer sem perder a essência. A combinação forma o empreendedor completo: com missão clara e modelo financeiro viável para chegar a mais lugares.',
  },
];

/* ============ INICIALIZAÇÃO PRINCIPAL ============ */
document.addEventListener('DOMContentLoaded', () => {

  /* ---- 0. Navegação por seções (SPA hash-based) ---- */
  initNav();

  /* ---- 1. Grafo de convidados (Seção 1) ---- */
  // initGraph é chamado pelo initNav ao mostrar a seção lineup
  window.addEventListener('resize', debounce(initGraph, 250));

  /* ---- 1b. Painel SCRUM global ---- */
  const scrumFlyout  = document.getElementById('scrum-flyout');
  const scrumArea    = document.getElementById('scrum-flyout-area');
  const scrumTitle   = document.getElementById('scrum-flyout-title');
  const scrumItems   = document.getElementById('scrum-flyout-items');
  const scrumNote    = document.getElementById('scrum-flyout-note');

  document.querySelectorAll('.has-scrum').forEach(card => {
    card.addEventListener('mouseenter', () => {
      const area  = card.dataset.scrumArea  || '';
      const color = card.dataset.scrumColor || 'rgba(255,255,255,0.6)';
      const title = card.dataset.scrumTitle || '';
      const items = (card.dataset.scrumItems || '').split('|').filter(Boolean);
      const note  = card.dataset.scrumNote  || '';

      scrumArea.textContent  = area;
      scrumArea.style.color  = color;
      scrumTitle.textContent = title;
      scrumItems.innerHTML   = items.map(i => `<li>${i}</li>`).join('');
      scrumNote.textContent  = note;
      scrumNote.style.display = note ? 'block' : 'none';
      scrumFlyout.classList.add('visible');
    });
    card.addEventListener('mouseleave', () => {
      scrumFlyout.classList.remove('visible');
    });
  });

  /* ---- 2. Popup: fechar ---- */
  document.getElementById('mind-overlay')?.addEventListener('click', closePopup);
  document.getElementById('mind-close')?.addEventListener('click', closePopup);
  document.getElementById('spk-overlay')?.addEventListener('click', closeSpeakerPopup);
  document.getElementById('spk-close')?.addEventListener('click', closeSpeakerPopup);
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') { closePopup(); closeSpeakerPopup(); }
  });

  /* ---- 3. Scroll Reveal ---- */
  const srEls = document.querySelectorAll(
    '.section, .pub-card, .flow-day, .area-card, .vibe-card, .mod-card, .sponsor-card'
  );
  const srObs = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        entry.target.style.transitionDelay = Math.min(i * 0.06, 0.35) + 's';
        entry.target.classList.add('visible');
        srObs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.07 });
  srEls.forEach(el => { el.classList.add('sr'); srObs.observe(el); });

  /* ---- 4. Fase wrappers stagger ---- */
  document.querySelectorAll('.fase-wrapper').forEach((fw, i) => {
    fw.style.opacity = '0';
    fw.style.transform = 'translateY(24px)';
    const obs = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setTimeout(() => {
          fw.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
          fw.style.opacity = '1';
          fw.style.transform = 'translateY(0)';
        }, i * 120);
        obs.unobserve(fw);
      }
    }, { threshold: 0.1 });
    obs.observe(fw);
  });

  /* ---- 5. Pub cards stagger ---- */
  const pubGrid = document.querySelector('.pub-grid');
  if (pubGrid) {
    document.querySelectorAll('.pub-card').forEach(c => {
      c.style.opacity = '0'; c.style.transform = 'translateY(20px)';
    });
    new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        document.querySelectorAll('.pub-card').forEach((c, i) => {
          setTimeout(() => {
            c.style.transition = 'opacity 0.5s ease, transform 0.5s ease, background 0.38s, box-shadow 0.38s';
            c.style.opacity = '1'; c.style.transform = 'translateY(0)';
          }, i * 75);
        });
      }
    }, { threshold: 0.1 }).observe(pubGrid);
  }

  /* ---- 6. Format steps stagger ---- */
  const fmtEl = document.querySelector('.format-timeline');
  if (fmtEl) {
    document.querySelectorAll('.format-step').forEach(s => {
      s.style.opacity = '0'; s.style.transform = 'translateY(16px)';
    });
    new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        document.querySelectorAll('.format-step').forEach((s, i) => {
          setTimeout(() => {
            s.style.transition = 'opacity 0.5s ease, transform 0.5s ease, background 0.3s, box-shadow 0.38s';
            s.style.opacity = '1'; s.style.transform = 'translateY(0)';
          }, i * 70);
        });
      }
    }, { threshold: 0.15 }).observe(fmtEl);
  }

  /* ---- 7. Startup slots stagger ---- */
  const sched = document.querySelector('.startups-schedule');
  if (sched) {
    document.querySelectorAll('.startup-slot').forEach(s => {
      s.style.opacity = '0'; s.style.transform = 'translateY(16px)';
    });
    new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        document.querySelectorAll('.startup-slot').forEach((s, i) => {
          setTimeout(() => {
            s.style.transition = 'opacity 0.5s ease, transform 0.5s ease, background 0.3s, box-shadow 0.38s';
            s.style.opacity = '1'; s.style.transform = 'translateY(0)';
          }, i * 90);
        });
      }
    }, { threshold: 0.15 }).observe(sched);
  }

  /* ---- 8. Scrum area cards stagger ---- */
  const scrumMap = document.querySelector('.scrum-map');
  if (scrumMap) {
    document.querySelectorAll('.scrum-area-card').forEach(c => {
      c.style.opacity = '0'; c.style.transform = 'scale(0.95)';
    });
    new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        document.querySelectorAll('.scrum-area-card').forEach((c, i) => {
          setTimeout(() => {
            c.style.transition = 'opacity 0.6s ease, transform 0.6s ease, border-color 0.38s, box-shadow 0.38s';
            c.style.opacity = '1'; c.style.transform = 'scale(1)';
          }, i * 100);
        });
      }
    }, { threshold: 0.1 }).observe(scrumMap);
  }

  /* ---- 9. Scrum SVG arrows ---- */
  // drawScrumArrows é chamado pelo initNav ao mostrar a seção areas
  window.addEventListener('resize', debounce(drawScrumArrows, 200));
});

/* ============================================================
   NAVEGAÇÃO SPA — sidebar retráctil + hash routing
   ============================================================ */
const PAGE_QUOTES = {
  lineup:      '"Aqueles que têm o privilégio de saber têm o dever de agir."',
  moderadores: '"A liderança é a arte de fazer com que outra pessoa faça algo que você quer feito porque ela quer fazê-lo." — Eisenhower',
  formato:     '"Inovação distingue um líder de um seguidor." — Steve Jobs',
  cronograma:  '"Uma meta sem um plano é apenas um desejo." — Antoine de Saint-Exupéry',
  publicidade: '"Se o seu negócio não está na internet, o seu negócio não existe." — Bill Gates',
  startups:    '"O maior risco é não correr nenhum risco." — Mark Zuckerberg',
  patrocinio:  '"Negócios são a combinação de guerra e esporte." — André Maurois',
  parcerias:   '"Se você quer ir rápido, vá sozinho. Se quer ir longe, vá acompanhado." — Provérbio africano',
  script:      '"Você não fecha uma venda, você abre um relacionamento." — Patricia Fripp',
  areas:       '"Grandes realizações não são feitas por impulso, mas por uma soma de pequenas realizações." — Vincent van Gogh',
  custos:      '"Cuide dos custos e os lucros cuidarão de si mesmos." — Andrew Carnegie',
  vibe:        '"O orador medíocre é aquele que as pessoas aplaudem e dizem: \'Que belo discurso\'. O grande líder é aquele após o qual o povo se levanta e grita: \'Às armas!\'"',
};

function initNav() {
  const sections  = document.querySelectorAll('.section[data-page]');
  const links     = document.querySelectorAll('.nav-link[data-page]');
  const overlay   = document.getElementById('sidebar-overlay');
  const toggleBtn = document.getElementById('sidebar-toggle');
  const closeBtn  = document.getElementById('sidebar-close');

  /* ---- Sidebar open / close ---- */
  function openSidebar() {
    document.body.classList.add('sidebar-open');
    toggleBtn?.setAttribute('aria-expanded', 'true');
  }
  function closeSidebar() {
    document.body.classList.remove('sidebar-open');
    toggleBtn?.setAttribute('aria-expanded', 'false');
  }

  toggleBtn?.addEventListener('click', () => {
    document.body.classList.contains('sidebar-open') ? closeSidebar() : openSidebar();
  });
  closeBtn?.addEventListener('click', closeSidebar);
  overlay?.addEventListener('click', closeSidebar);

  // Fecha com Escape
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && document.body.classList.contains('sidebar-open')) closeSidebar();
  });

  /* ---- Navegação por seção ---- */
  const quoteEl = document.getElementById('header-quote');

  function showPage(page) {
    const target = page || 'lineup';

    sections.forEach(s => s.classList.toggle('active', s.dataset.page === target));
    links.forEach(a => a.classList.toggle('active', a.dataset.page === target));

    // Atualiza frase do header
    if (quoteEl && PAGE_QUOTES[target]) {
      quoteEl.style.opacity = '0';
      setTimeout(() => {
        quoteEl.textContent = PAGE_QUOTES[target];
        quoteEl.style.opacity = '1';
      }, 180);
    }

    window.scrollTo({ top: 0, behavior: 'instant' });

    // Re-inicializa SVG que dependem de dimensões visíveis
    if (target === 'lineup') requestAnimationFrame(() => setTimeout(initGraph, 40));
    if (target === 'areas')  requestAnimationFrame(() => setTimeout(drawScrumArrows, 40));
  }

  links.forEach(a => {
    a.addEventListener('click', e => {
      e.preventDefault();
      const page = a.dataset.page;
      history.pushState({ page }, '', '#' + page);
      showPage(page);
      // Fecha sidebar ao navegar (UX mobile)
      closeSidebar();
    });
  });

  window.addEventListener('popstate', e => {
    showPage(e.state?.page || location.hash.slice(1) || 'lineup');
  });

  /* ---- Navegação por teclado (setas) ---- */
  const pageOrder = ['lineup','moderadores','formato','cronograma','publicidade','startups','patrocinio','parcerias','script','areas','custos','vibe'];

  document.addEventListener('keydown', e => {
    // Ignora se o foco está num input/textarea
    if (['INPUT','TEXTAREA','SELECT'].includes(document.activeElement?.tagName)) return;

    const isNext = e.key === 'ArrowRight' || e.key === 'ArrowDown';
    const isPrev = e.key === 'ArrowLeft'  || e.key === 'ArrowUp';
    if (!isNext && !isPrev) return;

    e.preventDefault();
    const current = location.hash.slice(1) || 'lineup';
    const idx     = pageOrder.indexOf(current);
    const nextIdx = isNext ? Math.min(idx + 1, pageOrder.length - 1)
                           : Math.max(idx - 1, 0);
    if (nextIdx === idx) return;
    const page = pageOrder[nextIdx];
    history.pushState({ page }, '', '#' + page);
    showPage(page);
    closeSidebar();
  });

  const initial = location.hash.slice(1) || 'lineup';
  history.replaceState({ page: initial }, '', '#' + initial);
  showPage(initial);
}

/* ============================================================
   GRAFO DE CONVIDADOS — nós + arestas SVG interativas
   ============================================================ */
function initGraph() {
  const wrap = document.getElementById('timeline-wrap');
  const svg  = document.getElementById('graph-svg');
  if (!wrap || !svg) return;

  const W = wrap.offsetWidth;
  const H = wrap.offsetHeight;
  svg.setAttribute('viewBox', `0 0 ${W} ${H}`);
  svg.innerHTML = '';

  /* ---- Centro de cada ponto (.tl-dot) relativo ao wrap ---- */
  function dotCenter(id) {
    const el = document.getElementById(id);
    if (!el) return null;
    const wr = wrap.getBoundingClientRect();
    const br = el.getBoundingClientRect();
    return { x: br.left + br.width / 2 - wr.left, y: br.top + br.height / 2 - wr.top };
  }

  /* ---- Label flutuante (hover na aresta) ---- */
  const labelEl = document.createElementNS('http://www.w3.org/2000/svg', 'text');
  labelEl.setAttribute('text-anchor', 'middle');
  labelEl.setAttribute('dominant-baseline', 'middle');
  labelEl.setAttribute('font-size', '10');
  labelEl.setAttribute('font-weight', '500');
  labelEl.setAttribute('font-family', '-apple-system, Inter, sans-serif');
  labelEl.setAttribute('fill', 'rgba(255,255,255,0.8)');
  labelEl.setAttribute('pointer-events', 'none');
  labelEl.setAttribute('opacity', '0');
  svg.appendChild(labelEl);

  const labelBg = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
  labelBg.setAttribute('rx', '4'); labelBg.setAttribute('ry', '4');
  labelBg.setAttribute('fill', 'rgba(12,12,12,0.88)');
  labelBg.setAttribute('stroke', 'rgba(255,255,255,0.1)');
  labelBg.setAttribute('stroke-width', '0.5');
  labelBg.setAttribute('pointer-events', 'none');
  labelBg.setAttribute('opacity', '0');
  svg.insertBefore(labelBg, labelEl);

  function showLabel(txt, x, y) {
    labelEl.textContent = txt;
    const bbox = labelEl.getBBox ? labelEl.getBBox() : { width: txt.length * 5.5, height: 11 };
    const pw = bbox.width + 18, ph = 20;
    const lx = Math.max(pw/2 + 8, Math.min(W - pw/2 - 8, x));
    const ly = y - 18;
    labelEl.setAttribute('x', lx); labelEl.setAttribute('y', ly);
    labelBg.setAttribute('x', lx - pw/2); labelBg.setAttribute('y', ly - ph/2);
    labelBg.setAttribute('width', pw); labelBg.setAttribute('height', ph);
    labelEl.setAttribute('opacity', '1'); labelBg.setAttribute('opacity', '1');
  }
  function hideLabel() {
    labelEl.setAttribute('opacity', '0'); labelBg.setAttribute('opacity', '0');
  }

  /* ---- Desenha as conexões como arcos que saem lateralmente da spine ---- */
  CONNECTIONS.forEach(conn => {
    const a = dotCenter(conn.from);
    const b = dotCenter(conn.to);
    if (!a || !b) return;

    // Pontos de saída horizontais a partir dos dots
    const offset = conn.arcOffset || 60;
    const cpX = a.x + offset;   // controle horizontal — cria arco lateral
    const d = `M ${a.x} ${a.y} C ${cpX} ${a.y}, ${cpX} ${b.y}, ${b.x} ${b.y}`;
    const mid = getCubicMidpoint(a, {x: cpX, y: a.y}, {x: cpX, y: b.y}, b);

    // Linha fina
    const line = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    line.setAttribute('d', d); line.setAttribute('fill', 'none');
    line.setAttribute('stroke', 'rgba(255,255,255,0.15)');
    line.setAttribute('stroke-width', '0.8');
    line.setAttribute('stroke-linecap', 'round');
    svg.insertBefore(line, labelBg);

    // Hit area
    const hit = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    hit.setAttribute('d', d); hit.setAttribute('fill', 'none');
    hit.setAttribute('stroke', 'transparent'); hit.setAttribute('stroke-width', '20');
    hit.style.cursor = 'pointer'; hit.style.pointerEvents = 'stroke';
    svg.insertBefore(hit, labelBg);

    const onEnter = () => {
      line.setAttribute('stroke', 'rgba(255,255,255,0.5)');
      line.setAttribute('stroke-width', '1.2');
      showLabel(conn.title, mid.x, mid.y);
    };
    const onLeave = () => {
      line.setAttribute('stroke', 'rgba(255,255,255,0.15)');
      line.setAttribute('stroke-width', '0.8');
      hideLabel();
    };
    hit.addEventListener('mouseenter', onEnter); hit.addEventListener('mouseleave', onLeave);
    hit.addEventListener('click', () => openPopup(conn));
  });
}

/* Ponto médio de uma cubic bezier */
function getCubicMidpoint(p0, p1, p2, p3) {
  const t = 0.5, it = 1 - t;
  return {
    x: it*it*it*p0.x + 3*it*it*t*p1.x + 3*it*t*t*p2.x + t*t*t*p3.x,
    y: it*it*it*p0.y + 3*it*it*t*p1.y + 3*it*t*t*p2.y + t*t*t*p3.y,
  };
}

/* Ponto na curva quadrática bezier em t=[0..1] */
function getPointOnQuadratic(p0, p1, p2, t) {
  const it = 1 - t;
  return {
    x: it*it*p0.x + 2*it*t*p1.x + t*t*p2.x,
    y: it*it*p0.y + 2*it*t*p1.y + t*t*p2.y,
  };
}

/* ---- Popup de conexão ---- */
function openPopup(conn) {
  const overlay  = document.getElementById('mind-overlay');
  const popup    = document.getElementById('mind-popup');
  const titleEl  = document.getElementById('mind-title');
  const speakEl  = document.getElementById('mind-speakers');
  const bodyEl   = document.getElementById('mind-body');
  const eyeEl    = document.getElementById('mind-eyebrow');
  if (!overlay || !popup) return;

  titleEl.textContent = conn.title;
  bodyEl.textContent  = conn.text;
  eyeEl.textContent   = 'Conexão entre convidados';
  speakEl.innerHTML = `
    <span class="mind-popup-tag">${conn.fromName}</span>
    <span class="mind-popup-arr">↔</span>
    <span class="mind-popup-tag">${conn.toName}</span>
  `;

  popup.style.setProperty('--popup-color',  conn.color);
  popup.style.setProperty('--popup-rgb',    conn.rgb);
  popup.style.setProperty('--popup-border', conn.color + '60');

  overlay.removeAttribute('hidden');
  popup.removeAttribute('hidden');

  // Foco no botão de fechar para acessibilidade
  document.getElementById('mind-close')?.focus();
}

function closePopup() {
  document.getElementById('mind-overlay')?.setAttribute('hidden', '');
  document.getElementById('mind-popup')?.setAttribute('hidden', '');
}

/* ============================================================
   SPEAKER POPUP (Seção 1 — clique no nó do grafo)
   ============================================================ */
function openSpeakerPopup(id) {
  const spk = SPEAKERS[id];
  if (!spk) return;
  document.getElementById('spk-day').textContent  = spk.day;
  document.getElementById('spk-name').textContent = spk.name;
  document.getElementById('spk-role').textContent = spk.role;
  document.getElementById('spk-desc').textContent = spk.desc;
  document.getElementById('spk-tags').innerHTML   = spk.tags
    .map(t => `<span class="spk-popup-tag">${t}</span>`).join('');
  document.getElementById('spk-hook').textContent = spk.hook;
  document.getElementById('spk-overlay').removeAttribute('hidden');
  document.getElementById('spk-popup').removeAttribute('hidden');
}

function closeSpeakerPopup() {
  document.getElementById('spk-overlay')?.setAttribute('hidden', '');
  document.getElementById('spk-popup')?.setAttribute('hidden', '');
  document.querySelectorAll('.graph-node').forEach(n => n.classList.remove('active'));
}

/* ============================================================
   MAPA SCRUM (Seção 10) — SETAS SVG
   ============================================================ */
function drawScrumArrows() {
  const existing = document.getElementById('scrum-svg-overlay');
  if (existing) existing.remove();

  const mapEl   = document.querySelector('.scrum-map');
  const centerEl = document.getElementById('scrum-center');
  if (!mapEl || !centerEl) return;

  const mapRect = mapEl.getBoundingClientRect();
  const cRect   = centerEl.getBoundingClientRect();
  const cx = cRect.left + cRect.width  / 2 - mapRect.left;
  const cy = cRect.top  + cRect.height / 2 - mapRect.top;

  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.id = 'scrum-svg-overlay';
  svg.setAttribute('width',  mapRect.width);
  svg.setAttribute('height', mapRect.height);
  svg.style.cssText = 'position:absolute;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:5;overflow:visible;';
  mapEl.style.position = 'relative';
  mapEl.appendChild(svg);

  // Marcadores de seta
  const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
  [['yellow','#FFD600'],['purple','#7B2FFF'],['green','#00C47D'],['red','#FF2D55']].forEach(([name,color]) => {
    const m = document.createElementNS('http://www.w3.org/2000/svg','marker');
    m.setAttribute('id',`sarrow-${name}`); m.setAttribute('markerWidth','6');
    m.setAttribute('markerHeight','6'); m.setAttribute('refX','5'); m.setAttribute('refY','3');
    m.setAttribute('orient','auto');
    const p = document.createElementNS('http://www.w3.org/2000/svg','polygon');
    p.setAttribute('points','0 0, 6 3, 0 6'); p.setAttribute('fill',color); p.setAttribute('opacity','0.75');
    m.appendChild(p); defs.appendChild(m);
  });
  svg.appendChild(defs);

  mapEl.querySelectorAll('.scrum-area-card[data-arrow]').forEach(card => {
    const color  = card.dataset.arrowColor  || '#FFD600';
    const marker = card.dataset.arrowMarker || 'yellow';
    const cR = card.getBoundingClientRect();
    const sx = cR.left + cR.width  / 2 - mapRect.left;
    const sy = cR.top  + cR.height / 2 - mapRect.top;
    const dx = cx - sx, dy = cy - sy;
    const len = Math.sqrt(dx*dx+dy*dy) || 1;
    const ux = dx/len, uy = dy/len;
    const ex = sx + ux*(cR.width/2+4);
    const ey = sy + uy*(cR.height/2+4);
    const tpx = cx - ux*14, tpy = cy - uy*14;
    const cpx = (ex+tpx)/2, cpy = (ey+tpy)/2;

    const path = document.createElementNS('http://www.w3.org/2000/svg','path');
    path.setAttribute('d',`M${ex},${ey} Q${cpx},${cpy} ${tpx},${tpy}`);
    path.setAttribute('fill','none'); path.setAttribute('stroke',color);
    path.setAttribute('stroke-width','1.5'); path.setAttribute('stroke-dasharray','5,5');
    path.setAttribute('opacity','0.5'); path.setAttribute('marker-end',`url(#sarrow-${marker})`);
    path.style.animation = 'dash-flow 2s linear infinite';
    svg.appendChild(path);
  });
}

/* ============ UTILITÁRIO ============ */
function debounce(fn, delay) {
  let t;
  return (...args) => { clearTimeout(t); t = setTimeout(() => fn(...args), delay); };
}
