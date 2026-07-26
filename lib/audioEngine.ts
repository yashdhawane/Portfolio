"use client";

/**
 * Every sound here is synthesized at runtime with oscillators + filtered
 * noise — there are no audio samples/files involved, so there's nothing
 * to license. This is what lets the score stay in sync with the text: each
 * beat is triggered from the same phase-timer that drives the animation.
 */
export class TrailerAudioEngine {
  private ctx: AudioContext | null = null;
  private master: GainNode | null = null;
  private muteGain: GainNode | null = null;
  private humOsc: OscillatorNode | null = null;
  private humGain: GainNode | null = null;
  private humFilter: BiquadFilterNode | null = null;
  private padOscs: OscillatorNode[] = [];
  private padGain: GainNode | null = null;
  private creditsTimer: ReturnType<typeof setInterval> | null = null;
  private ready = false;

  init() {
    if (this.ready) return;
    const w = window as unknown as { webkitAudioContext?: typeof AudioContext };
    const Ctx = window.AudioContext || w.webkitAudioContext;
    if (!Ctx) return;
    this.ctx = new Ctx();
    this.master = this.ctx.createGain();
    this.master.gain.value = 0.5;
    this.muteGain = this.ctx.createGain();
    this.muteGain.gain.value = 1;
    this.master.connect(this.muteGain).connect(this.ctx.destination);
    this.ready = true;
  }

  get isReady() {
    return this.ready;
  }

  setMuted(muted: boolean) {
    if (!this.ctx || !this.muteGain) return;
    const now = this.ctx.currentTime;
    this.muteGain.gain.cancelScheduledValues(now);
    this.muteGain.gain.linearRampToValueAtTime(muted ? 0 : 1, now + 0.15);
  }

