title: Xóa 1 phần tử trong mảng bằng Javascript
date: 2013-10-12 06:56:13
tags:
  - Javascript
---
Khi lập trình với javascript và một vài ngôn ngữ khác, có một thao tác tưởng chừng rất đơn giản nhưng lại luôn khiến tôi bối rối về cách thực hiện nó. Đó chính là Xóa một phần tử trong mảng.

# Javascript: Splice

Trong javascript, để xóa một phần tử trong mảng ta có thể dùng hàm `splice()`

<!-- more -->

```
var a = ['say', 'sua', 'com'];
a.splice(0,1); // Xóa 1 phần tử tại vị trí 0
console.log(a); // => a = ['sua', 'com']
```

Chúng ta có thể kết hợp `splice()`  cùng với `indexOf()`  để xóa phần tử dựa vào giá trị của nó:

```
var a = ['say', 'sua', 'com'];
var deleteElement = 'sua';

var i = a.indexOf(deleteElement);
if (i != -1) {
    a.splice(i,1);
}

console.log(a); // => ['say', 'com']
```

Nếu các bạn muốn thực hiện thêm nhiều thao tác với mảng các bạn có thể tham khảo thư viện `underscore` như ở bài viết [Xử lý mảng với underscore](http://saysua.com/2013/08/12/js-xu-ly-mang-voi-underscore-js/)

Tóm lại: để xóa một phần tử trong mảng ta có thể dùng `array.splice(vị trí cần xóa, 1)`