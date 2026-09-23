import type { AnalysisResult, MediaType } from '../types/analysis';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

export interface ApiConfig {
  baseUrl: string;
  isBackendConnected: boolean;
}

export async function checkBackendHealth(): Promise<boolean> {
  if (!API_BASE_URL) return false;
  try {
    const res = await fetch(`${API_BASE_URL}/health`, { method: 'GET', credentials: 'omit' });
    return res.ok;
  } catch {
    return false;
  }
}

/**
 * Unified media analysis dispatcher.
 * Hook this up to your real backend or custom modal pipeline later.
 */
export async function performForensicAnalysis(
  file: File,
  mediaType: MediaType,
  onProgress?: (stepIndex: number, stepLabel: string, percent: number) => void
): Promise<AnalysisResult> {
  if (!API_BASE_URL) {
    onProgress?.(0, 'No backend configured yet. Connect your custom analysis pipeline here.', 0);
    throw new Error('No backend or analysis service is configured. Add your own model module and wire it here.');
  }

  const formData = new FormData();
  formData.append('file', file);
  formData.append('mediaType', mediaType);

  onProgress?.(0, 'Connecting to DeepTrace AI Backend API...', 15);

  const endpoint = `${API_BASE_URL}/api/v1/detect/${mediaType.toLowerCase()}`;
  const response = await fetch(endpoint, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    throw new Error(`Backend returned status ${response.status}`);
  }

  onProgress?.(3, 'Processing complete, formatting forensic report...', 100);
  const data = await response.json();
  return data as AnalysisResult;
}
