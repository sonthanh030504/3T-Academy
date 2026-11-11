import {
  Course,
  Cohort,
  ClassSession,
  UpcomingTaskItem,
  DiscussionThread,
  CohortMaterial,
  CertificateRecord,
  OrderReceipt,
  UserProfileRecord,
  StudentSkillStateRecord,
  PaymentTransactionRecord,
  AssessmentRecord,
  MockInterviewRecord,
  Enrollment,
  ChatMessage,
  Notification,
} from '../types/domain';

export const AVATAR_MINH_KHOA = '/src/assets/images/instructor_minh_khoa_1794209569290.jpg';
export const AVATAR_THU_HA = '/src/assets/images/instructor_thu_ha_1794209570725.jpg';
export const AVATAR_HOANG_NAM = '/src/assets/images/ta_hoang_nam_1794209570869.jpg';

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export const ACADEMY_FAQS: FaqItem[] = [
  {
    id: 'faq-1',
    question: '1. Mình đi làm bận rộn, nếu hôm đó kẹt việc không vào học trực tiếp được thì sao?',
    answer:
      'Bạn yên tâm nhé, ngay sau mỗi buổi học hệ thống đều có sẵn bản ghi video nét cao kèm bản tóm tắt các ý chính và phụ đề đầy đủ để bạn xem lại bất cứ lúc nào rảnh.',
  },
  {
    id: 'faq-2',
    question: '2. Lúc tự học hoặc làm bài tập ở nhà mà bí quá thì hỏi ai?',
    answer:
      'Bạn có thể hỏi ngay Trợ giảng AI 24/7 để được chỉ tới đúng phút, đúng giây trong video bài giảng và trang tài liệu liên quan, hoặc để lại câu hỏi ngay tại mốc thời gian đó để Giảng viên phụ trách lớp vào giải đáp tận tình cho bạn nhé.',
  },
  {
    id: 'faq-3',
    question: '3. Mình chưa biết bắt đầu từ khóa nào cho hợp với nền tảng hiện tại?',
    answer:
      'Bạn chỉ cần bấm vào mục "Tư vấn lộ trình" trên thanh menu, chia sẻ mục tiêu công việc hiện tại của bạn, trợ lý thông minh sẽ gợi ý đúng lộ trình và lớp sắp mở vừa sức nhất với bạn.',
  },
  {
    id: 'faq-4',
    question: '4. Đóng học phí xong thì bao lâu mình được vào lớp?',
    answer:
      'Chỉ mất đúng 3 giây sau khi bạn quét mã QR chuyển khoản ngân hàng là hệ thống tự động mở khóa không gian lớp học, lịch học và toàn bộ kho tài liệu cho bạn ngay lập tức.',
  },
  {
    id: 'faq-5',
    question: '5. Làm sao để nhận được Chứng chỉ tốt nghiệp của Học viện?',
    answer:
      'Bạn chỉ cần hoàn thành các bài tập ngắn sau mỗi buổi học và vượt qua bài thi cuối khóa là sẽ nhận được Chứng chỉ tốt nghiệp có mã QR tra cứu công khai để tự tin đính kèm vào hồ sơ ứng tuyển nhé.',
  },
  {
    id: 'faq-6',
    question: '6. Trong quá trình học nếu mình vào lớp muộn 10–15 phút thì có theo kịp bài giảng không?',
    answer:
      'Hoàn toàn kịp bạn nhé! Ngay trong phòng học trực tuyến luôn có nút tóm tắt nhanh: chỉ cần bấm 1 chạm, Trợ lý thông minh sẽ tổng hợp gọn gàng những ý chính thầy vừa giảng trong 10–15 phút trước đó để bạn bắt nhịp cùng cả lớp ngay lập tức.',
  },
];

export const WHY_3T_DIFFERENT_ITEMS = [
  {
    number: '01',
    title: 'Học trực tiếp có lộ trình, không sợ bỏ cuộc giữa chừng',
    description:
      'Bạn học theo lớp khai giảng cố định cùng Giảng viên chính và bạn cùng lớp, có lịch học rõ ràng chứ không phải tự bơi một mình với đống video khô khan.',
  },
  {
    number: '02',
    title: 'Vào lớp muộn 15 phút? Bấm 1 nút là nắm bắt ngay bài giảng',
    description:
      'Trong giờ học trực tuyến, nếu bạn bận vào trễ, Trợ lý thông minh trong phòng học sẽ tóm tắt gọn gàng những ý chính thầy vừa giảng trong 10 phút qua để bạn bắt kịp cả lớp ngay lập tức.',
  },
  {
    number: '03',
    title: 'Hỏi bài lúc 12h đêm, được chỉ tận tay tới từng giây video',
    description:
      'Khi xem lại bài giảng mà gặp đoạn khó hiểu, bạn chỉ cần đặt câu hỏi. Trợ giảng AI sẽ giải thích cặn kẽ và đính kèm nút bấm nhảy tới đúng phút, đúng giây trong video và đúng trang tài liệu mà thầy đã giảng về phần đó.',
  },
  {
    number: '04',
    title: 'Làm bài tập được chấm chữa chi tiết và chỉ đúng chỗ cần ôn lại',
    description:
      'Sau mỗi buổi học, bạn làm bài kiểm tra ngắn để nắm chắc kiến thức; câu nào làm sai sẽ được chỉ dẫn xem lại đúng đoạn bài giảng tương ứng mà không phải mò mẫm từ đầu.',
  },
];

