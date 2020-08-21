/**
 * 类的装饰器
 * 装饰器是一个函数
 * 装饰器，在不改变某一个类的原有代码的情况下，给类增加新的功能
 * 装饰器函数接收的参数是类的构造方法
 * 装饰是通过 @ 符号使用
 * 可以给一个类设置多个装饰器，执行顺序是从下到上，即总是从距离那个类最近的装饰器开始执行
 */

function testDecorator(flag: boolean) {
    if (flag) {
        return function (constructor: any) {
            // 将getName()绑定到构造方法的原型上
            constructor.prototype.getName = () => {
                console.log('Decorator');
            };
        };
    } else {
        return function (constructor: any) {};
    }
}
//
// function testDecorator(constructor: any) {
//     constructor.prototype.getName = () => {
//         console.log('Decorator');
//     };
//     console.log('Decorator');
// }

/**
 *
 * @param constructor
 */
function testDecorator2(constructor: any) {
    // constructor.prototype.getName = () => {
    //     console.log('Decorator2');
    // };
    console.log('Decorator2');
}

// 第二种装饰器的使用形式：闭包将真正的装饰器函数作为返回值返回，从而外层函数可以接收参数，实现更多的功能
// 这种情况下，使用装饰器要加上 ()，并传入参数
// @testDecorator(true)
// class Test {}

// @testDecorator
// @testDecorator2
// class Test {}

// 给Test类的构造方法的原型上绑定了getName()方法
// const test = new Test();
// 定义Test类时没有getName()方法，所以直接使用会报错，将test实例断言为any，就不报错了
// (test as any).getName();
