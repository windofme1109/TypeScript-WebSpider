"use strict";
/**
 *
 * 自己实现的一个生成请求方法并接收路径的装饰器
 *
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.post = exports.get = exports.use = void 0;
require("reflect-metadata");
/**
 * 这个函数的主要作用是将path和method作为元数据添加到某个成员方法中
 * @param method
 */
function requestDecorator(method) {
    return function (path) {
        // 真正的装饰器
        /**
         * 修饰的是普通方法，target是类的原型对象 prototype，修饰的是静态方法，则target是类的constructor
         */
        return function (target, key) {
            Reflect.defineMetadata('path', path, target, key);
            Reflect.defineMetadata('method', method, target, key);
        };
    };
}
/**
 * 添加多个中间件
 * @param middleware
 */
function use(middleware) {
    return function (target, key) {
        // 要添加多个中间件，所有metadataValue必须是数组的形式
        // 判断中间件数组是否存在，不存在，说明是第一次赋值，则赋值为空数组，否则就直接获取中间数组
        var mws = Reflect.getMetadata('middlewares', target, key)
            ? Reflect.getMetadata('middlewares', target, key)
            : [];
        // 将新的中间件推入数组中
        mws.push(middleware);
        Reflect.defineMetadata('middlewares', mws, target, key);
    };
}
exports.use = use;
exports.get = requestDecorator('get');
exports.post = requestDecorator('post');
// export const router = Router();
// function Controller(target: new (...args: any[]) => any) {
//     for (let key in target.prototype) {
//         // 取出元数据
//         const path = Reflect.getMetadata('path', target.prototype, key);
//         const handleMethod = target.prototype[key];
//         if (path && handleMethod) {
//             console.log(path);
//             handleMethod();
//         }
//     }
// }
//
// function getMethodDecorator(path: string) {
//     return function (target: any, key: string) {
//         Reflect.defineMetadata('path', path, target, key);
//     };
// }
//
// @Controller
// class Login {
//     @getMethodDecorator('/a/b/login')
//     login() {
//         console.log('Clever Boy!!!!!!!!!');
//     }
// }
