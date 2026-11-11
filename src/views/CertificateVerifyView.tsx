import React, { useState } from 'react';
import {
  ShieldCheck,
  ShieldAlert,
  Search,
  CheckCircle2,
  QrCode,
  RotateCcw,
} from 'lucide-react';
import { useAcademy } from '../context/AcademyContext';
import { CompetencyVerifiedShield } from '../components/BotanicalStickers';

export const CertificateVerifyView: React.FC<{ certificateCode: string }> = ({
  certificateCode,
}) => {
  const { certificates, toggleCertificateRevoke, navigate } = useAcademy();
  const [lookupInput, setLookupInput] = useState(certificateCode || 'CERT-3T-2026-8891');

  const cert =
    certificates[certificateCode] ?? certificates['CERT-3T-2026-8891'];

  const handleLookupSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!lookupInput.trim()) return;
    navigate(`/verify/${lookupInput.trim()}`);
  };

  return (
    <div className="max-w-[980px] mx-auto px-6 py-10 space-y-8">
      {/* Header & Search Bar */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="space-y-1.5">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#0F172A] dark:text-[#ECFDF5]">
            Cổng Tra Cứu Chứng Chỉ Tốt Nghiệp Trực Tuyến
          </h1>
          <p className="text-xs sm:text-sm text-[#475569] dark:text-[#94A3B8]">
            Tra cứu nhanh thông tin tốt nghiệp, điểm dự án cuối khóa và kỹ năng thực tế của học viên 3T Academy.
          </p>
        </div>

        <form onSubmit={handleLookupSubmit} className="flex items-center gap-2">
          <input
            type="text"
            aria-label="Mã chứng chỉ cần tra cứu"
            value={lookupInput}
            onChange={(e) => setLookupInput(e.target.value)}
            placeholder="Nhập mã (VD: CERT-3T-2026-8891)"
            className="px-3.5 py-2 rounded-lg bg-white dark:bg-[#111A15] border border-[#E2ECE7] dark:border-[#1E2D24] font-mono text-xs text-[#0F172A] dark:text-[#ECFDF5]"
          />
          <button
            type="submit"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#10B981] hover:bg-[#059669] text-white text-xs font-semibold cursor-pointer whitespace-nowrap"
          >
            <Search className="w-3.5 h-3.5" />
            <span>Tra cứu</span>
          </button>
        </form>
      </div>

      {/* Main Certificate Card */}
      <div
        className={`rounded-xl bg-white dark:bg-[#111A15] border-2 p-6 sm:p-8 space-y-6 ${
          cert.isRevoked ? 'border-[#EF4444]' : 'border-[#10B981]'
        }`}
      >
        {/* Status Banner */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E2ECE7] dark:border-[#1E2D24]">
          <div className="flex items-center gap-3.5">
            {cert.isRevoked ? (
              <div className="p-3 rounded-xl bg-red-500/10 text-[#EF4444]">
                <ShieldAlert className="w-8 h-8" />
              </div>
            ) : (
              <CompetencyVerifiedShield className="w-14 h-14 shrink-0" />
            )}

            <div className="space-y-1">
              {cert.isRevoked ? (
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-red-500/10 text-[#EF4444] font-mono text-xs font-bold">
                  CHỨNG CHỈ ĐÃ BỊ THU HỒI (REVOKED)
                </div>
              ) : (
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#D1FAE5] dark:bg-emerald-950 text-[#065F46] dark:text-emerald-300 font-mono text-xs font-bold">
                  <ShieldCheck className="w-4 h-4 text-[#10B981]" />
                  <span>CHỨNG CHỈ TỐT NGHIỆP HỢP LỆ · CHÍNH CHỦ</span>
                </div>
              )}
              <div className="font-mono text-sm font-bold text-[#0F172A] dark:text-[#ECFDF5]">
                Mã định danh: {cert.certificateCode}
              </div>
            </div>
          </div>

          {/* Demo Toggle Revoke Status Button */}
          <button
            type="button"
            onClick={() => toggleCertificateRevoke(cert.certificateCode)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#F7FBF9] dark:bg-[#090F0C] border border-[#E2ECE7] dark:border-[#1E2D24] hover:border-[#10B981] text-xs font-semibold text-[#0F172A] dark:text-[#ECFDF5] cursor-pointer whitespace-nowrap self-start sm:self-auto"
          >
            <RotateCcw className="w-3.5 h-3.5 text-[#10B981]" />
            <span>
              {cert.isRevoked
                ? 'Khôi phục trạng thái Hợp lệ (Demo)'
                : 'Giả lập Thu hồi Chứng chỉ (Demo Revoke)'}
            </span>
          </button>
        </div>

        {cert.isRevoked && cert.revokedReason && (
          <div className="rounded-lg bg-red-500/10 border border-[#EF4444]/40 p-4 text-xs text-[#EF4444] font-medium">
            Lý do thu hồi: {cert.revokedReason}
          </div>
        )}

        {/* Graduate Details & QR Preview */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-8 space-y-5">
            <div className="space-y-1">
              <div className="text-xs text-[#475569] dark:text-[#94A3B8]">
                Cấp cho Kỹ sư / Học viên tốt nghiệp:
              </div>
              <div className="text-2xl font-bold text-[#0F172A] dark:text-[#ECFDF5]">
                {cert.studentName}
              </div>
              <div className="text-xs font-mono text-[#475569] dark:text-[#94A3B8]">
                {cert.studentEmail}
              </div>
            </div>

            <div className="space-y-1">
              <div className="text-xs text-[#475569] dark:text-[#94A3B8]">
                Hoàn thành xuất sắc chương trình đào tạo:
              </div>
              <div className="text-base font-bold text-[#059669] dark:text-[#34D399]">
                {cert.courseTitle}
              </div>
              <div className="text-xs font-mono text-[#0F172A] dark:text-[#ECFDF5]">
                Đợt học: {cert.cohortCode} · Ngày cấp: {cert.issuedAt}
              </div>
            </div>

            {/* Skill Mastery Breakdown */}
            <div className="space-y-3 pt-2">
              <div className="text-xs font-bold text-[#0F172A] dark:text-[#ECFDF5]">
                Bảng Phân Tích Năng Lực Chuyên Môn Đã Xác Thực (Skill Mastery Breakdown):
              </div>
              <div className="space-y-2.5">
                {cert.skillsMastered.map((sk) => (
                  <div
                    key={sk.code}
                    className="p-3 rounded-lg bg-[#F7FBF9] dark:bg-[#090F0C] border border-[#E2ECE7] dark:border-[#1E2D24] space-y-1.5"
                  >
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-[#0F172A] dark:text-[#ECFDF5]">
                        {sk.name}{' '}
                        <span className="font-mono text-[#475569] dark:text-[#94A3B8]">
                          ({sk.code})
                        </span>
                      </span>
                      <span className="font-mono font-bold text-[#059669] dark:text-[#34D399]">
                        {sk.score}/100
                      </span>
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                      <div
                        className="h-full bg-[#10B981] rounded-full"
                        style={{ width: `${sk.score}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right 4 cols: Cryptographic Proof & QR Preview */}
          <div className="lg:col-span-4 rounded-xl bg-[#F7FBF9] dark:bg-[#090F0C] border border-[#E2ECE7] dark:border-[#1E2D24] p-5 space-y-4 text-xs">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-[#0F172A] dark:text-[#ECFDF5]">
                Điểm Tổng Kết Cuối Khóa
              </span>
              <span className="text-xl font-mono font-bold text-[#10B981]">
                {cert.finalScore}/100
              </span>
            </div>

            <div className="space-y-1 pt-2 border-t border-[#E2ECE7] dark:border-[#1E2D24]">
              <div className="text-[11px] text-[#475569] dark:text-[#94A3B8]">
                Trạng thái Giám sát Thi (AI Proctoring):
              </div>
              <div className="flex items-start gap-1.5 font-medium text-[#0F172A] dark:text-[#ECFDF5]">
                <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0 mt-0.5" />
                <span>{cert.proctoringIntegrity}</span>
              </div>
            </div>

            {/* QR Code Verification Preview */}
            <div className="pt-3 border-t border-[#E2ECE7] dark:border-[#1E2D24] flex flex-col items-center text-center space-y-2">
              <div className="p-3 bg-white rounded-lg border border-slate-200">
                <QrCode className="w-24 h-24 text-[#0F172A]" />
              </div>
              <span className="text-[11px] text-[#475569] dark:text-[#94A3B8]">
                Quét mã QR để kiểm tra trực tuyến hồ sơ gốc
              </span>
            </div>

            <div className="pt-3 border-t border-[#E2ECE7] dark:border-[#1E2D24] space-y-1">
              <div className="text-[11px] text-[#475569] dark:text-[#94A3B8]">
                Mã xác nhận hồ sơ tốt nghiệp:
              </div>
              <div className="font-mono text-[10px] break-all p-2 rounded bg-white dark:bg-[#111A15] border border-[#E2ECE7] dark:border-[#1E2D24] text-[#059669] dark:text-[#34D399]">
                {cert.verificationSignature}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
