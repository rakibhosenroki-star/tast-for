/**
 * ALEX MORGAN — FUTURISTIC PORTFOLIO
 * Main Application Orchestrator & Interactive Behaviors
 */

document.addEventListener('DOMContentLoaded', () => {
  initPreloader();
  initCustomCursor();
  initTypewriter();
  init3DTilt();
  initAboutTerminal();
  initStatsCounter();
  initSkills();
  initProjects();
  initNavigation();
  initAudioToggle();
  initModals();
  initScrollReveal();
});

/* ==========================================================================
   1. Preloader Boot Sequence
   ========================================================================== */
function initPreloader() {
  const loader = document.getElementById('loader-screen');
  const bar = document.getElementById('loader-progress-bar');
  const percentText = document.getElementById('loader-percentage');
  const statusText = document.getElementById('loader-status-text');

  if (!loader || !bar) return;

  const steps = [
    { pct: 20, status: "INITIALIZING QUANTUM CORE..." },
    { pct: 45, status: "CALIBRATING WEBGL SHADERS..." },
    { pct: 75, status: "SYNCHRONIZING AI REPOSITORIES..." },
    { pct: 90, status: "ESTABLISHING NEURAL INTERFACE..." },
    { pct: 100, status: "ALEX_MORGAN_OS: READY" }
  ];

  let currentStep = 0;

  function advance() {
    if (currentStep < steps.length) {
      const step = steps[currentStep];
      bar.style.width = step.pct + "%";
      if (percentText) percentText.textContent = step.pct + "%";
      if (statusText) statusText.textContent = step.status;
      currentStep++;
      setTimeout(advance, currentStep === steps.length ? 300 : 220);
    } else {
      setTimeout(() => {
        loader.classList.add('loaded');
        // Trigger initial reveal animations
        revealElementsOnScreen();
      }, 350);
    }
  }

  advance();

  // Allow clicking anywhere to skip
  loader.addEventListener('click', () => {
    loader.classList.add('loaded');
    revealElementsOnScreen();
  });
}

/* ==========================================================================
   2. Custom Dual-Layer Futuristic Cursor
   ========================================================================== */
function initCustomCursor() {
  // Only activate if device supports fine pointer (mouse)
  if (!window.matchMedia('(pointer: fine)').matches) return;

  document.body.classList.add('has-custom-cursor');

  const dot = document.createElement('div');
  dot.className = 'cursor-dot';
  const ring = document.createElement('div');
  ring.className = 'cursor-ring';

  document.body.appendChild(dot);
  document.body.appendChild(ring);

  let mouseX = -100;
  let mouseY = -100;
  let ringX = -100;
  let ringY = -100;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
  });

  function renderRing() {
    // Smooth lerp
    ringX += (mouseX - ringX) * 0.18;
    ringY += (mouseY - ringY) * 0.18;
    ring.style.transform = `translate(${ringX}px, ${ringY}px)`;
    requestAnimationFrame(renderRing);
  }
  requestAnimationFrame(renderRing);

  // Hover detection for interactive targets
  const interactiveSelectors = 'a, button, .project-card, .skill-card, .stat-card, .pillar-card, .terminal-tab, input, textarea, .copy-trigger';

  document.addEventListener('mouseover', (e) => {
    if (e.target.closest(interactiveSelectors)) {
      ring.classList.add('active');
      if (window.cyberAudio) window.cyberAudio.play('hover');
    }
  });

  document.addEventListener('mouseout', (e) => {
    if (e.target.closest(interactiveSelectors)) {
      ring.classList.remove('active');
    }
  });

  document.addEventListener('mousedown', () => {
    ring.style.transform += ' scale(0.85)';
    if (window.cyberAudio) window.cyberAudio.play('click');
  });

  document.addEventListener('mouseup', () => {
    ring.style.transform = ring.style.transform.replace(' scale(0.85)', '');
  });
}

