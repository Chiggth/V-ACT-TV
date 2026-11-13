# V-ACT · Tiếng Việt

Website tự học và ôn luyện Tiếng Việt V-ACT, được xây dựng từ 8 tập PDF trong `input/` và giao diện theo MarbleCrest trong `input/marblecrest-DESIGN.md`.

## Chạy và xuất bản

Đây là website tĩnh, không cần cài package hay chạy bước build.

1. Đưa `index.html`, `style.css`, `app.js`, `lessons.js` và `README.md` lên repository GitHub.
2. Mở **Settings → Pages**.
3. Chọn **Deploy from a branch**, nhánh `main` và thư mục `/ (root)`, rồi lưu.
4. Mở URL GitHub Pages mà repository cung cấp.

Có thể mở `index.html` trực tiếp trong trình duyệt để xem giao diện. Google Fonts cần có kết nối mạng; nếu không, trình duyệt dùng font dự phòng.

## Tính năng

- Lộ trình 8 chặng, xem lý thuyết, ví dụ và câu hỏi tự kiểm tra.
- Đánh dấu hoàn thành; tiến độ được lưu trong `localStorage` của trình duyệt hiện tại.
- Ôn gợi nhớ theo chặng hoặc xem toàn bộ các mục kiến thức.
- Trang giới thiệu bài tập AI, được đánh dấu chưa triển khai và chưa kết nối dịch vụ tạo câu hỏi.
- Bố cục responsive cho điện thoại và máy tính.

## Nguồn và cách biên soạn

Nội dung lý thuyết trong `lessons.js` là phần tóm lược/diễn giải, được trích lọc từ các chuyên đề và ngữ liệu trong tám tệp PDF người dùng cung cấp. Ví dụ và câu tự kiểm tra trên trang được biên soạn mới để minh họa, không phải bài chép nguyên văn từ PDF.

- `tailieu_phan1 .pdf`: kiến thức cơ bản — từ và câu, tiếng Việt mở rộng, văn học dân gian, trung đại, hiện đại.
- `tailieu_phan2 (1).pdf`, `tailieu_phan3 (1).pdf`: bài tập tiếng Việt, lựa chọn từ, biện pháp tu từ và đọc hiểu.
- `tailieu_phan4 (1).pdf`: bài tập/ngữ liệu văn học dân gian và đọc hiểu.
- `tailieu_phan5 (1).pdf`: kiến thức và ngữ liệu văn học Việt Nam hiện đại.
- `tailieu_phan6 (1).pdf`: phong cách ngôn ngữ nghệ thuật và kỹ năng đọc hiểu.
- `tailieu_phan7 (1).pdf`: ngữ liệu thơ, truyện và câu hỏi hình tượng/biện pháp nghệ thuật.
- `tailieu_phan8 (1).pdf`: văn bản thông tin, nghị luận và câu hỏi tổng hợp.

Các chặng 1–5 hệ thống kiến thức nền; chặng 6–8 nhóm kỹ năng đọc hiểu và dạng vận dụng rút ra từ các tập bài tập còn lại. Nguồn cụ thể cũng hiển thị ở đầu mỗi chặng.

## Cấu trúc

- `index.html` — khung trang và điều hướng.
- `style.css` — giao diện MarbleCrest: nền marble, charcoal, điểm nhấn gold, góc vuông nhẹ và serif cho tiêu đề.
- `lessons.js` — nội dung 8 chặng, ví dụ và câu hỏi.
- `app.js` — điều hướng, tiến độ, ôn tập và tương tác.

