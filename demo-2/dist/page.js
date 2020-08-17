// 使用命名空间
// namespace Components {
//     export interface User {
//         name: string;
//     }
//
//     export class Header {
//         constructor() {
//             const div = document.createElement('div');
//             div.innerHTML = 'This is a Header';
//             document.body.appendChild(div);
//         }
//     }
//
//     export class Content {
//         constructor() {
//             const div = document.createElement('div');
//             div.innerHTML = 'This is a Content';
//             document.body.appendChild(div);
//         }
//     }
//
//     export class Footer {
//         constructor() {
//             const div = document.createElement('div');
//             div.innerHTML = 'This is a Footer';
//             document.body.appendChild(div);
//         }
//     }
// }
define("component", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Footer = exports.Content = exports.Header = void 0;
    var Header = /** @class */ (function () {
        function Header() {
            var div = document.createElement('div');
            div.innerHTML = 'This is a Header';
            document.body.appendChild(div);
        }
        return Header;
    }());
    exports.Header = Header;
    var Content = /** @class */ (function () {
        function Content() {
            var div = document.createElement('div');
            div.innerHTML = 'This is a Content';
            document.body.appendChild(div);
        }
        return Content;
    }());
    exports.Content = Content;
    var Footer = /** @class */ (function () {
        function Footer() {
            var div = document.createElement('div');
            div.innerHTML = 'This is a Footer';
            document.body.appendChild(div);
        }
        return Footer;
    }());
    exports.Footer = Footer;
});
///<reference path='./component.ts' />
define("page", ["require", "exports", "component"], function (require, exports, component_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    // 使用ES6的模块化语法
    // 使用ES6的模块化语法，要比命名空间更加清晰，使我们能够清楚的了解每个变量的来历，依赖关系
    var Page = /** @class */ (function () {
        function Page() {
            new component_1.Header();
            new component_1.Content();
            new component_1.Footer();
        }
        return Page;
    }());
    exports.default = Page;
});
