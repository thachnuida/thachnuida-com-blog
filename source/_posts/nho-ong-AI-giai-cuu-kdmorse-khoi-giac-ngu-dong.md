title: Nhờ ông AI giải cứu KDMorse khỏi giấc ngủ đông
date: 2025-10-21 22:54:10
tags:
    - AI
    - KDMorse
---

Mình có cái phần mềm desktop KDMorse ở trang https://sites.google.com/site/hocmorsekdmorse/home . Cái app này làm lâu lắm rồi, một năm họa chăng chỉ có vài người dùng. Mình làm nó từ cái thời chưa biết win 64 bit là gì. Thành ra, lâu lâu có người cài mới thì bị gặp lỗi khi chạy trên win 64. Mình cũng có ghi rõ cách xử lý khi bị lỗi rồi, nhưng mà có nhiều bạn không đọc nên vẫn cứ hỏi.

Mình cũng muốn build lại một bản mới lắm, nhưng mà cái này mình viết bằng WPF chạy trên dotnet nên khi cài nó cũng yêu cầu cài thêm dotnet runtime, file cũng lớn. Mình nghĩ cái app nhỏ xíu mà cài đủ thứ này thì phức tạp quá nên muốn đổi nó sang một ngôn ngữ mới, sao cho build app ra đơn giản, dễ cài, dễ dùng.

Nhưng code sang ngôn ngữ khác cũng khoai lắm thành thử mình cứ để đó mặc kệ, ước chi có ai rãnh đổi dùm cho mình. Sau bao nhiêu năm chờ đợi, cuối cùng cũng đã có người rãnh và có hiểu biết viết lại dùm mình. Chính là anh AI.

Lúc đầu mình bảo nó viết sang C++ đi, vì mình nghĩ app sẽ chạy nhanh và file build ra sẽ nhỏ. Nhưng nó chuyển xong, mình đọc code thấy đau đầu quá, build thử thì lỗi chẳng biết debug thế nào. Cuối cùng thì mình bảo nó "Thôi mày chuyển sang python đi cho dễ đọc, giúp tao tìm luôn mấy thư viện xử lý âm thanh, rồi giúp tao build code luôn".

Nó cần mẫn một chặp cũng chuyển xong, chỉ cho mình cách build app, xử lý luôn cho mình mấy lỗi phát sinh sau khi build. Mình cũng copy file sang máy khác chạy thử thấy ngon lành rồi, nên tự tin đẩy bản build mới lên cho mọi người dùng.

Code mới mình để ở đây cho bà con muốn xem qua, hoặc phát triển tiếp https://github.com/thachnuida/KDMorse

Giờ thì mình cũng cảm thấy nhẹ gánh chút rồi.