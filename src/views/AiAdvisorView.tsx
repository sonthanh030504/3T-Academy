import React, { useState } from 'react';
import { Send, Calendar, Clock, Users, ArrowRight, RotateCcw } from 'lucide-react';
import { useAcademy } from '../context/AcademyContext';
import { formatVnd, formatScheduleSlots } from '../utils/academyLogic';
import {
  AiTutorCompanionSticker,
  AvatarWithFallback,
} from '../components/BotanicalStickers';

interface AdvisorChatTurn {
  id: string;
  sender: 'USER' | 'AI';
  text: string;
  recommendedCohortCodes?: string[];
  timestamp: string;
}

const QUICK_PROMPTS = [
  'Mình biết Python cơ bản, muốn chuyển sang AI Engineer trong 4 tháng thì học đợt nào?',
  'Mình chỉ rảnh tối Thứ 4 & Chủ Nhật thì có đợt học Data hoặc AI nào không bị trùng lịch?',
  'So sánh giúp mình đợt AI-ENG-2026-K01 và khóa Kỹ thuật Hệ thống Phân tán SWE-CLOUD-2026-K01?',
];

export const AiAdvisorView: React.FC = () => {
  const { cohorts, courses, navigate } = useAcademy();
  const [input, setInput] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const [messages, setMessages] = useState<AdvisorChatTurn[]>([
    {
      id: 'welcome-ai',
      sender: 'AI',
      text: 'Chào bạn! Mình là Trợ lý tư vấn lộ trình học của 3T Academy. Bạn đang làm việc ở vị trí nào và mong muốn làm chủ nhóm kỹ năng thực tế nào (Kỹ sư AI ứng dụng, Lập trình Hệ thống Backend & Cloud hay Phân tích Dữ liệu)?',
      recommendedCohortCodes: ['AI-ENG-2026-K01', 'PY-SQL-2026-K04'],
      timestamp: 'Vừa xong',
    },
  ]);

  const generateAdvisorReply = (promptText: string) => {
    const userTurn: AdvisorChatTurn = {
      id: `u-${Date.now()}`,
      sender: 'USER',
      text: promptText,
      timestamp: 'Vừa xong',
    };
    setMessages((prev) => [...prev, userTurn]);
    setInput('');
    setIsStreaming(true);

    setTimeout(() => {
      const lower = promptText.toLowerCase();
      let replyText =
        'Dựa trên nền tảng Python cơ bản và mục tiêu chuyển sang vị trí Kỹ sư AI trong 4 tháng, lộ trình phù hợp nhất cho bạn là tham gia ngay lớp **AI-ENG-2026-K01** (Khai giảng 17/11/2026, học tối Thứ 3 & Thứ 7). Trong 4 buổi đầu, TS. Trần Minh Khoa và Trợ giảng Đặng Hoàng Nam sẽ hướng dẫn bạn cách chuẩn bị dữ liệu và tra cứu tài liệu thông minh trước khi tự tay xây dựng ứng dụng Trợ lý AI hoàn chỉnh nhé.';
      let recommendedCodes = ['AI-ENG-2026-K01', 'AI-ENG-2026-K02'];

      if (lower.includes('thứ 4') || lower.includes('chủ nhật') || lower.includes('data')) {
        replyText =
          'Nếu bạn ưu tiên lịch học tối Thứ 4 & Chủ Nhật hoặc cuối tuần, mình gợi ý hai lớp khai giảng khớp hoàn toàn với khung giờ của bạn mà không lo trùng lịch: **DATA-AE-2026-K01** (Phân tích dữ liệu thực chiến với SQL & Python — học tối Thứ 4 & Chủ Nhật) và **AI-ENG-2026-K02** (học tối Thứ 5 & Chủ Nhật).';
        recommendedCodes = ['DATA-AE-2026-K01', 'AI-ENG-2026-K02'];
      } else if (lower.includes('so sánh') || lower.includes('swe-cloud')) {
        replyText =
          'Lớp **AI-ENG-2026-K01** tập trung vào việc xây dựng ứng dụng Trợ lý AI tra cứu tài liệu nội bộ và trả lời chính xác cho doanh nghiệp, trong khi **SWE-CLOUD-2026-K01** đi sâu vào thiết kế hệ thống Backend chịu tải cao, thanh toán tự động qua mã QR và vận hành trên đám mây. Bạn có thể xem chi tiết cả 2 lớp bên dưới nhé:';
        recommendedCodes = ['AI-ENG-2026-K01', 'SWE-CLOUD-2026-K01'];
      }

      const aiTurn: AdvisorChatTurn = {
        id: `ai-${Date.now()}`,
        sender: 'AI',
        text: replyText,
        recommendedCohortCodes: recommendedCodes,
        timestamp: 'Phản hồi tức thời',
      };
      setMessages((prev) => [...prev, aiTurn]);
      setIsStreaming(false);
    }, 180);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    generateAdvisorReply(input.trim());
  };

  return (
    <div className="max-w-[1040px] mx-auto px-6 py-10 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-xl bg-white dark:bg-[#111A15] border border-[#E2ECE7] dark:border-[#1E2D24] p-5">
        <div className="flex items-center gap-3.5">
          <AiTutorCompanionSticker className="w-12 h-12 shrink-0" />
          <div>
            <h1 className="text-xl font-bold text-[#0F172A] dark:text-[#ECFDF5]">
              Trợ Lý AI Tư Vấn Chọn Lớp &amp; Lộ Trình Học Phù Hợp
            </h1>
            <p className="text-xs text-[#475569] dark:text-[#94A3B8]">
              Mình giúp bạn chọn lớp có lịch học buổi tối vừa vặn, đúng trình độ hiện tại và mục tiêu công việc của bạn nhé.
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={() =>
            setMessages([
              {
                id: 'reset-ai',
                sender: 'AI',
                text: 'Phiên tư vấn đã được làm mới. Hãy chọn một câu hỏi gợi ý bên dưới hoặc nhập mục tiêu nghề nghiệp của bạn nhé!',
                recommendedCohortCodes: ['AI-ENG-2026-K01'],
                timestamp: 'Vừa xong',
              },
            ])
          }
          className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-[#E2ECE7] dark:border-[#1E2D24] text-xs font-medium text-[#475569] dark:text-[#94A3B8] hover:text-[#0F172A] dark:hover:text-white cursor-pointer whitespace-nowrap self-start sm:self-auto"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Làm mới hội thoại</span>
        </button>
      </div>

      {/* Quick Prompt Chips */}
      <div className="space-y-2">
        <div className="text-xs font-semibold text-[#475569] dark:text-[#94A3B8]">
          Câu hỏi phổ biến từ học viên (Nhấn để hỏi nhanh):
        </div>
        <div className="flex flex-wrap gap-2">
          {QUICK_PROMPTS.map((prompt) => (
            <button
              key={prompt}
              type="button"
              onClick={() => generateAdvisorReply(prompt)}
              className="text-left px-3.5 py-2 rounded-lg bg-white dark:bg-[#111A15] border border-[#E2ECE7] dark:border-[#1E2D24] hover:border-[#10B981] text-xs font-medium text-[#0F172A] dark:text-[#ECFDF5] transition-colors cursor-pointer"
            >
              “{prompt}”
            </button>
          ))}
        </div>
      </div>

      {/* Conversation Thread */}
      <div className="rounded-xl bg-white dark:bg-[#111A15] border border-[#E2ECE7] dark:border-[#1E2D24] p-6 space-y-6">
        <div className="space-y-6 max-h-[540px] overflow-y-auto pr-1">
          {messages.map((msg) => {
            const isAi = msg.sender === 'AI';
            const recCohorts = (msg.recommendedCohortCodes ?? [])
              .map((code) => cohorts.find((c) => c.code === code))
              .filter((c): c is NonNullable<typeof c> => Boolean(c));

            return (
              <div
                key={msg.id}
                className={`flex gap-3.5 ${isAi ? 'items-start' : 'items-start justify-end'}`}
              >
                {isAi && <AiTutorCompanionSticker className="w-9 h-9 shrink-0 mt-0.5" />}

                <div
                  className={`max-w-2xl rounded-xl p-4 space-y-4 ${
                    isAi
                      ? 'bg-[#F7FBF9] dark:bg-[#090F0C] border border-[#E2ECE7] dark:border-[#1E2D24] text-[#0F172A] dark:text-[#ECFDF5]'
                      : 'bg-[#10B981] text-white'
                  }`}
                >
                  <div className="flex items-center justify-between gap-4 text-[11px] opacity-80">
                    <span className="font-semibold">
                      {isAi ? 'Trợ Lý AI Tuyển Sinh 3T Academy' : 'Bạn (Học viên tìm hiểu)'}
                    </span>
                    <span className="font-mono">{msg.timestamp}</span>
                  </div>

                  <p className="text-xs sm:text-sm leading-relaxed">{msg.text}</p>

                  {/* Interactive Embedded Cohort Cards inside AI reply */}
                  {isAi && recCohorts.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                      {recCohorts.map((ch) => {
                        const course = courses.find((cr) => cr.id === ch.courseId);
                        return (
                          <div
                            key={ch.id}
                            className="rounded-lg bg-white dark:bg-[#111A15] border border-[#E2ECE7] dark:border-[#1E2D24] p-3.5 flex flex-col justify-between space-y-3"
                          >
                            <div className="space-y-1.5">
                              <div className="flex items-center justify-between text-[11px]">
                                <span className="font-mono font-bold text-[#059669] dark:text-[#34D399]">
                                  {ch.code}
                                </span>
                                <span className="text-[#475569] dark:text-[#94A3B8]">
                                  Phiên bản {ch.curriculumVersion}
                                </span>
                              </div>
                              <div className="text-xs font-bold text-[#0F172A] dark:text-[#ECFDF5] line-clamp-2">
                                {course?.title ?? ch.name}
                              </div>
                              <div className="space-y-1 text-[11px] text-[#475569] dark:text-[#94A3B8] pt-1">
                                <div className="flex items-center gap-1.5">
                                  <Calendar className="w-3 h-3 text-[#10B981]" />
                                  <span>Khai giảng: {ch.startDate}</span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                  <Clock className="w-3 h-3 text-[#10B981]" />
                                  <span>{formatScheduleSlots(ch.scheduleSlots)}</span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                  <Users className="w-3 h-3 text-[#10B981]" />
                                  <span>Đã ghi danh: {ch.enrolledCount} học viên</span>
                                </div>
                              </div>

                              {/* Instructor miniature */}
                              {ch.staff[0] && (
                                <div className="flex items-center gap-2 pt-1.5 border-t border-[#E2ECE7] dark:border-[#1E2D24]">
                                  <AvatarWithFallback
                                    src={ch.staff[0].avatarUrl}
                                    name={ch.staff[0].fullName}
                                    className="w-5 h-5 rounded-full"
                                  />
                                  <span className="text-[11px] text-[#0F172A] dark:text-[#ECFDF5] truncate">
                                    GV: {ch.staff[0].fullName}
                                  </span>
                                </div>
                              )}
                            </div>

                            <div className="pt-2.5 border-t border-[#E2ECE7] dark:border-[#1E2D24] flex items-center justify-between gap-2">
                              <span className="font-mono text-xs font-bold text-[#0F172A] dark:text-[#ECFDF5]">
                                {formatVnd(ch.tuitionVnd)}
                              </span>
                              <button
                                type="button"
                                onClick={() => navigate(`/checkout/${ch.code}`)}
                                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-md bg-[#10B981] hover:bg-[#059669] text-white text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap"
                              >
                                <span>Ghi danh ngay</span>
                                <ArrowRight className="w-3 h-3" />
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            );
          })}

          {isStreaming && (
            <div className="flex items-center gap-3 text-xs text-[#059669] dark:text-[#34D399] font-medium">
              <AiTutorCompanionSticker className="w-7 h-7 animate-pulse" />
              <span>AI Advisor đang đối chiếu lịch khai giảng và chương trình học...</span>
            </div>
          )}
        </div>

        {/* Input Form */}
        <form
          onSubmit={handleSubmit}
          className="pt-4 border-t border-[#E2ECE7] dark:border-[#1E2D24] flex gap-2.5"
        >
          <input
            type="text"
            aria-label="Nhập câu hỏi tư vấn lộ trình học"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Nhập mục tiêu của bạn (VD: Mình biết SQL và Python cơ bản, muốn học RAG thực chiến)..."
            className="flex-1 px-4 py-2.5 rounded-lg bg-[#F7FBF9] dark:bg-[#090F0C] border border-[#E2ECE7] dark:border-[#1E2D24] text-xs sm:text-sm text-[#0F172A] dark:text-[#ECFDF5] focus:outline-2 focus:outline-emerald-500"
          />
          <button
            type="submit"
            className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-lg bg-[#10B981] hover:bg-[#059669] text-white text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Gửi câu hỏi</span>
          </button>
        </form>
      </div>
    </div>
  );
};
