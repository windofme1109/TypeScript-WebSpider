export * from './controller';
export * from './use';
export * from './request';
/**
 * export-from 用于聚集模块。但不能在直接使用。例如在index.js里export { a } from 'b.js', a在index.js里无法使用
 * 这个文件是引用的装饰器函数的入口文件
 * 其他模块引入了decorator模块的内容时，会首先进入index.ts文件中去查找
 * 在index.ts文件中，可以使用export-from导出所有的decorator中的模块
 * 这样我们在引用的时候，不用定位到具体的文件
 *
 */
