// 声明文件
// 用来帮助ts识别某个第三方模块对外暴露的方法或者变量

// 声明一个全局变量
// 这个全局变量的类型是函数，函数接收的参数也是函数
// declare var $: (param: () => void) => void;

interface JqueryInstance {
    html: (html: string) => JqueryInstance;
}

// 声明一个全局函数
// declare function $(selector: string): JqueryInstance;
// declare function $(readyFunc: () => void): void;

// 使用接口的方式实现函数重载
// 这种情况适用于$只能是函数的情况
// interface JQuery {
//     (selector: string): JqueryInstance;
//     (readyFunc: () => any): any;
// }
//
// declare const $: JQuery;
// 如果$就是对象，又是函数，使用下面的方式实现函数重载
// 声明语句中只能定义类型，切勿在声明语句中定义具体的实现
// declare function $(selector: string): JqueryInstance;
// declare function $(readyFunc: () => void): void;

// 如果我想声明的是一个全局对象，则使用namespace
// 如果对象中嵌套着其他对象，则可以嵌套使用namespace
//
// declare namespace $ {
//     namespace fn {
//         // 只能声明函数，不能定义实现
//         class init {
//             sayHi(): void;
//         }
//     }
// }

// 在TS中使用ES6的模块化
// 在一个文件中声明一个模块，模块的名称使用字符串名称
declare module 'jquery' {
    function $(selector: string): JqueryInstance;
    function $(readyFunc: () => void): void;
    namespace $ {
        namespace fn {
            // 只能声明函数，不能定义实现
            class init {
                sayHi(): void;
            }
        }
    }

    // 既可以在定义变量时直接导出，也可以最后统一导出
    export const onClick = 'CLICK';

    // 最后导出使用export
    // 导出多个变量，将多个变量用{}包起来，使用export导出
    // export { $, onClick };
    // 导出一个变量，直接赋值给export
    // export = $;
    // 或者使用export default
    export default $;
}
