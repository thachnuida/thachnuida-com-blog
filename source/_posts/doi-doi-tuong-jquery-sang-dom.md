title: Đổi đối tượng JQuery sang DOM
date: 2013-10-09 14:48:10
categories:
  - Jquery
tags:
  - Note
---

Trong đối tượng JQuery nó đã có chứa thành phần DOM. Để lấy được thành phần DOM từ đối tượng JQuery ta có thể sử dụng phương thức get() .

<!--more-->

Ví dụ ta có một danh sách như sau :

```
<ul>
  <li>say</li>
  <li>sua</li>
</ul>
```

Nếu như đối tượng JQuery chỉ có một thành phần DOM ta có thể dùng 2 cách lấy:

```
$(‘ul’).get(0)  hoặc $(‘ul’)[0]
```

Nếu đối tượng JQuery có nhiều thành phần DOM, để lấy hết tất cả ta sử dụng:

```
$(‘li’).get()
```

Ví dụ:

{% iframe http://jsfiddle.net/thachnuida/HRfVT/embedded %}

