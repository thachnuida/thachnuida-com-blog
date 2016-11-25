title: Tôi học Machine Learning - 003 - Supervised Learning - Học có giám sát
date: 2016-11-25 14:29:00
tags:
  - Python
  - Machine Learning
---

*Bài ghi chú*

Với `học có giám sát (Supervised Learning)`, chúng ta được đưa một dữ liệu với kết quả đầu ra tương ứng đã biết trước, ta cần xây dựng mối quan hệ dữa đầu vào và đầu ra, để dự đoán kết quả đầu ra của các giá trị đầu vào khác.

Ví dụ, dự đoán giá nhà dựa vào vị trí, kích thước của căn nhà.

Học có giám sát được chia ra làm hai loại, `regression (hồi quy)` và `classification (phân lớp)`.

- Loại hồi quy: ta cố gắng dự đoán kết quả dưới dạng liên tục.
- Loại phân lớp: ta cố gắng dự đoán kết quả dưới dạng rời rạc.

Ví dụ:

- Loại hồi quy: 
    + Cho kết quả kiểm tra đầu vào một lớp học, dự đoán số học sinh lên lớp.
    + Dựa vào kích thước, màu sắc của quả dưa leo, dự đoán giá bán sản phẩm.
- Loại phân lớp:
    + Dựa vào kích thước, màu sắc của quả dưa leo, dự đoán có bán được hay không?
    + Cho thông tin khách hàng, dự đoán khách hàng mua sản phẩm hay không?