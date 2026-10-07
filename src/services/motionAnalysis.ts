/**
 * NeuroScreen AI - Motor Movement & Tremor Analysis Service
 * Kinematic trajectory tracking, FFT frequency decomposition,
 * spectral energy computation, and SPARC smoothness metrics.
 */

import { MotorFeatures, Point2D } from '../types';

export interface MotionSamplePoint {
  timestampMs: number;
  wrist: Point2D;
  elbow?: Point2D;
  shoulder?: Point2D;
}

/**
 * Computes a standard 1D Fast Fourier Transform (Cooley-Tukey radix-2)
 * on a real-valued signal. Pads to next power of 2 if necessary.
 */
export function computeFFT(signal: number[]): { frequencies: number[]; magnitudes: number[] } {
  const n = signal.length;
  if (n === 0) return { frequencies: [], magnitudes: [] };

  // Next power of 2
  let m = 1;
  while (m < n) m <<= 1;
  // Pad with mean of signal to prevent edge discontinuity
  const meanVal = signal.reduce((a, b) => a + b, 0) / n;
  const real = new Float64Array(m);
  const imag = new Float64Array(m);

  for (let i = 0; i < m; i++) {
    real[i] = i < n ? signal[i] - meanVal : 0; // Detrend / remove DC
    imag[i] = 0;
  }

  // Bit-reversal permutation
  let j = 0;
  for (let i = 0; i < m - 1; i++) {
    if (i < j) {
      const tr = real[i];
      const ti = imag[i];
      real[i] = real[j];
      imag[i] = imag[j];
      real[j] = tr;
      imag[j] = ti;
    }
    let k = m >> 1;
    while (k <= j) {
      j -= k;
      k >>= 1;
    }
    j += k;
  }

  // Butterfly computation
  for (let len = 2; len <= m; len <<= 1) {
    const half = len >> 1;
    const angle = (-2 * Math.PI) / len;
    const wstepR = Math.cos(angle);
    const wstepI = Math.sin(angle);

    for (let i = 0; i < m; i += len) {
      let wr = 1;
      let wi = 0;
      for (let k = 0; k < half; k++) {
        const uR = real[i + k];
        const uI = imag[i + k];
        const vR = real[i + k + half] * wr - imag[i + k + half] * wi;
        const vI = real[i + k + half] * wi + imag[i + k + half] * wr;

        real[i + k] = uR + vR;
        imag[i + k] = uI + vI;
        real[i + k + half] = uR - vR;
        imag[i + k + half] = uI - vI;

        const nextWr = wr * wstepR - wi * wstepI;
        wi = wr * wstepI + wi * wstepR;
        wr = nextWr;
      }
    }
  }

  // Compute magnitudes for single-sided spectrum (0 to Nyquist)
  const halfM = m / 2;
  const samplingRateHz = 30; // standard 30 FPS smartphone video
  const freqs: number[] = [];
  const mags: number[] = [];

  for (let k = 0; k < halfM; k++) {
    const freq = (k * samplingRateHz) / m;
    const mag = Math.sqrt(real[k] * real[k] + imag[k] * imag[k]) / (m / 2);
    freqs.push(freq);
    mags.push(mag);
  }

  return { frequencies: freqs, magnitudes: mags };
}

/**
 * Calculates Spectral Arc Length (SPARC) smoothness metric
 * from a velocity profile. Higher value (closer to zero) indicates smoother motor control.
 */
export function calculateSPARC(velocityProfile: number[], samplingRateHz: number = 30): number {
  if (velocityProfile.length < 10) return -1.5;

  const { frequencies, magnitudes } = computeFFT(velocityProfile);
  // Cutoff at 10 Hz for human voluntary motion
  const maxFreq = 10.0;
  const validIndices = frequencies
    .map((f, idx) => ({ f, idx }))
    .filter((item) => item.f <= maxFreq);

  if (validIndices.length < 2) return -2.0;

  let arcLength = 0;
  for (let i = 1; i < validIndices.length; i++) {
    const idxCurr = validIndices[i].idx;
    const idxPrev = validIndices[i - 1].idx;
    const df = (frequencies[idxCurr] - frequencies[idxPrev]) / maxFreq;
    const dm = magnitudes[idxCurr] - magnitudes[idxPrev];
    arcLength += Math.sqrt(df * df + dm * dm);
  }

  // SPARC is traditionally negative: dimensionless arc length
  return -arcLength;
}

