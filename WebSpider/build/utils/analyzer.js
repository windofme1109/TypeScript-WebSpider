"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var cheerio_1 = __importDefault(require("cheerio"));
var fs_1 = __importDefault(require("fs"));
/**
 * 这个类，用于获取页面内容，分析页面，并得到json格式的内容
 * 单例模式
 */
var Analyzer = /** @class */ (function () {
    function Analyzer() {
    }
    Analyzer.getInstance = function () {
        if (!this.instance) {
            this.instance = new Analyzer();
        }
        return this.instance;
    };
    /**
     *
     * @param courseInfo
     */
    Analyzer.prototype.generateJsonContent = function (courseInfo, filePath) {
        var fileContent = {};
        if (fs_1.default.existsSync(filePath)) {
            // 如果文件存在，就读取文件
            // 读取出来的内容是字符串，使用JSON.parse()解析为对象
            fileContent = JSON.parse(fs_1.default.readFileSync(filePath, 'utf-8'));
        }
        // 将课程信息和时间戳存入fileContent这个对象中
        fileContent[courseInfo.time] = courseInfo.data;
        return fileContent;
    };
    /**
     *
     * @param html
     */
    Analyzer.prototype.getCourseInfo = function (html) {
        var $ = cheerio_1.default.load(html);
        // cheerio使用的是jquery的语法
        var courseItem = $('.course-item');
        var courseInfo = [];
        courseItem.map(function (index, element) {
            // $()可以接收一个DOM元素，并将其转换为jQuery元素，这样就可以使用jQuery方法了
            // find()方法作用是：在当前元素集合中选择符合选择器规则的元素集合
            var title = $(element).find('.course-desc').text();
            courseInfo.push({ title: title, count: Math.ceil(Math.random() * 100) });
        });
        return {
            time: new Date().getTime(),
            data: courseInfo,
        };
    };
    Analyzer.prototype.analyze = function (html, filePath) {
        var courseInfo = this.getCourseInfo(html);
        var courseResult = this.generateJsonContent(courseInfo, filePath);
        return JSON.stringify(courseResult);
    };
    return Analyzer;
}());
exports.default = Analyzer;
