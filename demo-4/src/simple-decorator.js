/**
 * 类的装饰器
 * 装饰器是一个函数
 * 装饰器，在不改变某一个类的原有代码的情况下，给类增加新的功能
 * 装饰器函数接收的参数是类的构造方法
 * 装饰是通过 @ 符号使用
 * 可以给一个类设置多个装饰器，执行顺序是从下到上，即总是从距离那个类最近的装饰器开始执行
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
function testDecorator(flag) {
    if (flag) {
        return function (constructor) {
            // 将getName()绑定到构造方法的原型上
            constructor.prototype.getName = function () {
                console.log('Decorator');
            };
        };
    }
    else {
        return function (constructor) { };
    }
}
function testDecorator(constructor) {
    constructor.prototype.getName = function () {
        console.log('Decorator');
    };
    console.log('Decorator');
}
/**
 *
 * @param constructor
 */
function testDecorator2(constructor) {
    // constructor.prototype.getName = () => {
    //     console.log('Decorator2');
    // };
    console.log('Decorator2');
}
// 第二种装饰器的使用形式：闭包将真正的函数作为返回值返回，从而外层函数可以接收参数，实现更多的功能
// 这种情况下，使用装饰器要加上 ()
// @testDecorator(true)
// class Test {}
var Test = /** @class */ (function () {
    function Test() {
    }
    Test = __decorate([
        testDecorator,
        testDecorator2
    ], Test);
    return Test;
}());
// 给Test类的构造方法的原型上绑定了getName()方法
var test = new Test();
// 定义Test类时没有getName()方法，所以直接使用会报错，将test实例断言为any，就不报错了
test.getName();
