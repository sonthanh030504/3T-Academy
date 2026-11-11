import React from 'react';
import { useAcademy } from '../context/AcademyContext';

/**
 * Public Top Navbar:
 * Strictly ONLY displayed on public pages (/, /courses, /about, /advisor, /checkout, /verify, /login, /register, /onboarding).
 * NEVER displayed inside /app, /cohorts, /teach, or /admin (which use the Full-height Left Sidebar Layout).
 */
export const TopNavbar: React.FC = () => {
  const { currentPath, navigate, role } = useAcademy();
  const cleanPath = currentPath.split('?')[0] || '/';

  // Hide TopNavbar completely inside Student Workspace (/app, /cohorts), Livestream (/live), Instructor Portal (/teach), and Admin Portal (/admin)
  if (
    cleanPath.startsWith('/app') ||
    cleanPath.startsWith('/cohorts') ||
    cleanPath.startsWith('/live') ||
    cleanPath.startsWith('/teach') ||
    cleanPath.startsWith('/admin')
  ) {
    return null;
  }

  const isActive = (prefix: string) => {
    if (prefix === '/') return cleanPath === '/';
    return cleanPath.startsWith(prefix);
  };

  return (
    <header className="sticky top-0 z-30 bg-[#F7FBF9]/95 dark:bg-[#090F0C]/95 backdrop-blur-md border-b border-[#E2ECE7] dark:border-[#1E2D24]">
      <div className="max-w-[1320px] mx-auto flex items-center justify-between gap-8 px-6 py-4">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="/"
          onClick={(e) => {
            e.preventDefault();
            navigate('/');
          }}
          className="text-lg font-bold tracking-tight text-[#0F172A] dark:text-[#ECFDF5] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-emerald-500 rounded"
        >
          3T Academy
        </a>

        {/* Zone 2: 4 clean single-line text navigation links */}
        <nav
          aria-label="Điều hướng chính"
          className="hidden md:flex items-center gap-7 text-sm font-medium text-[#475569] dark:text-[#94A3B8]"
        >
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              navigate('/');
            }}
            className={`transition-colors whitespace-nowrap shrink-0 py-1 border-b-2 ${
              isActive('/')
                ? 'text-[#0F172A] dark:text-[#ECFDF5] border-[#10B981]'
                : 'border-transparent hover:text-[#0F172A] dark:hover:text-[#ECFDF5]'
            }`}
          >
            Trang chủ
          </a>
          <a
            href="/courses"
            onClick={(e) => {
              e.preventDefault();
              navigate('/courses');
            }}
            className={`transition-colors whitespace-nowrap shrink-0 py-1 border-b-2 ${
              isActive('/courses')
                ? 'text-[#0F172A] dark:text-[#ECFDF5] border-[#10B981]'
                : 'border-transparent hover:text-[#0F172A] dark:hover:text-[#ECFDF5]'
            }`}
          >
            Khóa học
          </a>
          <a
            href="/about"
            onClick={(e) => {
              e.preventDefault();
              navigate('/about');
            }}
            className={`transition-colors whitespace-nowrap shrink-0 py-1 border-b-2 ${
              isActive('/about')
                ? 'text-[#0F172A] dark:text-[#ECFDF5] border-[#10B981]'
                : 'border-transparent hover:text-[#0F172A] dark:hover:text-[#ECFDF5]'
            }`}
          >
            Về Học viện
          </a>
          <a
            href="/advisor"
            onClick={(e) => {
              e.preventDefault();
              navigate('/advisor');
            }}
            className={`transition-colors whitespace-nowrap shrink-0 py-1 border-b-2 ${
              isActive('/advisor')
                ? 'text-[#0F172A] dark:text-[#ECFDF5] border-[#10B981]'
                : 'border-transparent hover:text-[#0F172A] dark:hover:text-[#ECFDF5]'
            }`}
          >
            Tư vấn lộ trình
          </a>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center shrink-0">
          {role === 'GUEST' ? (
            <button
              type="button"
              onClick={() => navigate('/login')}
              className="px-4 py-2 text-xs font-semibold text-white bg-[#10B981] hover:bg-[#059669] rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              Đăng nhập học viên
            </button>
          ) : role === 'INSTRUCTOR' ? (
            <button
              type="button"
              onClick={() => navigate('/teach')}
              className="px-4 py-2 text-xs font-semibold text-white bg-[#10B981] hover:bg-[#059669] rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              Vào Cổng Giảng Dạy
            </button>
          ) : role === 'ADMIN' ? (
            <button
              type="button"
              onClick={() => navigate('/admin')}
              className="px-4 py-2 text-xs font-semibold text-white bg-[#10B981] hover:bg-[#059669] rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              Vào Quản Trị Học Viện
            </button>
          ) : (
            <button
              type="button"
              onClick={() => navigate('/app')}
              className="px-4 py-2 text-xs font-semibold text-white bg-[#10B981] hover:bg-[#059669] rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              Vào Góc Học Tập
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