/**
 * Aggregates trajectory samples into MotorFeatures.
 */
export function analyzeMotionTrajectory(samples: MotionSamplePoint[]): MotorFeatures {
  if (!samples || samples.length < 15) {
    // Standard normative default
    return {
      dominantMotionFrequencyHz: 1.2,
      oscillationAmplitude: 2.4,
      movementSmoothnessSparc: -1.45,
      motionVariability: 0.12,
      peakVelocity: 0.85,
      spectralEnergyRatio: 0.08,
      temporalConsistency: 0.91,
    };
  }

  // Calculate displacements, velocities, and accelerations
  const displacements: number[] = [];
  const velocities: number[] = [];
  const dt = 1 / 30; // 30 FPS approximation

  for (let i = 1; i < samples.length; i++) {
    const p1 = samples[i - 1].wrist;
    const p2 = samples[i].wrist;
    const dx = p2.x - p1.x;
    const dy = p2.y - p1.y;
    const dist = Math.hypot(dx, dy);
    displacements.push(dist);

    const actualDt = (samples[i].timestampMs - samples[i - 1].timestampMs) / 1000 || dt;
    velocities.push(dist / actualDt);
  }

  // Frequency-domain analysis on wrist vertical displacement (primary tremor axis)
  const ySignal = samples.map((s) => s.wrist.y);
  const { frequencies, magnitudes } = computeFFT(ySignal);

  // Find dominant peak in 2.5 Hz - 10.0 Hz band (human physiological and pathological band)
  let peakMag = 0;
  let dominantFreq = 0;
  let bandEnergyTremor = 0; // 3.5 - 7.5 Hz band
  let totalEnergy = 0;

  for (let i = 0; i < frequencies.length; i++) {
    const f = frequencies[i];
    const mag = magnitudes[i];
    const power = mag * mag;
    totalEnergy += power;

    if (f >= 3.5 && f <= 7.5) {
      bandEnergyTremor += power;
    }

    if (f >= 2.0 && f <= 11.0 && mag > peakMag) {
      peakMag = mag;
      dominantFreq = f;
    }
  }

  const spectralEnergyRatio = totalEnergy > 0 ? bandEnergyTremor / totalEnergy : 0.05;

  // Oscillation amplitude: standard deviation of detrended displacements
  const meanDisp = displacements.reduce((a, b) => a + b, 0) / displacements.length;
  const dispStd = Math.sqrt(
    displacements.reduce((acc, d) => acc + Math.pow(d - meanDisp, 2), 0) / displacements.length
  );
  // Scale to normalized mm equivalent on smartphone viewport
  const oscillationAmplitude = dispStd * 200;

  // Velocity stats
  const meanVel = velocities.reduce((a, b) => a + b, 0) / velocities.length;
  const velStd = Math.sqrt(
    velocities.reduce((acc, v) => acc + Math.pow(v - meanVel, 2), 0) / velocities.length
  );
  const peakVelocity = Math.max(...velocities);
  const motionVariability = meanVel > 0 ? velStd / meanVel : 0.15;

  // Smoothness via SPARC
  const sparc = calculateSPARC(velocities);

  // Temporal consistency: cross-phase smoothness
  const temporalConsistency = Math.max(0.1, Math.min(1.0, 1 - motionVariability * 0.5));

  return {
    dominantMotionFrequencyHz: Number(dominantFreq.toFixed(2)),
    oscillationAmplitude: Number(oscillationAmplitude.toFixed(2)),
    movementSmoothnessSparc: Number(sparc.toFixed(2)),
    motionVariability: Number(motionVariability.toFixed(3)),
    peakVelocity: Number(peakVelocity.toFixed(2)),
    spectralEnergyRatio: Number(spectralEnergyRatio.toFixed(3)),
    temporalConsistency: Number(temporalConsistency.toFixed(3)),
  };
}
