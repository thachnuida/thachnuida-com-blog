title: Chạy Visual Studio Solution từ command line
date: 2016-12-01 10:10:24
tags:
  - Visual Studio
---

Đôi khi ta muốn chạy một solution của Visual Studio từ command line thay vì phải mở Visual Studio IDE lên để giảm bớt tài nguyên cho hệ thống, ta có thể làm như sau:

- Di chuyển đến thư mục chứa file `.sln`
- Build code `"C:\Program Files (x86)\MSBuild\14.0\Bin\msbuild.exe" SelfHost.sln /p:Configuration=Release (Hoặc là Debug)`
- Chạy file đã build `SelfHost\bin\Release\SelfHost.exe`

Để thuận tiện cho những lần chạy sau, ta có thể tạo một file `bat`, khi nào cần chỉ cần click một phát là xong.