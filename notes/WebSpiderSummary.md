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