// 引入superagent的声明文件，也就是以 .d.ts为结尾的文件
// 这个文件中包含着这个包或者模块的函数和变量声明
// 当我们使用包中的函数或者变量时，TS会根据这个文件给出类型的提示

// 不知道为什么，这里使用ES6的模块引入方式，不能导入superagent
// 必须使用commonjs的require()方式

// TS本身不支持node的内置对象，要使用TS的内置对象，必须安装声明文件
// npm install --save @types/node
// 这样就能使用require()方式导入变量
//const superagent = require('superagent');
// const cheerio = require('cheerio');

import superagent from 'superagent';

import path from 'path';
import fs from 'fs';

import Analyzer from './analyzer';

// 定义一个接口，来限定Analyzer这个对象中必须有analyze这个方法，analyze的参数类型和返回值类型也一同被确定
export interface AnalyzerStyle {
    analyze: (html: string, filePath: string) => string;
}

class Crawler {
    // 生成存放课程信息的json文件的路径
    private _resultFilePath = path.resolve(__dirname, '../data/course.json');

    async getRawHtml(url: string) {
        const ret = await superagent.get(url);
        return ret.text;
    }
    writeFile(content: string) {
        fs.writeFileSync(this._resultFilePath, content);
    }
    // 异步请求，使用async和await
    async initSpiderProcess() {
        const html = await this.getRawHtml(this._url);

        const fileContent = this.analyzer.analyze(html, this._resultFilePath);
        // 写入json文件中
        this.writeFile(fileContent);
    }
    constructor(private _url: string, private analyzer: Analyzer) {
        this.initSpiderProcess();
    }
}

export default Crawler;