export const INITIAL_COURSES: Course[] = [
  {
    id: 'course-ai-rag',
    slug: 'ai-engineer-hybrid-rag',
    title: 'Kỹ Sư AI Thực Chiến: Xây Dựng Trợ Lý Tri Thức & Ứng Dụng AI Doanh Nghiệp',
    shortDescription:
      'Tự tay xây dựng hệ thống tìm kiếm thông minh, kết nối cơ sở dữ liệu nội bộ và phát triển Trợ lý AI trả lời chính xác kèm trích dẫn tài liệu gốc.',
    descriptionMd:
      'Chương trình đào tạo 12 buổi học trực tiếp cùng chuyên gia, giúp bạn đi từ nền tảng lập trình Python sang tự tay xây dựng được sản phẩm Trợ lý AI hoàn chỉnh cho doanh nghiệp. Bạn sẽ được hướng dẫn từng bước cách xử lý tài liệu PDF/Word dài hàng trăm trang, thiết kế bộ máy tìm kiếm kết hợp ngữ nghĩa và từ khóa, kiểm soát chất lượng câu trả lời và tối ưu tốc độ phản hồi thực tế.',
    category: 'AI & Dữ liệu',
    difficultyLevel: 4,
    skills: [
      { type: 'PREREQUISITE', code: 'PY-CORE', name: 'Python' },
      { type: 'PREREQUISITE', code: 'SQL-BASE', name: 'SQL' },
      { type: 'LEARNING_OUTCOME', code: 'VEC-DB', name: 'Cơ sở dữ liệu Vector' },
      { type: 'LEARNING_OUTCOME', code: 'HYBRID-RAG', name: 'RAG' },
      { type: 'LEARNING_OUTCOME', code: 'AI-AGENT', name: 'Xây dựng Trợ lý AI' },
      { type: 'LEARNING_OUTCOME', code: 'AI-EVAL', name: 'Kiểm thử chất lượng AI' },
    ],
    syllabusTemplate: [
      {
        order: 1,
        title: 'Tổng quan ứng dụng AI trong doanh nghiệp & Cách giúp AI trả lời đúng sự thật',
        summary: 'Hiểu rõ nguyên nhân AI trả lời sai lệch và cách buộc hệ thống luôn trích dẫn nguồn tài liệu gốc.',
        activityTags: ['THEORY', 'WORKSHOP'],
      },
      {
        order: 2,
        title: 'Biểu diễn văn bản tiếng Việt thành Vector & Tìm kiếm theo ngữ nghĩa',
        summary: 'Thực hành chuyển đổi câu chữ thành vector số học để máy tính hiểu đúng ý nghĩa câu hỏi của người dùng.',
        activityTags: ['THEORY', 'LIVE_CODING'],
      },
      {
        order: 3,
        title: 'Thiết kế & Tăng tốc truy vấn Cơ sở dữ liệu Vector trên PostgreSQL',
        summary: 'Tổ chức bảng dữ liệu hàng triệu văn bản và tối ưu chỉ mục để tìm kiếm nhanh trong tích tắc.',
        activityTags: ['LIVE_CODING', 'EXERCISE_REVIEW'],
      },
      {
        order: 4,
        title: 'Kỹ thuật bóc tách tài liệu PDF/Word an toàn & Chia nhỏ đoạn văn thông minh',
        summary: 'Xây dựng bộ đọc tài liệu giữ nguyên bảng biểu và kiểm soát dung lượng tệp đầu vào an toàn.',
        activityTags: ['THEORY', 'LIVE_CODING'],
      },
      {
        order: 5,
        title: 'Kết hợp tìm kiếm từ khóa và tìm kiếm ngữ nghĩa để đạt độ chính xác cao nhất',
        summary: 'Phối hợp linh hoạt giữa tìm chính xác mã hiệu/tên riêng và tìm theo ý nghĩa câu hỏi.',
        activityTags: ['LIVE_CODING', 'WORKSHOP'],
      },
      {
        order: 6,
        title: 'Xây dựng Trợ giảng AI gắn mốc thời gian video & Trích dẫn trang tài liệu',
        summary: 'Đồng bộ hóa phụ đề bài giảng theo từng giây và dẫn người học tới đúng đoạn video cần xem.',
        activityTags: ['LIVE_CODING', 'EXERCISE_REVIEW'],
      },
    ],
    ratingAvg: 4.94,
    reviewCount: 128,
  },
  {
    id: 'course-cloud-swe',
    slug: 'distributed-backend-cloud-native-golang',
    title: 'Kỹ Sư Backend & Cloud Thực Chiến: Thiết Kế Hệ Thống Chịu Tải Cao',
    shortDescription:
      'Làm chủ kỹ năng thiết kế hệ thống thanh toán tự động, xử lý hàng nghìn giao dịch cùng lúc, tối ưu cơ sở dữ liệu và triển khai ứng dụng đám mây.',
    descriptionMd:
      'Khóa học dành cho lập trình viên muốn nâng tầm kỹ năng từ viết tính năng cơ bản sang thiết kế hệ thống lớn, hoạt động ổn định và an toàn. Bạn sẽ trực tiếp thực hành xây dựng luồng đối soát thanh toán ngân hàng tự động trong 3 giây, chống trùng lặp giao dịch khi mạng chập chờn và theo dõi sức khỏe hệ thống trực quan.',
    category: 'Kỹ thuật Phần mềm & Cloud',
    difficultyLevel: 4,
    skills: [
      { type: 'PREREQUISITE', code: 'NODE-TS', name: 'Node.js' },
      { type: 'PREREQUISITE', code: 'SQL-BASE', name: 'SQL' },
      { type: 'LEARNING_OUTCOME', code: 'DIST-SYS', name: 'Hệ thống phân tán' },
      { type: 'LEARNING_OUTCOME', code: 'DB-TUNE', name: 'Tối ưu PostgreSQL' },
      { type: 'LEARNING_OUTCOME', code: 'CLOUD-OPS', name: 'Triển khai Cloud' },
    ],
    syllabusTemplate: [
      {
        order: 1,
        title: 'Thiết kế luồng thanh toán chuyển khoản ngân hàng tự động & Đối soát an toàn',
        summary: 'Đảm bảo mỗi đơn hàng luôn được kích hoạt chính xác ngay cả khi đường truyền mạng bị gián đoạn.',
        activityTags: ['THEORY', 'LIVE_CODING'],
      },
      {
        order: 2,
        title: 'Tối ưu hóa truy vấn PostgreSQL & Xử lý nhiều người mua hàng cùng lúc',
        summary: 'Thực hành cơ chế khóa dòng dữ liệu an toàn và viết câu lệnh SQL chạy mượt trên dữ liệu lớn.',
        activityTags: ['LIVE_CODING', 'EXERCISE_REVIEW'],
      },
      {
        order: 3,
        title: 'Kiến trúc hàng đợi tin nhắn (Message Queue) & Xử lý tác vụ chạy ngầm',
        summary: 'Tách biệt các tác vụ gửi email, xuất báo cáo và xử lý video để giao diện người dùng luôn phản hồi tức thì.',
        activityTags: ['THEORY', 'LIVE_CODING'],
      },
      {
        order: 4,
        title: 'Bảo vệ hệ thống API, Phân quyền người dùng & Giám sát lỗi thời gian thực',
        summary: 'Thiết lập lớp bảo vệ tài khoản, giới hạn tần suất gọi API và cảnh báo sớm khi hệ thống quá tải.',
        activityTags: ['LIVE_CODING', 'WORKSHOP'],
      },
    ],
    ratingAvg: 4.91,
    reviewCount: 94,
  },
  {
    id: 'course-data-ae',
    slug: 'analytics-engineering-dbt-lakehouse',
    title: 'Phân Tích Dữ Liệu Thực Chiến & Xây Dựng Báo Cáo Thông Minh Với SQL, Python',
    shortDescription:
      'Làm chủ quy trình làm sạch dữ liệu, tự động hóa kiểm tra chất lượng số liệu và xây dựng hệ thống báo cáo trực quan giúp doanh nghiệp ra quyết định.',
    descriptionMd:
      'Chương trình thiết kế thực tế cho bạn muốn làm chủ trọn vẹn luồng phân tích dữ liệu hiện đại. Bạn sẽ thực hành trên bộ dữ liệu thực tế của doanh nghiệp, viết truy vấn SQL tối ưu và tự động hóa quy trình cập nhật báo cáo mỗi ngày.',
    category: 'Phân tích Dữ liệu',
    difficultyLevel: 3,
    skills: [
      { type: 'PREREQUISITE', code: 'SQL-BASE', name: 'SQL' },
      { type: 'LEARNING_OUTCOME', code: 'PY-CORE', name: 'Python' },
      { type: 'LEARNING_OUTCOME', code: 'DATA-MOD', name: 'Mô hình hóa dữ liệu' },
      { type: 'LEARNING_OUTCOME', code: 'BI-DASH', name: 'Phân tích tăng trưởng' },
    ],
    syllabusTemplate: [
      {
        order: 1,
        title: 'Tổ chức kho dữ liệu khoa học từ dữ liệu thô sang báo cáo quản trị',
        summary: 'Chuẩn hóa quy trình làm sạch và ghép nối dữ liệu từ nhiều nguồn khác nhau.',
        activityTags: ['THEORY', 'WORKSHOP'],
      },
      {
        order: 2,
        title: 'Kỹ thuật viết câu lệnh SQL nâng cao để phân tích hành vi khách hàng',
        summary: 'Đo lường tỷ lệ gắn bó của người dùng theo từng tuần và phát hiện sớm nguyên nhân rời bỏ.',
        activityTags: ['LIVE_CODING', 'EXERCISE_REVIEW'],
      },
      {
        order: 3,
        title: 'Tự động hóa kiểm tra độ chính xác của số liệu trước khi gửi báo cáo',
        summary: 'Thiết lập các bài kiểm tra tự động để phát hiện ngay dữ liệu bị thiếu hoặc trùng lặp.',
        activityTags: ['LIVE_CODING'],
      },
    ],
    ratingAvg: 4.89,
    reviewCount: 76,
  },
  {
    id: 'course-python-foundations',
    slug: 'python-sql-ai-foundation-bootcamp',
    title: 'Nền Tảng Lập Trình Python & Truy Vấn Dữ Liệu SQL Thực Chiến Cho Người Mới',
    shortDescription:
      'Lộ trình khởi đầu vững chắc giúp người mới hoặc người trái ngành nắm chắc Python hiện đại, xử lý dữ liệu bảng và viết truy vấn SQL tự tin.',
    descriptionMd:
      'Được thiết kế gần gũi, dễ hiểu dành riêng cho bạn mới bắt đầu hoặc muốn củng cố lại gốc lập trình trước khi học lên các lớp AI và Dữ liệu chuyên sâu. Mỗi buổi học đều có bài tập ngắn thực hành ngay tại lớp và trợ giảng AI đồng hành kèm cặp sát sao.',
    category: 'AI & Dữ liệu',
    difficultyLevel: 2,
    skills: [
      { type: 'LEARNING_OUTCOME', code: 'PY-CORE', name: 'Python' },
      { type: 'LEARNING_OUTCOME', code: 'SQL-BASE', name: 'SQL' },
      { type: 'LEARNING_OUTCOME', code: 'API-JSON', name: 'Kết nối dữ liệu API' },
    ],
    syllabusTemplate: [
      {
        order: 1,
        title: 'Tư duy lập trình Python rõ ràng, dễ đọc & Quản lý dự án chuyên nghiệp',
        summary: 'Làm chủ cấu trúc dữ liệu, hàm, xử lý ngoại lệ và cách viết mã nguồn gọn gàng.',
        activityTags: ['THEORY', 'LIVE_CODING'],
      },
      {
        order: 2,
        title: 'Thiết kế bảng dữ liệu & Viết truy vấn SQL lấy đúng thông tin cần thiết',
        summary: 'Thực hành lọc, gom nhóm và kết nối nhiều bảng dữ liệu trên bài toán thực tế.',
        activityTags: ['LIVE_CODING', 'EXERCISE_REVIEW'],
      },
    ],
    ratingAvg: 4.96,
    reviewCount: 162,
  },
];

/**
 * Bảng `cohorts`: Gắn trực tiếp với `instructorId`, `curriculumVersion` và `scheduleSlots` (JSONB)
 * (Đã loại bỏ hoàn toàn vai trò TA và bảng `cohort_instructors`)
 */
export const INITIAL_COHORTS: Cohort[] = [
  {
    id: 'cohort-ai-k01',
    courseId: 'course-ai-rag',
    instructorId: 'usr-inst-khoa',
    code: 'AI-ENG-2026-K01',
    name: 'Lớp Kỹ Sư AI Thực Chiến — Khóa K01 (Đang mở ghi danh)',
    curriculumVersion: 'v2.4',
    tuitionVnd: 8500000,
    enrolledCount: 34,
    enrollmentOpenAt: '2026-10-15',
    startDate: '17/11/2026',
    endDate: '29/12/2026',
    scheduleSlots: [
      { dayOfWeek: 2, startTime: '19:30', endTime: '21:30' },
      { dayOfWeek: 6, startTime: '19:30', endTime: '21:30' },
    ],
    status: 'OPENING',
    staff: [
      {
        id: 'usr-inst-khoa',
        role: 'INSTRUCTOR',
        fullName: 'TS. Trần Minh Khoa',
        headline: 'Chuyên gia AI & Xử lý ngôn ngữ tự nhiên',
        avatarUrl: AVATAR_MINH_KHOA,
        organization: '3T Research Lab',
      },
    ],
  },
  {
    id: 'cohort-ai-k02',
    courseId: 'course-ai-rag',
    instructorId: 'usr-inst-khoa',
    code: 'AI-ENG-2026-K02',
    name: 'Lớp Kỹ Sư AI Thực Chiến — Khóa K02 (Lịch linh hoạt Thứ 2 & Thứ 6)',
    curriculumVersion: 'v2.5',
    tuitionVnd: 8500000,
    enrolledCount: 18,
    enrollmentOpenAt: '2026-11-01',
    startDate: '09/01/2027',
    endDate: '21/02/2027',
    scheduleSlots: [
      { dayOfWeek: 1, startTime: '19:30', endTime: '21:30' },
      { dayOfWeek: 5, startTime: '16:30', endTime: '18:30' },
    ],
    status: 'OPENING',
    staff: [
      {
        id: 'usr-inst-khoa',
        role: 'INSTRUCTOR',
        fullName: 'TS. Trần Minh Khoa',
        headline: 'Chuyên gia AI & Xử lý ngôn ngữ tự nhiên',
        avatarUrl: AVATAR_MINH_KHOA,
        organization: '3T Research Lab',
      },
    ],
  },
  {
    id: 'cohort-swe-k01',
    courseId: 'course-cloud-swe',
    instructorId: 'usr-inst-ha',
    code: 'SWE-CLOUD-2026-K01',
    name: 'Lớp Kỹ Sư Backend & Cloud — Khóa K01',
    curriculumVersion: 'v3.1',
    tuitionVnd: 7800000,
    enrolledCount: 29,
    enrollmentOpenAt: '2026-10-20',
    startDate: '20/11/2026',
    endDate: '30/12/2026',
    scheduleSlots: [
      { dayOfWeek: 2, startTime: '19:30', endTime: '21:30' },
      { dayOfWeek: 6, startTime: '19:30', endTime: '21:30' },
    ],
    status: 'OPENING',
    staff: [
      {
        id: 'usr-inst-ha',
        role: 'INSTRUCTOR',
        fullName: 'ThS. Lê Thu Hà',
        headline: 'Kiến trúc sư Hệ thống & Đám mây',
        avatarUrl: AVATAR_THU_HA,
        organization: '3T Cloud Division',
      },
    ],
  },
  {
    id: 'cohort-data-k01',
    courseId: 'course-data-ae',
    instructorId: 'usr-inst-ha',
    code: 'DATA-AE-2026-K01',
    name: 'Lớp Phân Tích Dữ Liệu Thực Chiến — Khóa K01',
    curriculumVersion: 'v1.9',
    tuitionVnd: 6500000,
    enrolledCount: 41,
    enrollmentOpenAt: '2026-10-10',
    startDate: '18/11/2026',
    endDate: '27/12/2026',
    scheduleSlots: [
      { dayOfWeek: 3, startTime: '19:30', endTime: '21:30' },
      { dayOfWeek: 0, startTime: '15:00', endTime: '17:00' },
    ],
    status: 'OPENING',
    staff: [
      {
        id: 'usr-inst-ha',
        role: 'INSTRUCTOR',
        fullName: 'ThS. Lê Thu Hà',
        headline: 'Chuyên gia Phân tích & Mô hình hóa Dữ liệu',
        avatarUrl: AVATAR_THU_HA,
        organization: '3T Cloud Division',
      },
    ],
  },
  {
    id: 'cohort-py-k04',
    courseId: 'course-python-foundations',
    instructorId: 'usr-inst-khoa',
    code: 'PY-SQL-2026-K04',
    name: 'Lớp Nền Tảng Python & SQL Thực Chiến — Khóa K04',
    curriculumVersion: 'v4.0',
    tuitionVnd: 4900000,
    enrolledCount: 52,
    enrollmentOpenAt: '2026-10-25',
    startDate: '21/11/2026',
    endDate: '26/12/2026',
    scheduleSlots: [
      { dayOfWeek: 4, startTime: '19:30', endTime: '21:30' },
      { dayOfWeek: 6, startTime: '14:00', endTime: '16:00' },
    ],
    status: 'OPENING',
    staff: [
      {
        id: 'usr-inst-khoa',
        role: 'INSTRUCTOR',
        fullName: 'TS. Trần Minh Khoa',
        headline: 'Giảng viên Trưởng Khối AI & Lập trình',
        avatarUrl: AVATAR_MINH_KHOA,
        organization: '3T Research Lab',
      },
    ],
  },
];


