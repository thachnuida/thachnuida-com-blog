title: Xử lý hình ảnh hiển thị sai hướng bằng cách xác định giá trị EXIF orientation
date: 2015-08-06 10:13:37
tags:
- Javascript
---

Trong thời gian này mình có làm một ứng dụng chat, trong đó có tính năng upload file và hình ảnh. Và mình đã gặp một vấn đề với các hình ảnh được chụp bằng điện thoại. Đó là hình ảnh bị hiển thị sai hướng, do khi chụp người dùng đã để dọc điện thoại, dẫn đến lúc hiển thị hình ảnh trên trang web, thay vì hình ảnh hiển thị thẳng đứng thì lại nằm ngang. Giống như thế này:

![Orientation 6](/images/orientation-6.jpg)

Và công việc của mình là phải xác định được, hình ảnh đó bị sai thế nào, để hiển thị lại cho đúng.

<!-- more -->

Để làm được việc này, trước tiên mình cần phải xác định được một thuộc tính của hình ảnh mà qua đó mình biết được hình ảnh đó đang bị quay theo hướng nào. Sau một hồi tìm kiếm, mình đã phát hiện ra thuộc tính `EXIF:orientation` sẽ cho ta biết được điều này:

`EXIF`: Exchangeable image file format (đây là một chuẩn để lưu giữ các thông tin thông số của ảnh như chế độ flash, ngày tạo, ống kính thế nào. Các bạn có thể coi ở đây chi tiết các thông số nó có thể lưu http://forum.vietdesigner.net/threads/thuat-ngu-exif-anh-anh-viet.27870/)

Tất nhiên là mình không cần phải biết hết các thông số này, ở đây có một thông số đặc biệt mình cần dùng đó là `orientation` thông số cho biết hướng của ảnh.

Hình vẽ dưới đây sẽ cho các bạn biết được các giá trị của orientation và ví dụ:

![Orientation 6](/images/EXIF_Orientations.gif)
(Hình ảnh được lấy từ http://www.daveperrett.com/articles/2012/07/28/exif-orientation-handling-is-a-ghetto/)

Như hình vẽ, ta thấy nếu orientation là 6, nghĩa là hình ảnh đã bị xoay sang trái 90 độ). Vậy là chỉ cần lấy được giá trị EXIF:orientation là xong. Lúc này mình sẽ cần đến thư viện `exif-js` (https://github.com/exif-js/exif-js) để lấy giá trị orientation:

```
<img id="test-img" src="url/of/image" />

var element = $('#test-img');

element.bind('load', function() {
  EXIF.getData(element[0], function() {
    var orientation = EXIF.getTag(element[0], 'Orientation');
  }
});
```

Sau khi đã có được orientation, ta dựa vào từng giá trị tương ứng để xoay ảnh lại cho thích hợp, ở đây mình sử dụng thuộc tính `transform` của css để xoay ảnh:

Ví dụ với orientation là 6 mình sẽ xoay ảnh thế này:

```
function setTransform(transform) {
  element.css('-ms-transform', transform);
  element.css('-webkit-transform', transform);
  element.css('-moz-transform', transform);
  element.css('transform', transform);
}

setTransform('rotate(90deg)');
```

Làm tương tự với các giá trị orientation khác là coi như giải quyết được vấn đề. Trong vấn đề thực của mình gặp phải, mình đã viết 1 directive của Angularjs để xử lý, các bạn có thể coi ở đây: https://gist.github.com/thachnuida/2f76fe3aaa15dbd1dfa3

Ngoài ra, mình thấy hiện tại bên trình duyệt firefox đang hỗ trợ một thuộc tính `image-orientation` (https://developer.mozilla.org/en-US/docs/Web/CSS/image-orientation) nhưng mà cũng chỉ có duy nhất mỗi nó đang hỗ trợ, nên có lẽ cần đợi thêm thời giãn xem sao.

Hoặc là cũng có một cách sử dụng thư viện load image để load hình ảnh vào canvas như ở đây http://stackoverflow.com/questions/20600800/js-client-side-exif-orientation-rotate-and-mirror-jpeg-images

Cách giải quyết của mình ở đây là chỉ ở phía client, còn khi mình upload lên server thì mình có sử dung thư viện để sửa lại hình ảnh cho đúng rồi. :D Hy vọng bài viết này mang lại cho các bạn một chút thú vị trong ngày.