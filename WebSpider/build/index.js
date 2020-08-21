"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var router_1 = __importDefault(require("./router"));
var body_parser_1 = __importDefault(require("body-parser"));
var cookie_session_1 = __importDefault(require("cookie-session"));
// const express = require('express');
var app = express_1.default();
// 在服务器端设置一个session，用来识别当前的用户
// cookieSession()这个函数根据配置项创建一个cookie session
// name：cookie的名称
// keys：用于签名和验证（sign & verify）cookie值的秘钥列表，cookies总是使用keys[0]去加密，而其他的keys用来解密
app.use(cookie_session_1.default({
    name: 'session',
    keys: ['helloWorld', 'helloChina'],
    maxAge: 24 * 60 * 60 * 1000,
}));
// 问题1 express的类型文件 .d.ts文件对类型的描述不准确，很多都是any，无法精确限制类型
// 问题2当我们使用中间件时，对req或者res对象做出了修改，但是类型定义并没有改变
// 比如说，我使用了body-parser这个中间件，使其能解析post请求，将post请求的内容放入了body属性中
// 实际上，并没有TS并没有定义body这个属性的具体类型，也不能智能提醒我们
// 问题2的解决方式，再定义一个.d.ts文件，与原来的.d.ts文件一起使用，被称为类型融合
// 我们要找到express的核心的类型定义文件：@types/express-serve-static-core/index.d.ts
// 进入这个文件，仿照这个文件的声明方式进行声明。
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: false }));
// 定义一个中间件，给request对象加上一个属性
app.use(function (req, res, next) {
    req.teacherName = 'dell';
    next();
});
app.use(router_1.default);
app.listen(7001, function () {
    console.log('server is running');
});