/**
 * Bảng `class_sessions`: Sử dụng `videoR2Key` và `videoProvider` ('R2_HLS_AES128' | 'BUNNY_STREAM'),
 * đã bỏ hoàn toàn `isFreePreview`, `externalYoutubeId`, `hlsAesKeyHex`.
 */
export const INITIAL_CLASS_SESSIONS: ClassSession[] = [
  {
    id: 'sess-ai-01',
    cohortId: 'cohort-ai-k01',
    sessionOrder: 1,
    title: 'Buổi 1: Tổng quan ứng dụng AI thực tế & Cách giúp AI luôn trả lời kèm trích dẫn đúng',
    activityTags: ['THEORY', 'WORKSHOP'],
    hostInstructorName: 'TS. Trần Minh Khoa',
    scheduledStart: '25/10/2026 · 19:30',
    scheduledEnd: '25/10/2026 · 21:30',
    status: 'REPLAY_READY',
    videoR2Key: 'cohorts/cohort-ai-k01/sessions/sess-ai-01/master.m3u8',
    videoProvider: 'R2_HLS_AES128',
    durationSeconds: 7200,
    isCompleted: true,
    lastPositionSec: 7200,
    aiSummaryMd:
      'Hiểu rõ khi nào nên kết nối tài liệu nội bộ cho AI và cách thiết lập quy tắc buộc Trợ lý thông minh luôn dẫn nguồn rõ ràng từng trang tài liệu.',
    attachmentsCount: 4,
    quizStatus: 'PASSED',
    quizScore: 100,
    aiCitations: [
      {
        timestampSec: 860,
        timestampLabel: '14:20',
        topic: 'Vì sao AI đôi khi tự suy diễn câu trả lời?',
        snippet:
          'Khi câu hỏi nằm ngoài tài liệu đã cung cấp, nếu không có quy tắc kiểm soát, mô hình sẽ tự ghép các từ nghe hợp lý nhưng không có thật trong quy định công ty.',
      },
      {
        timestampSec: 2910,
        timestampLabel: '48:30',
        topic: 'Cách gắn trích dẫn trang tài liệu và mốc giây video',
        snippet:
          'Mỗi ý trả lời của Trợ giảng AI đều được nối trực tiếp với đoạn văn bản gốc và mốc thời gian trong video bài giảng để bạn bấm vào kiểm tra ngay.',
      },
    ],
    quizQuestions: [
      {
        id: 'q1-1',
        question: 'Giải pháp nào phù hợp nhất khi tài liệu hướng dẫn của công ty cập nhật mới mỗi tuần?',
        options: [
          'Huấn luyện lại toàn bộ mô hình AI từ đầu mỗi ngày',
          'Kết nối AI với kho tài liệu nội bộ để tra cứu thông tin mới nhất trước khi trả lời',
          'Tắt tính năng kiểm tra nguồn tài liệu',
        ],
        correctIndex: 1,
        explanation: 'Tra cứu trực tiếp trên kho tài liệu giúp cập nhật kiến thức mới ngay lập tức mà không tốn chi phí huấn luyện lại.',
      },
      {
        id: 'q1-2',
        question: 'Tại sao câu trả lời của Trợ giảng AI nên đính kèm mốc giây video và trang tài liệu?',
        options: [
          'Để người học bấm vào xem lại đúng đoạn thầy giảng một cách nhanh chóng và yên tâm về độ chính xác',
          'Để làm dung lượng trang web nặng hơn',
          'Để thay đổi màu sắc giao diện',
        ],
        correctIndex: 0,
        explanation: 'Trích dẫn đúng phút giây video giúp bạn tiết kiệm thời gian ôn tập và đối chiếu trực tiếp.',
      },
      {
        id: 'q1-3',
        question: 'Khi câu hỏi nằm ngoài nội dung tài liệu hiện có, Trợ lý AI nên phản hồi thế nào?',
        options: [
          'Tự đoán câu trả lời bất kỳ',
          'Thông báo rõ tài liệu hiện tại chưa có thông tin này và gợi ý chuyển câu hỏi tới Giảng viên',
          'Đóng trình duyệt của người học',
        ],
        correctIndex: 1,
        explanation: 'Báo rõ giới hạn thông tin và kết nối với Giảng viên giúp bạn luôn nhận được kiến thức chuẩn xác.',
      },
    ],
  },
  {
    id: 'sess-ai-02',
    cohortId: 'cohort-ai-k01',
    sessionOrder: 2,
    title: 'Buổi 2: Biểu diễn văn bản tiếng Việt thành Vector & Tìm kiếm theo ý nghĩa',
    activityTags: ['THEORY', 'LIVE_CODING'],
    hostInstructorName: 'TS. Trần Minh Khoa',
    scheduledStart: '29/10/2026 · 19:30',
    scheduledEnd: '29/10/2026 · 21:30',
    status: 'REPLAY_READY',
    videoR2Key: 'cohorts/cohort-ai-k01/sessions/sess-ai-02/master.m3u8',
    videoProvider: 'R2_HLS_AES128',
    durationSeconds: 7450,
    isCompleted: true,
    lastPositionSec: 7450,
    aiSummaryMd:
      'Thực hành cách chuyển câu hỏi tiếng Việt có dấu thành các con số để máy tính tìm được đúng đoạn tài liệu đồng nghĩa dù người dùng dùng từ khóa khác nhau.',
    attachmentsCount: 3,
    quizStatus: 'PASSED',
    quizScore: 100,
    aiCitations: [
      {
        timestampSec: 1340,
        timestampLabel: '22:20',
        topic: 'Cách đo độ gần nghĩa giữa câu hỏi và đoạn tài liệu',
        snippet:
          'Khi hai câu có ý nghĩa tương đồng, góc giữa hai vector biểu diễn của chúng sẽ rất nhỏ, giúp hệ thống nhận diện nhanh đoạn văn phù hợp nhất.',
      },
    ],
    quizQuestions: [
      {
        id: 'q2-1',
        question: 'Tìm kiếm theo ngữ nghĩa (Vector) giúp giải quyết hạn chế nào của tìm kiếm từ khóa thông thường?',
        options: [
          'Hiểu được các câu hỏi có ý nghĩa tương đương dù người học dùng từ ngữ khác với trong sách',
          'Tự động sửa phần cứng máy tính',
          'Không cần lưu trữ dữ liệu',
        ],
        correctIndex: 0,
        explanation: 'Tìm kiếm theo ngữ nghĩa nắm bắt được ý định của câu hỏi thay vì chỉ so khớp từng chữ cái.',
      },
      {
        id: 'q2-2',
        question: 'Tại sao cần dùng cùng một mô hình biểu diễn ngôn ngữ cho cả lúc lưu tài liệu và lúc tìm kiếm?',
        options: [
          'Để câu hỏi và tài liệu cùng nằm trên một hệ quy chiếu, giúp so sánh độ tương đồng chính xác',
          'Để tự động dịch sang tiếng Tây Ban Nha',
          'Để xóa bớt dữ liệu cũ',
        ],
        correctIndex: 0,
        explanation: 'Cùng một mô hình giúp vector câu hỏi và vector tài liệu khớp nhau chính xác.',
      },
      {
        id: 'q2-3',
        question: 'Khi rút gọn kích thước vector hợp lý, lợi ích thực tế nhận được là gì?',
        options: [
          'Tiết kiệm bộ nhớ RAM và tăng tốc độ tìm kiếm mà vẫn giữ được độ chính xác cao',
          'Làm chậm tốc độ mạng',
          'Tắt màn hình máy chủ',
        ],
        correctIndex: 0,
        explanation: 'Giảm số chiều hợp lý giúp hệ thống chạy nhẹ nhàng và phản hồi nhanh hơn.',
      },
    ],
  },
  {
    id: 'sess-ai-03',
    cohortId: 'cohort-ai-k01',
    sessionOrder: 3,
    title: 'Buổi 3: Tổ chức & Tăng tốc truy vấn kho tài liệu lớn trên PostgreSQL',
    activityTags: ['LIVE_CODING', 'EXERCISE_REVIEW'],
    hostInstructorName: 'TS. Trần Minh Khoa',
    scheduledStart: '01/11/2026 · 19:30',
    scheduledEnd: '01/11/2026 · 21:30',
    status: 'REPLAY_READY',
    videoR2Key: 'cohorts/cohort-ai-k01/sessions/sess-ai-03/master.m3u8',
    videoProvider: 'R2_HLS_AES128',
    durationSeconds: 7100,
    isCompleted: true,
    lastPositionSec: 7100,
    aiSummaryMd:
      'Thực hành thiết lập chỉ mục tìm kiếm nhanh trên cơ sở dữ liệu PostgreSQL giúp tra cứu hàng trăm nghìn trang tài liệu chỉ trong vài chục mili-giây.',
    attachmentsCount: 5,
    quizStatus: 'PASSED',
    quizScore: 100,
    aiCitations: [
      {
        timestampSec: 1980,
        timestampLabel: '33:00',
        topic: 'Cách cân bằng giữa tốc độ tìm kiếm và độ chính xác',
        snippet:
          'Thiết lập thông số tìm kiếm phù hợp giúp hệ thống vừa trả kết quả dưới 50ms vừa không bỏ sót đoạn tài liệu quan trọng.',
      },
    ],
    quizQuestions: [
      {
        id: 'q3-1',
        question: 'Việc tạo chỉ mục (Index) cho cột dữ liệu vector trên PostgreSQL mang lại lợi ích gì?',
        options: [
          'Giúp tìm ra các đoạn tài liệu liên quan cực nhanh mà không phải quét tuần tự từng dòng từ đầu đến cuối bảng',
          'Làm tăng gấp đôi hóa đơn tiền điện',
          'Xóa toàn bộ bảng dữ liệu',
        ],
        correctIndex: 0,
        explanation: 'Chỉ mục giúp thu hẹp vùng tìm kiếm thông minh, tăng tốc truy vấn lên hàng trăm lần.',
      },
      {
        id: 'q3-2',
        question: 'Khi lọc tài liệu theo từng lớp học cụ thể trước khi tìm kiếm ngữ nghĩa, chúng ta cần lưu ý điều gì?',
        options: [
          'Kết hợp chỉ mục hợp lý để vừa lọc đúng lớp vừa giữ được đủ số lượng kết quả gợi ý tốt nhất',
          'Không cho phép người dùng lọc',
          'Chỉ lưu tối đa 5 dòng dữ liệu',
        ],
        correctIndex: 0,
        explanation: 'Kết hợp lọc theo lớp học và tìm kiếm ngữ nghĩa giúp học viên chỉ nhận tài liệu thuộc đúng khóa mình đang học.',
      },
      {
        id: 'q3-3',
        question: 'Để quá trình tạo chỉ mục cho bảng dữ liệu lớn diễn ra nhanh chóng, thông số nào trên cơ sở dữ liệu cần được cấp phát đủ bộ nhớ?',
        options: ['Bộ nhớ đệm phục vụ bảo trì và tạo chỉ mục (maintenance_work_mem)', 'Múi giờ hiển thị', 'Tên máy chủ'],
        correctIndex: 0,
        explanation: 'Khi đủ bộ nhớ RAM tạm thời, quá trình dựng chỉ mục diễn ra nhanh hơn rất nhiều.',
      },
    ],
  },
  {
    id: 'sess-ai-04',
    cohortId: 'cohort-ai-k01',
    sessionOrder: 4,
    title: 'Buổi 4: Kỹ thuật đọc tài liệu PDF/Word an toàn & Chia nhỏ đoạn văn giữ nguyên ngữ cảnh',
    activityTags: ['THEORY', 'LIVE_CODING'],
    hostInstructorName: 'TS. Trần Minh Khoa',
    scheduledStart: '05/11/2026 · 19:30',
    scheduledEnd: '05/11/2026 · 21:30',
    status: 'REPLAY_READY',
    videoR2Key: 'cohorts/cohort-ai-k01/sessions/sess-ai-04/master.m3u8',
    videoProvider: 'R2_HLS_AES128',
    durationSeconds: 6900,
    isCompleted: false,
    lastPositionSec: 2535,
    aiSummaryMd:
      'Hướng dẫn kiểm tra độ an toàn khi nhận tệp tài liệu từ người dùng và cách cắt nhỏ các bảng biểu dài mà vẫn giữ nguyên dòng tiêu đề cột để AI luôn hiểu đúng số liệu.',
    attachmentsCount: 4,
    quizStatus: 'PENDING',
    quizScore: null,
    aiCitations: [
      {
        timestampSec: 1125,
        timestampLabel: '18:45',
        topic: 'Kiểm soát dung lượng tệp tải lên để bảo vệ bộ nhớ máy chủ',
        snippet:
          'Luôn đọc tệp theo từng phần nhỏ và kiểm tra giới hạn dung lượng sau khi giải nén để hệ thống luôn hoạt động ổn định, không bị treo.',
      },
      {
        timestampSec: 2535,
        timestampLabel: '42:15',
        topic: 'Giữ nguyên tiêu đề cột khi chia nhỏ bảng biểu dài (Trang 14 tài liệu)',
        snippet:
          'Nếu một bảng báo cáo dài 100 dòng được chia thành 3 đoạn nhỏ, đoạn thứ 2 và thứ 3 cần được tự động gắn lại dòng tiêu đề cột để AI không đọc nhầm số liệu.',
      },
    ],
    quizQuestions: [
      {
        id: 'q4-1',
        question: 'Tại sao cần kiểm tra giới hạn dung lượng thực tế khi giải nén các tệp tài liệu DOCX/XLSX do người dùng tải lên?',
        options: [
          'Để làm đẹp phông chữ khi hiển thị',
          'Để bảo vệ máy chủ không bị quá tải bộ nhớ RAM khi gặp các tệp nén bất thường',
          'Để tự động dịch tài liệu sang tiếng Anh',
        ],
        correctIndex: 1,
        explanation: 'Kiểm soát dung lượng giải nén giúp hệ thống xử lý tài liệu luôn an toàn và ổn định.',
      },
      {
        id: 'q4-2',
        question: 'Khi chia một bảng số liệu dài thành nhiều đoạn nhỏ, cách làm nào giúp Trợ lý AI không hiểu nhầm ý nghĩa các cột ở đoạn phía sau?',
        options: [
          'Xóa bỏ toàn bộ các con số trong bảng',
          'Tự động đính kèm lại dòng tiêu đề cột và tên mục lớn vào đầu mỗi đoạn nhỏ',
          'Cắt ngẫu nhiên mỗi dòng 5 ký tự',
        ],
        correctIndex: 1,
        explanation: 'Giữ lại tiêu đề cột ở mỗi đoạn giúp đoạn văn bản luôn trọn vẹn ý nghĩa.',
      },
      {
        id: 'q4-3',
        question: 'Để hoàn thành trọn vẹn Buổi 4 hôm nay và mở khóa buổi tiếp theo, bạn cần làm bước nào?',
        options: [
          'Chỉ cần tua thanh video đến giây cuối cùng',
          'Hoàn thành bài kiểm tra ngắn 10 câu cuối buổi với kết quả đạt từ 7.0/10 trở lên',
          'Tắt trình duyệt web',
        ],
        correctIndex: 1,
        explanation: 'Làm xong bài tập ngắn sau mỗi buổi học giúp bạn nắm chắc kiến thức thực tế của buổi đó.',
      },
    ],
  },
  {
    id: 'sess-ai-05',
    cohortId: 'cohort-ai-k01',
    sessionOrder: 5,
    title: 'Buổi 5: Kết hợp tìm kiếm từ khóa & tìm kiếm ngữ nghĩa cho Trợ lý AI',
    activityTags: ['LIVE_CODING', 'WORKSHOP'],
    hostInstructorName: 'TS. Trần Minh Khoa',
    scheduledStart: 'Hôm nay · 19:30',
    scheduledEnd: 'Hôm nay · 21:30',
    status: 'LIVE',
    videoR2Key: 'cohorts/cohort-ai-k01/sessions/sess-ai-05/live.m3u8',
    videoProvider: 'BUNNY_STREAM',
    durationSeconds: 7200,
    isCompleted: false,
    lastPositionSec: 1840,
    aiSummaryMd:
      'ĐANG HỌC TRỰC TUYẾN: Phối hợp giữa tìm kiếm chính xác mã văn bản/tên riêng với tìm kiếm theo ý nghĩa câu hỏi để Trợ lý AI luôn lấy được đoạn tài liệu chuẩn xác nhất.',
    attachmentsCount: 5,
    quizStatus: 'NOT_STARTED',
    quizScore: null,
    aiCitations: [
      {
        timestampSec: 860,
        timestampLabel: '14:20',
        topic: 'Cách kết hợp thứ hạng từ hai nhánh tìm kiếm (Trang 8 Slide Buổi 5)',
        snippet:
          'Thay vì cộng điểm thô lệch nhau, chúng ta dựa vào vị trí xếp hạng của từng đoạn văn ở cả hai nhánh tìm kiếm để chọn ra đoạn tài liệu phù hợp nhất.',
      },
      {
        timestampSec: 1690,
        timestampLabel: '28:10',
        topic: 'Viết câu lệnh SQL gọn gàng kết hợp cả hai nhánh tìm kiếm',
        snippet:
          'Chỉ với một truy vấn SQL rõ ràng, bạn có thể vừa tìm theo từ khóa chính xác vừa tìm theo ý nghĩa câu hỏi ngay trong cơ sở dữ liệu.',
      },
    ],
    quizQuestions: [
      {
        id: 'q5-1',
        question: 'Lợi ích lớn nhất của việc kết hợp cả tìm kiếm từ khóa lẫn tìm kiếm theo ý nghĩa là gì?',
        options: [
          'Vừa bắt chính xác mã số, tên riêng, vừa hiểu được ý nghĩa câu hỏi tự nhiên của người dùng',
          'Không cần lưu trữ tài liệu',
          'Chỉ tìm được hình ảnh',
        ],
        correctIndex: 0,
        explanation: 'Hai phương pháp bổ trợ cho nhau giúp kết quả tìm kiếm vừa chuẩn xác vừa thông minh.',
      },
      {
        id: 'q5-2',
        question: 'Khi người dùng gõ tìm chính xác một mã đơn hàng như "ET20268891", nhánh tìm kiếm nào sẽ phát huy tác dụng tốt nhất?',
        options: [
          'Nhánh tìm kiếm từ khóa chính xác',
          'Chọn ngẫu nhiên một đoạn văn',
          'Tạo hình ảnh mới',
        ],
        correctIndex: 0,
        explanation: 'Tìm kiếm từ khóa khớp chính xác từng chữ cái và con số của mã đơn hàng.',
      },
      {
        id: 'q5-3',
        question: 'Bước sắp xếp lại kết quả tinh gọn (Reranking) nên đặt ở đâu để hệ thống vừa trả lời nhanh vừa chính xác?',
        options: [
          'Chấm điểm lại trên toàn bộ hàng triệu văn bản trong kho',
          'Chỉ chấm điểm tinh lọc trên 20–30 đoạn văn phù hợp nhất đã được chọn lọc sơ bộ',
          'Chạy trước khi người dùng đặt câu hỏi',
        ],
        correctIndex: 1,
        explanation: 'Chỉ chấm điểm tinh lọc trên nhóm nhỏ ứng viên tốt nhất giúp giữ tốc độ phản hồi dưới 1 giây.',
      },
    ],
  },
  {
    id: 'sess-ai-06',
    cohortId: 'cohort-ai-k01',
    sessionOrder: 6,
    title: 'Buổi 6: Xây dựng Trợ giảng AI gắn mốc giây video & Trích dẫn trang tài liệu',
    activityTags: ['LIVE_CODING', 'EXERCISE_REVIEW'],
    hostInstructorName: 'TS. Trần Minh Khoa',
    scheduledStart: '12/11/2026 · 19:30',
    scheduledEnd: '12/11/2026 · 21:30',
    status: 'SCHEDULED',
    videoR2Key: 'cohorts/cohort-ai-k01/sessions/sess-ai-06/master.m3u8',
    videoProvider: 'R2_HLS_AES128',
    durationSeconds: 7200,
    isCompleted: false,
    lastPositionSec: 0,
    aiSummaryMd:
      'Buổi học sắp diễn ra: Hướng dẫn cách đồng bộ phụ đề bài giảng theo từng giây và tạo nút bấm để người học nhảy thẳng tới đoạn video thầy đang giải thích.',
    attachmentsCount: 2,
    quizStatus: 'NOT_STARTED',
    quizScore: null,
    aiCitations: [],
    quizQuestions: [
      {
        id: 'q6-1',
        question: 'Khi lưu phụ đề bài giảng vào cơ sở dữ liệu, thông tin nào giúp người học bấm 1 nút là nhảy tới đúng đoạn video cần xem?',
        options: ['Mốc giây bắt đầu và kết thúc của từng đoạn lời giảng', 'Màu sắc nút bấm', 'Tên trình duyệt'],
        correctIndex: 0,
        explanation: 'Lưu mốc giây bắt đầu và kết thúc giúp trình phát video tua tới đúng vị trí ngay lập tức.',
      },
      {
        id: 'q6-2',
        question: 'Để đoạn trích dẫn phụ đề đọc tự nhiên và trọn vẹn câu nói của giảng viên, ta nên ngắt đoạn theo dấu hiệu nào?',
        options: [
          'Ngắt theo khoảng nghỉ giọng nói tự nhiên kết hợp dấu chấm câu và lúc chuyển trang slide',
          'Cắt cứng mỗi 3 giây bất kể đang nói giữa từ',
          'Chỉ lấy từ đầu tiên',
        ],
        correctIndex: 0,
        explanation: 'Ngắt theo câu hoàn chỉnh và trang slide giúp người học dễ dàng nắm bắt trọn vẹn ý nghĩa.',
      },
      {
        id: 'q6-3',
        question: 'Lợi ích thiết thực nhất khi Trợ giảng AI chỉ rõ phút giây video và trang tài liệu là gì?',
        options: [
          'Giúp bạn xem lại ngay thao tác thực hành của thầy tại đúng thời điểm đó mà không phải mò mẫm tua tìm cả buổi',
          'Làm video dài gấp đôi',
          'Không cần xem bài giảng nữa',
        ],
        correctIndex: 0,
        explanation: 'Bạn vừa có lời giải thích rõ ràng vừa xem lại được trực tiếp ví dụ thầy làm trên màn hình.',
      },
    ],
  },
];

