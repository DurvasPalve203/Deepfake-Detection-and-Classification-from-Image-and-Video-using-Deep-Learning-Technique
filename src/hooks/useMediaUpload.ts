import { useState, useCallback, useEffect } from 'react';
import { MediaType, MODALITY_CONFIGS, FileMetadata } from '../types/media';
import { UploadState } from '../types/analysis';

export function useMediaUpload(initialModality: MediaType = 'IMAGE') {
  const [mediaType, setMediaType] = useState<MediaType>(initialModality);
  const [uploadState, setUploadState] = useState<UploadState>('EMPTY');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileMetadata, setFileMetadata] = useState<FileMetadata | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [isDragOver, setIsDragOver] = useState<boolean>(false);

  // Clear preview URL on unmount or file replacement
  useEffect(() => {
    return () => {
      if (fileMetadata?.previewUrl && fileMetadata.previewUrl.startsWith('blob:')) {
        URL.revokeObjectURL(fileMetadata.previewUrl);
      }
    };
  }, [fileMetadata?.previewUrl]);

  const validateFile = useCallback((file: File, type: MediaType): string | null => {
    const config = MODALITY_CONFIGS[type];
    
    // Check file size
    const maxSizeBytes = config.maxSizeMB * 1024 * 1024;
    if (file.size > maxSizeBytes) {
      return `File size (${(file.size / (1024 * 1024)).toFixed(1)} MB) exceeds the maximum limit of ${config.maxSizeMB} MB.`;
    }

    // Check extension
    const fileExt = '.' + file.name.split('.').pop()?.toLowerCase();
    const isExtensionValid = config.acceptedExtensions.some(ext => ext.toLowerCase() === fileExt);
    
    // Check MIME type if available
    const isMimeValid = file.type ? config.acceptedMimeTypes.some(mime => file.type.toLowerCase().startsWith(mime.split('/')[0])) : true;

    if (!isExtensionValid && !isMimeValid) {
      return `Invalid file format for ${config.shortTitle} analysis. Accepted formats: ${config.acceptedExtensions.join(', ').toUpperCase()}`;
    }

    return null;
  }, []);

  const handleFileSelect = useCallback((file: File, overrideType?: MediaType) => {
    const activeType = overrideType || mediaType;
    setUploadState('VALIDATING');
    setErrorMessage(null);

    const validationError = validateFile(file, activeType);
    if (validationError) {
      setErrorMessage(validationError);
      setUploadState('ERROR');
      return;
    }

    const preview = URL.createObjectURL(file);
    const meta: FileMetadata = {
      name: file.name,
      size: file.size,
      type: file.type || 'application/octet-stream',
      lastModified: file.lastModified,
      previewUrl: preview,
    };

    setSelectedFile(file);
    setFileMetadata(meta);
    setUploadState('READY');
  }, [mediaType, validateFile]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      handleFileSelect(file);
    }
  }, [handleFileSelect]);

  const removeFile = useCallback(() => {
    if (fileMetadata?.previewUrl && fileMetadata.previewUrl.startsWith('blob:')) {
      URL.revokeObjectURL(fileMetadata.previewUrl);
    }
    setSelectedFile(null);
    setFileMetadata(null);
    setErrorMessage(null);
    setUploadProgress(0);
    setUploadState('EMPTY');
  }, [fileMetadata?.previewUrl]);

  const switchModality = useCallback((newType: MediaType) => {
    if (newType !== mediaType) {
      removeFile();
      setMediaType(newType);
    }
  }, [mediaType, removeFile]);

  return {
    mediaType,
    uploadState,
    selectedFile,
    fileMetadata,
    errorMessage,
    uploadProgress,
    isDragOver,
    setUploadState,
    setUploadProgress,
    setErrorMessage,
    switchModality,
    handleFileSelect,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    removeFile,
  };
}
