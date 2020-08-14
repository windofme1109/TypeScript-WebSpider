// let num = 1;
// let teacherName = 'abc';
//
// function addTwoNumbers(first: number, second: number) {
//     return first + second;
// }
//
// let ret = addTwoNumbers(1, 2);

// 限定函数的参数类型为对象
// function addTwoNumbers({
//   first,
//   second,
// }: {
//   first: number;
//   second: number;
// }): number {
//   return first + second;
// }
//
// let total = addTwoNumbers({ first: 1, second: 2 });
//
// function getNumbers({ first }: { first: number }): number {
//   return first;
// }
//
// let count = getNumbers({ first: 1 });

// 函数定义
// const func = (str: string) => {
//   return parseInt(str, 10);
// };
//
// //
// const func2: (str: string) => number = (str) => {
//   return parseInt(str, 10);
// };
//
// interface Person {
//   name: string;
// }
//
// let rawData = '{"name": "dell"}';
// let newData: Person = JSON.parse(rawData);
//
// type Person2 = [string, number];
// let p: Person2 = ["QINNEY", 15];

// let arr1: number[] = [1, 2, 3];
// // 联合类型指定数组可以存储多个类型
// let arr2: (number | string)[] = [1, '2', 3];
//
// let Arr3: Array<number> = [1, 2, 3, 4];

// 泛型结合联合类型定义数组
// let Arr4: Array<number | string> = [1, '2', 3, 4];
//
// class Teacher {
//     name: string;
//     age: number;
// }
//
// let objectArr: Teacher[] = [{ name: 'dell', age: 15 }];
// let objectArr2: Array<Teacher> = [{ name: 'dell', age: 15 }];
//
// let Arr5: Array<number | string> = [1, '2', '3', 4];

// 元组
// let teacherInfo: [string, string, number] = ['dell', 'king', 18];
// error TS2322: Type 'number' is not assignable to type 'string'.
// let teacherInfo2: [string, string, number] = ["dell", 15, 18];

// let teacherList: Array<[string, string, number]> = [
//     ['dell', 'bupt', 18],
//     ['jack', 'csuft', 20],
// ];

// 接口
// interface Person {
//     name: string;
//     age?: number;
//     say(): string;
// }
//
// let p2: Person = {
//     name: 'smith',
//     say: () => 'hello',
// };
//
// interface Chinese extends Person {
//     country: string;
// }

// let c1: Chinese = {
//     name: 'dell',
//     age: 18,
//     country: 'China',
// };
//
// class Teacher implements Person {
//     name = 'jack';
//     age = 18;
//     say() {
//         return this.name;
//     }
// }
//
// function getName(person: Person): void {
//     console.log(person.name);
// }

// let p = {
//     name: 'dell',
//     sex: 'male',
// };

// 我们使用一个变量p，接收对象字面量，虽然这个对象的形状和Person接口不完全一致
// 但是传入getName()函数时，TS并不会严格检查，只有有name属性即可
// getName(p);
// 如果采用对象字面量的方式直接定义一个对象，并传入getName()
// 那么TS会严格检查，由于Person中必须有name属性，age为可选，除此之外，不能有别的属性
// 所以我在这个对象字面量中定义sex属性，会报错
// Argument of type '{ name: string; sex: string; }' is not assignable to parameter of type 'Person'.
// getName({
//     name: 'dell',
//     sex: 'male',
// });

// 接口中定义任意属性，而其他的属性的属性值类型有多种类型
// 如name为string，size为number
// 则任意属性的属性值的类型必须包括这些类型，所以可以使用联合类型或者any类型，这样才不会报错
// interface Fruits {
//     name: string;
//     readonly color: string; // 只读属性
//     size?: number; // 可选属性
//     weight: number;
//     [proName: string]: string | number; // 任意属性
// }

// 接口定义函数的输入和返回值
// interface SayHello {
//     (name: string): string;
// }
//
// const hello: SayHello = name => {
//     return `hello, ${name}`;
// };
//
// // 接口约束数组
// interface Index {
//     [index: number]: number;
// }
//
// let arr: Index = [1, 2, 3];