export const INITIAL_UPCOMING_TASKS: UpcomingTaskItem[] = [
  {
    id: 'task-1',
    sessionId: 'sess-ai-04',
    cohortId: 'cohort-ai-k01',
    cohortCode: 'AI-ENG-2026-K01',
    title: 'Bài kiểm tra Buổi 4: Bóc tách tài liệu & Chia đoạn văn thông minh (10 câu trắc nghiệm)',
    type: 'SESSION_ASSIGNMENT',
    dueText: 'Còn 14 giờ',
    urgency: 'WARNING',
    score: null,
    statusLabel: 'Làm xong để hoàn thành Buổi 4 hôm nay nhé',
  },
  {
    id: 'task-2',
    sessionId: 'sess-ai-05',
    cohortId: 'cohort-ai-k01',
    cohortCode: 'AI-ENG-2026-K01',
    title: 'Bài kiểm tra Buổi 5: Kết hợp tìm kiếm từ khóa và ngữ nghĩa trên PostgreSQL (10 câu)',
    type: 'SESSION_ASSIGNMENT',
    dueText: 'Còn 3 ngày',
    urgency: 'SAFE',
    score: null,
    statusLabel: 'Mở ngay sau khi kết thúc buổi học trực tuyến tối nay',
  },
  {
    id: 'task-3',
    sessionId: 'sess-ai-03',
    cohortId: 'cohort-ai-k01',
    cohortCode: 'AI-ENG-2026-K01',
    title: 'Bài kiểm tra mở khóa Buổi 3: Tối ưu tốc độ tìm kiếm trên 500.000 đoạn văn bản tiếng Việt',
    type: 'PROJECT_MILESTONE',
    dueText: 'Đã hoàn thành',
    urgency: 'SAFE',
    score: 90,
    statusLabel: 'Đã đạt 9.0/10 · Mở khóa thành công',
  },
];

