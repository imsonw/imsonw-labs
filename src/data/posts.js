export const posts = [
  {
    id: "clean-architecture-guide",
    category: "Software Engineering",
    tags: ["Clean Architecture", "Design Patterns", "TypeScript"],
    date: "2026-07-14",
    readTime: 10,
    title: {
      vi: "Cẩm Nang Tinh Gọn: Clean Architecture Cho Mọi Dự Án",
      en: "The Lean Handbook: Clean Architecture for Any Project"
    },
    summary: {
      vi: "Bản đồ 3 tầng Domain - Data - Presentation, cấu trúc thư mục chuẩn, và ví dụ thực chiến từng dòng code cho tính năng 'Tạo công việc'.",
      en: "The 3-layer Domain - Data - Presentation map, a standard folder structure, and a line-by-line real-world example building a 'Create Task' feature."
    },
    content: {
      vi: [
        { type: "paragraph", text: "Clean Architecture (Kiến trúc sạch) sinh ra để giải quyết một vấn đề duy nhất: bảo vệ lõi nghiệp vụ của ứng dụng khỏi sự thay đổi của công nghệ bên ngoài — Database, UI, Framework mạng." },
        { type: "quote", text: "Quy tắc duy nhất cần nhớ: Mũi tên phụ thuộc luôn chỉ vào trong. Lớp ngoài biết lớp trong, nhưng lớp trong tuyệt đối KHÔNG được biết lớp ngoài." },

        { type: "heading", text: "1. Bản đồ 3 tầng kiến trúc" },
        { type: "paragraph", text: "Thay vì chia theo kiểu MVC lộn xộn, Clean Architecture chia code ứng dụng thành 3 tầng rõ rệt, mỗi tầng chỉ đảm nhiệm đúng một vai trò:" },
        { type: "list", items: [
          "Domain (Tầng Lõi) — trái tim của ứng dụng, chứa các quy tắc nghiệp vụ: Entity (mô hình lõi), UseCase (hành động), Repository Interface (hợp đồng dữ liệu). Tuyệt đối không chứa code của framework (không import React, Vue, Express, driver SQL...).",
          "Data (Tầng Dữ Liệu) — người vận chuyển, lấy dữ liệu từ bên ngoài, nhào nặn rồi đưa vào lõi: DTO (model của API/DB), DataSource (gọi API/DB), Repository Impl (thực thi hợp đồng).",
          "Presentation (Tầng Giao Diện) — tương tác với người dùng: View (UI), ViewModel/Controller (xử lý logic hiển thị)."
        ] },

        { type: "heading", text: "2. Cấu trúc thư mục tiêu chuẩn" },
        { type: "paragraph", text: "Tổ chức thư mục theo tính năng (Feature-based) thay vì theo loại file giúp dự án cực kỳ dễ tìm kiếm và mở rộng:" },
        { type: "code", language: "text", code: `src/
└── features/
    └── task/ (Tính năng: Quản lý công việc)
        ├── domain/
        │   ├── Task.entity.ts
        │   ├── TaskRepository.interface.ts
        │   └── CreateTask.usecase.ts
        ├── data/
        │   ├── Task.dto.ts
        │   ├── Task.datasource.ts
        │   └── TaskRepository.impl.ts
        └── presentation/
            ├── Task.view.tsx
            └── Task.viewmodel.ts` },

        { type: "heading", text: "3. Ví dụ thực chiến: tính năng 'Tạo công việc (Task)'" },
        { type: "paragraph", text: "Hãy xem dữ liệu chảy qua 3 tầng như thế nào khi người dùng tạo một Task mới." },

        { type: "heading", text: "Tầng 1: Domain — chỉ chứa logic thuần" },
        { type: "paragraph", text: "Định nghĩa mô hình chuẩn và hợp đồng lưu trữ, không phụ thuộc bất kỳ thư viện bên ngoài nào." },
        { type: "code", language: "typescript", code: `// 1. Entity: Dữ liệu sạch + Luật kiểm tra
export class TaskEntity {
    constructor(
        public readonly id: string,
        public title: string,
        public isCompleted: boolean
    ) {
        if (title.trim() === "") throw new Error("Title không được để trống!");
    }
}

// 2. Repository Interface: Chỉ quy định hàm, không quan tâm lưu ở đâu
export interface ITaskRepository {
    saveTask(task: TaskEntity): Promise<void>;
}

// 3. UseCase: Hành động tạo Task
export class CreateTaskUseCase {
    // Nhận Repository qua interface (Không bị dính chặt vào DB nào)
    constructor(private repository: ITaskRepository) {}

    async execute(id: string, title: string): Promise<TaskEntity> {
        const newTask = new TaskEntity(id, title, false);
        await this.repository.saveTask(newTask);
        return newTask;
    }
}` },

        { type: "heading", text: "Tầng 2: Data — giao tiếp Database & Mapping" },
        { type: "paragraph", text: "Nhận JSON từ API/DB, gọt giũa dữ liệu, rồi trả về Entity sạch cho tầng Domain." },
        { type: "code", language: "typescript", code: `// 1. DTO: Cấu trúc thật của DB (Có thể chứa các trường rác)
export interface TaskDTO {
    _id: string;
    task_title: string;
    status_code: number;
}

// 2. DataSource: Trực tiếp gọi DB (MongoDB, SQL...) hoặc gọi API
export class TaskDataSource {
    async insertToDB(dto: TaskDTO) {
        // Code insert database thực tế ở đây...
        console.log("Đã lưu vào DB:", dto);
    }
}

// 3. Repository Impl: Thực thi hợp đồng của Domain
export class TaskRepositoryImpl implements ITaskRepository {
    constructor(private dataSource: TaskDataSource) {}

    async saveTask(entity: TaskEntity): Promise<void> {
        // MAPPING: Chuyển Entity sạch -> DTO thô để lưu DB
        const dto: TaskDTO = {
            _id: entity.id,
            task_title: entity.title,
            status_code: entity.isCompleted ? 1 : 0
        };
        await this.dataSource.insertToDB(dto);
    }
}` },

        { type: "heading", text: "Tầng 3: Presentation — hiển thị UI" },
        { type: "paragraph", text: "Lấy dữ liệu người dùng nhập, gọi UseCase xử lý, rồi cập nhật giao diện." },
        { type: "code", language: "typescript", code: `export class TaskViewModel {
    // Nhận UseCase
    constructor(private createTaskUseCase: CreateTaskUseCase) {}

    async onCreateButtonClicked(titleInput: string) {
        try {
            const newId = Math.random().toString();
            // Gọi lõi nghiệp vụ
            const resultEntity = await this.createTaskUseCase.execute(newId, titleInput);

            // Format lại dữ liệu cho UI (UI Model)
            const successMessage = \`Đã tạo thành công: \${resultEntity.title}\`;
            alert(successMessage);
        } catch (error) {
            alert("Lỗi: " + error.message);
        }
    }
}` },

        { type: "heading", text: "4. Lắp ráp mọi thứ lại (Dependency Injection)" },
        { type: "paragraph", text: "Đây là bước kết dính các tầng lại với nhau ở nơi khởi chạy ứng dụng (App.ts, Main.ts). Nó đi theo nguyên tắc: tạo tầng ngoài cùng trước, rồi tiêm dần vào trong." },
        { type: "code", language: "typescript", code: `// 1. Khởi tạo tầng Data (Ngoài cùng)
const dataSource = new TaskDataSource();
const repository = new TaskRepositoryImpl(dataSource);

// 2. Khởi tạo tầng Domain (Ở giữa)
// Tiêm repository vào UseCase
const createTaskUseCase = new CreateTaskUseCase(repository);

// 3. Khởi tạo tầng Presentation (Giao diện)
// Tiêm UseCase vào ViewModel
const viewModel = new TaskViewModel(createTaskUseCase);

// 4. Gắn ViewModel vào màn hình (View) của bạn
// <TaskView viewModel={viewModel} />` },

        { type: "heading", text: "Tổng kết" },
        { type: "list", items: [
          "Khi đổi Database: chỉ cần viết lại TaskDataSource và TaskRepositoryImpl — tầng Domain và UI không hề biết, không cần sửa đổi.",
          "Khi đổi Framework UI (ví dụ từ React sang Vue): chỉ cần viết lại lớp View — ViewModel và UseCase được giữ nguyên.",
          "Viết Unit Test cực dễ: vì UseCase chỉ nhận vào một Interface, bạn có thể tạo một 'Mock Repository' giả để test logic nghiệp vụ mà không cần bật Database thật."
        ] },
        { type: "quote", text: "Kiến trúc sạch không phải để làm phức tạp code của bạn, mà để đảm bảo phần quan trọng nhất — logic nghiệp vụ — sống sót qua mọi lần đổi framework, đổi database, hay đổi cả đội ngũ.", author: "Product/Tech Lead" }
      ],
      en: [
        { type: "paragraph", text: "Clean Architecture exists to solve exactly one problem: protecting your application's business core from changes in outside technology — the database, the UI, the network framework." },
        { type: "quote", text: "The one rule to remember: dependency arrows always point inward. Outer layers know about inner layers, but inner layers must NEVER know about outer layers." },

        { type: "heading", text: "1. The 3-layer architecture map" },
        { type: "paragraph", text: "Instead of the tangled MVC split, Clean Architecture divides application code into 3 distinct layers, each owning exactly one responsibility:" },
        { type: "list", items: [
          "Domain (Core Layer) — the heart of the application, holding business rules: Entity (core model), UseCase (an action), Repository Interface (a data contract). Must never contain framework code (no importing React, Vue, Express, SQL drivers...).",
          "Data (Data Layer) — the carrier, fetching data from the outside world, shaping it, then handing it to the core: DTO (API/DB model), DataSource (calls the API/DB), Repository Impl (fulfills the contract).",
          "Presentation (UI Layer) — interacts with the user: View (UI), ViewModel/Controller (handles display logic)."
        ] },

        { type: "heading", text: "2. Standard folder structure" },
        { type: "paragraph", text: "Organizing folders by feature instead of by file type makes a project extremely easy to navigate and scale:" },
        { type: "code", language: "text", code: `src/
└── features/
    └── task/ (Feature: Task management)
        ├── domain/
        │   ├── Task.entity.ts
        │   ├── TaskRepository.interface.ts
        │   └── CreateTask.usecase.ts
        ├── data/
        │   ├── Task.dto.ts
        │   ├── Task.datasource.ts
        │   └── TaskRepository.impl.ts
        └── presentation/
            ├── Task.view.tsx
            └── Task.viewmodel.ts` },

        { type: "heading", text: "3. A real-world example: the 'Create Task' feature" },
        { type: "paragraph", text: "Let's trace how data flows through the 3 layers when a user creates a new Task." },

        { type: "heading", text: "Layer 1: Domain — pure logic only" },
        { type: "paragraph", text: "Defines the canonical model and the storage contract, with zero dependency on any external library." },
        { type: "code", language: "typescript", code: `// 1. Entity: clean data + validation rules
export class TaskEntity {
    constructor(
        public readonly id: string,
        public title: string,
        public isCompleted: boolean
    ) {
        if (title.trim() === "") throw new Error("Title cannot be empty!");
    }
}

// 2. Repository Interface: only defines the contract, doesn't care where data is stored
export interface ITaskRepository {
    saveTask(task: TaskEntity): Promise<void>;
}

// 3. UseCase: the action of creating a Task
export class CreateTaskUseCase {
    // Receives the Repository via its interface (not tied to any specific DB)
    constructor(private repository: ITaskRepository) {}

    async execute(id: string, title: string): Promise<TaskEntity> {
        const newTask = new TaskEntity(id, title, false);
        await this.repository.saveTask(newTask);
        return newTask;
    }
}` },

        { type: "heading", text: "Layer 2: Data — talking to the database & mapping" },
        { type: "paragraph", text: "Receives raw JSON from the API/DB, shapes it, then hands a clean Entity back to the Domain layer." },
        { type: "code", language: "typescript", code: `// 1. DTO: the DB's real shape (may contain messy/extra fields)
export interface TaskDTO {
    _id: string;
    task_title: string;
    status_code: number;
}

// 2. DataSource: talks directly to the DB (MongoDB, SQL...) or an API
export class TaskDataSource {
    async insertToDB(dto: TaskDTO) {
        // Actual database insert code goes here...
        console.log("Saved to DB:", dto);
    }
}

// 3. Repository Impl: fulfills the Domain layer's contract
export class TaskRepositoryImpl implements ITaskRepository {
    constructor(private dataSource: TaskDataSource) {}

    async saveTask(entity: TaskEntity): Promise<void> {
        // MAPPING: convert the clean Entity -> raw DTO for storage
        const dto: TaskDTO = {
            _id: entity.id,
            task_title: entity.title,
            status_code: entity.isCompleted ? 1 : 0
        };
        await this.dataSource.insertToDB(dto);
    }
}` },

        { type: "heading", text: "Layer 3: Presentation — rendering the UI" },
        { type: "paragraph", text: "Takes user input, calls the UseCase to process it, then updates the interface." },
        { type: "code", language: "typescript", code: `export class TaskViewModel {
    // Receives the UseCase
    constructor(private createTaskUseCase: CreateTaskUseCase) {}

    async onCreateButtonClicked(titleInput: string) {
        try {
            const newId = Math.random().toString();
            // Call into the business core
            const resultEntity = await this.createTaskUseCase.execute(newId, titleInput);

            // Reformat the result for the UI (a UI Model)
            const successMessage = \`Successfully created: \${resultEntity.title}\`;
            alert(successMessage);
        } catch (error) {
            alert("Error: " + error.message);
        }
    }
}` },

        { type: "heading", text: "4. Wiring it all together (Dependency Injection)" },
        { type: "paragraph", text: "This is where the layers get glued together, at the app's entry point (App.ts, Main.ts). It follows one rule: build the outermost layer first, then inject inward." },
        { type: "code", language: "typescript", code: `// 1. Build the Data layer (outermost)
const dataSource = new TaskDataSource();
const repository = new TaskRepositoryImpl(dataSource);

// 2. Build the Domain layer (middle)
// Inject the repository into the UseCase
const createTaskUseCase = new CreateTaskUseCase(repository);

// 3. Build the Presentation layer (UI)
// Inject the UseCase into the ViewModel
const viewModel = new TaskViewModel(createTaskUseCase);

// 4. Wire the ViewModel into your screen (View)
// <TaskView viewModel={viewModel} />` },

        { type: "heading", text: "Wrap-up" },
        { type: "list", items: [
          "Swapping the database: just rewrite TaskDataSource and TaskRepositoryImpl — the Domain and UI layers never know, and never need to change.",
          "Swapping the UI framework (e.g. React to Vue): just rewrite the View class — the ViewModel and UseCase stay exactly as they are.",
          "Writing unit tests becomes trivial: since the UseCase only depends on an interface, you can hand it a fake 'Mock Repository' to test business logic without ever touching a real database."
        ] },
        { type: "quote", text: "Clean Architecture isn't there to make your code more complicated — it's there to make sure the most important part, your business logic, survives every framework change, every database swap, and every team handover.", author: "Product/Tech Lead" }
      ]
    }
  },
  {
    id: "mvvm-ios-pattern",
    category: "Mobile Development",
    tags: ["MVVM", "iOS", "SwiftUI", "Architecture"],
    date: "2026-07-14",
    readTime: 9,
    title: {
      vi: "MVVM trong iOS: Từ 'Massive View Controller' đến kiến trúc dễ thở",
      en: "MVVM in iOS: From 'Massive View Controller' to an Architecture You Can Breathe In"
    },
    summary: {
      vi: "Giải thích MVVM bằng ví dụ nhà hàng dễ hiểu, kèm code Swift thực tế, mẹo ghi nhớ '3 chữ N', và những hạn chế mà MVVM không tự giải quyết được.",
      en: "MVVM explained through a restaurant analogy, with real Swift code, a memorable 3-word mnemonic, and the limitations MVVM alone doesn't solve."
    },
    content: {
      vi: [
        { type: "paragraph", text: "Bạn đã bao giờ mở một file ViewController lên và thấy nó dài hơn 1000 dòng code chưa? Cuộn muốn mỏi tay mới tìm ra được đúng hàm cần sửa, và sửa một dòng hiển thị UI thôi mà tự nhiên logic tải dữ liệu ở đâu đó bị hỏng theo. Đó chính là lúc bạn cần đến MVVM (Model - View - ViewModel) — kiến trúc phổ biến bậc nhất khi lập trình iOS, đặc biệt là với SwiftUI." },

        { type: "heading", text: "Vấn đề: 'Massive View Controller' - nỗi ám ảnh kinh điển của dân iOS" },
        { type: "paragraph", text: "Khi mới học iOS, hầu như ai cũng đi theo mô hình MVC (Model - View - Controller) mặc định của Apple. Nghe thì hợp lý, nhưng trên thực tế, chữ 'C' (Controller) dần dần biến thành cái thùng rác chứa tất cả mọi thứ: gọi API, xử lý logic nghiệp vụ, format dữ liệu, quản lý UITableView, bắt sự kiện chạm... Dân trong nghề gọi vui hiện tượng này là 'Massive View Controller' — MVC lúc này không còn là Model-View-Controller nữa, mà là Massive-View-Controller." },
        { type: "list", items: [
          "UIViewController vừa phải vẽ giao diện, vừa gọi API, vừa parse JSON, vừa lưu Core Data.",
          "Muốn viết Unit Test cho logic tính toán? Gần như không thể, vì logic đó dính chặt vào UIKit (UILabel, UITableView...).",
          "Người sửa layout vô tình động đúng dòng code đang xử lý thanh toán → bug production lúc nào không hay."
        ] },
        { type: "code", language: "swift", code: `class ProductViewController: UIViewController {
    var products: [Product] = []

    override func viewDidLoad() {
        super.viewDidLoad()
        // 1. Tự gọi API ngay trong Controller
        URLSession.shared.dataTask(with: URL(string: "https://api.shop.com/products")!) { data, _, _ in
            guard let data = data else { return }
            // 2. Tự parse JSON
            let items = try? JSONDecoder().decode([Product].self, from: data)
            self.products = items ?? []

            // 3. Tự format dữ liệu hiển thị luôn trong Controller
            DispatchQueue.main.async {
                for p in self.products {
                    print("Giá hiển thị: \\(Int(p.originalPrice * 0.9))đ (đã giảm 10%)")
                }
                self.tableView.reloadData()
            }
        }.resume()
    }
}` },
        { type: "paragraph", text: "Nhìn qua thì chạy được ngay, nhưng đây chính là quả bom hẹn giờ. ProductViewController giờ biết quá nhiều thứ: nó biết cách gọi mạng, biết công thức giảm giá 10%, biết cách vẽ bảng. Ngày mai nếu Product Manager đổi công thức khuyến mãi, bạn phải mò vào đúng file Controller khổng lồ này để sửa, giữa hàng trăm dòng code layout khác." },

        { type: "heading", text: "MVVM là gì? Hãy tưởng tượng bạn đang ở một nhà hàng" },
        { type: "paragraph", text: "Thay vì để một mình ViewController ôm đồm tất cả, MVVM chia công việc ra làm 3 vai rõ ràng — giống hệt quy trình vận hành của một nhà hàng." },
        { type: "list", items: [
          "Model = nguyên liệu trong kho bếp: dữ liệu thô, chỉ chứa thông tin (tên món, giá gốc...), không biết gì về cách trình bày.",
          "ViewModel = đầu bếp: lấy nguyên liệu (Model), chế biến (tính toán, format, áp dụng khuyến mãi) rồi bày sẵn ra đĩa để phục vụ.",
          "View = bàn ăn và thực khách: không cần biết công thức nấu ăn hay bếp đang giảm giá kiểu gì, chỉ cần nhận đĩa thức ăn đã hoàn chỉnh và hiển thị (ăn) thôi.",
          "Binding = người phục vụ bàn: liên tục chạy qua lại giữa bếp và bàn ăn. Hễ bếp làm xong món mới là món tự động được mang ra bàn ngay, thực khách không cần gọi lại lần hai."
        ] },
        { type: "quote", text: "Đầu bếp (ViewModel) không bao giờ cần biết bàn ăn đó trải khăn màu gì. Và ngược lại, thực khách (View) tuyệt đối không được tự ý xông vào bếp nấu ăn." },

        { type: "heading", text: "Giải pháp: viết lại bằng MVVM" },
        { type: "code", language: "swift", code: `// MODEL - chỉ chứa dữ liệu thô, không biết gì về UI
struct Product {
    let name: String
    let originalPrice: Double
}

// VIEWMODEL - "đầu bếp", xử lý toàn bộ logic
class ProductViewModel: ObservableObject {
    @Published var displayItems: [String] = []
    @Published var isLoading = false

    private let service: ProductService

    init(service: ProductService) {
        self.service = service
    }

    @MainActor
    func loadProducts() async {
        isLoading = true
        let products = await service.fetchProducts()

        // Toàn bộ logic tính toán/format nằm ở đây, không dính UIKit
        displayItems = products.map { product in
            let discounted = Int(product.originalPrice * 0.9)
            return "\\(product.name) - \\(discounted)đ (đã giảm 10%)"
        }
        isLoading = false
    }
}

// VIEW - "thực khách", chỉ nhìn và hiển thị, không tự tính toán gì cả
struct ProductListView: View {
    @StateObject var viewModel: ProductViewModel

    var body: some View {
        List(viewModel.displayItems, id: \\.self) { item in
            Text(item)
        }
        .task { await viewModel.loadProducts() }
    }
}` },
        { type: "paragraph", text: "Để ý View giờ đây 'ngu ngơ' hẳn đi — chỉ có đúng một dòng hiển thị Text(item), không có phép tính giảm giá nào cả. Muốn đổi mức giảm giá từ 10% lên 20%? Chỉ cần sửa đúng 1 dòng trong ProductViewModel, không đụng đến bất kỳ dòng UI nào. Muốn viết Unit Test cho logic giảm giá? Cực kỳ dễ, vì ProductViewModel không hề import SwiftUI hay UIKit." },

        { type: "heading", text: "Mẹo dễ nhớ: quy tắc 3 chữ N - Nhìn, Nghĩ, Nuôi" },
        { type: "list", items: [
          "View = Nhìn: chỉ hiển thị những gì được đưa cho, tuyệt đối không tự ý tính toán hay tự gọi API.",
          "ViewModel = Nghĩ: nơi duy nhất chứa logic nghiệp vụ, xử lý, tính toán, quyết định trạng thái loading/error.",
          "Model = Nuôi: chỉ nuôi dữ liệu thô (properties), không chứa logic hiển thị hay gọi mạng."
        ] },
        { type: "quote", text: "Nếu một dòng code trong View của bạn có phép tính +, -, *, / hay if/else phức tạp để quyết định hiển thị gì — đó là dấu hiệu logic đang chạy nhầm chỗ, hãy chuyển nó về ViewModel ngay.", author: "Mẹo ghi nhớ" },

        { type: "heading", text: "Ví dụ trực quan: chuyện gì xảy ra khi người dùng bấm nút Like" },
        { type: "list", items: [
          "Bước 1: Người dùng bấm nút Like trên View → View gọi thẳng một hàm trên ViewModel (viewModel.toggleLike()), không tự xử lý gì thêm.",
          "Bước 2: ViewModel nhận lệnh, cập nhật Model (đổi isLiked = true), rồi gọi Service để lưu thay đổi lên server.",
          "Bước 3: ViewModel cập nhật thuộc tính @Published tương ứng (ví dụ likeCount += 1).",
          "Bước 4: Nhờ cơ chế Binding của SwiftUI (Combine chạy phía dưới), View tự động 'nghe thấy' sự thay đổi và vẽ lại giao diện — trái tim chuyển sang màu đỏ ngay lập tức mà không ai cần gọi reloadData()."
        ] },

        { type: "heading", text: "Hạn chế tồn đọng của MVVM (không phải viên đạn bạc)" },
        { type: "paragraph", text: "MVVM giải quyết rất tốt bài toán tách UI khỏi logic, nhưng nó không phải phép màu vạn năng. Dưới đây là những hạn chế mà bản thân MVVM không tự khắc phục được:" },
        { type: "list", items: [
          "Massive ViewModel: nếu không cẩn thận, ViewModel sẽ lặp lại đúng lỗi của Massive View Controller ngày xưa — chỉ đổi tên file. Vẫn cần tách riêng Service/Repository thay vì nhồi hết logic vào ViewModel.",
          "Thiếu chuẩn cho Navigation: MVVM không quy định rõ ai chịu trách nhiệm điều hướng màn hình (push/present). Nhiều team để View tự điều hướng (phá vỡ nguyên tắc 'View chỉ nhìn'), số khác phải bổ sung thêm Coordinator pattern để giải quyết việc này.",
          "Binding trong UIKit khá cồng kềnh: SwiftUI có @Published/Combine binding gần như 'miễn phí', nhưng nếu dự án dùng UIKit, bạn phải tự viết closure hoặc dùng RxSwift/Combine thủ công để nối ViewModel với View, tốn kha khá boilerplate.",
          "Không phải lúc nào cũng cần thiết: với một màn hình Settings đơn giản chỉ có vài dòng static text, tạo hẳn một ViewModel riêng đôi khi là over-engineering, chỉ khiến số lượng file tăng lên vô ích.",
          "Debug 2 chiều đôi khi rối hơn: vì dữ liệu tự động chảy qua lại giữa View và ViewModel, khi có bug, việc truy vết xem giá trị bị đổi từ đâu đôi khi khó hơn so với gọi hàm tường minh kiểu cũ."
        ] },
        { type: "code", language: "swift", code: `// Trong dự án UIKit (không có @Published), phải tự tay viết binding
class ProductViewModel {
    var onProductsUpdated: (() -> Void)? // Phải tự khai báo closure

    private(set) var displayItems: [String] = [] {
        didSet { onProductsUpdated?() } // Phải tự gọi tay mỗi khi dữ liệu đổi
    }
}

// Trong ViewController phải tự đăng ký lắng nghe
viewModel.onProductsUpdated = { [weak self] in
    self?.tableView.reloadData()
}` },
        { type: "paragraph", text: "Tóm lại, MVVM không giải quyết tất cả vấn đề kiến trúc của bạn, nhưng nó là bước đệm cực kỳ vững chắc để tách UI ra khỏi logic nghiệp vụ. Kết hợp MVVM với Coordinator (cho điều hướng) và Repository (cho tầng dữ liệu) sẽ cho ra một kiến trúc gọn gàng, dễ test và dễ mở rộng lâu dài." },
        { type: "quote", text: "Kiến trúc tốt không phải để khoe kỹ thuật, mà để 6 tháng sau khi quay lại đọc code, bạn vẫn hiểu ngay chuyện gì đang xảy ra và ở đâu.", author: "Product/Tech Lead" }
      ],
      en: [
        { type: "paragraph", text: "Have you ever opened a ViewController file and found it over 1000 lines long? Scrolling forever just to find the right function, and changing one line of UI code somehow breaks the data-loading logic somewhere else. That's exactly when you need MVVM (Model - View - ViewModel) — one of the most popular architectures in iOS development, especially with SwiftUI." },

        { type: "heading", text: "The Problem: 'Massive View Controller' - iOS's classic nightmare" },
        { type: "paragraph", text: "When you first learn iOS, you almost always follow Apple's default MVC (Model - View - Controller) pattern. Sounds reasonable, but in practice, the 'C' (Controller) gradually turns into a trash bin holding everything: API calls, business logic, data formatting, UITableView management, touch handling... Engineers jokingly call this phenomenon 'Massive View Controller' — MVC no longer stands for Model-View-Controller, but Massive-View-Controller." },
        { type: "list", items: [
          "The UIViewController has to draw the UI, call APIs, parse JSON, and save to Core Data all at once.",
          "Want to unit test the calculation logic? Nearly impossible, since it's glued to UIKit (UILabel, UITableView...).",
          "Someone tweaking layout accidentally touches the exact line handling payment → production bug you don't notice until it's too late."
        ] },
        { type: "code", language: "swift", code: `class ProductViewController: UIViewController {
    var products: [Product] = []

    override func viewDidLoad() {
        super.viewDidLoad()
        // 1. Calling the API directly inside the Controller
        URLSession.shared.dataTask(with: URL(string: "https://api.shop.com/products")!) { data, _, _ in
            guard let data = data else { return }
            // 2. Parsing JSON here too
            let items = try? JSONDecoder().decode([Product].self, from: data)
            self.products = items ?? []

            // 3. Formatting display data right inside the Controller
            DispatchQueue.main.async {
                for p in self.products {
                    print("Display price: \\(Int(p.originalPrice * 0.9)) VND (10% off)")
                }
                self.tableView.reloadData()
            }
        }.resume()
    }
}` },
        { type: "paragraph", text: "It runs fine at a glance, but this is a ticking time bomb. ProductViewController now knows far too much: how to call the network, the 10% discount formula, and how to draw the table. If the Product Manager changes the promotion formula tomorrow, you have to dig through this giant Controller file, buried among hundreds of other layout lines." },

        { type: "heading", text: "What is MVVM? Imagine you're at a restaurant" },
        { type: "paragraph", text: "Instead of letting a single ViewController carry everything, MVVM splits the work into 3 clear roles — exactly like how a restaurant operates." },
        { type: "list", items: [
          "Model = ingredients in the kitchen storage: raw data (item name, base price...), it knows nothing about presentation.",
          "ViewModel = the chef: takes the ingredients (Model), prepares them (calculates, formats, applies discounts), and plates them ready to serve.",
          "View = the dining table and the guest: doesn't need to know the recipe or how the kitchen calculates discounts, it just receives the finished plate and displays (eats) it.",
          "Binding = the waiter: constantly running between the kitchen and the table. The moment the kitchen finishes a new dish, it's automatically brought to the table — the guest never has to ask twice."
        ] },
        { type: "quote", text: "The chef (ViewModel) never needs to know what color tablecloth is on that table. And conversely, the guest (View) must never barge into the kitchen and start cooking." },

        { type: "heading", text: "The Solution: rewriting it with MVVM" },
        { type: "code", language: "swift", code: `// MODEL - holds only raw data, knows nothing about UI
struct Product {
    let name: String
    let originalPrice: Double
}

// VIEWMODEL - the "chef", handles all the logic
class ProductViewModel: ObservableObject {
    @Published var displayItems: [String] = []
    @Published var isLoading = false

    private let service: ProductService

    init(service: ProductService) {
        self.service = service
    }

    @MainActor
    func loadProducts() async {
        isLoading = true
        let products = await service.fetchProducts()

        // All calculation/formatting logic lives here, no UIKit involved
        displayItems = products.map { product in
            let discounted = Int(product.originalPrice * 0.9)
            return "\\(product.name) - \\(discounted) VND (10% off)"
        }
        isLoading = false
    }
}

// VIEW - the "guest", only looks and displays, never calculates anything
struct ProductListView: View {
    @StateObject var viewModel: ProductViewModel

    var body: some View {
        List(viewModel.displayItems, id: \\.self) { item in
            Text(item)
        }
        .task { await viewModel.loadProducts() }
    }
}` },
        { type: "paragraph", text: "Notice how the View is now completely 'dumb' — just one line, Text(item), with zero discount calculation. Want to change the discount from 10% to 20%? Just edit one line inside ProductViewModel, without touching any UI code. Want to unit test the discount logic? Trivially easy, because ProductViewModel never imports SwiftUI or UIKit." },

        { type: "heading", text: "Memory trick: the 3-word rule - Look, Think, Hold" },
        { type: "list", items: [
          "View = Look: only displays whatever it's given, never calculates anything or calls an API on its own.",
          "ViewModel = Think: the single place holding business logic, calculations, and deciding loading/error states.",
          "Model = Hold: only holds raw data (properties), no display logic and no networking."
        ] },
        { type: "quote", text: "If a line inside your View contains +, -, *, / math, or a complex if/else deciding what to render — that's a sign the logic is running in the wrong place. Move it to the ViewModel immediately.", author: "Memory tip" },

        { type: "heading", text: "A visual walkthrough: what happens when a user taps Like" },
        { type: "list", items: [
          "Step 1: The user taps Like on the View → the View calls a function directly on the ViewModel (viewModel.toggleLike()), doing nothing else itself.",
          "Step 2: The ViewModel receives the command, updates the Model (sets isLiked = true), then calls the Service to persist the change on the server.",
          "Step 3: The ViewModel updates its corresponding @Published property (e.g. likeCount += 1).",
          "Step 4: Thanks to SwiftUI's Binding mechanism (Combine running underneath), the View automatically 'hears' the change and redraws — the heart turns red instantly, with nobody ever calling reloadData()."
        ] },

        { type: "heading", text: "Remaining limitations of MVVM (it's not a silver bullet)" },
        { type: "paragraph", text: "MVVM does a great job separating UI from logic, but it isn't magic. Here are the limitations MVVM alone doesn't fix:" },
        { type: "list", items: [
          "Massive ViewModel: without care, the ViewModel repeats the exact mistake of the old Massive View Controller — just under a different file name. You still need separate Service/Repository layers instead of dumping everything into the ViewModel.",
          "No standard for Navigation: MVVM doesn't define who's responsible for screen navigation (push/present). Many teams let the View navigate itself (breaking the 'View only looks' rule), while others add a Coordinator pattern on top to solve this.",
          "Binding in UIKit is clunky: SwiftUI gets @Published/Combine binding almost for free, but if your project uses UIKit, you have to hand-write closures or wire up RxSwift/Combine manually to connect ViewModel and View — a fair amount of boilerplate.",
          "Not always necessary: for a simple Settings screen with a few lines of static text, spinning up a dedicated ViewModel can be over-engineering, just inflating the file count for no real benefit.",
          "Two-way debugging can get messy: since data automatically flows back and forth between View and ViewModel, tracing where a value got changed during a bug hunt can be harder than following an explicit, old-school function call."
        ] },
        { type: "code", language: "swift", code: `// In a UIKit project (no @Published), you have to hand-write the binding
class ProductViewModel {
    var onProductsUpdated: (() -> Void)? // Must declare this closure yourself

    private(set) var displayItems: [String] = [] {
        didSet { onProductsUpdated?() } // Must fire it manually on every change
    }
}

// The ViewController must manually register a listener
viewModel.onProductsUpdated = { [weak self] in
    self?.tableView.reloadData()
}` },
        { type: "paragraph", text: "In short, MVVM won't solve every architectural problem you have, but it's a rock-solid foundation for separating UI from business logic. Pairing MVVM with a Coordinator (for navigation) and a Repository (for the data layer) gives you an architecture that's clean, testable, and easy to scale over the long run." },
        { type: "quote", text: "Good architecture isn't there to show off technique — it's so that six months from now, when you come back to this code, you instantly understand what's happening and where.", author: "Product/Tech Lead" }
      ]
    }
  },
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
