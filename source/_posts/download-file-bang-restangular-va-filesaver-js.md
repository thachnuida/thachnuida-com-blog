title: Download file bằng Restangular và FileSaver
date: 2017-03-27 15:41:00
tags:
  - Angularjs
  - Restangular
---

Mình cần viết chức năng download có API đã được xây dựng trước để tải file bằng phương thức `POST`. Ở client mình dùng `Restangular`. Như các bạn biết thì dùng `Restangular` ta chỉ có thể đọc được dữ liệu chứ không lưu nó thành dạng file được. Sau một hồi tìm kiếm, mình tìm được thư viện [FileSaver.js](https://github.com/eligrey/FileSaver.js/) giúp ta lưu file từ `javascript`.

Đây là kết quả trả về từ server khi ta gọi API:

```
POST /api/download


Request Headers:
----------------

Authorization: Bearer .... (Server của mình yêu cầu token này để xác thực user)

Response Header:
----------------
Content-Type: application/vnd.ms-excel
Content-Disposition: attachement; filename=report.xls
```

Đây là đoạn code mình xử lý để gọi đến API và lưu data trả về thành file trên máy tính:


```
var DownloadRestangular = Restangular.withConfig(function(RestangularConfigurer) {
  RestangularConfigurer.setFullResponse(true);
});

DownloadRestangular.all(url)
.withHttpConfig({responseType: 'arraybuffer'})
.post(postValue, params)
.then(function(res) {
    var filename = res.headers('Content-Disposition').match(/filename=(.*)/)[1];
    var file = new Blob([res.data], { type: res.headers('Content-Type') });
    saveAs(file, filename);
});
```

Trước tiên, ta cần cài đặt `setFullResponse` cho `Restangular` để lấy được thông tin `headers` từ đó ta mới có `file type` và `file name`. 

Sau đó ta cần `response` trả về kiểu `arraybuffer` như vậy ta mới dùng được với thư viện `FileSaver.js`.

Cuối cùng là chuyển dữ liệu trả về sang `Blob` và lưu lại bằng hàm `saveAs` của `FileSaver`.

