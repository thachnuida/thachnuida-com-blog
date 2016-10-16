title: Lowdb - DB không cần server
date: 2015-09-30 09:34:51
tags:
  - Nodejs
---

Từ yêu cầu cá nhân, mình cần  tạo một server API giả bằng nodejs để phục vụ cho việc làm frontend. Mình có ý muốn tìm một thư viện DB nhỏ gọn, dễ cài đặt sử dụng, hỗ trợ JSON, chỉ dựa trên file text đơn giản, chứ không cần phải cài đặt server như mongoDB và nếu thao tác giống như mongoDB thì tốt.

Sau một hồi dạo quanh thì mình đã tìm thấy [LowDB](https://github.com/typicode/lowdb)

{% blockquote %}
Need a quick way to get a local database?
{% endblockquote %}

<!-- more -->

# Cài đặt

```
npm install lowdb --save
```

# Sử dụng

```
var low = require('lowdb')
var db = low('db.json')

db('posts').push({ title: 'lowdb is awesome'})
```

Ở đây, dự liệu sẽ được tự động lưu vào file `db.json`

```
{
  "posts": [
    { "title": "lowdb is awesome" }
  ]
}
```

# Một vài thao tác sử dụng cơ bản

`LowDB` này sử dụng `lodash`, nên thao tác với API của nó cũng giống như thao tác với API của `lodash` vậy.

## Thêm dữ liệu

```
db('users').push({ name: 'Thach Nguyen', email: 'thach@email.com', role: 'admin'});
```

## Tìm 1 đối tượng

```
db('users').find({email: 'thach@email.com'});
```

## Tìm nhiều đối tượng

```
db('users').filter({role: 'admin'});
```

## Cập nhật dữ liệu

```
db('users')
  .chain()
  .find({email: 'thach@email.com'})
  .assign({role: 'member'})
  .value();
```

## Xóa dữ liệu

```
db('users').remove({role: 'member'});
```

## Lấy số lượng users

```
db('users').size();
```

## Hỗ trợ ID

Có 2 cách tạo ID cho dữ liệu.

- Sử dụng [underscore-db](https://github.com/typicode/underscore-db)

```
var db = low('db.json')

db._.mixin(require('underscore-db'))

var songId = db('songs').insert({ title: 'low!' }).id
var song   = db('songs').getById(songId)
```

- Dùng [uuid](https://github.com/broofa/node-uuid)

```
var uuid = require('uuid')

var songId = db('songs').push({ id: uuid(), title: 'low!' }).id
var song   = db('songs').find({ id: songId })
```

# Kết

Theo tác giả của lowDB thì:

Nếu các bạn muốn tìm một DB nhanh gọn, không cần cài đặt server thì `lowdb` này là một lựa chọn hợp lý. Còn bình thường thì cứ dùng MongoDB hoặc các DB khác. :)

Các bạn có thể đọc thêm cách sử dụng ở đây: https://github.com/typicode/lowdb