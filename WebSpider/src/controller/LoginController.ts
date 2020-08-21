import { Request, Response, NextFunction } from 'express';
import { Controller, get } from './decorator';
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