export const INITIAL_DISCUSSION_THREADS: DiscussionThread[] = [
  {
    id: 'disc-1',
    cohortId: 'cohort-ai-k01',
    sessionOrder: 5,
    sessionTitle: 'Buổi 5: Kết hợp tìm kiếm từ khóa & tìm kiếm ngữ nghĩa',
    timestampLabel: '14:20',
    authorName: 'Nguyễn Văn An',
    createdAt: '18 phút trước',
    questionTitle: 'Khi tìm kiếm văn bản tiếng Việt có nhiều từ ghép chuyên ngành thì mình cấu hình bộ lọc từ khóa thế nào cho chuẩn ạ?',
    questionBody:
      'Thầy Khoa cho mình hỏi: ở phút 14:20 (Trang 8 tài liệu) thầy có hướng dẫn cách tìm từ khóa trên PostgreSQL. Nếu tài liệu công ty mình có nhiều mã quy định và từ ghép tiếng Việt thì nên kết hợp như thế nào để tìm chính xác nhất ạ?',
    isResolved: true,
    verifiedByStaff: true,
    hasAiSuggestion: true,
    replies: [
      {
        id: 'rep-ai-1',
        authorName: 'Trợ giảng AI 3T (Hỗ trợ 24/7)',
        authorRole: 'AI_TUTOR',
        createdAt: '17 phút trước',
        aiCitationSec: '14:20',
        content:
          'Giải thích từ bài giảng Buổi 5 (mốc 14:20 · Trang 8 Slide): Bạn dùng nhánh tìm kiếm từ khóa để bắt chính xác các mã quy định, số hiệu văn bản và tên riêng; còn phần ý nghĩa của từ ghép tiếng Việt sẽ do nhánh tìm kiếm Vector đảm nhiệm. Nhờ vậy tốc độ tìm kiếm luôn đạt dưới 15ms mà không sợ sót ý.',
      },
      {
        id: 'rep-inst-1',
        authorName: 'TS. Trần Minh Khoa (Giảng viên)',
        authorRole: 'INSTRUCTOR',
        createdAt: '9 phút trước',
        isVerifiedByStaff: true,
        content:
          'Gợi ý của Trợ giảng AI chuẩn rồi đó An ơi! Thầy bổ sung thêm mẹo thực tế: em bật thêm bộ lọc bỏ dấu tiếng Việt (unaccent) cho nhánh từ khóa để khi người dùng gõ không dấu vẫn tìm ra đúng mã văn bản nhé.',
      },
    ],
  },
  {
    id: 'disc-2',
    cohortId: 'cohort-ai-k01',
    sessionOrder: 4,
    sessionTitle: 'Buổi 4: Kỹ thuật đọc tài liệu PDF/Word an toàn & Chia nhỏ đoạn văn',
    timestampLabel: '42:15',
    authorName: 'Trần Hoàng Minh',
    createdAt: 'Hôm qua',
    questionTitle: 'Cách xử lý bảng báo cáo tài chính bị xoay ngang nằm xen kẽ trong file PDF dài?',
    questionBody:
      'Khi mình làm bài tập Buổi 4 ở đoạn phút 42:15, có vài trang bảng biểu xoay ngang làm thứ tự cột bị đảo. Có cách nào tự động xoay trang lại trước khi đọc bảng không ạ?',
    isResolved: true,
    verifiedByStaff: true,
    hasAiSuggestion: true,
    replies: [
      {
        id: 'rep-inst-2',
        authorName: 'TS. Trần Minh Khoa (Giảng viên)',
        authorRole: 'INSTRUCTOR',
        createdAt: 'Hôm qua',
        isVerifiedByStaff: true,
        content:
          'Chào Minh nhé, bạn kiểm tra góc xoay của từng trang PDF trước khi gọi hàm tách bảng là xử lý gọn ngay. Mình đã cập nhật sẵn hàm mẫu trong kho tài liệu Buổi 4 (tệp `doc_parser_helper.py` dòng 78), bạn tải về chạy thử nhé!',
      },
    ],
  },
];

export const INITIAL_COHORT_MATERIALS: CohortMaterial[] = [
  {
    id: 'mat-1',
    cohortId: 'cohort-ai-k01',
    sessionOrder: 5,
    title: 'Slide Bài giảng Buổi 5: Kết hợp tìm kiếm từ khóa và ngữ nghĩa (Bản đầy đủ)',
    fileType: 'SLIDE',
    fileSize: '4.8 MB',
    updatedAt: '08/11/2026',
    downloadUrl: '#slide-buoi-5',
  },
  {
    id: 'mat-2',
    cohortId: 'cohort-ai-k01',
    sessionOrder: 5,
    title: 'Mã nguồn thực hành Buổi 5: Câu lệnh SQL kết hợp tìm kiếm nhanh trên PostgreSQL',
    fileType: 'REPO',
    fileSize: '1.2 MB',
    updatedAt: '08/11/2026',
    downloadUrl: '#repo-buoi-5',
  },
  {
    id: 'mat-3',
    cohortId: 'cohort-ai-k01',
    sessionOrder: 4,
    title: 'Tài liệu hướng dẫn Buổi 4: Bóc tách PDF/Word giữ nguyên bảng biểu & Chia đoạn văn',
    fileType: 'PDF',
    fileSize: '3.4 MB',
    updatedAt: '05/11/2026',
    downloadUrl: '#pdf-buoi-4',
  },
  {
    id: 'mat-4',
    cohortId: 'cohort-ai-k01',
    sessionOrder: 3,
    title: 'Bài thực hành mẫu Buổi 3: Thiết lập và đo tốc độ truy vấn dữ liệu lớn',
    fileType: 'NOTEBOOK',
    fileSize: '2.1 MB',
    updatedAt: '01/11/2026',
    downloadUrl: '#notebook-buoi-3',
  },
];

export const INITIAL_CERTIFICATES: Record<string, CertificateRecord> = {
  'CERT-3T-2026-8891': {
    certificateCode: 'CERT-3T-2026-8891',
    studentName: 'Nguyễn Văn An',
    studentEmail: 'an.nguyen.ai@3tacademy.vn',
    courseTitle: 'Kỹ Sư AI Thực Chiến: Xây Dựng Trợ Lý Tri Thức & Ứng Dụng AI Doanh Nghiệp',
    cohortCode: 'AI-ENG-2026-K01',
    issuedAt: '08/11/2026 · 16:45',
    verificationSignature: '3T-VERIFIED-2026-9F86D081884C7D659A2FEAA0C55AD015',
    finalScore: 94,
    proctoringIntegrity: 'Đã hoàn thành đầy đủ bài tập các buổi học & Vượt qua kỳ thi tốt nghiệp cuối khóa',
    isRevoked: false,
    skillsMastered: [
      { code: 'VEC-DB', name: 'Thiết kế & Tối ưu hóa Cơ sở dữ liệu Vector trên PostgreSQL', score: 96 },
      { code: 'HYBRID-RAG', name: 'Xây dựng bộ máy tìm kiếm kết hợp từ khóa và ngữ nghĩa', score: 95 },
      { code: 'DOC-SAFE', name: 'Bóc tách tài liệu PDF/Word giữ nguyên cấu trúc bảng biểu', score: 92 },
      { code: 'AI-EVAL', name: 'Kiểm soát chất lượng câu trả lời & Trích dẫn nguồn chính xác', score: 93 },
    ],
  },
};

