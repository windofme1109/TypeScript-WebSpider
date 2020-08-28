## 使用TypeScript完成爬虫项目的的总结
### 1. 初始化项目
1. 生成package.json文件  
   在命令行输入：`npm init -y`，即可生成package.json文件
   
2. 生成tsconfig.json文件  
   在命令行输入：`tsc --init`，即可生成tsconfig.json文件。这一步非常重要，这个文件是有关于TS配置的一些内容，生成这个文件，涉及到导入一些模块的时候，TS才会给出提示。比如说提示缺少声明文件等。

3. 局部安装TypeScript和ts-node  
   局部安装的优势是，项目依赖的所有模块都在package.json中。当我们把项目发布后，使用者直接执行`npm install`就可以安装所有依赖。项目也能正常运行。而如果是全局安装，那么就一些依赖就不会放在package.json中。项目发布后，项目会因为缺少某些依赖而报错。
   
4. 修改package.json中的script字段  
   在这个字段中加入：`"dev": "ts-node src/crawler.ts"`，当我们运行`npm run dev`命令的时候，使用ts-node这个命令去执行src目录下的crawler.ts这个文件。

5. 安装模块的声明文件  
   - 所谓的声明文件，指的是以`.d.ts`为结尾的文件。这个文件中包含着这个包或者模块的函数和变量声明。当我们使用包中的函数或者变量时，TS会根据这个文件给出类型的提示，使得我们书写代码非常方便。
   - 不是所有的第三方模块都会自带声明文件。如果没有自带声明文件，那么需要我们手动下载声明文件，也有可能这个模块根本每声明文件。在TypeScript 2.0以上的版本，获取类型声明文件只需要使用npm。类型声明包的名字总是与它们在npm上的包的名字相同，但是有@types/前缀， 例如获取cheerio的声明文件：`npm install --save @types/cheerio`。
   - 查找某个包的声明文件的网站：https://microsoft.github.io/TypeSearch/

6. ts文件编译为js文件
   - 我们使用`ts-node`这个命令编译并执行了ts文件，期间并没有生成js文件。但实际上，我们构建项目，需要的是js文件。因此我们需要使用`tsc`命令，将ts文件编译为js文件。
   - 如果我们每一次修改ts文件后，执行`tsc`命令，生成js文件，这样很麻烦。所以我们需要配置`tsc`命令。
   - 在package.json文件中的`scripts`中添加：`"build": "tsc -w"`，`tsc`表示编译ts文件，而`-w`表示watch，也就是说，一旦ts文件发生变化，自动执行tsc命令，帮助我们编译成js文件。

7. 修改tsconfig.json文件
   - 使用tsc命令编辑后的js文件通常会和ts文件在同一个目录下，在实际的项目开发中，这是不合理的，我们最好将编译后的js文件放在一个单独的目录下，因此需要修改tsconfig.json文件。
   - 在`"compilerOptions"`字段下，将`"outDir"`的值设置为：`./build`，表示编译后的js文件放在与tsconfig同级的build目录下。

8. 自动执行
   - 生成接收文件后，我们需要执行js文件。同样我们也需要js文件更新后，就能立即执行。因此我们使用`nodemon`这个工具。 在package.json文件中的`scripts`中添加：`"start": "nodemon node ./build/crawler.js"`。表示，我们使用nodemon执行build目录下的crawler.js文件。
   - 由于nodemon监测的是整个项目，但是有一些文件不需要它去监测，比如说我们存储结果的course.json文件，我们一旦执行crawler.js文件，就会更新course.json文件，而course.json文件一旦跟新，又会触发nodemon执行crawler.js文件，此时course.json又会被更新，于是就处于无限循环之中。实际上，我们监测的主要是js文件。所以需要配置nodemon，使其忽略对course.接送文件的支持。
   - 在package.json文件中的`scripts`中添加：`"nodemonConfig": {"ignore": ["data/*"]},`，表示忽略data目录下所有文件。

