"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var path_1 = __importDefault(require("path"));
var fs_1 = __importDefault(require("fs"));
var analyzer_1 = __importDefault(require("./utils/analyzer"));
var crawler_1 = __importDefault(require("./utils/crawler"));
var util_1 = require("./utils/util");
var router = express_1.Router();
var checkLogin = function (req, res, next) {
    var isLogin = req.session ? req.session.isLogin : undefined;
    if (isLogin) {
        next();
    }
    else {
        res.json(util_1.getResponseData(null, '请登录后查看'));
    }
};
router.get('/', function (req, res) {
    var isLogin = req.session ? req.session.isLogin : undefined;
    if (isLogin) {
        res.send("<body>\n    <div class=\"login\">\n        <a href=\"/getData\">\u83B7\u53D6\u6570\u636E</a>\n        <a href=\"/logout\">\u9000\u51FA</a>\n        <a href=\"/showData\">\u5C55\u793A\u6570\u636E</a>\n    </div>\n</body>");
    }
    else {
        res.send("<body>\n    <div class=\"login\">\n        <form action=\"/login\" method=\"post\">\n            <input type=\"password\" name=\"password\">\n            <button type=\"submit\">\u767B\u5F55</button>\n        </form>\n    </div>\n</body>");
    }
});
router.get('/logout', function (req, res) {
    if (req.session) {
        req.session.isLogin = undefined;
        // 退出登录，直接返回成功的状态
        res.json(util_1.getResponseData(true));
    }
});
router.post('/login', function (req, res) {
    var password = req.body.password;
    // 使用cookie-session这个中间件以后
    // request对象中就会有session这个对象
    // 在我们通过cookieSession()配置后
    // 就可以给session对象添加属性以及属性值，这个属性值会被加密，然后作为cookie，返回给前端
    // 为了防止报错，我们首先判断request对象中是否存在session属性，在进行使用
    var isLogin = req.session ? req.session.isLogin : undefined;
    if (isLogin) {
        // res.send('<h1>登录成功</h1>');
        res.json(util_1.getResponseData(true));
    }
    else {
        if (password === '123' && req.session) {
            // 首次登陆，isLogin必然是undefined状态
            // 所以我们需要给session对象添加属性以及属性值，这个值会被加密，然后作为cookie，返回给前端
            req.session.isLogin = password;
            // res.send('<h1>登录成功</h1>');
            res.json(util_1.getResponseData(true));
        }
        else {
            // res.send('<h1>登录失败</h1>');
            res.json(util_1.getResponseData(null, '登录失败'));
        }
    }
});
router.get('/getData', checkLogin, function (req, res) {
    var secret = 'secretKey';
    var url = "http://www.dell-lee.com/typescript/demo.html?secret=" + secret;
    // 使用单例模式得到DellAnalyzer的示例
    var analyzer = analyzer_1.default.getInstance();
    var crawler = new crawler_1.default(url, analyzer);
    res.json(util_1.getResponseData(true));
    // res.send('成功获取数据！');
});
router.get('/showData', checkLogin, function (req, res) {
    try {
        var filePath = path_1.default.resolve(__dirname, '../data/course.json');
        var courseContent = fs_1.default.readFileSync(filePath, { encoding: 'utf-8' });
        res.json(util_1.getResponseData(JSON.parse(courseContent)));
    }
    catch (e) {
        res.json(util_1.getResponseData(null, '数据不存在'));
    }
});
exports.default = router;
