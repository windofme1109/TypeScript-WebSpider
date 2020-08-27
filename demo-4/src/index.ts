/**
 *
 * 装饰器与reflect-metadata
 *
 */

// 直接通过import的方式进行引入
import 'reflect-metadata';

@Reflect.metadata('name', 'A')
class A {
    @Reflect.metadata('hello', 'world')
    public hello(): string {
        return 'hello world';
    }

    @Reflect.metadata('name', 'hello')
    hello2() {}
}

// A
const v1 = Reflect.getMetadata('name', A);
// world
const v2 = Reflect.getMetadata('hello', new A(), 'hello');

// console.log(v1);
// console.log(v2);

const objs = [A, new A(), A.prototype];

const res = objs.map(obj => [
    // 对类的装饰，都是定义在对象上面
    Reflect.getMetadata('name', obj),
    // 对类的属性或者方法的修饰，都是定义在类的原型上,并且以属性或者方法的 key 作为 property，也就是属性或者方法的名称
    Reflect.getMetadata('name', obj, 'hello2'),
    Reflect.getOwnMetadata('name', obj),
    Reflect.getOwnMetadata('name', obj, 'hello2'),
]);

// [
//   [ 'A', undefined, 'A', undefined ],
//   [ undefined, 'hello', undefined, undefined ],
//   [ undefined, 'hello', undefined, 'hello' ]
// ]
// console.log(res);

class B {
    @Reflect.metadata('name', 'dell')
    hello() {}

    greeting() {}
}

const t1 = new B();
const t2 = new B();

// 定义在实例上
Reflect.defineMetadata('otherName', 'world', t2, 'hello');
Reflect.defineMetadata('otherName', ['USA', 'UK'], t2, 'hello');
// [ 'USA', 'UK' ]
console.log(Reflect.getMetadata('otherName', t2, 'hello'));

// 定义在类上
Reflect.defineMetadata('otherNameT1', 'China', B, 'greeting');

// dell
// console.log(Reflect.getMetadata('name', t1, 'hello'));
// // undefined
// console.log(Reflect.getMetadata('otherName', t1, 'hello'));
// // world
// console.log(Reflect.getMetadata('otherNameT1', B, 'greeting'));
//
// // dell
// console.log(Reflect.getMetadata('name', t2, 'hello'));
// // world
// console.log(Reflect.getMetadata('otherName', t2, 'hello'));
//
// // undefined
// console.log(Reflect.getOwnMetadata('name', t2, 'hello'));
// // undefined
// console.log(Reflect.getOwnMetadata('name', t1, 'hello'));
// // world
// console.log(Reflect.getOwnMetadata('otherName', t2, 'hello'));

/**
 * 给类的装饰器限定参数类型
 */
// function testDecorator(target: new (...args: any[]) => any) {
//     console.log(target.prototype);
//
//     for (let key in target.prototype) {
//         const method = target.prototype[key];
//         method();
//     }
// }

// function testDecoratorTwo<T extends new (...args: any[]) => any>(target: T) {
//     // console.log(target.prototype);
//
//     return class extends target {
//         school = 'bupt';
//         getInfo = () => {
//             return this.school;
//         };
//     };
// }

// @testDecorator
// class NewTest {
//     // 成员属性必须实例化以后才能使用
//     name = 'aaa';
//     age = 20;
//     // 成员方法则定义在构造函数的原型上
//     getName() {
//         console.log('123');
//     }
// }
//
// const nt = new NewTest();
// nt.getName();

function Controller(target: new (...args: any[]) => any) {
    for (let key in target.prototype) {
        // 取出元数据
        const path = Reflect.getMetadata('path', target.prototype, key);
        const handleMethod = target.prototype[key];
        if (path && handleMethod) {
            console.log(path);
            handleMethod();
        }
    }
}

function getMethodDecorator(path: string) {
    return function (target: any, key: string) {
        Reflect.defineMetadata('path', path, target, key);
    };
}

@Controller
class Login {
    @getMethodDecorator('/a/b/login')
    login() {
        console.log('Clever Boy!!!!!!!!!');
    }
}
