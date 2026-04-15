/* ============================================
   MEP CENTER — Main JavaScript (v3)
   ============================================ */

(function () {
  'use strict';

  /* ============================================
     1. DARK / LIGHT MODE TOGGLE (icon only)
     ============================================ */
  const themeToggle = document.getElementById('theme-toggle');
  const themeIcon   = document.getElementById('theme-icon');
  const body        = document.body;

  if (localStorage.getItem('mepcenter-theme') === 'light') {
    body.classList.add('light-mode');
    body.classList.remove('dark-mode');
    if (themeIcon) themeIcon.className = 'fas fa-moon';
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const isLight = body.classList.toggle('light-mode');
      body.classList.toggle('dark-mode', !isLight);
      themeIcon.className = isLight ? 'fas fa-moon' : 'fas fa-sun';
      localStorage.setItem('mepcenter-theme', isLight ? 'light' : 'dark');
    });
  }

  /* ============================================
     2. NAVBAR SCROLL EFFECT
     ============================================ */
  const navbar = document.querySelector('nav.navbar');
  window.addEventListener('scroll', () => {
    if (!navbar) return;
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  });

  /* ============================================
     3. ACTIVE NAV LINK ON SCROLL
     ============================================ */
  const sections = document.querySelectorAll('section[id], div[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  function updateActiveNav() {
    let current = '';
    sections.forEach((sec) => {
      if (window.scrollY >= sec.offsetTop - 100) current = sec.getAttribute('id');
    });
    navLinks.forEach((link) => {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + current) link.classList.add('active');
    });
  }

  window.addEventListener('scroll', updateActiveNav);
  updateActiveNav();

  /* ============================================
     4. GALLERY — MODAL with MULTI-COLOR NEON
     ============================================ */
  const thumbImgs    = document.querySelectorAll('.thumb-img');
  const previewArea  = document.getElementById('previewArea');
  const previewImage = document.getElementById('previewImage');
  const previewDesc  = document.getElementById('previewDesc');

  // Neon color palette
  const neonColors = [
    { line: '#00d4ff', glow: 'rgba(0,212,255,0.5)',   rgb: '0,212,255'   },
    { line: '#ff6b2b', glow: 'rgba(255,107,43,0.5)',  rgb: '255,107,43'  },
    { line: '#a855f7', glow: 'rgba(168,85,247,0.5)',  rgb: '168,85,247'  },
    { line: '#22c55e', glow: 'rgba(34,197,94,0.5)',   rgb: '34,197,94'   },
    { line: '#f59e0b', glow: 'rgba(245,158,11,0.5)',  rgb: '245,158,11'  },
    { line: '#ec4899', glow: 'rgba(236,72,153,0.5)',  rgb: '236,72,153'  },
    { line: '#06b6d4', glow: 'rgba(6,182,212,0.5)',   rgb: '6,182,212'   },
    { line: '#f43f5e', glow: 'rgba(244,63,94,0.5)',   rgb: '244,63,94'   },
    { line: '#8b5cf6', glow: 'rgba(139,92,246,0.5)',  rgb: '139,92,246'  },
    { line: '#10b981', glow: 'rgba(16,185,129,0.5)',  rgb: '16,185,129'  },
    { line: '#fbbf24', glow: 'rgba(251,191,36,0.5)',  rgb: '251,191,36'  },
    { line: '#e11d48', glow: 'rgba(225,29,72,0.5)',   rgb: '225,29,72'   },
    { line: '#38bdf8', glow: 'rgba(56,189,248,0.5)',  rgb: '56,189,248'  },
    { line: '#fb923c', glow: 'rgba(251,146,60,0.5)',  rgb: '251,146,60'  },
    { line: '#34d399', glow: 'rgba(52,211,153,0.5)',  rgb: '52,211,153'  },
    { line: '#c084fc', glow: 'rgba(192,132,252,0.5)', rgb: '192,132,252' },
    { line: '#facc15', glow: 'rgba(250,204,21,0.5)',  rgb: '250,204,21'  },
    { line: '#f472b6', glow: 'rgba(244,114,182,0.5)', rgb: '244,114,182' },
    { line: '#4ade80', glow: 'rgba(74,222,128,0.5)',  rgb: '74,222,128'  },
    { line: '#60a5fa', glow: 'rgba(96,165,250,0.5)',  rgb: '96,165,250'  },
  ];

  // Apply neon color per thumb card
  const thumbBoxes = document.querySelectorAll('.thumb-box');
  thumbBoxes.forEach((box, i) => {
    const c = neonColors[i % neonColors.length];
    box.style.setProperty('--card-neon', c.line);
    box.style.setProperty('--card-glow', c.glow);
    box.style.setProperty('--card-rgb',  c.rgb);
    const icon = box.querySelector('.plus-icon');
    if (icon) {
      icon.style.borderColor = c.line;
      icon.style.color       = c.line;
      icon.style.background  = `rgba(${c.rgb},0.1)`;
      icon.style.boxShadow   = `0 0 14px ${c.glow}`;
    }
  });

  document.querySelectorAll('.project-caption').forEach((cap, i) => {
    const c = neonColors[i % neonColors.length];
    cap.style.color       = c.line;
    cap.style.borderColor = `rgba(${c.rgb},0.25)`;
  });

  // Inject multi-color hover CSS
  const mStyle = document.createElement('style');
  mStyle.textContent = `
    .thumb-box { border: 1px solid rgba(0,212,255,0.15) !important; transition: border-color 0.3s, box-shadow 0.3s !important; }
    .thumb-box:hover { border-color: var(--card-neon, #00d4ff) !important; box-shadow: 0 0 24px var(--card-glow, rgba(0,212,255,0.4)) !important; }
    .thumb-box::before { content:''; position:absolute; top:0;left:0;right:0; height:2px; background:var(--card-neon,#00d4ff); transform:scaleX(0); transform-origin:left; transition:transform 0.3s; z-index:2; }
    .thumb-box:hover::before { transform:scaleX(1); }
    #galleryModal h4 { font-family:'Rajdhani',sans-serif; font-size:22px; margin-bottom:10px; letter-spacing:1px; transition:color 0.4s; }
    #galleryModal h5 { font-family:'Rajdhani',sans-serif; color:#eef2f8; font-size:16px; margin:14px 0 8px; }
    #galleryModal ul { padding-left:20px; color:#b1b8c0; line-height:1.9; }
    #galleryModal b  { color:#eef2f8; }
    #galleryModal p  { margin-bottom:10px; }
    .sw-card { border-color: rgba(var(--sw-rgb,0,212,255),0.2) !important; }
    .sw-card:hover { border-color: var(--sw-color,#00d4ff) !important; box-shadow: 0 0 18px rgba(var(--sw-rgb,0,212,255),0.3) !important; }
    .sw-card:hover .sw-logo-box { border-color: var(--sw-color,#00d4ff) !important; box-shadow: 0 0 12px rgba(var(--sw-rgb,0,212,255),0.3) !important; }
  `;
  document.head.appendChild(mStyle);

  // Modal DOM
  const modal = document.createElement('div');
  modal.id = 'galleryModal';
  modal.style.cssText = `display:none;position:fixed;inset:0;z-index:9999;background:rgba(0,0,0,0.92);align-items:center;justify-content:center;padding:20px;`;

  const modalInner = document.createElement('div');
  modalInner.style.cssText = `background:#131820;border:1px solid rgba(0,212,255,0.3);max-width:900px;width:100%;max-height:90vh;overflow-y:auto;display:flex;flex-direction:column;position:relative;transition:border-color 0.4s;`;

  const modalTopBar = document.createElement('div');
  modalTopBar.style.cssText = `height:3px;background:#00d4ff;box-shadow:0 0 14px #00d4ff;transition:all 0.4s;flex-shrink:0;`;

  const modalClose = document.createElement('button');
  modalClose.innerHTML = '&times;';
  modalClose.style.cssText = `position:absolute;top:10px;right:14px;background:transparent;border:none;color:#00d4ff;font-size:30px;cursor:pointer;line-height:1;z-index:2;transition:color 0.4s;`;

  const modalImg = document.createElement('img');
  modalImg.style.cssText = `width:100%;max-height:52vh;object-fit:contain;border-bottom:1px solid rgba(0,212,255,0.15);background:#0b0e14;`;

  const modalDesc = document.createElement('div');
  modalDesc.style.cssText = `padding:24px 28px;color:#b1b8c0;font-size:13px;line-height:1.85;font-family:'Exo 2',sans-serif;`;

  modalInner.appendChild(modalTopBar);
  modalInner.appendChild(modalClose);
  modalInner.appendChild(modalImg);
  modalInner.appendChild(modalDesc);
  modal.appendChild(modalInner);
  document.body.appendChild(modal);

  function openModal(src, desc, idx) {
    const c = neonColors[idx % neonColors.length];
    modalImg.src           = src;
    modalDesc.innerHTML    = desc || '';
    modal.style.display    = 'flex';
    document.body.style.overflow = 'hidden';
    modalTopBar.style.background = c.line;
    modalTopBar.style.boxShadow  = `0 0 16px ${c.glow}`;
    modalInner.style.borderColor = `rgba(${c.rgb},0.45)`;
    modalClose.style.color       = c.line;
    setTimeout(() => {
      const h4 = modalDesc.querySelector('h4');
      if (h4) { h4.style.color = c.line; h4.style.textShadow = `0 0 10px ${c.glow}`; }
    }, 20);
  }

  function closeModal() {
    modal.style.display = 'none';
    document.body.style.overflow = '';
    modalImg.src = '';
  }

  modalClose.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });

  thumbImgs.forEach((img, i) => {
    img.addEventListener('click', () => {
      const full = img.dataset.full || img.src;
      const desc = img.dataset.desc || '';
      if (previewArea && previewImage && previewDesc) {
        previewImage.src = full;
        previewDesc.innerHTML = desc;
        previewArea.classList.remove('d-none');
        previewArea.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      openModal(full, desc, i);
    });
  });

  /* ============================================
     5. ANIMATED STAT COUNTERS
     ============================================ */
  function animateCount(el, target, suffix, duration) {
    const start = performance.now();
    function tick(now) {
      const t    = Math.min((now - start) / duration, 1);
      const ease = 1 - Math.pow(1 - t, 4);
      el.textContent = Math.round(ease * target) + suffix;
      if (t < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const el     = entry.target;
        const target = parseFloat(el.dataset.target || '0');
        const suffix = el.dataset.suffix || '';
        animateCount(el, target, suffix, 1600);
        counterObserver.unobserve(el);
      }
    });
  }, { threshold: 0.6 });

  document.querySelectorAll('.stat-num[data-target]').forEach((el) =>
    counterObserver.observe(el)
  );

  /* ============================================
     6. SCROLL REVEAL
     ============================================ */
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const siblings = Array.from(entry.target.parentElement.querySelectorAll('.reveal'));
          const idx = siblings.indexOf(entry.target);
          entry.target.style.transitionDelay = (idx * 80) + 'ms';
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -30px 0px' }
  );
  document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el));

  /* ============================================
     7. CANVAS — MEP LOGO SHAPE (C.png style)
        Simbol pompa/filter MEP:
        - Tabung silinder (badan)
        - Oval atas & bawah
        - Centerline putus-putus
        - Pipa keluar atas & bawah
        - Polyline circuit background
     ============================================ */
  const canvas = document.getElementById('circuit-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let W, H, t = 0, scanY = 0;

    const bgNodesDef = [
      [0.05, 0.28], [0.22, 0.28], [0.22, 0.10], [0.48, 0.10],
      [0.48, 0.20], [0.88, 0.20],
      [0.88, 0.78], [0.48, 0.78], [0.48, 0.68],
      [0.22, 0.68], [0.22, 0.50], [0.05, 0.50],
      [0.92, 0.08], [0.92, 0.38],
      [0.08, 0.88], [0.35, 0.88],
    ];
    const bgEdges = [
      [0,1],[1,2],[2,3],[3,4],[4,5],
      [5,12],[12,13],
      [4,8],[8,7],[7,6],[6,5],
      [8,9],[9,10],[10,11],[10,1],
      [11,14],[14,15],
    ];

    function resize() {
      W = canvas.width  = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
    }

    function bgPts() {
      return bgNodesDef.map(([x, y]) => ({ x: x * W, y: y * H }));
    }

    // Draw MEP pump/filter logo (C.png shape)
    function drawMEPLogo(cx, cy, s) {
      const bodyW  = 80 * s;
      const bodyH  = 170 * s;
      const bodyY  = cy - bodyH / 2;
      const rx     = bodyW / 2;
      const ovalRY = 20 * s;
      const alpha  = 0.78 + 0.15 * Math.sin(t * 1.4);

      ctx.shadowColor = '#00d4ff';
      ctx.shadowBlur  = 20;
      ctx.strokeStyle = `rgba(0,212,255,${alpha})`;
      ctx.lineWidth   = 2.2 * s;

      // LEFT body wall
      ctx.beginPath();
      ctx.moveTo(cx - rx, bodyY + ovalRY * 0.5);
      ctx.lineTo(cx - rx, bodyY + bodyH - ovalRY * 0.5);
      ctx.stroke();

      // RIGHT body wall
      ctx.beginPath();
      ctx.moveTo(cx + rx, bodyY + ovalRY * 0.5);
      ctx.lineTo(cx + rx, bodyY + bodyH - ovalRY * 0.5);
      ctx.stroke();

      // TOP oval
      ctx.beginPath();
      ctx.ellipse(cx, bodyY, rx, ovalRY, 0, 0, Math.PI * 2);
      ctx.stroke();

      // BOTTOM oval
      ctx.beginPath();
      ctx.ellipse(cx, bodyY + bodyH, rx, ovalRY, 0, 0, Math.PI * 2);
      ctx.stroke();

      // CENTERLINE dashed
      ctx.shadowBlur  = 8;
      ctx.strokeStyle = `rgba(0,212,255,${alpha * 0.7})`;
      ctx.lineWidth   = 1.5 * s;
      ctx.setLineDash([7 * s, 5 * s]);
      ctx.beginPath();
      ctx.moveTo(cx, bodyY + ovalRY);
      ctx.lineTo(cx, bodyY + bodyH - ovalRY);
      ctx.stroke();
      ctx.setLineDash([]);

      // PIPE TOP
      ctx.shadowBlur  = 16;
      ctx.strokeStyle = `rgba(0,212,255,${alpha})`;
      ctx.lineWidth   = 2.5 * s;
      ctx.beginPath();
      ctx.moveTo(cx, bodyY - ovalRY);
      ctx.lineTo(cx, bodyY - 55 * s);
      ctx.stroke();

      // PIPE BOTTOM
      ctx.beginPath();
      ctx.moveTo(cx, bodyY + bodyH + ovalRY);
      ctx.lineTo(cx, bodyY + bodyH + 55 * s);
      ctx.stroke();

      // PIPE endpoint nodes
      ctx.fillStyle  = '#00d4ff';
      ctx.shadowBlur = 14;
      [bodyY - 55 * s, bodyY + bodyH + 55 * s].forEach((py) => {
        ctx.beginPath();
        ctx.arc(cx, py, 4.5 * s, 0, Math.PI * 2);
        ctx.fill();
      });

      // MEP label
      ctx.shadowBlur    = 12;
      ctx.fillStyle     = `rgba(0,212,255,${alpha})`;
      ctx.font          = `600 ${13 * s}px 'Share Tech Mono', monospace`;
      ctx.textAlign     = 'center';
      ctx.textBaseline  = 'middle';
      ctx.fillText('MEP', cx, cy);

      ctx.shadowBlur = 0;
    }

    function draw() {
      ctx.clearRect(0, 0, W, H);

      // Background grid
      ctx.strokeStyle = 'rgba(0,212,255,0.04)';
      ctx.lineWidth   = 0.5;
      for (let x = 0; x < W; x += 55) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke();
      }
      for (let y = 0; y < H; y += 55) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke();
      }

      // Background polyline circuit
      const pts = bgPts();
      ctx.strokeStyle = 'rgba(0,212,255,0.38)';
      ctx.lineWidth   = 1;
      ctx.shadowColor = '#00d4ff';
      ctx.shadowBlur  = 5;
      bgEdges.forEach(([a, b]) => {
        ctx.beginPath();
        ctx.moveTo(pts[a].x, pts[a].y);
        ctx.lineTo(pts[b].x, pts[b].y);
        ctx.stroke();
      });

      ctx.fillStyle  = '#00d4ff';
      ctx.shadowBlur = 8;
      pts.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, 3, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.shadowBlur = 0;

      // MEP logo (C.png style) — right-center area
      const logoX = W * 0.70;
      const logoY = H * 0.50;
      const scale = Math.max(0.5, Math.min(Math.min(W, H) / 500, 1.15));
      drawMEPLogo(logoX, logoY, scale);

      // Scanning line
      ctx.strokeStyle = 'rgba(0,212,255,0.22)';
      ctx.lineWidth   = 0.8;
      ctx.beginPath(); ctx.moveTo(0, scanY); ctx.lineTo(W, scanY); ctx.stroke();
      scanY = (scanY + 1.2) % H;

      t += 0.016;
      requestAnimationFrame(draw);
    }

    resize();
    window.addEventListener('resize', resize);
    draw();
  }

  /* ============================================
     8. SMOOTH SCROLL
     ============================================ */
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        window.scrollTo({ top: target.offsetTop - 70, behavior: 'smooth' });
      }
    });
  });

  /* ============================================
     9. BUTTON CLICK FEEDBACK
     ============================================ */
  document.querySelectorAll('.btn-primary, .btn-neon-primary, .btn-neon-outline, #theme-toggle').forEach((btn) => {
    btn.addEventListener('click', function () {
      this.style.transform = 'scale(0.96)';
      setTimeout(() => { this.style.transform = ''; }, 180);
    });
  });

  /* ============================================
     10. SW-CARD MULTI-COLOR
     ============================================ */
  const swPalette = [
    { color:'#00d4ff', rgb:'0,212,255'   },
    { color:'#a855f7', rgb:'168,85,247'  },
    { color:'#22c55e', rgb:'34,197,94'   },
    { color:'#f59e0b', rgb:'245,158,11'  },
    { color:'#ec4899', rgb:'236,72,153'  },
    { color:'#ff6b2b', rgb:'255,107,43'  },
    { color:'#06b6d4', rgb:'6,182,212'   },
    { color:'#f43f5e', rgb:'244,63,94'   },
    { color:'#8b5cf6', rgb:'139,92,246'  },
    { color:'#10b981', rgb:'16,185,129'  },
    { color:'#fbbf24', rgb:'251,191,36'  },
    { color:'#e11d48', rgb:'225,29,72'   },
  ];
  document.querySelectorAll('.sw-card').forEach((card, i) => {
    const c = swPalette[i % swPalette.length];
    card.style.setProperty('--sw-color', c.color);
    card.style.setProperty('--sw-rgb',   c.rgb);
    const icon = card.querySelector('.sw-logo-fallback i, .sw-logo-fallback');
    if (icon) icon.style.color = c.color;
    const name = card.querySelector('.sw-name');
    if (name) name.style.color = c.color;
  });

})();
