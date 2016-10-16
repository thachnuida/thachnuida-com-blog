title: Trích xuất dữ liệu web bằng PHP với PQLite
date: 2013-09-14 14:58:32
tags:
  - PHP
  - Scrape
---

Đã bao giờ bạn muốn trích xuất thông tin từ một trang web bằng PHP, chẳng hạn như giá cổ phiếu, giá vàng, nội dung bài báo… công việc đầu tiên là bạn sẽ đọc nội dung của trang web đó rồi tìm đến phần tử chứa nội dung cần lấy. Hẳn các bạn đã từng thử nhiều cách bằng hàm tìm chuỗi hoặc dùng biểu thức chính quy và bạn thấy nó thật phức tạp, hoặc nếu trên trang web đó có thay đổi lại cấu trúc thì chúng ta cũng phải rất vất vã để sửa lại hàm lấy thông tin của mình.

Và rồi bạn tự hỏi rằng, ước gì mình có thể thao tác với nội dung trang web đó đơn giản như bạn đã làm với JQuery, bạn có thể lấy các thẻ bằng ID hoặc là class của nó.

Và đây, tôi xin giới thiệu đến cho các bạn một thư viện PHP có thể giúp bạn làm việc với các phần tử HTML đơn giản như các bạn đang làm với Jquery. Các bạn có thể đi qua từng phần tử, lấy nội dung của nó, thậm chí có thể thay đổi nội dung bên trong của 1 phần tử, thay đổi class,…

PQlite sẽ giúp chúng ta làm phần khó.

<!--more-->

Thay vì trình bày chi tiết về nó, tôi sẽ cùng với các bạn làm một chức năng nho nhỏ như sau:

Đây là trang web chúng ta sẽ cùng nhau lấy dữ liệu:

http://hcm.24h.com.vn/ttcb/giavang/giavang.php

Nội dung tôi muốn lấy ở đây là bảng giá vàng. Các bạn dùng Chrome mở trang web lên, rồi kích chuột phải vào bảng giá vàng, chọn “Inspect Element” để coi nội dung.

![Bang Gia Vang](/images/giavang.png)

Ta có thể thấy bảng giá vàng ở đây là một table  với class là tb-giaVang . Thường thì để lấy chính xác nội dung của một phần tử ta nên dựa vào ID của nó bởi vì ID được đặt là định danh duy nhất, nhưng ở đây bảng giá vàng lại không có ID, tuy nhiên khi kiểm tra class tb-giaVang  cũng là duy nhất nên chúng ta có thể dựa vào nó để lấy giá trị của bảng giá vàng được.

Đầu tiên các bạn tải thư viện PQlite về, sau đó tạo 1 file test.php  với nội dung như sau. Chạy nó và xem kết quả.

```
<?php
include_once( 'PQLite.php' );

$content = file_get_contents('http://hcm.24h.com.vn/ttcb/giavang/giavang.php');

$pq = new PQLite($content);

$giavang = $pq->find('.tb-giaVang')->getOuterHtml();

echo $giavang;

?>
```