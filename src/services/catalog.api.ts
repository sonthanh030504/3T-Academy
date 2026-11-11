import { httpRequest } from './apiClient';
import { Course, Cohort, CourseSkill, CertificateRecord } from '../types/domain';

export interface CatalogFilters {
  category?: string;
  level?: string;
  query?: string;
}

export interface CourseDetailWithCohortsResponse {
  course: Course;
  cohorts: Cohort[];
  syllabusTemplate: {
    version: string;
    totalWeeks: number;
    sessionsPerWeek: number;
    modules: Course['syllabusTemplate'];
  };
}

export const catalogApi = {
  getCategories: () =>
    httpRequest<{ id: string; name: string; count: number }[]>('/categories', {
      method: 'GET',
    }),

  getSkills: () =>
    httpRequest<CourseSkill[]>('/skills', {
      method: 'GET',
    }),

  getCourses: (filters?: CatalogFilters) =>
    httpRequest<Course[]>(
      `/courses?category=${encodeURIComponent(filters?.category || '')}&level=${encodeURIComponent(
        filters?.level || ''
      )}&q=${encodeURIComponent(filters?.query || '')}`,
      { method: 'GET' }
    ),

  getCourseBySlug: (slug: string) =>
    httpRequest<CourseDetailWithCohortsResponse>(`/courses/${encodeURIComponent(slug)}`, {
      method: 'GET',
    }),

  askPublicAdvisor: (goal: string, background?: string) =>
    httpRequest<{
      replyText: string;
      recommendedCourseSlug: string;
      recommendedCohortId: string;
    }>('/advisor/ask', {
      method: 'POST',
      body: JSON.stringify({ goal, background }),
    }),

  verifyCertificateByCode: (code: string) =>
    httpRequest<{ found: boolean; certificate: CertificateRecord }>(
      `/certificates/verify/${encodeURIComponent(code)}`,
      { method: 'GET' }
    ),
};