/* ==========================================================================
   3. Dynamic Cycling Typewriter
   ========================================================================== */
function initTypewriter() {
  const target = document.getElementById('typewriter-text');
  if (!target) return;

  const titles = [
    "Full-Stack Developer",
    "Creative Technologist",
    "Vibe Coding Expert",
    "AI Automation Specialist",
    "Digital Experience Creator"
  ];

  let titleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 70;

  function type() {
    const currentTitle = titles[titleIndex];

    if (isDeleting) {
      charIndex--;
      target.textContent = currentTitle.substring(0, charIndex);
      typingSpeed = 35;
    } else {
      charIndex++;
      target.textContent = currentTitle.substring(0, charIndex);
      typingSpeed = 75;
    }

    if (!isDeleting && charIndex === currentTitle.length) {
      // Pause at full word
      isDeleting = true;
      typingSpeed = 2000;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      titleIndex = (titleIndex + 1) % titles.length;
      typingSpeed = 400;
    }

    setTimeout(type, typingSpeed);
  }

  type();
}

/* ==========================================================================
   4. 3D Tilt Parallax on Holographic Elements
   ========================================================================== */
function init3DTilt() {
  const tiltCards = document.querySelectorAll('.hologram-card, .pillar-card, .project-card');

  tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -8;
      const rotateY = ((x - centerX) / centerX) * 8;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)`;
    });
  });
}

/* ==========================================================================
   5. Interactive About Terminal Tabs
   ========================================================================== */
function initAboutTerminal() {
  const tabs = document.querySelectorAll('.terminal-tab');
  const codePre = document.getElementById('terminal-code-content');
  if (!tabs.length || !codePre) return;

  const contentMap = {
    'bio': `/**
 * @file alex.bio.ts
 * @author Alex Morgan
 * @status Online // Available for Contracts & Roles
 */

export const alexMorgan: DeveloperProfile = {
  name: "Alex Morgan",
  title: "Full-Stack Developer & Creative Technologist",
  location: "San Francisco, CA // Neo-Tokyo // Global Remote",
  experienceYears: 3+,
  corePhilosophy: "Aesthetics as function, AI as multiplier, code as architecture.",
  
  specializations: [
    "Full-Stack Web Development",
    "Generative AI & Autonomous Agent Pipelines",
    "Vibe Coding & Creative WebGL Experiences",
    "High-Performance Cloud Architecture"
  ],

  activeStatus: "OPERATIONAL_AND_SEEKING_VISIONARY_PROJECTS"
};`,

    'stack': `/**
 * @file stack.json
 * Primary Production Technologies
 */

{
  "frontend": ["React 19", "Next.js 15", "TypeScript", "Tailwind CSS", "Three.js", "WebGL"],
  "backend": ["Node.js", "Python / FastAPI", "PostgreSQL", "Redis", "GraphQL", "Docker"],
  "ai_agentic": ["LangChain", "OpenAI API", "Anthropic Claude", "Pinecone Vector DB", "n8n"],
  "devops_edge": ["Cloudflare Workers", "AWS Lambda", "Vercel", "GitHub Actions CI/CD"],
  "metrics": {
    "test_coverage": "99.8%",
    "avg_lighthouse": "98/100",
    "latency_sla": "<20ms"
  }
}`,

    'philosophy': `/**
 * @file mission.md
 * Engineering & Design Manifesto
 */

# THE DIGITAL CRAFTSMAN MANIFESTO

1. Code is not merely logic; it is human-machine interface poetry.
2. Vibe Coding represents the friction-free translation of human imagination into production realities.
3. Artificial Intelligence does not replace developers; it elevates the developer into an architect of autonomous systems.
4. Glassmorphism and cyberpunk aesthetics ground futuristic utility in tactile, delightful clarity.`,

    'telemetry': `/**
 * @file telemetry.log
 * System Realtime Diagnostics
 */