export const INITIAL_RECEIPTS: OrderReceipt[] = [
  {
    orderCode: 'ET20268410',
    cohortCode: 'PY-SQL-2026-K04',
    courseTitle: 'Nền Tảng Lập Trình Python & Truy Vấn Dữ Liệu SQL Thực Chiến Cho Người Mới',
    amountVnd: 4900000,
    paidAt: '12/10/2026 · 20:14',
    bankName: 'MBBank — Ngân hàng Quân Đội (Chuyển khoản QR 24/7)',
    transactionRef: 'FT26285991023',
  },
];

// ============================================================================
// CÁC BẢNG DỮ LIỆU ĐỒNG BỘ 100% VỚI LƯỢC ĐỒ POSTGRESQL MỚI NHẤT
// ============================================================================

/**
 * Bảng `user_profiles`: Chỉ thêm `cvParsedData` và `interviewCredits`
 * (Tuyệt đối không có `cvReviewFeedback`)
 */
export const INITIAL_USER_PROFILES: UserProfileRecord[] = [
  {
    userId: 'usr-student-01',
    fullName: 'Nguyễn Văn An',
    email: 'an.nguyen.dev@gmail.com',
    role: 'STUDENT',
    interviewCredits: 4,
    cvParsedData: {
      fileName: 'CV_Nguyen_Van_An_2026.pdf',
      updatedAt: '10/11/2026',
      fullName: 'Nguyễn Văn An',
      headline: 'Kỹ Sư Backend Python & Ứng Dụng AI (AI Engineer)',
      email: 'an.nguyen.dev@gmail.com',
      phone: '0908 123 456',
      githubUrl: 'github.com/nguyenvanan-dev',
      linkedinUrl: 'linkedin.com/in/nguyenvanan',
      careerObjective:
        'Kỹ sư Backend Python với 2 năm kinh nghiệm phát triển hệ thống API hiệu năng cao và cơ sở dữ liệu PostgreSQL. Hướng tới vị trí Kỹ sư AI Thực chiến (AI Engineer), tập trung xây dựng các hệ thống tra cứu tài liệu thông minh (RAG), tìm kiếm ngữ nghĩa trên dữ liệu lớn và tự động hóa quy trình nghiệp vụ doanh nghiệp.',
      projects: [
        {
          id: 'proj-1',
          name: 'Hệ thống Trợ lý AI Tra cứu Tài liệu Nội bộ (Enterprise Hybrid RAG)',
          role: 'AI & Backend Engineer (Đồ án Khóa K01 — 3T Academy)',
          period: '09/2026 – 11/2026',
          techStack: 'Python, FastAPI, PostgreSQL (pgvector), Redis, Docker',
          highlights: [
            'Xây dựng bộ đọc tài liệu PDF/Word giữ nguyên cấu trúc bảng biểu tài chính dài hơn 100 trang.',
            'Kết hợp tìm kiếm từ khóa chính xác và tìm kiếm ngữ nghĩa (Vector Search), rút ngắn thời gian phản hồi xuống dưới 800ms.',
            'Thiết lập cơ chế bắt buộc trích dẫn số trang tài liệu gốc và phân quyền truy cập theo phòng ban.',
          ],
        },
        {
          id: 'proj-2',
          name: 'Nền tảng Đối soát Thanh toán & Quản lý Đơn hàng Tự động',
          role: 'Backend Python Developer',
          period: '03/2025 – 08/2026',
          techStack: 'Python, FastAPI, PostgreSQL, Celery, Redis',
          highlights: [
            'Thiết kế API xử lý Webhook chuyển khoản ngân hàng tự động với cơ chế chống trùng lặp giao dịch.',
            'Tối ưu hóa chỉ mục SQL và bộ nhớ đệm Redis giúp phục vụ 2.500 yêu cầu/giây ổn định.',
          ],
        },
      ],
      externalSkills: [
        { name: 'Golang', note: 'Ghi nhận từ dự án cá nhân trong CV' },
        { name: 'C++', note: 'Nền tảng cấu trúc dữ liệu & giải thuật ĐH' },
        { name: 'Git', note: 'Quản lý mã nguồn & làm việc nhóm (GitHub / GitLab)' },
        { name: 'Linux', note: 'Quản trị máy chủ Ubuntu & dòng lệnh Bash' },
        { name: 'Tiếng Anh TOEIC 800', note: 'Đọc hiểu tài liệu kỹ thuật & giao tiếp công việc' },
        { name: 'Unit Testing (PyTest)', note: 'Kiểm thử tự động cho dịch vụ Backend' },
      ],
    },
  },
  {
    userId: 'usr-inst-khoa',
    fullName: 'TS. Trần Minh Khoa',
    email: 'khoa.tran@3tacademy.vn',
    role: 'INSTRUCTOR',
    avatarUrl: AVATAR_MINH_KHOA,
    interviewCredits: 99,
    cvParsedData: {
      fileName: 'Profile_TS_Tran_Minh_Khoa.pdf',
      updatedAt: '01/10/2026',
      fullName: 'TS. Trần Minh Khoa',
      headline: 'Giảng viên Trưởng Khối AI & Xử lý ngôn ngữ tự nhiên',
      email: 'khoa.tran@3tacademy.vn',
      phone: '0909 000 111',
      githubUrl: 'github.com/tranminhkhoa-ai',
      linkedinUrl: 'linkedin.com/in/tranminhkhoa',
      careerObjective: 'Nghiên cứu và đào tạo Kỹ sư AI Thực chiến tại 3T Academy.',
      projects: [],
      externalSkills: [],
    },
  },
  {
    userId: 'usr-admin-01',
    fullName: 'Ban Quản Trị Học Viện 3T',
    email: 'admin@3tacademy.vn',
    role: 'ADMIN',
    interviewCredits: 99,
    cvParsedData: {
      fileName: 'Admin_Profile.pdf',
      updatedAt: '01/10/2026',
      fullName: 'Ban Quản Trị Học Viện 3T',
      headline: 'Quản trị vận hành & Đào tạo 3T Academy',
      email: 'admin@3tacademy.vn',
      phone: '028 3888 9999',
      githubUrl: 'github.com/3t-academy',
      linkedinUrl: 'linkedin.com/company/3t-academy',
      careerObjective: 'Quản lý chất lượng đào tạo và cấp chứng chỉ tốt nghiệp.',
      projects: [],
      externalSkills: [],
    },
  },
];

/**
 * Bảng `student_skill_states`: Điểm kỹ năng 0-100 chỉ tính cho các khóa học đã đăng ký (K01 & K04)
 */
export const INITIAL_STUDENT_SKILL_STATES: StudentSkillStateRecord[] = [
  {
    userId: 'usr-student-01',
    code: 'PYTHON-CORE',
    name: 'Python',
    score: 94,
    masteryScore: 94,
    evidenceCount: 6,
    cohortId: 'cohort-py-k04',
    cohortCode: 'PY-DATA-2026-K04',
    courseTitle: 'Lập Trình Python & Phân Tích Dữ Liệu Thực Chiến',
    sourceLabel: 'Khóa Python Dữ Liệu K04 · Đã hoàn thành',
    updatedAt: '2026-11-08T10:00:00Z',
  },
  {
    userId: 'usr-student-01',
    code: 'PANDAS-ANALYTICS',
    name: 'Pandas',
    score: 88,
    masteryScore: 88,
    evidenceCount: 5,
    cohortId: 'cohort-py-k04',
    cohortCode: 'PY-DATA-2026-K04',
    courseTitle: 'Lập Trình Python & Phân Tích Dữ Liệu Thực Chiến',
    sourceLabel: 'Khóa Python Dữ Liệu K04 · Đã hoàn thành',
    updatedAt: '2026-11-08T10:00:00Z',
  },
  {
    userId: 'usr-student-01',
    code: 'FASTAPI-ASYNC',
    name: 'FastAPI',
    score: 91,
    masteryScore: 91,
    evidenceCount: 4,
    cohortId: 'cohort-ai-k01',
    cohortCode: 'AI-ENG-2026-K01',
    courseTitle: 'Kỹ Sư AI Thực Chiến: Xây Dựng Hệ Thống RAG & Agent Doanh Nghiệp',
    sourceLabel: 'Khóa Kỹ Sư AI K01 · Buổi 1 - Buổi 4',
    updatedAt: '2026-11-09T14:30:00Z',
  },
  {
    userId: 'usr-student-01',
    code: 'POSTGRES-SQL',
    name: 'PostgreSQL & SQL',
    score: 92,
    masteryScore: 92,
    evidenceCount: 4,
    cohortId: 'cohort-ai-k01',
    cohortCode: 'AI-ENG-2026-K01',
    courseTitle: 'Kỹ Sư AI Thực Chiến: Xây Dựng Hệ Thống RAG & Agent Doanh Nghiệp',
    sourceLabel: 'Khóa Kỹ Sư AI K01 · Buổi 3 & Buổi 4',
    updatedAt: '2026-11-09T14:30:00Z',
  },
  {
    userId: 'usr-student-01',
    code: 'HYBRID-RAG',
    name: 'RAG & Vector Search',
    score: 86,
    masteryScore: 86,
    evidenceCount: 4,
    cohortId: 'cohort-ai-k01',
    cohortCode: 'AI-ENG-2026-K01',
    courseTitle: 'Kỹ Sư AI Thực Chiến: Xây Dựng Hệ Thống RAG & Agent Doanh Nghiệp',
    sourceLabel: 'Khóa Kỹ Sư AI K01 · Buổi 3 & Buổi 5',
    updatedAt: '2026-11-09T14:30:00Z',
  },
  {
    userId: 'usr-student-01',
    code: 'AI-AGENTS',
    name: 'AI Agents',
    score: 82,
    masteryScore: 82,
    evidenceCount: 3,
    cohortId: 'cohort-ai-k01',
    cohortCode: 'AI-ENG-2026-K01',
    courseTitle: 'Kỹ Sư AI Thực Chiến: Xây Dựng Hệ Thống RAG & Agent Doanh Nghiệp',
    sourceLabel: 'Khóa Kỹ Sư AI K01 · Đang học Buổi 5',
    updatedAt: '2026-11-09T14:30:00Z',
  },
  {
    userId: 'usr-student-01',
    code: 'FINE-TUNING',
    name: 'Fine-tuning',
    score: 76,
    masteryScore: 76,
    evidenceCount: 3,
    cohortId: 'cohort-ai-k01',
    cohortCode: 'AI-ENG-2026-K01',
    courseTitle: 'Kỹ Sư AI Thực Chiến: Xây Dựng Hệ Thống RAG & Agent Doanh Nghiệp',
    sourceLabel: 'Khóa Kỹ Sư AI K01 · Thực hành chuyên đề',
    updatedAt: '2026-11-09T14:30:00Z',
  },
  {
    userId: 'usr-student-01',
    code: 'REDIS-CACHE',
    name: 'Redis',
    score: 85,
    masteryScore: 85,
    evidenceCount: 4,
    cohortId: 'cohort-ai-k01',
    cohortCode: 'AI-ENG-2026-K01',
    courseTitle: 'Kỹ Sư AI Thực Chiến: Xây Dựng Hệ Thống RAG & Agent Doanh Nghiệp',
    sourceLabel: 'Khóa Kỹ Sư AI K01 · Bộ nhớ đệm tốc độ cao',
    updatedAt: '2026-11-09T14:30:00Z',
  },
  {
    userId: 'usr-student-01',
    code: 'DOCKER-DEPLOY',
    name: 'Docker',
    score: 84,
    masteryScore: 84,
    evidenceCount: 4,
    cohortId: 'cohort-ai-k01',
    cohortCode: 'AI-ENG-2026-K01',
    courseTitle: 'Kỹ Sư AI Thực Chiến: Xây Dựng Hệ Thống RAG & Agent Doanh Nghiệp',
    sourceLabel: 'Khóa Kỹ Sư AI K01 · Đóng gói dịch vụ AI',
    updatedAt: '2026-11-09T14:30:00Z',
  },
];

