## tsconfig.json文件配置说明
1. 如果我们直接执行`tsc demo.ts`命令，会在同级目录下生成demo.js文件。在这种情况下，并不会直接读取tsconfig.json里面的配置项。

2. 我们如果只执行`tsc`命令，首先会去读取tsconfig.json里面的配置项，如果存在`include`字段，则会去编译这个字段指定的文件，否则会默认编译当前目录下所有的ts文件。同时海湖读取其他的配置项，如`compilerOptions`，就是配置编译过程的一些选项。

## tsconfig.json字段详解
1. 参考：
   - [tsconfig.json 中文版](https://www.tslang.cn/docs/handbook/tsconfig-json.html)
   - [tsconfig.json 英文版](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html)
2. include  
   要编译哪些ts文件。字段值为数组，数组元素为ts文件路径。
3. exclude  
   不需要编译哪些ts文件，字段值为数组，数组元素为ts文件路径。
4. files  
   与includes作用相同。
5. compilerOptions  
   这个字段下有非常多的属性，我们这里选择几个常用的比较重要的字段进行说明。
   - removeComments  
     属性值为布尔值。为`true`的话，表示编译过程中，将移除所有的注释。`false`的话，保留所有的注释。 
   - noImplicitAny  
     - 有的时候，我们不会显式声明一个变量为any类型，而TS无法推断这个变量的类型的时候，就会将其回退为any类型，但是有可能会导致一些错误，比如前后数据类型不一致，此时TS无法检查出来。
     - noImplicitAny的属性值为布尔值。作用就是解决隐式的any类型问题。为`true`的话，表示一旦我们没有显式声明一个变量为any类型，而且TS推断其为any类型，就会给出一个错误。为`false`的话，表示不会给出错误提示。
   - strictNullChecks  
     - 强制检查null类型  
     - 属性值为布尔值。为`true`的话，表示将对元素的赋值情况进行检查，不允许将null和undefined赋值给基本数据类型，或者元素未赋值，也会报错。为`false`的话，表示不对元素的赋值情况进行检查，并允许将null赋值给基本数据类型。
   - rootDir  
     这个属性用来控制要编译的ts文件的路径，属性值是路径字符串。当我们执行`tsc`命令时，TS就会去编译这个路径下的ts文件。
   - outDir  
     这个属性用来控制编译后的ts文件的存放位置。属性值是路径字符串。TS将文件编译为js文件，并将js文件存放在outDir指定的路径下。
   - incremental  
     - 渐进式编译。属性值为布尔值。为true的时候，TS只会编译新增的内容，为false时，就全部编译。
     - 设置这个属性为true的时候，会在根目录生成`tsconfig.tsbuildinfo`文件，里面存放了编译的文件的信息，当TS再次执行编译时，会和这个文件的内容进行比对，相同的内容就不再编译，而是只编译最新的内容。
   - allowJs  
     - 允许js文件被编译。默认情况下，TS只编译ts文件。如果我们也想将js文件编译，比如说ES6编译为ES5，所以我们就可以使用这个属性来进行控制。
     - 为true的时候，执行tsc命令的时候，同时编译js文件和ts文件，为false的时候，只编译ts文件。
   - checkJs  
     是否对js文件进行检查。属性值为布尔值。为true的时候，检查js文件，为false的时候，不检查js文件。
   - noUnusedLocals  
     是否检查有未使用的局部变量。为true的话就检查，为false的话就不检查。如果存在未使用的变量，就提示，但不会报错。
   - noUnusedParameters  
     是否检查有未使用的函数参数。为true的话就检查，为false的话就不检查。如果存在未使用的参数，就提示，但不会报错。