9. 并行执行`tsc -w`和`nodemon`
   - 执行`tsc -w`和`nodemon`，必须开启两个终端，有没有同时执行（并行）这两个命令的方法呢？
   - 答案是有的，安装一个工具：concurrently，安装命令：`npm install concurrently -D`。在package.json文件中的`scripts`中添加：`"dev": "concurrently \"npm run dev:build\" \"npm run dev:start\""`。
   - concurrently的文档地址：https://www.npmjs.com/package/concurrently
   - 使用格式：
     1. 命令行：`concurrently "command1 arg" "command2 arg"`
     2. package.json: `"start": "concurrently \"command1 arg\" \"command2 arg\""`

### 2. 使用express重构项目

1. 使用express搭建一个服务器。所以要新建一个index.ts文件，这个文件是项目的入口文件，所以，我们要在package.json中去修改配置项：
   ```json
      {
          "scripts": {
             "dev:build": "tsc -w",
             "dev:start": "nodemon  build/index.js",
             "dev": "tsc && concurrently \"npm run dev:build\" \"npm run dev:start\""
          }
      }
   ```
   命令解释：
   - `"dev:build": "tsc -w"`
   - `"dev:start": "nodemon  build/index.js"`  
     这个命令，表示执行build目录下的index.js文件。这个文件是我们项目的入口文件，使用nodemon去执行。
   - ` "dev": "tsc && concurrently \"npm run dev:build\" \"npm run dev:start\""`  
     为什么要在concurrently的前面加上tsc命令，因为如果我们直接并行的执行dev:build和dev:start这两个命令，由于是同时执行，TS还没有将index.ts文件编译完成，nodemon就会去执行index.js文件，此时还没有生成index.js文件，所以会提示找不到index.js文件这个错误。  
     因此我们要在并行执行那两个命令之前，先对index.ts文件进行编译。  
     使用&&连接两个命令，表示先执行tsc，再执行concurrently。

2. express的类型文件 `.d.ts` 文件对类型的描述不准确，很多都是any，无法精确限制类型
   - 解决方法：定义一个接口，使之继承某一个类型，比如说是Request，然后在这个接口中定义我们需要限定的类型，比如说是body
   - 使用时，直接使用这个接口即可。
   - 示例代码：
     ```typescript
        interface BodyRequest extends Request {
             body: {
                // 任意属性
                // 属性为字符串即可
                [prop: string]: string | undefined;
             };
        }
     ```
   - BodyRequest 这个接口，继承了Reuqest，不仅具有Request类型的所有内容，同时我们还可以根据自己的需求，增加或者是覆写一下东西，然后使用这个新的BodyRequest对变量进行类型限定。
   
3. 当我们使用中间件时，对req或者res对象做出了修改，但是类型定义并没有改变
   - 解决方法是，我们可以自定义一个`.d.ts`的类型文件，按照官方的声明格式，在里面添加我们需要限定的类型。TS会将相同的全局变量进行合并。例如：我们在项目的根路径下建立一个类型文件：`custom.d.ts`，内容如下：
     ```typescript
        /**
          * 自定义的类型文件，用来扩展Express原本的类型定义
          * 定义方式要与Express的类型定义文件相同
          */
        declare namespace Express {
            interface Request {
                     teacherName: string;
            }
        }
     ```
   - 定义方式与Express的官方类型定义文件相同，这样TS就会将其合并。这被称为类型融合，我们要找到express的核心的类型定义文件：`@types/express-serve-static-core/index.d.ts`，进入这个文件，**仿照这个文件的声明方式进行声明**。

### 3. 装饰器（Decorator）在项目中的应用