/**
 * Bảng `payment_transactions`: Có `orderId` (nullable), `gateway: 'SEPAY_VIETQR'`,
 * `matchStatus` ('MATCHED' | 'UNMATCHED_ORDER' | 'AMOUNT_MISMATCH')
 */
export const INITIAL_PAYMENT_TRANSACTIONS: PaymentTransactionRecord[] = [
  {
    id: 'ptx-01',
    orderId: 'ord-8410',
    orderCode: 'ET20268410',
    gateway: 'SEPAY_VIETQR',
    amountVnd: 4900000,
    transferContent: 'ET20268410 NGUYEN VAN AN',
    referenceNumber: 'FT26285991023',
    matchStatus: 'MATCHED',
    processedAt: '12/10/2026 · 20:14',
  },
  {
    id: 'ptx-02',
    orderId: 'ord-8891',
    orderCode: 'ET20268891',
    gateway: 'SEPAY_VIETQR',
    amountVnd: 8500000,
    transferContent: 'ET20268891 KHOA AI K01',
    referenceNumber: 'FT26310882190',
    matchStatus: 'MATCHED',
    processedAt: '08/11/2026 · 09:30',
  },
  {
    id: 'ptx-03',
    orderId: null,
    orderCode: null,
    gateway: 'SEPAY_VIETQR',
    amountVnd: 8500000,
    transferContent: 'CHUYEN KHOAN HOC PHI AI K01 QUEN GHI MA DON',
    referenceNumber: 'FT26312004512',
    matchStatus: 'UNMATCHED_ORDER',
    processedAt: '09/11/2026 · 15:20',
  },
  {
    id: 'ptx-04',
    orderId: 'ord-8905',
    orderCode: 'ET20268905',
    gateway: 'SEPAY_VIETQR',
    amountVnd: 5000000,
    transferContent: 'ET20268905 DONG TRUOC HOC PHI',
    referenceNumber: 'FT26313991044',
    matchStatus: 'AMOUNT_MISMATCH',
    processedAt: '10/11/2026 · 11:05',
  },
];

/**
 * Bảng `assessments`: Có thêm trường `status` ('DRAFT' | 'PUBLISHED')
 */
export const INITIAL_ASSESSMENTS: AssessmentRecord[] = [
  {
    id: 'quiz-sess-ai-04',
    cohortId: 'cohort-ai-k01',
    sessionId: 'sess-ai-04',
    type: 'SESSION_QUIZ',
    title: 'Bài Kiểm Tra Mở Khóa Cuối Buổi 4 (10 câu Trắc nghiệm A, B, C, D)',
    status: 'PUBLISHED',
    timeLimitMinutes: 15,
    passingScoreOutOf10: 7.0,
  },
  {
    id: 'quiz-sess-ai-05',
    cohortId: 'cohort-ai-k01',
    sessionId: 'sess-ai-05',
    type: 'SESSION_QUIZ',
    title: 'Bài Kiểm Tra Mở Khóa Cuối Buổi 5 (10 câu Trắc nghiệm A, B, C, D)',
    status: 'DRAFT',
    timeLimitMinutes: 15,
    passingScoreOutOf10: 7.0,
  },
  {
    id: 'final-exam-cohort-ai-k01',
    cohortId: 'cohort-ai-k01',
    sessionId: null,
    type: 'FINAL_EXAM',
    title: 'Bài Thi Tốt Nghiệp Cuối Khóa Kỹ Sư AI Thực Chiến — Khóa K01 (25 câu A, B, C, D)',
    status: 'PUBLISHED',
    timeLimitMinutes: 45,
    passingScoreOutOf10: 7.0,
  },
];

/**
 * Bảng `mock_interviews`: Có `targetLevel`, `targetRole`, `jdRawText`, `cvScreeningResult`,
 * `transcriptLog`, `evaluationReport`, `status` ('CV_SCREENING' | 'IN_PROGRESS' | 'COMPLETED')
 */
export const INITIAL_MOCK_INTERVIEWS: MockInterviewRecord[] = [
  {
    id: 'intv-completed-01',
    userId: 'usr-student-01',
    targetLevel: 'FRESHER',
    targetRole: 'Kỹ Sư AI & Hệ Thống Tìm Kiếm Tri Thức (AI Engineer)',
    jdRawText:
      'Vị trí: AI Engineer (RAG & LLM). Yêu cầu: Nắm vững Python, FastAPI, PostgreSQL (pgvector); có kinh nghiệm xử lý tài liệu PDF/Word giữ nguyên bảng biểu, thiết kế Hybrid Search (BM25 + Vector), kiểm soát trích dẫn nguồn và phân quyền truy cập tài liệu theo phòng ban.',
    cvScreeningResult: {
      matchPercent: 78,
      passedGate: true,
      layoutAndPresentationFeedback:
        'Bố cục CV 1 trang A4 rõ ràng, phân tách mạch lạc giữa Mục tiêu nghề nghiệp, Dự án thực chiến và Kỹ năng công nghệ. Các gạch đầu dòng trong dự án đã sử dụng động từ hành động kèm con số định lượng (< 800ms, 100+ trang PDF).',
      jdMatchEvaluation:
        'Hồ sơ CV khớp 78% với yêu cầu tuyển dụng AI Engineer: Đã thể hiện rõ kinh nghiệm thực chiến với Python, FastAPI, PostgreSQL (pgvector) và xây dựng luồng Hybrid Search bảo toàn bảng biểu PDF.',
      missingKeywordsOrGaps: [
        'Nên bổ sung rõ hơn cách thiết lập bộ lọc phân quyền phòng ban ở tầng truy vấn SQL.',
        'Nhấn mạnh thêm chỉ số đánh giá độ chính xác trích dẫn nguồn trong dự án đầu tiên.',
      ],
    },
    transcriptLog: [
      {
        speaker: 'SENIOR_AI',
        speakerLabel: 'TS. Trần Minh Khoa (Chuyên gia Phỏng vấn AI)',
        stageTag: 'Câu 1/3 · Xác thực dự án trong CV',
        text: 'Chào An! Trong CV anh thấy em có làm dự án Hệ thống Trợ lý AI Tra cứu Tài liệu Nội bộ. Em hãy chia sẻ cách em xử lý các bảng số liệu dài trong file PDF để không bị mất dòng tiêu đề cột khi chia đoạn nhé?',
      },
      {
        speaker: 'STUDENT',
        speakerLabel: 'Nguyễn Văn An (Trả lời bằng giọng nói)',
        text: 'Dạ em dùng bộ đọc cấu trúc tài liệu để nhận diện từng bảng biểu, chuyển sang dạng Markdown và tự động gắn lại dòng tiêu đề cột kèm số trang gốc vào đầu mỗi đoạn cắt nhỏ ạ.',
      },
    ],
    evaluationReport: {
      overallScore: 89,
      projectDepthScore: 92,
      communicationScore: 88,
      strengths: [
        'Hiểu sâu bản chất kỹ thuật của dự án đã ghi trong CV, giải thích rõ cách bảo toàn bảng biểu PDF.',
        'Trình bày mạch lạc, đi thẳng vào giải pháp thực tế và nêu được con số đo lường cụ thể.',
      ],
      improvements: [
        'Khi trả lời về tối ưu tốc độ phản hồi, nên nói rõ hơn cách kết hợp chạy song song hai nhánh tìm kiếm.',
      ],
    },
    status: 'COMPLETED',
    createdAt: '2026-11-09T19:00:00Z',
  },
];

/**
 * Bảng `enrollments` (`Enrollment`):
 * Có `dropoutRiskScore` (0.0 -> 1.0) và `riskLevel` ('LOW' | 'MEDIUM' | 'HIGH')
 */
