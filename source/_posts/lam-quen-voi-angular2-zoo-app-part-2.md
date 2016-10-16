title: Làm quen với Angular 2 - Zoo app - part 2 - Form
date: 2015-12-10 11:05:24
tags:
  - Angular2
---

Ở [phần 1](/2015/12/04/lam-quen-voi-angular2-zoo-app-part-1/) chúng ta đã sử dụng một vài directives cơ bản của Angular như NgFor, NgIf, NgClass và ta cũng biết rằng muốn sử dụng directive nào, ta phải khai báo directive đó cho Component. Tuy nhiên việc phải khai báo từng directive như vậy thật bất tiện. Để khắc phục điều đó, Angular 2 đã gộp các core directives vào một tập hợp là `CORE_DIRECTIVES` ta chỉ cần khai báo nó một lần là có thể dùng được các core directives của Angular. Trước khi vào phần 2 ta thay đổi một chút như sau:

```
import {Component, bootstrap, CORE_DIRECTIVES, FORM_DIRECTIVES} from 'angular2/angular2';

...
  directives: [CORE_DIRECTIVES, FORM_DIRECTIVES],
```

Ngoài `CORE_DIRECTIVES` ra mình còn khai báo thêm `FORM_DIRECTIVES`, chắc hẳn là bạn đã đoán ra đó là tập hợp các directive dành cho Form của Angular.

<!-- more -->

# Tạo form

Trong Component template ta thêm vào form

```
<form (ng-submit)="onSubmit()">
  <label>Type</lable><input type="text" required [(ng-model)]="newAnimal.type">
  <label>Name</lable><input type="text" required [(ng-model)]="newAnimal.name">
  <button type="submit">Add</button>
</form>
```

Trong Component ta thêm thuộc tính `newAnimal` và phương thức `onSubmit`:

```
public newAnimal = {
  type: '',
  name: ''
}

onSubmit() {
  this.animals.push({
    type: this.newAnimal.type,
    name: this.newAnimal.name
  });

  this.newAnimal.type = '';
  this.newAnimal.name = '';
}
```

Sau khi ta nhập thông tin vào form và nhấn nút `Add` phương thức `onSubmit` sẽ được gọi. Trong phương thức này ta push thêm một animal mới vào danh sách `this.animals` với dữ liệu được lấy từ `this.newAnimal` mà ta đã liên kết nó với form input bằng `[(ng-model)]`. Sau khi add xong, ta làm trống 2 ô text input bằng cách gán chuỗi rỗng vào `type` và `name` của `newAnimal`.

# ng-model

_Phần này trình bày sâu về directive ng-mode, bạn có thể bỏ qua nếu muốn dùng mà không cần tìm hiểu thêm_

Như ta thấy ở trên, dữ liệu giữa model và text input đã được truyền theo kiểu two-way data binding.

Với Property binding, `ng-model` được bọc trong cặp dấu `[]`, khi dữ liệu của model thay đổi, nó sẽ thay đổi phần view của text input. Cho nên khi ta gán `this.newAnimal.type = ''`, text input của ta cũng bị làm rỗng. Dữ liệu ở đây đi theo chiều **model -> view**.

Với Event binding, `ng-model` được bọc trong cặp dấu `()`, khi giá trị của text input thay đổi, dữ liệu sẽ được cập nhật lại vào trong `newAnimal`. Chính vì vậy, khi form được submit ta mới có thể lấy được thông tin nhập vào từ text input. Dữ liệu ở đây đi theo chiều **view -> model**.

Thực tế thì ta có thể tách `[(ngModel)]` ra 2 phần riêng lẽ như sau:

```
<input type="text" required (ng-model-change)="newAnimal.type = $event" [ng-model]="newAnimal.type">
```

Việc binding cũng sẽ diễn ra tương tự.

`ng-model-change` ở đây không phải là một event của thẻ `<input>` mà nó thực tế là một event property của `ngModel`. Khi Angular nhìn thấy cú pháp `[(abc)]` nó sẽ mong đợi directive `abc` có một input property `abc` và một ouput property `abc-change`.

Khi coi sơ qua code của `ngModel` ta sẽ thấy như sau (Code này có thể thay đổi khi Angular2 ra bản chính thức):

```
@Directive({
  selector: '[ng-model]:not([ng-control]):not([ng-form-control])',
  bindings: [formControlBinding],
  inputs: ['model: ngModel'],
  outputs: ['update: ngModelChange'],
  exportAs: 'form'
})
```

`ng-model-change` là một `EventEmitter` của angular, nó sẽ trả về value cho input khi được gọi.

Nói chung là tìm hiểu một chút cho biết, còn bình thường thì ta cứ dùng `[(ng-model)]` cho khỏe.

# Validate và track state với ng-control

Ta sửa lại template phần form và add thêm style cho component như sau:

Form  

