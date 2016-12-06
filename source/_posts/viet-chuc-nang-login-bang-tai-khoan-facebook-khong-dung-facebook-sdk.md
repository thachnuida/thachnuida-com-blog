title: Viết chức năng login bằng tài khoản facebook không dùng Facebook SDK
date: 2013-09-03 15:12:10
tags:
  - PHP
  - Facebook
  - OAuth
---

Bài viết hơi dài, mong bạn đọc nhẫn nại!

Hiện nay hẳn các bạn sẽ bắt gặp rất nhiều trang web có chức năng sử dụng tài khoản facebook để đăng nhập, điều đó thuận tiện ở chỗ người dùng không phải mất công tạo tài khoản trên trang web mình mà vẫn có thể nhanh chóng đăng nhập để sử dụng các chức năng của thành viên.

Nếu bạn có ý định tích hợp chức năng đăng nhập bằng facebook cho website của mình mà không muốn sử dụng facebook SDK hoặc chỉ muốn tự mình viết để hiểu được cơ chế xác thực của facebook thì bài viết này sẽ hướng dẫn cho các bạn làm được điều đó <!--more--> với minh họa bằng ngôn ngữ PHP.


Sau bài viết này, nếu nắm được các bước thực hiện các bạn hoàn toàn có thể áp dụng cho các tài khoản khác như google, hoặc sử dụng ngôn ngữ lập trình khác để làm điều tương tự.

Toàn bộ các bước thực hiện trong bài viết này được sử dụng thông tin hướng dẫn bởi facebook ở 2 địa chỉ sau:

- https://developers.facebook.com/docs/facebook-login/getting-started-web/
- https://developers.facebook.com/docs/facebook-login/login-flow-for-web-no-jssdk/

# Quy trình xác thực bằng facebook

Để xác thực bằng facebook chúng ta sẽ trải qua 4 bước cơ bản như sau:

- Đầu tiên, từ trang web của mình, chúng ta yêu cầu người dùng cho phép truy cập vào thông tin của người dùng (Từ thông tin này ta sẽ dùng để đăng nhập vào hệ thống). Thực ra ở bước này ta sẽ chuyển hướng người dùng đến trang xác thực của facebook.

- Tiếp theo, người dùng sẽ xác nhận và cung cấp cho ta các quyền để truy cập vào thông tin của người dùng.

- Sau đó, facebook sẽ chuyển hướng người dùng về lại trang web của ta cùng với thông tin về quyền truy cập mà người dùng đã cho phép.

- Từ thông tin facebook trả về, ta sẽ gọi các hàm API của facebook để lấy thông tin của người dùng như user name, email…

- Với những thông tin đã có được, ta tiến hành đăng nhập cho người dùng ( chẳng hạn lưu vào session rằng người dùng đã đăng nhập), nếu muốn ta có thể sử dụng thông tin người dùng để lưu vào database.

Tôi đã hệ thống các bước trên lại thành sơ đồ đơn giản như sau:

![So do dang nhap facebook](/images/facebook-flow.png)

# Cùng viết vài đoạn code

Dưới đây tôi sẽ cố gắng trình bày thật chi tiết và dễ hiểu việc thực hiện sơ đồ trên với một ví dụ đăng nhập đơn giản, sử dụng ngôn ngữ PHP.

(Xin chú ý các bước dưới đây là các bước thực hiện chứ không có quan hệ song song với các bước ở sơ đồ trên)

## Bước 1: Tạo một Facebook App và Setting

Trước tiên, ta cần tạo 1 app trong facebook và cài đặt nó để chạy trên môi trường localhost (vì ở đây tôi sẽ ví dụ chạy trên localhost, các bạn có thể sửa lại cài đặt cho phù hợp với môi trường riêng của mình)

