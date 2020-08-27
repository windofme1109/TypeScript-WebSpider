"use strict";
/**
 *
 * 自己实现的一个controller
 *
 */
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ControllerBackup = void 0;
require("reflect-metadata");
var express_1 = require("express");
/**
 * 限定请求方法的类型
 * 因为router这个变量中，只有几种请求方法可以被使用，如get、post等
 * 这样保证了请求方法一定是router中有的方法
 *
 */
var RequestMethods;
(function (RequestMethods) {
    RequestMethods["get"] = "get";
    RequestMethods["post"] = "post";
})(RequestMethods || (RequestMethods = {}));
var router = express_1.Router();
/**
 * root 参数，是父路径，而Controller内的路由处理函数的装饰器，接收的参数是子路径，二者拼接形成完整的请求路径
 * @param root
 * @constructor
 */
function ControllerBackup(root) {
    return function (target) {
        // 成员方法都定义在类的原型上
        var targetPrototype = target.prototype;
        for (var key in targetPrototype) {
            var path = Reflect.getMetadata('path', targetPrototype, key);
            var finalPath = root === '/' ? path : "" + root + path;
            // 获取定义在某个成员方式上的方法的元数据
            var method = Reflect.getMetadata('method', targetPrototype, key);
            // 获取定义在某个成员方式上的中间件元数据
            var middlewares = Reflect.getMetadata('middlewares', targetPrototype, key);
            var handle = targetPrototype[key];
            if (finalPath && method) {
                if (middlewares && middlewares.length) {
                    // 保证中间件数组一定存在
                    router[method].apply(router, __spreadArrays([finalPath], middlewares, [handle]));
                }
                else {
                    router[method](finalPath, handle);
                }
            }
        }
    };
}
exports.ControllerBackup = ControllerBackup;
exports.default = router;
