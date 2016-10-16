title: Viết chức năng upload bằng ajax với jquery và javascript chay
date: 2013-11-05 06:43:31
tags:
  - Jquery
  - Ajax
---
Trong bài viết này, tôi sẽ chỉ ra hai cách để tạo ajax upload. Cách thứ nhất sử dụng Jquery cùng với plugin [Form Plugin](http://jquery.malsup.com/form/#file-upload) của nó và cách thứ hai dành cho bạn nào muốn mày mò vọc code để tự mình viết riêng phần upload chỉ dùng javacript. Ở bài viết này, tôi sử dụng PHP để viết phần server.

<!--more-->

# File xử lý server

Để cho đơn giản, nhiệm vụ của file phía server ở đây chỉ bắt file được upload lên, lưu vào thư mục upload  và trả về thông tin của file.

```
<?php
if ($_FILES["file"]["error"] > 0) {
  echo "Error: " . $_FILES["file"]["error"] . "<br>";
}
else {
  echo "Upload: " . $_FILES["file"]["name"] . "<br>";
  echo "Type: " . $_FILES["file"]["type"] . "<br>";
  echo "Size: " . ($_FILES["file"]["size"] / 1024) . " kB<br>";
  echo "Stored in: " . $_FILES["file"]["tmp_name"];

  // Save file
  move_uploaded_file($_FILES["file"]["tmp_name"], "upload/" . $_FILES["file"]["name"]);
  echo "Stored in: " . "upload/" . $_FILES["file"]["name"];
}
?>
```

# Ajax upload bằng Form Plugin

Để sử dụng Jquery Form Plugin, trước tiên ta cần tải nó về tại đây http://jquery.malsup.com/form/#download. Ở trang này các bạn cũng có thể xem thêm những ví dụ của nó, và để ý rằng plugin này không chỉ hữu ích cho việc upload file mà còn có thể xử dụng cho form ajax submit. Tuy nhiên ở đây tôi chỉ trình bày về ajax upload. Sau đó, ta nhúng thư viện Jquery và plugin Form mới tải về vào trang web. Cuối cùng, ta sử dụng phương thức ajaxForm  cho form cần thêm chức năng ajax upload. Mọi thao tác trên được thể hiện như đoạn code dưới đây.

```
<!doctype html>

<html lang="en">
<head>
  <meta charset="utf-8">

  <title>Ajax upload using plugin</title>
  <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
  <script src="js/jquery.form.js"></script>

  <style>
    #form-upload { padding: 10px; background: #A5CCFF; border-radius: 5px;}
    #progress { border: 1px solid #ccc; width: 500px; height: 20px; margin-top: 10px;text-align: center;position: relative;}
    #bar { background: #F39A3A; height: 20px; width: 0px;}
    #percent { position: absolute; left: 50%; top: 0px;}
  </style>
</head>

<body>
  <h1>Upload file using Form plugin</h1>

  <form id="form-upload" method="post" action="file.php" enctype="multipart/form-data">
    <input type="file" name="file" id="select-file"/>
    <input type="submit" value="Upload" id="submit-upload"/>
  </form>

  <div id="progress">
    <div id="bar"></div>
    <div id="percent">0%</div>
  </div>

  <div id="result">
  </div>

</body>
</html>

<script>
  $('#form-upload').ajaxForm({
    complete: function(xhr) {
      // Add response text to div #result
      $('#result').html(xhr.responseText);
    }
  });
</script>
```

## Hiển thị thêm % upload file

Trong lúc upload file, để hiển thị thêm % upload file, ta thêm một vài đoạn code ngắn vào phần javascript như sau, đoạn code thêm vào sẽ xử lý tính % upload khi ta đang upload file:

![Giao dien upload](/images/uploadfile.PNG)

```
<script>
  var bar = $('#bar');
  var percent = $('#percent');
  var result = $('#result');
  var percentValue = "0%";

  $('#form-upload').ajaxForm({
      // Do something before uploading
      beforeUpload: function() {
        result.empty();
        percentValue = "0%";
        bar.width = percentValue;
        percent.html(percentValue);
      },

      // Do somthing while uploading
      uploadProgress: function(event, position, total, percentComplete) {
        var percentValue = percentComplete + '%';
        bar.width(percentValue)
        percent.html(percentValue);
      },

      // Do something while uploading file finish
      success: function() {
        var percentValue = '100%';
        bar.width(percentValue)
        percent.html(percentValue);
      },

      // Add response text to div #result when uploading complete
      complete: function(xhr) {
        $('#result').html(xhr.responseText);
      }
  });
</script>
```

# Tự viết phần ajax upload

Ở phần này dành cho bạn nào muốn biết nếu không sử dụng plugin thì ta có thể tự viết được chức năng upload bằng ajax hay không? Tất nhiên là được. Ta sẽ sử dụng đến FormData  và XMLHttpRequest  để xử lý. Đoạn code dưới đây sẽ chỉ rõ hơn cho bạn thấy, với phần mã HTML giống như phần trên.

```
<script>
  var bar = document.getElementById('bar')
  var percent = document.getElementById('percent')
  var result = document.getElementById('result')
  var percentValue = "0%";

  var fileInput = document.getElementById('select-file');
  var form = document.getElementById('form-upload');

  form.addEventListener('submit', function(evt) {
    // Chan khong cho form tao submit
    evt.preventDefault();

    // Ajax upload
    var file = fileInput.files[0];

    // fd dung de luu gia tri goi len
    var fd = new FormData();
    fd.append('file', file);

    // xhr dung de goi data bang ajax
    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'file.php', true);

    xhr.upload.onprogress = function(e) {
      if (e.lengthComputable) {
        var percentValue = (e.loaded / e.total) * 100 + '%';
        percent.innerHTML  = percentValue;
        bar.setAttribute('style', 'width: ' + percentValue);
      }
    };

    xhr.onload = function() {
      if (this.status == 200) {
        result.innerHTML = this.response;
      };
    };

    xhr.send(fd);

  }, false);

</script>
```

Rõ ràng là việc không sử dụng plugin thì ta phải tự tay xử lý nhiều hơn, tuy nhiên với việc biết được bản chất của nó thì cũng thú vị. Nếu bạn thấy bài viết này bổ ích thì hãy chia sẻ cho bạn bè cùng đọc nhé.

# Source Code

Toàn bộ souce code đầy đủ của bài viết, các bạn có thể xem lấy về tại đây https://github.com/thachnuida/ajax-upload-demo