[01:43:15] SYSTEM BOOTSTRAP INITIALIZED
[01:43:16] CONNECTED TO GLOBAL EDGE MESH (310 POPs)
[01:43:17] LATENCY: 12.4ms // PACKET LOSS: 0.00%
[01:43:18] COMPILING HIGH-DPI NEURAL SHADERS... DONE
[01:43:19] MEMORY ALLOCATION: OPTIMAL (60 FPS STABLE)
[01:43:20] ALL SYSTEMS VERIFIED // AWAITING USER COMMAND`
  };

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const fileKey = tab.getAttribute('data-tab');
      if (contentMap[fileKey]) {
        codePre.textContent = contentMap[fileKey];
        if (window.cyberAudio) window.cyberAudio.play('click');
      }
    });
  });
}

/* ==========================================================================
   6. Animated Statistics Counter on Scroll
   ========================================================================== */
function initStatsCounter() {
  const statNumbers = document.querySelectorAll('.stat-number');
  if (!statNumbers.length) return;

  let hasAnimated = false;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !hasAnimated) {
        hasAnimated = true;
        statNumbers.forEach(stat => {
          const target = parseFloat(stat.getAttribute('data-target'));
          const suffix = stat.getAttribute('data-suffix') || '';
          const isDecimal = target % 1 !== 0;

          let count = 0;
          const duration = 1800; // ms
          const stepTime = 25;
          const totalSteps = duration / stepTime;
          const increment = target / totalSteps;

          const timer = setInterval(() => {
            count += increment;
            if (count >= target) {
              count = target;
              clearInterval(timer);
            }
            stat.textContent = (isDecimal ? count.toFixed(1) : Math.floor(count)) + suffix;
          }, stepTime);
        });
      }
    });
  }, { threshold: 0.4 });

  const statsSection = document.getElementById('stats-counter-grid');
  if (statsSection) {
    observer.observe(statsSection);
  }
}

/* ==========================================================================
   7. Interactive Skills Rendering & Filtering
   ========================================================================== */
