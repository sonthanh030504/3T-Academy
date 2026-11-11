import {
  INITIAL_COURSES,
  INITIAL_COHORTS,
  INITIAL_CLASS_SESSIONS,
  INITIAL_DISCUSSION_THREADS,
  INITIAL_COHORT_MATERIALS,
  INITIAL_UPCOMING_TASKS,
  INITIAL_RECEIPTS,
  INITIAL_CERTIFICATES,
  INITIAL_USER_PROFILES,
  INITIAL_STUDENT_SKILL_STATES,
  INITIAL_PAYMENT_TRANSACTIONS,
  INITIAL_ASSESSMENTS,
  INITIAL_MOCK_INTERVIEWS,
  INITIAL_ENROLLMENTS,
  INITIAL_CHAT_MESSAGES,
  INITIAL_NOTIFICATIONS,
} from '../data/mockDatabase';
import {
  SESSION_4_MCQ_QUESTIONS,
  FINAL_EXAM_25_MCQ_QUESTIONS,
  McqQuestionItem,
  AssessmentPublishStatus,
  toStudentSafePromptConfig,
  evaluateMcqSubmission,
  loadStoredMcqResult,
  hasStudentPassedFinalExam,
} from '../data/phase2QuizBank';
import {
  CvScreeningResult,
  InterviewTargetLevel,
  MockInterviewRecord,
} from '../types/domain';
import { formatScheduleSlots } from '../utils/academyLogic';

// In-memory state for stateful mock backend operations during the session
let mockUserProfile = structuredClone(INITIAL_USER_PROFILES[0]);
let mockStudentSkillStates = structuredClone(INITIAL_STUDENT_SKILL_STATES);
const mockPaymentTransactions = structuredClone(INITIAL_PAYMENT_TRANSACTIONS);
const mockAssessments = structuredClone(INITIAL_ASSESSMENTS);
const mockEnrollments = structuredClone(INITIAL_ENROLLMENTS);
const mockChatMessages = structuredClone(INITIAL_CHAT_MESSAGES);
const mockNotifications = structuredClone(INITIAL_NOTIFICATIONS);
const mockInterviewsMap = new Map<string, MockInterviewRecord>(
  INITIAL_MOCK_INTERVIEWS.map((item) => [item.id, structuredClone(item)])
);
const mockAssessmentQuestionsMap = new Map<string, McqQuestionItem[]>([
  ['quiz-sess-ai-04', structuredClone(SESSION_4_MCQ_QUESTIONS)],
  ['quiz-sess-ai-05', structuredClone(SESSION_4_MCQ_QUESTIONS)],
  ['final-exam-cohort-ai-k01', structuredClone(FINAL_EXAM_25_MCQ_QUESTIONS)],
]);

function parseBodyRecord(body: unknown): Record<string, any> {
  if (!body) return {};
  if (typeof FormData !== 'undefined' && body instanceof FormData) {
    const file = body.get('file');
    const fileName =
      file && typeof (file as File).name === 'string'
        ? (file as File).name
        : 'CV_Cap_Nhat_2026.pdf';
    return { fileName };
  }
  if (typeof body === 'string') {
    try {
      return JSON.parse(body);
    } catch {
      return {};
    }
  }
  if (typeof body === 'object') {
    return body as Record<string, any>;
  }
  return {};
}

/**
 * Bộ định tuyến Backend giả lập (`handleMockRequest`)
 * Chứa toàn bộ logic tìm kiếm, lọc khóa học, kiểm tra thanh toán SePay,
 * chấm điểm trắc nghiệm, cập nhật `student_skill_states`, cấp chứng chỉ,
 * cộng `interview_credits` và thẩm định CV & JD ở Vòng 1 phỏng vấn.
 */
