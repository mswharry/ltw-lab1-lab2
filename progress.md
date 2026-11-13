# Tiến độ Lab1 và Lab2

## Phạm vi

Hoàn thành các yêu cầu chính ở mức cơ bản theo `Lab 1.docx` và `Lab 2.docx`. Giữ nguyên cách chia thư mục React và Express có sẵn; không triển khai phần điểm cộng.

## Các thay đổi lớn và lý do

1. **Hoàn thiện API đọc dữ liệu ở Lab2.** Thêm `GET /user/list`, `GET /user/:id`, `GET /photosOfUser/:id` và `GET /test/info` theo đường dẫn trong đề. Chỉ trả các trường cần cho giao diện; với ảnh, ghép thông tin người viết vào từng bình luận. ID sai hoặc không tìm thấy người dùng trả mã 400. Đây là phần cần thiết để Lab1 lấy dữ liệu qua HTTP.
2. **Sửa quá trình kết nối và nạp dữ liệu MongoDB.** Server chỉ bắt đầu nghe sau khi kết nối thành công. `dbLoad.js` dừng khi thiếu hoặc không kết nối được `DB_URL`, lưu đúng trường `first_name` và sửa các biến khai báo sai. Nếu không sửa, danh sách tên có thể bị thiếu và các API không có dữ liệu đúng.
3. **Chuyển Lab1 sang dùng API.** Triển khai `fetchModel`, đổi danh sách người dùng, chi tiết, ảnh và TopBar sang dữ liệu trả từ Lab2. Giữ các route cũ để mở trực tiếp hoặc tải lại trang chi tiết và trang ảnh. Thêm thông báo tải/lỗi đơn giản và chuyển `/` sang `/users` để dễ mở ứng dụng.
4. **Cập nhật kiểm tra giao diện.** Thay test mẫu của Create React App bằng test mở chi tiết người dùng từ danh sách, vì test cũ kiểm tra nội dung không tồn tại trong ứng dụng.

## Kiểm tra đã thực hiện

- Kiểm tra cú pháp các file server bằng `node --check`: đạt.
- Kiểm tra các route bằng HTTP với dữ liệu mô phỏng: ba route dữ liệu trả 200 và hai trường hợp ID sai trả 400.
- `npm test -- --watch=false --runInBand` ở Lab1: 1 test đạt.
- `npm run build` ở Lab1: biên dịch thành công. Công cụ có cảnh báo về dependency cũ của Create React App, nhưng không chặn build.
- Chưa kiểm tra truy vấn với MongoDB thật vì workspace chưa có `DB_URL`/cơ sở dữ liệu được cấu hình.

## Cách chạy

1. Vào `Lab2/photo-sharing-server/photo-sharing-server`, sao chép `.env.example` thành `.env` rồi thay `DB_URL` bằng URI MongoDB của bạn. Chạy `npm install`, sau đó `node db/dbLoad.js` để nạp dữ liệu mẫu và `npm start` để mở API ở cổng 8081. **Lưu ý:** lệnh nạp dữ liệu xóa dữ liệu đang có trong các collection mẫu trước khi nạp lại.
2. Vào `Lab1/photo-sharing-v1/photo-sharing-v1`, chạy `npm install` và `npm start` để mở giao diện ở `http://localhost:3000`. Giao diện mặc định gọi API ở `http://localhost:8081`; nếu API chạy ở nơi khác, đặt biến môi trường `REACT_APP_API_URL` trước khi chạy hoặc build.

## Bản nộp StackBlitz dùng Vite

- Tạo `stackblitz-submission` theo bố cục `/src`, `/public`, `/server` mà project mẫu yêu cầu, giữ hai lab gốc để đối chiếu. Frontend chuyển từ Create React App sang Vite, dùng proxy đến API cổng 8081 để chạy cùng một origin trong trình duyệt.
- Server giữ các route MongoDB của Lab2 khi có `DB_URL`. Khi không có `DB_URL`, server dùng dữ liệu mẫu qua cùng các API để bản demo chạy trên StackBlitz; môi trường WebContainers không hỗ trợ kết nối TCP trực tiếp đến MongoDB. Hai chế độ này dùng chung giao diện.
- Hướng dẫn chuyển các file vào bản fork, lệnh chạy và giới hạn của chế độ dữ liệu mẫu nằm trong `stackblitz-submission/README.md`.
- Đã kiểm tra cú pháp frontend và server, đồng thời gọi thử API dữ liệu mẫu: 6 người dùng, trang chi tiết/ảnh hoạt động và ID sai trả 400. Việc cài dependencies và chạy build frontend trong bản Vite được để đến khi chuyển lên StackBlitz theo yêu cầu sau đó.
