import { httpRequest } from './apiClient';
import { Cohort, ClassSession } from '../types/domain';
import { McqQuestionItem, AssessmentPublishStatus } from '../data/phase2QuizBank';

export const teachApi = {
  getInstructorSchedule: () =>
    httpRequest<{
      liveSession: ClassSession;
      upcomingSessions: ClassSession[];
    }>('/teach/schedule', {
      method: 'GET',
    }),

  getInstructorCohorts: () =>
    httpRequest<Cohort[]>('/teach/cohorts', {
      method: 'GET',
    }),

  getInstructorCohortDetail: (cohortId: string) =>
    httpRequest<{
      cohort: Cohort;
      sessions: ClassSession[];
      finalExamQuestions: McqQuestionItem[];
    }>(`/teach/cohorts/${encodeURIComponent(cohortId)}`, {
      method: 'GET',
    }),

  getInstructorSessionDetail: (cohortId: string, sessionId: string) =>
    httpRequest<{
      session: ClassSession;
      questions: McqQuestionItem[];
      publishStatus: AssessmentPublishStatus;
    }>(
      `/teach/cohorts/${encodeURIComponent(cohortId)}/sessions/${encodeURIComponent(
        sessionId
      )}`,
      { method: 'GET' }
    ),

  updateSessionMaterials: (
    sessionId: string,
    payload: { aiSummaryMd?: string; materialTitle?: string; fileType?: 'SLIDE' | 'PDF' }
  ) =>
    httpRequest<{ sessionId: string; updated: boolean; updatedAt: string }>(
      `/teach/sessions/${encodeURIComponent(sessionId)}/materials`,
      {
        method: 'PUT',
        body: JSON.stringify(payload),
      }
    ),

  generateSessionQuizByAi: (sessionId: string) =>
    httpRequest<{
      assessmentId: string;
      sessionId: string;
      status: AssessmentPublishStatus;
      items: McqQuestionItem[];
    }>(`/teach/sessions/${encodeURIComponent(sessionId)}/generate-quiz`, {
      method: 'POST',
    }),

  publishAssessment: (assessmentId: string, items: McqQuestionItem[]) =>
    httpRequest<{
      assessmentId: string;
      status: 'PUBLISHED';
      publishedCount: number;
      publishedAt: string;
    }>(`/teach/assessments/${encodeURIComponent(assessmentId)}/publish`, {
      method: 'PUT',
      body: JSON.stringify({ status: 'PUBLISHED', items }),
    }),

  createGuestSpeakerLink: (sessionId: string) =>
    httpRequest<{
      sessionId: string;
      oneTimeGuestUrl: string;
      expiresInHours: number;
    }>(`/teach/sessions/${encodeURIComponent(sessionId)}/guest-link`, {
      method: 'POST',
    }),

  replyAndVerifyDiscussion: (threadId: string, content: string) =>
    httpRequest<{
      threadId: string;
      verifiedByStaff: boolean;
      repliedAt: string;
    }>(`/teach/discussions/${encodeURIComponent(threadId)}/reply`, {
      method: 'POST',
      body: JSON.stringify({ content }),
    }),

  reviewExamProctoring: (
    reviewId: string,
    decision: 'APPROVED' | 'RETAKE_REQUIRED'
  ) =>
    httpRequest<{
      reviewId: string;
      decision: 'APPROVED' | 'RETAKE_REQUIRED';
      updatedAt: string;
    }>(`/teach/exam-reviews/${encodeURIComponent(reviewId)}`, {
      method: 'PUT',
      body: JSON.stringify({ decision }),
    }),

  sendAiPersonalizedReminder: (enrollmentId: string) =>
    httpRequest<{
      notificationId: string;
      enrollmentId: string;
      type: 'AI_STUDY_REMINDER';
      title: string;
      createdAt: string;
    }>(`/teach/enrollments/${encodeURIComponent(enrollmentId)}/ai-reminder`, {
      method: 'POST',
    }),
};

