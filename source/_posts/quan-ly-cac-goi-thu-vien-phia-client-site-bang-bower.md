title: Quản lý các gói thư viện phía client site bằng Bower
date: 2013-12-07 06:35:07
tags:
  - Bower
---

Thời gian trước, có người nói với tôi rằng nên sử dụng Bower để cài đặt những gói thư viện js, css phía client site của một plugin tôi đang phát triển. Tôi cũng chỉ ậm ừ qua, và nghĩ rằng không cần thiết lắm bởi vì hiện tại những thư viện đó vẫn đang chạy tốt.

Vậy tại sao hôm nay tôi lại giới thiệu về bower cho các bạn, đơn giản vì anh bạn đó của tôi đã sử dụng bower cho dự án của mình. Khi anh ta gởi source code cho tôi nó không hề có các thư viện nào như jquery, angulajs, boostrap… và anh ta bảo tôi cài vào đi.

Lúc đó tôi mới mày mò lên các trang web để tải về các thư viện từ jquery, angularjs, boostrap …. rồi copy nó vào thư mục code.

– Không! Không cần phải làm như vậy.

Anh ta nói. “Chỉ cần sử dụng bower install “. Và quả nhiên, bower đã tự động cài hết các gói thư viện cho tôi. Thật tuyệt vời!

![bower logo](/images/bower-logo-300x300.png)

<!--more-->


# Bower

Bower là một công cụ quản lý các gói thư viện cho web (A package manager for the web). Nó có thể tìm kiếm, cài đặt hoặc gỡ bõ các gói thư viện (package) web như Javascript, CSS, HTML.

## Cài đặt Bower

Trước khi cài đặt bower bạn cần phải cài đặt.

– NodeJs: Có thể tải về và cài đặt tại đây http://nodejs.org/

– NPM: NPM là một gói quản lý của Nodejs. Khi cài đặt NodeJs thì bạn cũng đã có NPM

– GIT: Bower sẽ cài đặt nhiều gói thông qua GIT nên bạn cần phải cài đặt GIT trước khi sử dụng bower.

Sau khi đã cài xong 3 gói trên ta tiến hành cài đặt bower bằng câu lệnh sau:

```
$ npm install -g bower
```

## Cài đặt package

Ta có thể sử dụng bower để cài đặt một package, ví dụ cài đặt jquery. Tạo một thư mục và chạy lệnh.


```
$ bower install jquery
```

Sau khi chạy xong, bower sẽ tạo 1 thư mục bower_components và copy jquery vào.

![bower file](/images/bower-files.png)

