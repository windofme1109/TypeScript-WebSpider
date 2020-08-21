/**
 * 访问器的装饰器
 * 访问器指的是类中的getter和setter方法
 * 注意;TypeScript不允许同时装饰一个成员的get和set访问器。
 * 取而代之的是，一个成员的所有装饰的必须应用在文档顺序的第一个访问器上。
 * 这是因为，在装饰器应用于一个属性描述符时，它联合了get和set访问器，而不是分开声明的。
 */

/**
 * 访问器的装饰器的参数和方法装饰器的一样
 * @param target 对于静态成员来说是类的构造函数，对于实例成员是类的原型对象
 * @param key 属性的名称
 * @param descriptor 描述符
 */
function visitorDecorator(
    target: any,
    key: string,
    descriptor: PropertyDescriptor
) {
    // console.log(target);
    // console.log(key);
    // console.log(descriptor);
    // descriptor.writable = false;
    descriptor.get = () => {
        return 'smith';
    };

    // descriptor.get = () => {
    //     return 'dell';
    // };
}

class Test5 {
    private _name: string;
    constructor(name: string) {
        this._name = name;
    }

    @visitorDecorator
    set name(name: string) {
        this._name = name;
    }
    get name() {
        return this._name;
    }
}

const test = new Test5('jack');
// console.log(test.name);
test.name = 'rose';
test.name = 'curry';
console.log(test.name);