// 类与继承
// class Person {
//     name = 'dell';
//     getName() {
//         return this.name;
//     }
// }
//
// class Teacher extends Person {
//     // name = 'jack';
//     getTeacherName() {
//         return 'jack';
//     }
//
//     // 子类中重写父类的方法
//     getName(): string {
//         // super表示父类
//         // 使用super可以在子类中调用父类的属性和方法
//         return super.getName() + ' lee';
//     }
// }
//
// let t = new Teacher();
// // dell lee
// console.log(t.getName());
// // jack
// console.log(t.getTeacherName());

// getter 和 setter
// class Person {
//     // 在类中，我们约定，以_开头的变量为私有属性
//     // private _name: string;
//     // constructor(name: string) {
//     //     this._name = name;
//     // }
//
//     // 上面先定义私有属性，后定义构造方法的写法可以简化为一句
//     constructor(private _name: string, private _age: number) {
//         // this._name = _name;
//     }
//
//     get name() {
//         console.log('getter');
//         return this._name;
//     }
//
//     set name(newName) {
//         console.log('setter');
//         this._name = newName;
//     }
//
//     get age() {
//         return this._age;
//     }
//
//     set age(age) {
//         if (age > 10 && age < 100) {
//             this._age = age;
//         }
//     }
// }
//
// let teacher = new Person('dell', 15);
// console.log(teacher.name);
// console.log(teacher.age);
//
// teacher.age = 5;
// // 15
// console.log(teacher.age);
// teacher.name = 'jack';
// console.log(teacher.name);
//
// teacher.name = 'smith';
// console.log(teacher.name);

// 单例模式

// class Demo {
//     // 定义一个私有属性，类型为Demo，用来存放Demo的实例
//     private static instance: Demo;
//
//     // 使用private修饰构造方法，使得外面不能实例化Demo类
//     private constructor(name: string) {}
//
//     static getInstance() {
//         if (!this.instance) {
//             // 如果实例不存在，就实例化一个，并将其赋值给私有属性：instance
//             this.instance = new Demo('qinney');
//         }
//         return this.instance;
//     }
// }
//
// let d1 = Demo.getInstance();
// let d2 = Demo.getInstance();
// // true
// console.log(d1 === d2);

// 抽象类
// abstract class Geom {
//     width: number;
//     getType() {
//         return 'Geom';
//     }
//
//     // 定义抽象方法
//     abstract getArea(): number;
// }
//
// class Circle extends Geom {
//     private _radius: number;
//     constructor(radius: number) {
//         super();
//         this._radius = radius;
//     }
//
//     // 子类必须实现抽象类中定义的方法
//     getArea(): number {
//         return Math.PI * this._radius ** 2;
//     }
// }
//
// let c1 = new Circle(5);
//
// // the circle's area is  78.53981633974483
// console.log("the circle's area is ", c1.getArea());
// // the type is  Geom
// console.log('the type is ', c1.getType());

// 只读属性  readonly
// class Person {
//     public readonly name: string;
//     constructor(name: string) {
//         this.name = name;
//     }
// }
//
// let p1 = new Person('dell');
// // dell
// console.log(p1.name);

// error TS2540: Cannot assign to 'name' because it is a read-only property.
// p1.name = 'jack';

// this is sample
// const teacher: string = undefined;
//
// function abs(s: string, a: number) {
//     return s.substr(3);
// }
// export const num = 123;

interface Bird {
    fly: boolean;
    sing(): string;
}

interface Dog {
    fly: boolean;
    bark(): string;
}
// 使用类型断言实现类型保护
function trainAnimal(animal: Bird | Dog) {
    if (animal.fly) {
        return (animal as Bird).sing();
    } else {
        return (animal as Dog).bark();
    }
}

// 使用in关键字实现类型保护
function trainAnimal2(animal: Bird | Dog) {
    if ('sing' in animal) {
        return animal.sing();
    } else {
        return animal.bark();
    }
}

function add(first: string | number, second: string | number) {
    if (typeof first === 'string' || typeof second === 'string') {
        return `${first}${second}`;
    }
    return first + second;
}

class NumberObj {
    count: number;
}

function add2(first: object | NumberObj, second: object | NumberObj) {
    if (first instanceof NumberObj && second instanceof NumberObj) {
        return first.count + second.count;
    }

    return 0;
}
