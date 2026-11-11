import React, { useState, useRef } from 'react';
import {
  FileText,
  Upload,
  CheckCircle2,
  Edit3,
  Save,
  Mail,
  Phone,
  Globe,
  Plus,
  X,
} from 'lucide-react';
import { useAcademy } from '../context/AcademyContext';
import { profileAndInterviewApi } from '../services/profile-interview.api';

interface ResumeProjectItem {
  id: string;
  name: string;
  period: string;
  role: string;
  bullets: string[];
}

interface ResumeEducationCertItem {
  id: string;
  title: string;
  organization: string;
  periodOrCode: string;
  detail: string;
}

interface StudentResumeData {
  fullName: string;
  headline: string;
  email: string;
  phone: string;
  githubUrl: string;
  linkedinUrl: string;
  careerObjective: string;
  skills: string[];
  projects: ResumeProjectItem[];
  educationAndCerts: ResumeEducationCertItem[];
}

const INITIAL_RESUME_DATA: StudentResumeData = {
  fullName: 'Nguyễn Văn An',
  headline: 'Kỹ Sư Backend Python & Ứng Dụng AI (AI Engineer)',
  email: 'an.nguyen.dev@gmail.com',
  phone: '0908 123 456',
  githubUrl: 'github.com/nguyenvanan-dev',
  linkedinUrl: 'linkedin.com/in/nguyenvanan',
  careerObjective:
    'Kỹ sư Backend Python với 2 năm kinh nghiệm phát triển hệ thống API hiệu năng cao và cơ sở dữ liệu PostgreSQL. Hướng tới vị trí Kỹ sư AI Thực chiến (AI Engineer), tập trung xây dựng các hệ thống tra cứu tài liệu thông minh (RAG), tìm kiếm ngữ nghĩa trên dữ liệu lớn và tự động hóa quy trình nghiệp vụ doanh nghiệp.',
  skills: [
    'Python',
    'FastAPI',
    'PostgreSQL & SQL',
    'RAG & Vector Search (pgvector)',
    'AI Agents',
    'Pandas',
    'Redis',
    'Docker',
    'Git & Linux',
    'Golang',
    'Tiếng Anh TOEIC 800',
  ],
  projects: [
    {
      id: 'proj-1',
      name: 'Hệ thống Trợ lý AI Tra cứu Tài liệu & Quy trình Nội bộ Doanh nghiệp',
      period: '08/2026 – 11/2026',
      role: 'Đồ án Tốt nghiệp Khóa Kỹ Sư AI Thực Chiến (K01) — 3T Academy',
      bullets: [
        'Xây dựng đường ống bóc tách hơn 500 tài liệu PDF/Word nội bộ, bảo toàn cấu trúc bảng biểu tài chính và lưu trữ chỉ mục tìm kiếm trên PostgreSQL (pgvector).',
        'Kết hợp tìm kiếm từ khóa chính xác và tìm kiếm theo ngữ nghĩa kèm bộ lọc phân quyền theo từng phòng ban, đạt độ chính xác trích dẫn trang gốc 92% với thời gian phản hồi dưới 1.2 giây.',
      ],
    },
    {
      id: 'proj-2',
      name: 'Hệ thống Quản lý Đơn hàng & Đối soát Thanh toán Nội bộ (Fintech)',
      period: '06/2025 – 08/2026',
      role: 'Backend Python Developer — Công ty Phần mềm TechViet',
      bullets: [
        'Thiết kế và vận hành 18 RESTful APIs bằng FastAPI & PostgreSQL phục vụ hơn 15.000 giao dịch mỗi ngày.',
        'Tối ưu các câu truy vấn báo cáo doanh thu phức tạp và thiết lập chỉ mục cơ sở dữ liệu, giúp giảm thời gian tải báo cáo từ 1.8 giây xuống 0.4 giây.',
      ],
    },
    {
      id: 'proj-3',
      name: 'Dịch vụ Đồng bộ Dữ liệu Kho vận Thời gian thực',
      period: '08/2024 – 05/2025',
      role: 'Python Developer — Công ty Phần mềm TechViet',
      bullets: [
        'Phát triển hàng đợi xử lý bất đồng bộ bằng Redis Queue và Worker Python, đồng bộ ổn định 50.000 bản ghi tồn kho mỗi ngày giữa các chi nhánh.',
        'Viết bộ kiểm thử tự động (PyTest) đạt độ phủ 85% cho các luồng tạo vận đơn và hoàn trả hàng hóa.',
      ],
    },
  ],
  educationAndCerts: [
    {
      id: 'edu-1',
      title: 'Cử nhân Kỹ thuật Phần mềm — Khoa Công nghệ Thông tin',
      organization: 'Trường Đại học Bách Khoa',
      periodOrCode: '2020 – 2024',
      detail: 'Điểm trung bình tích lũy (GPA): 3.4 / 4.0 · Đồ án tốt nghiệp loại Giỏi',
    },
    {
      id: 'cert-1',
      title: 'Chứng chỉ Tốt nghiệp: Kỹ Sư AI Thực Chiến & Tự Động Hóa Doanh Nghiệp',
      organization: 'Học viện Công nghệ 3T Academy',
      periodOrCode: 'Mã xác thực: CERT-3T-2026-8891',
      detail: 'Điểm tổng kết toàn khóa: 92 / 100 · Hoàn thành 100% bài kiểm tra và đồ án thực tế',
    },
    {
      id: 'cert-2',
      title: 'Chứng chỉ Tiếng Anh Quốc tế TOEIC Listening & Reading',
      organization: 'IIG Việt Nam',
      periodOrCode: 'Điểm số: 800 / 990',
      detail: 'Đọc hiểu thành thạo tài liệu kỹ thuật và giao tiếp tốt trong môi trường công việc',
    },
  ],
};

