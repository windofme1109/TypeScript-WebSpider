import { Router, Request, Response, NextFunction } from 'express';
import path from 'path';
import fs from 'fs';

import Analyzer from './utils/analyzer';
import Crawler from './utils/crawler';
import { getResponseData } from './utils/util';
const router = Router();

// 问题1 express的类型文件 .d.ts文件对类型的描述不准确，很多都是any，无法精确限制类型
// 解决方法：定义一个接口，使之继承某一个类型，比如说时Request，然后再这个接口中定义我们需要限定的类型，比如说是body
// 使用时，直接使用这个接口即可
interface BodyRequest extends Request {
    body: {
        // 任意属性
        // 属性为字符串即可
        [prop: string]: string | undefined;
    };
}

const checkLogin = (req: BodyRequest, res: Response, next: NextFunction) => {
    const isLogin = req.session ? req.session.isLogin : undefined;
    if (isLogin) {
        next();
    } else {
        res.json(getResponseData(null, '请登录后查看'));
    }
};

router.get('/', function (req: BodyRequest, res: Response) {
    const isLogin = req.session ? req.session.isLogin : undefined;
    if (isLogin) {
        res.send(`<body>
    <div class="login">
        <a href="/getData">获取数据</a>
        <a href="/logout">退出</a>
        <a href="/showData">展示数据</a>
    </div>
</body>`);
    } else {
        res.send(`<body>
    <div class="login">
        <form action="/login" method="post">
            <input type="password" name="password">
            <button type="submit">登录</button>
        </form>
    </div>
</body>`);
    }
});

router.get('/logout', function (req: BodyRequest, res: Response) {
    if (req.session) {
        req.session.isLogin = undefined;
        // 退出登录，直接返回成功的状态
        res.json(getResponseData(true));
    }
});

router.post('/login', function (req: BodyRequest, res: Response) {
    const { password } = req.body;
    // 使用cookie-session这个中间件以后
    // request对象中就会有session这个对象
    // 在我们通过cookieSession()配置后
    // 就可以给session对象添加属性以及属性值，这个属性值会被加密，然后作为cookie，返回给前端
    // 为了防止报错，我们首先判断request对象中是否存在session属性，在进行使用
    const isLogin = req.session ? req.session.isLogin : undefined;
    if (isLogin) {
        // res.send('<h1>登录成功</h1>');
        res.json(getResponseData(true));
    } else {
        if (password === '123' && req.session) {
            // 首次登陆，isLogin必然是undefined状态
            // 所以我们需要给session对象添加属性以及属性值，这个值会被加密，然后作为cookie，返回给前端
            req.session.isLogin = password;
            // res.send('<h1>登录成功</h1>');
            res.json(getResponseData(true));
        } else {
            // res.send('<h1>登录失败</h1>');
            res.json(getResponseData(null, '登录失败'));
        }
    }
});

router.get('/getData', checkLogin, function (req: BodyRequest, res: Response) {
    const secret = 'secretKey';
    const url = `http://www.dell-lee.com/typescript/demo.html?secret=${secret}`;
    // 使用单例模式得到DellAnalyzer的示例
    const analyzer = Analyzer.getInstance();
    const crawler = new Crawler(url, analyzer);

    res.json(getResponseData(true));
    // res.send('成功获取数据！');
});

router.get('/showData', checkLogin, function (req: BodyRequest, res: Response) {
    try {
        const filePath = path.resolve(__dirname, '../data/course.json');
        const courseContent = fs.readFileSync(filePath, { encoding: 'utf-8' });
        res.json(getResponseData(JSON.parse(courseContent)));
    } catch (e) {
        res.json(getResponseData(null, '数据不存在'));
    }
});

export default router;
