import { AnalysisResult } from './analysis';

export interface ForensicReport {
  reportId: string;
  analysisId: string;
  generatedDate: string;
  generatedBy: string;
  investigatorNotes?: string;
  digitalSignature: string;
  verificationUrl: string;
  analysisSummary: AnalysisResult;
  complianceStandards: string[];
  pdfDownloadUrl?: string;
  status: 'CERTIFIED' | 'PRELIMINARY' | 'ARCHIVED';
}
