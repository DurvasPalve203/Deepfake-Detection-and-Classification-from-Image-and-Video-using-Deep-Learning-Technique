import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { MediaType, AnalysisResult, AnalysisPipelineStep } from '../types/analysis';
import { performForensicAnalysis } from '../services/api';
import { useAnalysisContext } from '../context/AnalysisContext';
import { useToast } from '../context/ToastContext';

export function useAnalysis() {
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [currentStepLabel, setCurrentStepLabel] = useState<string>('');
  const [currentProgress, setCurrentProgress] = useState<number>(0);
  const [pipelineSteps, setPipelineSteps] = useState<AnalysisPipelineStep[]>([]);
  
  const { addAnalysis, setCurrentResult, backendUrl } = useAnalysisContext();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const runAnalysis = useCallback(async (file: File, mediaType: MediaType) => {
    setIsAnalyzing(true);
    setCurrentProgress(5);
    setCurrentStepLabel('Initiating media forensics pipeline...');

    const defaultSteps: AnalysisPipelineStep[] = [
      { id: '1', label: 'File Ingestion & Hash Calculation', description: 'Generating SHA-256 digital fingerprint & metadata check', status: 'active', progressPercentage: 20 },
      { id: '2', label: 'Spatial & Frequency Feature Extraction', description: 'Computing 2D-FFT noise spectrum & landmark contours', status: 'pending', progressPercentage: 45 },
      { id: '3', label: 'Deep Neural Detection Classification', description: 'Executing deep forensic vision/temporal/acoustic model', status: 'pending', progressPercentage: 75 },
      { id: '4', label: 'Explainability & Grad-CAM Localization', description: 'Synthesizing evidence heatmaps and anomaly maps', status: 'pending', progressPercentage: 100 },
    ];
    setPipelineSteps(defaultSteps);

    try {
      const result: AnalysisResult = await performForensicAnalysis(
        file,
        mediaType,
        backendUrl,
        (stepIndex, stepLabel, percent) => {
          setCurrentProgress(percent);
          setCurrentStepLabel(stepLabel);
          
          setPipelineSteps(prev => 
            prev.map((step, idx) => {
              if (idx < stepIndex) return { ...step, status: 'completed' };
              if (idx === stepIndex) return { ...step, status: 'active' };
              return { ...step, status: 'pending' };
            })
          );
        }
      );

      // Finalize steps
      setPipelineSteps(prev => prev.map(s => ({ ...s, status: 'completed' })));
      setCurrentProgress(100);
      setCurrentStepLabel('Forensic analysis complete!');

      // Keep the browser-local media available to the result viewer.
      result.fileMetadata.previewUrl = URL.createObjectURL(file);

      // Save to context & history
      addAnalysis(result);
      setCurrentResult(result);

      if (result.prediction === 'LIKELY_MANIPULATED') {
        showToast('warning', 'Potential Manipulation Detected', `Analysis flagged ${result.filename} with ${result.confidence}% confidence.`, 5000);
      } else if (result.prediction === 'AUTHENTIC') {
        showToast('success', 'Authenticity Verified', `No synthetic artifacts detected in ${result.filename}.`, 4000);
      } else {
        showToast('info', 'Analysis Inconclusive', `Media quality is insufficient for conclusive determination.`, 4500);
      }

      // Small delay for UI smoothness then navigate
      setTimeout(() => {
        setIsAnalyzing(false);
        navigate(`/result/${result.id}`);
      }, 600);

      return result;
    } catch (err: any) {
      setIsAnalyzing(false);
      showToast('error', 'Forensic Analysis Failed', err?.message || 'An unexpected error occurred during processing.');
      throw err;
    }
  }, [addAnalysis, backendUrl, setCurrentResult, showToast, navigate]);

  return {
    isAnalyzing,
    currentStepLabel,
    currentProgress,
    pipelineSteps,
    runAnalysis,
  };
}
