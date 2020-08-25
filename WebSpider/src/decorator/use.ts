import { RequestHandler } from 'express';

import { CrawlerController, LoginController } from '../controller';

export function use(middleware: RequestHandler) {
    return function (target: CrawlerController | LoginController, key: string) {
        // const originMiddlewares = Reflect.getMetadata('middlewares', target, key) || [];
        // originMiddlewares.push(middleware);
        // Reflect.defineMetadata('middlewares', originMiddlewares, target, key);

        // 执行多个中间件，首先获取中间件元数据，将多个中间件放入一个数组中
        // 在第一次调用这个函数的时候，由于还没有定义元数据，所以originMiddlewares是undefined
        // 第二次调用及以后调用，originMiddlewares就不是空的了
        const originMiddlewares = Reflect.getMetadata(
            'middlewares',
            target,
            key
        );

        if (originMiddlewares) {
            // originMiddlewares不为空，则将其解构，并和新的middleware一起放入一个新的数组中
            Reflect.defineMetadata(
                'middlewares',
                [...originMiddlewares, middleware],
                target,
                key
            );
        } else {
            // 这里把中间件定义在对象的原型上的某个属性上
            // originMiddlewares为空，证明是第一次调用，则将其放入一个空数组中
            Reflect.defineMetadata('middlewares', [middleware], target, key);
        }
    };
}
