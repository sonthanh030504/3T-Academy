import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import {
  Course,
  Cohort,
  CohortScheduleSlot,
  ClassSession,
  AppRole,
  UpcomingTaskItem,
  DiscussionThread,
  CohortMaterial,
  CertificateRecord,
  OrderReceipt,
} from '../types/domain';
import {
  INITIAL_COURSES,
  INITIAL_COHORTS,
  INITIAL_CLASS_SESSIONS,
  INITIAL_UPCOMING_TASKS,
  INITIAL_DISCUSSION_THREADS,
  INITIAL_COHORT_MATERIALS,
  INITIAL_CERTIFICATES,
  INITIAL_RECEIPTS,
  AVATAR_MINH_KHOA,
  AVATAR_HOANG_NAM,
} from '../data/mockDatabase';
import {
  evaluateSessionQuizAndUnlock,
  QuizEvaluationOutput,
  updateSessionWatchPosition,
} from '../utils/academyLogic';

export type StudentSidebarTab =
  | 'TODAY'
  | 'MY_COHORTS'
  | 'PROFILE_CV'
  | 'MOCK_INTERVIEW'
  | 'SKILL_MAP'
  | 'AI_CHAT_HISTORY'
  | 'CERTIFICATES_ORDERS'
  | 'SETTINGS';

export type InstructorSidebarTab =
  | 'LIVE_SCHEDULE'
  | 'MANAGE_COHORTS'
  | 'CLASS_ANALYTICS'
  | 'AI_GRADING'
  | 'QUIZ_BUILDER'
  | 'STUDENT_QA'
  | 'AVAILABILITY';

export type AdminSidebarTab =
  | 'OVERVIEW'
  | 'CURRICULUM'
  | 'COHORTS'
  | 'SMART_SCHEDULER'
  | 'USERS_STAFF'
  | 'TUITION_RECONCILIATION'
  | 'ISSUE_CERTIFICATES';

interface AcademyContextValue {
  currentPath: string;
  navigate: (path: string) => void;
  role: AppRole;
  setRole: (role: AppRole) => void;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  setTheme: (theme: 'light' | 'dark') => void;
  isCommandPaletteOpen: boolean;
  setCommandPaletteOpen: (open: boolean) => void;
  courses: Course[];
  cohorts: Cohort[];
  createCohort: (newCohort: {
    courseId: string;
    code: string;
    name: string;
    tuitionVnd: number;
    startDate: string;
    scheduleSlots: CohortScheduleSlot[];
    instructorName: string;
    taName?: string;
  }) => void;
  updateCohortSchedule: (cohortId: string, scheduleSlots: CohortScheduleSlot[]) => void;
  sessions: ClassSession[];
  rescheduleSession: (sessionId: string, newDateText: string) => void;
  updateSessionDetails: (
    sessionId: string,
    updates: { title?: string; aiSummaryMd?: string }
  ) => void;
  addAiGeneratedQuizToSession: (sessionId: string) => void;
  enrolledCohortIds: string[];
  enrollInCohort: (cohortCode: string) => OrderReceipt | null;
  submitSessionQuiz: (sessionId: string, answers: number[]) => QuizEvaluationOutput | null;
  updateWatchSec: (sessionId: string, sec: number) => void;
  upcomingTasks: UpcomingTaskItem[];
  discussions: DiscussionThread[];
  addDiscussionQuestion: (
    cohortId: string,
    sessionOrder: number,
    timestampLabel: string,
    title: string,
    body: string
  ) => void;
  replyToDiscussionAsStaff: (threadId: string, replyText: string) => void;
  materials: CohortMaterial[];
  addCohortMaterial: (cohortId: string, sessionOrder: number, title: string, fileType: 'PDF' | 'SLIDE' | 'REPO' | 'NOTEBOOK') => void;
  certificates: Record<string, CertificateRecord>;
  toggleCertificateRevoke: (certCode: string) => void;
  issueNewCertificate: (studentName: string, studentEmail: string, cohortCode: string, finalScore: number) => string;
  receipts: OrderReceipt[];
  studentSidebarTab: StudentSidebarTab;
  setStudentSidebarTab: (tab: StudentSidebarTab) => void;
  interviewCredits: number;
  setInterviewCredits: React.Dispatch<React.SetStateAction<number>>;
  latestCvFileName: string;
  latestCvUpdatedAt: string;
  updateLatestCv: (fileName: string) => void;
  instructorSidebarTab: InstructorSidebarTab;
  setInstructorSidebarTab: (tab: InstructorSidebarTab) => void;
  adminSidebarTab: AdminSidebarTab;
  setAdminSidebarTab: (tab: AdminSidebarTab) => void;
  activePlayerSessionId: string | null;
  setActivePlayerSessionId: (sessionId: string | null) => void;
  searchQueryGlobal: string;
  setSearchQueryGlobal: (q: string) => void;
}

