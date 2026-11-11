import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {
  authApi,
  catalogApi,
  orderApi,
  learningApi,
  assessmentApi,
  profileInterviewApi,
  teachApi,
  adminApi,
} from './index';
import {
  INITIAL_COHORTS,
  INITIAL_CLASS_SESSIONS,
  INITIAL_USER_PROFILES,
  INITIAL_PAYMENT_TRANSACTIONS,
  INITIAL_ASSESSMENTS,
  INITIAL_MOCK_INTERVIEWS,
  INITIAL_ENROLLMENTS,
  INITIAL_CHAT_MESSAGES,
  INITIAL_NOTIFICATIONS,
} from '../data/mockDatabase';

test('All *.api.ts files are pure httpRequest wrappers without .find(), .filter() or mock data', () => {
  const apiFiles = [
    'auth.api.ts',
    'catalog.api.ts',
    'order.api.ts',
    'learning.api.ts',
    'assessment.api.ts',
    'profile-interview.api.ts',
    'teach.api.ts',
    'admin.api.ts',
  ];

  for (const fileName of apiFiles) {
    const filePath = path.resolve(process.cwd(), 'src/services', fileName);
    const content = fs.readFileSync(filePath, 'utf8');
    assert.equal(
      content.includes('.find('),
      false,
      `${fileName} must not contain .find()`
    );
    assert.equal(
      content.includes('.filter('),
      false,
      `${fileName} must not contain .filter()`
    );
    assert.equal(
      content.includes('mockDatabase'),
      false,
      `${fileName} must not import mockDatabase`
    );
  }
});

test('mockDatabase.ts aligns 100% with latest PostgreSQL schema', () => {
  // 1. Cohorts: instructorId, curriculumVersion & scheduleSlots (JSONB), no TA role
  for (const cohort of INITIAL_COHORTS) {
    assert.ok(cohort.instructorId, 'cohort must have instructorId');
    assert.ok(cohort.curriculumVersion, 'cohort must have curriculumVersion');
    assert.ok(
      Array.isArray(cohort.scheduleSlots) && cohort.scheduleSlots.length >= 1,
      'cohort must have scheduleSlots array'
    );
    for (const slot of cohort.scheduleSlots) {
      assert.ok([0, 1, 2, 3, 4, 5, 6].includes(slot.dayOfWeek));
      assert.match(slot.startTime, /^\d{2}:\d{2}$/);
      assert.match(slot.endTime, /^\d{2}:\d{2}$/);
    }
    assert.equal('schedule_text' in cohort, false);
    for (const key of Object.keys(cohort)) {
      assert.notEqual(key.toLowerCase(), 'scheduletext');
    }
    for (const member of cohort.staff) {
      assert.equal(member.role, 'INSTRUCTOR');
    }
  }

  // 2. ClassSessions: videoR2Key & videoProvider, no legacy fields
  for (const session of INITIAL_CLASS_SESSIONS) {
    assert.ok(session.videoR2Key.length > 0);
    assert.ok(
      session.videoProvider === 'R2_HLS_AES128' ||
        session.videoProvider === 'BUNNY_STREAM'
    );
    assert.equal('isFreePreview' in session, false);
    assert.equal('externalYoutubeId' in session, false);
    assert.equal('hlsAesKeyHex' in session, false);
  }

  // 3. UserProfiles: cvParsedData & interviewCredits, no cvReviewFeedback
  for (const profile of INITIAL_USER_PROFILES) {
    assert.ok(profile.cvParsedData);
    assert.equal(typeof profile.interviewCredits, 'number');
    assert.equal('cvReviewFeedback' in profile, false);
    assert.ok(['STUDENT', 'INSTRUCTOR', 'ADMIN'].includes(profile.role));
  }

  // 4. PaymentTransactions: orderId (nullable), gateway: 'SEPAY_VIETQR', matchStatus
  assert.ok(INITIAL_PAYMENT_TRANSACTIONS.some((tx) => tx.orderId === null));
  for (const tx of INITIAL_PAYMENT_TRANSACTIONS) {
    assert.equal(tx.gateway, 'SEPAY_VIETQR');
    assert.ok(
      ['MATCHED', 'UNMATCHED_ORDER', 'AMOUNT_MISMATCH'].includes(tx.matchStatus)
    );
  }

  // 5. Assessments: status ('DRAFT' | 'PUBLISHED')
  assert.ok(INITIAL_ASSESSMENTS.some((a) => a.status === 'DRAFT'));
  assert.ok(INITIAL_ASSESSMENTS.some((a) => a.status === 'PUBLISHED'));

  // 6. MockInterviews: targetLevel, targetRole, jdRawText, cvScreeningResult, transcriptLog, evaluationReport, status
  for (const intv of INITIAL_MOCK_INTERVIEWS) {
    assert.ok(['INTERN', 'FRESHER', 'JUNIOR', 'SENIOR'].includes(intv.targetLevel));
    assert.ok(intv.targetRole.length > 0);
    assert.ok(intv.jdRawText.length > 0);
    assert.ok(intv.cvScreeningResult.layoutAndPresentationFeedback.length > 0);
    assert.ok(intv.cvScreeningResult.jdMatchEvaluation.length > 0);
    assert.ok(Array.isArray(intv.transcriptLog));
    assert.ok(
      ['CV_SCREENING', 'IN_PROGRESS', 'COMPLETED'].includes(intv.status)
    );
  }

  // 7. Enrollments: dropoutRiskScore (0.0 - 1.0) & riskLevel ('LOW' | 'MEDIUM' | 'HIGH')
  assert.ok(INITIAL_ENROLLMENTS.length >= 6);
  assert.ok(INITIAL_ENROLLMENTS.some((e) => e.riskLevel === 'HIGH'));
  for (const enr of INITIAL_ENROLLMENTS) {
    assert.ok(enr.dropoutRiskScore >= 0 && enr.dropoutRiskScore <= 1);
    assert.ok(['LOW', 'MEDIUM', 'HIGH'].includes(enr.riskLevel));
  }

  // 8. ChatMessages: detectedTopic (string | null)
  assert.ok(INITIAL_CHAT_MESSAGES.length >= 6);
  assert.ok(
    INITIAL_CHAT_MESSAGES.some((m) => m.detectedTopic === 'RAG & Vector Search')
  );
  for (const msg of INITIAL_CHAT_MESSAGES) {
    assert.ok('detectedTopic' in msg);
  }

  // 9. Notifications: actedAt (string | null)
  assert.ok(INITIAL_NOTIFICATIONS.length >= 5);
  assert.ok(INITIAL_NOTIFICATIONS.some((n) => n.actedAt !== null));
  assert.ok(INITIAL_NOTIFICATIONS.some((n) => n.actedAt === null));
});

