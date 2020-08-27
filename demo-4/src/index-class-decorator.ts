/**
 * 类的装饰器
 * 装饰器是一个函数
 * 装饰器，在不改变某一个类的原有代码的情况下，给类增加新的功能
 * 装饰器函数接收的参数是类的构造方法
 * 装饰是通过 @ 符号使用
 * 可以给一个类设置多个装饰器，执行顺序是从下到上，即总是从距离那个类最近的装饰器开始执行
 */

// 下面的这种写法比较复杂：new (...args: any[]) => any
// (...args: any[]) => any，这是一个函数，...args在函数的参数中使用，表示剩余参数，将一个或者多个参数，装进args这个数组中
// any[]表示args这个数组中元素的类型的any，也就是说，这个函数可以接收任意类型，任意数量的参数。
// 而函数的返回值的类型是any
// 在函数前面加一个new，表示这是一个构造方法
// 泛型T继承了这个构造方法，表示泛型T的构造函数，可以接收任意数量，任意类型的参数
// 而装饰器函数的constructor参数，也被约束为泛型T，进而表示constructor为构造方法
// function testDecorator<T extends new (...args: Array<any>) => any>(
//     constructor: T
// ) {
//     return class extends constructor {
//         name = 'rose';
//
//         getName() {
//             return this.name;
//         }
//     };
// }

// @testDecorator
// class Test {
//     name: string;
//     constructor(name: string) {
//         this.name = name;
//     }
// }

// 上面这中装饰器的方式，必须声明示例为any，而且不会出现语法提示
// const test: any = new Test('jack');
// console.log(test.name);
// console.log(test.getName());

// 类装饰器高级用法——装饰器工厂
function testDecoratorFactory() {
    return function <T extends new (...args: Array<any>) => any>(
        constructor: T
    ) {
        return class extends constructor {
            name = 'rose';

            getName() {
                return this.name;
            }
        };
    };
}

// 使用
// 1. 首先不使用@
// 2. testDecoratorFactory()的返回值是一个装饰器函数，这个装饰器函数接收构造方法作为参数
// 3. 我们传入一个匿名的类，作为其参数，装饰器函数会对这个匿名类进行装饰，装饰器函数的返回值也是一个类，我们在这个类中增加新的功能
// 4. 这个类会继承传入的匿名类，最终得到的返回值，就是包含了原有功能和新增功能的类
const Test2 = testDecoratorFactory()(
    class {
        name: string;
        constructor(name: string) {
            this.name = name;
        }
    }
);

// 5. 我们在使用这个新的类的时候，新增加的方法、属性，就会给出提示
const test2 = new Test2('jack');
console.log(test2.getName());
