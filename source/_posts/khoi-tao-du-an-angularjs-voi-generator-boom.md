title: Khởi tạo dự án AngularJS với generator-boom
date: 2014-10-11  16:03
tags:
- Angularjs
---

Khi bắt đầu một dự án AngularJS chúng ta có rất nhiều việc phải làm như tạo cấu trúc thư mục, viết code để tự động build các file js, css, chuẩn bị code để test... Dĩ nhiên ta có thể tự mình lần lượt làm các việc đó, hoặc như trước đây, tôi tạo sẵn một thư mục dự án mẫu rồi khi nào dùng sẽ copy qua dùng lại. Tuy nhiên vẫn tốt hơn nếu như có một công cụ giúp mình làm các việc kể trên, và trong bài này tôi giới thiệu đến các bạn công cụ [generator-boom][1], một công cụ sinh code AngularJS dành cho Yeoman.

# Cài đặt generator-boom

<!-- more -->

Để có thể dùng generator-boom ta cần phải cài:

*   [NodeJS][2]

*   Yeoman

    `$ npm install -g yo`

*   Generator-boom

    `$ npm install -g generator-boom`

*   Bower

    `$ npm install -g bower`

*   Gulp : Generator-boom sử dụng Gulp để build code nên ta cài đặt Gulp luôn

    `$ npm install -g gulp`

# Khởi tạo dự án bằng generator-boom

Đúng như tên gọi của nó "Boom", chỉ cần một câu lệnh và boom tất cả đã xong.

*   Di chuyển đến thư mục code của bạn

    `$ cd /path/to/your/code`

*   Gõ lệnh

    `$ yo boom [app-name]`

    **app-name** ở đây là tên module chính cho dự án angularjs của bạn.

Sau đó công cụ sẽ hỏi bạn một vài câu hỏi như bạn có muốn nhúng thư viện jquery vào không, muốn sử dụng những thành phần nào của angularjs... Cuối cùng, công cụ sẽ tạo thư mục code cho bạn, tự động tải các thư viện liên quan về. Xong, giờ là thời gian cho bạn viết code, chỉ mất chưa đầy 1 phút.

# Generator-boom có gì?

Dưới đầy là một vài đặc điểm của generator-boom:

*   Sử dụng Gulp để build code.
*   LiveReload: khi sửa code, tự động tải lại trang web.
*   Code của Development và Production được tách riêng.
*   Sử dụng JsHint để kiểm tra JS code.
*   Có sẵn Protractor cho E2E testing.
*   Một đống các câu lệnh giúp tạo nhanh file style, controller, service ...

# Cấu trúc của dự án do boom tạo ra

Dự án của boom tạo ra có cấu trúc phân chia rõ ràng các thành phần:

<pre>- app/
    |- css/
        |- application.scss
        |- fonts.css
    |- fonts/
    |- img/
    |- js/
        |- controllers/
        |- directives/
        |- factories/
        |- filters/
        |- libs/
        |- providers/
        |- services/
        |- app.js
    |- templates/
    |- index.html
    |- bower.json
    |- package.json
    |- gulpfile.js
</pre>

# Chạy code

Để chạy dự án ta gõ lệnh:

`$ gulp`

Khi đó Gulp sẽ tự động tạo 1 thư mục build, đưa các files cần chạy vào đó và mở 1 tab mới trên trình duyệt vào trang chủ của dự án.

# Build code cho phiên bản Production

Khi đã hoàn thành xong dự án ta muốn build một phiên bản code đã được minify, ta chạy:

`$ gulp prod`

# Thông tin thêm

*   Style trong boom có thể dùng scss hoặc css bình thường.
*   Boom có sẵn các câu lệnh để nhanh chóng tạo file, xem phần Commands trong trang của Boom.
*   Khi đã chạy Gulp, mỗi lần bạn chỉnh sửa file trình duyệt sẽ tự động tải lại trang web cho bạn.
*   Mọi thông tin thêm về Boom có thể coi tại đây [Generator-boom][1]

# Kết

Tất nhiên, công cụ sinh code ngoài generator-boom ra còn rất nhiều, các bạn có thể tự mình tìm hiểu và thử nghiệm. Dù gì đi nữa thì mục đích của các công cụ cũng giúp ta giảm thiểu thời gian tạo dự án, tự động hóa các tác vụ phải làm thường xuyên như build code, kiểm tra code...

Hy vọng các bạn sẽ thích công cụ này, hoặc nếu các bạn đang làm việc với một công cụ khác xin hãy chia sẻ với tôi và mọi người cùng biết tại đây.

 [1]: https://www.npmjs.org/package/generator-boom
 [2]: http://nodejs.org/