export const INITIAL_ENROLLMENTS: Enrollment[] = [
  {
    id: 'enr-k01-01',
    userId: 'usr-student-01',
    studentName: 'Nguyễn Văn An',
    studentEmail: 'an.nguyen.dev@gmail.com',
    cohortId: 'cohort-ai-k01',
    cohortCode: 'AI-ENG-2026-K01',
    status: 'ACTIVE',
    completedSessionsCount: 4,
    totalSessionsCount: 6,
    missingQuizzesCount: 0,
    avgScorePct: 86,
    lastActivityAt: '2026-11-10T18:30:00Z',
    dropoutRiskScore: 0.08,
    riskLevel: 'LOW',
  },
  {
    id: 'enr-k01-02',
    userId: 'usr-student-02',
    studentName: 'Lê Hoàng Mai',
    studentEmail: 'mai.le@gmail.com',
    cohortId: 'cohort-ai-k01',
    cohortCode: 'AI-ENG-2026-K01',
    status: 'ACTIVE',
    completedSessionsCount: 5,
    totalSessionsCount: 6,
    missingQuizzesCount: 0,
    avgScorePct: 92,
    lastActivityAt: '2026-11-10T19:10:00Z',
    dropoutRiskScore: 0.04,
    riskLevel: 'LOW',
  },
  {
    id: 'enr-k01-03',
    userId: 'usr-student-03',
    studentName: 'Phạm Thu Hà',
    studentEmail: 'ha.pham.data@gmail.com',
    cohortId: 'cohort-ai-k01',
    cohortCode: 'AI-ENG-2026-K01',
    status: 'ACTIVE',
    completedSessionsCount: 3,
    totalSessionsCount: 6,
    missingQuizzesCount: 1,
    avgScorePct: 74,
    lastActivityAt: '2026-11-08T14:20:00Z',
    dropoutRiskScore: 0.46,
    riskLevel: 'MEDIUM',
  },
  {
    id: 'enr-k01-04',
    userId: 'usr-student-04',
    studentName: 'Trần Minh Quân',
    studentEmail: 'quan.tran.dev@gmail.com',
    cohortId: 'cohort-ai-k01',
    cohortCode: 'AI-ENG-2026-K01',
    status: 'ACTIVE',
    completedSessionsCount: 2,
    totalSessionsCount: 6,
    missingQuizzesCount: 2,
    avgScorePct: 58,
    lastActivityAt: '2026-11-03T09:15:00Z',
    dropoutRiskScore: 0.84,
    riskLevel: 'HIGH',
  },
  {
    id: 'enr-k01-05',
    userId: 'usr-student-05',
    studentName: 'Vũ Đức Anh',
    studentEmail: 'anh.vu@gmail.com',
    cohortId: 'cohort-ai-k01',
    cohortCode: 'AI-ENG-2026-K01',
    status: 'ACTIVE',
    completedSessionsCount: 1,
    totalSessionsCount: 6,
    missingQuizzesCount: 3,
    avgScorePct: 48,
    lastActivityAt: '2026-10-30T21:00:00Z',
    dropoutRiskScore: 0.91,
    riskLevel: 'HIGH',
  },
  {
    id: 'enr-k01-06',
    userId: 'usr-student-06',
    studentName: 'Đỗ Quốc Khánh',
    studentEmail: 'khanh.do@techcorp.vn',
    cohortId: 'cohort-ai-k01',
    cohortCode: 'AI-ENG-2026-K01',
    status: 'ACTIVE',
    completedSessionsCount: 2,
    totalSessionsCount: 6,
    missingQuizzesCount: 2,
    avgScorePct: 62,
    lastActivityAt: '2026-11-04T16:40:00Z',
    dropoutRiskScore: 0.78,
    riskLevel: 'HIGH',
  },
  {
    id: 'enr-k02-01',
    userId: 'usr-student-07',
    studentName: 'Hoàng Gia Bảo',
    studentEmail: 'bao.hoang@gmail.com',
    cohortId: 'cohort-ai-k02',
    cohortCode: 'AI-ENG-2026-K02',
    status: 'ACTIVE',
    completedSessionsCount: 0,
    totalSessionsCount: 6,
    missingQuizzesCount: 2,
    avgScorePct: 50,
    lastActivityAt: '2026-11-02T11:00:00Z',
    dropoutRiskScore: 0.82,
    riskLevel: 'HIGH',
  },
  {
    id: 'enr-py-01',
    userId: 'usr-student-08',
    studentName: 'Vũ Đình Khôi',
    studentEmail: 'khoi.vu@fpt.com',
    cohortId: 'cohort-py-k04',
    cohortCode: 'PY-DATA-2026-K04',
    status: 'COMPLETED',
    completedSessionsCount: 6,
    totalSessionsCount: 6,
    missingQuizzesCount: 0,
    avgScorePct: 91,
    lastActivityAt: '2026-11-09T20:00:00Z',
    dropoutRiskScore: 0.02,
    riskLevel: 'LOW',
  },
];

/**
 * Bảng `chat_messages` (`ChatMessage`):
 * Có `detectedTopic` gắn nhãn tự động cho từng câu hỏi gửi tới AI
 */
export const INITIAL_CHAT_MESSAGES: ChatMessage[] = [
  {
    id: 'msg-01',
    sessionId: 'sess-ai-04',
    cohortId: 'cohort-ai-k01',
    userId: 'usr-student-01',
    studentName: 'Nguyễn Văn An',
    senderRole: 'STUDENT',
    content: 'Làm sao giữ nguyên tiêu đề cột khi chia đoạn bảng biểu PDF dài 100 trang trong hệ thống RAG?',
    detectedTopic: 'RAG & Vector Search',
    latencyMs: 480,
    tokensUsed: 620,
    createdAt: '2026-11-09T20:12:00Z',
  },
  {
    id: 'msg-02',
    sessionId: 'sess-ai-05',
    cohortId: 'cohort-ai-k01',
    userId: 'usr-student-02',
    studentName: 'Lê Hoàng Mai',
    senderRole: 'STUDENT',
    content: 'Cách kết hợp điểm BM25 và khoảng cách Cosine bằng công thức RRF trong truy vấn?',
    detectedTopic: 'RAG & Vector Search',
    latencyMs: 510,
    tokensUsed: 740,
    createdAt: '2026-11-10T10:15:00Z',
  },
  {
    id: 'msg-03',
    sessionId: 'sess-ai-03',
    cohortId: 'cohort-ai-k01',
    userId: 'usr-student-03',
    studentName: 'Phạm Thu Hà',
    senderRole: 'STUDENT',
    content: 'Cách tạo chỉ mục HNSW trên pgvector và lọc phân quyền phòng ban ngay trong câu lệnh SQL?',
    detectedTopic: 'PostgreSQL & SQL',
    latencyMs: 495,
    tokensUsed: 680,
    createdAt: '2026-11-10T11:30:00Z',
  },
  {
    id: 'msg-04',
    sessionId: 'sess-ai-04',
    cohortId: 'cohort-ai-k01',
    userId: 'usr-student-04',
    studentName: 'Trần Minh Quân',
    senderRole: 'STUDENT',
    content: 'Middleware kiểm tra JWT và giới hạn dung lượng upload file PDF trong FastAPI cấu hình thế nào?',
    detectedTopic: 'FastAPI',
    latencyMs: 530,
    tokensUsed: 590,
    createdAt: '2026-11-10T14:05:00Z',
  },
  {
    id: 'msg-05',
    sessionId: 'sess-ai-03',
    cohortId: 'cohort-ai-k01',
    userId: 'usr-student-01',
    studentName: 'Nguyễn Văn An',
    senderRole: 'STUDENT',
    content: 'Khi dùng asyncio.gather trong Python để gọi song song 2 nhánh tìm kiếm thì xử lý timeout ra sao?',
    detectedTopic: 'Python',
    latencyMs: 460,
    tokensUsed: 510,
    createdAt: '2026-11-10T15:20:00Z',
  },
  {
    id: 'msg-06',
    sessionId: 'sess-ai-05',
    cohortId: 'cohort-ai-k01',
    userId: 'usr-student-02',
    studentName: 'Lê Hoàng Mai',
    senderRole: 'STUDENT',
    content: 'Chiến lược lưu Semantic Cache trên Redis để giảm chi phí gọi LLM cho các câu hỏi trùng lặp?',
    detectedTopic: 'Redis',
    latencyMs: 505,
    tokensUsed: 640,
    createdAt: '2026-11-10T16:10:00Z',
  },
  {
    id: 'msg-07',
    sessionId: 'sess-ai-06',
    cohortId: 'cohort-ai-k01',
    userId: 'usr-student-06',
    studentName: 'Đỗ Quốc Khánh',
    senderRole: 'STUDENT',
    content: 'Cách viết multi-stage Dockerfile nhẹ nhất cho dịch vụ AI Python + FastAPI?',
    detectedTopic: 'Docker',
    latencyMs: 520,
    tokensUsed: 580,
    createdAt: '2026-11-10T17:00:00Z',
  },
];

/**
 * Bảng `notifications` (`Notification`):
 * Có `actedAt` (ISO timestamp khi học viên bấm vào thông báo nhắc nhở AI và quay lại hoàn thành bài học)
 */
export const INITIAL_NOTIFICATIONS: Notification[] = [
  {
    id: 'notif-ai-01',
    userId: 'usr-student-01',
    studentName: 'Nguyễn Văn An',
    cohortId: 'cohort-ai-k01',
    cohortCode: 'AI-ENG-2026-K01',
    type: 'AI_STUDY_REMINDER',
    title: 'Nhắc ôn tập Buổi 4 & Làm bài kiểm tra mở khóa',
    message:
      'Chào An! Bạn đã xem 85% video Buổi 4. Chỉ cần dành 10 phút hoàn thành bài trắc nghiệm là mở khóa xong tài liệu Buổi 5 nhé.',
    isRead: true,
    sentAt: '2026-11-08T09:00:00Z',
    readAt: '2026-11-08T10:15:00Z',
    actedAt: '2026-11-08T10:42:00Z',
  },
  {
    id: 'notif-ai-02',
    userId: 'usr-student-03',
    studentName: 'Phạm Thu Hà',
    cohortId: 'cohort-ai-k01',
    cohortCode: 'AI-ENG-2026-K01',
    type: 'AI_STUDY_REMINDER',
    title: 'Gợi ý ôn lại phần chỉ mục HNSW trong Buổi 3',
    message:
      'Chào Hà! Trợ giảng AI đã tổng hợp đoạn video ngắn phút 18:45 giúp bạn nắm chắc phần truy vấn pgvector trước khi làm bài kiểm tra Buổi 4.',
    isRead: true,
    sentAt: '2026-11-09T08:30:00Z',
    readAt: '2026-11-09T12:10:00Z',
    actedAt: '2026-11-09T19:20:00Z',
  },
  {
    id: 'notif-ai-03',
    userId: 'usr-student-04',
    studentName: 'Trần Minh Quân',
    cohortId: 'cohort-ai-k01',
    cohortCode: 'AI-ENG-2026-K01',
    type: 'AI_STUDY_REMINDER',
    title: 'Lộ trình 20 phút bắt kịp tiến độ Buổi 3 & Buổi 4',
    message:
      'Chào Quân! Mình thấy 6 ngày qua bạn bận chưa vào lớp. AI đã tóm tắt 3 ý trọng tâm của Buổi 3 để bạn xem nhanh trong 15 phút tối nay nhé.',
    isRead: true,
    sentAt: '2026-11-09T14:00:00Z',
    readAt: '2026-11-09T18:05:00Z',
    actedAt: null,
  },
  {
    id: 'notif-ai-04',
    userId: 'usr-student-05',
    studentName: 'Vũ Đức Anh',
    cohortId: 'cohort-ai-k01',
    cohortCode: 'AI-ENG-2026-K01',
    type: 'AI_STUDY_REMINDER',
    title: 'Hỗ trợ cá nhân hóa giúp bạn hoàn thành Buổi 2 & Buổi 3',
    message:
      'Chào Đức Anh! Nếu bạn đang vướng phần thực hành chia nhỏ tài liệu PDF, bấm vào đây để xem hướng dẫn từng bước từ Trợ giảng AI nhé.',
    isRead: false,
    sentAt: '2026-11-10T08:00:00Z',
    readAt: null,
    actedAt: null,
  },
  {
    id: 'notif-ai-05',
    userId: 'usr-student-06',
    studentName: 'Đỗ Quốc Khánh',
    cohortId: 'cohort-ai-k01',
    cohortCode: 'AI-ENG-2026-K01',
    type: 'AI_STUDY_REMINDER',
    title: 'Nhắc hoàn thành bài kiểm tra ngắn trước ca Live Buổi 5',
    message:
      'Chào Khánh! Tối nay lớp K01 học trực tuyến Buổi 5 lúc 19:30. Bạn bấm vào đây để làm nhanh 10 câu trắc nghiệm Buổi 4 nhé.',
    isRead: true,
    sentAt: '2026-11-10T09:30:00Z',
    readAt: '2026-11-10T11:00:00Z',
    actedAt: '2026-11-10T13:15:00Z',
  },
];

