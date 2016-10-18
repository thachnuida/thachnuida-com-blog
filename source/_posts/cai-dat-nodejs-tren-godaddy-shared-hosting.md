title: Cài đặt Nodejs trên Godaddy shared hosting
date: 2016-10-18 20:45:10
tags:
  - NodeJs
  - Nvm
  - Godaddy
---

Năm ngoái, có người cần mình deploy code nodejs trên shared hosting của Godaddy, sau một hồi tìm kiếm thì mình kết luận không thể làm được. Sau đó mình đã deploy lên Heroku.

Ngày hôm nay, mình nhận được một tình huống tương tự như vậy, nhưng kết quả đã khác. Đã có thể cài nodejs lên shared hosting của Godaddy. Dưới đây là các bước thực hiện.

# SSH vào server của Godaddy

Ở đây mình cần phải có username để `ssh`. Lúc đầu mình nhầm username này với user đăng nhập vào trang quản lý của Goddady. Để có được username ssh này các bạn mở trình quản lý Cpanel của hosting lên.

![Open Godady Cpanel](/images/godaddy-open-cpanel.png)

Sau đó vào phần **FPT Accounts**, các bạn nhìn vào danh sách `Special FPT Accounts` sẽ có username để ssh.

![Get ssh username](/images/godaddy-get-ssh-user.png)

Để ssh nếu dùng windown thì ta có thể sử dụng chương trình Putty, còn ở Mac hoặc Linux thì mở terminal lên để ssh.

```
ssh {username}@{public_ip}
```

Ở đây `Password` nhập vào là password các bạn login vào Godaddy.

# Kiểm tra xem nodejs đã được cài chưa

Sau khi `ssh` vào server các bạn kiểm tra xem nodejs được cài chưa bằng cách.

```
which node
which npm
which nvm
```

Nếu không có thông tin gì, thì ta bắt đầu quá trình cài đặt.

# Cài đặt nodejs bằng nvm

Để cài đặt `nodejs` không cần dùng quyền `sudo` ta sẽ sử dụng [nvm](https://github.com/creationix/nvm).

Ta chạy lần lượt các lệnh sau:

```
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.32.0/install.sh | bash
```

Sau khi đã chạy xong ta có thể kiểm tra lại `nvm` đã được cài đặt bằng:

```
nvm --version
```

Cài đặt `nodejs` bằng `nvm`:

```
nvm install node
```

Để kiểm tra `nodejs` đã được cài thành công ta chạy lệnh:

```
node -v
npm -v
```

Từ đây ta có thể cài thêm [pm2](https://github.com/Unitech/pm2) để chạy các ứng dụng `nodejs` trên server mà không làm ứng dụng tắt đi khi ta thoát phiên ssh.

```
npm install pm2 -g
```

# Kết

Như vậy là mình đã có thể chạy nodejs trên shared hosting của Godaddy, tuy nhiên mình không chạy được ứng dụng ở cổng `http 80`. Khi mình chạy một ứng dụng ở cổng 5000 chẳng hạn. Mình cũng không thể truy cập được từ public IP. Tuy nhiên nếu mình truy cập từ localhost thì vẫn có thể được. Ví dụ:

```
curl http://localhost:5000
```

Ngoài ra mình thấy Godaddy cũng đang có dịch vụ NodeJS cloud. Cái này mình chưa thử, nên chưa biết thế nào. Dù sao thì chạy đưọc nodejs trên shared hosting cũng có thể giúp ích đưọc trong một vài trường hợp đặt biệt.