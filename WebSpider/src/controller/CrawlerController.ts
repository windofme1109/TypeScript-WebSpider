import { Request, Response, NextFunction } from 'express';

// import { get, use } from './decorator';
// import { Controller, get, use } from '../decorator';
import { ControllerBackup } from '../decorator/controller-backup';
import { post, get, use } from '../decorator/request-backup';
import { getResponseData } from '../utils/util';
import Analyzer from '../utils/analyzer';
import Crawler from '../utils/crawler';
import path from 'path';
import fs from 'fs';

interface BodyRequest extends Request {
    body: {
        // 任意属性
        // 属性为字符串即可
        [prop: string]: string | undefined;
    };
}

const checkLogin = (
    req: BodyRequest,
    res: Response,
    next: NextFunction
): void => {
    const isLogin = req.session ? req.session.isLogin : undefined;
    if (isLogin) {
        next();
    } else {
        res.json(getResponseData(null, '请登录后查看'));
    }
};

const test = (req: BodyRequest, res: Response, next: NextFunction) => {
    console.log('test middleware');
    next();
};

const print = (req: BodyRequest, res: Response, next: NextFunction) => {
    console.log('自定义中间件！！！！！！！！');
    next();
};

// @Controller('/api')
// @ControllerBackup
@ControllerBackup('/api')
export class CrawlerController {
    // @use(checkLogin)
    @get('/getData')
    @use(test)
    @use(print)
    getData(req: BodyRequest, res: Response): void {
        const secret = 'secretKey';
        const url = `http://www.dell-lee.com/typescript/demo.html?secret=${secret}`;
        // 使用单例模式得到DellAnalyzer的示例
        const analyzer = Analyzer.getInstance();
        const crawler = new Crawler(url, analyzer);
        const ret = getResponseData<ResponseResult.getData>(true);
        res.json(ret);
        // res.send('成功获取数据！');
    }

    // @use(checkLogin)
    @get('/showData')
    showData(req: BodyRequest, res: Response): void {
        try {
            const filePath = path.resolve(__dirname, '../../data/course.json');
            const courseContent = fs.readFileSync(filePath, {
                encoding: 'utf-8',
            });

            const ret = getResponseData<ResponseResult.showData>(
                JSON.parse(courseContent)
            );
            res.json(ret);
        } catch (e) {
            res.json(getResponseData<boolean>(false, '数据不存在'));
        }
    }
}
