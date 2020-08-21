import { Request, Response, NextFunction } from 'express';
import { Controller, get, post } from './decorator';
import { getResponseData } from '../utils/util';

interface BodyRequest extends Request {
    body: {
        // 任意属性
        // 属性为字符串即可
        [prop: string]: string | undefined;
    };
}

@Controller
class LoginController {
    @post('/login')
    login(req: BodyRequest, res: Response) {
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
    }

    @get('/logout')
    logout(req: BodyRequest, res: Response) {
        if (req.session) {
            req.session.isLogin = undefined;
            // 退出登录，直接返回成功的状态
            res.json(getResponseData(true));
        }
    }

    @get('/')
    home(req: BodyRequest, res: Response) {
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
    }
}
