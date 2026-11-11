import React, { useState } from 'react';
import {
  Target,
  CheckCircle2,
  Camera,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
} from 'lucide-react';
import { useAcademy } from '../context/AcademyContext';
import { calculatePathRecommendation, formatVnd, formatScheduleSlots } from '../utils/academyLogic';
import { CompetencyVerifiedShield } from '../components/BotanicalStickers';

const DIAGNOSTIC_QUESTIONS = [
  {
    q: 'Câu 1/3: Khi xây dựng tính năng tìm kiếm tài liệu nội bộ cho công ty, vì sao nên kết hợp cả tìm theo từ khóa chính xác lẫn tìm theo ý nghĩa câu hỏi?',
    options: [
      'Không cần kết hợp vì chỉ cần tìm đại khái là đủ',
      'Giúp vừa tìm đúng mã hợp đồng, tên riêng, vừa hiểu được các câu hỏi diễn đạt tự nhiên của nhân viên',
      'Chỉ dùng khi tài liệu ít hơn 10 dòng',
    ],
  },
  {
    q: 'Câu 2/3: Khi khách hàng chuyển khoản học phí qua mã QR ngân hàng, làm sao để hệ thống không bị cộng trùng đơn hàng nếu mạng báo về 2 lần?',
    options: [
      'Gắn mã giao dịch duy nhất cho mỗi đơn để nếu nhận thông báo lần 2 thì hệ thống tự động bỏ qua',
      'Bắt khách hàng chụp màn hình gửi qua email',
      'Tắt cổng thanh toán vào buổi tối',
    ],
  },
  {
    q: 'Câu 3/3: Khi đọc một file tài liệu PDF dài nhiều trang để đưa vào hệ thống tra cứu, cách cắt đoạn nào giúp câu trả lời không bị cụt ý?',
    options: [
      'Đổi toàn bộ chữ thành in hoa',
      'Cắt ngẫu nhiên bất kỳ chỗ nào',
      'Tách theo từng mục tiêu đề lớn và giữ lại một phần câu nối tiếp giữa hai đoạn',
    ],
  },
];

