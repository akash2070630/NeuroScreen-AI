# NeuroScreen AI — Dataset Strategy & Protocols

## Cohort Stratification
To avoid selection bias, prospective validation datasets should maintain:
- Age distribution: 20–85 years
- Biological sex balance: ~50% male, ~50% female
- Controls vs. Clinically Evaluated Neuromuscular Patients

## Protocol Administration
1. **Distance:** Smartphone held at 40–50 cm from face at eye level.
2. **Illumination:** Diffuse daylight or indoor light; avoiding backlit conditions.
3. **Phases:** Strict completion of the 6 standardized phases (Resting, Smile, Eyebrows, Eye closure, Arm kinematics, Fixed phonation).

## Data Leakage Prevention Policy
- Group cross-validation split by `participant_id`.
- Never train on sample A and test on sample B from the same individual.