const AcademyContext = createContext<AcademyContextValue | undefined>(undefined);

function mapTeachPathToTab(path: string): InstructorSidebarTab {
  if (path.startsWith('/teach/cohorts') || path.startsWith('/teach/quizzes')) {
    return 'MANAGE_COHORTS';
  }
  if (path.startsWith('/teach/analytics')) return 'CLASS_ANALYTICS';
  if (path.startsWith('/teach/discussions')) return 'STUDENT_QA';
  if (path.startsWith('/teach/schedule')) return 'AVAILABILITY';
  return 'LIVE_SCHEDULE';
}

function mapAdminPathToTab(path: string): AdminSidebarTab {
  if (path.startsWith('/admin/courses')) return 'CURRICULUM';
  if (path.startsWith('/admin/cohorts') || path.startsWith('/admin/scheduler')) return 'COHORTS';
  if (path.startsWith('/admin/users')) return 'USERS_STAFF';
  if (path.startsWith('/admin/finance')) return 'TUITION_RECONCILIATION';
  return 'OVERVIEW';
}

export const AcademyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentPath, setCurrentPath] = useState<string>(() => {
    return window.location.pathname || '/';
  });

  const [role, setRoleState] = useState<AppRole>(() => {
    const p = window.location.pathname || '/';
    if (p.startsWith('/teach')) return 'INSTRUCTOR';
    if (p.startsWith('/admin')) return 'ADMIN';
    return 'STUDENT';
  });

  const [theme, setThemeState] = useState<'light' | 'dark'>('light');
  const [isCommandPaletteOpen, setCommandPaletteOpen] = useState(false);

  const [courses] = useState<Course[]>(INITIAL_COURSES);
  const [cohorts, setCohorts] = useState<Cohort[]>(INITIAL_COHORTS);
  const [sessions, setSessions] = useState<ClassSession[]>(INITIAL_CLASS_SESSIONS);
  const [enrolledCohortIds, setEnrolledCohortIds] = useState<string[]>([
    'cohort-ai-k01',
    'cohort-py-k04',
  ]);
  const [upcomingTasks, setUpcomingTasks] = useState<UpcomingTaskItem[]>(INITIAL_UPCOMING_TASKS);
  const [discussions, setDiscussions] = useState<DiscussionThread[]>(INITIAL_DISCUSSION_THREADS);
  const [materials, setMaterials] = useState<CohortMaterial[]>(INITIAL_COHORT_MATERIALS);
  const [certificates, setCertificates] = useState<Record<string, CertificateRecord>>(
    INITIAL_CERTIFICATES
  );
  const [receipts, setReceipts] = useState<OrderReceipt[]>(INITIAL_RECEIPTS);

  const [studentSidebarTab, setStudentSidebarTab] = useState<StudentSidebarTab>(() => {
    const p = window.location.pathname || '/';
    if (p.startsWith('/app/profile-cv')) return 'PROFILE_CV';
    if (p.startsWith('/app/mock-interview')) return 'MOCK_INTERVIEW';
    if (p.startsWith('/app/progress')) return 'SKILL_MAP';
    return 'TODAY';
  });
  const [interviewCredits, setInterviewCredits] = useState<number>(4);
  const [latestCvFileName, setLatestCvFileName] = useState<string>(
    'CV_Nguyen_Van_An_2026.pdf'
  );
  const [latestCvUpdatedAt, setLatestCvUpdatedAt] = useState<string>('10/11/2026');

  const updateLatestCv = useCallback((fileName: string) => {
    setLatestCvFileName(fileName);
    setLatestCvUpdatedAt('Hôm nay · Vừa cập nhật');
  }, []);

  const [instructorSidebarTab, setInstructorSidebarTab] = useState<InstructorSidebarTab>(() =>
    mapTeachPathToTab(window.location.pathname || '/')
  );
  const [adminSidebarTab, setAdminSidebarTab] = useState<AdminSidebarTab>(() =>
    mapAdminPathToTab(window.location.pathname || '/')
  );

  const [activePlayerSessionId, setActivePlayerSessionId] = useState<string | null>(null);
  const [searchQueryGlobal, setSearchQueryGlobal] = useState('');

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  useEffect(() => {
    const onPopState = () => {
      const nextPath = window.location.pathname || '/';
      setCurrentPath(nextPath);
      if (nextPath.startsWith('/teach')) {
        setRoleState('INSTRUCTOR');
        setInstructorSidebarTab(mapTeachPathToTab(nextPath));
      } else if (nextPath.startsWith('/admin')) {
        setRoleState('ADMIN');
        setAdminSidebarTab(mapAdminPathToTab(nextPath));
      } else if (nextPath.startsWith('/app/profile-cv')) {
        setStudentSidebarTab('PROFILE_CV');
      } else if (nextPath.startsWith('/app/mock-interview')) {
        setStudentSidebarTab('MOCK_INTERVIEW');
      } else if (nextPath.startsWith('/app/progress')) {
        setStudentSidebarTab('SKILL_MAP');
      }
    };
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setCommandPaletteOpen((prev) => !prev);
      }
      if (e.key === 'Escape') {
        setCommandPaletteOpen(false);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  const navigate = useCallback((path: string) => {
    window.history.pushState({}, '', path);
    setCurrentPath(path);
    if (path.startsWith('/teach')) {
      setRoleState('INSTRUCTOR');
      setInstructorSidebarTab(mapTeachPathToTab(path));
    } else if (path.startsWith('/admin')) {
      setRoleState('ADMIN');
      setAdminSidebarTab(mapAdminPathToTab(path));
    } else if (path.startsWith('/app/profile-cv')) {
      setRoleState('STUDENT');
      setStudentSidebarTab('PROFILE_CV');
    } else if (path.startsWith('/app/mock-interview')) {
      setRoleState('STUDENT');
      setStudentSidebarTab('MOCK_INTERVIEW');
    } else if (path.startsWith('/app/progress')) {
      setRoleState('STUDENT');
      setStudentSidebarTab('SKILL_MAP');
    }
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, []);

  // Strictly separate layouts when role changes!
  const setRole = useCallback((newRole: AppRole) => {
    setRoleState(newRole);
    if (newRole === 'INSTRUCTOR') {
      window.history.pushState({}, '', '/teach');
      setCurrentPath('/teach');
    } else if (newRole === 'ADMIN') {
      window.history.pushState({}, '', '/admin');
      setCurrentPath('/admin');
    } else if (newRole === 'STUDENT') {
      if (
        window.location.pathname.startsWith('/teach') ||
        window.location.pathname.startsWith('/admin')
      ) {
        window.history.pushState({}, '', '/app');
        setCurrentPath('/app');
      }
    } else if (newRole === 'GUEST') {
      if (
        window.location.pathname.startsWith('/app') ||
        window.location.pathname.startsWith('/teach') ||
        window.location.pathname.startsWith('/admin')
      ) {
        window.history.pushState({}, '', '/');
        setCurrentPath('/');
      }
    }
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, []);

  const setTheme = useCallback((newTheme: 'light' | 'dark') => {
    setThemeState(newTheme);
  }, []);

  const toggleTheme = useCallback(() => {
    setThemeState((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  const enrollInCohort = useCallback(
    (cohortCode: string): OrderReceipt | null => {
      const targetCohort = cohorts.find(
        (c) => c.code.toLowerCase() === cohortCode.toLowerCase()
      );
      if (!targetCohort) return null;

      const course = courses.find((cr) => cr.id === targetCohort.courseId);
      if (!enrolledCohortIds.includes(targetCohort.id)) {
        setEnrolledCohortIds((prev) => [...prev, targetCohort.id]);
        setCohorts((prev) =>
          prev.map((c) =>
            c.id === targetCohort.id ? { ...c, enrolledCount: c.enrolledCount + 1 } : c
          )
        );
      }

      if (role === 'GUEST') {
        setRoleState('STUDENT');
      }

      const newReceipt: OrderReceipt = {
        orderCode: 'ET20268891',
        cohortCode: targetCohort.code,
        courseTitle: course?.title ?? targetCohort.name,
        amountVnd: targetCohort.tuitionVnd,
        paidAt: 'Vừa xong · Mở khóa lớp học tự động sau 3 giây',
        bankName: 'MBBank — Ngân hàng Quân Đội (Chuyển khoản QR 24/7)',
        transactionRef: 'MB-QR-99881204',
      };

      setReceipts((prev) => [newReceipt, ...prev.filter((r) => r.orderCode !== 'ET20268891')]);
      return newReceipt;
    },
    [cohorts, courses, enrolledCohortIds, role]
  );

  const createCohort = useCallback(
    (newCohort: {
      courseId: string;
      code: string;
      name: string;
      tuitionVnd: number;
      startDate: string;
      scheduleSlots: CohortScheduleSlot[];
      instructorName: string;
      taName?: string;
    }) => {
      const created: Cohort = {
        id: `cohort-${Date.now()}`,
        courseId: newCohort.courseId,
        instructorId: 'usr-inst-khoa',
        code: newCohort.code,
        name: newCohort.name,
        curriculumVersion: 'v2.5',
        tuitionVnd: newCohort.tuitionVnd,
        enrolledCount: 1,
        enrollmentOpenAt: 'Hôm nay',
        startDate: newCohort.startDate,
        endDate: '28/02/2027',
        scheduleSlots: newCohort.scheduleSlots,
        status: 'OPENING',
        staff: [
          {
            id: `st-inst-${Date.now()}`,
            role: 'INSTRUCTOR',
            fullName: newCohort.instructorName,
            headline: 'Giảng viên chính phụ trách lớp',
            avatarUrl: AVATAR_MINH_KHOA,
            organization: '3T Academy',
          },
        ],
      };
      setCohorts((prev) => [created, ...prev]);
    },
    []
  );

  const updateCohortSchedule = useCallback(
    (cohortId: string, scheduleSlots: CohortScheduleSlot[]) => {
      setCohorts((prev) =>
        prev.map((c) =>
          c.id === cohortId
            ? {
                ...c,
                scheduleSlots,
              }
            : c
        )
      );
    },
    []
  );

  const rescheduleSession = useCallback((sessionId: string, newDateText: string) => {
    setSessions((prev) =>
      prev.map((s) =>
        s.id === sessionId
          ? {
              ...s,
              scheduledStart: newDateText,
              scheduledEnd: newDateText.replace('19:30', '21:30'),
            }
          : s
      )
    );
  }, []);

  const updateSessionDetails = useCallback(
    (sessionId: string, updates: { title?: string; aiSummaryMd?: string }) => {
      setSessions((prev) =>
        prev.map((s) =>
          s.id === sessionId
            ? {
                ...s,
                ...(updates.title !== undefined ? { title: updates.title } : {}),
                ...(updates.aiSummaryMd !== undefined
                  ? { aiSummaryMd: updates.aiSummaryMd }
                  : {}),
              }
            : s
        )
      );
    },
    []
  );

  const addAiGeneratedQuizToSession = useCallback((sessionId: string) => {
    setSessions((prev) =>
      prev.map((s) =>
        s.id === sessionId
          ? {
              ...s,
              quizQuestions: [
                ...s.quizQuestions,
                {
                  id: `q-ai-${Date.now()}`,
                  question:
                    'Khi kết hợp tìm kiếm từ khóa và tìm kiếm theo ý nghĩa câu hỏi, bước nào giúp giữ tốc độ phản hồi dưới 1 giây?',
                  options: [
                    'Chỉ chấm điểm tinh lọc trên 20 đoạn văn bản phù hợp nhất đã được chọn sơ bộ',
                    'Đọc lại toàn bộ ổ cứng từ đầu',
                    'Tắt bộ nhớ đệm của cơ sở dữ liệu',
                    'Xóa toàn bộ bảng dữ liệu trước khi tìm kiếm',
                  ],
                  correctIndex: 0,
                  explanation:
                    'Chọn lọc sơ bộ trước khi sắp xếp tinh gọn giúp vừa nhanh vừa chính xác.',
                },
              ],
            }
          : s
      )
    );
  }, []);

  const submitSessionQuiz = useCallback(
    (sessionId: string, answers: number[]): QuizEvaluationOutput | null => {
      const target = sessions.find((s) => s.id === sessionId);
      if (!target) return null;

      const evaluation = evaluateSessionQuizAndUnlock(target, answers);

      setSessions((prev) =>
        prev.map((s) => (s.id === sessionId ? evaluation.updatedSession : s))
      );

      if (evaluation.passed) {
        setUpcomingTasks((prev) =>
          prev.map((t) =>
            t.sessionId === sessionId
              ? {
                  ...t,
                  urgency: 'SAFE',
                  dueText: 'Đã hoàn thành',
                  score: evaluation.scorePercent,
                  statusLabel: `Đã làm xong bài tập (${evaluation.scorePercent}/100) · Hoàn thành buổi học`,
                }
              : t
          )
        );
      }

      return evaluation;
    },
    [sessions]
  );

  const updateWatchSec = useCallback((sessionId: string, sec: number) => {
    setSessions((prev) =>
      prev.map((s) => (s.id === sessionId ? updateSessionWatchPosition(s, sec) : s))
    );
  }, []);

  const addDiscussionQuestion = useCallback(
    (
      cohortId: string,
      sessionOrder: number,
      timestampLabel: string,
      title: string,
      body: string
    ) => {
      const targetSession = sessions.find(
        (s) => s.cohortId === cohortId && s.sessionOrder === sessionOrder
      );
      const newThread: DiscussionThread = {
        id: `disc-${Date.now()}`,
        cohortId,
        sessionOrder,
        sessionTitle: targetSession?.title ?? `Buổi ${sessionOrder}`,
        timestampLabel: timestampLabel || '14:20',
        authorName: 'Nguyễn Văn An',
        createdAt: 'Vừa xong',
        questionTitle: title,
        questionBody: body,
        isResolved: true,
        verifiedByStaff: false,
        hasAiSuggestion: true,
        replies: [
          {
            id: `rep-ai-${Date.now()}`,
            authorName: 'Trợ giảng AI 3T (Hỗ trợ 24/7)',
            authorRole: 'AI_TUTOR',
            createdAt: 'Tức thì',
            aiCitationSec: timestampLabel || '14:20',
            content: `Trợ giảng AI đã tìm thấy nội dung liên quan tại phút ${
              timestampLabel || '14:20'
            } (Trang 8 tài liệu Buổi ${sessionOrder}): Với câu hỏi "${title}", bạn nên kết hợp lọc theo lớp học trước rồi mới sắp xếp độ liên quan. Trợ giảng Đặng Hoàng Nam cũng đã nhận được thông báo để vào giải đáp thêm cùng bạn nhé!`,
          },
        ],
      };
      setDiscussions((prev) => [newThread, ...prev]);
    },
    [sessions]
  );

  const replyToDiscussionAsStaff = useCallback((threadId: string, replyText: string) => {
    setDiscussions((prev) =>
      prev.map((th) =>
        th.id === threadId
          ? {
              ...th,
              isResolved: true,
              verifiedByStaff: true,
              replies: [
                ...th.replies,
                {
                  id: `rep-staff-${Date.now()}`,
                  authorName: 'TS. Trần Minh Khoa (Giảng viên)',
                  authorRole: 'INSTRUCTOR',
                  createdAt: 'Vừa xong',
                  isVerifiedByStaff: true,
                  content: replyText,
                },
              ],
            }
          : th
      )
    );
  }, []);

  const addCohortMaterial = useCallback(
    (
      cohortId: string,
      sessionOrder: number,
      title: string,
      fileType: 'PDF' | 'SLIDE' | 'REPO' | 'NOTEBOOK'
    ) => {
      const newMat: CohortMaterial = {
        id: `mat-${Date.now()}`,
        cohortId,
        sessionOrder,
        title,
        fileType,
        fileSize: '3.2 MB',
        updatedAt: 'Vừa tải lên hôm nay',
        downloadUrl: '#tai-lieu-moi',
      };
      setMaterials((prev) => [newMat, ...prev]);
    },
    []
  );

  const toggleCertificateRevoke = useCallback((certCode: string) => {
    setCertificates((prev) => {
      const existing = prev[certCode];
      if (!existing) return prev;
      const nextRevoked = !existing.isRevoked;
      return {
        ...prev,
        [certCode]: {
          ...existing,
          isRevoked: nextRevoked,
          revokedReason: nextRevoked
            ? 'Đang tạm khóa hiển thị theo yêu cầu kiểm tra từ Ban Tổ Chức.'
            : undefined,
        },
      };
    });
  }, []);

  const issueNewCertificate = useCallback(
    (
      studentName: string,
      studentEmail: string,
      cohortCode: string,
      finalScore: number
    ): string => {
      const code = `CERT-3T-2026-${Math.floor(1000 + Math.random() * 9000)}`;
      const targetCohort = cohorts.find((c) => c.code === cohortCode) ?? cohorts[0];
      const course = courses.find((cr) => cr.id === targetCohort.courseId) ?? courses[0];

      const record: CertificateRecord = {
        certificateCode: code,
        studentName,
        studentEmail,
        courseTitle: course.title,
        cohortCode: targetCohort.code,
        issuedAt: 'Hôm nay · Cấp bởi Ban Đào Tạo 3T Academy',
        verificationSignature: `3T-VERIFIED-${code}`,
        finalScore,
        proctoringIntegrity:
          'Đã hoàn thành đầy đủ các buổi học, dự án thực tế và vượt qua kỳ thi tốt nghiệp cuối khóa',
        isRevoked: false,
        skillsMastered: course.skills.map((sk) => ({
          code: sk.code,
          name: sk.name,
          score: finalScore,
        })),
      };

      setCertificates((prev) => ({
        ...prev,
        [code]: record,
      }));
      return code;
    },
    [cohorts, courses]
  );

  return (
    <AcademyContext.Provider
      value={{
        currentPath,
        navigate,
        role,
        setRole,
        theme,
        toggleTheme,
        setTheme,
        isCommandPaletteOpen,
        setCommandPaletteOpen,
        courses,
        cohorts,
        createCohort,
        updateCohortSchedule,
        sessions,
        rescheduleSession,
        updateSessionDetails,
        addAiGeneratedQuizToSession,
        enrolledCohortIds,
        enrollInCohort,
        submitSessionQuiz,
        updateWatchSec,
        upcomingTasks,
        discussions,
        addDiscussionQuestion,
        replyToDiscussionAsStaff,
        materials,
        addCohortMaterial,
        certificates,
        toggleCertificateRevoke,
        issueNewCertificate,
        receipts,
        studentSidebarTab,
        setStudentSidebarTab,
        interviewCredits,
        setInterviewCredits,
        latestCvFileName,
        latestCvUpdatedAt,
        updateLatestCv,
        instructorSidebarTab,
        setInstructorSidebarTab,
        adminSidebarTab,
        setAdminSidebarTab,
        activePlayerSessionId,
        setActivePlayerSessionId,
        searchQueryGlobal,
        setSearchQueryGlobal,
      }}
    >
      {children}
    </AcademyContext.Provider>
  );
};

export function useAcademy(): AcademyContextValue {
  const ctx = useContext(AcademyContext);
  if (!ctx) {
    throw new Error('useAcademy must be used inside AcademyProvider');
  }
  return ctx;
}
