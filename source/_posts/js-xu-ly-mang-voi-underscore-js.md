title: Xử lý mảng với Underscore.js
date: 2013-08-12 07:54:33
categories:
  - Javascript
tags:
  - Note
---
Chắc hẳn mỗi chúng ta khi lập trình không ít thì nhiều phải làm việc với mảng, cho dù sử dụng bất kì ngôn ngữ nào. Và javascript cũng vậy, tuy nhiên mảng trong javascript không có nhiều phương thức hỗ trợ như tìm kiếm, sắp xếp… ta có thể tự viết những phương thức đó cho riêng mình. Tuy nhiên, bằng cách sử dụng thư viện **underscore.js** việc thao tác mảng sẽ trở nên đơn giản hơn bao giờ hết. Dưới đây là một số cách sử dụng underscore với mảng mà mình hay dùng.

*underscore.js* còn có nhiều hàm hỗ trợ khác các bạn có thể tìm hiểu thêm tại trang tài liệu của nó. Trong bài viết này chỉ giới thiệu đến các hàm làm việc với mảng hay được sử dụng.

*underscore* sử dụng dấu `_` (gạch dưới) để làm định danh cho nó.

Cách gọi hàm của *underscore*

```
_.tenHam( các biến )
```

<!-- more -->

Các ví dụ dưới đây sẽ sử dụng mảng `dogs`  làm mẫu

```
dogs = [
    { name: "bo", age: "1", color: "yellow" },
    { name: "ki", age: "2", color: "black" },
    { name: "kit", age: "1.5", color: "white" },
    { name: "rex", age: "3", color: "brown" },
    { name: "bin", age: "2", color: "yellow" },
]
```

Danh sách các hàm xử lý với mảng trong bài viết này

