export const projects = [
  {
    id: "smart-campaign-diagnostics",
    category: "tech", // 'product' or 'tech'
    tags: ["Product Strategy", "System Architecture", "AdTech"],
    title: {
      vi: "Hệ thống Chẩn đoán Chiến dịch Quảng cáo 3 tầng",
      en: "Three-Tier Ad Campaign Diagnostic System"
    },
    subtitle: {
      vi: "Giải quyết bài toán tối ưu quảng cáo TikTok Ads tự động với độ trễ thấp.",
      en: "Solving real-time auto-optimization for high-scale TikTok Ads campaigns."
    },
    metrics: {
      vi: "Tăng 25% ROI, Giảm 40% Thời gian tìm lỗi",
      en: "+25% ROI, -40% Issue Resolution Time"
    },
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop",
    details: {
      vi: {
        context: "Nền tảng chạy quảng cáo tự động TikTok Ads Smart+ thường xuyên gặp tình trạng tụt phân phối hoặc chi tiêu không hiệu quả mà không rõ nguyên nhân. Nhà bán hàng cần biết chính xác lỗi nằm ở đâu (tài khoản, nhóm quảng cáo hay nội dung sáng tạo) để tối ưu ngay lập tức.",
        problem: "Mỗi giây trôi qua mà không phát hiện lỗi gây lãng phí hàng ngàn USD ngân sách quảng cáo. Các hệ thống chẩn đoán cũ chạy dạng batch-job định kỳ 2 tiếng, quá chậm để ứng phó với biến động real-time của TikTok. Hơn nữa, việc tích hợp API trực tiếp từ TikTok dễ bị nghẽn (rate-limit).",
        solution: "Thiết kế hệ thống chẩn đoán 3 tầng (Account -> Campaign -> Creative):\n1. Tầng Thu Thập Cận Real-time: Sử dụng hàng đợi Kafka và cơ chế Webhook để nhận tín hiệu thay đổi trạng thái quảng cáo ngay lập tức.\n2. Tầng Engine Phân Tích: Áp dụng tập luật (Rules engine) được tối ưu hóa, cô lập logic nghiệp vụ quảng cáo tách biệt với tầng kết nối API.\n3. Tầng Hiển Thị (UI): Dashboard trực quan hóa sơ đồ cây lỗi, đưa ra đề xuất hành động cụ thể cho nhà quảng cáo.",
        result: "Hệ thống giảm thời gian phát hiện và cảnh báo lỗi từ 2 giờ xuống còn 3 phút. Giúp khách hàng giảm 18% chi phí lãng phí do lỗi cài đặt, đồng thời giảm tải số lượng request gọi trực tiếp lên TikTok API nhờ cơ chế caching thông minh ở tầng Adapter."
      },
      en: {
        context: "The automated TikTok Smart+ campaign optimization platform frequently faced drop-offs in delivery or cost-inefficiency without clear explanations. Advertisers needed to pinpoint issues (account status, ad group configs, or creative elements) instantly to apply changes.",
        problem: "Every second with an undetected issue wasted thousands of dollars in ad budget. Legacy diagnostic jobs ran as batch jobs every 2 hours, which was too slow. Additionally, direct integrations with TikTok APIs were prone to rate-limiting bottlenecks.",
        solution: "Designed and led the engineering of a 3-tier diagnostic framework:\n1. Near Real-time Ingestion Layer: Built on Kafka and webhook listeners to capture ad state changes on the fly.\n2. Rules Engine Layer: Created an decoupled rule engine, keeping business rules independent from third-party API integration code.\n3. Visual Analytics Layer: An interactive diagnostic tree showing direct problem nodes with recommended fixes.",
        result: "Reduced average detection time from 2 hours to under 3 minutes. Saved advertisers 18% in waste ad spend due to misconfiguration, and decreased overall TikTok API request volume by caching intermediate states in an Adapter layer."
      }
    }
  },
  {
    id: "credits-monetization-engine",
    category: "product",
    tags: ["Microservices", "Fintech / Billing", "Product Operations"],
    title: {
      vi: "Hệ thống Monetization & Ví Tín dụng Doanh nghiệp",
      en: "Enterprise Credit-Based Billing & Monetization Engine"
    },
    subtitle: {
      vi: "Xây dựng core billing và hệ thống thanh toán tự động cho nền tảng SaaS.",
      en: "Re-architecting core billing and automated credit system for a high-growth SaaS."
    },
    metrics: {
      vi: "Xử lý $2M+ giao dịch mỗi tháng, Sai sót 0%",
      en: "$2M+ Monthly Transaction Volume, 0% Discrepancy"
    },
    image: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?q=80&w=800&auto=format&fit=crop",
    details: {
      vi: {
        context: "Nền tảng ban đầu sử dụng cơ chế trả phí hàng tháng cố định, không phản ánh đúng mức độ sử dụng tài nguyên hệ thống (như API calls, AI video generation) của từng khách hàng, làm tăng chi phí vận hành hạ tầng.",
        problem: "Cần xây dựng hệ thống nạp tiền và trừ ví tín dụng (credits) theo thời gian thực để hỗ trợ thanh toán pay-as-you-go, yêu cầu tính nhất quán cao (ACID) để tránh thất thoát tiền bạc, đồng thời phải đảm bảo không ảnh hưởng đến tốc độ của luồng nghiệp vụ chính.",
        solution: "Đóng vai trò Product Lead hợp tác cùng Tech Lead để triển khai:\n1. Chuyển đổi mô hình định giá sang Credit-based với đơn vị tiền ảo tiêu chuẩn.\n2. Xây dựng dịch vụ Billing chuyên biệt (decoupled ledger) sử dụng cơ chế Event Sourcing để ghi nhận mọi biến động tài khoản.\n3. Thiết kế hệ thống cảnh báo tự động khi số dư ví của khách hàng xuống dưới ngưỡng tối thiểu.",
        result: "Hệ thống đi vào hoạt động ổn định giúp tăng doanh thu trung bình trên mỗi khách hàng (ARPU) thêm 32%, giảm 15% chi phí hạ tầng lãng phí cho các tài khoản không hoạt động nhưng vẫn tiêu tốn tài nguyên chạy ngầm."
      },
      en: {
        context: "The platform originally used a flat-rate monthly subscription, which didn't scale with actual resource consumption (such as API calls, AI video generation credits), driving up infrastructure overhead.",
        problem: "Needed a real-time ledger to handle credit deposits and deductions. It demanded strict ACID transaction guarantees to prevent financial discrepancies, while avoiding performance overhead on the core optimization routines.",
        solution: "Collaborated as Product Lead with engineering team to implement:\n1. Value-based pricing transformation based on standard platform credits.\n2. Designed an decoupled ledger service using Event Sourcing for auditability and high consistency.\n3. Implemented a auto-top-up and near-empty threshold alerting system.",
        result: "Billing engine successfully launched, driving Average Revenue Per User (ARPU) up by 32%. Reduced infrastructure cost overhead by 15% through scaling resources directly alongside active credit consumption."
      }
    }
  },
  {
    id: "ai-video-creative-gen",
    category: "product",
    tags: ["Gen AI", "Video Processing", "SaaS Growth"],
    title: {
      vi: "Công cụ Tự động Hóa Sản xuất Video Quảng cáo bằng AI",
      en: "AI-Powered Automated Video Creative Generator"
    },
    subtitle: {
      vi: "Sử dụng AI tạo hàng loạt video quảng cáo TikTok chất lượng cao từ link sản phẩm.",
      en: "Generating bulk high-performing TikTok ad creatives from product links using GenAI."
    },
    metrics: {
      vi: "Sản xuất 10,000+ video/ngày, Click-Through-Rate tăng 40%",
      en: "10,000+ Videos Daily, +40% Average Click-Through Rate"
    },
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop",
    details: {
      vi: {
        context: "Trong quảng cáo TikTok, 'creative fatigue' (quảng cáo bị nhàm chán) diễn ra cực nhanh (chỉ từ 3-5 ngày). Các đội ngũ e-commerce thường xuyên thiếu hụt video mới chất lượng để duy trì hiệu quả quảng cáo.",
        problem: "Thuê Agency sản xuất video rất đắt đỏ và tốn thời gian (2-3 ngày/video). Các công cụ AI hiện tại chỉ tập trung vào việc tạo ảnh hoặc viết text, thiếu khả năng ghép thành video có cấu trúc kịch bản chuyển đổi cao.",
        solution: "Phát triển tính năng AI Video Generator ngay trên nền tảng:\n1. Kịch bản hóa: Hệ thống phân tích link sản phẩm, tự động bóc tách USP (Unique Selling Points), tạo kịch bản 3 phần (Hook -> Body -> CTA).\n2. Video Engine: Tích hợp với dịch vụ chuyển văn bản thành giọng nói (TTS) tiếng Việt/Anh và tự động chèn clip sản phẩm nền, hiệu ứng chữ chạy theo nhịp nhạc.\n3. A/B Testing: Tự động nhân bản nhiều phiên bản có Hook khác nhau để tối ưu chiến dịch.",
        result: "Giảm thời gian tạo video từ vài ngày xuống còn 60 giây. Đã có hơn 100,000 video được tạo lập, mang lại tỷ lệ nhấp chuột (CTR) trung bình cao hơn 40% so với các video tĩnh trước đó nhờ khả năng tạo Hook ấn tượng."
      },
      en: {
        context: "TikTok advertising suffers from rapid creative fatigue (usually within 3 to 5 days). E-commerce advertisers struggled to constantly design new video creatives to keep their campaigns profitable.",
        problem: "Hiring agencies for video production is costly and slow. Existing AI tools generated static images or ad copies, lacking the capacity to stitch dynamic assets into high-converting video structures.",
        solution: "Spearheaded the development of a productized AI Video Generator:\n1. Ad Scripting: Extracted product USPs from raw URLs and formatted them into a 3-part marketing script (Hook, Body, Call to Action).\n2. Automated Video Compositing: Integrated Text-to-Speech engines, backing tracks, dynamic subtitle overlays, and smart asset cropping.\n3. Automatic Variation: Rendered 5 variable 'Hook' variations per asset to facilitate easy A/B testing.",
        result: "Shortened creative creation workflow from days to under 60 seconds. Generated over 100,000 active videos, boosting average CTR by 40% compared to baseline static ad assets."
      }
    }
  }
];
