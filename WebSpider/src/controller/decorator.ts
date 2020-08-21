import 'reflect-metadata';
import { Router } from 'express';

export const router = Router();

enum Method {
    get = 'get',
    psot = 'post',
}

function getRequestDecorator(type: string) {
    return function (path: string) {
        return function (target: any, key: string) {
            Reflect.defineMetadata('path', path, target, key);
            Reflect.defineMetadata('method', type, target, key);
        };
    };
}

export function Controller(target: any) {
    for (let key in target.prototype) {
        // console.log(Reflect.getMetadata('path', target.prototype, key));
        const path = Reflect.getMetadata('path', target.prototype, key);
        const method: Method = Reflect.getMetadata(
            'method',
            target.prototype,
            key
        );
        const handler = target.prototype[key];
        if (path && method && handler) {
            // 根据path和handler生成多个路由
            router[method](path, handler);
        }
    }
}

export const get = getRequestDecorator('get');
export const post = getRequestDecorator('post');

// export function get(path: string) {
//     return function (target: any, key: string, descriptor: PropertyDescriptor) {
//         Reflect.defineMetadata('path', path, target, key);
//     };
// }