- [Lặp qua các phần tử trong mảng](#array-each)
- [Tìm một phần tử trong mảng](#array-find)
- [Tìm nhiều phần tử trong mảng](#array-filter)
- [Kiểm tra một phần tử có trong mảng hay không](#array-contains)
- [Tìm vị trí của một giá trị trong mảng](#array-indexof)
- [Tìm giá trị lớn nhất trong mảng](#array-max)
- [Tìm giá trị nhỏ nhất trong mảng](#array-min)
- [Sắp xếp mảng](#array-sortby)
- [Đếm các phần tử trong mảng theo một tiêu chí nào đó](#array-countby)
- [Đảo lộn các phần tử trong mảng](#array-shuffle)
- [Loại bỏ các phần tử lặp nhau trong mảng](#array-uniq)

## <a name="array-each"></a> Lặp qua các phần tử trong mảng

```
_.each(list, iterator, [context])
```

Lặp qua các phẩn tử trong mảng, lấy giá trị của phần tử gởi vào hàm `iterator` . Các thao tác với phần tử được dyệt qua, chúng ta viết vào hàm `iterator` . Hàm `iterator`  nhận được các tham số sau  `(element, index, list)`

Ví dụ với hàm `iterator` đầy đủ tham số

```
_.each(dogs, function(dog, index, list) {
    console.log(index + "  - Name: " + dog.name);
});

/*

0  - Name: bo
1  - Name: ki
2  - Name: kit
3  - Name: rex
4  - Name: bin

*/
```

- `dog`: chú cún được duyệt qua
- `index`: vị trí của chú cún trong mảng
- `list`: chính là mảng dogs

Ta có thể dùng `_.each`  chỉ với 1 tham số trong hàm iterator

```
_.each(dogs, function(dog) {
    console.log(dog.name + " is " + dog.age + " year(s) old.");
});

/*

bo is 1 year(s) old.
ki is 2 year(s) old.
kit is 1.5 year(s) old.
rex is 3 year(s) old.
bin is 2 year(s) old.

*/
```

## <a name="array-find"></a> Tìm một phần tử trong mảng

```
_.find(list, iterator, [context])
```

Tìm phần tử đầu tiên thỏa mãn điều kiện được định nghĩa trong `iterator` . Nếu tìm không thấy trả về `undefined`.

Tìm và hiển thị thông tin của chú cún có tên là rex

```
var rex = _.find(dogs, function(dog) { return dog.name == "rex"; });
console.log(rex);

/*

Object {name: "rex", age: "1", color: "yellow"}

*/
```

## <a name="array-filter"></a> Tìm nhiều phần tử trong mảng

```
_.filter(list, iterator, [context])
```

Tìm và trả về một mảng các phần tử có giá trị thỏa mãn điều kiện được định nghĩ trong `iterator` .

```
var oldDogs = _.filter(dogs, function(dog) { return dog.age >= 2; });

_.each(oldDogs, function(dog) { console.log(dog.name + " - " + dog.age) });

/*

ki - 2
rex - 3
bin - 2

*/
```

## <a name="array-contains"></a> Kiểm tra một phần tử có trong mảng hay không

```
_.contains(list, value)
```

Trả về `true` nếu giá trị cần tìm có trong mảng.

```
_.contains([1, 2, 3], 3) // => true
_.contains([1, 2, 3], 4) // => false
```

## <a name="array-indexof"></a> Tìm vị trí của một giá trị trong mảng

```
_.indexOf(array, value, [isSorted])
```

Tìm vị trí của một giá trị trong mảng, trả về -1 khi giá trị không có trong mảng. Nếu ta biết chắc mảng đã được sắp xếp trước, để tìm kiếm được nhanh hơn ta truyền giá trị `true`  cho tham số `isSorted`

```
_.indexOf([1 ,2, 3], 3) // => 2
```

## <a name="array-max"></a> Tìm giá trị lớn nhất trong mảng

```
_.max(list, [iterator], [context])
```

Lấy giá trị lớn nhất trong mảng. Nếu `iterator`  được truyền vào, thì giá trị của nó sẽ được sử dụng để đánh giá.

```
_.max([1, 2, 5, 3]) // => 5

_.max(dogs, function(dog) { return dog.age })
// => { name: "rex", age: "3", color: "brown" }
```

## <a name="array-min"></a> Tìm giá trị nhỏ nhất trong mảng

```
_.min(list, [iterator], [context])
```

## <a name="array-sortby"></a> Sắp xếp mảng

```
_.sortBy(list, iterator, [context])
```

Trả về một bản copy của mảng đã được sắp xếp theo tiêu chí của `iterator` . `iterator` cũng có thể là tên của một thuộc tính được dùng làm tiêu chí sắp xếp, ví dụ `age`

```
_.sortBy([2, 5, 1], function(num) { return num; }) // => [1, 2, 5]

_.sortBy([2, 5, 1], function(num) { return -num; }) // => [5, 2, 1]

_.sortBy(dogs, function(dog) { return -dog.age; })

/*
[
    {name:"rex", age: 3 , color:"brown"},
    {name:"ki", age: 2 , color:"black"},
    {name:"bin", age: 2 , color:"yellow"},
    {name:"kit", age: 1.5 , color:"white"},
    {name:"bo", age: 1 ,color:"yellow"}
]
*/

_.sortBy(dogs, "age")

/*
[
    {name:"bo", age: 1 ,color:"yellow"}
    {name:"kit", age: 1.5 , color:"white"},
    {name:"ki", age: 2 , color:"black"},
    {name:"bin", age: 2 , color:"yellow"},
    {name:"rex", age: 3 , color:"brown"},
]
*/
```

* Chú ý: * Lệnh sắp xếp không làm thay đổi trực tiếp lên mảng mà chỉ tạo một bản `copy` của mảng và tiến hành sắp xếp trên đó. Để thực sự sắp xếp mảng ta phải gán mảng bằng giá trị đã sắp xếp.

```
dogs = _.sortBy(dogs, "age")
```

## <a name="array-countby"></a> Đếm các phần tử trong mảng theo một tiêu chí nào đó

```
_.countBy(list, iterator, [context])
```

Đếm các phần tử trong mảng theo tiêu chí được định nghĩ trong `iterator`, trả về một mảng gồm giá trị của các tiêu chí và số lượng các phần tử thỏa mãn tiêu chí.

```
_.countBy([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], function(num) {
    return num % 3 == 0 ? "chiaHetCho3" : "khongChiaHetCho3";
});

// => {khongChiaHetCho3: 7, chiaHetCho3: 3}

_.countBy(dogs, function(dog) { return dog.color; })

// => {yellow: 2, black: 1, white: 1, brown: 1}
```

## <a name="array-shuffle"></a> Đảo lộn các phần tử trong mảng

```
_.shuffle(list)
```

Trả về một bản copy của mảng với các giá trị đã được xáo trộn.

```
_.shuffle([1, 2, 3, 4]) //=> [2, 4, 3, 1]
```

## <a name="array-uniq"></a> Loại bỏ các phần tử lặp nhau trong mảng

```
_.uniq(array, [isSorted], [iterator])
```

Trả về một bản copy của mảng với cái phần tử trùng nhau đã được loại bỏ.

```
_.uniq([1, 2, 1, 3, 1, 4]); // => [1, 2, 3, 4]
```

