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
        { type: "paragraph", text: "Building Product features for technical users requires translating raw metrics into Actionable Insights. Instead of outputting 'High landing page bounce rate', our diagnostic engine suggests: 'Your landing page load time is 4.5s (target is <2s). Compress your banner images to save bandwidth and improve conversion rate by 15%.'" }
      ]
    }
  },
  {
    id: "solid-principles-mobile",
    category: "Software Engineering",
    tags: ["SOLID", "Mobile Dev", "Clean Code", "Design Patterns"],
    date: "2026-07-10",
    readTime: 8,
    title: {
      vi: "Giải mã SOLID: Hiểu đúng, Áp dụng chuẩn trong Lập trình Mobile",
      en: "Demystifying SOLID: Applying Clean Principles in Mobile Development"
    },
    summary: {
      vi: "Bộ 5 nguyên tắc vàng giúp code của bạn dễ đọc, dễ bảo trì, dễ mở rộng và cực kỳ dễ viết Unit Test trong thế giới iOS/Android.",
      en: "The 5 golden design principles to make your iOS/Android code readable, maintainable, extensible, and extremely testable."
    },
    content: {
      vi: [
        { type: "paragraph", text: "Nếu bạn từng gặp tình trạng: 'Sửa một dòng code ở màn hình này, tự dưng màn hình kia bị lỗi' hoặc 'Muốn viết Unit Test nhưng không biết phải mock dữ liệu kiểu gì', thì thủ phạm chính là do dự án đang vi phạm các nguyên tắc SOLID." },
        { type: "paragraph", text: "SOLID là bộ 5 nguyên tắc vàng giúp code của bạn dễ đọc, dễ bảo trì, dễ mở rộng và cực kỳ dễ test. Hãy cùng tìm hiểu từng nguyên tắc qua các ví dụ siêu thực tế trong thế giới iOS/Android nhé." },
        
        { type: "heading", text: "1. S - Single Responsibility Principle (SRP): Nguyên tắc Đơn nhiệm" },
        { type: "quote", text: "Một Class chỉ nên giữ một trách nhiệm duy nhất (chỉ có duy nhất một lý do để thay đổi)." },
        { type: "paragraph", text: "Hãy tưởng tượng một người thợ xây. Nhiệm vụ của họ là xây tường. Nếu bạn bắt người thợ xây đó vừa phải đi xây, vừa phải kiêm luôn kế toán tính lương, vừa đi lái xe chở cát, thì khi có lỗi xảy ra (ví dụ: tính sai tiền lương), cả công trình sẽ bị đình trệ." },
        { type: "paragraph", text: "Trong lập trình Mobile, lỗi SRP phổ biến nhất là tạo ra các 'God Class' (thường là các View Controller hoặc ViewModel ôm đồm quá nhiều thứ)." },
        { type: "code", language: "swift", code: `// ❌ Code "Bad" (Vi phạm SRP)
class UserViewModel {
    var user: User?
    
    // 1. Quản lý logic hiển thị
    func formatUserName() -> String {
        return user?.name.uppercased() ?? ""
    }
    
    // 2. Kiêm luôn việc gọi API (Tải dữ liệu)
    func fetchUserData() {
        let url = URL(string: "https://api.com/user")!
        URLSession.shared.dataTask(with: url) { data, _, _ in
            // Parse JSON và gán dữ liệu
        }.resume()
    }
    
    // 3. Kiêm luôn lưu trữ cache (Local database)
    func saveToDatabase() {
        UserDefaults.standard.set(user?.name, forKey: "cached_name")
    }
}` },
        { type: "paragraph", text: "Tại sao dở? Nếu ngày mai backend đổi cấu trúc API, bạn phải sửa UserViewModel. Nếu sếp muốn đổi từ UserDefaults sang Realm, bạn lại phải sửa UserViewModel. ViewModel này quá 'đa tài' nên rất dễ hỏng." },
        { type: "paragraph", text: "Giải pháp là chia để trị! Hãy tách thành các class nhỏ hơn, mỗi bên lo một việc:" },
        { type: "code", language: "swift", code: `// ✅ Code "Good" (Tuân thủ SRP)

// 1. Chỉ lo gọi API
class UserService {
    func fetchUserData() async throws -> User { ... }
}

// 2. Chỉ lo lưu trữ Local DB
class UserDatabase {
    func save(user: User) { ... }
}

// 3. ViewModel chỉ lo chuẩn bị dữ liệu cho UI vẽ
class UserViewModel: ObservableObject {
    @Published var displayName = ""
    private let service: UserService
    private let database: UserDatabase
    
    init(service: UserService, database: UserDatabase) {
        self.service = service
        self.database = database
    }
    
    func load() async {
        if let user = try? await service.fetchUserData() {
            self.displayName = user.name.uppercased()
            self.database.save(user: user)
        }
    }
}` },

        { type: "heading", text: "2. O - Open/Closed Principle (OCP): Nguyên tắc Đóng/Mở" },
        { type: "quote", text: "Class nên mở rộng cho việc phát triển (Open for extension), nhưng đóng lại trước việc sửa đổi (Closed for modification)." },
        { type: "paragraph", text: "Điện thoại của bạn có các cổng kết nối (như cổng sạc Type-C hoặc cổng tai nghe 3.5mm). Khi bạn muốn nghe nhạc bằng tai nghe mới, bạn chỉ cần cắm tai nghe vào cổng đó (mở rộng tính năng). Bạn không cần phải cậy nắp lưng điện thoại ra, lấy mỏ hàn hàn lại bo mạch bên trong (không sửa đổi cấu trúc sẵn có)." },
        { type: "paragraph", text: "Giả sử app của bạn có tính năng thanh toán. Ban đầu chỉ có Momo. Sau đó sếp yêu cầu thêm ZaloPay, ShopeePay..." },
        { type: "code", language: "swift", code: `// ❌ Code "Bad" (Vi phạm OCP)
class PaymentManager {
    func processPayment(amount: Double, type: String) {
        if type == "momo" {
            // Logic thanh toán qua Momo
        } else if type == "zalopay" {
            // Logic thanh toán qua ZaloPay
        }
        // Lỗi: Mỗi lần thêm ví mới, ta phải vào ĐÂY sửa code và thêm nhánh IF mới!
    }
}` },
        { type: "paragraph", text: "Giải pháp là sử dụng Interface hoặc Protocol để tạo ra một 'cổng cắm' chung:" },
        { type: "code", language: "swift", code: `// ✅ Code "Good" (Tuân thủ OCP)
protocol PaymentMethod {
    func pay(amount: Double)
}

class MomoPayment: PaymentMethod {
    func pay(amount: Double) { /* Thanh toán bằng Momo */ }
}

class ZaloPayment: PaymentMethod {
    func pay(amount: Double) { /* Thanh toán bằng ZaloPay */ }
}

// Class chính "đóng cửa" không cần sửa đổi nữa
class PaymentManager {
    func processPayment(amount: Double, method: PaymentMethod) {
        method.pay(amount: amount) // Cực kỳ gọn gàng!
    }
}` },

        { type: "heading", text: "3. L - Liskov Substitution Principle (LSP): Nguyên tắc Thay thế Liskov" },
        { type: "quote", text: "Các class con phải có thể thay thế hoàn toàn cho class cha của chúng mà không làm hỏng tính đúng đắn của chương trình." },
        { type: "paragraph", text: "Bạn mua một chiếc điều khiển điều hòa đa năng (class cha). Chiếc điều khiển này hứa hẹn có nút bật/tắt và tăng/giảm nhiệt độ. Bạn mang về nhà dùng cho điều hòa Daikin hay Panasonic (các class con) thì các nút này phải hoạt động bình thường. Nếu lắp vào điều hòa Daikin mà nút 'Tăng nhiệt độ' lại biến thành nút 'Tắt máy', thì chiếc điều khiển (hoặc class con) đã vi phạm nguyên lý thiết kế." },
        { type: "code", language: "swift", code: `// ❌ Code "Bad" (Vi phạm LSP)
class CustomButton: UIButton {
    override func touchesBegan(_ touches: Set<UITouch>, with event: UIEvent?) {
        // Tôi không muốn nút này bấm được, nên tôi quăng lỗi hoặc không làm gì cả
        fatalError("Nút này chỉ để hiển thị, cấm bấm!") 
    }
}` },
        { type: "paragraph", text: "Tại sao dở? Hệ thống hoặc lập trình viên khác kỳ vọng bất kỳ class con nào của UIButton cũng phải phản hồi sự kiện click bình thường. Việc bạn thừa kế UIButton nhưng lại vô hiệu hóa tính năng cốt lõi của nó làm hỏng logic của cả hệ thống." },
        { type: "paragraph", text: "Giải pháp là nếu nút đó chỉ để hiển thị và không bấm được, đừng cố kế thừa từ UIButton. Hãy kế thừa từ một class cha chung hơn là UIView, hoặc tách nó ra riêng biệt." },

        { type: "heading", text: "4. I - Interface Segregation Principle (ISP): Nguyên tắc Phân tách Giao diện" },
        { type: "quote", text: "Không nên ép buộc một Class phải implement (triển khai) những phương thức/interface mà nó không sử dụng đến." },
        { type: "paragraph", text: "Bạn đi thuê một căn hộ nhỏ. Chủ nhà bắt bạn ký một hợp đồng dịch vụ trọn gói bao gồm: Thuê nhà, Dọn bể bơi, và Sử dụng sân Golf. Mặc dù bạn chỉ cần thuê nhà và không hề biết chơi Golf, bạn vẫn phải trả tiền và ký cam kết bảo trì sân Golf. Giao diện hợp đồng này quá lớn và không hợp lý." },
        { type: "code", language: "swift", code: `// ❌ Code "Bad" (Vi phạm ISP)
protocol MessageActions {
    func sendTextMessage()
    func sendVideoMessage()
    func sendVoiceMessage()
}

// Đối với màn hình Chat chỉ cho phép gửi Text:
class BasicChatRoom: MessageActions {
    func sendTextMessage() { /* Gửi tin nhắn text */ }
    func sendVideoMessage() {} // Thừa thãi: Bắt buộc viết code rỗng
    func sendVoiceMessage() {}  // Thừa thãi: Bắt buộc viết code rỗng
}` },
        { type: "paragraph", text: "Giải pháp là hãy chia nhỏ các Protocol ra theo đúng chức năng của chúng. Apple đã làm cực kỳ tốt việc này khi tách UITableViewDataSource (lo hiển thị dữ liệu) và UITableViewDelegate (lo tương tác chạm vuốt)." },
        { type: "code", language: "swift", code: `// ✅ Code "Good" (Tuân thủ ISP)
protocol TextSendable {
    func sendTextMessage()
}

protocol VideoSendable {
    func sendVideoMessage()
}

// Phòng chat cơ bản chỉ cần tuân thủ những gì nó cần:
class BasicChatRoom: TextSendable {
    func sendTextMessage() {
        // Gửi tin nhắn text
    }
}` },

        { type: "heading", text: "5. D - Dependency Inversion Principle (DIP): Nguyên tắc Đảo ngược Phụ thuộc" },
        { type: "quote", text: "Các class cấp cao không nên phụ thuộc trực tiếp vào các class cấp thấp. Cả hai nên phụ thuộc vào các Abstraction (Interface/Protocol)." },
        { type: "paragraph", text: "Trong nhà bạn, tivi (class cấp cao) không nên hàn chết dây điện trực tiếp vào nguồn điện lưới trong tường (class cấp thấp). Thay vào đó, tivi cắm vào một cái ổ cắm điện (Abstraction). Nhờ có cái ổ cắm này, bạn có thể rút tivi ra và cắm cái quạt, cái sạc điện thoại vào đó một cách dễ dàng. Ou bạn có thể mang tivi sang nhà khác cắm vẫn chạy được." },
        { type: "code", language: "swift", code: `// ❌ Code "Bad" (Vi phạm DIP)
class HomeViewModel {
    // Phụ thuộc trực tiếp vào class NetworkManager cụ thể
    private let apiService = NetworkManager() 
    
    func loadProducts() {
        apiService.requestProducts { products in
            // Cập nhật giao diện
        }
    }
}` },
        { type: "paragraph", text: "Tại sao dở? Bạn không thể viết Unit Test cho HomeViewModel được vì mỗi lần chạy test, nó lại gọi API thật lên server. Nếu sau này bạn muốn đổi sang dùng Mock data để demo/test offline, bạn phải vào sửa tận gốc code của HomeViewModel." },
        { type: "paragraph", text: "Giải pháp là đưa Dependency qua Constructor (Dependency Injection) thông qua một Protocol trung gian (Ổ cắm điện):" },
        { type: "code", language: "swift", code: `// ✅ Code "Good" (Tuân thủ DIP)
protocol NetworkService {
    func fetchProducts(completion: @escaping ([Product]) -> Void)
}

class RealNetworkManager: NetworkService {
    func fetchProducts(completion: @escaping ([Product]) -> Void) { /* Gọi API thật */ }
}

class MockNetworkManager: NetworkService {
    func fetchProducts(completion: @escaping ([Product]) -> Void) {
        // Trả về dữ liệu giả lập ngay lập tức không cần mạng
        completion([Product(name: "Sản phẩm giả 1"), Product(name: "Sản phẩm giả 2")])
    }
}

class HomeViewModel {
    private let apiService: NetworkService
    
    // Inject bất kỳ class nào tuân thủ NetworkService
    init(apiService: NetworkService) {
        self.apiService = apiService
    }
    
    func loadProducts() {
        apiService.fetchProducts { products in
            // Cập nhật giao diện
        }
    }
}` },
        { type: "paragraph", text: "Bây giờ, khi chạy app thật, bạn khởi tạo: HomeViewModel(apiService: RealNetworkManager()). Khi viết Unit Test, bạn khởi tạo: HomeViewModel(apiService: MockNetworkManager()). Việc kiểm thử trở nên vô cùng nhanh chóng!" }
      ],
      en: [
        { type: "paragraph", text: "Have you ever faced a situation where changing one line of code on one screen unexpectedly breaks another screen? Or wanted to write Unit Tests but had no idea how to mock the data? The culprit is likely a violation of SOLID principles." },
        { type: "paragraph", text: "SOLID represents five golden guidelines that make code readable, maintainable, extensible, and highly testable. Let's explore each rule with real-world iOS/Android analogies." },
        
        { type: "heading", text: "1. S - Single Responsibility Principle (SRP)" },
        { type: "quote", text: "A class should have one, and only one, reason to change." },
        { type: "paragraph", text: "Imagine a construction worker. Their job is to lay bricks. If you force them to build walls, calculate payrolls, and drive delivery trucks, any error in payroll calculations will halt the entire construction project." },
        { type: "paragraph", text: "In mobile development, the most common SRP violation is creating 'God Classes' (usually ViewControllers or ViewModels that take on too many responsibilities)." },
        { type: "code", language: "swift", code: `// ❌ Code "Bad" (SRP Violation)
class UserViewModel {
    var user: User?
    
    // 1. Manages UI Display Logic
    func formatUserName() -> String {
        return user?.name.uppercased() ?? ""
    }
    
    // 2. Network client responsibility
    func fetchUserData() {
        let url = URL(string: "https://api.com/user")!
        URLSession.shared.dataTask(with: url) { data, _, _ in
            // Parse JSON and set values
        }.resume()
    }
    
    // 3. Local database cache responsibility
    func saveToDatabase() {
        UserDefaults.standard.set(user?.name, forKey: "cached_name")
    }
}` },
        { type: "paragraph", text: "Why is this bad? If the backend API changes tomorrow, you must modify UserViewModel. If you switch from UserDefaults to Realm, you have to modify UserViewModel again. This view model is too 'versatile' and thus fragile." },
        { type: "paragraph", text: "The solution is divide and conquer! Split them into smaller classes, each focused on one job:" },
        { type: "code", language: "swift", code: `// ✅ Code "Good" (SRP Compliant)

// 1. Networking Service only
class UserService {
    func fetchUserData() async throws -> User { ... }
}

// 2. Database Service only
class UserDatabase {
    func save(user: User) { ... }
}

// 3. ViewModel only formats data for UI binding
class UserViewModel: ObservableObject {
    @Published var displayName = ""
    private let service: UserService
    private let database: UserDatabase
    
    init(service: UserService, database: UserDatabase) {
        self.service = service
        self.database = database
    }
    
    func load() async {
        if let user = try? await service.fetchUserData() {
            self.displayName = user.name.uppercased()
            self.database.save(user: user)
        }
    }
}` },

        { type: "heading", text: "2. O - Open/Closed Principle (OCP)" },
        { type: "quote", text: "Software entities should be open for extension, but closed for modification." },
        { type: "paragraph", text: "Think of your smartphone's ports (like USB Type-C or 3.5mm jack). When you buy new headphones, you plug them in (extension). You don't open the phone casing and solder wires directly to the main board (modification)." },
        { type: "paragraph", text: "Suppose your app handles payments. Originally, it only supports Momo. Later, you need to add ZaloPay, ShopeePay..." },
        { type: "code", language: "swift", code: `// ❌ Code "Bad" (OCP Violation)
class PaymentManager {
    func processPayment(amount: Double, type: String) {
        if type == "momo" {
            // Momo logic
        } else if type == "zalopay" {
            // ZaloPay logic
        }
        // Bug: Adding new payment methods forces modifying this code with IF blocks!
    }
}` },
        { type: "paragraph", text: "The clean way is using an interface or protocol to create a unified socket:" },
        { type: "code", language: "swift", code: `// ✅ Code "Good" (OCP Compliant)
protocol PaymentMethod {
    func pay(amount: Double)
}

class MomoPayment: PaymentMethod {
    func pay(amount: Double) { /* Momo payments */ }
}

class ZaloPayment: PaymentMethod {
    func pay(amount: Double) { /* ZaloPay payments */ }
}

// Core class remains closed to edits
class PaymentManager {
    func processPayment(amount: Double, method: PaymentMethod) {
        method.pay(amount: amount) // Very clean!
    }
}` },

        { type: "heading", text: "3. L - Liskov Substitution Principle (LSP)" },
        { type: "quote", text: "Subtypes must be substitutable for their base types without altering the correctness of the program." },
        { type: "paragraph", text: "Suppose you buy a universal AC remote (base class). It guarantees buttons for power and temperature adjustment. Whether you use it on a Daikin or a Panasonic AC (subclasses), these buttons must perform as promised. If on Daikin the 'temp up' button turns off the unit, it violates the design contract." },
        { type: "code", language: "swift", code: `// ❌ Code "Bad" (LSP Violation)
class CustomButton: UIButton {
    override func touchesBegan(_ touches: Set<UITouch>, with event: UIEvent?) {
        // Disabling standard touch triggers is breaking subclass contracts!
        fatalError("This button is view-only, clicking is forbidden!") 
    }
}` },
        { type: "paragraph", text: "Why is this bad? Other parts of the system expect subclass button instances to respond to touch events normally. Overriding standard button behaviors to throw errors breaks the application logic." },
        { type: "paragraph", text: "If a button is only meant for display and should not be clicked, do not inherit from UIButton. Inherit from a generic UIView instead, or keep them decoupled." },

        { type: "heading", text: "4. I - Interface Segregation Principle (ISP)" },
        { type: "quote", text: "Clients should not be forced to depend on interfaces they do not use." },
        { type: "paragraph", text: "Suppose you rent a small apartment. The landlord forces you to sign an all-in-one service contract: renting, pool maintenance, and golf course membership. Even if you don't play golf, you are legally bound to pay for and maintain the golf course. The contract interface is bloated and unfair." },
        { type: "code", language: "swift", code: `// ❌ Code "Bad" (ISP Violation)
protocol MessageActions {
    func sendTextMessage()
    func sendVideoMessage()
    func sendVoiceMessage()
}

// For a basic text-only customer support chat:
class BasicChatRoom: MessageActions {
    func sendTextMessage() { /* Send normal text */ }
    func sendVideoMessage() {} // Bloat: Forced implementation
    func sendVoiceMessage() {}  // Bloat: Forced implementation
}` },
        { type: "paragraph", text: "The solution is to split protocols based on their specific functions. Apple does this beautifully by separating UITableViewDataSource (data rendering) and UITableViewDelegate (gestures and touch events)." },
        { type: "code", language: "swift", code: `// ✅ Code "Good" (ISP Compliant)
protocol TextSendable {
    func sendTextMessage()
}

protocol VideoSendable {
    func sendVideoMessage()
}

// Basic chatroom only conforms to what it needs:
class BasicChatRoom: TextSendable {
    func sendTextMessage() {
        // Sends text message
    }
}` },

        { type: "heading", text: "5. D - Dependency Inversion Principle (DIP)" },
        { type: "quote", text: "High-level modules should not depend on low-level modules. Both should depend on abstractions." },
        { type: "paragraph", text: "In your living room, the television (high-level) shouldn't be hard-soldered directly into the power cables in the wall (low-level). Instead, it plugs into a wall outlet (abstraction). Thanks to this outlet, you can unplug the TV and plug in a fan or a charger. Or you can bring the TV to another house and it still works." },
        { type: "code", language: "swift", code: `// ❌ Code "Bad" (DIP Violation)
class HomeViewModel {
    // Hardcoded dependency to a specific network service class
    private let apiService = NetworkManager() 
    
    func loadProducts() {
        apiService.requestProducts { products in
            // Update UI
        }
    }
}` },
        { type: "paragraph", text: "Why is this bad? You cannot write clean unit tests for HomeViewModel because it calls the real server API during testing (making it slow, dependent on internet, and using real server resources). To use mock data offline, you have to rewrite the ViewModel." },
        { type: "paragraph", text: "The solution is injecting dependencies (Dependency Injection) via an abstract protocol (the wall outlet):" },
        { type: "code", language: "swift", code: `// ✅ Code "Good" (DIP Compliant)
protocol NetworkService {
    func fetchProducts(completion: @escaping ([Product]) -> Void)
}

class RealNetworkManager: NetworkService {
    func fetchProducts(completion: @escaping ([Product]) -> Void) { /* Calls real server API */ }
}

class MockNetworkManager: NetworkService {
    func fetchProducts(completion: @escaping ([Product]) -> Void) {
        // Instantly returns mock data for testing
        completion([Product(name: "Mock Product 1"), Product(name: "Mock Product 2")])
    }
}

class HomeViewModel {
    private let apiService: NetworkService
    
    init(apiService: NetworkService) {
        self.apiService = apiService
    }
    
    func loadProducts() {
        apiService.fetchProducts { products in
            // Update UI
        }
    }
}` },
        { type: "paragraph", text: "Now, in production, you instantiate: HomeViewModel(apiService: RealNetworkManager()). In tests, you instantiate: HomeViewModel(apiService: MockNetworkManager()). Testing becomes fast and seamless!" }
      ]
    }
  }
];
