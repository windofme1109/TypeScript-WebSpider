import express, { Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
import cookieSession from 'cookie-session';

import './controller/LoginController';
import './controller/CrawlerController';
import router from './router';

// import router from './router';
// const express = require('express');
const app = express();

// 在服务器端设置一个session，用来识别当前的用户
// cookieSession()这个函数根据配置项创建一个cookie session
// name：cookie的名称
// keys：用于签名和验证（sign & verify）cookie值的秘钥列表，cookies总是使用keys[0]去加密，而其他的keys用来解密
app.use(
    cookieSession({
        name: 'session',
        keys: ['helloWorld', 'helloChina'],
        maxAge: 24 * 60 * 60 * 1000,
    })
);

// 问题1 express的类型文件 .d.ts文件对类型的描述不准确，很多都是any，无法精确限制类型
// 问题2 当我们使用中间件时，对req或者res对象做出了修改，但是类型定义并没有改变
// 比如说，我使用了body-parser这个中间件，使其能解析post请求，将post请求的内容放入了body属性中
// 实际上，并没有TS并没有定义body这个属性的具体类型，也不能智能提醒我们

// 问题2的解决方式，再定义一个.d.ts文件，与原来的.d.ts文件一起使用，被称为类型融合
// 我们要找到express的核心的类型定义文件：@types/express-serve-static-core/index.d.ts
// 进入这个文件，仿照这个文件的声明方式进行声明。
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// 定义一个中间件，给request对象加上一个属性
app.use((req: Request, res: Response, next: NextFunction) => {
    req.teacherName = 'dell';
    next();
});

app.use(router);

app.listen(7001, () => {
    console.log('server is running');
});
