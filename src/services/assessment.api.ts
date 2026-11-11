import { httpRequest } from './apiClient';
import {
  StudentSafePromptConfigItem,
  StoredMcqAttemptResult,
  AssessmentPublishStatus,
} from '../data/phase2QuizBank';

export interface StudentAssessmentPayload {
  assessmentId: string;
  isFinalExam: boolean;
  status?: AssessmentPublishStatus;
  title: string;
  questionCount: number;
  timeLimitMinutes: number;
  isRetakeLocked: boolean;
  promptConfig: StudentSafePromptConfigItem[];
}

export const assessmentApi = {
  getAssessmentForStudent: (assessmentId: string) =>
    httpRequest<StudentAssessmentPayload>(
      `/assessments/${encodeURIComponent(assessmentId)}`,
      { method: 'GET' }
    ),

  submitAssessmentAttempt: (
    assessmentId: string,
    answers: Record<number, number>,
    telemetryLog?: unknown
  ) =>
    httpRequest<StoredMcqAttemptResult>(
      `/assessments/${encodeURIComponent(assessmentId)}/submit`,
      {
        method: 'POST',
        body: JSON.stringify({ answers, telemetryLog }),
      }
    ),

  getAssessmentResult: (assessmentId: string) =>
    httpRequest<StoredMcqAttemptResult>(
      `/assessments/${encodeURIComponent(assessmentId)}/result`,
      { method: 'GET' }
    ),

  reportProctoringEvent: (
    assessmentId: string,
    eventType: string,
    snapshotNote?: string
  ) =>
    httpRequest<{
      assessmentId: string;
      recorded: boolean;
      eventType: string;
      timestamp: string;
    }>(`/assessments/${encodeURIComponent(assessmentId)}/proctoring-events`, {
      method: 'POST',
      body: JSON.stringify({ eventType, snapshotNote }),
    }),
};
