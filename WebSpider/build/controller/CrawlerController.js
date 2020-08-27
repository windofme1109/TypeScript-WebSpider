"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CrawlerController = void 0;
// import { get, use } from './decorator';
// import { Controller, get, use } from '../decorator';
var controller_backup_1 = require("../decorator/controller-backup");
var request_backup_1 = require("../decorator/request-backup");
var util_1 = require("../utils/util");
var analyzer_1 = __importDefault(require("../utils/analyzer"));
var crawler_1 = __importDefault(require("../utils/crawler"));
var path_1 = __importDefault(require("path"));
var fs_1 = __importDefault(require("fs"));
var checkLogin = function (req, res, next) {
    var isLogin = req.session ? req.session.isLogin : undefined;
    if (isLogin) {
        next();
    }
    else {
        res.json(util_1.getResponseData(null, '请登录后查看'));
    }
};
var test = function (req, res, next) {
    console.log('test middleware');
    next();
};
var print = function (req, res, next) {
    console.log('自定义中间件！！！！！！！！');
    next();
};
// @Controller('/api')
// @ControllerBackup
var CrawlerController = /** @class */ (function () {
    function CrawlerController() {
    }
    // @use(checkLogin)
    CrawlerController.prototype.getData = function (req, res) {
        var secret = 'secretKey';
        var url = "http://www.dell-lee.com/typescript/demo.html?secret=" + secret;
        // 使用单例模式得到DellAnalyzer的示例
        var analyzer = analyzer_1.default.getInstance();
        var crawler = new crawler_1.default(url, analyzer);
        var ret = util_1.getResponseData(true);
        res.json(ret);
        // res.send('成功获取数据！');
    };
    // @use(checkLogin)
    CrawlerController.prototype.showData = function (req, res) {
        try {
            var filePath = path_1.default.resolve(__dirname, '../../data/course.json');
            var courseContent = fs_1.default.readFileSync(filePath, {
                encoding: 'utf-8',
            });
            var ret = util_1.getResponseData(JSON.parse(courseContent));
            res.json(ret);
        }
        catch (e) {
            res.json(util_1.getResponseData(false, '数据不存在'));
        }
    };
    __decorate([
        request_backup_1.get('/getData'),
        request_backup_1.use(test),
        request_backup_1.use(print),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", void 0)
    ], CrawlerController.prototype, "getData", null);
    __decorate([
        request_backup_1.get('/showData'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", void 0)
    ], CrawlerController.prototype, "showData", null);
    CrawlerController = __decorate([
        controller_backup_1.ControllerBackup('/api')
    ], CrawlerController);
    return CrawlerController;
}());
exports.CrawlerController = CrawlerController;
