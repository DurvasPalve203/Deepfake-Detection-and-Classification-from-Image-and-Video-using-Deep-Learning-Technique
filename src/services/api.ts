import type { AnalysisResult, MediaType } from '../types/analysis';

const DEFAULT_API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

export interface ApiConfig {
  baseUrl: string;
  isBackendConnected: boolean;
}

export async function checkBackendHealth(baseUrl = DEFAULT_API_BASE_URL): Promise<boolean> {
  const apiBaseUrl = baseUrl.trim().replace(/\/$/, '');
  if (!apiBaseUrl) return false;
  try {
    const res = await fetch(`${apiBaseUrl}/health`, { method: 'GET', credentials: 'omit' });
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
  baseUrl: string,
  onProgress?: (stepIndex: number, stepLabel: string, percent: number) => void
): Promise<AnalysisResult> {
  const apiBaseUrl = baseUrl.trim().replace(/\/$/, '');
  if (!apiBaseUrl) {
    onProgress?.(0, 'No model service configured. Set the inference URL in Settings.', 0);
    throw new Error('No model service is configured. Set the backend URL in Settings.');
  }

  const formData = new FormData();
  formData.append('file', file);
  formData.append('mediaType', mediaType);

  onProgress?.(0, `Connecting to ${mediaType.toLowerCase()} model service...`, 15);

  const endpoint = `${apiBaseUrl}/api/v1/detect/${mediaType.toLowerCase()}`;
  const response = await fetch(endpoint, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    let detail = `Backend returned status ${response.status}`;
    try {
      const errorData = await response.json() as { detail?: string };
      if (errorData.detail) detail = errorData.detail;
    } catch {
      // Keep the status-based message when the service does not return JSON.
    }
    throw new Error(detail);
  }

  onProgress?.(3, 'Processing complete, formatting forensic report...', 100);
  const data = await response.json();
  return data as AnalysisResult;
}
