"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !exports.hasOwnProperty(p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
__exportStar(require("./controller"), exports);
__exportStar(require("./use"), exports);
__exportStar(require("./request"), exports);
/**
 * export-from 用于聚集模块。但不能在直接使用。例如在index.js里export { a } from 'b.js', a在index.js里无法使用
 * 这个文件是引用的装饰器函数的入口文件
 * 其他模块引入了decorator模块的内容时，会首先进入index.ts文件中去查找
 * 在index.ts文件中，可以使用export-from导出所有的decorator中的模块
 * 这样我们在引用的时候，不用定位到具体的文件
 *
 */