1. 装饰器主要用在后端的路由处理中。将一些公共的处理流程，比如：检查是否登录、指定请求方法等，这些功能都可以抽出来，放到装饰器中去做。
2. 想要用好装饰器，必须和反射机制结合。在TypeScript中，要使用reflect-metadata这个模块实现反射机制。
3. 基本流程就是通过反射机制，获取定义在某个类、方法上的装饰器以及元数据（使用defineMetadata()函数定义），根据元数据和装饰器，进行相应的操作。
4. 在项目中使用的装饰器主要是类装饰器和方法装饰器。
5. 对后端进行拆分，按照MVC的模式组织代码。统一将前端请求放在Controller层中进行处理。我们只需要搞定路由处理函数即可。我们以登录接口为例来说明如何使用装饰器实现Controller。
   - 安装`reflect-metadata`模块：`npm install reflect-metadata --save`
   - 新建两个目录：`controller`和`decorator`。其中`decorator`目录用来存放装饰器函数。
   - 在decorator目录下，新建decorator.ts文件，这个文件用来定义装饰器，并且给相应的方法添加元数据。
     ```typescript
        import 'reflect-metadata';
        import { RequestHandler } from 'express';
        
        /**
         * 这个函数的主要作用是将path和method作为元数据添加到某个成员方法中
         * @param method
         */
        function requestDecorator(method: string) {
            return function (path: string) {
                // 真正的装饰器
                /**
                 * 修饰的是普通方法，target是类的原型对象 prototype，修饰的是静态方法，则target是类的constructor
                 */
                return function (target: any, key: string) {
                    Reflect.defineMetadata('path', path, target, key);
                    Reflect.defineMetadata('method', method, target, key);
                };
            };
        }
        
        /**
         * 添加多个中间件
         * @param middleware
         */
        export function use(middleware: RequestHandler) {
            return function (target: any, key: string) {
                // 要添加多个中间件，所有metadataValue必须是数组的形式
     // 判断中间件数组是否存在，不存在，说明是第一次赋值，则赋值为空数组，否则就直接获取中间数组
                const mws: Array<any> = Reflect.getMetadata('middlewares', target, key)
                    ? Reflect.getMetadata('middlewares', target, key)
                    : [];
        
                // 将新的中间件推入数组中
                mws.push(middleware);
                Reflect.defineMetadata('middlewares', mws, target, key);
                
            };
        }
        export const get = requestDecorator('get');
        export const post = requestDecorator('post');
     ```
     因此，我们可以给类的成员方法添加装饰器。使用如下：
     ```typescript
        import { post, get, use } from '../decorator/request-backup';
        @get('/isLogin')
        isLogin(req: BodyRequest, res: Response) {}
        
        @post('/login')
        login(req: BodyRequest, res: Response) {}
     
         
        @get('/getData')
        @use(test)
        @use(print)
        getData(req: BodyRequest, res: Response): void {}
     ```
     test和print是我们自定义的中间件。
   - 在decorator目录下，新建controller.ts文件，这个文件实现一个类装饰器，作用有：
     - 获取定义在类中所有成员方式上的元数据和装饰器。
     - 生成路由，包括路径、方法和处理逻辑以及对中间件的处理。
     ```typescript
        import 'reflect-metadata';
        import { Router } from 'express';
        
        enum RequestMethods {
            get = 'get',
            post = 'post',
        }
       
        const router = Router();
        
        /**
         * root 参数，是父路径，而Controller内的路由处理函数的装饰器，接收的参数是子路径，二者拼接形成完整的请求路径
         * @param root
         * @constructor
         */
        export function ControllerBackup(root: string) {
            return function (target: new (...args: any[]) => any) {
                // 成员方法都定义在类的原型上
                const targetPrototype = target.prototype;
                for (let key in targetPrototype) {
                    const path = Reflect.getMetadata('path', targetPrototype, key);
                    const finalPath = root === '/' ? path : `${root}${path}`;
                    // 获取定义在某个成员方式上的方法的元数据
                    const method: RequestMethods = Reflect.getMetadata(
                        'method',
                        targetPrototype,
                        key
                    );
                    // 获取定义在某个成员方式上的中间件元数据
                    const middlewares = Reflect.getMetadata(
                        'middlewares',
                        targetPrototype,
                        key
                    );
                    const handle = targetPrototype[key];
                    if (finalPath && method) {
                        if (middlewares && middlewares.length) {
                            // 保证中间件数组一定存在
                            router[method](finalPath, ...middlewares, handle);
                        } else {
                            router[method](finalPath, handle);
                        }
                    }
                }
            };
        }
        
        export default router;
     ```
     这个装饰器是给类使用的，同时还可以接收一个根路径参数，使用如下：
     ```typescript
        import { ControllerBackup } from '../decorator/controller-backup';
        @ControllerBackup('/api')
        export class LoginController {}
     ```
   
