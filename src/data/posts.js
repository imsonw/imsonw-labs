export const posts = [
  {
    id: "tiktok-api-adapter",
    category: "Architecture",
    tags: ["API Integration", "Design Patterns", "Reliability"],
    date: "2026-07-08",
    readTime: 6,
    title: {
      vi: "Tại sao chúng tôi cô lập API TikTok Ads phía sau tầng Adapter?",
      en: "Why we isolated the TikTok Ads API behind an Adapter layer"
    },
    summary: {
      vi: "Bài học xương máu khi tích hợp API bên thứ ba ở quy mô lớn: cách đối phó với rate-limit, thay đổi API đột ngột và tối ưu hóa chi phí.",
      en: "Lessons learned from integrating third-party APIs at scale: handling rate limits, sudden API changes, and optimizing system reliability."
    },
    content: {
      vi: [
        { type: "paragraph", text: "Khi xây dựng các nền tảng tối ưu hóa quảng cáo tự động, việc giao tiếp với API của các đối tác lớn như TikTok hay Facebook là điều bắt buộc. Tuy nhiên, việc trực tiếp nhúng các cuộc gọi API này vào luồng xử lý chính của ứng dụng là một sai lầm kiến trúc phổ biến mà nhiều đội ngũ gặp phải." },
        { type: "heading", text: "Thách thức từ API bên thứ ba" },
        { type: "paragraph", text: "API của các mạng quảng cáo thường có 3 đặc điểm khiến các kỹ sư hệ thống phải đau đầu:" },
        { type: "list", items: [
          "Giới hạn lượt gọi (Rate Limiting) nghiêm ngặt và thay đổi liên tục theo chất lượng tài khoản.",
          "Thay đổi cấu trúc dữ liệu trả về đột ngột (breaking changes) mà đôi khi tài liệu hướng dẫn chưa kịp cập nhật.",
          "Độ trễ (Latency) không ổn định, có thể dao động từ 100ms đến vài giây cho một request."
        ] },
        { type: "paragraph", text: "Ban đầu, khi hệ thống của chúng tôi còn nhỏ, việc gọi trực tiếp API từ controller diễn ra suôn sẻ. Nhưng khi số lượng tài khoản quảng cáo tăng lên hàng ngàn, hệ thống bắt đầu nghẽn. Giao dịch bị treo, và việc một tài khoản bị rate-limit có thể kéo sập luồng chẩn đoán của toàn bộ các tài khoản khác." },
        { type: "heading", text: "Giải pháp: Thiết kế mẫu Adapter Layer" },
        { type: "paragraph", text: "Chúng tôi quyết định tách rời hoàn toàn logic nghiệp vụ (Business Logic) của hệ thống khỏi API TikTok bằng một tầng trung gian gọi là Adapter. Adapter Layer hoạt động như một bức tường ngăn cách:" },
        { type: "code", language: "javascript", code: `// Cấu trúc đơn giản của Adapter giao tiếp TikTok API
class TikTokServiceAdapter {
  constructor(client, cacheService, queueService) {
    this.client = client;
    this.cache = cacheService;
    this.queue = queueService;
  }

  async getAdGroupStatus(adGroupId) {
    // 1. Kiểm tra cache trước để tránh gọi API lặp lại
    const cachedData = await this.cache.get(\`adgroup:\${adGroupId}\`);
    if (cachedData) return cachedData;

    // 2. Sử dụng hàng đợi điều tiết (Rate-limiting queue) nếu API quá tải
    const isRateLimited = await this.cache.get('tiktok_api_rate_limited');
    if (isRateLimited) {
      throw new Error('API is rate limited. Action queued.');
    }

    try {
      const response = await this.client.get(\`/adgroup/info\`, { id: adGroupId });
      const normalizedData = this.normalizeResponse(response);
      await this.cache.set(\`adgroup:\${adGroupId}\`, normalizedData, 300); // cache 5 mins
      return normalizedData;
    } catch (error) {
      return this.handleApiError(error, adGroupId);
    }
  }

  normalizeResponse(rawResponse) {
    // Chuẩn hóa dữ liệu TikTok trả về thành cấu trúc nội bộ của hệ thống
    return {
      id: rawResponse.adgroup_id,
      status: rawResponse.opt_status === 'STATUS_ENABLE' ? 'active' : 'paused',
      budget: rawResponse.budget_type === 'BUDGET_MODE_INFINITE' ? null : rawResponse.budget
    };
  }
}` },
        { type: "paragraph", text: "Bằng cách chuẩn hóa dữ liệu đầu ra thông qua hàm `normalizeResponse`, toàn bộ code lõi của hệ thống của chúng tôi không cần biết TikTok thay đổi tên trường dữ liệu như thế nào. Nếu TikTok thay đổi API, chúng tôi chỉ cần sửa duy nhất hàm normalize này tại tầng Adapter." },
        { type: "heading", text: "Kết quả đạt được" },
        { type: "paragraph", text: "Sau khi triển khai Adapter Layer kết hợp cùng redis-caching và rate-limit queue, hệ thống đã đạt được những cải tiến vượt bậc:" },
        { type: "list", items: [
          "Số lượng request bị lỗi do Rate-limit giảm 92%.",
          "Thời gian phản hồi trung bình của hệ thống nội bộ giảm từ 850ms xuống còn 45ms.",
          "Khi TikTok nâng cấp phiên bản API v3.1, chúng tôi chỉ mất 3 giờ để cấu hình lại Adapter thay vì phải refactor toàn bộ dự án như trước đây."
        ] },
        { type: "quote", text: "Kiến trúc tốt không phải là viết code chạy được ngay, mà là viết code sao cho việc thay đổi hoặc vứt bỏ nó sau này trở nên dễ dàng nhất.", author: "Product/Tech Lead" }
      ],
      en: [
        { type: "paragraph", text: "When building automated ad optimization engines, integrating with external platforms like TikTok or Facebook is unavoidable. However, executing raw API calls directly within your primary business services is a frequent architectural bottleneck." },
        { type: "heading", text: "Third-Party API Realities" },
        { type: "paragraph", text: "Ad network APIs present unique operational hurdles:" },
        { type: "list", items: [
          "Strict and volatile Rate Limiting thresholds based on account metrics.",
          "Sudden payload changes (breaking API changes) with delayed documentation updates.",
          "Highly unpredictable response latency ranging from 100ms to multiple seconds."
        ] },
        { type: "paragraph", text: "At first, direct API queries worked well. But as we scaled to thousands of active accounts, transactions backed up. High latency on one account's request starved resources, slowing down the diagnostics for other accounts." },
        { type: "heading", text: "The Solution: Decoupling via the Adapter Pattern" },
        { type: "paragraph", text: "We decided to build an independent Adapter Layer to isolate our core logic from the TikTok API details. It acts as an abstraction barrier:" },
        { type: "code", language: "javascript", code: `// Minimal layout of our API Adapter pattern
class TikTokServiceAdapter {
  constructor(client, cacheService, queueService) {
    this.client = client;
    this.cache = cacheService;
    this.queue = queueService;
  }

  async getAdGroupStatus(adGroupId) {
    // 1. Check local cache to bypass API hit
    const cachedData = await this.cache.get(\`adgroup:\${adGroupId}\`);
    if (cachedData) return cachedData;

    // 2. Throttle traffic if we hit rate limits
    const isRateLimited = await this.cache.get('tiktok_api_rate_limited');
    if (isRateLimited) {
      throw new Error('API is rate limited. Action queued.');
    }

    try {
      const response = await this.client.get(\`/adgroup/info\`, { id: adGroupId });
      const normalizedData = this.normalizeResponse(response);
      await this.cache.set(\`adgroup:\${adGroupId}\`, normalizedData, 300); // cache 5 mins
      return normalizedData;
    } catch (error) {
      return this.handleApiError(error, adGroupId);
    }
  }

  normalizeResponse(rawResponse) {
    // Standardize TikTok payload into our internal system entities
    return {
      id: rawResponse.adgroup_id,
      status: rawResponse.opt_status === 'STATUS_ENABLE' ? 'active' : 'paused',
      budget: rawResponse.budget_type === 'BUDGET_MODE_INFINITE' ? null : rawResponse.budget
    };
  }
}` },
        { type: "paragraph", text: "By standardizing outputs in `normalizeResponse`, our core business logic remains entirely oblivious to external API schema alterations. If TikTok renames keys, we make a single change inside the Adapter." },
        { type: "heading", text: "Business and Performance Wins" },
        { type: "paragraph", text: "Implementing the Adapter pattern alongside caching and queueing brought significant improvements:" },
        { type: "list", items: [
          "Rate-limit error frequency dropped by 92%.",
          "Internal response latency fell from 850ms to 45ms.",
          "Upgrading to TikTok's v3.1 API took only 3 hours of work within the Adapter class, without touching any core logic files."
        ] },
        { type: "quote", text: "Good architecture is not about writing code that works today, it's about making future modifications or deprecation as painless as possible.", author: "Product/Tech Lead" }
      ]
    }
  },
  {
    id: "system-diagnostics-design",
    category: "Product Management",
    tags: ["Product Design", "System Design", "UX/UI"],
    date: "2026-07-01",
    readTime: 5,
    title: {
      vi: "Thiết kế Hệ thống Chẩn đoán Chiến dịch Quảng cáo thông minh",
      en: "Designing an Intelligent Ad Campaign Diagnostic System"
    },
    summary: {
      vi: "Cách kết hợp phân tích kỹ thuật và trải nghiệm người dùng để giải quyết nỗi đau của nhà quảng cáo khi tài khoản bị đứng đơn.",
      en: "How we blended tech diagnostics with user experience to solve a major advertiser pain point: stalled campaigns."
    },
    content: {
      vi: [
        { type: "paragraph", text: "Trong lĩnh vực chạy ads, đáng sợ nhất không phải là ads đắt, mà là ads đột nhiên 'đứng hình' (không phân phối hoặc chi tiêu bằng 0) mà không rõ lý do. Đây là một điểm cực kỳ đau đớn (major pain point) của khách hàng mà chúng tôi quyết tâm giải quyết." },
        { type: "heading", text: "Vấn đề từ góc nhìn sản phẩm" },
        { type: "paragraph", text: "Các nhà quảng cáo thường phải tự kiểm tra thủ công hàng chục cài đặt khác nhau:" },
        { type: "list", items: [
          "Số dư tài khoản quảng cáo còn tiền không?",
          "Trạng thái trang đích (Landing Page) có bị die không?",
          "Target đối tượng có quá hẹp không?",
          "Ngân sách hàng ngày đã cạn chưa?"
        ] },
        { type: "paragraph", text: "Nhà quảng cáo tốn trung bình 30 phút để kiểm tra hết các checklist này mỗi khi nhóm quảng cáo không chạy. Đội hỗ trợ (Support) cũng quá tải vì các câu hỏi lặp đi lặp lại." },
        { type: "heading", text: "Giải pháp: Thiết kế sơ đồ chẩn đoán dạng cây" },
        { type: "paragraph", text: "Chúng tôi xây dựng tính năng 'Chẩn đoán 1-click'. Hệ thống sẽ tự động quét toàn bộ trạng thái tài khoản thông qua API và hiển thị dưới dạng biểu đồ cây lỗi trực quan. Nhà tuyển dụng rất thích nghe cách chúng tôi chia nhỏ bài toán:" },
        { type: "paragraph", text: "Tầng 1 (Tài khoản): Kiểm tra số dư ví, trạng thái hoạt động của tài khoản quảng cáo. Nếu tài khoản bị vô hiệu hóa, dừng chẩn đoán ngay lập tức và đưa ra cảnh báo khẩn cấp." },
        { type: "paragraph", text: "Tầng 2 (Nhóm quảng cáo): Kiểm tra lịch chạy, target, thiết lập đấu thầu và tần suất phân phối. Phát hiện chồng chéo đối tượng (audience overlap) nếu chạy nhiều nhóm trùng nhau." },
        { type: "paragraph", text: "Tầng 3 (Nội dung sáng tạo): Kiểm tra độ hấp dẫn của video (CTR), tỷ lệ skip-rate, và độ phân giải hình ảnh chuẩn TikTok." },
        { type: "heading", text: "Bài học rút ra" },
        { type: "paragraph", text: "Khi làm Product cho các công cụ kỹ thuật (Technical Products), đừng chỉ đưa ra dữ liệu thô. Hãy dịch dữ liệu thô đó thành đề xuất hành động cụ thể (Actionable Insights). Thay vì báo: 'Cửa hàng của bạn có tỷ lệ thoát trang cao', hệ thống của chúng tôi khuyên: 'Landing page tải mất 4.5s (ngưỡng tốt là <2s). Hãy tối ưu ảnh banner để tăng 15% tỷ lệ chuyển đổi'." }
      ],
      en: [
        { type: "paragraph", text: "In digital advertising, the worst issue isn't expensive conversion rates; it's when campaigns suddenly stall (zero impressions/spend) without warning. This is a massive pain point for users that we decided to tackle head-on." },
        { type: "heading", text: "The Problem from a Product Standpoint" },
        { type: "paragraph", text: "Advertisers used to manually cross-check dozens of configuration fields:" },
        { type: "list", items: [
          "Does the ad account have enough balance?",
          "Is the landing page active and responsive?",
          "Is the target audience set too narrow?",
          "Has the daily budget limit been reached?"
        ] },
        { type: "paragraph", text: "It took users an average of 30 minutes to review these items every time an ad group stopped delivering. Customer support queues were flooded with repetitive debugging tickets." },
        { type: "heading", text: "The Solution: A Tree-Based Diagnostic flow" },
        { type: "paragraph", text: "We developed a '1-click Diagnostic' feature. The system programmatically scans configuration states via APIs and renders a visual diagnostic tree. Here is how we structured the detection paths:" },
        { type: "paragraph", text: "Level 1 (Account level): Verifies account status, payment methods, and balance thresholds. If the account is flagged, diagnostics halt immediately to prompt payment update." },
        { type: "paragraph", text: "Level 2 (Ad group level): Scans schedule configurations, targeting setups, bidding models, and audience overlap indexes across campaigns." },
        { type: "paragraph", text: "Level 3 (Creative level): Audits click-through rates (CTR), video watch rates, and resolution conformity rules." },
        { type: "heading", text: "Key Learnings" },
        { type: "paragraph", text: "Building Product features for technical users requires translating raw metrics into Actionable Insights. Instead of outputting 'High landing page bounce rate', our diagnostic engine suggests: 'Your landing page load time is 4.5s (target is <2s). Compress your banner images to save bandwidth and improve conversion rate by 15%.'" }
      ]
    }
  }
];