test('Modular API services execute end-to-end via handleMockRequest', async () => {
  // Auth
  const loginRes = await authApi.login('an.nguyen.dev@gmail.com', 'secret');
  assert.equal(loginRes.user.role, 'STUDENT');

  // Catalog
  const courses = await catalogApi.getCourses({ query: 'AI' });
  assert.ok(courses.length >= 1);

  // Order & SePay
  const order = await orderApi.createCohortOrder('cohort-ai-k01', 'idem-01');
  assert.equal(order.orderCode, 'ET20268891');
  const webhook = await orderApi.simulateSepayWebhook(order.orderCode);
  assert.equal(webhook.status, 'PAID');
  assert.equal(webhook.gateway, 'SEPAY_VIETQR');

  // Learning
  const dashboard = await learningApi.getStudentDashboard();
  assert.ok(dashboard.liveSession.id);

  // Assessment (10 questions for session quiz, 25 for final exam, hidden correctIndex)
  const quiz = await assessmentApi.getAssessmentForStudent('quiz-sess-ai-04');
  assert.equal(quiz.questionCount, 10);
  assert.equal('correctIndex' in (quiz.promptConfig[0] as any), false);

  const finalExam = await assessmentApi.getAssessmentForStudent(
    'final-exam-cohort-ai-k01'
  );
  assert.equal(finalExam.questionCount, 25);

  // Profile & 2-Round Interview
  const profileSkills = await profileInterviewApi.getMyProfileAndSkills();
  assert.equal(profileSkills.studentSkillStates.length, 9);

  const round1 = await profileInterviewApi.screenCvAgainstJd(
    'FRESHER',
    'AI Engineer',
    'Yêu cầu Python, FastAPI, PostgreSQL pgvector, RAG',
    'READY_78'
  );
  assert.equal(round1.creditDeducted, 0);
  assert.equal(round1.cvScreeningResult.matchPercent, 78);
  assert.ok(round1.cvScreeningResult.layoutAndPresentationFeedback.length > 10);
  assert.ok(round1.cvScreeningResult.jdMatchEvaluation.length > 10);

  await profileInterviewApi.startVoiceInterview(round1.interviewId);
  await profileInterviewApi.sendVoiceTurn(
    round1.interviewId,
    'Em dùng bộ đọc cấu trúc bảng biểu Markdown kèm tiêu đề cột.'
  );
  const cancelled = await profileInterviewApi.cancelDraftInterview(
    round1.interviewId
  );
  assert.equal(cancelled.deleted, true);
  assert.equal(cancelled.creditDeducted, 0);

  // Teach & Admin
  const generatedQuiz = await teachApi.generateSessionQuizByAi('sess-ai-05');
  assert.equal(generatedQuiz.status, 'DRAFT');
  assert.equal(generatedQuiz.items.length, 10);

  const publishedQuiz = await teachApi.publishAssessment(
    generatedQuiz.assessmentId,
    generatedQuiz.items
  );
  assert.equal(publishedQuiz.status, 'PUBLISHED');

  const reminderRes = await teachApi.sendAiPersonalizedReminder('enr-k01-03');
  assert.equal(reminderRes.type, 'AI_STUDY_REMINDER');
  assert.ok(reminderRes.notificationId.startsWith('notif-ai-'));

  const sepayTxs = await adminApi.getSepayTransactions();
  assert.ok(sepayTxs.length >= 3);
});

