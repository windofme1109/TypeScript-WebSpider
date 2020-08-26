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
