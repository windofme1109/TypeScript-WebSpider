"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.use = void 0;
function use(middleware) {
    return function (target, key) {
        // const originMiddlewares = Reflect.getMetadata('middlewares', target, key) || [];
        // originMiddlewares.push(middleware);
        // Reflect.defineMetadata('middlewares', originMiddlewares, target, key);
        // 执行多个中间件，首先获取中间件元数据，将多个中间件放入一个数组中
        // 在第一次调用这个函数的时候，由于还没有定义元数据，所以originMiddlewares是undefined
        // 第二次调用及以后调用，originMiddlewares就不是空的了
        var originMiddlewares = Reflect.getMetadata('middlewares', target, key);
        if (originMiddlewares) {
            // originMiddlewares不为空，则将其解构，并和新的middleware一起放入一个新的数组中
            Reflect.defineMetadata('middlewares', __spreadArrays(originMiddlewares, [middleware]), target, key);
        }
        else {
            // 这里把中间件定义在对象的原型上的某个属性上
            // originMiddlewares为空，证明是第一次调用，则将其放入一个空数组中
            Reflect.defineMetadata('middlewares', [middleware], target, key);
        }
    };
}
exports.use = use;