### 4. 在React中使用TypeScript

1. 安装
   - 在控制台输入：`npx create-react-app react-project-typescript --template typescript --use-npm`
   - `--template typescript` 表示使用typescript作为项目的模板。
   - `--use-npm` 表示使用npm安装项目的依赖。不加入这个参数，则默认使用yarn的方式安装项目的依赖。
   
2. 书写组件的文件的后缀是`.tsx`。

3. 函数组件的限定类型是`React.FC`，如下所示：
   ```tsx
        import React, { FC } from 'react';
   
        export default const App: React.FC = () => {
            return (
                <div className="main">
                    <HashRouter>
                        <Switch>
                            <Route path="/login" component={Login} />
                            <Route path="/" component={Home} />
                        </Switch>
                    </HashRouter>
                </div>
            );
        };
   ```

4. 函数组件结合hooks可以实现类组件的效果。
5. 在类组件中，想要限定类型，可以使用泛型。
   ```tsx
      import { FormProps } from 'antd/lib/form/Form';
      import React, {Component} from 'react' ;
      interface Props {
          form: FormProps;
      }
      
      export class Test extends Component<Props> {
          render() {
              let from = this.props.form;
              return <div></div>;
          }
      }
   ```
   通过泛型的形式，明确了Test组件接收的props参数的类型，也就是说，props里面会有表单这个参数，这样TS既能给出提示，又能进行检查。

6. 学会去找模块提供的类型定义。有很多第三方的模块，如antd，express等，有现成的声明文件，里面具有很多类型。因此，为了提高代码的健壮性和可读性，减少程序出错的机率，我们需要进入模块的声明文件中寻找我们需要的类型。一般而言，我们首先寻找后缀是`.d.ts`的声明文件，在这些声明文件中去寻找。

7. 模块书写的小技巧
   - 我们定义了一个decorator的模块，目录结构如下：
     ```tsx
        |-- controller
            |-- controller.ts
        |-- request
            |-- request.ts
        |-- index.ts 
        |-- method.ts
     ```
   - 其中，controller.ts和request.ts向外导出若干变量和函数。其他模块如果要使用一个变量，可能就得这样：`import Controller from '../../decorator/controller''`，就要定位到具体文件。如果文件的层级比较深，那么这种引入的方式非常麻烦。
   - 为了解决这个问题，我们可以设置一个入口文件，也就是在decorator这个模块的根目录下，建立`index.ts`文件，使用`export from`语法，将这个模块需要对外导出的变量和函数，统一从index.ts中导出。代码如下：
     ```typescript
        export * from './controller/controller'
        export * from './request/request'
     ```
   - `export-from` 用于聚集模块。但不能在直接使用。例如在index.js里`export { a } from 'b.js'`, 变量a在index.js里无法使用。相
   - 其他模块引入了decorator模块的内容时，会首先进入index.ts文件中进行查找。我们在`index.ts`中聚集了decorator模块中所有的对外暴露的模块和变量，因此TS能轻易找到我们需要的内容。
   - 实际上，我们观察node_modules中的模块，入口文件都是`index.js`，这个模块需要导出的内容，都在index.js文件中。这样我们在使用的时候，多数情况下，直接是：`import from '模块名';`，而不用定位到具体的目录下去引入。