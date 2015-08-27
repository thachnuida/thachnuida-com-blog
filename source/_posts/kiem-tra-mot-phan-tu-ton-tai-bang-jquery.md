title: Kiểm tra một phần tử tồn tại bằng JQuery
date: 2013-10-15 06:52:43
categories:
  - Jquery
tags:
  - Note
---
Trong khi sử dụng JQuery, có nhiều trường hợp tôi tự hỏi làm sao để kiểm tra một phần tử có tồn tại hay không. Chẳng hạn như div có id là “exist” đã có hay chưa.

Ngay khi nảy ra câu hỏi tôi nghĩ ngay đến một cách kiểm tra đơn giản:

```
if ($('#exist')) {
  console.log('exist');
}
```

Nhưng thực tế thì cách trên hoàn toàn sai bởi vì khi sử dụng `$()`  nó luôn trả về một đối tượng cho dù không tồn tại phần tử ta muốn xác định thì nó cũng sẽ trả về một đối tượng rỗng.  Vì vậy điều kiện trong câu lệnh if  sẽ luôn luôn đúng.

<!--more-->

Do đó, để kiểm tra một phần tử có tồn tại hay không bằng JQuery ta có thể thực hiện như sau:

```
if ($('#exist').length) {
  console.log('exist');
}
```

Hoặc là:

```
if ($('#exist')[0]) {
  console.log('exist');
}
```

Nếu phần tử ta cần xác định không xuất hiện, JQuery sẽ trả về đối tượng rỗng do đó `length` sẽ cho giá trị 0 và [0]  sẽ cho giá trị `undefined` .