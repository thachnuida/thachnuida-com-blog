title: Những chức năng mới của ES6
date: 2016-12-17 23:18:00
tags:
  - Javascript
---

Phiên bản mới của Javascript đã ra đời được một thời gian rồi, mình cũng có làm qua nhưng chưa thực sự chú ý nhiều, chủ yếu vẫn viết theo kiểu cũ. Nay mình mới đọc lại một số tài liệu, hướng dẫn và tống hợp lại những chức năng thú vị của ES6.

# Template string

Với chức năng này ta có thể tạo một bản mẫu cho chuỗi cho phép ta nhúng các biểu thức vào, và cũng có thể viết trên nhiều dòng. Chú ý là ta sẽ dùng dấu \` chứ không phải dấu ', dấu này ở ngay dưới phím `Esc` trên bàn phím.

## Cách dùng

```
var country = 'vietnam';
var str = `Xin chao ${country}
phep tinh 1 + 2 = ${1+2}`;
console.log(str);
```

Kết quả

```
Xin chao vietnam
phep tinh 1 + 2 = 3
```

# Destructuring assignment (Tách và gán)

`Tách và gán` là mình tự dịch ra thôi, chức năng này cho phép ta trích xuất dữ liệu từ mảng hoặc đối tượng gán vào các biến riêng lẽ.

## Cách dùng

```
var arr = [1, 2, 3];
var [one, two, three] = arr;
console.log('one is', one);     // => one is 1
console.log('two is', two);     // => two is 2
console.log('three is', three); // => three is 3

// Lấy 1 phần của mảng
var [a, ...rest] = arr;
console.log(a);                 // => 1
console.log(rest);              // => [2,3]

var obj = {name: 'thach', age: 27};
var {name, age} = obj;
console.log('name is', name);  // => name is thach
console.log('age is', age);    // => age is 27
```

## Lấy kết quả trả về từ hàm

```
function getTop2() {
    return ['hai', 'ha'];
}
var [p1, p2] = getTop2();
console.log(p1);    // hai
console.log(p2);    // ha
```

## Gán cho một biến khác tên với thuộc tính của đổi tượng

```
var obj = {name: 'thach', age: 27};
var {name: n, age: a} = obj;
console.log(n, a);      // thach 27
```

# Block scope với let

`let` cho phép ta tạo ra một biến được giới hạn trong phạm vi của block chứa nó. `let` khác với `var` ở chỗ, `var` tạo ra một biến có phạm vi toàn cục hoặc xuyên suốt một hàm. Để rõ hơn thì mình coi qua ví dụ so sánh giữa `let` và `var`.

```
if (true) {
    // Đây là 1 block của if
  var a = 'foo';
  let b = 'bar';
  console.log(a);       // foo
  console.log(b);       // bar
}

console.log(a);         // foo
console.log(b);         // Error: Uncaught ReferenceError: b is not defined
```

Như ta thấy ở ví dụ trên, biến `b` chỉ có thể dùng trong if-block mà không thể dùng bên ngoài được. Bây giờ ta tiếp tục ví dụ với hàm.

```
function varFunc() {
  var x = 1;
  if (true) {
    var x = 2;
    console.log(x);         // 2
  }
  console.log(x);           // 2
}

function letFunc() {
  let y = 1;
  if (true) {
    let y = 2;
    console.log(y);         // 2
  }
  console.log(y);           // 1  
}

varFunc();
letFunc();
```

Khi ta `let y = 2`  bên trong if-block nó tạo ra một biến `y` mới không liên quan gì đến `let y = 1` ở trên cả. cho nên sau if-block, `y` bên ngoài không bị thay đổi.

## Dùng let với bất đồng bộ

Hãy xem ví dụ sau:

```
for (var i = 0; i < 3; i ++) {
  setTimeout(function() {
    console.log('var', i);
  });
}

// var 3
// var 3
// var 3         

for (let i = 0; i < 3; i ++) {
  setTimeout(function() {
    console.log('var', i);
  });
}

// var 0
// var 1
// var 2
```

Nếu ta dùng `var` ở trên, sau khi 3 vòng lặp thực hiện xong, 3 dòng `console.log` bên trong `setTimeout` sẽ được thực thi, khi đó in ra giá trị `i` lúc này đã là `3` rồi, cho nên ta có 3 nội dung `var 3` giống nhau.

Tuy nhiên nếu dùng `let` như ở dưới, mỗi vòng lặp tạo ra một biến `i` không liên quan gì đến nhau, cho nên ta có 3 nội dung in ra khác nhau.

Vì vậy, ta thấy dùng `let` sẽ giúp cho code rõ ràng hơn trong trường hợp này, tránh phải sai lầm không mong muốn.

## Const

Coi về `let` rồi thì tranh thủ coi về `const` 1 chút luôn. `const` giúp ta định nghĩa một biến với giá trị không thể thay đổi.

```
const a = 'foo';
a = 'bar';     // Error: Uncaught TypeError: Assignment to constant variable.
```

# Class

Khi trước để tạo một giả `class` trong js ta sẽ dùng `function`, như thế này:

```
function Person() {
    // ....
}

