/**
 * ALEX MORGAN — FUTURISTIC PORTFOLIO
 * Enhanced 60 FPS Interactive Particle Constellation & Cyber Perspective Mesh
 */

class CyberCanvas {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    this.particles = [];
    this.particleCount = 85;
    this.maxDistance = 150;
    this.mouse = { x: -2000, y: -2000, radius: 200 };
    this.width = 0;
    this.height = 0;
    this.dpr = Math.min(window.devicePixelRatio || 1, 2);
    this.isMatrixMode = false;
    this.matrixColumns = [];
    this.matrixChars = '010101アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
    this.gridOffset = 0;
    this.time = 0;

    this.init();
  }

  init() {
    this.resize();
    this.createParticles();
    this.bindEvents();
    this.animate();
  }

  resize() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.canvas.width = this.width * this.dpr;
    this.canvas.height = this.height * this.dpr;
    this.ctx.scale(this.dpr, this.dpr);

    if (this.width < 768) {
      this.particleCount = 40;
      this.maxDistance = 110;
    } else {
      this.particleCount = 85;
      this.maxDistance = 150;
    }

    if (this.isMatrixMode) {
      this.initMatrix();
    }
  }

  createParticles() {
    this.particles = [];
    const colors = [
      { r: 0, g: 240, b: 255 },    // Neon Cyan
      { r: 139, g: 92, b: 246 },   // Electric Purple
      { r: 59, g: 130, b: 246 }    // Cyber Blue
    ];

    for (let i = 0; i < this.particleCount; i++) {
      const color = colors[Math.floor(Math.random() * colors.length)];
      this.particles.push({
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        vx: (Math.random() - 0.5) * 0.7,
        vy: (Math.random() - 0.5) * 0.7,
        radius: Math.random() * 2.2 + 1,
        color: color,
        baseAlpha: Math.random() * 0.6 + 0.3,
        pulseSpeed: Math.random() * 0.03 + 0.01
      });
    }
  }

  bindEvents() {
    window.addEventListener('resize', () => this.resize());

    window.addEventListener('mousemove', (e) => {
      this.mouse.x = e.clientX;
      this.mouse.y = e.clientY;
    });

    window.addEventListener('mouseleave', () => {
      this.mouse.x = -2000;
      this.mouse.y = -2000;
    });
  }

  toggleMatrixMode() {
    this.isMatrixMode = !this.isMatrixMode;
    if (this.isMatrixMode) {
      this.initMatrix();
    }
    return this.isMatrixMode;
  }

  initMatrix() {
    const fontSize = 16;
    const columns = Math.floor(this.width / fontSize);
    this.matrixColumns = [];
    for (let i = 0; i < columns; i++) {
      this.matrixColumns[i] = Math.floor(Math.random() * -60);
    }
  }

  drawMatrix() {
    this.ctx.fillStyle = 'rgba(6, 8, 15, 0.16)';
    this.ctx.fillRect(0, 0, this.width, this.height);

    this.ctx.fillStyle = '#00F0FF';
    this.ctx.font = '14px monospace';

    for (let i = 0; i < this.matrixColumns.length; i++) {
      const char = this.matrixChars[Math.floor(Math.random() * this.matrixChars.length)];
      const x = i * 16;
      const y = this.matrixColumns[i] * 16;

      this.ctx.fillText(char, x, y);

      if (y > this.height && Math.random() > 0.975) {
        this.matrixColumns[i] = 0;
      }
      this.matrixColumns[i]++;
    }
  }

  drawParticles() {
    this.ctx.clearRect(0, 0, this.width, this.height);
    this.time += 0.02;

    // Draw Cyberpunk Horizon Grid at bottom
    this.drawCyberGrid();

    // Update & draw particles
    for (let i = 0; i < this.particles.length; i++) {
      const p = this.particles[i];

      p.x += p.vx;
      p.y += p.vy;

      // Wrap boundaries
      if (p.x < 0) p.x = this.width;
      if (p.x > this.width) p.x = 0;
      if (p.y < 0) p.y = this.height;
      if (p.y > this.height) p.y = 0;

      // Mouse interactive push/pull
      const dx = this.mouse.x - p.x;
      const dy = this.mouse.y - p.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < this.mouse.radius) {
        const force = (1 - dist / this.mouse.radius) * 1.8;
        p.x -= (dx / dist) * force;
        p.y -= (dy / dist) * force;

        // Glowing connection line to cursor
        this.ctx.beginPath();
        this.ctx.moveTo(this.mouse.x, this.mouse.y);
        this.ctx.lineTo(p.x, p.y);
        this.ctx.strokeStyle = `rgba(0, 240, 255, ${0.45 * (1 - dist / this.mouse.radius)})`;
        this.ctx.lineWidth = 1.2;
        this.ctx.stroke();
      }

      // Draw particle dot with subtle pulse
      const alpha = p.baseAlpha + Math.sin(this.time * 2 + i) * 0.15;
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      this.ctx.fillStyle = `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, ${Math.max(0.1, alpha)})`;
      this.ctx.shadowBlur = 10;
      this.ctx.shadowColor = `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, 0.8)`;
      this.ctx.fill();
      this.ctx.shadowBlur = 0;

      // Connect nearby particles
      for (let j = i + 1; j < this.particles.length; j++) {
        const p2 = this.particles[j];
        const pDistance = Math.hypot(p.x - p2.x, p.y - p2.y);

        if (pDistance < this.maxDistance) {
          const lineAlpha = (1 - pDistance / this.maxDistance) * 0.25;
          this.ctx.beginPath();
          this.ctx.moveTo(p.x, p.y);
          this.ctx.lineTo(p2.x, p2.y);
          this.ctx.strokeStyle = `rgba(139, 92, 246, ${lineAlpha})`;
          this.ctx.lineWidth = 0.9;
          this.ctx.stroke();
        }
      }
    }
  }

  drawCyberGrid() {
    const horizon = this.height * 0.84;
    const gridSpacing = 44;
    this.gridOffset = (this.gridOffset + 0.35) % gridSpacing;

    this.ctx.save();
    this.ctx.strokeStyle = 'rgba(0, 240, 255, 0.06)';
    this.ctx.lineWidth = 1;

    // Horizontal perspective lines
    for (let y = horizon; y < this.height; y += 14) {
      this.ctx.beginPath();
      this.ctx.moveTo(0, y);
      this.ctx.lineTo(this.width, y);
      this.ctx.stroke();
    }

    // Converging perspective lines
    const vanishingX = this.width / 2;
    for (let x = -this.width; x < this.width * 2; x += 65) {
      this.ctx.beginPath();
      this.ctx.moveTo(vanishingX, horizon);
      this.ctx.lineTo(x + this.gridOffset, this.height);
      this.ctx.stroke();
    }

    this.ctx.restore();
  }

  animate() {
    if (this.isMatrixMode) {
      this.drawMatrix();
    } else {
      this.drawParticles();
    }
    requestAnimationFrame(() => this.animate());
  }
}

// Global initialization
window.addEventListener('DOMContentLoaded', () => {
  window.cyberCanvas = new CyberCanvas('cyber-canvas');
});