Bên cạnh đó, ta còn có thể cài đặt 1 phiên bản đặc biệt của package bằng cách thêm dấu thăng (#) và số hiện phiên bản sau tên của package.

```
$ bower install jquery#1.7.0
```

Ta còn có thể sử dụng bower với git.

```
$ bower install https://github.com/strophe/strophejs.git
```

Ta cũng có thể sử dụng bower để cài đặt bởi 1 đường dẫn đến file riêng lẻ.

```
$ bower install http://backbonejs.org/backbone-min.js
```

## Tìm kiếm package

Giả sử bạn muốn sử dụng thư viện bootstrap, nhưng bạn không chắc chắn thư viện nào sẽ sử dụng. Ta có thể sử dụng bower để tìm kiếm xem có những thư viện nào có tên boostrap.

```
$ bower search boostrap
```

Search results:

```
    bootstrap git://github.com/twbs/bootstrap.git
    angular-bootstrap git://github.com/angular-ui/bootstrap-bower.git
    sass-bootstrap git://github.com/jlong/sass-bootstrap.git
    bootstrap-sass git://github.com/jlong/sass-twitter-bootstrap
    bootstrap-datepicker git://github.com/eternicode/bootstrap-datepicker.git
```

## Xem các package đã cài đặt

Để xem các package đã cài đặt trong thư mục,

```
$ bower list
bower check-new     Checking for new versions of the project dependencies..
test /home/khida/Desktop/test
├── backbone#1.1.0 extraneous
├── jquery#2.0.3 extraneous
└── strophejs#master extraneous
```

## Nâng cấp và gỡ bỏ package

Nếu như hôm nay bạn thấy rằng package đã có cập nhật mới và muốn nâng cấp nó lên, bạn không cần phải tự tay xóa rồi cài lại package, hãy để bower làm điều đó.

```
$ bower update
```

Còn muốn gỡ bỏ 1 package

```
$ bower uninstall jquery
```

## Sử dụng các packages đã cài

Để sử dụng các packages đã cài, ta chỉ cần chèn nó vào trang HTML như bình thường.

```
<!doctype html>
<html>
<head>
    <title>Using Bower</title>
</head>
<body>

<button id="click">Click Me!!</button>

<script type="text/javascript" src="bower_components/jquery/jquery.min.js"></script>
<script type="text/javascript">

    $(document).ready(function(){
        $("#click").click(function(){
            alert('Aha! You using bower!');
        });
    });
</script>
</body>
</html>
```

# Quản lý dễ hơn với bower.json

Giả sử dự án của chúng ta cần sử dụng nhiều packages, việc phải gõ lệnh liên tục để cài từng gói cũng thật không hay. Lúc này ta sẽ định nghĩa các gói thư viện vào trong file bower.json  và sử dụngbower  cài đặt tất cả cùng một lúc.

Ta dùng bower init  để tạo file bower.json

```
$ bower init
[?] name: Test bower
[?] version: 0.0.0
[?] description: This is a test bower
[?] main file:
[?] keywords:
[?] authors: Thach Nguyen <thachnuida@gmail.com>
[?] license: MIT
[?] homepage:
[?] set currently installed components as dependencies? Yes
[?] add commonly ignored files to ignore list? Yes
[?] would you like to mark this package as private which prevents it from being [?] would you like to mark this package as private which prevents it from being accidentally published to the registry? No

{
  name: 'Test bower',
  version: '0.0.0',
  description: 'This is a test bower',
  authors: [
    'Thach Nguyen <thachnuida@gmail.com>'
  ],
  license: 'MIT',
  ignore: [
    '**/.*',
    'node_modules',
    'bower_components',
    'test',
    'tests'
  ],
  dependencies: {
    jquery: '~2.0.3',
    backbone: '~1.1.0',
    strophejs: 'https://github.com/strophe/strophejs.git'
  }
}

[?] Looks good? Yes
```

Bạn có thể xem file `bower.json`  và để ý rằng, ở mục `dependencies` nó đã tự động thêm vào các package mà ta cài trước đó.

Giờ ta muốn cài thêm một package mới và muốn nó update lại file bower.json. Hãy thêm `--save` khi cài đặt.

```
$ bower install bootstrap --save
```

Hãy xem lại file `bower.json` ta thấy nó đã thêm package bootstrap vào:

```
{
  "name": "Test bower",
  "version": "0.0.0",
  "description": "This is a test bower",
  "authors": [
    "Thach Nguyen <thachnuida@gmail.com>"
  ],
  "license": "MIT",
  "ignore": [
    "**/.*",
    "node_modules",
    "bower_components",
    "test",
    "tests"
  ],
  "dependencies": {
    "jquery": "~2.0.3",
    "backbone": "~1.1.0",
    "strophejs": "https://github.com/strophe/strophejs.git",
    "bootstrap": "~3.0.3"
  }
}
```

Bạn thử xóa thư mục `bower_components` đi và chạy lệnh `$ bower install`

Ha! Các package đã được cài đặt lại đầy đủ như ban đầu. Thật tiện lợi!

# Tips

## Thay đổi thư mục cài đặt package của bower

Tạo file `.bowerrc`  và thêm vào thông tin thư mục

```
{
  "directory" : "public/components"
}
```

