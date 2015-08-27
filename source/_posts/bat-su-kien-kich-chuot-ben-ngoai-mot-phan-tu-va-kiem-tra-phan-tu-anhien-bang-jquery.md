title: Bắt sự kiện kích chuột bên ngoài một phần tử và kiểm tra phần tử ẩn/hiện bằng JQuery
date: 2013-10-24 06:49:01
cagetories:
  - Jquery
tags:
  - Note
---

Ngày hôm nay, trong khi đang làm, tôi bắt gặp 2 trường hợp cần giải quyết với jquery. Trường hợp thứ nhất là bắt sự kiện khi người dùng kích chuột bên ngoài một phần tử và trường hợp thứ hai là kiểm tra một phần tử có đang hiển thị hay không.

Cách giải quyết hai trường hợp này cũng khá đơn giản, nhưng tôi nghĩ nõ cũng sẽ làm ta mất một số thời gian nếu như chưa biết. Vì vậy tôi sẽ chia sẽ hai thủ thuật này ở đây.

<!--more-->

# Bắt sự kiện kích chuột bên ngoài một phần tử

Giả sử tôi có một phần tử có id là click-me  và tôi cần bắt sự kiện kích chuột lên nó hoặc kích chuột bên ngoài nó để có những xử lý khác nhau. Đoạn code ngắn dưới đây sẽ giải quyết vấn đề đó:

```
$(document).click(function(){
    alert("Click outside :D ");
});

$('#click-me').click(function(event){
    alert("Click me");
    event.stopPropagation();
});
```

> [Xem ví dụ.](http://jsfiddle.net/thachnuida/gFGUt/)

Ngoài ra ta còn có thể sử dụng `return false;`  thay cho `event.stopPropagation()`.  Các bạn có thể đoán xem, nếu ta bỏ dòng `event.stopPropagation()` thì chuyện gì sẽ xảy ra?

# Kiểm tra một phần tử đang hiển thị hay đang ẩn

Muốn kiểm tra một phần tử đang ẩn hay đang hiện, chúng ta có thể dùng đoạn code sau:

```
$('#click-me').is(':visible') // => true or false
```