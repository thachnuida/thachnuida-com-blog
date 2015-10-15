title: Import mysql từ file zip
date: 2015-09-08 11:05:24
tags:
  - Note
  - mysql
---

Vừa rồi mình phải import dữ liệu mysql từ một file zip khoảng 700MB nhưng khi giải nén ra thì đến 4GB lận. Để import quả là không đơn giản. Và rồi cũng đã tìm được 1 cách import với chỉ 1 câu lệnh:

```
unzip -p dbdump.sql.zip | mysql -u root -p dbname
```

- Câu lệnh này chỉ thực hiện được với điều kiện file zip của bạn chỉ có 1 file sql.
- Thay `root` bằng user mysql của bạn
- Thay `dbname` bằng tên của DB
- Nhập password vào và chờ kết thúc.

Cách này mình tìm được từ đây: http://snippets.khromov.se/import-zipped-mysql-dumps/