function initSkills() {
  const container = document.getElementById('skills-grid-container');
  const tabs = document.querySelectorAll('.skill-tab-btn');
  if (!container) return;

  const skillsData = [
    // Frontend
    { name: "React 19 & Next.js 15", category: "frontend", level: "Mastery", percent: 96, icon: "⚛️", exp: "3+ Years" },
    { name: "TypeScript / Modern ES6+", category: "frontend", level: "Mastery", percent: 94, icon: "📘", exp: "3+ Years" },
    { name: "Three.js & WebGL 3D", category: "frontend", level: "Specialist", percent: 88, icon: "🌐", exp: "2+ Years" },
    { name: "Tailwind CSS & Glassmorphism", category: "frontend", level: "Mastery", percent: 98, icon: "🎨", exp: "3+ Years" },
    { name: "HTML5 Canvas & Shaders", category: "frontend", level: "Advanced", percent: 86, icon: "✨", exp: "2+ Years" },
    
    // Backend
    { name: "Node.js & Express / Fastify", category: "backend", level: "Mastery", percent: 92, icon: "🟢", exp: "3+ Years" },
    { name: "Python & FastAPI", category: "backend", level: "Advanced", percent: 89, icon: "🐍", exp: "2.5 Years" },
    { name: "PostgreSQL & Prisma", category: "backend", level: "Advanced", percent: 90, icon: "🐘", exp: "3+ Years" },
    { name: "Redis Caching & Streams", category: "backend", level: "Advanced", percent: 87, icon: "⚡", exp: "2+ Years" },
    { name: "GraphQL & RESTful APIs", category: "backend", level: "Mastery", percent: 94, icon: "🔗", exp: "3+ Years" },

    // AI & Automation
    { name: "LangChain & Multi-Agents", category: "ai", level: "Specialist", percent: 93, icon: "🤖", exp: "2+ Years" },
    { name: "OpenAI & Claude APIs", category: "ai", level: "Mastery", percent: 95, icon: "🧠", exp: "2+ Years" },
    { name: "Vector DBs (Pinecone/Chroma)", category: "ai", level: "Advanced", percent: 88, icon: "📐", exp: "1.5 Years" },
    { name: "n8n & Workflow Automation", category: "ai", level: "Mastery", percent: 92, icon: "⚙️", exp: "2+ Years" },

    // UI/UX Design
    { name: "Figma & Design Systems", category: "design", level: "Mastery", percent: 94, icon: "🎯", exp: "3+ Years" },
    { name: "Cyberpunk & Glassmorphism UI", category: "design", level: "Specialist", percent: 96, icon: "💎", exp: "3+ Years" },
    { name: "Micro-Interactions & Motion", category: "design", level: "Advanced", percent: 90, icon: "🪄", exp: "2.5 Years" },

    // Tools & DevOps
    { name: "Docker & Containerization", category: "tools", level: "Advanced", percent: 86, icon: "🐳", exp: "2+ Years" },
    { name: "Git, GitHub & CI/CD Pipelines", category: "tools", level: "Mastery", percent: 95, icon: "🐙", exp: "3+ Years" },
    { name: "Cloudflare Workers & Vercel Edge", category: "tools", level: "Mastery", percent: 92, icon: "☁️", exp: "2.5 Years" }
  ];

  function renderSkills(category = 'all') {
    const filtered = category === 'all' 
      ? skillsData 
      : skillsData.filter(s => s.category === category);

    container.innerHTML = filtered.map(skill => `
      <div class="skill-card reveal-element">
        <div class="skill-header">
          <div class="skill-identity">
            <div class="skill-icon-wrap">${skill.icon}</div>
            <div>
              <div class="skill-name">${skill.name}</div>
              <div class="skill-category-tag">${skill.category.toUpperCase()}</div>
            </div>
          </div>
          <span class="skill-level-badge">${skill.level}</span>
        </div>
        <div class="skill-bar-container">
          <div class="skill-bar-fill" style="width: ${skill.percent}%;"></div>
        </div>
        <div class="skill-footer">
          <span>Proficiency: ${skill.percent}%</span>
          <span>${skill.exp}</span>
        </div>
      </div>
    `).join('');

    revealElementsOnScreen();
  }

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const cat = tab.getAttribute('data-skill-filter');
      renderSkills(cat);
      if (window.cyberAudio) window.cyberAudio.play('click');
    });
  });

  renderSkills('all');
}

/* ==========================================================================
   8. Interactive Projects Rendering & Filtering
   ========================================================================== */
function initProjects() {
  const container = document.getElementById('projects-grid-container');
  const tabs = document.querySelectorAll('.project-tab-btn');
  if (!container || !window.PORTFOLIO_PROJECTS) return;

  function renderProjects(category = 'all') {
    const filtered = category === 'all'
      ? window.PORTFOLIO_PROJECTS
      : window.PORTFOLIO_PROJECTS.filter(p => p.category === category);

    container.innerHTML = filtered.map(project => `
      <div class="project-card reveal-element" data-project-id="${project.id}">
        <div class="project-thumb-wrapper">
          ${window.generateProjectSvg(project.svgType, project.title)}
          <div class="project-badge-overlay">
            <span class="project-tag-pill">${project.badge}</span>
            <span class="project-year-pill">${project.year}</span>
          </div>
        </div>
        <div class="project-body">
          <h3 class="project-title">${project.title}</h3>
          <p class="project-description">${project.shortDesc}</p>
          <div class="project-tech-stack">
            ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
          </div>
          <div class="project-actions">
            <button class="btn btn-secondary btn-sm inspect-project-btn" data-id="${project.id}">
              <span>🔍 Case Study</span>
            </button>
            <button class="btn btn-primary btn-sm live-demo-btn" data-id="${project.id}">
              <span>⚡ Live Demo</span>
            </button>
            <button class="btn btn-secondary btn-sm source-code-btn" data-id="${project.id}">
              <span>💻 Code</span>
            </button>
          </div>
        </div>
      </div>
    `).join('');

    // Attach button listeners
    container.querySelectorAll('.inspect-project-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        openCaseStudyModal(id);
      });
    });

    container.querySelectorAll('.live-demo-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        openLiveDemoModal(id);
      });
    });

    container.querySelectorAll('.source-code-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        openSourceCodeModal(id);
      });
    });

    revealElementsOnScreen();
  }

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const cat = tab.getAttribute('data-project-filter');
      renderProjects(cat);
      if (window.cyberAudio) window.cyberAudio.play('click');
    });
  });

  renderProjects('all');
}

