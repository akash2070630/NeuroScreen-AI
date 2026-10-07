# NeuroScreen AI — Model Registry & Provenance

## 1. Active Production / Research Model
- **Identifier:** `NeuroScreen-XGBoost-Research`
- **Model Version:** `0.1.0-alpha`
- **Feature Schema Version:** `1.0` (21-dimensional multimodal feature vector)
- **Base Margin (Prior Log-Odds):** `-1.25` (~22% prevalence in specialized screening clinic)
- **Architecture:** Calibrated Gradient Boosted Decision Tree (GBDT) Ensemble (20 Regression Trees) with Logistic Sigmoid Link:

$$P(\text{Elevated Risk}) = \frac{1}{1 + e^{-(\text{base\_margin} + \sum_{m=1}^{M} f_m(\mathbf{x}))}}$$

## 2. Explainability Engine
- **Method:** TreeSHAP (Lundberg et al., Nature Machine Intelligence 2020)
- **Mathematical Property:** Strict Additivity ($\sum \phi_i = \hat{y} - \mathbb{E}[\hat{y}]$)
- **Output:** Individual log-odds attribution values per feature for direct clinician interpretation.

## 3. Classification Thresholds
- **Low Risk Indication:** Probability $< 0.35$
- **Moderate Risk Indication:** $0.35 \le \text{Probability} < 0.65$
- **Elevated Risk Indication:** $\text{Probability} \ge 0.65$

## 4. Governance & Versioning Contract
Every screening report issued by NeuroScreen AI logs:
1. `model_name`
2. `model_version`
3. `feature_version`
4. `timestamp`
5. `screening_id`

This ensures full auditability across all research sessions.
