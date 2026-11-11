import React from 'react';
import { AcademyProvider, useAcademy } from './context/AcademyContext';
import { TopNavbar } from './components/TopNavbar';
import { DevToolbar } from './components/DevToolbar';
import { CommandPaletteModal } from './components/CommandPaletteModal';
import { SessionPlayerQuizModal } from './components/SessionPlayerQuizModal';
import { HomeView } from './views/HomeView';
import { CoursesCatalogView } from './views/CoursesCatalogView';
import { CourseDetailView } from './views/CourseDetailView';
import { AboutAcademyView } from './views/AboutAcademyView';
import { AiAdvisorView } from './views/AiAdvisorView';
import { VietQrCheckoutView } from './views/VietQrCheckoutView';
import { CertificateVerifyView } from './views/CertificateVerifyView';
import { AuthView } from './views/AuthView';
import { OnboardingWizardView } from './views/OnboardingWizardView';
import { StudentDashboardView } from './views/StudentDashboardView';
import { CohortWorkspaceView } from './views/CohortWorkspaceView';
import { InstructorPortalView } from './views/InstructorPortalView';
import { AdminPortalView } from './views/AdminPortalView';
import { SessionVideoRoomView } from './views/SessionVideoRoomView';
import { AssessmentRoomView } from './views/AssessmentRoomView';
import { AssessmentResultView } from './views/AssessmentResultView';
import { ProctoredExamRoomView } from './views/ProctoredExamRoomView';
import { LivestreamClassView } from './views/LivestreamClassView';

const AppRouter: React.FC = () => {
  const { currentPath, role } = useAcademy();
  const cleanPath = currentPath.split('?')[0] || '/';

  // Dedicated Instructor Portal (/teach)
  if (cleanPath.startsWith('/teach')) {
    return <InstructorPortalView />;
  }

  // Dedicated Admin Portal (/admin)
  if (cleanPath.startsWith('/admin')) {
    return <AdminPortalView />;
  }

  // Dedicated About Academy & FAQ page (/about)
  if (cleanPath === '/about') {
    return <AboutAcademyView />;
  }

  // Phase 2 — 5. Livestream Classroom & 1-Click Guest Speaker (/live/:sessionId & /live/guest)
  if (cleanPath === '/live/guest') {
    return <LivestreamClassView sessionId="sess-k01-05" isGuestEntry={true} />;
  }
  if (cleanPath.startsWith('/live/')) {
    const liveSessionId = cleanPath.replace('/live/', '') || 'sess-k01-05';
    return <LivestreamClassView sessionId={liveSessionId} />;
  }

  // Phase 2 — 1. Video Classroom & Second-by-Second AI Tutor (/app/cohorts/:cohortId/sessions/:sessionId)
  if (cleanPath.startsWith('/app/cohorts/') && cleanPath.includes('/sessions/')) {
    const parts = cleanPath.replace('/app/cohorts/', '').split('/sessions/');
    const cohortId = parts[0] || 'cohort-ai-k01';
    const sessionId = parts[1] || 'sess-k01-04';
    return <SessionVideoRoomView cohortId={cohortId} sessionId={sessionId} />;
  }

  // Phase 2 — 3. Assessment Result & Exact Video Review Guide (/app/assessments/:assessmentId/results)
  if (cleanPath.startsWith('/app/assessments/') && cleanPath.endsWith('/results')) {
    const assessmentId = cleanPath
      .replace('/app/assessments/', '')
      .replace('/results', '');
    return <AssessmentResultView assessmentId={assessmentId || 'sess-k01-04'} />;
  }

  // Phase 2 — 2. 6-Question-Type Assessment Room (/app/assessments/:assessmentId)
  if (cleanPath.startsWith('/app/assessments/')) {
    const assessmentId = cleanPath.replace('/app/assessments/', '') || 'sess-k01-04';
    return <AssessmentRoomView assessmentId={assessmentId} />;
  }

  // Phase 2 — 4. Proctored Final Exam Room (/app/exams/:assessmentId)
  if (cleanPath.startsWith('/app/exams/')) {
    const examId = cleanPath.replace('/app/exams/', '') || 'exam-final-k01';
    return <ProctoredExamRoomView assessmentId={examId} />;
  }

  if (cleanPath === '/' || cleanPath === '') {
    return <HomeView />;
  }
  if (cleanPath === '/courses') {
    return <CoursesCatalogView />;
  }
  if (cleanPath.startsWith('/courses/')) {
    const slug = cleanPath.replace('/courses/', '');
    return <CourseDetailView slug={slug} />;
  }
  if (cleanPath === '/advisor') {
    return <AiAdvisorView />;
  }
  if (cleanPath.startsWith('/checkout/')) {
    const cohortCode = cleanPath.replace('/checkout/', '');
    return <VietQrCheckoutView cohortCode={cohortCode} />;
  }
  if (cleanPath.startsWith('/verify/')) {
    const certCode = cleanPath.replace('/verify/', '');
    return <CertificateVerifyView certificateCode={certCode} />;
  }
  if (cleanPath.startsWith('/certificates/verify/')) {
    const certCode = cleanPath.replace('/certificates/verify/', '');
    return <CertificateVerifyView certificateCode={certCode} />;
  }
  if (cleanPath === '/login') {
    return <AuthView initialMode="LOGIN" />;
  }
  if (cleanPath === '/register') {
    return <AuthView initialMode="REGISTER" />;
  }
  if (cleanPath === '/onboarding') {
    return <OnboardingWizardView />;
  }
  if (cleanPath.startsWith('/app/cohorts/')) {
    const cohortId = cleanPath.replace('/app/cohorts/', '');
    return <CohortWorkspaceView cohortId={cohortId} />;
  }
  if (cleanPath.startsWith('/cohorts/')) {
    const cohortId = cleanPath.replace('/cohorts/', '');
    return <CohortWorkspaceView cohortId={cohortId} />;
  }
  if (cleanPath.startsWith('/app')) {
    if (role === 'INSTRUCTOR') return <InstructorPortalView />;
    if (role === 'ADMIN') return <AdminPortalView />;
    return <StudentDashboardView />;
  }

  return <HomeView />;
};

export default function App() {
  return (
    <AcademyProvider>
      <div className="min-h-screen flex flex-col bg-[#F7FBF9] text-[#0F172A] dark:bg-[#090F0C] dark:text-[#ECFDF5]">
        <TopNavbar />
        <main className="flex-1">
          <AppRouter />
        </main>
        <SessionPlayerQuizModal />
        <CommandPaletteModal />
        <DevToolbar />
      </div>
    </AcademyProvider>
  );
}
