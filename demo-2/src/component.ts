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

// 使用ES6的模块化语法
export interface User {
    name: string;
}

export class Header {
    constructor() {
        const div = document.createElement('div');
        div.innerHTML = 'This is a Header';
        document.body.appendChild(div);
    }
}

export class Content {
    constructor() {
        const div = document.createElement('div');
        div.innerHTML = 'This is a Content';
        document.body.appendChild(div);
    }
}

export class Footer {
    constructor() {
        const div = document.createElement('div');
        div.innerHTML = 'This is a Footer';
        document.body.appendChild(div);
    }
}
