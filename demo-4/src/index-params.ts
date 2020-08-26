/**
 *
 * 参数装饰器
 * 参数装饰器只能用来监视一个方法的参数是否被传入
 */

/**
 *
 * @param target 对于静态成员来说是类的构造函数，对于实例成员是类的原型对象
 * @param method 被装饰的参数所在的函数
 * @param paramIndex 被修饰的参数的位置
 */
function paramDecorator(target: any, method: string, paramIndex: number) {
    console.log(target, method, paramIndex);
}

class Test {
    getInfo(@paramDecorator name: string, age: number) {
        // Test { getInfo: [Function] } getInfo 0
        console.log(name, age);
    }
}

const test = new Test();

// jack 20
test.getInfo('jack', 20);
