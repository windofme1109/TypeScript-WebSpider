import cheerio from 'cheerio';
import fs from 'fs';
import path from 'path';

import { AnalyzerStyle } from './crawler';

// 这个接口用来定义课程信息的形状
interface Course {
    title: string;
    count: number;
}

// 定义课程结果对象的形状
interface CourseResult {
    time: number;
    data: Array<Course>;
}

// 存放结果的json文件的格式
// key为时间戳，value为数组，数组元素为课程信息的对象
interface Content {
    [propName: number]: Array<Course>;
}

/**
 * 这个类，用于获取页面内容，分析页面，并得到json格式的内容
 * 单例模式
 */
export default class Analyzer implements AnalyzerStyle {
    private static instance: Analyzer;

    private constructor() {}

    static getInstance() {
        if (!this.instance) {
            this.instance = new Analyzer();
        }

        return this.instance;
    }

    /**
     *
     * @param courseInfo
     */
    private generateJsonContent(courseInfo: CourseResult, filePath: string) {
        let fileContent: Content = {};
        if (fs.existsSync(filePath)) {
            // 如果文件存在，就读取文件
            // 读取出来的内容是字符串，使用JSON.parse()解析为对象
            fileContent = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
        }
        // 将课程信息和时间戳存入fileContent这个对象中
        fileContent[courseInfo.time] = courseInfo.data;

        return fileContent;
    }

    /**
     *
     * @param html
     */
    private getCourseInfo(html: string) {
        const $ = cheerio.load(html);
        // cheerio使用的是jquery的语法
        const courseItem = $('.course-item');

        const courseInfo: Array<Course> = [];
        courseItem.map((index, element) => {
            // $()可以接收一个DOM元素，并将其转换为jQuery元素，这样就可以使用jQuery方法了
            // find()方法作用是：在当前元素集合中选择符合选择器规则的元素集合
            const title = $(element).find('.course-desc').text();
            courseInfo.push({ title, count: 100 });
        });

        return {
            time: new Date().getTime(),
            data: courseInfo,
        };
    }

    public analyze(html: string, filePath: string) {
        const courseInfo = this.getCourseInfo(html);
        const courseResult = this.generateJsonContent(courseInfo, filePath);
        return JSON.stringify(courseResult);
    }
}
