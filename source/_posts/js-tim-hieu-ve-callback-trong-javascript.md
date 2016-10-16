title: Tìm hiểu về Callback trong JavaScript
date: 2013-08-28 15:31:19
tags:
  - Javascript
---

Tôi bắt đầu chú ý đến callback của javascript trong thời gian làm đồ án tốt nghiệp ra trường. Khi đó đọc thông tin thấy js cũng viết server side được bằng cách sử dụng node.js, thấy cũng hay hay thế là dùng nó luôn. Và vậy là tôi bắt đầu bị callback làm cho đau đầu vì nó quá khác với cách viết code của những ngôn ngữ đã học như C hay Java. Từ khi biết về callback tôi mới nhận ra rằng thì ra mình đã sử dụng nó rất nhiều khi viết code với jQuery. Chắc hẳn ở đây, nhiều bạn đã sử dụng callback nhưng chưa để ý về nó. Trong khả năng của mình, tôi sẽ trình bày cho các bạn những kiến thức cơ bản về callback trong javascript.

<!--more-->

# Callback nó là cái gì?

Theo định nghĩa trên wikipedia: Callback là một phần mã thực thi được truyền vào như một tham số của một đoạn mã khác, nó sẽ được gọi lại (thực thi) tại một thời điểm thích hợp.

Chúng ta hãy cùng nhìn qua đoạn code jquery dưới đây:

```
$.get('ajax/test.html', function(data) {
  $('.result').html(data);
  alert('Load was performed.');
});
```

Đây là một lệnh jQuery, nó sẽ gọi ajax với phương thức GET, lệnh này nhận 2 tham số: Đường dẫn để gọi ajax lấy nội dung và một function sẽ được thực thi khi lời gọi ajax thành công.

Tôi tạm giải thích cơ chế hoạt động của đoạn lệnh trên như sau:

- Trước tiên một lời gọi ajax được thực hiện để lấy nội dung của file ajax/test.html

- Sau khi lời gọi ajax thành công nó sẽ thực thi function được truyền vào với tham số data  chính là nội dung của file ajax/test.html đã lấy về.

Do đó, tùy thuộc vào tốc độ lấy nội dung file  mà callback function sẽ được thực hiện sớm hay muộn.

# Function là object

Đến đây, tôi có một thắc mắc: Bằng cách nào trong  javascript, function lại có thể được truyền vào như một tham số?

Bởi vì, trong javascript, function thực chất là một đối tượng (object), cụ thể hơn là một Function object . Nó được tạo ra bởi constructorFunction . Function object chứa một chuỗi là nội dung của function, như vậy thân của một function thực ra chỉ là một chuỗi kí tự.

```
cong = Function('a', 'b', 'return a+b');
cong(3,4) // => 7
```

Chính vì function cở bản chỉ là một object nên ta có thể truyền nó như một tham số vào function khác.

# Viết một callback

Sau đây là một ví dụ function sử dụng callback, bạn có thể theo nó để viết riêng một function sử dụng callback cho mình.

```
function goHome(vehicle, callback) {
    alert("I'm going home by " + vehicle);

    callback();
}

function playGame() {
    alert("I'm playing game");
}

goHome("bicycle", playGame);
```

Ở đây, ta có function `goHome`  nhận 2 tham số với tham số thứ 2 là một callback function. Khi ta chạy function `goHome` , trước tiên nó sẽ hiển thị một thông báo, sau đó nó gọi đến callback function được truyền vào. Ta để ý ở đây, tham số truyền vào là callback  không có dấu ngoặc, nó được thực thi trong function `goHome`  bằng cách thêm dấu ngoặc vào sau.

Câu lệnh cuối cùng chính là câu lệnh thực thi function `goHome` , với callback truyền vào là tên function playGame  được định nghĩa ở trên, function `playGame`  khi thực thi nó hiện ra thông báo “I’m playing game”.

Bạn có thể chạy thử đoạn code trên tại đây.

# Nếu không truyền callback thì sao?

Bây giờ ta chạy function goHome  ở trên mà không truyền vào tham số thứ 2.

```
function goHome(vehicle, callback) {
    alert("I'm going home by " + vehicle);

    callback();
}

goHome("bicycle");
```

Nếu bạn dùng trình duyệt Chrom và mở Developer Tool (Ctrl +Shift + J), khi chạy đoạn lệnh trên sẽ thấy một thông báo lỗi:

```
Uncaught TypeError: undefined is not a function
```

Chạy thử ví dụ ở đây. Nhớ bật Developer Tool để xem thông báo lỗi.

Nếu bạn muốn chương trình chỉ thực thi callback khi nó được thực sự truyền vào bạn có thể kiểm tra nó có tồn tại hay không trước khi gọi:

```
function goHome(vehicle, callback) {
    alert("I'm going home by " + vehicle);

    if (callback)
        callback();
}
```

Để cho chắc chắn nó thực sự là một function được truyền vào, ta có thể kiểm tra kiểu của nó bằng lệnh `typeOf`.

```
function goHome(vehicle, callback) {
    alert("I'm going home by " + vehicle);

    if (callback && typeOf(callback) === "function")
        callback();
}
```

# Truyền tham số cho callback

Trong ví dụ ở trên, ta đã gọi function callback `playGame` mà không truyền cho nó một tham số nào cả. Tuy nhiên ta muốn gọi `playGame` với một trò chơi cụ thể thì làm thế nào? Đơn giản là truyền tham số cho nó như những function bình thường.

```
function goHome(vehicle, callback) {
    alert("I'm going home by " + vehicle);

    callback("Naruto");
}

function playGame(gameName) {
    alert("I'm playing game " + gameName);
}

goHome("bicycle", playGame);
```

Bạn có thể chạy thử ví dụ trên ở đây.

# Tổng kết

Trên đây là những trình bày về callback trong javascript, hy vọng nó sẽ giúp cho các bạn hiểu thêm về một khái niệm mới khi lập trình với javascript. Những thông tin này vẫn còn ở mức cơ bản, hẳn nhiều bạn có kinh nghiệm và hiểu biết sâu về nó sẽ thấy thiếu sót. Vì vậy mình rất mong được sự đóng góp hoặc trao đổi thêm của các bạn về vấn đề này.

# Bài viết có tham khảo từ

- http://recurial.com/programming/understanding-callback-functions-in-javascript/
- http://www.impressivewebs.com/callback-functions-javascript/