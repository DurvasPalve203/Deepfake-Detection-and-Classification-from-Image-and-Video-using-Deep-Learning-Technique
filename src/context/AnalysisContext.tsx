import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { AnalysisResult } from '../types/analysis';

interface AnalysisContextType {
  analyses: AnalysisResult[];
  currentResult: AnalysisResult | null;
  setCurrentResult: (result: AnalysisResult | null) => void;
  addAnalysis: (result: AnalysisResult) => void;
  deleteAnalysis: (id: string) => void;
  clearAllHistory: () => void;
  getAnalysisById: (id: string) => AnalysisResult | undefined;
  sensitivityPreset: 'strict' | 'balanced' | 'recall';
  setSensitivityPreset: (preset: 'strict' | 'balanced' | 'recall') => void;
  backendUrl: string;
  setBackendUrl: (url: string) => void;
  isBackendConnected: boolean;
  setIsBackendConnected: (connected: boolean) => void;
}

const AnalysisContext = createContext<AnalysisContextType | undefined>(undefined);

const STORAGE_KEY = 'deeptrace_analyses_v1';
const SENSITIVITY_KEY = 'deeptrace_sensitivity';
const BACKEND_URL_KEY = 'deeptrace_backend_url';

export function AnalysisProvider({ children }: { children: ReactNode }) {
  const [analyses, setAnalyses] = useState<AnalysisResult[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Failed to parse saved analyses from local storage:', e);
    }
    return [];
  });

  const [currentResult, setCurrentResult] = useState<AnalysisResult | null>(() => {
    return analyses.length > 0 ? analyses[0] : null;
  });

  const [sensitivityPreset, setSensitivityPresetState] = useState<'strict' | 'balanced' | 'recall'>(() => {
    return (localStorage.getItem(SENSITIVITY_KEY) as 'strict' | 'balanced' | 'recall') || 'balanced';
  });

  const [backendUrl, setBackendUrlState] = useState<string>(() => {
    return localStorage.getItem(BACKEND_URL_KEY) || import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000';
  });

  const [isBackendConnected, setIsBackendConnected] = useState<boolean>(false);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(analyses));
    } catch (e) {
      console.warn('Could not persist analyses to local storage:', e);
    }
  }, [analyses]);

  const setSensitivityPreset = (preset: 'strict' | 'balanced' | 'recall') => {
    setSensitivityPresetState(preset);
    localStorage.setItem(SENSITIVITY_KEY, preset);
  };

  const setBackendUrl = (url: string) => {
    setBackendUrlState(url);
    localStorage.setItem(BACKEND_URL_KEY, url);
  };

  const addAnalysis = (result: AnalysisResult) => {
    setAnalyses(prev => [result, ...prev.filter(a => a.id !== result.id)]);
    setCurrentResult(result);
  };

  const deleteAnalysis = (id: string) => {
    setAnalyses(prev => prev.filter(a => a.id !== id));
    if (currentResult?.id === id) {
      const remaining = analyses.filter(a => a.id !== id);
      setCurrentResult(remaining.length > 0 ? remaining[0] : null);
    }
  };

  const clearAllHistory = () => {
    setAnalyses([]);
    setCurrentResult(null);
  };

  const getAnalysisById = (id: string): AnalysisResult | undefined => {
    return analyses.find(a => a.id === id);
  };

  return (
    <AnalysisContext.Provider
      value={{
        analyses,
        currentResult,
        setCurrentResult,
        addAnalysis,
        deleteAnalysis,
        clearAllHistory,
        getAnalysisById,
        sensitivityPreset,
        setSensitivityPreset,
        backendUrl,
        setBackendUrl,
        isBackendConnected,
        setIsBackendConnected,
      }}
    >
      {children}
    </AnalysisContext.Provider>
  );
}

export function useAnalysisContext() {
  const context = useContext(AnalysisContext);
  if (!context) {
    throw new Error('useAnalysisContext must be used within an AnalysisProvider');
  }
  return context;
}
