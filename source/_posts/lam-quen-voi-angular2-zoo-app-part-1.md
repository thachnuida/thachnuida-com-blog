title: Làm quen với Angular 2 - Zoo app - part 1
date: 2015-12-04 11:05:24
categories:
  - Angular2
---

Trước khi bắt đầu, bạn nên coi qua bài [Làm quen với Angular 2 - Tạo một ứng dụng bằng TypeScript](/2015/12/02/lam-quen-voi-Angular2-Tao-mot-ung-dung-don-gian-bang-TypeScript/) để có khái niệm cơ bản về Angular2 và làm việc với Typescript.

Ở bài này, mình sẽ viết một ứng dụng quản lý sở thú bằng Angular 2 với typescript. Sau khi kết thúc ta sẽ có một ứng dụng như sau:

[![zoo app](/images/angular2-animal-selected-animal.png)](http://localhost:8000/images/angular2-animal-selected-animal.png "zoo app")

<!-- more -->

Tạo một thư mục để chứa ứng dụng.

```
mkdir angular-zoo
cd angular-zoo
```

Ở đây, mình sẽ dùng `live-server` để chạy một static server, nó sẽ giúp trang web tự động tải lại khi nội dung file được thay đổi.

```
npm install -g live-server
```

# App Component

Trong thư mục ứng dụng, tạo file `app.ts` với nội dung sau:

```
import {Component, bootstrap} from 'angular2/angular2';

@Component({
  selector: 'app',
  template: `
    <h1>Animal list</h1>
    <ul class="animal-list">
      <li *ng-for="#animal of animals">
        <span class="type">{{animal.type}}</span> {{animal.name}}
      </li>
    </ul>
  `
})
class AppComponent {
  animals = [
    { type: 'Tiger', name: 'Bobo'},
    { type: 'Dog', name: 'Mic'},
    { type: 'Elephan', name: 'Big'}
  ];
}

bootstrap(AppComponent);
```

Ở đây, ta có directive `ng-for` là một repeater directive của Angular 2.

**Chú ý**: Dấu * trước `ng-for` là cần thiết. Nó cho `ng-for` biết rằng, thẻ `<li>` và nội dung trong nó chính là template của từng phần tử.

Bằng cách sử dụng typescript, ta có một cách để viết chuỗi với nhiều dòng như phần `template` của `Component`, đó là sử dụng dấu ` (Không phải là dấu nháy đơn, dấu này trên bàn phím thường nằm ở phím dưới phím ESC)

# index.html

Tiếp tục, tạo file `index.html` với nội dung sau:

```
<html>
  <head>
    <title>Angular 2 QuickStart</title>
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
    <app>loading...</app>
  </body>
</html>
```

# Chạy server

Mở terminal và chạy lệnh

```
live-server
```

Nếu như mọi chuyện đều ổn, ta sẽ nhìn thấy một danh sách các con vật với loại và tên, tuy nhiên, ta chỉ thấy dòng chữ `loading...`. Bật develop tool của trình duyệt lên (ở đây mình dùng Chrome) ta sẽ thấy lỗi:

```
EXCEPTION: Template parse errors:
Can't bind to 'ngForOf' since it isn't a known native property in AppComponent > ul:nth-child(1) > li:nth-child(1)[*ng-for=#animal of animals]
```

Lý do là do ta dùng directive `ng-for` trong template, nhưng ứng dụng không biết directive đó ở đâu. Ta sẽ sửa nó bằng cách import `ng-for` vào và nhúng vào app component.

Trong file `app.ts` ta sửa lại dòng import:

```
import {Component, bootstrap, NgFor} from 'angular2/angular2';
```


và trong component ngay dưới thuộc tính `selector` ta thêm vào thuộc tính `directives` để cho component của ta biết template sẽ sử dụng những directives nào.

```
@Component({
  selector: 'app',
  directives: [NgFor],
  template: `
    <h1>Animal list</h1>
    <ul class="animal-list">
      <li *ng-for="#animal of animals">
        <span class="type">{{animal.type}}</span> {{animal.name}}
      </li>
    </ul>
  `
})
```

**Ghi chú:** Dấu # trước `animal` nghĩa là Angular sẽ tạo 1 local variable có tên là `animal`

[![animal list](/images/angular2-animal-list.png)](http://localhost:8000/images/angular2-animal-list.png "animal list")

# Thêm style cho app component

Để thêm style cho app component, trong decorator component ta thêm vào thuộc tính `styles`, style này chỉ được áp dụng bên trong app component.

```
styles: [`
  .animal-list { list-style-type: none; padding: 0; }
  .animal-list li { cursor: pointer; }
  .animal-list li:hover { cursor: pointer; font-weight: bold; }
  .animal-list li .type { background: #FF9800; color: #FFF; padding: 2px 4px; line-height: 1.5em;}
`]
```

[![animal list with style](/images/angular2-animal-list-with-style.png)](http://localhost:8000/images/angular2-animal-list-with-style.png "animal list with style")<span class="caption">animal list with style</span>

# Thêm sự kiện click

Giờ ta sẽ thêm vào một chức năng, khi click vào một con vật thì sẽ hiển thị thông tin của con vật được chọn.

Trước tiên sửa lại template:

```
<h1>Animal list</h1>
<ul class="animal-list">
  <li *ng-for="#animal of animals" (click)="select(animal)">
    <span class="type">{{animal.type}}</span> {{animal.name}}
  </li>
</ul>
<div *ng-if="selectedAnimal">
  <h2>Selected Animal</h2>
  ({{selectedAnimal.type}}) {{selectedAnimal.name}}
</div>
```

Ở đây ta sẽ sử dụng thêm `ng-if` (chỉ hiển thị khi điều kiện của ng-if cho giá trị đúng), cũng giống như `ng-for` ở trên ta phải import `NgIf` vào và add thêm và phần `directives` của component.

Trong thẻ `<li>` ta đã thêm vào `(click)="select(animal)"`, nghĩa là khi click vào thẻ `li` ta Angular sẽ gọi phương thức `select` của component cùng với tham số là `animal`. So với AngularJS 1, ta không còn `ng-click` nữa. Ở đây `(click)`, dấu ngoặc sẽ xác định mục tiêu là sự kiện click của thẻ `li`, như vậy ta có thể tạm đoán dấu () sẽ giúp ta có thể làm việc được với bất kỳ sự kiện nào của element.

Tiếp đến, ta cần thêm phương thức `select` vào component và một thuộc tính `selectedAnimal`:

```
public selectedAnimal;

select(animal) { this.selectedAnimal = animal; }
```

# Thay đổi style cho con vật được chọn với ng-class

Ta sửa lại thẻ `li`, thêm vào directive `ng-class`

```
<li *ng-for="#animal of animals" (click)="select(animal)" [ng-class]="getSelectedClass(animal)">
  <span class="type">{{animal.type}}</span> {{animal.name}}
</li>
```

sau đó trong component ta thêm phương thức `getSelectedClass`:

```
getSelectedClass(animal) {
  return {
    'selected': animal === this.selectedAnimal
  }
}
```

phương thức này trả về đối tượng với thuộc tính `selected` bằng `true` nếu `animal` trùng với `selectedAnimal`.

**Ghi chú:** `ng-class` được bọc trong dấu [] đây là cú pháp của `property binding` mà dữ liệu sẽ đi theo 1 chiều từ nguồn là `getSelectedClass(animal)` đến đích là property của directive `ng-class`.

để thấy được sự thay đổi của `li` sau khi được chọn ta thêm style cho class `.selected`:

```
.selected { font-weight: bold; }
```

[![selected animal](/images/angular2-animal-selected-animal.png)](http://localhost:8000/images/angular2-animal-selected-animal.png "selected animal")

# Tổng kết

Như vậy là trong phần này ta đã cùng nhau tìm hiểu về một vài directive có sẵn của Angular 2 như `ng-for` , `ng-if`, `ng-class`, cách khai báo directive sử dụng trong component.

Để bind event của element ta sử dụng cặp dấu ngoặc `()`, để bind property ta dùng cặp dấu ngoặc `[]`.

Ở phần tiếp theo, ta sẽ cùng dùng thử form trong Angular 2 để add thêm con vật vào sở thú của mình.

Đây là toàn bộ code của phiên bản zoo app hiện tại:

```
import {Component, bootstrap, NgFor, NgIf, NgClass} from 'angular2/angular2';

@Component({
  selector: 'app',
  directives: [NgFor, NgIf, NgClass],
  template: `
    <h1>Animal list</h1>
    <ul class="animal-list">
      <li *ng-for="#animal of animals" (click)="select(animal)" [ng-class]="getSelectedClass(animal)">
        <span class="type">{{animal.type}}</span> {{animal.name}}
      </li>
    </ul>
    <div *ng-if="selectedAnimal">
      <h2>Selected Animal</h2>
      ({{selectedAnimal.type}}) {{selectedAnimal.name}}
    </div>
  `,
  styles: [`
    .animal-list { list-style-type: none; padding: 0; }
    .animal-list li { cursor: pointer; }
    .animal-list li:hover { cursor: pointer; font-weight: bold; }
    .animal-list li .type { background: #FF9800; color: #FFF; padding: 2px 4px; line-height: 1.5em;}
    .selected { font-weight: bold; }
  `]
})
class AppComponent {
  public selectedAnimal;

  animals = [
    { type: 'Tiger', name: 'Bobo'},
    { type: 'Dog', name: 'Mic'},
    { type: 'Elephan', name: 'Big'}
  ];

  select(animal) { this.selectedAnimal = animal; }

  getSelectedClass(animal) {
    return {
      'selected': animal === this.selectedAnimal
    }
  }
}

bootstrap(AppComponent);
```

Tiếp theo: [zoo app phần 2](/2015/12/10/lam-quen-voi-angular2-zoo-app-part-2/).