  private noiseBuffer(seconds: number) {
    if (!this.ctx) return null;
    const buffer = this.ctx.createBuffer(1, Math.max(1, this.ctx.sampleRate * seconds), this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;
    return buffer;
  }

  /** Deep low-frequency hum that builds under the opening line. */
  startHum() {
    if (!this.ctx || !this.master) return;
    const now = this.ctx.currentTime;
    this.humOsc = this.ctx.createOscillator();
    this.humOsc.type = "sine";
    this.humOsc.frequency.value = 52;
    this.humFilter = this.ctx.createBiquadFilter();
    this.humFilter.type = "lowpass";
    this.humFilter.frequency.value = 200;
    this.humGain = this.ctx.createGain();
    this.humGain.gain.value = 0;
    this.humOsc.connect(this.humFilter).connect(this.humGain).connect(this.master);
    this.humOsc.start(now);
    this.humGain.gain.linearRampToValueAtTime(0.22, now + 2.6);
    this.humFilter.frequency.linearRampToValueAtTime(360, now + 6);
    this.humFilter.frequency.linearRampToValueAtTime(220, now + 14);
  }

  /** Short filtered-noise glitch hit — for rapid-fire flash cuts. */
  stab(delaySec = 0) {
    if (!this.ctx || !this.master) return;
    const now = this.ctx.currentTime + delaySec;
    const buffer = this.noiseBuffer(0.14);
    if (!buffer) return;
    const src = this.ctx.createBufferSource();
    src.buffer = buffer;
    const bp = this.ctx.createBiquadFilter();
    bp.type = "bandpass";
    bp.frequency.value = 900 + Math.random() * 1800;
    bp.Q.value = 4;
    const g = this.ctx.createGain();
    g.gain.setValueAtTime(0, now);
    g.gain.linearRampToValueAtTime(0.35, now + 0.008);
    g.gain.exponentialRampToValueAtTime(0.001, now + 0.14);
    src.connect(bp).connect(g).connect(this.master);
    src.start(now);
    src.stop(now + 0.16);
  }

  /** Warm sustained pad for the calm / relax beat. */
  softPad() {
    if (!this.ctx || !this.master) return;
    const now = this.ctx.currentTime;
    this.stopPad(0.01);
    const freqs = [110, 164.81, 220]; // A2 / E3 / A3 — open, calm
    this.padGain = this.ctx.createGain();
    this.padGain.gain.value = 0;
    const filter = this.ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.value = 900;
    this.padGain.connect(filter).connect(this.master);
    this.padOscs = freqs.map((f) => {
      const o = this.ctx!.createOscillator();
      o.type = "triangle";
      o.frequency.value = f;
      o.connect(this.padGain!);
      o.start(now);
      return o;
    });
    this.padGain.gain.linearRampToValueAtTime(0.1, now + 1.1);
  }

  stopPad(rampSec = 0.6) {
    if (!this.ctx || !this.padGain) return;
    const now = this.ctx.currentTime;
    this.padGain.gain.cancelScheduledValues(now);
    this.padGain.gain.linearRampToValueAtTime(0, now + rampSec);
    const oscs = this.padOscs;
    setTimeout(() => oscs.forEach((o) => { try { o.stop(); } catch {} }), rampSec * 1000 + 60);
    this.padOscs = [];
  }

  /** Rhythmic plucked run under the "capabilities" credits scroll. */
  startCreditsPulse(durationMs: number) {
    if (!this.ctx || !this.master) return;
    const notes = [220, 277.18, 329.63, 392];
    let i = 0;
    const tick = () => {
      if (!this.ctx || !this.master) return;
      const now = this.ctx.currentTime;
      const o = this.ctx.createOscillator();
      o.type = "square";
      o.frequency.value = notes[i % notes.length];
      const g = this.ctx.createGain();
      g.gain.setValueAtTime(0.0001, now);
      g.gain.linearRampToValueAtTime(0.05, now + 0.01);
      g.gain.exponentialRampToValueAtTime(0.0001, now + 0.18);
      o.connect(g).connect(this.master);
      o.start(now);
      o.stop(now + 0.2);
      i++;
    };
    tick();
    this.creditsTimer = setInterval(tick, 240);
    setTimeout(() => this.stopCreditsPulse(), durationMs);
  }

  stopCreditsPulse() {
    if (this.creditsTimer) clearInterval(this.creditsTimer);
    this.creditsTimer = null;
  }

  /** Big low impact hit — for punch-line reveals. */
  bigHit() {
    if (!this.ctx || !this.master) return;
    const now = this.ctx.currentTime;
    const o = this.ctx.createOscillator();
    o.type = "sine";
    o.frequency.setValueAtTime(180, now);
    o.frequency.exponentialRampToValueAtTime(40, now + 0.45);
    const g = this.ctx.createGain();
    g.gain.setValueAtTime(0.001, now);
    g.gain.linearRampToValueAtTime(0.5, now + 0.02);
    g.gain.exponentialRampToValueAtTime(0.001, now + 0.6);
    o.connect(g).connect(this.master);
    o.start(now);
    o.stop(now + 0.65);
    this.stab(0.05);
    this.stab(0.13);
  }

  /** Warm resolving triad for the closing CTA. */
  resolveChord() {
    if (!this.ctx || !this.master) return;
    const now = this.ctx.currentTime;
    const freqs = [130.81, 164.81, 196]; // C3 E3 G3 — settled, hopeful
    const g = this.ctx.createGain();
    g.gain.value = 0;
    g.connect(this.master);
    freqs.forEach((f) => {
      const o = this.ctx!.createOscillator();
      o.type = "sine";
      o.frequency.value = f;
      o.connect(g);
      o.start(now);
      o.stop(now + 4);
    });
    g.gain.linearRampToValueAtTime(0.16, now + 1.4);
    g.gain.linearRampToValueAtTime(0, now + 3.8);
  }

  stopAll() {
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    this.stopCreditsPulse();
    if (this.humGain) this.humGain.gain.linearRampToValueAtTime(0, now + 0.5);
    this.stopPad(0.5);
    if (this.master) this.master.gain.linearRampToValueAtTime(0, now + 0.7);
    const ctx = this.ctx;
    const humOsc = this.humOsc;
    setTimeout(() => {
      try {
        humOsc?.stop();
      } catch {}
      try {
        ctx?.close();
      } catch {}
    }, 800);
    this.ready = false;
  }
}
