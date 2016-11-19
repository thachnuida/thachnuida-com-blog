title: Tôi học Machine Learning - 001 - Nhập môn
date: 2016-11-18 20:20:00
tags:
  - Python
  - Machine Learning
---

Machine Learning vẫn còn là một thứ mới mẻ và khiến mình tò mò, cho nên hôm nay mình đã bắt đầu tham gia một khóa học về nó. Chuỗi các bài "Tôi học Machine Learning" là những ghi chú của mình, chứ không phải là bài hướng dẫn, vì vậy có thể có những sai sót chủ quan trong nội dung bài viết. Nếu các bạn thấy chỗ nào sai, cứ thoải mái góp ý, điều đó sẽ rất có ý nghĩa với mình.

# Phần mềm và ngôn ngữ

Đây là các phần mềm và ngôn ngữ mình cần phải cài đặt:

- Python https://www.python.org/
- R https://cran.r-project.org/bin/windows/base/
- R Studio https://www.rstudio.com/products/rstudio/download/
- Anaconda https://www.continuum.io/downloads

<!-- more -->

Sau khi cài Anacoda, ta sẽ có IDE *spyder* để viết và debug python code.

![Spyder IDE](/images/spyder.png)

Còn RStudio dĩ nhiên là để viết R code rồi.

![RStudio](/images/RStudio.png)

# Tiền xử lý dữ liệu

Đây là dữ liệu mẫu cần được xử lý `Data.csv`

![Data.csv](/images/data-01-csv.png)

Trước khi xử lý dữ liệu ta cần phải `sơ chế` nó trước.

## Xử lý phần dữ liệu bị thiếu

Ở đây, trong dữ liệu mẫu ô `B8` và `C6` bị thiếu giá trị, trong quá trình sơ chế ta có thể loại bỏ 2 hàng này đi, nhưng như vậy có thể nguy hiểm vì nó có thể chứa các giá trị quan trọng. Có một cách khác là ta sẽ lấy giá trị trung bình trong cột để áp dụng vào các ô bị thiếu.

### Code `python` sử dụng thư viện `pandas`:

```python
# Import libraries
import numpy as np
import matplotlib.pyplot as plt
import pandas as pd

# Import data
dataset = pd.read_csv('Data.csv')
X = dataset.iloc[:, :-1].values

# Missing data
from sklearn.preprocessing import Imputer
imputer = Imputer(missing_values='NaN', strategy='mean', axis=0)
imputer = imputer.fit(X[:, 1:3])
X[:, 1:3] = imputer.transform(X[:, 1:3])
```

Ở dòng 8, ta lấy `X` là mảng giá trị của tất cả các hàng và tất cả các cột trừ cột cuối (`-1`). Ta có giá trị `X` như sau:

```
array([['France', 44.0, 72000.0],
       ['Spain', 27.0, 48000.0],
       ['Germany', 30.0, 54000.0],
       ['Spain', 38.0, 61000.0],
       ['Germany', 40.0, nan],
       ['France', 35.0, 58000.0],
       ['Spain', nan, 52000.0],
       ['France', 48.0, 79000.0],
       ['Germany', 50.0, 83000.0],
       ['France', 37.0, 67000.0]], dtype=object)
```

Ở dòng 12, ta xác định các giá trị bị thiếu bằng `missing_values='NaN'`, và thay thế chúng bằng giá trị trung bình `strategy='mean'` của cột `axis=0`.

Ta sẽ áp dụng nó cho hai cột 1 và 2 của X (cột đầu tiên là 0): `X[:, 1:3]` (vì giá trị cột được xác định trong khoảng nên ta phải dùng `1:3` chứ không phải `1:2`)

Cuối cùng ta có `X`:

```
array([['France', 44.0, 72000.0],
       ['Spain', 27.0, 48000.0],
       ['Germany', 30.0, 54000.0],
       ['Spain', 38.0, 61000.0],
       ['Germany', 40.0, 63777.77777777778],
       ['France', 35.0, 58000.0],
       ['Spain', 38.77777777777778, 52000.0],
       ['France', 48.0, 79000.0],
       ['Germany', 50.0, 83000.0],
       ['France', 37.0, 67000.0]], dtype=object)
```

Các giá trị `nan` đã được thay thế bằng giá trị trung bình.

### Code R

```R
# Import data
dataset = read.csv('Data.csv')

# Missing data handler
dataset$Age = ifelse(is.na(dataset$Age),
                     ave(dataset$Age, FUN = function(x) mean(x, na.rm = TRUE)),
                     dataset$Age
                     )

dataset$Salary = ifelse(is.na(dataset$Salary),
                        ave(dataset$Salary, FUN = function(x) mean(x, na.rm = TRUE)),
                        dataset$Salary
                        )

```

Ở dòng 5, ta tính toán lại giá trị các ô trong cột `Age`, nếu ô không có giá trị `is.na(dataset$Age)`, ta sẽ lấy giá trị trung bình của cột `Age` bằng hàm `mean` và bỏ qua các giá trị bị thiếu `na.rm = TRUE` (dòng 6), nếu ô có giá trị thì ta giữ nguyên nó `dataset$Age` (dòng 7).

# Tổng kết
Như vậy là mình đã biết cách căn bản để xử lý dữ liệu thiếu bằng cách lấp vào các giá trị trung bình bằng `python` và `R`. Khi viết code vẫn có nhiều chỗ chưa rõ, chúng ta có thể xem phần `help` của ứng dụng để hiểu thêm về các hàm.

Trong `Spyder` các bạn nhấn `Ctrl + I` tại một hàm để coi help của nó, trong `RStudio` thì nhấn `F1`.

**Mẹo** Trong cả 2 IDE trên, để chạy từng đoạn code, ta bôi đen đoạn code và nhấn `Ctrl + Enter`.

Các ghi chú này được mình ghi lại khi đang tham gia khóa học tại *udemy* nếu bạn thấy thú vị có thể đăng ký để học trên đó, sẽ có nhiều giải thích chi tiết hơn (https://www.udemy.com/machinelearning) .