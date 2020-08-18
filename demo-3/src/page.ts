import $, { onClick } from 'jquery';

// $(function () {
//     alert(123);
// });

// $(function () {
//     $('body').html('<div>123</div>');
//     new $.fn.init();
// });

interface Person {
    name: string;
    age: number;
    gender: string;
}

class Teacher {
    constructor(private person: Person) {
        this.person = person;
    }

    // 引入泛型
    // keyof关键字表示，泛型T只能是Person中有的属性
    // 等同于：
    // type T = 'name'
    // key: T
    // Person[key]
    // 这样key也就被限制了属性范围
    // 从而返回值也限定了类型
    getItem<T extends keyof Person>(key: T): Person[T] {
        // if (key === 'name' || key === 'age' || key === 'gender') {
        //     // 限定了key只能是name，age或者gender
        //     return this.person[key];
        // }
        return this.person[key];
    }
}

const teacher = new Teacher({
    name: 'dell',
    age: 25,
    gender: 'male',
});

// 在限定了key的情况下，ret的类型是：string | number | undefined
// 为什么会有undefined呢，原因是，我们没有办法限定传入的参数key只能是name，number，或者是gender
// 只能是传入后，进行检查，符合条件，返回相应的值，不符合条件，什么也不返回
// 所以，如果我们传入了name，number，或者是gender之外的值，就会返回undefined，所以ret的类型会有undefined
const ret = teacher.getItem('name');
const ret2 = teacher.getItem('age');
const ret3 = teacher.getItem('gender');
// 没有的属性会报错
// const ret4 = teacher.getItem('id');

// 自定义类型，将字符串：'name'赋值给NAME
type NAME = 'name';
// 将ts的类型限定为NAME，则ts的值只能是字符串：'name'
const ts: NAME = 'name';
// 将ts2的类型限定为NAME，赋其他值就会报错
// const ts2: NAME = 'dos';
