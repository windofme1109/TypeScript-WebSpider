import { Router, Request, Response } from 'express';
import DellAnalyzer from './dellAnalyzer';
import Crawler from './crawler';

const router = Router();

router.get('/', function (req: Request, res: Response) {
    res.send('hello world');
});

router.get('/getData', function (req: Request, res: Response) {
    const secret = 'secretKey';
    const url = `http://www.dell-lee.com/typescript/demo.html?secret=${secret}`;

    // 使用单例模式得到DellAnalyzer的示例
    const analyzer = DellAnalyzer.getInstance();

    const crawler = new Crawler(url, analyzer);

    res.send('getData success! ');
});

export default router;
