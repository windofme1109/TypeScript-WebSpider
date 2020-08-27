/**
 *
 * 自己实现的一个controller
 *
 */

import 'reflect-metadata';
import { Router } from 'express';

/**
 * 限定请求方法的类型
 * 因为router这个变量中，只有几种请求方法可以被使用，如get、post等
 * 这样保证了请求方法一定是router中有的方法
 *
 */
enum RequestMethods {
    get = 'get',
    post = 'post',
}

const router = Router();

/**
 * root 参数，是父路径，而Controller内的路由处理函数的装饰器，接收的参数是子路径，二者拼接形成完整的请求路径
 * @param root
 * @constructor
 */
export function ControllerBackup(root: string) {
    return function (target: new (...args: any[]) => any) {
        // 成员方法都定义在类的原型上
        const targetPrototype = target.prototype;
        for (let key in targetPrototype) {
            const path = Reflect.getMetadata('path', targetPrototype, key);
            const finalPath = root === '/' ? path : `${root}${path}`;
            // 获取定义在某个成员方式上的方法的元数据
            const method: RequestMethods = Reflect.getMetadata(
                'method',
                targetPrototype,
                key
            );
            // 获取定义在某个成员方式上的中间件元数据
            const middlewares = Reflect.getMetadata(
                'middlewares',
                targetPrototype,
                key
            );
            const handle = targetPrototype[key];
            if (finalPath && method) {
                if (middlewares && middlewares.length) {
                    // 保证中间件数组一定存在
                    router[method](finalPath, ...middlewares, handle);
                } else {
                    router[method](finalPath, handle);
                }
            }
        }
    };
}

export default router;
