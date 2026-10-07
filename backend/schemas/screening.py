"""
NeuroScreen AI - Pydantic Request & Response Schemas
Validation and serialization for screening endpoints.
"""

from typing import List, Tuple, Optional, Dict
from pydantic import BaseModel, Field
from datetime import datetime

class FacialFeaturesSchema(BaseModel):
    facial_asymmetry_index: float = Field(..., ge=0.0, le=100.0, description="FAI percentage")
    mouth_corner_asymmetry: float = Field(..., ge=0.0, le=1.0)
    eye_region_asymmetry: float = Field(..., ge=0.0, le=1.0)
    eyebrow_movement_symmetry: float = Field(..., ge=0.0, le=1.0)
    lip_mobility_symmetry: float = Field(..., ge=0.0, le=1.0)
    temporal_facial_consistency: float = Field(..., ge=0.0)
    max_facial_displacement: float = Field(..., ge=0.0)

class MotorFeaturesSchema(BaseModel):
    dominant_motion_frequency_hz: float = Field(..., ge=0.0, le=30.0)
    oscillation_amplitude: float = Field(..., ge=0.0)
    movement_smoothness_sparc: float = Field(..., le=0.0)
    motion_variability: float = Field(..., ge=0.0)
    peak_velocity: float = Field(..., ge=0.0)
    spectral_energy_ratio: float = Field(..., ge=0.0, le=1.0)
    temporal_consistency: float = Field(..., ge=0.0, le=1.0)

class AcousticFeaturesSchema(BaseModel):
    mean_f0_hz: float = Field(..., ge=50.0, le=600.0)
    pitch_variability_semitones: float = Field(..., ge=0.0)
    jitter_percent: float = Field(..., ge=0.0, le=50.0)
    shimmer_percent: float = Field(..., ge=0.0, le=50.0)
    zero_crossing_rate: float = Field(..., ge=0.0, le=1.0)
    spectral_centroid_hz: float = Field(..., ge=0.0)
    spectral_flux: float = Field(..., ge=0.0)
    energy_rms: float = Field(..., ge=0.0)
    speech_duration_sec: float = Field(..., ge=0.1, le=60.0)
    phonation_ratio: float = Field(..., ge=0.0, le=1.0)

class MultimodalPredictRequest(BaseModel):
    facial: FacialFeaturesSchema
    motor: MotorFeaturesSchema
    audio: AcousticFeaturesSchema

class ShapContributionItem(BaseModel):
    feature_name: str
    feature_key: str
    modality: str
    feature_value: float
    normative_mean: float
    shap_value: float
    relative_impact: str
    clinical_interpretation: str

class ScreeningResponse(BaseModel):
    screening_id: str
    timestamp: str
    risk_tier: str  # 'low' | 'moderate' | 'elevated'
    risk_score_percent: int
    confidence_interval: Tuple[int, int]
    model_metadata: Dict[str, str]
    shap_contributions: List[ShapContributionItem]
    recommendations: List[str]
    disclaimer: str = (
        "Research prototype — results are for screening support only "
        "and do not constitute medical diagnosis."
    )

class HealthStatus(BaseModel):
    status: str
    model_loaded: bool
    version: str
    timestamp: str
