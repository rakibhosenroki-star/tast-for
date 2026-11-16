/**
 * ALEX MORGAN — FUTURISTIC PORTFOLIO
 * Cyberpunk HUD Command Palette (Ctrl + K)
 */

class CommandPalette {
  constructor() {
    this.isOpen = false;
    this.selectedIndex = 0;
    this.backdrop = null;
    this.input = null;
    this.resultsContainer = null;

    this.commands = [
      {
        id: 'nav-home',
        category: 'Navigation',
        title: 'Navigate to System Home',
        subtitle: 'Hero Section & Identity Core',
        icon: '◈',
        shortcut: 'H',
        action: () => this.scrollTo('hero')
      },
      {
        id: 'nav-about',
        category: 'Navigation',
        title: 'Access Dossier (About Me)',
        subtitle: 'Philosophy, Career Overview & Stats',
        icon: '◉',
        shortcut: 'A',
        action: () => this.scrollTo('about')
      },
      {
        id: 'nav-skills',
        category: 'Navigation',
        title: 'Inspect Tech Stack & Skills',
        subtitle: 'Frontend, Backend, AI & Automation',
        icon: '◆',
        shortcut: 'S',
        action: () => this.scrollTo('skills')
      },
      {
        id: 'nav-projects',
        category: 'Navigation',
        title: 'Explore Project Portfolio',
        subtitle: '6 Production-Grade Case Studies',
        icon: '❖',
        shortcut: 'P',
        action: () => this.scrollTo('projects')
      },
      {
        id: 'nav-journey',
        category: 'Navigation',
        title: 'View Career & Milestones Journey',
        subtitle: 'Chronological Experience Timeline',
        icon: '◎',
        shortcut: 'J',
        action: () => this.scrollTo('experience')
      },
      {
        id: 'nav-contact',
        category: 'Navigation',
        title: 'Open Communication Relay',
        subtitle: 'Transmit Message or Direct Channel',
        icon: '✉',
        shortcut: 'C',
        action: () => this.scrollTo('contact')
      },
      {
        id: 'act-resume',
        category: 'Quick Actions',
        title: 'View Full Resume & Credentials',
        subtitle: 'Interactive CV & Certification Sheet',
        icon: '📄',
        shortcut: 'R',
        action: () => {
          if (window.openResumeModal) window.openResumeModal();
        }
      },
      {
        id: 'act-audio',
        category: 'Quick Actions',
        title: 'Toggle Procedural UI Audio FX',
        subtitle: 'Synthesized sci-fi audio feedback',
        icon: '🔊',
        shortcut: 'M',
        action: () => {
          const btn = document.getElementById('sound-toggle-btn');
          if (btn) btn.click();
        }
      },
      {
        id: 'act-matrix',
        category: 'Quick Actions',
        title: 'Toggle Cyberpunk Matrix Rain Mode',
        subtitle: 'Digital cipher background animation',
        icon: '⚡',
        shortcut: 'X',
        action: () => {
          if (window.cyberCanvas) {
            const active = window.cyberCanvas.toggleMatrixMode();
            if (window.showToast) {
              window.showToast(
                active ? 'MATRIX RAIN ACTIVE' : 'CONSTELLATION ACTIVE',
                active ? 'Digital stream protocol engaged.' : 'Standard spatial canvas restored.'
              );
            }
          }
        }
      },
      {
        id: 'act-copy-email',
        category: 'Quick Actions',
        title: 'Copy Email to Clipboard',
        subtitle: 'alex.morgan.dev@quantumedge.io',
        icon: '📋',
        shortcut: 'E',
        action: () => {
          navigator.clipboard.writeText('alex.morgan.dev@quantumedge.io');
          if (window.showToast) {
            window.showToast('EMAIL COPIED', 'alex.morgan.dev@quantumedge.io copied to clipboard.');
          }
        }
      }
    ];

    this.filteredCommands = [...this.commands];
    this.init();
  }

  init() {
    this.createDom();
    this.bindShortcuts();
  }

