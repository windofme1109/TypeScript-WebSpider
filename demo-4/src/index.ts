/**
 *
 * 装饰器的作用
 *
 */

/**
 * 这里使用了装饰器工厂模式，可以给装饰器传入参数
 * @param msg
 */
function catchError(msg: string) {
    return function (
        target: any,
        method: string,
        descriptor: PropertyDescriptor
    ) {
        // 因为是函数修饰器，所以descriptor的value属性是函数，即被装饰器装饰的函数
        // 我们需要对这个函数进行一些操作，比如加上异常处理，所以，我们可以先使用fn变量将函数接收
        // 然后将descriptor.value赋予新的函数，在新的函数内部，调用fn()，然后进行一些其他操作
        const fn = descriptor.value;
        descriptor.value = () => {
            try {
                fn();
            } catch (e) {
                console.log(msg);
            }
        };
    };
}

const userInfo: any = undefined;

class Test {
    @catchError('uerInfo.name 不存在')
    getName() {
        return userInfo.name;
    }

    @catchError('userInfo.age 不存在')
    getAge() {
        return userInfo.age;
    }
}

const test = new Test();

test.getName();
test.getAge();
