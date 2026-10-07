# NeuroScreen AI — Methodology & Signal Mathematics

## 1. Computer Vision: Facial Biomechanics & Asymmetry Index (FAI)
NeuroScreen AI tracks 468 landmarks using dense mesh topology. A mid-sagittal reference axis $\mathbf{L}_{\text{mid}}$ is determined by glabella ($\mathbf{p}_{168}$) and subnasale ($\mathbf{p}_{2}$).

For any symmetric bilateral landmark pair $\mathbf{p}_L, \mathbf{p}_R$:
1. Orthogonal distance to mid-sagittal line:
   $$d(\mathbf{p}) = \frac{|(\mathbf{p} - \mathbf{p}_{\text{nas}}) \times (\mathbf{p}_{\text{sub}} - \mathbf{p}_{\text{nas}})|}{\|\mathbf{p}_{\text{sub}} - \mathbf{p}_{\text{nas}}\|}$$
2. Pointwise asymmetry ratio:
   $$\Delta_i = \frac{|d(\mathbf{p}_{L,i}) - d(\mathbf{p}_{R,i})|}{d(\mathbf{p}_{L,i}) + d(\mathbf{p}_{R,i}) + \epsilon}$$
3. Overall Facial Asymmetry Index:
   $$\text{FAI} = \frac{100}{N} \sum_{i=1}^{N} \Delta_i$$

## 2. Motor Kinematics: Frequency Decomposition & SPARC
Kinematic trajectories during upper-limb movement (Phase 5) are tracked at 30 FPS.
- **Fast Fourier Transform (FFT):**
  $$X(f) = \sum_{n=0}^{N-1} y[n] e^{-j 2\pi f n / N}$$
- **Dominant Frequency:** $\arg\max_{f \in [2.5, 10.0]} |X(f)|^2$
- **Spectral Arc Length (SPARC Smoothness):**
  $$\text{SPARC} = -\int_{0}^{\omega_c} \sqrt{\left(\frac{1}{\omega_c}\right)^2 + \left(\frac{d\hat{V}(\omega)}{d\omega}\right)^2} d\omega$$

## 3. Acoustic Speech: Phonation Perturbation
Using the standardized sentence &ldquo;Today is a beautiful day and I am feeling well&rdquo;:
- **Fundamental Frequency ($F_0$):** Derived via normalized autocorrelation (ACF).
- **Vocal Frequency Jitter (RAP %):**
  $$\text{Jitter} = \frac{\frac{1}{K-1} \sum_{i=1}^{K-1} |T_i - T_{i+1}|}{\frac{1}{K} \sum_{i=1}^K T_i} \times 100\%$$
- **Vocal Amplitude Shimmer (%):**
  $$\text{Shimmer} = \frac{\frac{1}{K-1} \sum_{i=1}^{K-1} |A_i - A_{i+1}|}{\frac{1}{K} \sum_{i=1}^K A_i} \times 100\%$$

## 4. Machine Learning & TreeSHAP Attribution
The 21-D fused multimodal feature vector is classified via 20 calibrated regression trees:
$$P(\text{Risk}) = \frac{1}{1 + e^{-\hat{y}(\mathbf{x})}}, \quad \hat{y}(\mathbf{x}) = \text{base\_margin} + \sum_{m=1}^M f_m(\mathbf{x})$$

Exact TreeSHAP attributions $\phi_i$ satisfy strict additivity:
$$\sum_{i=1}^{21} \phi_i(\mathbf{x}) = \hat{y}(\mathbf{x}) - \mathbb{E}[\hat{y}(\mathbf{X})]$$
