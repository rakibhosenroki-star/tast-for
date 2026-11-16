/**
 * ALEX MORGAN — FUTURISTIC PORTFOLIO
 * Cyberpunk Audio Synthesis Engine (Procedural Web Audio API)
 * Zero external audio files; pure synthesized sci-fi sound effects.
 */

class CyberAudioEngine {
  constructor() {
    this.audioCtx = null;
    this.isEnabled = false;
    this.volume = 0.18; // Soft, comfortable ambient level
    this.initialized = false;
  }

  init() {
    if (this.initialized) return;
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.audioCtx = new AudioContext();
        this.initialized = true;
      }
    } catch (e) {
      console.warn('Web Audio API not supported in this browser.');
    }
  }

  toggle() {
    if (!this.initialized) {
      this.init();
    }
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
    this.isEnabled = !this.isEnabled;
    if (this.isEnabled) {
      this.play('success');
    }
    return this.isEnabled;
  }

  play(soundType) {
    if (!this.isEnabled || !this.audioCtx) return;

    if (this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }

    const now = this.audioCtx.currentTime;

    switch (soundType) {
      case 'hover':
        this._playHoverSound(now);
        break;
      case 'click':
        this._playClickSound(now);
        break;
      case 'open':
        this._playOpenSound(now);
        break;
      case 'close':
        this._playCloseSound(now);
        break;
      case 'success':
        this._playSuccessSound(now);
        break;
      case 'transmit':
        this._playTransmitSound(now);
        break;
      default:
        this._playClickSound(now);
    }
  }

  // Soft high-tech cursor tap
  _playHoverSound(t) {
    const osc = this.audioCtx.createOscillator();
    const gain = this.audioCtx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(1400, t);
    osc.frequency.exponentialRampToValueAtTime(1800, t + 0.03);

    gain.gain.setValueAtTime(this.volume * 0.25, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.03);

    osc.connect(gain);
    gain.connect(this.audioCtx.destination);

    osc.start(t);
    osc.stop(t + 0.03);
  }

  // Cyber tactile click
  _playClickSound(t) {
    const osc = this.audioCtx.createOscillator();
    const gain = this.audioCtx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(800, t);
    osc.frequency.exponentialRampToValueAtTime(400, t + 0.06);

    gain.gain.setValueAtTime(this.volume * 0.7, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.06);

    osc.connect(gain);
    gain.connect(this.audioCtx.destination);

    osc.start(t);
    osc.stop(t + 0.06);
  }

  // Futuristic modal whoosh / chime
  _playOpenSound(t) {
    const osc = this.audioCtx.createOscillator();
    const gain = this.audioCtx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(320, t);
    osc.frequency.exponentialRampToValueAtTime(960, t + 0.18);

    gain.gain.setValueAtTime(0.01, t);
    gain.gain.linearRampToValueAtTime(this.volume * 0.6, t + 0.06);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.18);

    osc.connect(gain);
    gain.connect(this.audioCtx.destination);

    osc.start(t);
    osc.stop(t + 0.18);
  }

  // Descending close whoosh
  _playCloseSound(t) {
    const osc = this.audioCtx.createOscillator();
    const gain = this.audioCtx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(700, t);
    osc.frequency.exponentialRampToValueAtTime(260, t + 0.14);

    gain.gain.setValueAtTime(this.volume * 0.5, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.14);

    osc.connect(gain);
    gain.connect(this.audioCtx.destination);

    osc.start(t);
    osc.stop(t + 0.14);
  }

  // Harmonious cyber confirmation chime
  _playSuccessSound(t) {
    const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
    notes.forEach((freq, idx) => {
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();

      const startTime = t + idx * 0.05;
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, startTime);

      gain.gain.setValueAtTime(0.001, startTime);
      gain.gain.linearRampToValueAtTime(this.volume * 0.5, startTime + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.25);

      osc.connect(gain);
      gain.connect(this.audioCtx.destination);

      osc.start(startTime);
      osc.stop(startTime + 0.25);
    });
  }

  // Complex telemetry transmission sound
  _playTransmitSound(t) {
    // Pulse burst
    for (let i = 0; i < 3; i++) {
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();

      const startTime = t + i * 0.08;
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(800 + i * 200, startTime);
      osc.frequency.exponentialRampToValueAtTime(1400 + i * 200, startTime + 0.07);

      gain.gain.setValueAtTime(this.volume * 0.4, startTime);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.07);

      osc.connect(gain);
      gain.connect(this.audioCtx.destination);

      osc.start(startTime);
      osc.stop(startTime + 0.07);
    }
  }
}

// Global instance
window.cyberAudio = new CyberAudioEngine();
