import { httpRequest } from './apiClient';
import {
  Course,
  Cohort,
  ClassSession,
  DiscussionThread,
  CohortMaterial,
  UpcomingTaskItem,
  OrderReceipt,
} from '../types/domain';

export interface StudentDashboardSummaryResponse {
  liveSession: ClassSession;
  resumeSession: ClassSession;
  upcomingTasks: UpcomingTaskItem[];
  streakDays: number;
}

export interface SessionDetailPayload {
  session: ClassSession;
  videoUrl: string;
  transcript: {
    sec: number;
    timeLabel: string;
    speaker: string;
    text: string;
    slidePage: number;
  }[];
  attachments: CohortMaterial[];
  quizSummary: {
    assessmentId: string;
    questionCount: number;
    passingScoreOutOf10: number;
    isCompleted: boolean;
    bestScorePercent?: number | null;
  };
  discussions: DiscussionThread[];
}

export const learningApi = {
  getStudentDashboard: () =>
    httpRequest<StudentDashboardSummaryResponse>('/me/dashboard', {
      method: 'GET',
    }),

  getDashboardSummary: () =>
    httpRequest<StudentDashboardSummaryResponse>('/me/dashboard', {
      method: 'GET',
    }),

  getMyEnrollments: () =>
    httpRequest<{ enrolledCohortIds: string[]; cohorts: Cohort[]; receipts: OrderReceipt[] }>(
      '/me/enrollments',
      { method: 'GET' }
    ),

  getCohortWorkspace: (cohortId: string) =>
    httpRequest<{
      cohort: Cohort;
      course: Course;
      sessions: ClassSession[];
      materials: CohortMaterial[];
    }>(`/cohorts/${encodeURIComponent(cohortId)}/workspace`, {
      method: 'GET',
    }),

  getSessionDetail: (cohortId: string, sessionId: string) =>
    httpRequest<SessionDetailPayload>(
      `/cohorts/${encodeURIComponent(cohortId)}/sessions/${encodeURIComponent(sessionId)}`,
      { method: 'GET' }
    ),

  updateVideoProgress: (sessionId: string, lastPositionSec: number) =>
    httpRequest<{ sessionId: string; lastPositionSec: number; savedAt: string }>(
      `/sessions/${encodeURIComponent(sessionId)}/progress`,
      {
        method: 'PUT',
        body: JSON.stringify({ lastPositionSec }),
      }
    ),

  askSessionAiTutor: (sessionId: string, question: string, currentTimestampSec?: number) =>
    httpRequest<{
      answerMd: string;
      citations: { label: string; jumpSec: number; slideLabel: string }[];
    }>('/ai/tutor/ask', {
      method: 'POST',
      body: JSON.stringify({ sessionId, question, currentTimestampSec }),
    }),

  getSessionDiscussions: (sessionId: string) =>
    httpRequest<DiscussionThread[]>(
      `/sessions/${encodeURIComponent(sessionId)}/discussions`,
      { method: 'GET' }
    ),

  createSessionQuestion: (
    sessionId: string,
    contentMd: string,
    videoTimestampSec: number,
    title?: string
  ) =>
    httpRequest<{ threadId: string; status: string; videoTimestampSec: number }>(
      `/sessions/${encodeURIComponent(sessionId)}/discussions`,
      {
        method: 'POST',
        body: JSON.stringify({ title, contentMd, videoTimestampSec }),
      }
    ),
};

export const studentLearningApi = learningApi;