export const StudentProfileCvWorkspace: React.FC = () => {
  const { latestCvFileName, latestCvUpdatedAt, updateLatestCv } = useAcademy();

  const [resume, setResume] = useState<StudentResumeData>(INITIAL_RESUME_DATA);
  const [isEditing, setIsEditing] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [statusBanner, setStatusBanner] = useState<string | null>(null);
  const [newSkillText, setNewSkillText] = useState('');

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleUploadCvFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setIsUploading(true);
    try {
      const res = await profileAndInterviewApi.uploadAndParseCv(file);
      updateLatestCv(res.fileName || file.name);
      setStatusBanner(
        `Đã đồng bộ thông tin từ file "${res.fileName || file.name}" vào tờ Hồ sơ của bạn.`
      );
      setTimeout(() => setStatusBanner(null), 4000);
    } finally {
      setIsUploading(false);
    }
  };

  const handleAddSkill = () => {
    const trimmed = newSkillText.trim();
    if (!trimmed || resume.skills.includes(trimmed)) return;
    setResume((prev) => ({
      ...prev,
      skills: [...prev.skills, trimmed],
    }));
    setNewSkillText('');
  };

  const handleRemoveSkill = (sk: string) => {
    setResume((prev) => ({
      ...prev,
      skills: prev.skills.filter((item) => item !== sk),
    }));
  };

  return (
    <div className="max-w-4xl mx-auto space-y-5">
      {/* THANH THAO TÁC PHÍA TRÊN (DUY NHẤT 1 NÚT CẬP NHẬT CV + 1 NÚT CHỈNH SỬA THÔNG TIN) */}
      <div className="rounded-xl bg-white dark:bg-[#111A15] border border-[#E2ECE7] dark:border-[#1E2D24] px-5 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-[0_1px_3px_rgba(15,23,42,0.03)]">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-9 h-9 rounded-lg bg-[#D1FAE5] dark:bg-emerald-950/80 flex items-center justify-center text-[#059669] dark:text-[#34D399] shrink-0">
            <FileText className="w-4 h-4" />
          </div>
          <div className="min-w-0">
            <div className="text-xs font-mono font-semibold text-[#0F172A] dark:text-[#ECFDF5] truncate">
              {latestCvFileName} <span className="text-[#475569] dark:text-[#94A3B8]">·</span>{' '}
              <span className="font-sans font-normal text-[#475569] dark:text-[#94A3B8]">
                Cập nhật ngày {latestCvUpdatedAt}
              </span>
            </div>
            <div className="text-[11px] text-[#475569] dark:text-[#94A3B8]">
              Bản hồ sơ năng lực chính thức dùng để xét duyệt tại Phòng Luyện Phỏng Vấn
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 shrink-0">
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={handleUploadCvFile}
            className="hidden"
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#10B981] hover:bg-[#059669] text-white text-xs font-semibold cursor-pointer transition-colors"
          >
            <Upload className="w-3.5 h-3.5" />
            <span>{isUploading ? 'Đang đồng bộ CV...' : 'Tải lên / Cập nhật CV (PDF)'}</span>
          </button>

          <button
            type="button"
            onClick={() => {
              if (isEditing) {
                setStatusBanner('Đã lưu các thay đổi trên Hồ sơ của bạn.');
                setTimeout(() => setStatusBanner(null), 3500);
              }
              setIsEditing((prev) => !prev);
            }}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#F7FBF9] dark:bg-[#090F0C] border border-[#E2ECE7] dark:border-[#1E2D24] hover:border-[#10B981] text-xs font-semibold text-[#0F172A] dark:text-[#ECFDF5] cursor-pointer transition-colors"
          >
            {isEditing ? (
              <>
                <Save className="w-3.5 h-3.5 text-[#10B981]" />
                <span>Lưu thông tin</span>
              </>
            ) : (
              <>
                <Edit3 className="w-3.5 h-3.5 text-[#10B981]" />
                <span>Chỉnh sửa thông tin</span>
              </>
            )}
          </button>
        </div>
      </div>

      {statusBanner && (
        <div className="px-4 py-3 rounded-xl bg-[#D1FAE5] dark:bg-emerald-950/90 border border-[#10B981] text-[#065F46] dark:text-emerald-300 text-xs font-semibold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0" />
          <span>{statusBanner}</span>
        </div>
      )}

      {/* ========================================================================
          TỜ HỒ SƠ CHÍNH (PAPER-STYLE RESUME VIEW — SANG TRỌNG, RÕ RÀNG 4 MỤC)
         ======================================================================== */}
      <article
        aria-label="Hồ sơ năng lực cá nhân"
        className="rounded-2xl bg-white dark:bg-[#111A15] border border-[#E2ECE7] dark:border-[#1E2D24] shadow-[0_4px_24px_rgba(15,23,42,0.04)] p-7 sm:p-11 space-y-8"
      >
        {/* 1. PHẦN ĐẦU (RESUME HEADER & CAREER OBJECTIVE) */}
        <header className="pb-6 border-b border-[#E2ECE7] dark:border-[#1E2D24] space-y-4">
          {isEditing ? (
            <div className="space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-[#475569] dark:text-[#94A3B8] mb-1">
                    Họ và tên
                  </label>
                  <input
                    type="text"
                    value={resume.fullName}
                    onChange={(e) => setResume({ ...resume, fullName: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-[#F7FBF9] dark:bg-[#090F0C] border border-[#E2ECE7] dark:border-[#1E2D24] text-sm font-bold"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-[#475569] dark:text-[#94A3B8] mb-1">
                    Vị trí / Danh hiệu hiện tại
                  </label>
                  <input
                    type="text"
                    value={resume.headline}
                    onChange={(e) => setResume({ ...resume, headline: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-[#F7FBF9] dark:bg-[#090F0C] border border-[#E2ECE7] dark:border-[#1E2D24] text-sm font-semibold"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-[#475569] dark:text-[#94A3B8] mb-1">
                    Email liên hệ
                  </label>
                  <input
                    type="email"
                    value={resume.email}
                    onChange={(e) => setResume({ ...resume, email: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-[#F7FBF9] dark:bg-[#090F0C] border border-[#E2ECE7] dark:border-[#1E2D24] text-xs font-mono"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-[#475569] dark:text-[#94A3B8] mb-1">
                    Số điện thoại
                  </label>
                  <input
                    type="text"
                    value={resume.phone}
                    onChange={(e) => setResume({ ...resume, phone: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-[#F7FBF9] dark:bg-[#090F0C] border border-[#E2ECE7] dark:border-[#1E2D24] text-xs font-mono"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-[#475569] dark:text-[#94A3B8] mb-1">
                    GitHub / LinkedIn
                  </label>
                  <input
                    type="text"
                    value={resume.githubUrl}
                    onChange={(e) => setResume({ ...resume, githubUrl: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-[#F7FBF9] dark:bg-[#090F0C] border border-[#E2ECE7] dark:border-[#1E2D24] text-xs font-mono"
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-2">
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#0F172A] dark:text-[#ECFDF5]">
                {resume.fullName}
              </h1>
              <p className="text-sm sm:text-base font-semibold text-[#059669] dark:text-[#34D399]">
                {resume.headline}
              </p>

              <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 pt-1 text-xs text-[#475569] dark:text-[#94A3B8]">
                <span className="inline-flex items-center gap-1.5 font-mono">
                  <Mail className="w-3.5 h-3.5 text-[#10B981]" />
                  <span>{resume.email}</span>
                </span>
                <span aria-hidden="true">·</span>
                <span className="inline-flex items-center gap-1.5 font-mono">
                  <Phone className="w-3.5 h-3.5 text-[#10B981]" />
                  <span>{resume.phone}</span>
                </span>
                <span aria-hidden="true">·</span>
                <span className="inline-flex items-center gap-1.5 font-mono">
                  <Globe className="w-3.5 h-3.5 text-[#10B981]" />
                  <span>{resume.githubUrl}</span>
                </span>
                <span aria-hidden="true">·</span>
                <span className="font-mono">{resume.linkedinUrl}</span>
              </div>
            </div>
          )}

          {/* Mục tiêu nghề nghiệp (Career Objective) */}
          <div className="pt-2 space-y-1.5">
            <div className="text-[11px] font-bold uppercase tracking-wider text-[#475569] dark:text-[#94A3B8]">
              Mục tiêu nghề nghiệp
            </div>
            {isEditing ? (
              <textarea
                rows={3}
                value={resume.careerObjective}
                onChange={(e) => setResume({ ...resume, careerObjective: e.target.value })}
                className="w-full p-3 rounded-lg bg-[#F7FBF9] dark:bg-[#090F0C] border border-[#E2ECE7] dark:border-[#1E2D24] text-xs sm:text-sm leading-relaxed"
              />
            ) : (
              <p className="text-xs sm:text-sm text-[#0F172A] dark:text-[#ECFDF5] leading-relaxed">
                {resume.careerObjective}
              </p>
            )}
          </div>
        </header>

        {/* 2. MỤC KỸ NĂNG & CÔNG NGHỆ (SKILLS) */}
        <section className="space-y-3">
          <div className="flex items-center justify-between border-b border-[#E2ECE7] dark:border-[#1E2D24] pb-2">
            <h2 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#059669] dark:text-[#34D399]">
              Kỹ năng &amp; Công nghệ
            </h2>
            <span className="text-[11px] text-[#475569] dark:text-[#94A3B8]">
              Trích xuất từ CV của bạn ({resume.skills.length} kỹ năng)
            </span>
          </div>

          <div className="flex flex-wrap gap-2">
            {resume.skills.map((skill) => (
              <span
                key={skill}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#F7FBF9] dark:bg-[#090F0C] border border-[#E2ECE7] dark:border-[#1E2D24] text-xs font-semibold text-[#0F172A] dark:text-[#ECFDF5]"
              >
                <span>{skill}</span>
                {isEditing && (
                  <button
                    type="button"
                    onClick={() => handleRemoveSkill(skill)}
                    aria-label={`Xóa kỹ năng ${skill}`}
                    className="text-[#475569] hover:text-[#EF4444] cursor-pointer"
                  >
                    <X className="w-3 h-3" />
                  </button>
                )}
              </span>
            ))}
          </div>

          {isEditing && (
            <div className="flex items-center gap-2 pt-1 max-w-md">
              <input
                type="text"
                value={newSkillText}
                onChange={(e) => setNewSkillText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddSkill();
                  }
                }}
                placeholder="Thêm kỹ năng mới (VD: Kubernetes, LangGraph)..."
                className="flex-1 px-3 py-1.5 rounded-lg bg-[#F7FBF9] dark:bg-[#090F0C] border border-[#E2ECE7] dark:border-[#1E2D24] text-xs"
              />
              <button
                type="button"
                onClick={handleAddSkill}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#10B981] text-white text-xs font-semibold cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Thêm</span>
              </button>
            </div>
          )}
        </section>

        {/* 3. MỤC KINH NGHIỆM & DỰ ÁN ĐÃ THỰC HIỆN (PROJECTS & EXPERIENCE) */}
        <section className="space-y-5">
          <div className="border-b border-[#E2ECE7] dark:border-[#1E2D24] pb-2">
            <h2 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#059669] dark:text-[#34D399]">
              Kinh nghiệm &amp; Dự án đã thực hiện
            </h2>
          </div>

          <div className="space-y-6">
            {resume.projects.map((proj, pIdx) => (
              <div key={proj.id} className="space-y-2">
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                  {isEditing ? (
                    <input
                      type="text"
                      value={proj.name}
                      onChange={(e) => {
                        const updated = [...resume.projects];
                        updated[pIdx] = { ...proj, name: e.target.value };
                        setResume({ ...resume, projects: updated });
                      }}
                      className="flex-1 px-2.5 py-1 rounded bg-[#F7FBF9] dark:bg-[#090F0C] border border-[#E2ECE7] dark:border-[#1E2D24] text-sm font-bold"
                    />
                  ) : (
                    <h3 className="text-sm sm:text-base font-bold text-[#0F172A] dark:text-[#ECFDF5]">
                      {proj.name}
                    </h3>
                  )}
                  <span className="font-mono text-xs font-semibold text-[#475569] dark:text-[#94A3B8] shrink-0">
                    {proj.period}
                  </span>
                </div>

                <div className="text-xs font-semibold text-[#059669] dark:text-[#34D399]">
                  {proj.role}
                </div>

                {isEditing ? (
                  <div className="space-y-2 pt-1">
                    {proj.bullets.map((b, bIdx) => (
                      <textarea
                        key={bIdx}
                        rows={2}
                        value={b}
                        onChange={(e) => {
                          const updatedProjects = [...resume.projects];
                          const updatedBullets = [...proj.bullets];
                          updatedBullets[bIdx] = e.target.value;
                          updatedProjects[pIdx] = { ...proj, bullets: updatedBullets };
                          setResume({ ...resume, projects: updatedProjects });
                        }}
                        className="w-full p-2.5 rounded-lg bg-[#F7FBF9] dark:bg-[#090F0C] border border-[#E2ECE7] dark:border-[#1E2D24] text-xs"
                      />
                    ))}
                  </div>
                ) : (
                  <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm text-[#475569] dark:text-[#94A3B8] leading-relaxed">
                    {proj.bullets.map((b, bIdx) => (
                      <li key={bIdx} className="text-[#0F172A]/90 dark:text-[#ECFDF5]/90">
                        {b}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* 4. MỤC HỌC VẤN & CHỨNG CHỈ (EDUCATION & CERTIFICATIONS) */}
        <section className="space-y-4">
          <div className="border-b border-[#E2ECE7] dark:border-[#1E2D24] pb-2">
            <h2 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#059669] dark:text-[#34D399]">
              Học vấn &amp; Chứng chỉ
            </h2>
          </div>

          <div className="space-y-4">
            {resume.educationAndCerts.map((item) => (
              <div
                key={item.id}
                className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2"
              >
                <div className="space-y-0.5">
                  <h3 className="text-sm font-bold text-[#0F172A] dark:text-[#ECFDF5]">
                    {item.title}
                  </h3>
                  <div className="text-xs text-[#475569] dark:text-[#94A3B8]">
                    <span className="font-semibold text-[#0F172A] dark:text-[#ECFDF5]">
                      {item.organization}
                    </span>{' '}
                    · {item.detail}
                  </div>
                </div>
                <span className="font-mono text-xs font-semibold text-[#059669] dark:text-[#34D399] shrink-0">
                  {item.periodOrCode}
                </span>
              </div>
            ))}
          </div>
        </section>
      </article>
    </div>
  );
};
