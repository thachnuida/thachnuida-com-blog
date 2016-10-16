title: Làm quen với Angular 2 - Tạo một ứng dụng bằng TypeScript
date: 2015-12-02 14:48:27
tags:
  - Angular2
---

Angular2 hiện tại vẫn đang trong giai đoạn `Developer Preview` tuy nhiên mình sẽ bắt đầu tìm hiểu trước cho đến khi nó được `release` thì dùng luôn. Hiện tại trên trang của Angular2 thấy chúng ta có thể code bằng `Javascript`, `Typescript` và `Dart`, nhưng xem qua các bài hướng dẫn thì mọi người có vẻ dùng `Typescript` phổ biến hơn. Nên mình cũng sẽ làm quen với Angular2 bằng Typescript luôn.

Trong phần làm quen này, chúng ta cùng nhau viết ứng dụng vô cùng đơn giản coi như để biết được Angular2 là cái gì, và viết nó như thế nào. Một ứng dụng Hello World.

<!--more-->

Chúng ta sẽ cùng nhau thực hiện các bước sau:

- Tạo thư mục
- Tạo Component gốc trong file `app.ts`
- Nhúng các thư viện và code vào file `index.html`
- Chạy ứng dụng
- Cải tiến một vài phần cho ứng dụng

# Tạo thư mục

```
mkdir angular2
cd angular2
```

# Tạo Component gốc trong file app.ts

```
import {bootstrap, Component} from 'angular2/angular2';

@Component({
  selector: 'my-app',
  template: '<h1>Hello Angular2</h1>'
})
class AppComponent { }

bootstrap(AppComponent);
```

Ở trên, mình đã tạo ra một `Component`, thành phần quan trọng nhất trong Angular 2. Ta có thể coi nó như phần `views` của ứng dụng. Hiện tại `AppComponent` của chúng ta là một class rỗng, chưa làm gì cả.

Trong Typescript, dấu `@` cho ta biết đó là một `decoration`, nó giống như là metadata cho class.

- Đầu file, ta import `bootstrap` và `Component` từ thư viện angular2 để sử dụng. 
- `@Component` cho Angular biết `AppComponent` là một component. Config object của `@Component` gồm 2 thuộc tính.
  + `selector`: CSS selector cho Angular biết component của chúng ta sẽ được áp dụng ở đâu. Như ví dụ trên nó sẽ áp dụng vào element `<my-app></my-app>'
  + `template`: Phần hiển thị của component. Tạm thời ta dùng inline code, sau này ta sẽ tách nó ra thành 1 file template riêng.
- `bootstrap`: cho Angular biết component này là component gốc của ứng dụng. Sau này trong component gốc ta có thể có các component khác.

# Nhúng các thư viện và code vào file index.html

Trong file `index.html` ta có code như sau:

```
<html>
  <head>
    <title>Angular 2 Quickstart</title>
    <script src="https://code.angularjs.org/tools/system.js"></script>
    <script src="https://code.angularjs.org/tools/typescript.js"></script>
    <script src="https://code.angularjs.org/2.0.0-alpha.44/angular2.dev.js"></script>
    <script>
      System.config({
        transpiler: 'typescript',
        typescriptOptions: { emitDecoratorMetadata: true }
      });
      System.import('./app.ts');
    </script>
  </head>
  <body>
    <my-app>loading...</my-app>
  </body>
</html>
```

- Tạm thời ta sẽ không bàn về 3 thư viện ở trên cùng.
- Trong đoạn config cho `System` (từ `system.js`, đây là một công cụ cho phép ta import code) ta yêu cầu chuyển đổi code từ `Typescript` sang `Javascript` ngay trên trình duyệt.
- Import `AppComponent` của chúng ta từ file `app.ts`
- Trong `<body>` ta thêm một element `<my-app>`, chính là selector của `AppComponent` đã viết ở trên.

# Chạy ứng dụng

Để chạy ứng dụng ta cần 1 static file server, ở đây mình sẽ dung `live-server`

```
npm install -g live-server
cd /path/to/source
live-server
```

![Hello Angular 2](/images/hello-angular2.png)

Chúc mừng, ứng dụng angular 2 đầu tiên của bạn đã hoàn thành.

# Cải tiến

Ở đây có một vài phần chúng ta sẽ cần phải cải tiến cho ứng dụng của mình.

1. Cấu trúc lại ứng dụng cho việc phát triển sau này
2. Sử dụng resource từ local thay vì tải từ mạng:
  Tải resource từ trên mạng thì hiện tại vẫn ổn, nhưng trong quá trình dev mỗi lần ta reload lại trình duyệt ta sẽ mất thêm thời gian tải các resource từ mạng, vì vậy ta đưa các file resource về máy mình rồi tải lại sẽ nhanh hơn.
3. Chuyển đổi Typescript sang Javascript bằng công cụ thay vì trên trình duyệt:
  Vì việc chuyển đổi thực hiện trên trình duyệt sẽ khiến cho ứng dụng của chúng ta trở nên chậm, khi có nhiều file cần phải xử lý. Vì vậy ta sẽ đổi sang javascript trước rồi mới để trình duyệt tải vào.
4. Sử dụng một vài công cụ cho việc dev (Như là công cụ để thực hiện mục 3)

## Cấu trúc lại ứng dụng cho việc phát triển sau này

Trong thư mục hiện tại, ta tạo thêm thư mục `src` và thư mục con của nó `app`. Di chuyển `index.html` vào thư mục `src` và `app.ts` vào thư mục `src/app`.

```
angular2
  |- src
      |- app
      |   |- app.ts
      |- index.html