Person.prototype.hello = function() {
    console.log('hello');
}

var p1 = new Person();
p1.hello();     // hello
```

Nay với ES6, ta có `class`, giúp ta có thể tạo lớp, đối tượng, làm việc với kế thừa một cách đơn giản hơn.

```
class Person {
    constructor (name) {
    this.name = name;
  }
  
  speak() {
    console.log('My name is', this.name);
  }
  
  // static method có thể được gọi mà không cần đến đối tượng của class
  static sayHello() {
    console.log('Hello');
  }
}

var p1 = new Person('Viet');
p1.speak();                 // My name is Viet

Person.sayHello();          // Hello
```

## Tạo một class con với extends

Để tạo một class con của một class ta dùng `extends`.

```
class Teacher extends Person {
  speak() {
    console.log('My name is', this.name, 'I am a teacher');
  }
}

var p2 = new Teacher('Hai');
p2.speak();     // My name is Hai I am a teacher
```

Nếu trong lớp con có `constructor` thì ta phải gọi phương thức `super()` trước khi sử dụng `this`.

```
class Student extends Person {
  constructor(name, school) {
    super(name);
    this.school = school;
  }
  
  speak() {
    console.log('My name is', this.name, 'I am studying in', this.school);
  }
}

var p3 = new Student('Minh', 'ST');
p3.speak();     // My name is Minh I am studying in ST
```

# Arrow functions

Một cách viết hàm mới, ngắn gọn hơn.

Dưới đây là ví dụ so sánh giữa cách viết cũ và mới.

```
// ES5
[1,2,3].map(function (num) { return num * 2; })
// => [2, 4, 6]

// ES6
[1,2,3].map((num) => { return num * 2; })
// => [2, 4, 6]

// Vì chỉ có 1 tham số num nên ta có thể bỏ dấu ngoặc đơn luôn
[1,2,3].map(num => { return num * 2; })
// => [2, 4, 6]

// Nhưng ở đây cũng chỉ có mỗi lệnh return nên ta có thể bỏ luôn dấu ngoặc nhọn và return
[1,2,3].map(num => num * 2)
// => [2, 4, 6]

```

Nếu như hàm có nhiều tham số, và có nhiều dòng lệnh hơn thì ta viết đầy đủ thế này:

```
[1,2,3].map((num, index) => {
  console.log(index);
  return num * 2;  
});
// 0
// 1
// 2
// => [2, 4, 6]
```

## Trả về một object

Chú ý nếu muốn trả về một object ta không chỉ đơn giản dùng `{ key: value }` được.

```
var func1 = () => { name: 'saysua' };
func1(); // undefined

var func2 = () => { name: 'saysua', age: 3 };
func2(); // Error: Uncaught SyntaxError
```

Lỗi ở đây là do, ở giữa cặp dấu ngoặc nhọn `{}` code sẽ được hiểu là một chuỗi các câu lệnh. Như ở `func1`, `name` được hiểu là 1 `label` chứ không phải là một `key` của object. (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/label)

Ta viết lại cho đúng như sau:

```
var func1 = () => ({ name: 'saysua' });
func1(); // => Object {name: "saysua"}

var func2 = () => ({ name: 'saysua', age: 3 });
func2(); // => Object {name: "saysua", age: 3}
```

## Arrow function không tự động bind this

Nếu ở ES5 ta tạo một hàm mới, nó sẽ luôn tự tạo ra một giá trị `this` vì vậy code dưới đây sẽ chạy bị sai.

```
function Runner() {
  this.count = 1;
  setTimeout(function() {
    this.count ++;  //  this ở đây không phải là this ở trên nên this.count không tồn tại
    console.log(this.count);  // NaN
  }, 100);
}

var r = new Runner();
```

Ta sẽ thường xử lý bằng cách gán một biến `that = this` hoặc là `bind(this)` vào hàm bên trong.

```
function Runner() {
  var that = this;

  this.count = 1;
  setTimeout(function() {
    that.count ++;
    console.log(that.count);  // 2
  }, 100);
}

var r = new Runner();
```

Còn arrow function không tự động tạo giá trị `this` nên đoạn code sau sẽ chạy đúng như ta mong muốn.

```
function Runner() { 
  this.count = 1;
  setTimeout(() => {
    this.count ++;
    console.log(this.count);  // 2
  }, 100);
}

var r = new Runner();
```

Tuy nhiên, chính vì đặc tính này mà bạn cần phải chú ý khi sử dụng arrow function trong một số trường hợp, ví dụ:

```
var sum = {
  a: 1,
  b: 2,
  run: () => {
    console.log(this === window); // => true (this không phải là sum)
    return this.a + this.b; // NaN (nên this.a và this.b không có)
  }
}; 

sum.run();
```

# Tổng kết

Mình thấy những tính năng mới của ES6 rất thú vị, giúp viết code nhanh và vui hơn, vẫn còn nhiều tính năng mới nữa nhưng mình chưa tìm hiểu hết được. Tuy nhiên một vài trường hợp cần phải sử dụng cẩn thận, kẻo nhanh quá lại hóa sai, không kiểm soát được các giá trị. Happy codding!