/* ==========================================================================
   9. Navigation Spy & Sticky Header & Mobile Drawer
   ========================================================================== */
function initNavigation() {
  const header = document.querySelector('.nav-header');
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  const mobileToggle = document.getElementById('mobile-menu-toggle');
  const mobileDrawer = document.getElementById('mobile-drawer');
  const mobileBackdrop = document.getElementById('mobile-drawer-backdrop');
  const mobileClose = document.getElementById('mobile-drawer-close');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  // Sticky header background
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // Active Section Spy
    let currentId = '';
    const scrollPosition = window.scrollY + 200;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollPosition >= top && scrollPosition < top + height) {
        currentId = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentId}`) {
        link.classList.add('active');
      }
    });
  });

  // Mobile drawer controls
  if (mobileToggle && mobileDrawer && mobileBackdrop) {
    function openDrawer() {
      mobileDrawer.classList.add('open');
      mobileBackdrop.classList.add('open');
      if (window.cyberAudio) window.cyberAudio.play('open');
    }

    function closeDrawer() {
      mobileDrawer.classList.remove('open');
      mobileBackdrop.classList.remove('open');
      if (window.cyberAudio) window.cyberAudio.play('close');
    }

    mobileToggle.addEventListener('click', openDrawer);
    if (mobileClose) mobileClose.addEventListener('click', closeDrawer);
    mobileBackdrop.addEventListener('click', closeDrawer);

    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        closeDrawer();
      });
    });
  }
}

/* ==========================================================================
   10. Audio Toggle Control
   ========================================================================== */
function initAudioToggle() {
  const btn = document.getElementById('sound-toggle-btn');
  if (!btn) return;

  btn.addEventListener('click', () => {
    if (window.cyberAudio) {
      const isEnabled = window.cyberAudio.toggle();
      btn.classList.toggle('sound-on', isEnabled);
      btn.innerHTML = isEnabled 
        ? '<span title="Audio FX: Active">🔊</span>' 
        : '<span title="Audio FX: Muted">🔇</span>';

      if (window.showToast) {
        window.showToast(
          isEnabled ? 'AUDIO FX ACTIVE' : 'AUDIO FX MUTED',
          isEnabled ? 'Procedural Web Audio feedback enabled.' : 'Sound effects muted.'
        );
      }
    }
  });
}

/* ==========================================================================
   11. Interactive Modals (Case Study, Live Demo, Source Code, Resume)
   ========================================================================== */
function initModals() {
  const backdrop = document.getElementById('global-modal-backdrop');
  const modalContent = document.getElementById('global-modal-content');
  const closeBtn = document.getElementById('global-modal-close');

  if (!backdrop || !modalContent) return;

  function closeModal() {
    backdrop.classList.remove('active');
    if (window.cyberAudio) window.cyberAudio.play('close');
  }

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  backdrop.addEventListener('click', (e) => {
    if (e.target === backdrop) closeModal();
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && backdrop.classList.contains('active')) {
      closeModal();
    }
  });

  // Global functions for opening modals
  window.openCaseStudyModal = function(projectId) {
    const project = window.PORTFOLIO_PROJECTS.find(p => p.id === projectId);
    if (!project) return;

    modalContent.innerHTML = `
      <div class="modal-inner-padding">
        <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 12px;">
          <span class="project-tag-pill">${project.badge}</span>
          <span class="project-year-pill">${project.year} ARCHITECTURE</span>
        </div>
        <h2 style="font-family: var(--font-display); font-size: 2.2rem; color: var(--text-white); margin-bottom: 6px;">
          ${project.title}
        </h2>
        <p style="color: var(--secondary-cyan); font-family: var(--font-mono); font-size: 0.95rem; margin-bottom: 24px;">
          // ${project.tagline}
        </p>

        <div style="border-radius: var(--border-radius-md); overflow: hidden; margin-bottom: 28px; border: 1px solid var(--border-cyan-subtle);">
          ${window.generateProjectSvg(project.svgType, project.title)}
        </div>

        <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; margin-bottom: 28px;">
          ${project.metrics.map(m => `
            <div style="background: rgba(255,255,255,0.03); border: 1px solid var(--border-glass); border-radius: 8px; padding: 14px; text-align: center;">
              <div style="font-family: var(--font-display); font-size: 1.4rem; font-weight: 800; color: var(--secondary-cyan);">${m.value}</div>
              <div style="font-family: var(--font-mono); font-size: 0.72rem; color: var(--text-muted); text-transform: uppercase;">${m.label}</div>
            </div>
          `).join('')}
        </div>

        <h3 style="font-family: var(--font-display); font-size: 1.2rem; color: var(--text-white); margin-bottom: 12px;">
          System Overview & Architecture
        </h3>
        <p style="font-size: 0.98rem; color: var(--text-secondary); line-height: 1.8; margin-bottom: 24px;">
          ${project.fullDesc}
        </p>

        <h3 style="font-family: var(--font-display); font-size: 1.2rem; color: var(--text-white); margin-bottom: 14px;">
          Key Engineering Capabilities
        </h3>
        <ul style="margin-bottom: 28px;">
          ${project.features.map(f => `
            <li style="position: relative; padding-left: 24px; color: var(--text-secondary); margin-bottom: 10px; font-size: 0.95rem;">
              <span style="position: absolute; left: 0; color: var(--secondary-cyan);">✦</span> ${f}
            </li>
          `).join('')}
        </ul>

        <div style="display: flex; gap: 14px; flex-wrap: wrap;">
          <button class="btn btn-primary" onclick="openLiveDemoModal('${project.id}')">
            <span>⚡ Launch Live Demo Simulation</span>
          </button>
          <button class="btn btn-secondary" onclick="openSourceCodeModal('${project.id}')">
            <span>💻 View Source Code & Schema</span>
          </button>
        </div>
      </div>
    `;

    backdrop.classList.add('active');
    if (window.cyberAudio) window.cyberAudio.play('open');
  };

  window.openLiveDemoModal = function(projectId) {
    const project = window.PORTFOLIO_PROJECTS.find(p => p.id === projectId);
    if (!project) return;

    modalContent.innerHTML = `
      <div class="modal-inner-padding">
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px;">
          <div>
            <span class="project-tag-pill">LIVE SANDBOX SIMULATION</span>
            <h2 style="font-family: var(--font-display); font-size: 1.8rem; color: var(--text-white); margin-top: 8px;">
              ${project.title} — Runtime Sandbox
            </h2>
          </div>
          <div style="display: flex; align-items: center; gap: 8px; font-family: var(--font-mono); font-size: 0.8rem; color: #10B981;">
            <span class="status-dot"></span> LIVE 60 FPS
          </div>
        </div>

        <div style="background: #04060A; border: 1px solid var(--border-cyan-subtle); border-radius: 8px; padding: 24px; margin-bottom: 24px; position: relative; min-height: 280px; display: flex; flex-direction: column; justify-content: center; align-items: center; text-align: center;">
          <div style="width: 60px; height: 60px; border-radius: 50%; background: rgba(0,229,255,0.1); border: 1.5px solid var(--secondary-cyan); display: flex; align-items: center; justify-content: center; font-size: 1.8rem; margin-bottom: 16px; box-shadow: var(--glow-cyan-md);">
            🚀
          </div>
          <h4 style="font-family: var(--font-display); font-size: 1.25rem; color: var(--text-white); margin-bottom: 8px;">
            Interactive Micro-Instance Active
          </h4>
          <p style="color: var(--text-secondary); max-width: 480px; font-size: 0.92rem; margin-bottom: 20px;">
            Telemetry streaming active across simulated edge cluster. WebSockets established with 0 dropped frames.
          </p>
          <div style="display: flex; gap: 10px;">
            <button class="btn btn-secondary btn-sm" onclick="triggerSimulatedEvent('Agent Dispatched')">
              <span>▶ Run Pipeline Agent</span>
            </button>
            <button class="btn btn-secondary btn-sm" onclick="triggerSimulatedEvent('Vector Cache Flushed')">
              <span>🔄 Invalidate Cache</span>
            </button>
            <button class="btn btn-primary btn-sm" onclick="triggerSimulatedEvent('Benchmark Passed (<12ms)')">
              <span>⚡ Benchmark</span>
            </button>
          </div>
          <div id="sim-log-output" style="margin-top: 20px; font-family: var(--font-mono); font-size: 0.78rem; color: var(--secondary-cyan); background: rgba(0,0,0,0.5); padding: 8px 16px; border-radius: 4px; border: 1px solid rgba(255,255,255,0.06); width: 100%; max-width: 520px;">
            [STATUS]: Instance running. Select an action above to transmit telemetry.
          </div>
        </div>

        <div style="display: flex; justify-content: flex-end;">
          <button class="btn btn-secondary" onclick="document.getElementById('global-modal-close').click()">
            <span>Close Simulation</span>
          </button>
        </div>
      </div>
    `;

    backdrop.classList.add('active');
    if (window.cyberAudio) window.cyberAudio.play('open');
  };

  window.triggerSimulatedEvent = function(eventName) {
    const log = document.getElementById('sim-log-output');
    if (log) {
      const timestamp = new Date().toISOString().substring(11, 19);
      log.textContent = `[${timestamp}] EVENT: ${eventName} // ACK 200 OK (Latency: ${Math.floor(Math.random() * 8 + 8)}ms)`;
    }
    if (window.cyberAudio) window.cyberAudio.play('success');
  };

  window.openSourceCodeModal = function(projectId) {
    const project = window.PORTFOLIO_PROJECTS.find(p => p.id === projectId);
    if (!project) return;

    modalContent.innerHTML = `
      <div class="modal-inner-padding">
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px;">
          <div>
            <span class="project-tag-pill">REPOSITORY INSPECTOR</span>
            <h2 style="font-family: var(--font-display); font-size: 1.8rem; color: var(--text-white); margin-top: 8px;">
              github.com/alexmorgan/${project.id}
            </h2>
          </div>
          <button class="btn btn-secondary btn-sm copy-trigger" data-copy="https://github.com/alexmorgan/${project.id}" data-label="Repo URL">
            <span>📋 Copy Git URL</span>
          </button>
        </div>

        <div class="terminal-window" style="margin-bottom: 24px;">
          <div class="terminal-header">
            <div class="terminal-dots">
              <span class="terminal-dot red"></span>
              <span class="terminal-dot yellow"></span>
              <span class="terminal-dot green"></span>
            </div>
            <span class="terminal-title">README.md — branch: main</span>
          </div>
          <div class="terminal-body" style="max-height: 280px;">
<pre>
# ${project.title}
> ${project.tagline}

## Architecture Stack
${project.technologies.map(t => `- ${t}`).join('\n')}

## Metrics & SLA
${project.metrics.map(m => `- **${m.label}**: ${m.value}`).join('\n')}

## Quick Start
\`\`\`bash
git clone https://github.com/alexmorgan/${project.id}.git
cd ${project.id}
pnpm install
pnpm dev --turbo
\`\`\`
</pre>
          </div>
        </div>

        <div style="display: flex; justify-content: space-between; align-items: center;">
          <span style="font-family: var(--font-mono); font-size: 0.8rem; color: var(--text-muted);">
            License: MIT // Architecture Verified
          </span>
          <button class="btn btn-secondary" onclick="document.getElementById('global-modal-close').click()">
            <span>Close Repository</span>
          </button>
        </div>
      </div>
    `;

    backdrop.classList.add('active');
    if (window.cyberAudio) window.cyberAudio.play('open');
  };

  window.openResumeModal = function() {
    modalContent.innerHTML = `
      <div class="modal-inner-padding">
        <div style="display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid var(--border-glass); padding-bottom: 18px; margin-bottom: 24px;">
          <div>
            <h2 style="font-family: var(--font-display); font-size: 1.9rem; color: var(--text-white);">Alex Morgan</h2>
            <div style="color: var(--secondary-cyan); font-family: var(--font-mono); font-size: 0.9rem;">
              Full-Stack Developer & Creative Technologist
            </div>
          </div>
          <button class="btn btn-primary btn-sm" onclick="window.print()">
            <span>🖨️ Print / Save PDF</span>
          </button>
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px; margin-bottom: 24px;">
          <div>
            <h4 style="font-family: var(--font-display); color: var(--secondary-cyan); margin-bottom: 8px;">Experience Overview</h4>
            <p style="font-size: 0.9rem; color: var(--text-secondary); line-height: 1.7;">
              3+ years architecting high-throughput full-stack web applications, AI-powered automation workflows, and immersive WebGL 3D experiences.
            </p>
          </div>
          <div>
            <h4 style="font-family: var(--font-display); color: var(--secondary-cyan); margin-bottom: 8px;">Direct Credentials</h4>
            <ul style="font-size: 0.85rem; color: var(--text-secondary); line-height: 1.8;">
              <li>📧 alex.morgan.dev@quantumedge.io</li>
              <li>🌐 San Francisco, CA // Neo-Tokyo // Remote</li>
              <li>🏆 1st Place - Autonomous AI Global Hackathon</li>
              <li>🌟 1,500+ GitHub Stars on Creative Coding Toolkits</li>
            </ul>
          </div>
        </div>

        <div style="text-align: right;">
          <button class="btn btn-secondary" onclick="document.getElementById('global-modal-close').click()">
            <span>Close Dossier</span>
          </button>
        </div>
      </div>
    `;

    backdrop.classList.add('active');
    if (window.cyberAudio) window.cyberAudio.play('open');
  };
}

/* ==========================================================================
   12. Toast Notification System
   ========================================================================== */
window.showToast = function(title, description, duration = 3500) {
  let toast = document.getElementById('global-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'toast-notification';
    toast.id = 'global-toast';
    document.body.appendChild(toast);
  }

  toast.innerHTML = `
    <span class="toast-icon">⚡</span>
    <div>
      <div class="toast-title">${title}</div>
      <div class="toast-desc">${description}</div>
    </div>
  `;

  toast.classList.add('active');

  if (window.toastTimeout) clearTimeout(window.toastTimeout);
  window.toastTimeout = setTimeout(() => {
    toast.classList.remove('active');
  }, duration);
};

/* ==========================================================================
   13. Scroll Reveal Animations (IntersectionObserver)
   ========================================================================== */
function initScrollReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-revealed');
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  document.querySelectorAll('.reveal-element').forEach(el => {
    observer.observe(el);
  });
}

function revealElementsOnScreen() {
  const elements = document.querySelectorAll('.reveal-element:not(.is-revealed)');
  elements.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.95) {
      el.classList.add('is-revealed');
    }
  });
}
window.revealElementsOnScreen = revealElementsOnScreen;
