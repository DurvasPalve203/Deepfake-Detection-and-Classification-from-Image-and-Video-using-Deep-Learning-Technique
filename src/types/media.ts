export type MediaType = 'IMAGE' | 'VIDEO' | 'AUDIO';

export interface ModalityConfig {
  id: MediaType;
  title: string;
  shortTitle: string;
  tagline: string;
  description: string;
  acceptedExtensions: string[];
  acceptedMimeTypes: string[];
  maxSizeMB: number;
  iconName: string;
  modelTech: string;
  badgeText: string;
}

export const MODALITY_CONFIGS: Record<MediaType, ModalityConfig> = {
  IMAGE: {
    id: 'IMAGE',
    title: 'Image Forensics',
    shortTitle: 'Image',
    tagline: 'Visual manipulation and artifact detection',
    description: 'Deep neural analysis for face swap, GAN artifacts, inpainting, diffusion synthesis, and metadata inconsistency.',
    acceptedExtensions: ['.jpg', '.jpeg', '.png', '.webp'],
    acceptedMimeTypes: ['image/jpeg', 'image/png', 'image/webp'],
    maxSizeMB: 25,
    iconName: 'Image',
    modelTech: 'Spatial-Frequency CNN & Grad-CAM',
    badgeText: 'Vision Engine'
  },
  VIDEO: {
    id: 'VIDEO',
    title: 'Video Forensics',
    shortTitle: 'Video',
    tagline: 'Frame-level and temporal coherence analysis',
    description: 'Spatiotemporal inspection across frame sequences to identify landmark jitter, temporal flickers, and lip-sync anomalies.',
    acceptedExtensions: ['.mp4', '.mov', '.avi', '.webm'],
    acceptedMimeTypes: ['video/mp4', 'video/quicktime', 'video/x-msvideo', 'video/webm'],
    maxSizeMB: 100,
    iconName: 'Video',
    modelTech: 'Spatiotemporal 3D-CNN / ViT',
    badgeText: 'Temporal Engine'
  },
  AUDIO: {
    id: 'AUDIO',
    title: 'Audio Forensics',
    shortTitle: 'Audio',
    tagline: 'Synthetic voice and cloned speech detection',
    description: 'Spectral density analysis to detect voice cloning, neural vocoder artifacts, and synthetic prosody inconsistencies.',
    acceptedExtensions: ['.mp3', '.wav', '.m4a', '.aac'],
    acceptedMimeTypes: ['audio/mpeg', 'audio/wav', 'audio/x-m4a', 'audio/aac'],
    maxSizeMB: 50,
    iconName: 'Mic',
    modelTech: 'Mel-Spectrogram Transformer',
    badgeText: 'Acoustic Engine'
  }
};

export interface FileMetadata {
  name: string;
  size: number;
  type: string;
  lastModified: number;
  previewUrl: string;
  dimensions?: { width: number; height: number };
  durationSeconds?: number;
  sha256?: string;
}
