///<reference path='./component.ts' />

/**
 * 使用reference方式表明命名空间之间的依赖关系
 * 形式如上所示
 * 也可以使用import语法
 */

// namespace Home {
//     export class Page {
//         user: Components.User = {
//             name: 'dell',
//         };
//
//         constructor() {
//             new Components.Header();
//             new Components.Content();
//             new Components.Footer();
//         }
//     }
// }

import { Header, Content, Footer } from './component';

// 使用ES6的模块化语法
// 使用ES6的模块化语法，要比命名空间更加清晰，使我们能够清楚的了解每个变量的来历，依赖关系
export default class Page {
    constructor() {
        new Header();
        new Content();
        new Footer();
    }
}