```
<form (ng-submit)="onSubmit()">
  <label>Type</lable><input type="text" required [(ng-model)]="newAnimal.type" ng-control="type" #type="form" required>
  <label>Name</lable><input type="text" required [(ng-model)]="newAnimal.name" ng-control="name" #name="form" required>
  <button type="submit">Add</button>
  <div class="alert" [hidden]="type.valid">Type is required</div>
  <div class="alert" [hidden]="name.valid">Name is required</div>
</form>
```

Styles  

```
input { border: 1px solid #ccc; }
.ng-invalid { border-left: 3px solid red; }
.alert { color: red; }
```

Để có thể theo dõi được state của form controller ta sử dung directive `ng-control`, directive này chỉ có thể được áp dụng cho control bên trong thẻ `<form>`.

```
<label>Type</lable><input type="text" required [(ng-model)]="newAnimal.type" ng-control="type" #type="form" required>
```

Với mỗi `ng-control` ta cần gán cho nó một cái tên duy nhất. `ng-control` giúp ta biết được khi nào control được click (touch), khi nào giá trị thay đổi, khi nào thì giá trị bị sai. Và nó cũng thêm vào control một vài class đặc biệt của Angular.

| State                       | Class if true | Class if false |
|-----------------------------|---------------|----------------|
| Control has been visited    | ng-touched    | ng-untouched   |
| Control’s value has changed | ng-dirty      | ng-pristine    |
| Control’s value is valid    | ng-valid      | ng-invalid     |

Vì input của ta có thuộc tính `required` nên khi không có giá trị nào bên trong, `ng-control` sẽ tự động thêm vào class `ng-invalid` do đó ta sẽ thấy input của mình như thế này:

[![input invalid](/images/angular2-input-invalid.png)](http://localhost:8000/images/angular2-input-invalid.png "input invalid")<span class="caption">input invalid</span>

## Hiển thị thông báo lỗi khi input không đúng

Trong input ta tạo một local variable `#type="form"` và gán cho nó từ `form`. Angular tự hiểu cú pháp này và gán `Control` Object cho biến `type`. Do đó ta có thể bind giá trị `type.valid` vào property `hidden` của thẻ `div`:

```
<div class="alert" [hidden]="type.valid">Type is required</div>
```

[![error message](/images/angular2-error-message.png)](http://localhost:8000/images/angular2-error-message.png "error message")<span class="caption">error message</span>

## Ngăn form submit khi dữ liệu invalid

Ta tạo một local variable `animalForm` và disable nút `Add` khi dữ liệu trong form invalid.

```
<form (ng-submit)="onSubmit()" #animalform="form">
  <label>Type</lable><input type="text" required [(ng-model)]="newAnimal.type" ng-control="type" #type="form" required>
  <label>Name</lable><input type="text" required [(ng-model)]="newAnimal.name" ng-control="name" #name="form" required>
  <button type="submit" [disabled]="!animalform.form.valid">Add</button>
  <div class="alert" [hidden]="type.valid">Type is required</div>
  <div class="alert" [hidden]="name.valid">Name is required</div>
</form>
```

Khi mới chạy ta sẽ thấy nút `Add` bị disabled, sau khi đã điền đủ thông tin vào name và type, nút `Add` sẽ được enable trở lại và ta có thể submit form.

# Tổng kết

[![zoo app version 2](/images/angular2-zoo-app-2.png)](http://localhost:8000/images/angular2-zoo-app-2.png "zoo app version 2")<span class="caption">zoo app version 2</span>

Sau phần này, ta đã biết cách sử dụng `ng-model` cho two-way data binding. Tìm hiểu một chút về cách `[(ng-model)]` hoạt động.  
Sử dụng `ng-control` để theo dõi trạng thái của `control`, cũng như thêm style cho control, ẩn hiện thông báo lỗi tùy vào trạng thái của control.

Toàn bộ code của phần 2.

`app.ts`

```
import {Component, bootstrap, CORE_DIRECTIVES, FORM_DIRECTIVES} from 'angular2/angular2';

@Component({
  selector: 'app',
  directives: [CORE_DIRECTIVES, FORM_DIRECTIVES],
  template: `
    <h1>Animal list</h1>
    <form (ng-submit)="onSubmit()" #animalform="form">
      <label>Type</lable><input type="text" required [(ng-model)]="newAnimal.type" ng-control="type" #type="form" required>
      <label>Name</lable><input type="text" required [(ng-model)]="newAnimal.name" ng-control="name" #name="form" required>
      <button type="submit" [disabled]="!animalform.form.valid">Add</button>
      <div class="alert" [hidden]="type.valid">Type is required</div>
      <div class="alert" [hidden]="name.valid">Name is required</div>
    </form>
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
    input { border: 1px solid #ccc; }
    .ng-invalid { border-left: 3px solid red; }
    .alert { color: red; }
  `]
})
class AppComponent {
  public selectedAnimal;
  public newAnimal = {
    type: '',
    name: ''
  }

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

  onSubmit() {
    this.animals.push({
      type: this.newAnimal.type,
      name: this.newAnimal.name
    });

    this.newAnimal.type = '';
    this.newAnimal.name = '';
  }
}

bootstrap(AppComponent);
```