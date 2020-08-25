import 'reflect-metadata';
import { RequestHandler } from 'express';

// import router from '../router';

// export const router = Router();

enum Methods {
    GET = 'get',
    POST = 'post',
}

// export function use(middleware: RequestHandler) {
//     return function (target: any, key: string) {
//         // 这里把中间件定义在对象的原型上的某个属性上
//         Reflect.defineMetadata('middleware', middleware, target, key);
//     };
// }

/**
 * 装饰器的工厂函数
 * 使用了闭包的形式
 * type的含义是请求方法的类型
 * 第一层返回的匿名函数，接收path参数，表示路径
 * 而第二层返回的匿名函数，是一个装饰器函数，其中target是要修饰的方法所在的对象（普通方法是类的原型，静态方法是类的构造函数）
 * key则是被修饰的方法的名称
 * 然后，在这个匿名函数中使用defineMetadata()，给某个对象的某个方法添加path和method这两个元数据
 * 这个方向必须被执行两次，才能真正的使用装饰器函数，第一次使用时定义请求方法，第二次使用定义请求路径
 * @param type 类型限定为枚举，则表示type只能是Methods中的一种
 */
// function getRequestDecorator(type: Methods) {
//     return function (path: string) {
//         return function (target: any, key: string) {
//             Reflect.defineMetadata('path', path, target, key);
//             Reflect.defineMetadata('method', type, target, key);
//         };
//     };
// }

// get请求
// export const get = getRequestDecorator('get');
// export const post = getRequestDecorator('post');

// 因为设定了getRequestDecorator()的参数类型是枚举类型，所以这里不能直接使用字符串，而是要使用么据类型
// export const get = getRequestDecorator(Methods.GET);
// export const post = getRequestDecorator(Methods.POST);
// export function get(path: string) {
//     return function (target: any, key: string, descriptor: PropertyDescriptor) {
//         Reflect.defineMetadata('path', path, target, key);
//     };
// }