  createDom() {
    const backdrop = document.createElement('div');
    backdrop.className = 'command-palette-backdrop';
    backdrop.id = 'command-palette-modal';

    backdrop.innerHTML = `
      <div class="command-palette-modal" role="dialog" aria-modal="true" aria-label="Command Palette">
        <div class="palette-input-wrapper">
          <span style="color: var(--secondary-cyan); font-family: var(--font-mono); font-size: 1.1rem;">&gt;</span>
          <input 
            type="text" 
            class="palette-input" 
            placeholder="Type a command or jump to section... (ESC to close)" 
            autocomplete="off" 
            spellcheck="false"
          />
          <kbd style="font-family: var(--font-mono); font-size: 0.7rem; color: var(--text-muted); background: rgba(255,255,255,0.06); padding: 3px 6px; border-radius: 4px;">ESC</kbd>
        </div>
        <div class="palette-results" id="palette-results-list"></div>
      </div>
    `;

    document.body.appendChild(backdrop);
    this.backdrop = backdrop;
    this.input = backdrop.querySelector('.palette-input');
    this.resultsContainer = backdrop.querySelector('#palette-results-list');

    // Click outside to close
    this.backdrop.addEventListener('click', (e) => {
      if (e.target === this.backdrop) {
        this.close();
      }
    });

    // Input search filter
    this.input.addEventListener('input', (e) => {
      this.filter(e.target.value);
    });

    // Keyboard navigation inside input
    this.input.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        this.selectNext();
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        this.selectPrev();
      } else if (e.key === 'Enter') {
        e.preventDefault();
        this.executeSelected();
      } else if (e.key === 'Escape') {
        e.preventDefault();
        this.close();
      }
    });
  }

  bindShortcuts() {
    window.addEventListener('keydown', (e) => {
      // Ctrl+K or Cmd+K
      if ((e.ctrlKey || e.metaKey) && (e.key === 'k' || e.key === 'K')) {
        e.preventDefault();
        this.toggle();
      }
    });

    // Trigger button in navbar
    const hudBtn = document.getElementById('nav-hud-trigger');
    if (hudBtn) {
      hudBtn.addEventListener('click', (e) => {
        e.preventDefault();
        this.open();
      });
    }
  }

  open() {
    this.isOpen = true;
    this.backdrop.classList.add('active');
    this.input.value = '';
    this.filter('');
    this.selectedIndex = 0;
    this.render();
    setTimeout(() => this.input.focus(), 50);

    if (window.cyberAudio) {
      window.cyberAudio.play('open');
    }
  }

  close() {
    if (!this.isOpen) return;
    this.isOpen = false;
    this.backdrop.classList.remove('active');
    if (window.cyberAudio) {
      window.cyberAudio.play('close');
    }
  }

  toggle() {
    if (this.isOpen) {
      this.close();
    } else {
      this.open();
    }
  }

  filter(query) {
    const q = query.trim().toLowerCase();
    if (!q) {
      this.filteredCommands = [...this.commands];
    } else {
      this.filteredCommands = this.commands.filter(cmd => 
        cmd.title.toLowerCase().includes(q) ||
        cmd.subtitle.toLowerCase().includes(q) ||
        cmd.category.toLowerCase().includes(q)
      );
    }
    this.selectedIndex = 0;
    this.render();
  }

  render() {
    if (!this.resultsContainer) return;

    if (this.filteredCommands.length === 0) {
      this.resultsContainer.innerHTML = `
        <div style="padding: 24px; text-align: center; color: var(--text-muted); font-family: var(--font-mono); font-size: 0.85rem;">
          NO SYSTEM COMMANDS MATCHED YOUR QUERY
        </div>
      `;
      return;
    }

    let currentCategory = '';
    let html = '';

    this.filteredCommands.forEach((cmd, idx) => {
      if (cmd.category !== currentCategory) {
        currentCategory = cmd.category;
        html += `<div class="palette-group-title">${currentCategory}</div>`;
      }

      const isSelected = idx === this.selectedIndex;
      html += `
        <div class="palette-item ${isSelected ? 'selected' : ''}" data-index="${idx}">
          <div class="palette-item-left">
            <span style="font-size: 1.1rem; color: ${isSelected ? 'var(--secondary-cyan)' : 'var(--text-muted)'}">${cmd.icon}</span>
            <div>
              <div style="font-weight: 600; color: ${isSelected ? 'var(--text-white)' : 'var(--text-secondary)'}">${cmd.title}</div>
              <div style="font-size: 0.78rem; color: var(--text-muted);">${cmd.subtitle}</div>
            </div>
          </div>
          <span class="palette-shortcut-badge">${cmd.shortcut}</span>
        </div>
      `;
    });

    this.resultsContainer.innerHTML = html;

    // Attach click listeners to items
    this.resultsContainer.querySelectorAll('.palette-item').forEach(el => {
      el.addEventListener('click', () => {
        const idx = parseInt(el.getAttribute('data-index'), 10);
        this.selectedIndex = idx;
        this.executeSelected();
      });

      el.addEventListener('mouseenter', () => {
        const idx = parseInt(el.getAttribute('data-index'), 10);
        this.selectedIndex = idx;
        this.highlightSelected();
      });
    });
  }

  highlightSelected() {
    const items = this.resultsContainer.querySelectorAll('.palette-item');
    items.forEach((item, idx) => {
      item.classList.toggle('selected', idx === this.selectedIndex);
    });
  }

  selectNext() {
    if (this.filteredCommands.length === 0) return;
    this.selectedIndex = (this.selectedIndex + 1) % this.filteredCommands.length;
    this.highlightSelected();
    this.ensureVisible();
    if (window.cyberAudio) window.cyberAudio.play('hover');
  }

  selectPrev() {
    if (this.filteredCommands.length === 0) return;
    this.selectedIndex = (this.selectedIndex - 1 + this.filteredCommands.length) % this.filteredCommands.length;
    this.highlightSelected();
    this.ensureVisible();
    if (window.cyberAudio) window.cyberAudio.play('hover');
  }

  ensureVisible() {
    const selectedEl = this.resultsContainer.querySelector('.palette-item.selected');
    if (selectedEl) {
      selectedEl.scrollIntoView({ block: 'nearest' });
    }
  }

  executeSelected() {
    const cmd = this.filteredCommands[this.selectedIndex];
    if (cmd && cmd.action) {
      if (window.cyberAudio) window.cyberAudio.play('click');
      this.close();
      cmd.action();
    }
  }

  scrollTo(sectionId) {
    const target = document.getElementById(sectionId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  }
}

// Global initialization
window.addEventListener('DOMContentLoaded', () => {
  window.commandPalette = new CommandPalette();
});
