"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.get = exports.Controller = exports.router = void 0;
require("reflect-metadata");
var express_1 = require("express");
exports.router = express_1.Router();
function Controller(target) {
    for (var key in target.prototype) {
        // console.log(Reflect.getMetadata('path', target.prototype, key));
        var path = Reflect.getMetadata('path', target.prototype, key);
        var handler = target.prototype[key];
        // 根据path和handler生成多个路由
        exports.router.get(path, handler);
    }
}
exports.Controller = Controller;
function get(path) {
    return function (target, key, descriptor) {
        Reflect.defineMetadata('path', path, target, key);
    };
}
exports.get = get;
