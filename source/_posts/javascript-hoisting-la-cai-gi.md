title: Javascript Hoisting là gì?
date: 2013-09-09 15:02:49
tags:
- Javascript
---

Khi thao tác với các biến trong javascript, nếu không để ý bạn sẽ rất dễ gặp phải một sự nhầm lần khó hiểu như ví dụ dưới đây. Mình không rõ nó là lỗi hay là đặc thù của ngôn ngữ javascript, nhưng dù sao cũng rất khó chấp nhận nó một cách thoải mái.

Chúng ta hãy cùng nhau chạy đoạn code sau:

```
var myName = "saysua";
alert(myName);
```

<!--more-->

Dĩ nhiên kết quả nhận được sẽ là một hộp thoại thông báo với dòng chữ “saysua” [(Run)](http://jsfiddle.net/thachnuida/4hXVS/).

Tiếp tục thêm một function cho đoạn code trên:

```
var myName = "saysua";

function say() {
    alert(myName);
}

say();
```

Tất nhiên kết cũng giống như đoạn code trên [(Run)](http://jsfiddle.net/thachnuida/4hXVS/1/). Vẫn chưa có điều gì đặc biệt ở đây cả. Giá trị của biến `myName` vẫn được xuất hiện khi gọi `alert` .

Bây giờ nếu ta thêm một khai báo biến `myName` vào hàm `say()` ngay sau câu lệnh `alert` thì kết quả sẽ thế nào. Hẳn bạn sẽ nghĩ rằng, không có gì thay đổi cả. Dòng thông báo cũ vẫn xuất hiện?

```
var myName = "saysua";

function say() {
    alert(myName);
    var myName = "saysua.com";
}

say();
```

Ah, không phải vậy. Bảng thông báo vẫn xuất hiện, nhưng nó báo rằng biến `myName`  `undefined` [(Run)](http://jsfiddle.net/thachnuida/4hXVS/2/). Điều gì đã xảy ra vậy? Rõ ràng chúng ta đã khai báo biến myName  ngay từ đầu?

Đó chính là vì `Hoisting`.

# Khai báo và khởi tạo biến

Trước khi, tìm hiểu xem hoisting đã làm gì với đoạn code trên, chúng ta cần hiểu 2 khái niệm sau:

Khai báo: Chúng ta báo cho chương trình biết rằng ta sẽ sử dụng một biến `xyz` nào đó nhưng chưa gán giá trị cho nó.
Khởi tạo: Chúng ta gán cho biến một giá trị khởi tạo ban đầu.
Có lẽ nhìn code sẽ dễ hiểu hơn:

```
var xyz; // Khai báo, giá trị của xyz hiện tại chưa có (undefined)

xyz = "hello" // Khởi tạo giá trị ban đầu cho xyz
```

# Đó là vì hoisting

Hoisting, dịch ra nghĩa là “cẩu lên, kéo lên”. Đúng là như vậy, khi ta khai báo một biến trong phạm vi sử dụng của mình, cho dù ta có gọi lời khai báo ở đâu, việc khai báo của biến đó cũng sẽ được “cẩu lên” trên cùng phạm vi sử dụng (tất nhiên việc này sẽ chạy ngầm khi chương trình được thực thi), còn việc khởi tạo giá trị của biến vẫn giữ nguyên vị trí cũ.

Đoạn code bên trên của chúng ta, nếu được viết lại theo sự diễn giải của hoisting nó sẽ như thế này:

```
var myName = "saysua";

function say() {
    var myName; // Khai báo đã bị kéo lên trên, lúc này myName chưa có giá trị "undefined"
    alert(myName);
    myName = "saysua.com"; // Khởi tạo giá trị cho myName
}

say();
```

Chính vì chỉ có việc khai báo bị kéo lên trên, còn việc khởi tạo giá trị thì vẫn ở nguyên nên câu lệnh alert  của ta mới hiện thông báo `undefined`. Rõ ràng là rất dể nhầm lẫn nếu ta không để ý đến nó.