import 'reflect-metadata';
import { Router } from 'express';

export const router = Router();

export function Controller(target: any) {
    for (let key in target.prototype) {
        // console.log(Reflect.getMetadata('path', target.prototype, key));
        const path = Reflect.getMetadata('path', target.prototype, key);
        const handler = target.prototype[key];
        // 根据path和handler生成多个路由
        router.get(path, handler);
    }
}

export function get(path: string) {
    return function (target: any, key: string, descriptor: PropertyDescriptor) {
        Reflect.defineMetadata('path', path, target, key);
    };
}
