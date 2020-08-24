"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.post = exports.get = exports.Controller = exports.use = void 0;
require("reflect-metadata");
var router_1 = __importDefault(require("../router"));
// export const router = Router();
var Methods;
(function (Methods) {
    Methods["get"] = "get";
    Methods["post"] = "post";
})(Methods || (Methods = {}));
function use(middleware) {
    return function (target, key) {
        // 这里把中间件定义在对象的原型上的某个属性上
        Reflect.defineMetadata('middleware', middleware, target, key);
    };
}
exports.use = use;
/**
 * 装饰器的工厂函数
 * 使用了闭包的形式
 * type的含义是请求方法的类型
 * 第一层返回的匿名函数，接收path参数，表示路径
 * 而第二层返回的匿名函数，是一个装饰器函数，其中target是要修饰的方法所在的对象（普通方法是类的原型，静态方法是类的构造函数）
 * key则是被修饰的方法的名称
 * 然后，在这个匿名函数中使用defineMetadata()，给某个对象的某个方法添加path和method这两个元数据
 * 这个方向必须被执行两次，才能真正的使用装饰器函数，第一次使用时定义请求方法，第二次使用定义请求路径
 * @param type 类型限定为枚举，则表示type只能是Methods中的一种
 */
function getRequestDecorator(type) {
    return function (path) {
        return function (target, key) {
            Reflect.defineMetadata('path', path, target, key);
            Reflect.defineMetadata('method', type, target, key);
        };
    };
}
/**
 * 接收一个target参数，这个参数是一个对象
 * 这是一个类装饰器函数，接收的参数是类的构造方法
 * 在定义类的过程中，调用这个方法，
 * @param target
 * @constructor
 */
function Controller(target) {
    // 首先遍历目标对象的原型里面的属性（方法）
    for (var key in target.prototype) {
        // console.log(Reflect.getMetadata('path', target.prototype, key));
        // 获取path元数据
        var path = Reflect.getMetadata('path', target.prototype, key);
        // 获取method元数据
        var method = Reflect.getMetadata('method', target.prototype, key);
        // 获取定义在某个属性上的元数据——中间件
        var middleware = Reflect.getMetadata('middleware', target.prototype, key);
        // 对某个路由的处理方法，我们已经提前定义在类中，也就是存在于类的原型上
        //handler是其处理方法的一个引用
        var handler = target.prototype[key];
        if (path && method && handler) {
            if (middleware) {
                // 从某个属性中得到了中间件，如果中间件存在，则执行中间件
                router_1.default[method](path, middleware, handler);
            }
            else {
                // 根据path和handler以及method生成多个路由
                router_1.default[method](path, handler);
            }
        }
    }
}
exports.Controller = Controller;
// get请求的
exports.get = getRequestDecorator('get');
exports.post = getRequestDecorator('post');
// export function get(path: string) {
//     return function (target: any, key: string, descriptor: PropertyDescriptor) {
//         Reflect.defineMetadata('path', path, target, key);
//     };
// }
