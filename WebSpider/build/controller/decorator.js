"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.post = exports.get = exports.Controller = exports.router = void 0;
require("reflect-metadata");
var express_1 = require("express");
exports.router = express_1.Router();
var Method;
(function (Method) {
    Method["get"] = "get";
    Method["psot"] = "post";
})(Method || (Method = {}));
function getRequestDecorator(type) {
    return function (path) {
        return function (target, key) {
            Reflect.defineMetadata('path', path, target, key);
            Reflect.defineMetadata('method', type, target, key);
        };
    };
}
function Controller(target) {
    for (var key in target.prototype) {
        // console.log(Reflect.getMetadata('path', target.prototype, key));
        var path = Reflect.getMetadata('path', target.prototype, key);
        var method = Reflect.getMetadata('method', target.prototype, key);
        var handler = target.prototype[key];
        if (path && method && handler) {
            // 根据path和handler生成多个路由
            exports.router[method](path, handler);
        }
    }
}
exports.Controller = Controller;
exports.get = getRequestDecorator('get');
exports.post = getRequestDecorator('post');
// export function get(path: string) {
//     return function (target: any, key: string, descriptor: PropertyDescriptor) {
//         Reflect.defineMetadata('path', path, target, key);
//     };
// }
