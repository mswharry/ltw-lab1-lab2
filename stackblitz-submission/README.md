# Bản nộp Photo Sharing cho StackBlitz

Thư mục này là bản ghép Lab1 và Lab2 theo cấu trúc của project mẫu Vite. Hai thư mục `Lab1` và `Lab2` ở ngoài vẫn là bản gốc.

Chỉ chuyển các file mã nguồn bên dưới vào bản fork. Không cần cài dependencies trên máy trước; chạy `npm install` trong hai terminal StackBlitz sau khi đã chuyển code.

## Cấu trúc

```text
stackblitz-submission/
├── index.html              Điểm vào của Vite
├── package.json            Dependencies và lệnh chạy frontend
├── vite.config.js          Chuyển các request API sang cổng 8081
├── public/images/          Ảnh hiển thị trên giao diện
├── src/
│   ├── main.jsx            Khởi tạo React
│   ├── App.jsx             Route và bố cục ứng dụng
│   ├── components/         Danh sách, chi tiết, ảnh, TopBar
│   └── lib/fetchModelData.js
└── server/
    ├── package.json        Dependencies và lệnh chạy backend
    ├── index.js            Chọn dữ liệu mẫu hoặc MongoDB
    ├── demoRoutes.js       API dùng dữ liệu mẫu cho StackBlitz
    ├── modelData/          Dữ liệu mẫu
    ├── routes/             API dùng MongoDB
    └── db/                 Mongoose model và script nạp dữ liệu
```

## Chạy bằng hai terminal

Terminal backend:

```bash
cd server
npm install
npm start
```

Terminal frontend (ở thư mục gốc của project):

```bash
npm install
npm run dev
```

Mở URL preview của Vite. Kiểm tra `/users`, chọn người dùng, mở ảnh và bấm tên người bình luận. API thử nhanh: `/user/list` và `/test/info` trên cùng URL preview.

## Chuyển vào project mẫu của thầy

1. Mở link mẫu và bấm **Fork** để có bản của mình.
2. Đưa **nội dung bên trong** thư mục `stackblitz-submission` vào **gốc** bản fork: `index.html`, `package.json`, `vite.config.js`, `src/`, `public/`, `server/`. Không đặt cả thư mục `stackblitz-submission` thành một cấp con. Có thể kéo thả file/thư mục vào cây file của StackBlitz hoặc tạo file rồi dán nội dung.
3. Nếu bản mẫu có file demo trùng tên, thay bằng file của bản này; bỏ những file demo không còn được dùng. Không đưa `node_modules`, `dist`, `.env` hoặc mật khẩu MongoDB lên StackBlitz.
4. Chạy hai terminal theo lệnh phía trên. Sau khi các trang hoạt động, lưu project, đổi chế độ hiển thị thành **Secret** và nộp link project StackBlitz.

## Dữ liệu và MongoDB

Khi không có `DB_URL`, backend chạy bằng dữ liệu mẫu của bài lab để giao diện hoạt động trên StackBlitz. Nó vẫn trả đúng các API đọc dữ liệu nhưng không ghi vào database. StackBlitz WebContainers không hỗ trợ kết nối TCP trực tiếp đến MongoDB, nên đừng đặt `DB_URL` Atlas trong bản fork và mong Mongoose kết nối được.

Nếu chạy ở máy hoặc máy chủ có kết nối MongoDB, sao chép `server/.env.example` thành `server/.env`, điền `DB_URL`, chạy `npm run load-data` một lần ở thư mục `server`, rồi `npm start`. `load-data` xóa dữ liệu trong các collection mẫu trước khi nạp lại. Khi có `DB_URL`, server tự chuyển sang các route Mongoose của Lab2.
