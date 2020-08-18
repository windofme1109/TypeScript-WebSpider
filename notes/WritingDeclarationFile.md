## 书写声明文件
### 1. 参考文献
[声明文件](https://ts.xcatliu.com/basics/declaration-files.html)
### 2. 声明文件需要的新语法

1. 语法说明，如下表所示：

   语法|说明
   :---:|:---:
   `declare var` | 声明全局变量
   `declare let` | 声明全局变量
   `declare const` | 声明全局常量
   `declare function` | 声明全局方法
   `declare class` | 声明全局类
   `declare enum` | 声明全局枚举类型
   `declare namespace` | 声明（含有子属性的）全局对象
   `interface 和 type` | 声明全局类型
   `export` | 导出变量
   `export namespace` | 导出（含有子属性的）对象
   `export default` | ES6 默认导出
   `export =` | commonjs 导出模块
   `export as namespace` | UMD 库声明全局变量
   `declare global` | 扩展全局变量
   `declare module` | 扩展模块
   `/// <reference />` | 三斜线指令
 
 2. 全局变量都是禁止修改的常量，所以大部分情况都应该使用`const`而不是`var`或`let`。 
 
 3. **注意**：声明语句中只能定义类型，切勿在声明语句中定义具体的实现。
 
 4. `declare class`语句也只能用来定义类型，不能用来定义具体的实现。
### 3. 书写声明文件
1. 当我们使用的第三方库没有提供声明文件的时候，需要我们自己去写声明文件。声明文件的内容和使用方式在不同的应用场景下有所不同。主要有以下几种情况：
    - `全局变量`：通过` <script> `标签引入第三方库，注入全局变量
    - `npm 包`：通过 `import foo from 'foo'` 导入，符合 ES6 模块规范
    - `UMD 库`：既可以通过 `<script>` 标签引入，又可以通过 import 导入
    - `直接扩展全局变量`：通过 `<script>` 标签引入后，改变一个全局变量的结构
    - `在 npm 包或 UMD 库中扩展全局变量`：引用 npm 包或 UMD 库后，改变一个全局变量的结构
    - `模块插件`：通过 `<script>` 或 `import` 导入后，改变另一个模块的结构

2. 符合ES6规范的声明文件
   - 在一个文件中声明一个模块，模块的名称使用字符串名称
     ```typescript
        // jquery.d.ts
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
     ```
   - 与ES6模块化的语法类似。