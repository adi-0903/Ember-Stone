// Audio Atmosphere Engine for Hearth Bar (Procedural Web Audio API)
// Generates realistic warm fireplace crackle, cocktail shaker clinks, soft ambient drone, and crystal clinking

class BarAudioEngine {
  private ctx: AudioContext | null = null;
  private isPlaying = false;
  private masterGain: GainNode | null = null;
  
  // Channels
  private fireGain: GainNode | null = null;
  private rainGain: GainNode | null = null;
  private loungeGain: GainNode | null = null;
  private intervals: number[] = [];

  private init() {
    if (this.ctx) return;
    const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    this.ctx = new AudioCtx();
    this.masterGain = this.ctx.createGain();
    this.masterGain.gain.setValueAtTime(0.7, this.ctx.currentTime);
    this.masterGain.connect(this.ctx.destination);
  }

  public startAtmosphere(preset: 'hearth' | 'speakeasy' | 'aperitivo' = 'hearth') {
    this.init();
    if (!this.ctx || !this.masterGain) return;
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    this.stopAtmosphere();
    this.isPlaying = true;

    // 1. Fireplace Crackle Generator (Procedural Pink Noise + Crackle Impulses)
    this.createFireplaceCrackle(preset === 'hearth' ? 0.45 : 0.25);

    // 2. Warm Sub-Bass Speakeasy Lounge Drone (Warm 432Hz ambient chord)
    this.createWarmLoungeDrone(preset === 'speakeasy' ? 0.35 : 0.2);

    // 3. Occasional Crystal Glass Clink & Shaker rhythm
    this.startAmbientGlassClinks();
  }

  private createFireplaceCrackle(level: number) {
    if (!this.ctx || !this.masterGain) return;
    const bufferSize = this.ctx.sampleRate * 2;
    const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;

    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      b0 = 0.99886 * b0 + white * 0.0555179;
      b1 = 0.99332 * b1 + white * 0.0750759;
      b2 = 0.96900 * b2 + white * 0.1538520;
      b3 = 0.86650 * b3 + white * 0.3104856;
      b4 = 0.55000 * b4 + white * 0.5329522;
      b5 = -0.7616 * b5 - white * 0.0168980;
      output[i] = b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362;
      output[i] *= 0.08;
      b6 = white * 0.115926;
    }

    const whiteNoise = this.ctx.createBufferSource();
    whiteNoise.buffer = noiseBuffer;
    whiteNoise.loop = true;

    // Filter to warm low-mids (wood roar)
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(450, this.ctx.currentTime);

    this.fireGain = this.ctx.createGain();
    this.fireGain.gain.setValueAtTime(level, this.ctx.currentTime);

    whiteNoise.connect(filter);
    filter.connect(this.fireGain);
    this.fireGain.connect(this.masterGain);
    whiteNoise.start();

    // Wood Crackle Sparks (random pop impulses)
    const crackleInterval = window.setInterval(() => {
      if (!this.isPlaying || !this.ctx || !this.masterGain) return;
      if (Math.random() > 0.4) {
        const osc = this.ctx.createOscillator();
        const popGain = this.ctx.createGain();
        const band = this.ctx.createBiquadFilter();

        band.type = 'bandpass';
        band.frequency.value = 1200 + Math.random() * 2400;
        band.Q.value = 8;

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(800 + Math.random() * 600, this.ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(100, this.ctx.currentTime + 0.04);

        popGain.gain.setValueAtTime(0.08 + Math.random() * 0.12, this.ctx.currentTime);
        popGain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.05);

        osc.connect(band);
        band.connect(popGain);
        popGain.connect(this.masterGain);

        osc.start();
        osc.stop(this.ctx.currentTime + 0.06);
      }
    }, 180);

    this.intervals.push(crackleInterval);
  }

  private createWarmLoungeDrone(level: number) {
    if (!this.ctx || !this.masterGain) return;
    const droneGain = this.ctx.createGain();
    droneGain.gain.setValueAtTime(level * 0.6, this.ctx.currentTime);
    this.loungeGain = droneGain;

    // Frequencies for a warm candlelit major 9th chord (A1, E2, C#3, G#3)
    const freqs = [55, 82.41, 138.59, 207.65];
    freqs.forEach((f) => {
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(f, this.ctx.currentTime);

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(280, this.ctx.currentTime);

      osc.connect(filter);
      filter.connect(droneGain);
      osc.start();
    });

    droneGain.connect(this.masterGain);
  }

  private startAmbientGlassClinks() {
    // Subtle background crystal glass resonance every 8-15 seconds
    const interval = window.setInterval(() => {
      if (!this.isPlaying) return;
      if (Math.random() > 0.45) {
        this.playGlassToast(0.08 + Math.random() * 0.06);
      }
    }, 9000);
    this.intervals.push(interval);
  }

  public playGlassToast(vol = 0.25) {
    try {
      this.init();
      if (!this.ctx || !this.masterGain) return;
      if (this.ctx.state === 'suspended') this.ctx.resume();

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const freq = 2100 + Math.random() * 400; // Crystal ring

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      gain.gain.setValueAtTime(vol, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 1.2);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start();
      osc.stop(this.ctx.currentTime + 1.3);
    } catch {
      // Audio fallback
    }
  }

  public playShakerSound() {
    try {
      this.init();
      if (!this.ctx || !this.masterGain) return;
      if (this.ctx.state === 'suspended') this.ctx.resume();

      for (let i = 0; i < 4; i++) {
        const time = this.ctx.currentTime + i * 0.12;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const filter = this.ctx.createBiquadFilter();

        filter.type = 'bandpass';
        filter.frequency.setValueAtTime(3200, time);
        filter.Q.setValueAtTime(3, time);

        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(400, time);

        gain.gain.setValueAtTime(0.12, time);
        gain.gain.exponentialRampToValueAtTime(0.001, time + 0.08);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(this.masterGain);

        osc.start(time);
        osc.stop(time + 0.09);
      }
    } catch {
      // Audio fallback
    }
  }

  public setMasterVolume(val: number) {
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(val, this.ctx.currentTime);
    }
  }

  public stopAtmosphere() {
    this.isPlaying = false;
    this.intervals.forEach((id) => clearInterval(id));
    this.intervals = [];
    if (this.ctx) {
      try {
        this.ctx.close();
      } catch {
        // closed
      }
      this.ctx = null;
      this.masterGain = null;
    }
  }

  public getStatus() {
    return this.isPlaying;
  }
}

export const barAudio = new BarAudioEngine();
