"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Controller = void 0;
var router_1 = __importDefault(require("../router"));
/**
 * 接收一个target参数，这个参数是一个对象
 * 这是一个类装饰器函数，接收的参数是类的构造方法
 * 在定义类的过程中，调用这个方法，采用工厂函数的形式，使得Controller这个装饰器可以接收根路径作为参数，使得装饰器更加灵活
 * @param root 表示的是根路径或者是上一级路径
 * @constructor
 */
function Controller(root) {
    // 限定target的类型为构造函数
    return function (target) {
        // 首先遍历目标对象的原型里面的属性（方法）
        for (var key in target.prototype) {
            // console.log(Reflect.getMetadata('path', target.prototype, key));
            // 获取path元数据
            var path = Reflect.getMetadata('path', target.prototype, key);
            // 获取method元数据
            var method = Reflect.getMetadata('method', target.prototype, key);
            // 获取定义在某个属性上的元数据——中间件
            // 限定middleware的类型为RequestHandler，这也是一个函数类型
            var middlewares = Reflect.getMetadata('middlewares', target.prototype, key);
            // 根路径同下一级路径拼接，最终形成完整的路径
            var fullPath = root === '/' ? path : "" + root + path;
            // 对某个路由的处理方法，我们已经提前定义在类中，也就是存在于类的原型上
            //handler是其处理方法的一个引用
            var handler = target.prototype[key];
            // 因为handler一定存在，所以我们这里不用判断hanlder是否存在
            if (path && method) {
                if (middlewares && middlewares.length) {
                    // 从某个属性中得到了中间件，如果中间件存在，则执行中间件
                    // middlewares是一个数组，包含多个中间件，我们使用解构的语法，将其展开为逗号分隔的参数列表，就可以按顺序执行多个中间件
                    router_1.default[method].apply(router_1.default, __spreadArrays([fullPath], middlewares, [handler]));
                }
                else {
                    // 根据path和handler以及method生成多个路由
                    router_1.default[method](fullPath, handler);
                }
            }
        }
    };
}
exports.Controller = Controller;
