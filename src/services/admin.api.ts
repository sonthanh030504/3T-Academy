import { httpRequest } from './apiClient';
import {
  Course,
  Cohort,
  CohortScheduleSlot,
  CertificateRecord,
  PaymentTransactionRecord,
  UserRole,
} from '../types/domain';

export const adminApi = {
  getAdminOverview: () =>
    httpRequest<{
      totalRevenueVnd: number;
      activeCohortsCount: number;
      totalStudentsCount: number;
      issuedCertificatesCount: number;
      cohorts: Cohort[];
      certificates: Record<string, CertificateRecord>;
    }>('/admin/overview', {
      method: 'GET',
    }),

  manageCourses: (payload: Partial<Course>) =>
    httpRequest<{ courseId: string; status: 'SAVED'; course: Partial<Course> }>(
      '/admin/courses',
      {
        method: 'POST',
        body: JSON.stringify(payload),
      }
    ),

  manageCohorts: (payload: {
    cohortId?: string;
    courseId: string;
    instructorId: string;
    curriculumVersion: string;
    code: string;
    name: string;
    tuitionVnd: number;
    startDate: string;
    scheduleSlots: CohortScheduleSlot[];
  }) =>
    httpRequest<{
      cohortId: string;
      status: 'CREATED' | 'UPDATED';
      instructorId: string;
      curriculumVersion: string;
      scheduleSlots: CohortScheduleSlot[];
      payload: typeof payload;
    }>('/admin/cohorts', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),

  manageUsers: (payload: { userId: string; role: UserRole; isActive?: boolean }) =>
    httpRequest<{ userId: string; role: UserRole; updated: boolean }>('/admin/users', {
      method: 'PUT',
      body: JSON.stringify(payload),
    }),

  getSepayTransactions: () =>
    httpRequest<PaymentTransactionRecord[]>('/admin/sepay-transactions', {
      method: 'GET',
    }),

  issueCertificatesBatch: (enrollmentIds: string[]) =>
    httpRequest<{
      issuedCount: number;
      certificateCodes: string[];
      bonusInterviewCreditsAdded: number;
    }>('/admin/certificates/issue', {
      method: 'POST',
      body: JSON.stringify({ enrollmentIds }),
    }),
};