export const OnboardingWizardView: React.FC = () => {
  const { courses, cohorts, navigate, setRole, setStudentSidebarTab } = useAcademy();

  const isAutostart =
    typeof window !== 'undefined' &&
    new URLSearchParams(window.location.search).get('autostart') === '1';

  const [step, setStep] = useState<1 | 2 | 3 | 4>(isAutostart ? 4 : 1);
  const [careerGoal, setCareerGoal] = useState<
    'AI_ENGINEER' | 'CLOUD_BACKEND' | 'DATA_ANALYTICS'
  >('AI_ENGINEER');
  const [answers, setAnswers] = useState<number[]>([1, 0, 2]);
  const [faceCaptured, setFaceCaptured] = useState<boolean>(true);

  const pathResult = calculatePathRecommendation(careerGoal, answers);
  const recommendedCourse =
    courses.find((c) => c.slug === pathResult.recommendedCourseSlug) ?? courses[0];
  const recommendedCohort =
    cohorts.find((c) => c.code === pathResult.recommendedCohortCode) ?? cohorts[0];

  const handleSelectAnswer = (qIdx: number, optIdx: number) => {
    setAnswers((prev) => {
      const next = [...prev];
      next[qIdx] = optIdx;
      return next;
    });
  };

  return (
    <div className="max-w-[880px] mx-auto px-6 py-10 space-y-8">
      {/* Top Progress Header */}
      <div className="rounded-xl bg-white dark:bg-[#111A15] border border-[#E2ECE7] dark:border-[#1E2D24] p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <div className="text-xs font-mono font-semibold text-[#059669] dark:text-[#34D399]">
              THIẾT LẬP LỘ TRÌNH HỌC CÁ NHÂN · BƯỚC {step}/4
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-[#0F172A] dark:text-[#ECFDF5]">
              Chọn Mục Tiêu Nghề Nghiệp &amp; Tìm Lớp Học Phù Hợp Nhất Với Bạn
            </h1>
          </div>
          <div className="flex items-center gap-1.5">
            {([1, 2, 3, 4] as const).map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setStep(s)}
                className={`px-3 py-1.5 rounded-lg font-mono text-xs font-bold transition-colors cursor-pointer ${
                  step === s
                    ? 'bg-[#10B981] text-white'
                    : step > s
                    ? 'bg-[#D1FAE5] dark:bg-emerald-950 text-[#065F46] dark:text-emerald-300'
                    : 'bg-[#F7FBF9] dark:bg-[#090F0C] text-[#475569] dark:text-[#94A3B8] border border-[#E2ECE7] dark:border-[#1E2D24]'
                }`}
              >
                0{s}
              </button>
            ))}
          </div>
        </div>

        <div className="w-full h-2 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
          <div
            className="h-full bg-[#10B981] transition-all"
            style={{ width: `${(step / 4) * 100}%` }}
          />
        </div>
      </div>

      {/* Step 1: Career Goal Selection */}
      {step === 1 && (
        <div className="rounded-xl bg-white dark:bg-[#111A15] border border-[#E2ECE7] dark:border-[#1E2D24] p-6 sm:p-8 space-y-6">
          <div className="space-y-1">
            <h2 className="text-lg font-bold text-[#0F172A] dark:text-[#ECFDF5]">
              Bước 1: Chọn Mục Tiêu Vị Trí Công Nghệ Trọng Tâm Trong 4 – 6 Tháng Tới
            </h2>
            <p className="text-xs text-[#475569] dark:text-[#94A3B8]">
              Hệ thống sẽ đối chiếu mục tiêu này với bài chẩn đoán ở Bước 2 để đề xuất đợt học phù hợp nhất.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                id: 'AI_ENGINEER' as const,
                title: 'Kỹ Sư AI Thực Chiến (Xây dựng Trợ lý AI)',
                desc: 'Tự tay xây dựng hệ thống tra cứu tài liệu thông minh, trả lời kèm trích dẫn chính xác và triển khai thực tế.',
                tag: 'Lộ trình Hot nhất 2026',
              },
              {
                id: 'CLOUD_BACKEND' as const,
                title: 'Distributed Backend & Cloud Architect',
                desc: 'Xây dựng cổng thanh toán tự động SePay/VietQR, xử lý bất đồng bộ, PostgreSQL Locking và Kubernetes.',
                tag: 'Kỹ thuật Hệ thống Chịu tải',
              },
              {
                id: 'DATA_ANALYTICS' as const,
                title: 'Analytics Engineer (SQL, Python & dbt)',
                desc: 'Xây dựng Data Warehouse chuẩn Medallion, kiểm thử chất lượng dữ liệu tự động và phân tích hành vi Cohort.',
                tag: 'Dữ liệu Hiện đại',
              },
            ].map((item) => {
              const active = careerGoal === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setCareerGoal(item.id)}
                  className={`text-left p-5 rounded-xl border transition-all cursor-pointer flex flex-col justify-between space-y-4 ${
                    active
                      ? 'bg-[#D1FAE5]/40 dark:bg-emerald-950/60 border-2 border-[#10B981]'
                      : 'bg-[#F7FBF9] dark:bg-[#090F0C] border-[#E2ECE7] dark:border-[#1E2D24] hover:border-[#10B981]'
                  }`}
                >
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between">
                      <Target className="w-5 h-5 text-[#10B981]" />
                      <span className="text-[11px] font-mono font-semibold text-[#059669] dark:text-[#34D399]">
                        {item.tag}
                      </span>
                    </div>
                    <div className="text-sm font-bold text-[#0F172A] dark:text-[#ECFDF5]">
                      {item.title}
                    </div>
                    <p className="text-xs text-[#475569] dark:text-[#94A3B8] leading-relaxed">
                      {item.desc}
                    </p>
                  </div>

                  <div className="text-xs font-semibold text-[#059669] dark:text-[#34D399]">
                    {active ? '✓ Đang chọn mục tiêu này' : 'Nhấn để chọn'}
                  </div>
                </button>
              );
            })}
          </div>

          <div className="pt-4 border-t border-[#E2ECE7] dark:border-[#1E2D24] flex flex-wrap items-center justify-between gap-4">
            <button
              type="button"
              onClick={() => {
                setRole('STUDENT');
                setStudentSidebarTab('PROFILE_CV');
                navigate('/app/profile-cv');
              }}
              className="text-xs font-bold text-[#059669] dark:text-[#34D399] hover:underline cursor-pointer"
            >
              Bạn đã có sẵn file CV? Bấm vào đây để tải CV lên điền tự động nhé →
            </button>

            <button
              type="button"
              onClick={() => setStep(2)}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-[#10B981] hover:bg-[#059669] text-white text-xs font-semibold cursor-pointer"
            >
              <span>Tiếp tục sang Bước 2: Chẩn đoán nhanh</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Step 2: 3-Question Quick Diagnostic Quiz */}
      {step === 2 && (
        <div className="rounded-xl bg-white dark:bg-[#111A15] border border-[#E2ECE7] dark:border-[#1E2D24] p-6 sm:p-8 space-y-6">
          <div className="space-y-1">
            <h2 className="text-lg font-bold text-[#0F172A] dark:text-[#ECFDF5]">
              Bước 2: 3 Câu Hỏi Nhanh Để Hiểu Nền Tảng Hiện Tại Của Bạn
            </h2>
            <p className="text-xs text-[#475569] dark:text-[#94A3B8]">
              Giúp AI Tutor biết chính xác những khái niệm nào bạn đã vững và phần nào cần kèm cặp sâu hơn.
            </p>
          </div>

          <div className="space-y-5">
            {DIAGNOSTIC_QUESTIONS.map((item, qIdx) => (
              <div
                key={item.q}
                className="p-4 rounded-xl bg-[#F7FBF9] dark:bg-[#090F0C] border border-[#E2ECE7] dark:border-[#1E2D24] space-y-3"
              >
                <div className="text-xs sm:text-sm font-bold text-[#0F172A] dark:text-[#ECFDF5]">
                  {item.q}
                </div>
                <div className="space-y-2">
                  {item.options.map((opt, optIdx) => {
                    const selected = answers[qIdx] === optIdx;
                    return (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => handleSelectAnswer(qIdx, optIdx)}
                        className={`w-full text-left px-3.5 py-2.5 rounded-lg border text-xs transition-colors cursor-pointer flex items-center justify-between gap-3 ${
                          selected
                            ? 'bg-[#D1FAE5] dark:bg-emerald-950 border-[#10B981] text-[#065F46] dark:text-emerald-300 font-semibold'
                            : 'bg-white dark:bg-[#111A15] border-[#E2ECE7] dark:border-[#1E2D24] text-[#475569] dark:text-[#94A3B8]'
                        }`}
                      >
                        <span>{opt}</span>
                        {selected && <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-[#E2ECE7] dark:border-[#1E2D24]">
            <button
              type="button"
              onClick={() => setStep(1)}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border border-[#E2ECE7] dark:border-[#1E2D24] text-xs font-semibold text-[#475569] dark:text-[#94A3B8] cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Quay lại Bước 1</span>
            </button>
            <button
              type="button"
              onClick={() => setStep(3)}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-[#10B981] hover:bg-[#059669] text-white text-xs font-semibold cursor-pointer"
            >
              <span>Tiếp tục sang Bước 3: Khuôn mặt Tham chiếu</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Webcam Face Reference Capture Simulation */}
      {step === 3 && (
        <div className="rounded-xl bg-white dark:bg-[#111A15] border border-[#E2ECE7] dark:border-[#1E2D24] p-6 sm:p-8 space-y-6">
          <div className="space-y-1">
            <h2 className="text-lg font-bold text-[#0F172A] dark:text-[#ECFDF5]">
              Bước 3: Chụp Ảnh Chân Dung Xác Minh Học Viên Chính Chủ
            </h2>
            <p className="text-xs text-[#475569] dark:text-[#94A3B8]">
              Để Chứng chỉ tốt nghiệp của bạn có giá trị uy tín với nhà tuyển dụng, 3T Academy hỗ trợ lưu ảnh chân dung đối chiếu cho bài thi tốt nghiệp cuối khóa nhé.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            <div className="md:col-span-6 rounded-xl bg-[#0F172A] p-6 text-center space-y-4 border border-slate-800">
              <div className="w-36 h-36 mx-auto rounded-full border-2 border-dashed border-[#34D399] flex flex-col items-center justify-center bg-slate-900/90 text-emerald-300 space-y-1.5">
                <Camera className="w-8 h-8" />
                <span className="text-[11px] font-mono">
                  {faceCaptured ? 'ĐÃ LƯU ẢNH' : 'CHƯA CHỤP'}
                </span>
              </div>
              <div className="text-xs text-slate-300">
                Học viên: <strong>Nguyễn Văn An</strong> · Độ sáng khuôn mặt: Đạt chuẩn (98%)
              </div>
              <button
                type="button"
                onClick={() => setFaceCaptured(true)}
                className="px-4 py-2 rounded-lg bg-[#10B981] hover:bg-[#059669] text-white text-xs font-semibold cursor-pointer"
              >
                {faceCaptured ? '✓ Đã lưu ảnh chân dung của bạn' : 'Chụp ảnh chân dung ngay'}
              </button>
            </div>

            <div className="md:col-span-6 space-y-3 text-xs text-[#475569] dark:text-[#94A3B8]">
              <div className="p-4 rounded-xl bg-[#F7FBF9] dark:bg-[#090F0C] border border-[#E2ECE7] dark:border-[#1E2D24] space-y-2">
                <div className="flex items-center gap-2 font-bold text-[#0F172A] dark:text-[#ECFDF5]">
                  <ShieldCheck className="w-4 h-4 text-[#10B981]" />
                  <span>Cam kết quyền riêng tư &amp; bảo mật thông tin cá nhân</span>
                </div>
                <p className="leading-relaxed">
                  Ảnh chân dung chỉ được sử dụng duy nhất vào thời điểm bạn tham gia bài thi tốt nghiệp cuối khóa để xác minh chính chủ trước khi cấp chứng chỉ.
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-[#E2ECE7] dark:border-[#1E2D24]">
            <button
              type="button"
              onClick={() => setStep(2)}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border border-[#E2ECE7] dark:border-[#1E2D24] text-xs font-semibold text-[#475569] dark:text-[#94A3B8] cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Quay lại Bước 2</span>
            </button>
            <button
              type="button"
              onClick={() => setStep(4)}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-[#10B981] hover:bg-[#059669] text-white text-xs font-semibold cursor-pointer"
            >
              <span>Xem Lộ Trình Học Phù Hợp Với Bạn</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Step 4: Personalized Course Recommendation */}
      {step === 4 && (
        <div className="rounded-xl bg-white dark:bg-[#111A15] border-2 border-[#10B981] p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E2ECE7] dark:border-[#1E2D24]">
            <div className="flex items-center gap-3.5">
              <CompetencyVerifiedShield className="w-12 h-12 shrink-0" />
              <div>
                <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-[#059669] dark:text-[#34D399]">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>ĐIỂM ĐÁNH GIÁ ĐẦU VÀO: {pathResult.diagnosticScore}/100 ĐIỂM</span>
                </div>
                <h2 className="text-xl font-bold text-[#0F172A] dark:text-[#ECFDF5]">
                  Lộ Trình Học Được Gợi Ý Riêng Cho Bạn
                </h2>
              </div>
            </div>
            <span className="px-3 py-1 rounded-md bg-[#D1FAE5] dark:bg-emerald-950 text-[#065F46] dark:text-emerald-300 text-xs font-semibold">
              {pathResult.readinessLevel}
            </span>
          </div>

          <p className="text-xs sm:text-sm text-[#475569] dark:text-[#94A3B8] leading-relaxed">
            {pathResult.rationale}
          </p>

          {/* Recommended Cohort Card */}
          <div className="rounded-xl bg-[#F7FBF9] dark:bg-[#090F0C] border border-[#E2ECE7] dark:border-[#1E2D24] p-5 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="font-mono text-sm font-bold text-[#059669] dark:text-[#34D399]">
                Lớp khai giảng phù hợp: {recommendedCohort.code}
              </span>
              <span className="font-mono text-base font-bold text-[#0F172A] dark:text-[#ECFDF5]">
                {formatVnd(recommendedCohort.tuitionVnd)}
              </span>
            </div>

            <div className="text-base font-bold text-[#0F172A] dark:text-[#ECFDF5]">
              {recommendedCourse.title}
            </div>

            <div className="text-xs text-[#475569] dark:text-[#94A3B8]">
              Lịch học: <strong>{formatScheduleSlots(recommendedCohort.scheduleSlots)}</strong> · Khai giảng:{' '}
              <strong className="font-mono">{recommendedCohort.startDate}</strong> · Đã đăng ký:{' '}
              <strong>{recommendedCohort.enrolledCount} bạn học cùng lớp</strong>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => {
                  setRole('STUDENT');
                  navigate(`/checkout/${recommendedCohort.code}`);
                }}
                className="px-5 py-2.5 rounded-lg bg-[#10B981] hover:bg-[#059669] text-white text-xs font-semibold cursor-pointer"
              >
                Đăng ký học lớp {recommendedCohort.code}
              </button>

              <button
                type="button"
                onClick={() => {
                  setRole('STUDENT');
                  navigate('/app');
                }}
                className="px-4 py-2.5 rounded-lg bg-white dark:bg-[#111A15] border border-[#E2ECE7] dark:border-[#1E2D24] hover:border-[#10B981] text-xs font-semibold text-[#0F172A] dark:text-[#ECFDF5] cursor-pointer"
              >
                Vào Góc Học Tập Học Viên →
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
