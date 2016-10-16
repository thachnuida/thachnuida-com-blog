title: Làm quen với Angular 2 - Zoo app - part 3 - Dependency Injection
date: 2015-12-14 11:05:24
categories:
  - Angular2
---

Trong phần này, chúng ta sẽ cùng nhau tạo một service `AnimalService` để quản lý danh sách các con vật và nhúng nó vào `AppComponent`.

Ta tạo file `animal-service.ts` cùng cấp với `app.ts`:

```
export class AnimalService {
  animals: [];

  constructor() {
    this.animals = ANIMALS;
  }

  getAnimals() {
    return this.animals;
  }

  addAnimal(type: String, name: String) {
    this.animals.push({ 'type': type, 'name': name});
  }
}

var ANIMALS = [
  { type: 'Tiger', name: 'Bobo'},
  { type: 'Dog', name: 'Mic'},
  { type: 'Elephan', name: 'Big'}
];
```

<!-- more -->

Một cách đơn giản, `service` trong Angular 2 chỉ là một class bình thường. Ở đây, ta có class `AnimalService` nó có hai phương thức sẽ được sử dụng trong `AppComponent` là `getAnimals` và `addAnimal`.

Trong `AppComponent` ta inject `AnimalService` vào như sau:

```
import {AnimalService} from './animal-service';

...
@Component({
  ...
})
class AppComponent {
  public selectedAnimal;
  public newAnimal = {
    type: '',
    name: ''
  }

  animals = [];

  constructor(private animalService: AnimalService) {
    this.animals = animalService.getAnimals();
  }

  select(animal) { this.selectedAnimal = animal; }

  getSelectedClass(animal) {
    return {
      'selected': animal === this.selectedAnimal
    }
  }

  onSubmit() {
    this.animalService.addAnimal(this.newAnimal.type, this.newAnimal.name);

    this.newAnimal.type = '';
    this.newAnimal.name = '';
  }
}

bootstrap(AppComponent, [AnimalService]);
```

Trong `constructor` của `AppComponent` ta thêm vào tham số `animalService`, từ khóa `private` trước tham số sẽ báo cho TypeScript biết để tự động gán `animalService` trở thành một private member của `AppComponent`. Do đó trong hàm `onSubmit` ta có thể sử dụng `this.animalService`.

Angular 2 được xây dựng đi kèm với nó là `Dependency Injection framwork`, framwork này sẽ tự động nhúng một instance của `AnimalService` vào `AppComponent`. Tuy nhiên để được như vậy, ta cũng cần phải đồng thời khai báo `AnimalService` khi bootstrap App.

```
bootstrap(AppComponent, [AnimalService]);
```

# Nhúng service vào service

Nếu `AnimalService` của chúng ta cũng cần một service khác thì sao, ví dụ `LogService`. Khi đó `AnimalService` có thể như thế này:

```
import {Injectable} from 'angular2/angular2';
import {LogService} from './log-service';

@Injectable()
export class AnimalService {
  animals: [];

  constructor(private logger: LogService) {
    this.animals = ANIMALS;
  }

  getAnimals() {
    return this.animals;
  }

  addAnimal(type: String, name: String) {
    this.logger.log('Adding new animal.');
    this.animals.push({ 'type': type, 'name': name});
  }
}

var ANIMALS = [
  { type: 'Tiger', name: 'Bobo'},
  { type: 'Dog', name: 'Mic'},
  { type: 'Elephan', name: 'Big'}
];
```

Như vậy, để inject một service vào service khác, ta nhớ phải sử dụng `@Injectable()`.

# Tổng kết

Trên đây là cách đơn giản để inject dependency vào Angular2. Thực tế có nhiều cách khác nhau để tạo một instance của service tùy từng mục đích mà chúng ta sẽ cùng nhau tìm hiểu trong những phần sau.