Tạo 1 app mới tại [Facebook App Dashboard](https://developers.facebook.com/apps/) và điền các thông tin cơ bản

![Tao 1 app moi](/images/facebook-new-app.png)

Sau đó, ta điền thêm các thông tin cấu hình cho app

![Dien thong tin fb app](/images/facebook-app-info.png)

Ở hình trên ta thấy có 2 thông tin quan trọng là App ID và App secret sẽ được sử dụng trong code sau này.

## Bước 2: Tạo trang đăng nhập

File: `index.php`

Sau khi đã tạo xong app trên facbook, tiếp theo ta tạo trang đăng nhập cho website của mình. Để cho đơn giản, trang đăng nhập của tôi chỉ bao gồm 1 nút đăng nhập. Khi người dùng kích chuột vào đó, nó sẽ nhảy tới trang xác thực của facebook.

![Trang login](/images/facebook-login.png)


![Trang xac thuc facebook](/images/facebook-auth.png)

Code của trang index.php

```
<!DOCTYPE HTML>
 
<html>
 
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
        <title>Facebook login</title>
    </head>
 
    <body>
 
        <a href="https://www.facebook.com/dialog/oauth?client_id=509011619175617&redirect_uri=http://localhost/fblogin/callback.php&scope=public_profile"><img src="facebook-sign-in.png"/></a>
 
    </body>
 
</html>
```

{% blockquote %}
Updated 06/12/2016: Thêm tham số `scope` để lấy thông tin người dùng.
{% endblockquote %}

Ở dòng 12, trong thẻ `<a>` ta có 2 tham số quan trọng:

- `client_id` : đây là APP ID của app ta vừa tạo
- `redirect_uri` : sau khi người dùng xác thực với facebook xong, facebook sẽ tự động điều hướng người dùng trở lại địa chỉ này. (tại đây ta sẽ xử lý các tham số được gởi về bởi facebook để lấy thông tin người dùng)
- `scope`: yêu cầu truy cập vào thông tin người dùng, vì chỉ cần lấy thông tin cá nhân cơ bản nên scope là `public_profile`

## Bước 3: Tạo trang xử lý khi người dùng đã xác thực bằng facebook

File: `callback.php`

Ở bước này ta thực hiện 3 bước nhỏ:

- Lấy access token từ giá trị trả về của facebook

- Lấy thông tin người dùng từ access token có được

- Login người dùng vào hệ thống

Sau khi đã xác thực xong với facbook, người dùng sẽ được chuyển hướng về lại địa chỉ http://localhost/fblogin/callback.php . Khi chuyển hướng người dùng trở lại trang callback.php , facebook gởi thêm các thông tin xác thực của người dùng, từ đó ta có thể lấy được thông tin của người dùng vừa xác thực.

Cụ thể ở đây facebook điều hướng người dùng về địa chỉ của ta cùng với một tham số GET code  như url sau:

```
http://localhost/fblogin/callback.php?code=AQDUeZ-…yBXVsc18#_=_
```

Từ giá trị của code  ta sẽ lấy ra được access token  để truy cập vào thông tin người dùng bằng cách gọi một HTTP GET request đến địa chỉ có dạng như sau:

```
GET https://graph.facebook.com/v2.8/oauth/access_token?
   client_id={app-id}
   &redirect_uri={redirect-uri}
   &client_secret={app-secret}
   &code={code-parameter}
```

Nếu như thành công, ta sẽ nhận được kết quả trả về:

```
{
  "access_token": {access-token}, 
  "token_type": {type},
  "expires_in": {seconds-til-expiration}
}
```

Dưới đây là đoạn code thực hiện các công việc trên:

```
<?php
    $app_id = "";
    $app_secret = "";
    $redirect_uri = urlencode("http://localhost/fblogin/callback.php");

    // Get code value
    $code = $_GET['code'];
    
    // Get access token info
    $facebook_access_token_uri = "https://graph.facebook.com/v2.8/oauth/access_token?client_id=$app_id&redirect_uri=$redirect_uri&client_secret=$app_secret&code=$code";    
    
    $ch = curl_init(); 
    curl_setopt($ch, CURLOPT_URL, $facebook_access_token_uri);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, FALSE);    
        
    $response = curl_exec($ch); 
    curl_close($ch);

    // Get access token
    $aResponse = json_decode($response);
    $access_token = $aResponse->access_token;

?>
```

Để lấy được thông tin người dùng ta gọi đến Facebook Graph API sau:

```
https://graph.facebook.com/me?access_token={access_token}
```

![Thong tin user](/images/facebook-auth-info.png)
Thông tin facebook user lấy bằng Graph API

Đoạn code lấy thông tin người dùng bằng Facebook Graph API

```
    // ...

    // Get user infomation
    $ch = curl_init(); 
    curl_setopt($ch, CURLOPT_URL, "https://graph.facebook.com/me?access_token=$access_token");
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, FALSE);    
        
    $response = curl_exec($ch); 
    curl_close($ch);
    
    $user = json_decode($response);
```

Cuối cùng, khi đã có thông tin user ta có thể tiến hành đăng nhập cho user bằng cách đơn giản lưu biến trong session, khi đó ở những trang khác ta có thể kiểm tra session để biết người dùng đã đăng nhập hay chưa.

```
    // ...
    // Log user in
    $_SESSION['user_login'] = true;
    $_SESSION['user_name'] = $user->name;
    
    echo "Wellcome ". $user->name ."!";   
```

Toàn bộ code đầy đủ file callback.php

```
<?php
    session_start();
    
    $app_id = "";
    $app_secret = "";
    $redirect_uri = urlencode("http://localhost/fblogin/callback.php");    
    
    // Get code value
    $code = $_GET['code'];
    
    // Get access token info
    $facebook_access_token_uri = "https://graph.facebook.com/v2.8/oauth/access_token?client_id=$app_id&redirect_uri=$redirect_uri&client_secret=$app_secret&code=$code";    
    
    $ch = curl_init(); 
    curl_setopt($ch, CURLOPT_URL, $facebook_access_token_uri);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, FALSE);    
        
    $response = curl_exec($ch); 
    curl_close($ch);

    // Get access token
    $aResponse = json_decode($response);
    $access_token = $aResponse->access_token;
    
    // Get user infomation
    $ch = curl_init(); 
    curl_setopt($ch, CURLOPT_URL, "https://graph.facebook.com/me?access_token=$access_token");
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, FALSE);    
        
    $response = curl_exec($ch); 
    curl_close($ch);
    
    $user = json_decode($response);

    // Log user in
    $_SESSION['user_login'] = true;
    $_SESSION['user_name'] = $user->name;
    
    echo "Wellcome ". $user->name ."!";    

?>
```

## Bước 4: Lưu thông tin người dùng nếu muốn

Ở bước 3, sau khi đã lấy thông tin người dùng, các bạn có thể lưu người dùng vào database, hoặc kiểm tra người dùng đã có trên hệ thống chưa … Thông tin bây giờ là của bạn, các bạn có thể làm bất cứ điều gì mình muốn.

Hy vọng, với những bước đơn giản ở trên, các bạn có thể tự nắm được cách xác thực của facebook để lấy thông tin người dùng, hoặc bằng một vài thay đổi nhỏ ở bước 1, các bạn hoàn toàn có thể yêu cầu người dùng cung cấp quyền post bài viết, upload ảnh … các bạn nên đọc thêm ở 2 link mình đã dẫn ra ở trên để có thể làm được điều này.

Ngoài ra, mình mong rằng với cách xác thực bằng facebook ở trên, các bạn cũng có thể tự mình viết được những đoạn mã xác thực cho các mạng xã hội khác như google, twitter…

Chúc các bạn một ngày vui vẻ sau khi đã đọc xong bài viết hơi dài này. Nếu có bất cứ phản hồi hoặc thắc mắc nào các bạn có thể thoải mái viết vào phần comment. :)

# All source code

Tất cả source code của bài viết các bạn có thể lấy về từ đây: https://github.com/thachnuida/fblogin

{% blockquote %}
Updated 19/12/2013: Parse error: syntax error, unexpected ‘[‘ in /…/callback.php on line 23.

Updated 06/12/2016: Cập nhật lại code theo FB API version 2.8.
{% endblockquote %}

Bên cạnh đó các bạn có thể chạy thử demo tại đây: http://saysua.com/demo/fblogin ./.