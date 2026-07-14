export const projects = [
  {
    id: "livestream-rtmp-architecture",
    category: "tech", // 'product' or 'tech'
    tags: ["Flutter", "Native Modules", "Livestream"],
    title: {
      vi: "Kiến trúc Livestream Bán hàng Đa nền tảng (RTMP)",
      en: "Multi-Platform Livestream Shopping Architecture (RTMP)"
    },
    subtitle: {
      vi: "Xây dựng hạ tầng livestream ổn định, phát đồng thời lên TikTok, YouTube, Twitch cho app thương mại điện tử thị trường Đức.",
      en: "Building a stable livestream pipeline that simultaneously restreams to TikTok, YouTube, and Twitch for a German e-commerce app."
    },
    metrics: {
      vi: "Loại bỏ nghẽn WebView, Giảm rõ rệt độ trễ & giật hình",
      en: "Removed WebView bottleneck, Major reduction in latency & stutter"
    },
    image: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?q=80&w=800&auto=format&fit=crop",
    details: {
      vi: {
        context: "Ứng dụng thương mại điện tử kết hợp livestream bán hàng cho thị trường Đức cần phát sóng đồng thời lên nhiều nền tảng mạng xã hội, trong khi vẫn giữ đồng bộ chat theo thời gian thực.",
        problem: "Player livestream ban đầu dùng WebView gây tải chậm, giật hình và tốn tài nguyên thiết bị. Việc restream đồng thời tới nhiều nền tảng cũng dễ gây nghẽn băng thông và mất đồng bộ.",
        solution: "Can thiệp (patch) plugin camera của Flutter để phát RTMP trực tiếp, tích hợp Castr làm media server chuyển mã HLS cho việc restream. Thay Player WebView bằng module Native iOS/Android (Flutter platform channel) load và phát stream trực tiếp, đồng bộ chat qua Firebase Realtime Database.",
        result: "Loại bỏ hoàn toàn overhead của WebView, giảm mạnh thời gian tải và tình trạng giật hình khi phát trực tiếp trong môi trường production, đồng thời phát sóng ổn định song song trên 3 nền tảng."
      },
      en: {
        context: "A livestream-shopping e-commerce app for the German market needed to broadcast simultaneously across multiple social platforms while keeping chat perfectly in sync in real time.",
        problem: "The original WebView-based livestream player caused slow loading, stuttering, and heavy device resource usage. Restreaming to multiple platforms at once also risked bandwidth bottlenecks and desync.",
        solution: "Patched Flutter's camera plugin to broadcast RTMP directly and integrated Castr as the media server for HLS transcoding. Replaced the WebView player with a native iOS/Android module (Flutter platform channel) that loads and plays the stream directly, syncing chat via Firebase Realtime Database.",
        result: "Completely eliminated WebView overhead, drastically reducing load times and stuttering in production, while streaming smoothly and simultaneously across all 3 platforms."
      }
    }
  },
  {
    id: "clean-architecture-ai-assistant",
    category: "product",
    tags: ["Clean Architecture", "State Management", "AI Integration"],
    title: {
      vi: "Tái cấu trúc Clean Architecture & Tích hợp Trợ lý AI",
      en: "Clean Architecture Migration & AI Assistant Integration"
    },
    subtitle: {
      vi: "Chuyển đổi từ GetX sang BLoC/Riverpod và xây dựng chatbot tìm kiếm thông minh cho hệ sinh thái tin tức thể thao & mini-game.",
      en: "Migrating from GetX to BLoC/Riverpod and building a smart search chatbot for a sports news & casual games ecosystem."
    },
    metrics: {
      vi: "Giảm 30% tỷ lệ lỗi, Duy trì 70%+ độ phủ test",
      en: "-30% Bug Rate, 70%+ Test Coverage Maintained"
    },
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop",
    details: {
      vi: {
        context: "Hệ sinh thái gồm nhiều ứng dụng tin tức thể thao, bảng xếp hạng và game giải trí đang gặp khó khăn trong bảo trì do kiến trúc module rời rạc và cách quản lý state thiếu nhất quán.",
        problem: "Việc dùng GetX thiếu ràng buộc rõ ràng khiến logic nghiệp vụ trộn lẫn với UI, gây khó khăn khi viết test và khi mở rộng tính năng tìm kiếm thông minh bằng AI.",
        solution: "Chuyển dịch dần các module sang BLoC/Riverpod theo nguyên tắc Clean Architecture và SOLID. Tích hợp OpenAI & Gemini API xây dựng tính năng tìm kiếm và chatbot hỗ trợ, tự quản lý prompt engineering và parsing kết quả; song song viết Unit/Widget test với flutter_test và mockito.",
        result: "Giảm 30% tỷ lệ lỗi phát sinh sau khi tái cấu trúc, duy trì độ phủ test trên 70%, đồng thời cải thiện thời gian khởi động ứng dụng nhờ profiling bằng Flutter DevTools."
      },
      en: {
        context: "An ecosystem of sports news, leaderboard, and casual game apps was becoming hard to maintain due to fragmented module architecture and inconsistent state management.",
        problem: "GetX's loose structure let business logic leak into the UI layer, making it hard to write tests or extend the app with AI-powered smart search.",
        solution: "Gradually migrated modules to BLoC/Riverpod under Clean Architecture and SOLID principles. Integrated OpenAI & Gemini APIs to build smart search and chatbot assistant features, handling custom prompt engineering and response parsing, alongside Unit/Widget tests using flutter_test and mockito.",
        result: "Cut the post-refactor bug rate by 30%, maintained 70%+ test coverage, and improved app startup time after profiling with Flutter DevTools."
      }
    }
  },
  {
    id: "secure-miniapp-distribution",
    category: "tech",
    tags: ["Security", "Blockchain", "Native Modules"],
    title: {
      vi: "Cơ chế Phân phối Mini App An toàn cho Ví Blockchain",
      en: "Secure Mini App Distribution for a Blockchain Wallet"
    },
    subtitle: {
      vi: "Xây dựng module Native xác thực chữ ký số, ngăn chặn Mini App bị giả mạo trong hệ sinh thái Super App.",
      en: "Building a native signature-verification module to block tampered Mini Apps inside a Super App ecosystem."
    },
    metrics: {
      vi: "Chặn 100% gói Mini App bị giả mạo trước khi thực thi",
      en: "Blocks 100% of tampered Mini App bundles before execution"
    },
    image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=800&auto=format&fit=crop",
    details: {
      vi: {
        context: "Ví blockchain phi tập trung triển khai mô hình Super App / Mini App, cho phép tải các Mini App bên thứ ba — tiềm ẩn nguy cơ Mini App bị chèn mã độc hoặc thay đổi trái phép.",
        problem: "Cần đảm bảo mọi gói Mini App tải về đều nguyên vẹn và đến từ nguồn tin cậy trước khi cho phép chạy, mà không làm chậm trải nghiệm người dùng.",
        solution: "Xây dựng module Native iOS/Android (Flutter platform channel) tự động tải, giải nén và xác thực chữ ký số bất đối xứng (cặp khóa public/private) kèm kiểm tra checksum cho từng gói Mini App trước khi thực thi; bảo vệ dữ liệu nhạy cảm bằng Keychain/Keystore và SSL Pinning chống tấn công man-in-the-middle.",
        result: "Ngăn chặn hoàn toàn các gói Mini App bị giả mạo hoặc chèn mã độc trước khi thực thi, củng cố độ tin cậy bảo mật cho toàn bộ hệ sinh thái ví."
      },
      en: {
        context: "A decentralized blockchain wallet adopted a Super App / Mini App model, allowing third-party Mini Apps to be downloaded — creating a risk of tampered or maliciously injected packages.",
        problem: "Every downloaded Mini App bundle needed to be verified as intact and from a trusted source before execution, without slowing down the user experience.",
        solution: "Built a native iOS/Android module (Flutter platform channel) that automatically downloads, unzips, and cryptographically verifies each Mini App bundle using asymmetric signature verification (public/private key pair) with checksum validation before execution; protected sensitive data with Keychain/Keystore and SSL Pinning against man-in-the-middle attacks.",
        result: "Completely blocked tampered or maliciously injected Mini App bundles from running, strengthening security trust across the entire wallet ecosystem."
      }
    }
  }
];