export async function handleMockRequest<T = any>(
  method: string,
  endpoint: string,
  body?: unknown
): Promise<T> {
  const upperMethod = (method || 'GET').toUpperCase();
  const [rawPath, rawQuery = ''] = endpoint.split('?');
  const path = rawPath.startsWith('/') ? rawPath : `/${rawPath}`;
  const queryParams = new URLSearchParams(rawQuery);
  const payload = parseBodyRecord(body);

  // ==========================================================================
  // 1. AUTH ROUTES (`/auth/*`)
  // ==========================================================================
  if (upperMethod === 'POST' && path === '/auth/login') {
    const email = String(payload.email || mockUserProfile.email);
    return {
      accessToken: `mock-jwt-${Date.now()}`,
      user: {
        id: mockUserProfile.userId,
        fullName: mockUserProfile.fullName,
        email,
        role: mockUserProfile.role,
      },
    } as T;
  }

  if (upperMethod === 'POST' && path === '/auth/register') {
    return {
      accessToken: `mock-jwt-${Date.now()}`,
      user: {
        id: `usr-${Date.now()}`,
        fullName: String(payload.fullName || 'Học viên mới'),
        email: String(payload.email || 'hocvien@3tacademy.vn'),
        role: 'STUDENT',
      },
    } as T;
  }

  if (upperMethod === 'POST' && path === '/auth/google') {
    return {
      accessToken: `mock-google-jwt-${Date.now()}`,
      user: {
        id: mockUserProfile.userId,
        fullName: mockUserProfile.fullName,
        email: mockUserProfile.email,
        role: mockUserProfile.role,
      },
    } as T;
  }

  if (upperMethod === 'GET' && path === '/auth/me') {
    return {
      id: mockUserProfile.userId,
      fullName: mockUserProfile.fullName,
      email: mockUserProfile.email,
      role: mockUserProfile.role,
    } as T;
  }

  if (upperMethod === 'POST' && path === '/auth/logout') {
    return { success: true, loggedOutAt: new Date().toISOString() } as T;
  }

  // ==========================================================================
  // 2. CATALOG ROUTES (`/categories`, `/skills`, `/courses`, `/advisor`, `/certificates`)
  // ==========================================================================
  if (upperMethod === 'GET' && path === '/categories') {
    return [
      { id: 'cat-ai', name: 'AI & Dữ liệu', count: 2 },
      { id: 'cat-swe', name: 'Kỹ thuật Phần mềm & Cloud', count: 1 },
      { id: 'cat-data', name: 'Phân tích Dữ liệu', count: 1 },
    ] as T;
  }

  if (upperMethod === 'GET' && path === '/skills') {
    return INITIAL_COURSES.flatMap((c) => c.skills) as T;
  }

  if (upperMethod === 'GET' && path === '/courses') {
    const category = queryParams.get('category') || '';
    const level = queryParams.get('level') || '';
    const q = (queryParams.get('q') || '').toLowerCase().trim();

    const filtered = INITIAL_COURSES.filter((c) => {
      const matchCat = !category || category === 'ALL' || c.category === category;
      const matchLevel = !level || String(c.difficultyLevel) === level;
      const matchQuery =
        !q ||
        c.title.toLowerCase().includes(q) ||
        c.shortDescription.toLowerCase().includes(q);
      return matchCat && matchLevel && matchQuery;
    });
    return filtered as T;
  }

  if (upperMethod === 'GET' && path.startsWith('/courses/')) {
    const slug = decodeURIComponent(path.replace('/courses/', ''));
    const course =
      INITIAL_COURSES.find((c) => c.slug === slug || c.id === slug) ??
      INITIAL_COURSES[0];
    const cohorts = INITIAL_COHORTS.filter((ch) => ch.courseId === course.id);
    return {
      course,
      cohorts,
      syllabusTemplate: {
        version: cohorts[0]?.curriculumVersion || 'v2.4',
        totalWeeks: Math.max(4, course.syllabusTemplate.length),
        sessionsPerWeek: 2,
        modules: course.syllabusTemplate,
      },
    } as T;
  }

  if (upperMethod === 'POST' && path === '/advisor/ask') {
    const goal = String(payload.goal || payload.message || '');
    const recommendedCourse = INITIAL_COURSES[0];
    const recommendedCohort = INITIAL_COHORTS[0];
    return {
      replyText: `Dựa trên mục tiêu "${goal || 'phát triển sự nghiệp công nghệ'}" của bạn, lộ trình phù hợp nhất là khóa "${recommendedCourse.title}" (${recommendedCohort.code}, lịch học ${formatScheduleSlots(recommendedCohort.scheduleSlots)}).`,
      recommendedCourseSlug: recommendedCourse.slug,
      recommendedCohortId: recommendedCohort.id,
    } as T;
  }

  if (upperMethod === 'GET' && path.startsWith('/certificates/verify/')) {
    const code = decodeURIComponent(path.replace('/certificates/verify/', '')).toUpperCase();
    const record =
      INITIAL_CERTIFICATES[code] ?? Object.values(INITIAL_CERTIFICATES)[0];
    return {
      found: Boolean(INITIAL_CERTIFICATES[code]),
      certificate: record,
    } as T;
  }

  // ==========================================================================
  // 3. ORDER & SEPAY ROUTES (`/orders`, `/webhooks/sepay/simulate`)
  // ==========================================================================
  if (upperMethod === 'POST' && path === '/orders') {
    const cohortId = String(payload.cohortId || 'cohort-ai-k01');
    const cohort =
      INITIAL_COHORTS.find(
        (c) => c.id === cohortId || c.code.toLowerCase() === cohortId.toLowerCase()
      ) ?? INITIAL_COHORTS[0];
    const orderCode = 'ET20268891';
    return {
      orderCode,
      cohortId: cohort.id,
      cohortCode: cohort.code,
      amountVnd: cohort.tuitionVnd,
      status: 'PENDING',
      bankName: 'MBBank (Ngân hàng Quân Đội)',
      accountNumber: '098877665544',
      accountHolder: 'CONG TY CO PHAN CONG NGHE GIAO DUC 3T ACADEMY',
      transferContent: orderCode,
      qrImageUrl: `https://img.vietqr.io/image/MB-098877665544-compact2.png?amount=${cohort.tuitionVnd}&addInfo=${orderCode}`,
    } as T;
  }

  if (upperMethod === 'GET' && path === '/orders/my-history') {
    return INITIAL_RECEIPTS as T;
  }

  if (upperMethod === 'GET' && path.startsWith('/orders/')) {
    const orderCode = decodeURIComponent(path.replace('/orders/', ''));
    const matchedTx = mockPaymentTransactions.find(
      (tx) => tx.orderCode === orderCode && tx.matchStatus === 'MATCHED'
    );
    return {
      orderCode,
      status: matchedTx ? 'PAID' : 'PENDING',
      paidAt: matchedTx?.processedAt,
    } as T;
  }

  if (upperMethod === 'POST' && path === '/webhooks/sepay/simulate') {
    const orderCode = String(payload.orderCode || 'ET20268891');
    const transactionRef = `MB-SEPAY-${Date.now().toString().slice(-6)}`;
    const paidAt = 'Vừa xong · Đối soát tự động qua SePay Webhook';
    return {
      orderCode,
      status: 'PAID',
      gateway: 'SEPAY_VIETQR',
      matchStatus: 'MATCHED',
      transactionRef,
      paidAt,
    } as T;
  }

  // ==========================================================================
  // 4. LEARNING ROUTES (`/me/dashboard`, `/me/enrollments`, `/cohorts/*`, `/sessions/*`)
  // ==========================================================================
  if (upperMethod === 'GET' && path === '/me/dashboard') {
    return {
      liveSession:
        INITIAL_CLASS_SESSIONS.find((s) => s.status === 'LIVE') ??
        INITIAL_CLASS_SESSIONS[4],
      resumeSession:
        INITIAL_CLASS_SESSIONS.find((s) => s.sessionOrder === 4) ??
        INITIAL_CLASS_SESSIONS[3],
      upcomingTasks: INITIAL_UPCOMING_TASKS,
      streakDays: 7,
    } as T;
  }

  if (upperMethod === 'GET' && path === '/me/enrollments') {
    return {
      enrolledCohortIds: ['cohort-ai-k01', 'cohort-py-k04'],
      cohorts: INITIAL_COHORTS.filter((c) =>
        ['cohort-ai-k01', 'cohort-py-k04'].includes(c.id)
      ),
      receipts: INITIAL_RECEIPTS,
    } as T;
  }

  const cohortWorkspaceMatch = path.match(/^\/cohorts\/([^/]+)\/workspace$/);
  if (upperMethod === 'GET' && cohortWorkspaceMatch) {
    const cohortId = decodeURIComponent(cohortWorkspaceMatch[1]);
    const cohort =
      INITIAL_COHORTS.find(
        (c) => c.id === cohortId || c.code.toLowerCase() === cohortId.toLowerCase()
      ) ?? INITIAL_COHORTS[0];
    const course =
      INITIAL_COURSES.find((cr) => cr.id === cohort.courseId) ??
      INITIAL_COURSES[0];
    const sessions = INITIAL_CLASS_SESSIONS.filter((s) => s.cohortId === cohort.id);
    const materials = INITIAL_COHORT_MATERIALS.filter((m) => m.cohortId === cohort.id);
    return {
      cohort,
      course,
      sessions: sessions.length > 0 ? sessions : INITIAL_CLASS_SESSIONS,
      materials,
    } as T;
  }

  const sessionDetailMatch = path.match(/^\/cohorts\/([^/]+)\/sessions\/([^/]+)$/);
  if (upperMethod === 'GET' && sessionDetailMatch) {
    const sessionId = decodeURIComponent(sessionDetailMatch[2]);
    const session =
      INITIAL_CLASS_SESSIONS.find((s) => s.id === sessionId) ??
      INITIAL_CLASS_SESSIONS[3];
    return {
      session,
      videoUrl:
        'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      transcript: [
        {
          sec: 5,
          timeLabel: '00:05',
          speaker: 'TS. Trần Minh Khoa',
          text: 'Chào cả lớp! Hôm nay chúng mình cùng thực hành xử lý báo cáo PDF dài hàng trăm trang mà không làm đứt gãy bảng biểu tài chính.',
          slidePage: 4,
        },
        {
          sec: 10,
          timeLabel: '00:10',
          speaker: 'TS. Trần Minh Khoa',
          text: 'Để giữ nguyên ý nghĩa, mình nhận diện các dòng tiêu đề mục lớn và đóng gói toàn bộ bảng số liệu thành một khối nguyên vẹn kèm theo số trang gốc.',
          slidePage: 8,
        },
        {
          sec: 25,
          timeLabel: '00:25',
          speaker: 'TS. Trần Minh Khoa',
          text: 'Tại sao chỗ này phải kết hợp cả tìm kiếm từ khóa lẫn tìm kiếm theo ý nghĩa câu hỏi? Vì tìm kiếm từ khóa bắt trúng mã hợp đồng, còn tìm kiếm ngữ nghĩa hiểu câu hỏi tự nhiên của nhân viên.',
          slidePage: 12,
        },
        {
          sec: 45,
          timeLabel: '00:45',
          speaker: 'TS. Trần Minh Khoa',
          text: 'Lưu ý rất quan trọng về xử lý bất đồng bộ: Chúng ta dùng Promise.all để chạy song song hai bộ tìm kiếm, giúp tốc độ phản hồi luôn dưới 1 giây.',
          slidePage: 18,
        },
        {
          sec: 75,
          timeLabel: '01:15',
          speaker: 'TS. Trần Minh Khoa',
          text: 'Các bạn nhớ hoàn thành 10 câu hỏi trắc nghiệm (A, B, C, D) ngay bên dưới video để hệ thống chấm điểm tức thì và mở khóa hoàn thành buổi học hôm nay nhé!',
          slidePage: 22,
        },
      ],
      attachments: INITIAL_COHORT_MATERIALS,
      quizSummary: {
        assessmentId: `quiz-${session.id}`,
        questionCount: SESSION_4_MCQ_QUESTIONS.length,
        passingScoreOutOf10: 7.0,
        isCompleted: session.isCompleted,
        bestScorePercent: session.quizScore,
      },
      discussions: INITIAL_DISCUSSION_THREADS.filter(
        (d) => d.sessionOrder === session.sessionOrder
      ),
    } as T;
  }

  const progressMatch = path.match(/^\/sessions\/([^/]+)\/progress$/);
  if (upperMethod === 'PUT' && progressMatch) {
    const sessionId = decodeURIComponent(progressMatch[1]);
    const lastPositionSec = Number(payload.lastPositionSec || 0);
    return {
      sessionId,
      lastPositionSec,
      savedAt: new Date().toISOString(),
    } as T;
  }

  if (upperMethod === 'POST' && path === '/ai/tutor/ask') {
    const question = String(payload.question || '');
    const detectedTopic = question.toLowerCase().includes('sql')
      ? 'PostgreSQL & SQL'
      : question.toLowerCase().includes('fastapi')
      ? 'FastAPI'
      : 'RAG & Vector Search';
    mockChatMessages.push({
      id: `chat-msg-${Date.now()}`,
      sessionId: String(payload.sessionId || 'sess-k01-04'),
      cohortId: 'cohort-ai-k01',
      userId: mockUserProfile.userId,
      studentName: mockUserProfile.fullName,
      senderRole: 'STUDENT',
      content: question,
      tokensUsed: 180,
      latencyMs: 480,
      detectedTopic,
      createdAt: new Date().toISOString(),
    });
    return {
      answerMd: `Với câu hỏi "${question}", thầy Trần Minh Khoa đã minh họa trực tiếp cách tách bảng biểu an toàn ở giây [00:10], cách kết hợp tìm kiếm từ khóa & ngữ nghĩa ở [00:25] và xử lý bất đồng bộ bằng Promise.all ở [00:45]. Bạn bấm vào nút mốc thời gian bên dưới để trình phát video nhảy thẳng tới đúng giây đó nhé!`,
      detectedTopic,
      citations: [
        { label: '[00:10]', jumpSec: 10, slideLabel: 'Slide Trang 8' },
        { label: '[00:25]', jumpSec: 25, slideLabel: 'Slide Trang 12' },
        { label: '[00:45]', jumpSec: 45, slideLabel: 'Slide Trang 18' },
      ],
    } as T;
  }

  const sessionDiscussionsMatch = path.match(/^\/sessions\/([^/]+)\/discussions$/);
  if (sessionDiscussionsMatch) {
    const sessionId = decodeURIComponent(sessionDiscussionsMatch[1]);
    if (upperMethod === 'GET') {
      const session = INITIAL_CLASS_SESSIONS.find((s) => s.id === sessionId);
      return INITIAL_DISCUSSION_THREADS.filter(
        (d) => !session || d.sessionOrder === session.sessionOrder
      ) as T;
    }
    if (upperMethod === 'POST') {
      return {
        threadId: `disc-${Date.now()}`,
        status: 'CREATED',
        videoTimestampSec: Number(payload.videoTimestampSec || 0),
      } as T;
    }
  }

  // ==========================================================================
  // 5. ASSESSMENT ROUTES (`/assessments/*`)
  // ==========================================================================
  const submitAssessmentMatch = path.match(/^\/assessments\/([^/]+)\/submit$/);
  if (upperMethod === 'POST' && submitAssessmentMatch) {
    const assessmentId = decodeURIComponent(submitAssessmentMatch[1]);
    const answers = (payload.answers || {}) as Record<number, number>;
    const isFinalExam =
      assessmentId.toLowerCase().includes('final') ||
      assessmentId.toLowerCase().includes('exam');
    const sourceQuestions =
      mockAssessmentQuestionsMap.get(assessmentId) ??
      (isFinalExam ? FINAL_EXAM_25_MCQ_QUESTIONS : SESSION_4_MCQ_QUESTIONS);

    const evaluation = evaluateMcqSubmission(
      assessmentId,
      isFinalExam,
      sourceQuestions,
      answers
    );

    // Cập nhật điểm `student_skill_states`
    if (evaluation.passed) {
      mockStudentSkillStates = mockStudentSkillStates.map((sk) =>
        sk.code === 'HYBRID-RAG'
          ? { ...sk, score: Math.min(100, sk.score + 4) }
          : sk
      );
    }

    // Nếu thi Đạt bài thi cuối khóa -> cộng 4 Credits phỏng vấn
    if (isFinalExam && evaluation.passed) {
      mockUserProfile.interviewCredits = Math.max(4, mockUserProfile.interviewCredits);
    }

    return evaluation as T;
  }

  const resultAssessmentMatch = path.match(/^\/assessments\/([^/]+)\/result$/);
  if (upperMethod === 'GET' && resultAssessmentMatch) {
    const assessmentId = decodeURIComponent(resultAssessmentMatch[1]);
    return loadStoredMcqResult(assessmentId) as T;
  }

  const proctoringEventMatch = path.match(/^\/assessments\/([^/]+)\/proctoring-events$/);
  if (upperMethod === 'POST' && proctoringEventMatch) {
    const assessmentId = decodeURIComponent(proctoringEventMatch[1]);
    return {
      assessmentId,
      recorded: true,
      eventType: String(payload.eventType || 'HEARTBEAT'),
      timestamp: new Date().toISOString(),
    } as T;
  }

  const getAssessmentMatch = path.match(/^\/assessments\/([^/]+)$/);
  if (upperMethod === 'GET' && getAssessmentMatch) {
    const assessmentId = decodeURIComponent(getAssessmentMatch[1]);
    const isFinalExam =
      assessmentId.toLowerCase().includes('final') ||
      assessmentId.toLowerCase().includes('exam');
    const sourceQuestions =
      mockAssessmentQuestionsMap.get(assessmentId) ??
      (isFinalExam ? FINAL_EXAM_25_MCQ_QUESTIONS : SESSION_4_MCQ_QUESTIONS);
    const meta = mockAssessments.find((a) => a.id === assessmentId);

    return {
      assessmentId,
      isFinalExam,
      status: meta?.status ?? 'PUBLISHED',
      title:
        meta?.title ??
        (isFinalExam
          ? 'Bài Thi Tốt Nghiệp Cuối Khóa Kỹ Sư AI Thực Chiến — Khóa K01 (25 câu A, B, C, D)'
          : 'Bài Kiểm Tra Mở Khóa Cuối Buổi Học (10 câu Trắc nghiệm A, B, C, D)'),
      questionCount: sourceQuestions.length,
      timeLimitMinutes: isFinalExam ? 45 : 15,
      isRetakeLocked: isFinalExam && hasStudentPassedFinalExam(),
      promptConfig: toStudentSafePromptConfig(sourceQuestions),
    } as T;
  }

  // ==========================================================================
  // 6. PROFILE & INTERVIEW ROUTES (`/me/profile-skills`, `/me/cv/upload`, `/interviews/*`)
  // ==========================================================================
  if (upperMethod === 'GET' && path === '/me/profile-skills') {
    const cv = mockUserProfile.cvParsedData;
    return {
      userProfile: {
        userId: mockUserProfile.userId,
        fullName: cv.fullName,
        headline: cv.headline,
        email: cv.email,
        phone: cv.phone,
        githubUrl: cv.githubUrl,
        linkedinUrl: cv.linkedinUrl,
        careerObjective: cv.careerObjective,
        latestCvFileName: cv.fileName,
        latestCvUpdatedAt: cv.updatedAt,
        interviewCredits: mockUserProfile.interviewCredits,
        cvParsedData: cv,
      },
      studentSkillStates: mockStudentSkillStates,
      externalCvSkills: cv.externalSkills,
    } as T;
  }

  if (upperMethod === 'POST' && path === '/me/cv/upload') {
    const uploadedName = String(payload.fileName || 'CV_Nguyen_Van_An_Updated.pdf');
    mockUserProfile = {
      ...mockUserProfile,
      cvParsedData: {
        ...mockUserProfile.cvParsedData,
        fileName: uploadedName,
        updatedAt: 'Hôm nay · Vừa cập nhật',
      },
    };
    return {
      fileName: uploadedName,
      updatedAt: mockUserProfile.cvParsedData.updatedAt,
      cvParsedData: mockUserProfile.cvParsedData,
    } as T;
  }

  /**
   * Vòng 1 của Phòng Phỏng Vấn (`POST /interviews/screen-cv`):
   * - Yêu cầu `interviewCredits > 0`, chưa trừ Credit ở vòng này (`creditDeducted: 0`).
   * - Lấy `cvParsedData` đối chiếu trực tiếp với `jdRawText` để đánh giá đúng 2 nội dung:
   *   (1) Bố cục, trình bày & cách triển khai ý trong CV (`layoutAndPresentationFeedback`)
   *   (2) Độ khớp giữa CV với tờ JD mục tiêu (`matchPercent`, `jdMatchEvaluation`, `missingKeywordsOrGaps`)
   */
  if (upperMethod === 'POST' && path === '/interviews/screen-cv') {
    const rawLevel = String(payload.targetLevel || 'FRESHER');
    const targetLevel: InterviewTargetLevel =
      rawLevel === 'INTERN' || rawLevel === 'FRESHER' || rawLevel === 'JUNIOR'
        ? rawLevel
        : 'SENIOR';
    const targetRole = String(payload.targetRole || 'Kỹ Sư AI (AI Engineer)');
    const jdRawText = String(payload.jdRawText || '');
    const scenarioMode =
      payload.scenarioMode === 'MISSING_COURSE_45' ? 'MISSING_COURSE_45' : 'READY_78';

    const matchPercent = scenarioMode === 'READY_78' ? 78 : 45;
    const passedGate = matchPercent >= 65;

    const cvScreeningResult: CvScreeningResult = passedGate
      ? {
          matchPercent: 78,
          passedGate: true,
          layoutAndPresentationFeedback:
            'Bố cục CV 1 trang A4 gọn gàng, phân tách rõ Mục tiêu nghề nghiệp, Dự án thực tế và Kỹ năng công nghệ. Các ý trong phần dự án được triển khai mạch lạc theo cấu trúc Bài toán – Giải pháp kỹ thuật – Kết quả định lượng (< 800ms, 100+ trang PDF).',
          jdMatchEvaluation: `Hồ sơ CV hiện tại (${mockUserProfile.cvParsedData.fileName}) đạt độ khớp 78% với vị trí ${targetRole} (${targetLevel}). CV đã chứng minh được năng lực thực hành Python, FastAPI, PostgreSQL (pgvector) và xây dựng hệ thống tìm kiếm kết hợp (Hybrid Search) sát với yêu cầu trong JD.`,
          missingKeywordsOrGaps: [
            'Nên làm rõ hơn cơ chế kiểm soát phân quyền truy cập tài liệu ở tầng truy vấn SQL.',
            'Bổ sung thêm con số đo lường độ chính xác trích dẫn nguồn trong dự án đầu tiên.',
          ],
        }
      : {
          matchPercent: 45,
          passedGate: false,
          layoutAndPresentationFeedback:
            'Bố cục CV dễ nhìn nhưng cách triển khai ý trong mục Dự án còn liệt kê công nghệ chung chung, thiếu các gạch đầu dòng mô tả độ sâu kỹ thuật và kết quả đo lường cụ thể.',
          jdMatchEvaluation: `Hồ sơ CV hiện tại (${mockUserProfile.cvParsedData.fileName}) mới đạt độ khớp 45% với tờ JD vị trí ${targetRole}. Bản CV mới nêu kinh nghiệm lập trình Python/SQL cơ bản, chưa làm nổi bật được dự án và kỹ năng xử lý tài liệu RAG / Vector Search mà JD đang yêu cầu.`,
          missingKeywordsOrGaps: [
            'Thiếu mô tả dự án xây dựng hệ thống tìm kiếm ngữ nghĩa & từ khóa (Hybrid Search / pgvector).',
            'Thiếu kỹ năng bóc tách tài liệu PDF/Word giữ nguyên cấu trúc bảng biểu.',
          ],
        };

    const interviewId = `intv-draft-${Date.now()}`;
    const draftRecord: MockInterviewRecord = {
      id: interviewId,
      userId: mockUserProfile.userId,
      targetLevel,
      targetRole,
      jdRawText,
      cvScreeningResult,
      transcriptLog: [],
      evaluationReport: null,
      status: 'CV_SCREENING',
      createdAt: new Date().toISOString(),
    };
    mockInterviewsMap.set(interviewId, draftRecord);

    return {
      interviewId,
      status: 'CV_SCREENING',
      creditDeducted: 0,
      availableCredits: mockUserProfile.interviewCredits,
      cvScreeningResult,
    } as T;
  }

  const startInterviewMatch = path.match(/^\/interviews\/([^/]+)\/start$/);
  if (upperMethod === 'POST' && startInterviewMatch) {
    const interviewId = decodeURIComponent(startInterviewMatch[1]);
    const existing = mockInterviewsMap.get(interviewId);
    if (existing) {
      existing.status = 'IN_PROGRESS';
    }
    return {
      interviewId,
      status: 'IN_PROGRESS',
      startedAt: new Date().toISOString(),
    } as T;
  }

  const turnInterviewMatch = path.match(/^\/interviews\/([^/]+)\/turn$/);
  if (upperMethod === 'POST' && turnInterviewMatch) {
    const interviewId = decodeURIComponent(turnInterviewMatch[1]);
    const transcriptText = String(payload.transcript || '');
    const existing = mockInterviewsMap.get(interviewId);
    if (existing) {
      existing.transcriptLog.push({
        speaker: 'STUDENT',
        speakerLabel: `${mockUserProfile.fullName} (Trả lời bằng giọng nói)`,
        text: transcriptText,
        createdAt: new Date().toISOString(),
      });
    }
    return {
      interviewId,
      recordedTranscript: transcriptText,
      acknowledged: true,
    } as T;
  }

  const completeInterviewMatch = path.match(/^\/interviews\/([^/]+)\/complete$/);
  if (upperMethod === 'POST' && completeInterviewMatch) {
    const interviewId = decodeURIComponent(completeInterviewMatch[1]);
    mockUserProfile.interviewCredits = Math.max(0, mockUserProfile.interviewCredits - 1);
    const evaluationReport = {
      overallScore: 89,
      projectDepthScore: 92,
      communicationScore: 88,
      strengths: [
        'Nắm vững kiến trúc kỹ thuật của dự án trong CV, giải thích rõ cách giữ nguyên bảng biểu PDF.',
        'Trình bày mạch lạc, trả lời đúng trọng tâm câu hỏi tình huống của JD.',
      ],
      improvements: [
        'Nên nêu rõ hơn thông số độ trễ (latency) khi chạy song song hai nhánh tìm kiếm.',
      ],
    };
    const existing = mockInterviewsMap.get(interviewId);
    if (existing) {
      existing.status = 'COMPLETED';
      existing.evaluationReport = evaluationReport;
    }
    return {
      interviewId,
      status: 'COMPLETED',
      creditDeducted: 1,
      remainingCredits: mockUserProfile.interviewCredits,
      evaluationReport,
    } as T;
  }

  const deleteInterviewMatch = path.match(/^\/interviews\/([^/]+)$/);
  if (upperMethod === 'DELETE' && deleteInterviewMatch) {
    const interviewId = decodeURIComponent(deleteInterviewMatch[1]);
    mockInterviewsMap.delete(interviewId);
    return {
      interviewId,
      deleted: true,
      creditDeducted: 0,
    } as T;
  }

  // ==========================================================================
  // 7. TEACH ROUTES (`/teach/*`)
  // ==========================================================================
  if (upperMethod === 'GET' && path === '/teach/schedule') {
    return {
      liveSession:
        INITIAL_CLASS_SESSIONS.find((s) => s.status === 'LIVE') ??
        INITIAL_CLASS_SESSIONS[4],
      upcomingSessions: INITIAL_CLASS_SESSIONS.filter((s) => s.status !== 'REPLAY_READY'),
    } as T;
  }

  if (upperMethod === 'GET' && path === '/teach/cohorts') {
    return INITIAL_COHORTS as T;
  }

  const teachSessionDetailMatch = path.match(
    /^\/teach\/cohorts\/([^/]+)\/sessions\/([^/]+)$/
  );
  if (upperMethod === 'GET' && teachSessionDetailMatch) {
    const sessionId = decodeURIComponent(teachSessionDetailMatch[2]);
    const session =
      INITIAL_CLASS_SESSIONS.find((s) => s.id === sessionId) ??
      INITIAL_CLASS_SESSIONS[3];
    const assessmentId = `quiz-${session.id}`;
    const meta = mockAssessments.find((a) => a.id === assessmentId);
    return {
      session,
      questions:
        mockAssessmentQuestionsMap.get(assessmentId) ?? SESSION_4_MCQ_QUESTIONS,
      publishStatus: (meta?.status ?? 'PUBLISHED') as AssessmentPublishStatus,
    } as T;
  }

  const teachCohortDetailMatch = path.match(/^\/teach\/cohorts\/([^/]+)$/);
  if (upperMethod === 'GET' && teachCohortDetailMatch) {
    const cohortId = decodeURIComponent(teachCohortDetailMatch[1]);
    const cohort =
      INITIAL_COHORTS.find((c) => c.id === cohortId) ?? INITIAL_COHORTS[0];
    const sessions = INITIAL_CLASS_SESSIONS.filter((s) => s.cohortId === cohort.id);
    return {
      cohort,
      sessions: sessions.length > 0 ? sessions : INITIAL_CLASS_SESSIONS,
      finalExamQuestions: FINAL_EXAM_25_MCQ_QUESTIONS,
    } as T;
  }

  const updateMaterialsMatch = path.match(/^\/teach\/sessions\/([^/]+)\/materials$/);
  if (upperMethod === 'PUT' && updateMaterialsMatch) {
    const sessionId = decodeURIComponent(updateMaterialsMatch[1]);
    return {
      sessionId,
      updated: true,
      updatedAt: new Date().toISOString(),
    } as T;
  }

  const generateQuizMatch = path.match(/^\/teach\/sessions\/([^/]+)\/generate-quiz$/);
  if (upperMethod === 'POST' && generateQuizMatch) {
    const sessionId = decodeURIComponent(generateQuizMatch[1]);
    const assessmentId = `quiz-${sessionId}`;
    const generatedItems = structuredClone(SESSION_4_MCQ_QUESTIONS);
    mockAssessmentQuestionsMap.set(assessmentId, generatedItems);
    const found = mockAssessments.find((a) => a.id === assessmentId);
    if (found) {
      found.status = 'DRAFT';
    }
    return {
      assessmentId,
      sessionId,
      status: 'DRAFT',
      items: generatedItems,
    } as T;
  }

  const publishAssessmentMatch = path.match(/^\/teach\/assessments\/([^/]+)\/publish$/);
  if (upperMethod === 'PUT' && publishAssessmentMatch) {
    const assessmentId = decodeURIComponent(publishAssessmentMatch[1]);
    const items = Array.isArray(payload.items)
      ? (payload.items as McqQuestionItem[])
      : SESSION_4_MCQ_QUESTIONS;
    mockAssessmentQuestionsMap.set(assessmentId, items);
    const found = mockAssessments.find((a) => a.id === assessmentId);
    if (found) {
      found.status = 'PUBLISHED';
    }
    return {
      assessmentId,
      status: 'PUBLISHED',
      publishedCount: items.length,
      publishedAt: 'Vừa duyệt & xuất bản chính thức cho học viên',
    } as T;
  }

  const guestLinkMatch = path.match(/^\/teach\/sessions\/([^/]+)\/guest-link$/);
  if (upperMethod === 'POST' && guestLinkMatch) {
    const sessionId = decodeURIComponent(guestLinkMatch[1]);
    const origin =
      typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000';
    return {
      sessionId,
      oneTimeGuestUrl: `${origin}/live/guest?token=K01-GUEST-${Math.floor(
        1000 + Math.random() * 9000
      )}`,
      expiresInHours: 4,
    } as T;
  }

  const replyDiscussionMatch = path.match(/^\/teach\/discussions\/([^/]+)\/reply$/);
  if (upperMethod === 'POST' && replyDiscussionMatch) {
    const threadId = decodeURIComponent(replyDiscussionMatch[1]);
    return {
      threadId,
      verifiedByStaff: true,
      repliedAt: 'Vừa xong',
    } as T;
  }

  const reviewProctoringMatch = path.match(/^\/teach\/exam-reviews\/([^/]+)$/);
  if (upperMethod === 'PUT' && reviewProctoringMatch) {
    const reviewId = decodeURIComponent(reviewProctoringMatch[1]);
    return {
      reviewId,
      decision: payload.decision || 'APPROVED',
      updatedAt: new Date().toISOString(),
    } as T;
  }

  const aiReminderMatch = path.match(/^\/teach\/enrollments\/([^/]+)\/ai-reminder$/);
  if (upperMethod === 'POST' && aiReminderMatch) {
    const enrollmentId = decodeURIComponent(aiReminderMatch[1]);
    const targetEnrollment =
      mockEnrollments.find((e) => e.id === enrollmentId) ?? mockEnrollments[0];
    const notificationId = `notif-ai-${Date.now()}`;
    const createdAt = new Date().toISOString();
    const title = `Nhắc nhở học tập cá nhân hóa cho ${targetEnrollment.studentName} (${targetEnrollment.cohortCode})`;
    mockNotifications.unshift({
      id: notificationId,
      userId: targetEnrollment.userId,
      studentName: targetEnrollment.studentName,
      cohortId: targetEnrollment.cohortId,
      cohortCode: targetEnrollment.cohortCode,
      type: 'AI_STUDY_REMINDER',
      title,
      message: `Lộ trình ôn tập 15 phút được cá nhân hóa cho ${targetEnrollment.studentName}: Xem lại mốc video trọng tâm và hoàn thành ${targetEnrollment.missingQuizzesCount} bài trắc nghiệm mở khóa còn thiếu.`,
      isRead: false,
      sentAt: createdAt,
      readAt: null,
      actedAt: null,
    });
    return {
      notificationId,
      enrollmentId: targetEnrollment.id,
      type: 'AI_STUDY_REMINDER',
      title,
      createdAt,
    } as T;
  }

  // ==========================================================================
  // 8. ADMIN ROUTES (`/admin/*`)
  // ==========================================================================
  if (upperMethod === 'GET' && path === '/admin/overview') {
    return {
      totalRevenueVnd: 468000000,
      activeCohortsCount: INITIAL_COHORTS.length,
      totalStudentsCount: 142,
      issuedCertificatesCount: Object.keys(INITIAL_CERTIFICATES).length,
      cohorts: INITIAL_COHORTS,
      certificates: INITIAL_CERTIFICATES,
    } as T;
  }

  if (upperMethod === 'POST' && path === '/admin/courses') {
    return {
      courseId: String(payload.id || `course-${Date.now()}`),
      status: 'SAVED',
      course: payload,
    } as T;
  }

  if (upperMethod === 'POST' && path === '/admin/cohorts') {
    const scheduleSlots = Array.isArray(payload.scheduleSlots)
      ? payload.scheduleSlots
      : [
          { dayOfWeek: 2, startTime: '19:30', endTime: '21:30' },
          { dayOfWeek: 6, startTime: '19:30', endTime: '21:30' },
        ];
    return {
      cohortId: String(payload.cohortId || `cohort-${Date.now()}`),
      status: payload.cohortId ? 'UPDATED' : 'CREATED',
      instructorId: String(payload.instructorId || 'usr-inst-khoa'),
      curriculumVersion: String(payload.curriculumVersion || 'v2.5'),
      scheduleSlots,
      payload,
    } as T;
  }

  if (upperMethod === 'PUT' && path === '/admin/users') {
    return {
      userId: String(payload.userId || 'usr-student-01'),
      role: payload.role || 'STUDENT',
      updated: true,
    } as T;
  }

  if (upperMethod === 'GET' && path === '/admin/sepay-transactions') {
    return mockPaymentTransactions as T;
  }

  if (upperMethod === 'POST' && path === '/admin/certificates/issue') {
    const enrollmentIds = Array.isArray(payload.enrollmentIds)
      ? payload.enrollmentIds
      : ['enr-01'];
    mockUserProfile.interviewCredits += 4;
    return {
      issuedCount: enrollmentIds.length,
      certificateCodes: enrollmentIds.map(
        () => `CERT-3T-2026-${Math.floor(1000 + Math.random() * 9000)}`
      ),
      bonusInterviewCreditsAdded: 4,
    } as T;
  }

  throw new Error(`Unmatched mock route: [${upperMethod}] ${path}`);
}
