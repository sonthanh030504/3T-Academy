import { httpRequest } from './apiClient';
import {
  CvParsedData,
  CvScreeningResult,
  InterviewEvaluationReport,
  StudentResumeData,
  StudentSkillStateRecord,
} from '../types/domain';

export type EnrolledSkillStateItem = StudentSkillStateRecord;

export interface ExternalCvSkillTagItem {
  name: string;
  note: string;
}

export interface ProfileAndSkillsResponse {
  userProfile: {
    userId?: string;
    fullName: string;
    headline: string;
    bio?: string;
    email: string;
    phone: string;
    githubUrl: string;
    linkedinUrl: string;
    careerObjective: string;
    careerGoal?: string;
    latestCvFileName: string;
    latestCvUpdatedAt: string;
    interviewCredits: number;
    cvParsedData: CvParsedData;
  };
  studentSkillStates: EnrolledSkillStateItem[];
  externalCvSkills: ExternalCvSkillTagItem[];
}

export interface Round1CvScreeningResponse {
  interviewId: string;
  status: 'CV_SCREENING';
  creditDeducted: 0;
  availableCredits: number;
  cvScreeningResult: CvScreeningResult;
}

export const profileInterviewApi = {
  getMyProfileAndSkills: () =>
    httpRequest<ProfileAndSkillsResponse>('/me/profile-skills', {
      method: 'GET',
    }),

  uploadAndParseCv: (
    fileOrNameOrPayload: File | string | Partial<StudentResumeData>,
    resumeData?: Partial<StudentResumeData>
  ) => {
    const isFile =
      typeof fileOrNameOrPayload === 'object' &&
      fileOrNameOrPayload !== null &&
      'name' in fileOrNameOrPayload &&
      typeof (fileOrNameOrPayload as File).name === 'string' &&
      'size' in fileOrNameOrPayload;

    const isResumePayloadObject =
      typeof fileOrNameOrPayload === 'object' &&
      fileOrNameOrPayload !== null &&
      !isFile;

    const fileName =
      typeof fileOrNameOrPayload === 'string'
        ? fileOrNameOrPayload
        : isFile
        ? (fileOrNameOrPayload as File).name
        : 'CV_Ho_So_Nang_Luc_2026.pdf';

    const size = isFile ? (fileOrNameOrPayload as File).size : 245000;
    const effectiveResumeData = isResumePayloadObject
      ? (fileOrNameOrPayload as Partial<StudentResumeData>)
      : resumeData;

    return httpRequest<{
      fileName: string;
      updatedAt: string;
      cvParsedData: CvParsedData;
    }>('/me/cv/upload', {
      method: 'POST',
      body: JSON.stringify({
        fileName,
        size,
        mode: effectiveResumeData ? 'SAVE_RESUME' : 'PARSE_PDF',
        resumeData: effectiveResumeData,
      }),
    });
  },

  screenCvAgainstJd: (
    targetLevel: string,
    targetRole: string,
    jdRawText: string,
    scenarioMode: 'READY_78' | 'MISSING_COURSE_45' = 'READY_78'
  ) =>
    httpRequest<Round1CvScreeningResponse>('/interviews/screen-cv', {
      method: 'POST',
      body: JSON.stringify({ targetLevel, targetRole, jdRawText, scenarioMode }),
    }),

  startVoiceInterview: (interviewId: string) =>
    httpRequest<{
      interviewId: string;
      status: 'IN_PROGRESS';
      startedAt: string;
    }>(`/interviews/${encodeURIComponent(interviewId)}/start`, {
      method: 'POST',
    }),

  sendVoiceTurn: (interviewId: string, userTranscriptText: string) =>
    httpRequest<{
      interviewId: string;
      recordedTranscript: string;
      acknowledged: boolean;
    }>(`/interviews/${encodeURIComponent(interviewId)}/turn`, {
      method: 'POST',
      body: JSON.stringify({ transcript: userTranscriptText }),
    }),

  completeInterview: (interviewId: string) =>
    httpRequest<{
      interviewId: string;
      status: 'COMPLETED';
      creditDeducted: 1;
      remainingCredits: number;
      evaluationReport: InterviewEvaluationReport;
    }>(`/interviews/${encodeURIComponent(interviewId)}/complete`, {
      method: 'POST',
    }),

  cancelDraftInterview: (interviewId: string) =>
    httpRequest<{
      interviewId: string;
      deleted: true;
      creditDeducted: 0;
    }>(`/interviews/${encodeURIComponent(interviewId)}`, {
      method: 'DELETE',
    }),
};

export const profileAndInterviewApi = profileInterviewApi;
