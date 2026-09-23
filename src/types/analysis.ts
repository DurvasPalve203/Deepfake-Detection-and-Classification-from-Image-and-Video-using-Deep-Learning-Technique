import type { MediaType, FileMetadata } from './media';
export type { MediaType, FileMetadata };

export type PredictionVerdict = 'AUTHENTIC' | 'LIKELY_MANIPULATED' | 'INCONCLUSIVE';

export type UploadState = 
  | 'EMPTY'
  | 'FILE_SELECTED'
  | 'VALIDATING'
  | 'READY'
  | 'ANALYZING'
  | 'COMPLETED'
  | 'ERROR';

export interface AnalysisPipelineStep {
  id: string;
  label: string;
  description: string;
  status: 'pending' | 'active' | 'completed' | 'failed';
  progressPercentage: number;
}

export interface ProbabilityBreakdown {
  authentic: number; // 0 - 100
  manipulated: number; // 0 - 100
  inconclusive: number; // 0 - 100
}

export interface AnomalyRegion {
  id: string;
  label: string;
  category: 'Face Warp' | 'Texture Anomaly' | 'Boundary Artifact' | 'Frequency Noise' | 'Lighting Discrepancy' | 'Acoustic Glitch';
  severity: 'Low' | 'Medium' | 'High' | 'Critical';
  confidence: number;
  description: string;
  coordinates?: { x: number; y: number; width: number; height: number }; // Relative 0-100%
}

export interface ImageExplainability {
  heatmapUrl: string;
  originalUrl: string;
  overlayOpacity: number;
  anomalies: AnomalyRegion[];
  gradCamActivationLevel: number;
  spatialNoiseScore: number;
  compressionArtifactIndex: number;
  frequencyDomainAnomalyScore: number;
  exifIntegrity: 'VERIFIED' | 'TAMPERED' | 'STRIPPED';
  faceConsistencyScore: number;
}

export interface SuspiciousFrame {
  frameNumber: number;
  timestamp: string; // e.g. "00:04"
  timeSeconds: number;
  confidence: number;
  anomalyType: string;
  previewUrl: string;
  description: string;
}

export interface VideoExplainability {
  totalFramesAnalyzed: number;
  fps: number;
  suspiciousFramesCount: number;
  suspiciousFrames: SuspiciousFrame[];
  spatiotemporalJitterScore: number;
  eyeblinkPatternConsistency: number; // 0 - 100%
  lipSyncCoherence: number; // 0 - 100%
  temporalFlickerScore: number;
  timelineHeatmap: { timestamp: string; anomalyScore: number; frame: number }[];
}

export interface AudioSegment {
  id: string;
  startTime: string; // "00:04"
  endTime: string;   // "00:07"
  startSeconds: number;
  endSeconds: number;
  syntheticProbability: number;
  description: string;
  flaggedArtefact: 'Vocoder Jitter' | 'Robotic Formant' | 'Breathing Unnatural' | 'Spectral Cutoff';
}

export interface AudioExplainability {
  durationSeconds: number;
  sampleRateHz: number;
  channels: number;
  suspiciousSegments: AudioSegment[];
  spectralFluxVariance: number;
  pitchContinuityScore: number;
  neuralVocoderArtifactIndex: number;
  prosodyNaturalnessScore: number;
  spectrogramUrl?: string;
}

export interface AnalysisResult {
  id: string;
  filename: string;
  fileSize: number;
  mediaType: MediaType;
  prediction: PredictionVerdict;
  confidence: number; // 0 - 100
  riskLevel: 'LOW' | 'MODERATE' | 'HIGH' | 'CRITICAL';
  probabilities: ProbabilityBreakdown;
  modelName: string;
  modelVersion: string;
  processingTimeMs: number;
  createdAt: string;
  sha256Hash: string;
  fileMetadata: FileMetadata;
  evidenceSummary: string[];
  imageDetails?: ImageExplainability;
  videoDetails?: VideoExplainability;
  audioDetails?: AudioExplainability;
  forensicNotes?: string;
}

export interface AnalysisRequest {
  file: File;
  mediaType: MediaType;
  sensitivityPreset?: 'strict' | 'balanced' | 'recall';
  customModelVersion?: string;
}
