import React from 'react';
import { ModalitySelector } from './ModalitySelector';
import { DropZone } from './DropZone';
import { FilePreview } from './FilePreview';
import { UploadProgress } from './UploadProgress';
import { useMediaUpload } from '../../hooks/useMediaUpload';
import { useAnalysis } from '../../hooks/useAnalysis';
import { MediaType } from '../../types/media';

interface MediaUploaderProps {
  initialModality?: MediaType;
}

export const MediaUploader: React.FC<MediaUploaderProps> = ({ initialModality = 'IMAGE' }) => {
  const {
    mediaType,
    uploadState,
    selectedFile,
    fileMetadata,
    errorMessage,
    isDragOver,
    switchModality,
    handleFileSelect,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    removeFile,
  } = useMediaUpload(initialModality);

  const {
    isAnalyzing,
    currentStepLabel,
    currentProgress,
    pipelineSteps,
    runAnalysis,
  } = useAnalysis();

  const handleExecuteAnalysis = async () => {
    if (!selectedFile) return;
    await runAnalysis(selectedFile, mediaType);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* 1. Modality Switcher Tabs */}
      <ModalitySelector
        selectedModality={mediaType}
        onSelect={switchModality}
        disabled={isAnalyzing}
      />

      {/* 2. Upload Workspace State Handling */}
      <div className="rounded-2xl p-1 bg-gradient-to-b from-slate-800/40 to-transparent">
        {isAnalyzing ? (
          <UploadProgress
            progressPercentage={currentProgress}
            currentStepLabel={currentStepLabel}
            pipelineSteps={pipelineSteps}
          />
        ) : selectedFile && fileMetadata ? (
          <FilePreview
            mediaType={mediaType}
            file={selectedFile}
            metadata={fileMetadata}
            isAnalyzing={isAnalyzing}
            onRemove={removeFile}
            onReplace={removeFile}
            onAnalyze={handleExecuteAnalysis}
          />
        ) : (
          <DropZone
            mediaType={mediaType}
            isDragOver={isDragOver}
            errorMessage={errorMessage}
            onFileSelect={handleFileSelect}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          />
        )}
      </div>
    </div>
  );
};
