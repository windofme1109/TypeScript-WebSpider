import 'reflect-metadata';
import { RequestHandler } from 'express';

import router from '../router';

// export const router = Router();

enum Methods {
    get = 'get',
    post = 'post',
}

export function use(middleware: RequestHandler) {
    return function (target: any, key: string) {
        // 这里把中间件定义在对象的原型上的某个属性上
        Reflect.defineMetadata('middleware', middleware, target, key);
    };
}

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
function getRequestDecorator(type: Methods) {
    return function (path: string) {
        return function (target: any, key: string) {
            Reflect.defineMetadata('path', path, target, key);
            Reflect.defineMetadata('method', type, target, key);
        };
    };
}

/**
 * 接收一个target参数，这个参数是一个对象
 * 这是一个类装饰器函数，接收的参数是类的构造方法
 * 在定义类的过程中，调用这个方法，
 * @param target
 * @constructor
 */
export function Controller(target: any) {
    // 首先遍历目标对象的原型里面的属性（方法）
    for (let key in target.prototype) {
        // console.log(Reflect.getMetadata('path', target.prototype, key));
        // 获取path元数据
        const path = Reflect.getMetadata('path', target.prototype, key);
        // 获取method元数据
        const method: Methods = Reflect.getMetadata(
            'method',
            target.prototype,
            key
        );

        // 获取定义在某个属性上的元数据——中间件
        const middleware = Reflect.getMetadata(
            'middleware',
            target.prototype,
            key
        );

        // 对某个路由的处理方法，我们已经提前定义在类中，也就是存在于类的原型上
        //handler是其处理方法的一个引用
        const handler = target.prototype[key];
        if (path && method && handler) {
            if (middleware) {
                // 从某个属性中得到了中间件，如果中间件存在，则执行中间件
                router[method](path, middleware, handler);
            } else {
                // 根据path和handler以及method生成多个路由
                router[method](path, handler);
            }
        }
    }
}

// get请求的
export const get = getRequestDecorator('get');
export const post = getRequestDecorator('post');

// export function get(path: string) {
//     return function (target: any, key: string, descriptor: PropertyDescriptor) {
//         Reflect.defineMetadata('path', path, target, key);
//     };
// }
