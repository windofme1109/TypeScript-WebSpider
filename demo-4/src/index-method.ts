/**
 * 函数的装饰器
 * 函数的装饰器的执行时机：装饰器函数装饰了类中的方法，在创建类的时候就会被使用
 * 类的装饰器的执行时机：在实例化的时候，会被使用
 */

/**
 *
 * @param target 如果是修饰的是普通方法，target对应的是类的原型对象 prototype，如果是静态方法，则target对应的是构造方法 constructor
 * @param key 被修饰的方法的名称，是字符串
 * @param descriptor 属性描述符，用来设定类的属性和方法的一些行为，
 * writable: 比如说能否被重写
 * enumerable: 能否枚举
 * value: 被修饰的熟悉的值
 * configurable: 是否可以通过Object.defineProperty对对象再次配置
 */
function getNameDecorator(
    target: any,
    key: string,
    descriptor: PropertyDescriptor
) {
    // 设置writable为false，表示被修饰的方法不可以被覆写
    // descriptor.writable = false;
    console.log(target, key, descriptor);

    // 我们修饰的是类中的普通函数，所以descriptor的value的值为一个函数
    // 因此我们使用函数，进行覆写
    descriptor.value = function () {
        return 'decorators';
    };
}

function getNameDecoratorWithParam(params: string) {
    return function (target: any, key: string, descriptor: PropertyDescriptor) {
        descriptor.value = function () {
            return 'decorator ' + params;
        };
    };
}

class Test {
    name: string;
    constructor(name: string) {
        this.name = name;
    }

    // @getNameDecorator
    // static getName() {
    //     // return this.name;
    //     return '123';
    // }

    // @getNameDecorator

    // 带参数的装饰器
    @getNameDecoratorWithParam('jakky')
    getName() {
        return this.name;
    }
}

const test = new Test('jack');

// 设置属性描述符中的writable为false，表示被修饰的方法不可以被覆写
// error TS2339: Property 'writable' does not exist on type 'PropertyDecorator'.
// test.getName = () => {
//     return '567';
// };

console.log(test.getName());