```

## Cài đặt các package npm

```
npm init -y
npm i angular2@2.0.0-alpha.44 systemjs@0.19.2 --save --save-exact
npm i typescript live-server --save-dev
```

- `angular`: thư viện angular
- `systemjs`: hỗ trợ module loading

Ngoài ra có 2 packages hỗ trợ cho việc dev
- `typescript`: chuyển đổi typesript sang javascript
- `live-server`: static server tự động reload lại trang web khi file thay đổi

Sau khi chạy lệnh cài đặt xong ta có file `package.json` như sau:

```
{
  "name": "angular2-quickstart",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "angular2": "2.0.0-alpha.44",
    "systemjs": "0.19.2"
  },
  "devDependencies": {
    "live-server": "^0.8.2",
    "typescript": "^1.7.3"
  }
}
```

Tìm đến phần `scripts` sửa lại:

```
"scripts": {
  "tsc": "tsc -p src -w",
  "start": "live-server --open=src"
}
```

## Cập nhật lại file index.html

Nạp resource từ thư mục ta vừa cài các packages

```
<script src="../node_modules/systemjs/dist/system.src.js"></script>
<script src="../node_modules/angular2/bundles/angular2.dev.js"></script>
```

Cập nhật lại cấu hình của `System`

```
<script>
  System.config({
    packages: {'app': {defaultExtension: 'js'}}
  });
  System.import('app/app');
</script>
```

Vì bây giờ ta không chuyển đổi typescript ngay trên trình duyệt nữa, mà sẽ chạy lệnh chuyển đổi từ máy trước, nên trên trình duyệt ta chỉ nạp các file js.

## Cấu hình cho việc biên dịch typescript

Trong thư mục `src` ta thêm file `tsconfig.json` với nội dung như sau:

```
{
  "compilerOptions": {
    "target": "ES5",
    "module": "commonjs",
    "sourceMap": true,
    "emitDecoratorMetadata": true,
    "experimentalDecorators": true,
    "removeComments": false,
    "noImplicitAny": false
  }
}
```

Bạn có thể xem thêm các tùy chọn tại đây [Typescript config](https://github.com/Microsoft/TypeScript/wiki/tsconfig.json)

## Biên dịch typescript sang javascript

Di chuyển đến thư mục gốc của ứng dụng, chạy lệnh `tsc` mà ta vừa thêm vào `package.json` ở trên:

```
npm run tsc
```

Sau khi chạy, ta sẽ thấy trong thư mục `src/app` có thêm file `app.js` và `app.js.map` file này giúp ích cho ta trong việc debug giữa file javascript và file typescript. Vì đã thêm tham số `-w` nên câu lệnh sẽ tiếp tục `watch`-theo dõi các file typescript, khi có thay đổi nó sẽ tự biên dịch lại. Bạn cứ để nó chạy ở đó, nếu muốn dừng thì nhấn `Ctrl+C`.

## Chạy ứng dung

Mở một cửa sổ terminal khác, di chuyển đến thư mục gốc của ứng dụng và chạy lệnh:

```
npm start
```

Và trình duyệt lại chạy lên, hiển thị ứng dụng của chúng ta với chữ **"Hello Angular2"**

## Thay đổi nội dung

Như đã nói ở trên, công cụ biên dịch typescript của chúng ta sẽ tự động biên dịch lại khi nội dung file thay đổi, và live-server cũng tự động tải lại trang khi nội dung file thay đổi. Bây giờ bạn vào file `app.ts` thử thay đổi lại `template` của component và xem trình duyệt tự động cập nhật lại nội dung cho bạn như thế nào.

# Tổng kết

- Angular 2 có phần quan trọng nhất là `Component`
- Ta có thể dùng Typescript để viết ứng dụng với Angular 2 và biên dịch ra javascript bằng **T**ype**s**cript **C**ompiler (TSC)
- Bằng cách để Compiler theo dõi file và sử dụng live-server ta có thể thấy được ứng dụng thay đổi nhanh chóng sau khi thay đổi code
- Đây chỉ là một ứng dụng rất đơn giản, để làm quen với Angular 2

Các thao tác trong bài này mình hoàn toàn theo bài hướng dẫn tại [Angular Quickstart](https://angular.io/docs/ts/latest/quickstart.html) các bạn có thể đọc để nắm thêm chi tiết.

# Trình duyệt hỗ trợ ES6

Angular 2 yêu cầu trình duyệt hỗ trợ ES6, hầu hết đều đã được hỗ trợ với các trình duyệt hiện tại. Tuy nhiên với các trình duyệt cũ hơn như IE11 ta có thể dùng thêm thư viện `shim`

Cài đặt `shim`

```
npm install es6-shim --save
```

Thêm vào `index.html`

```
<script src="../node_modules/es6-shim/es6-shim.js"></script>
```

