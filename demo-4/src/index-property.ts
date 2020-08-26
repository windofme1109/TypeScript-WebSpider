/**
 *
 * 属性装饰器
 * 在属性的装饰器函数中，属性描述符不会做为参数传入属性装饰器，这与TypeScript是如何初始化属性装饰器的有关
 */

/**
 *
 * @param target 对于静态成员来说是类的构造函数，对于实例成员是类的原型对象
 * @param key 成员的名字
 */
// function nameDecorator(target: any, key: string): any {
//     // console.log(target, key);
//     // 虽然参数中没有传入属性描述符，但是我们可以自定义一个新的属性描述符，替换原来的属性描述符
//     const descriptor: PropertyDescriptor = {
//         // 设置其writable为false，则不可以改变这个属性的值
//         writable: false,
//     };
//
//     return descriptor;
// }

function nameDecorator(target: any, key: string): any {
    // target是类的原型，因此我们这样修改的实际上是原型的属性
    // 没有办法直接修改实例属性
    target[key] = 'rose';
}

class Test {
    @nameDecorator
    name = 'dell';
}

const test = new Test();
// name是实例属性
// console.log(test.name);

// 想要通过实例，访问原型上的属性，只能通过__proto__去访问
// 由于实例上，直接访问__proto__会报错，所以首先将其断言为any，在进行访问
// rose
console.log((test as any).__proto__.name);
// TypeError: Cannot assign to read only property 'name' of object '#<Test>'
// 当我们在装饰器中，设置其描述符中的writale为false，就不能改写name属性了
// test.name = 'rose';
// TypeError: Cannot assign to read only property 'name' of object '#<Test>'
// console.log(test.name);
