<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [对TypeScript的一些理解](#%E5%AF%B9typescript%E7%9A%84%E4%B8%80%E4%BA%9B%E7%90%86%E8%A7%A3)
  - [1. TypeScript中的类型](#1-typescript%E4%B8%AD%E7%9A%84%E7%B1%BB%E5%9E%8B)
  - [2. 类型注解和类型推断](#2-%E7%B1%BB%E5%9E%8B%E6%B3%A8%E8%A7%A3%E5%92%8C%E7%B1%BB%E5%9E%8B%E6%8E%A8%E6%96%AD)
  - [3. 函数相关类型](#3-%E5%87%BD%E6%95%B0%E7%9B%B8%E5%85%B3%E7%B1%BB%E5%9E%8B)
  - [4. 函数的定义](#4-%E5%87%BD%E6%95%B0%E7%9A%84%E5%AE%9A%E4%B9%89)
  - [5. 数组与元组](#5-%E6%95%B0%E7%BB%84%E4%B8%8E%E5%85%83%E7%BB%84)
  - [6. 接口](#6-%E6%8E%A5%E5%8F%A3)
  - [7. 类](#7-%E7%B1%BB)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## 对TypeScript的一些理解

### 1. TypeScript中的类型

1. 静态类型  
   指的是在定义一个变量时，我们就已经确定了它的类型，比如说是number，或者是string。这样程序运行过程中，变量的类型不会改变，避免了因为不注意类型而导致的程序的异常。同时，IDE还能给出智能提示，提示这类型下具有哪些方法和属性。非常方便我们的开发。

2. 基本类型  
   `number`、`string`、`undefined`、`null`、`void`、`symbol`

3. 对象类型  
   `Array`、`function`、`object`、`Class`

4. 声明同时赋值，TS会推断出变量的类型。如果先声明，再赋值，TS推断不出这个变量的具体类型。只会推断其为`any`类型。如下所示：
   ```typescript
      let num;
      num = 1;
   ```
   **总结**：如果声明的时候不赋值，那么就要指定参数的类型。
5. 如果变量再程序运行的过程中，需要改变类型，比如说由数字变为字符串，则我们在定义的时候，最好使用联合类型对这个变量进行约束。

### 2. 类型注解和类型推断

1. 类型注解（type annotation）  
我们在定义变量的时候，确定变量的类型，如：`let num: number = 1;`，我们明确告诉TS变量`num`是什么类型。这种就是类型注解。

2. 类型推断（type inference）  
我们在定义变量的时候，不指定变量的类型，而是由TS去推断这个变量的类型。比如：`let num = 1;`，TS就能推断出这个变量是什么类型的，这种情况就是类型推断。

3. 类型推断与类型注解的使用
   - 如果TS能自动分析变量的类型，那么我们就不需要显式的定义变量的类型了。如number、string等。如：
     ```typescript
        let obj = {
             name: '123',
             age: 18
        }    
     ```
     虽然没有指定obj的类型，但是TS会推断出obj内部name和age的类型。
   - 如果TS不能自动分析变量的类型，我们需要手动指定变量的类型。比如说，我们定义一个函数，如下所示：
     ```typescript
        function addTwoNumbers(first, second) {
            return first + second;
        }    
        let ret = addTwoNumbers(1, 2);
     ```  
     这种情况下，TS会推断ret为`any`类型，因为我们没有指定`addTwoNumbers()`的参数的类型。此时我们就需要指定函数参数的类型。如下所示：
     ```typescript
        function addTwoNumbers(first: number, second: number) {
            return first + second;
        } 
        let ret = addTwoNumbers(1, 2);
     ```
     我们指定了first和second的类型，这样TS就能自动推断出ret为number类型。
   - 原则就是，能让TS推断就让TS推断，TS推断不出来的，就手动指定类型。

### 3. 函数相关类型

1. 函数最好指定返回值类型，有助于我们发现编写过程的错误。

2. 常见的返回值类型
   1. 基本类型：number、string等
   2. 空值：void，表示函数没有返回值
   3. never，表示函数永远不会执行到最后。这个不太好理解。用代码演示：
      ```typescript
         function errorEmitter(): never {
             throw new Error();
             console.log('aaa');
         }
      ```  
      这个函数中，执行到`throw new Error();`这句，就会抛出异常，然后函数终止执行，所以后面的语句都执行不到。此时函数的返回值就是`never`。适用于没有返回值，但是执行不完整体的函数。  
      ps：不知道这个返回值的实际应用场景。
      
3. 限定函数的参数类型
   - 现在我们经常以解构的方式，使用一个对象作为函数的参数，如下所示：
     ```typescript
        function addTwoNumbers({first, second}) {
            return first + second;
        }
     ```
     在这种情况下，如何限定参数的类型呢？也就是上面的first和second参数的类型。
   - 方法如下：
     ```typescript
        function addTwoNumbers({
          first,
          second,
        }: {
          first: number;
          second: number;
        }): number {
          return first + second;
        }
     
        let total = addTwoNumbers({ first: 1, second: 2 });
     ```  
     定义一个接口，并将参数类型指定为这个接口。
   - 函数只有一个参数时这样定义：
     ```typescript
        function getNumbers({ first }: { first: number }): number {
          return first;
        }  
        let count = getNumbers({ first: 1 });
     ```
     
     
### 4. 函数的定义

1. 使用函数表达式进行定义，有两种方法：
   - 在定义函数体的时候进行约束：
     ```typescript
        const func = (str: string) => {
          return parseInt(str, 10);
        };
     ``` 
     也就是在等号的右侧进行约束。如果TS能推断出返回值类型，就不需要我们去指定返回值类型。
   - 在定义变量的时候进行约束：
     ```typescript
        const func2: (str: string) => number = (str) => {
          return parseInt(str, 10);
        };
     ```
     在等号左侧进行约束，也是使用箭头函数的形式。等号右侧直接定义函数体即可。
     
     
     
### 5. 数组与元组

1. 数组的定义方式有两种：
   - 类型 + []
     ```typescript
        let arr1: number[] = [1, 2, 3];
        // 联合类型指定数组可以存储多个类型
        let arr2: (number | string)[] = [1, "2", 3];
     ```
   - 接口的方式定义
     ```typescript
        let Arr3: Array<number> = [1, 2, 3, 4];
         // 泛型结合联合类型定义数组
        let Arr4: Array<number|string> = [1, '2', 3, 4];
     ```
     
2. 定义对象数组：
   ```typescript
      class Teacher {
        name: string;
        age: number;
      }
      
      let objectArr: Teacher[] = [{ name: "dell", age: 15 }];
      let objectArr2: Array<Teacher> = [{ name: "dell", age: 15 }];
   ```
   
3. 元组（Tuple）  
   - 元组的存在意义就是约定数组指定位置的元素的类型。使得数组的不同位置使用不同的类型。这和联合类型定义数组不同，使用联合类型定义数组，不能对具体的位置进行约束，如下所示：
     ```typescript
      let Arr5: Array<number | string> = [1, "2", 3, 4];
      let Arr4: Array<number | string> = [1, "2", '3', 4];
     ```  
     任意一个位置都可以定义为number或者是string类型。
   - 元组可以对数组的每个位置的类型进行约束：
     ```typescript
        let teacherInfo: [string, string, number] = ["dell", "king", 18];
        // error TS2322: Type 'number' is not assignable to type 'string'.
        // let teacherInfo2: [string, string, number] = ["dell", 15, 18];
     ```
   - 利用元组约束数组的元素（二维数组）：
     ```typescript
        let teacherList: Array<[string, string, number]> = [
            ['dell', 'bupt', 18],
            ['jack', 'csuft', 20],
        ];
     ```
     这种约束方式，常常用在csv文件的存储形式上。
     
     
### 6. 接口

1. 接口中可以定义固定属性、可选属性、任意属性、只读属性。如下所示：
   ```typescript
      interface Fruits {
          name: string;
          readonly color: string; // 只读属性
          size?: number; // 可选属性
          weight: number;
          [proName: string]: any; // 任意属性，或者这样定义：[proName: string]: number | string;
      }
   ```  
   接口中定义任意属性，而其他的属性的属性值类型有多种类型，如name为string，size为number，则任意属性的属性值的类型必须包括这些类型，所以可以使用联合类型或者any类型，这样才不会报错。

2. 接口用来约束对象形状。固定属性必须有和只读属性必须有，而可选属性和任意属性不一定有。只读属性时在定义对象时就得赋值，此后不可更改。如果先声明，再赋值，也会报错。

3. 接口中可以定义函数，定义了函数，则被约束的对象必须实现这个方法。
   ```typescript
      interface Person {
          name: string;
          age?: number;
          say(): string;
      }
      
      let p2: Person = {
          name: 'smith',
          say: () => 'hello',
      };
   ```
   
4. 类可以实现接口。接口中定义的固定属性和方法，再类中必须实现。
   ```typescript
      interface Person {
          name: string;
          age?: number;
          say(): string;
      }   
      class Teacher implements Person {
          name = 'jack';
          age = 18;
          say() {
              return this.name;
          }
      }
   ```
   
5. 接口直接可以实现继承。
   ```typescript
      interface Person {
          name: string;
          age?: number;
      }
      
      interface Chinese extends Person {
          country: string;
      }
      
      let c1: Chinese = {
          name: 'dell',
          age: 18,
          country: 'China',
      };
   ```
   
6. 接口可以用来定义函数的输入和返回值。
   ```typescript
      interface SayHello {
          (name: string): string;
      }
      
      const hello: SayHello = name => {
          return `hello, ${name}`;
      };
   ```
   
7. 接口可以用来定义数组。
   ```typescript
      interface Index {
          [index: number]: number;
      }
      
      let arr: Index = [1, 2, 3];
   ```
   
8. 接口的作用还是1-5，6和7不常用。

### 7. 类
1. 使用`class`关键字定义一个类。

2. 类可以实现继承。

3. 子类可以重写父类的方法。

4. 子类可以调用父类的属性和方法。

5. 调用一个方法时，会按照原型链的顺序，逐次在子类、父类直到Object上查找。
   ```typescript
      class Person {
          name = 'dell';
          getName() {
              return this.name;
          }
      }
      class Teacher extends Person {
          // name = 'jack';
          getTeacherName() {
              return 'jack';
          }
          
          // 子类中重写父类的方法
          getName(): string {
              // super表示父类
              // 使用super可以在子类中调用父类的属性和方法
              return super.getName() + ' lee';
          }
      } 
      let t = new Teacher();
      // dell lee
      console.log(t.getName());
      // jack
      console.log(t.getTeacherName());
   ```

6. super的作用是：super表示父类，使用super可以在子类中调用父类的属性和方法。当我们在子类中重写了父类的方法时，还想调用父类的同名方法，此时就可以使用super进行调用。

7. 修饰符  
   修饰符的主要作用是限定类中的成员属性和方法的访问范围。
   - **public**  
     使用public修饰的成员属性和成员方法，不仅在类的内部可以访问，在类的外部、子类中都可以访问。  
     成员属性和方法不加任何修饰符，则默认就是public。
   - **private**  
     private表示私有，使用private修饰的成员属性和成员方法，只能在类的内部访问，在类的外部、子类中都不可访问，如果访问就会报错。  
     使用private的目的是将属性和方法封装在类的内部，保证其安全性，使其不能被外界随意访问。体现了面向对象的封装性。  
     private修饰构造方法，就不能对这个类进行实例化，即不能使用`new`这个关键字。
   - **protected**  
     使用protected修饰的成员属性和成员方法，仅在类的内部和子类中可以访问，在类的外部不可访问。
     
8. getter和setter
   - 在类的内部，使用private修饰的变量，类的外部无法访问，所以我们通过设置setter和getter方法，使得我们可以对私有变量可以进行设置和获取。
     ```typescript
        class Person {
            // 在类中，我们约定，以_开头的变量为私有属性
            // private _name: string;
            // constructor(name: string) {
            //     this._name = name;
            // }
        
            // 上面先定义私有属性，后定义构造方法的写法可以简化为一句
            constructor(private _name: string) {
                this._name = _name;
            }
        
            get name() {
                console.log('getter');
                return this._name;
            }
        
            set name(newName) {
                console.log('setter');
                this._name = newName;
            }
        }
        
        let teacher = new Person('dell');
        console.log(teacher.name);
        // console.log(teacher)
        
        teacher.name = 'jack';
        console.log(teacher.name);
        
        teacher.name = 'smith';
        console.log(teacher.name);
     ```
   - 对私有属性我们要设置getter和setter方法。
   - getter和setter方法必须与属性名称相同。
   - 我们在调用getter或者setter方法时，虽然是方法，但是不用加上小括号，而是像调用属性一样：
     ```typescript
        teacher.name = 'jack';
        console.log(teacher.name);
     ```
   - 我们可以在setter方法中对传入的变量进行限制，如果不符合要求，就可以不进行设置。
     ```typescript
        class Person {
            constructor(private _name: string, private _age: number) {
                // this._name = _name;
            }
        
            get name() {
                console.log('getter');
                return this._name;
            }
        
            set name(newName) {
                console.log('setter');
                this._name = newName;
            }
        
            get age() {
                return this._age;
            }
        
            set age(age) {
                    if (age > 10 && age < 100) {
                        this._age = age;
                    }
                }
        }
        
        let teacher = new Person('dell', 15);
        console.log(teacher.name);
        console.log(teacher.age);
        
        teacher.age = 5;
        // 15
        console.log(teacher.age);
     ```
     上例中，我们对age进行了限制，要求age必须在10-100之间，如果不在这个范围，则无法赋值。这体现了设置setter方法的一个好处。
   - setter和getter方法必须成对出现。
   
9. static  
   使用static修饰的属性和方法为静态属性和静态方法，直接挂载到类上，通过类进行访问，不能通过实例进行访问。
   
10. static与单例模式
    - 单例模式，指的是同一个类只能有一个实例。也就是说，无论使用这个类多少次，最终只能存在一个实例。
    - 单例模式特点：
      - 不能使用new关键字
      - 使用一个静态方法得到实例
      - 类的内部有一个私有变量来存放这个类唯一的实例
    - 因为不能使用new关键字，所以我们在类的内部使用static关键字，定义一个静态方法，我们直接通过类调用这个静态方法，得到实例：
      ```typescript
         class Demo {
             // 定义一个私有属性，类型为Demo，用来存放Demo的实例
             private static instance: Demo;
         
             // 使用private修饰构造方法，使得外面不能实例化Demo类
             private constructor(name: string) {}
         
             static getInstance() {
                 if (!this.instance) {
                     // 如果实例不存在，就实例化一个，并将其赋值给私有属性：instance
                     this.instance = new Demo('qinney');
                 }
                 return this.instance;
             }
         }
         
         let d1 = Demo.getInstance();
         let d2 = Demo.getInstance();
         // true
         console.log(d1 === d2);
      ```
    - ES5的方式实现单例模式（简版）：
      ```javascript
         function Singleton(name) {
             this.name = name;
             this.instance = null;
         }
         
         Singleton.prototype.getName = function () {
             return this.name;
         };
         
         Singleton.getInstance = function (name) {
             if (!this.instance) {
                 this.instance = new Singleton(name);
             }
         
             return this.instance;
         };
        
         let s1 = Singleton.getInstance('aaaa');      
         let s2 = Singleton.getInstance('bbbbb');
         // true
         console.log(s1 === s2);
         // "aaaa"
         s1.getName()
         // "aaaa"
         s2.getName()
      ```
      
11. 抽象类（abstract class）
    - 将一些类的公共的属性和方法提取出来，封装在抽象类中。这样其他类继承这个抽象类，同时也继承了这些属性和方法。
    - 抽象类使用`abstract`关键字定义。
    - 抽象类只能被继承，不能被实例化。
    - 抽象类中可以使用abstract关键字定义抽象方法，抽象方法只需定义函数名，参数类型和返回值类型，不需要定义函数体。在子类中必须实现这个方法。
    - 抽象类中可以定义普通方法。
    - 示例代码如下：
      ```typescript
         abstract class Geom {
             width: number;
             getType() {
                 return 'Geom';
             }
         
             // 定义抽象方法
             abstract getArea(): number;
         }
         
         class Circle extends Geom {
             private _radius: number;
             constructor(radius: number) {
                 super();
                 this._radius = radius;
             }
         
             // 子类必须实现抽象类中定义的方法
             getArea(): number {
                 return Math.PI * this._radius ** 2;
             }
         }
         
         let c1 = new Circle(5);
         
         // the circle's area is  78.53981633974483
         console.log("the circle's area is ", c1.getArea());
         // the type is  Geom
         console.log('the type is ', c1.getType());
      ```
      
12. 只读特性 —— readonly  
    - 可以给类中的public属性设置一个只读特性，这样我们就只能读取，不能修改这个属性。
    - 修改只读属性会报错：
      ```typescript
         class Person {
             public readonly name: string;
             constructor(name: string) {
                 this.name = name;
             }
         }
         
         let p1 = new Person('dell');
         // dell
         console.log(p1.name);
         
         // error TS2540: Cannot assign to 'name' because it is a read-only property.
         // p1.name = 'jack';
      ```

### 8. 联合类型和类型保护

1. 联合类型  
   - 为一个变量指定两个及以上的类型。两个类型之间使用`|`进行分隔。例如：
     ```typescript
      const aa: string | number;
     ```
   - 联合类型只能引用几个类型共有的属性或者方法。否则就会报错。

2. 类型保护
   - 我理解的类型保护，指的是如果变量被指定为联合类型，那么我们在使用时只能使用这些类型的共有属性和方法，非常不方便，所以就需要有一种判断机制，将变量判断为具体的类型，从而能够使用这个类型的方法和属性。一共有四种方法：类型断言、in、typeof和instanceof。
   - 类型断言  
     使用`as`关键字，将一个变量断言为具体的一个类型。
     ```typescript
        interface Bird {
            fly: boolean;
            sing(): string;
        }
        
        interface Dog {
            fly: boolean;
            bark(): string;
        }
     
        function trainAnimal(animal: Bird | Dog) {
            if (animal.fly) {
                return (animal as Bird).sing();
            } else {
                return (animal as Dog).bark();
            }
        }
     ```  
     如果fly属性为`true`，表明这个类为Bird，但是TS不会这么智能，因此，需要我们手动将其指定为一个具体的类型。这里使用类型断言的方式进行指定。
   - in  
      判断x属性是否存在于y中。
      ```typescript
         function trainAnimal2(animal: Bird | Dog) {
             if ('sing' in animal) {
                 return animal.sing();
             } else {
                 return animal.bark();
             }
         }
      ```
   - typeof  
     判断类型
     ```typescript
        function add(first: string | number, second: string | number) {
            if (typeof first === 'string' || typeof second === 'string') {
                return `${first}${second}`;
            }
            return first + second;
        }
     ```  
     typeof只能判断基本数据类型和函数，对于引用数据类型——对象，都会返回object，这点需要注意。
   - instanceof  
     用来判断引用数据类型，判断某个变量是否为某个类的实例。
     ```typescript
        function add2(first: object | NumberObj, second: object | NumberObj) {
            if (first instanceof NumberObj && second instanceof NumberObj) {
                return first.count + second.count;
            }
        
            return 0;
        }
     ```
     instanceof一般适用于对对象和类关系的判断。
     
     
### 9. 枚举
1. 枚举通常适用于只有有限几种选择的场景，如一周只有七天，三原色只能是红色、绿色和蓝色等。
2. 定义枚举使用`enum`定义。
   ```typescript
      
      enum Week {
          Sun,
          Mon,
          Tue,
          Wed,
          Thu,
          Fri,
          Sat,
      }

      // true
      console.log(Week['Sun'] === 0);
      // true
      console.log(Week[1] === 'Mon');
   ```
   
3. 访问一个枚举类中的元素，可以通过枚举项所代表的数值的方式，也可以通过字符串的方式。

4. 如果不手动给枚举项赋值，那么从第一个未赋值枚举项开始，默认赋值为0，后面未赋值的元素依次加1。在上例的枚举类`Week`中，，`Sun`赋值为0，`Mon`赋值为1，...，`Sat`赋值为6。

5. 可以手动给枚举项赋值。如果枚举项后面有未赋值的项，那么这个枚举项会在赋值的枚举项的基础上递增，递增的步长为1。
   ```typescript
      enum Week2 {
          Sun = 1,
          Mon,
          Tue = 4,
          Wed,
          Thu,
          Fri,
          Sat,
      }
      
      // true
      console.log(Week2['Tue'] === 4);
      // true
      console.log(Week2[1] === 'Sun');
      // true
      console.log(Week2[5] === 'Wed');
   ```
    在枚举类`Week2`中，`Sun`被手动赋值为1，而`Mon`没有被赋值，索引默认赋值为2。`Tue`被手动赋值为4，同理，`Wed`会被赋值为5，`Thu`被赋值为6，后面的以此类推。
    
    
### 10. 函数泛型

1. 在某些情况下，我们定义函数时，不会准确的知道函数的参数和返回值类型，只有在运行时才会明确它们的类型。所以，我们可以在定义函数时使用泛型。

2. 泛型用来约束参数类型：
   ```typescript
      function join<T>(first: T, second: T) {
          return `${first} ${second}`;
      }
      
      let ret = join<string>('1', '2');
      // 1 2
      console.log(ret);
      // 11 22
      let ret1 = join<number>(11, 22);
      console.log(ret1);
   ```

3. 使用多个泛型：
   ```typescript
      function join2<T, U>(first: T, second: U) {
          return `${first} ${second}`;
      }
      let ret2 = join2(1, '2');
   ```
   T和U定义了两种类型，分别约束不同的参数类型。

4. 可以在使用函数时不指定泛型的具体类型，TS可以类型推断。也可以指定具体的类型。

5. 泛型定义返回值类型：
   ```typescript
      function join3<T>(first: T, second: T): T {
          return first;
      }
      let ret3 = join3<string>('aaa', '2');
   ```
   这里需要注意的是，返回值被约束为泛型T，所以，这里必须时返回一个T类型的值。
   

### 11. 类中使用泛型

1. 在定义类的时候，使用泛型定义，提高了类的灵活性和使用场景。

2. 基本使用
   ```typescript
      class DataManager<T> {
          constructor(private data: T[]) {
              this.data = data;
          }
      
          getItem(index: number) {
              return this.data[index];
          }
      }
      
      const data = new DataManager<string>(['1', '2']);
      // 2
      console.log(data.getItem(1));
   ```
   
3. 使用接口对泛型进行约束：
   ```typescript
      // 对泛型进行约束
      interface Item {
          name: string;
      }
      
      // 泛型继承了Item，则泛型中必须具有name这个属性
      class DataManager2<T extends Item> {
          constructor(private data: T[]) {
              this.data = data;
          }
      
          getItem(index: number): string {
              return this.data[index].name;
          }
      }
      
      const data3 = new DataManager2([
          {
              name: 'dell',
          },
      ]);
      
      // dell
      console.log(data3.getItem(0));
   ```
   泛型继承了接口`Item`，则泛型中必须具有name这个属性。适用于泛型为对象的情况。

4. 基本类型对泛型的约束：
   ```typescript
      class DataManager3<T extends number | string> {
          constructor(private data: T[]) {
              this.data = data;
          }
      
          getItem(index: number): T {
              return this.data[index];
          }
      }
      
      const data4 = new DataManager3<string>(['dell', 'lee']);
      // lee
      console.log(data4.getItem(1));
   ```
   限定了泛型只能为`number`或者`string`，而不能是其他类型。

5. 泛型作为类型对变量进行约束：
   ```typescript
      function hello<T>(params: T): T {
          return params;
      }
      
      const func: <T>(params: T) => T = hello;
   ```
   变量`func`是函数类型，用TS中的箭头函数的形式对其进行约束。而`hello`是一个函数，要想赋值给`func`，必须符合等号左边的约束形式。

### 12. 命名空间 —— namespace

1. 命名空间类似于模块化。在一个文件中，只对外暴露出我想暴露的变量、类、函数等。从而避免不同文件引用出现的变量污染、命名冲突等问题。

2. 使用命名空间，首先使用`namespace`关键字，定义一个全局变量，然后将所有的变量、接口、类、函数等统统放入这个全局变量中，在需要导出的变量、接口、类、函数的前面加上export关键字。
   - 定义命名空间
     ```typescript
        // page.ts
        // 定义一个命名空间
          namespace Home {
              class Header {
                  constructor() {
                      const div = document.createElement('div');
                      div.innerHTML = 'This is a Header';
                      document.body.appendChild(div);
                  }
              }
          
              class Content {
                  constructor() {
                      const div = document.createElement('div');
                      div.innerHTML = 'This is a Content';
                      document.body.appendChild(div);
                  }
              }
          
              class Footer {
                  constructor() {
                      const div = document.createElement('div');
                      div.innerHTML = 'This is a Footer';
                      document.body.appendChild(div);
                  }
              }
          
              export class Page {
                  constructor() {
                      new Header();
                      new Content();
                      new Footer();
                  }
              }
          }
     ```
   
   - 使用命名空间导出的变量
     ```typescript
        // 使用命名空间中导出的变量
        import './Home';
        new Home.Page();
     ```
  
   - 引入命名空间有两种方式，或者说表明命名空间的一个引用关系：
     - reference
       ```typescript
          /// <referece path='./Home.ts' />
       ```
       表明，引用的是同一目录下的Home.ts中的命名空间。path表示的引用的哪个ts文件。  
       reference必须以三个反斜杠（/）开头。
     - import
       ```typescript
          import './Home.ts'
       ```  
       使用ES6的import语法。
 
3. 总结：
   在项目开发中，最好还是使用ES6的模块化语法，要比命名空间更加清晰，使我们能够清楚的了解每个变量的来历，依赖关系。

### 13. 泛型中的 `keyof` 关键字

1. `keyof` 关键字用于泛型中遍历一个对象的属性，进而将泛型类型限定为这个对象中的几个属性。

2. 不使用 `keyof` 的例子：
   ```typescript
      interface Person {
          name: string;
          age: number;
          gender: string;
      }
      
      class Teacher {
          constructor(private person: Person) {
              this.person = person;
          }
      
          getItem(key: string) {
              if (key === 'name' || key === 'age' || key === 'gender') {
                  return this.person[key];
              }
          }
      }
      
      const teacher = new Teacher({
          name: 'dell',
          age: 25,
          gender: 'male',
      });
      
      const ret = teacher.getItem('name');
   ```
   在限定了key的情况下，ret的类型是：string | number | undefined  
   为什么会有undefined呢，原因是，我们没有办法限定传入的参数key只能是name，number，或者是gender  
   只能是传入后，进行检查，符合条件，返回相应的值，不符合条件，什么也不返回  
   所以，如果我们传入了name，number，或者是gender之外的值，就会返回undefined，所以ret的类型会有undefined  

3. 为了解决这种情况，我们引入 `keyof` 关键字
   ```typescript
      interface Person {
          name: string;
          age: number;
          gender: string;
      }
      
      class Teacher {
          constructor(private person: Person) {
              this.person = person;
          }
          
          getItem<T extends keyof Person>(key: T): Person[T] {
              return this.person[key];
          }
      }
      
      const teacher = new Teacher({
          name: 'dell',
          age: 25,
          gender: 'male',
      });
      
      const ret = teacher.getItem('name');
      const ret2 = teacher.getItem('age');
      const ret3 = teacher.getItem('gender');
      // 没有的属性会报错
      // const ret4 = teacher.getItem('id');

   ```
   keyof关键字表示，泛型T只能是Person中有的属性，等同于：
   ```typescript
      type T = 'name'
      key: T;
      Person[key];
   ```
   age和gender属性也如此。这样key也就被限制了属性范围，从而返回值也限定了类型。

4. 拓展：`type`关键字可以定义任意类型，而不仅仅是`string`、`number`等类型。
   ```typescript
      // 自定义类型，将字符串：'name'赋值给NAME
      type NAME = 'name';
      // 将ts的类型限定为NAME，则ts的值只能是字符串：'name'
      const ts: NAME = 'name';
      // 将ts2的类型限定为NAME，赋其他值就会报错
      // const ts2: NAME = 'dos';
   ```
   
   
   
### 14. 装饰器（decorator）

1. 类的装饰器
   - 装饰器是一种特殊类型的声明，它能够被附加到类声明，方法， 访问符，属性或参数上。 装饰器使用 `@expression` 这种形式，expression求值后必须为一个函数，它会在运行时被调用，被装饰的声明信息做为参数传入。
   - 在不改变原有类结构的基础上，给类增加新的功能
   - 装饰器是一个函数
   - 装饰器函数接收的参数是类的构造方法
   - 装饰是通过 @ 符号使用
   - 类的装饰器是定义类的过程中，就会被执行/
   - 示例代码：
     ```typescript
        /**
         * 定义一个装饰器
         * @param constructor
         */
        function testDecorator(constructor: any) {
            // 将getName()绑定到构造方法的原型上
            constructor.prototype.getName = () => {
                console.log('Decorator');
            };
        }
       // 使用装饰器
        @testDecorator
        class Test {}
        
        const test = new Test();
        // 定义Test类时没有getName()方法，所以直接使用会报错，将test实例断言为any，就不报错了
        (test as any).getName();
     ```
   - 可以给一个类设置多个装饰器，执行顺序是从下到上，即总是从距离那个类最近的装饰器开始执行。示例代码：
     ```typescript
        function testDecorator(constructor: any) {
            console.log('Decorator');
        }
        
        /**
         *
         * @param constructor
         */
        function testDecorator2(constructor: any) {
            console.log('Decorator2');
        }
     
        @testDecorator
        @testDecorator2
        class Test {}
        // 输出
        // Decorator2
        // Decorator
     ```
     先执行装饰器testDecorator2，再执行testDecorator。
   - 还可以给装饰器传入参数。做法是使用闭包。在将真正的装饰器函数作为返回值返回，从而外层函数可以接收参数，实现更多的功能。实例代码如下：
     ```typescript
        function testDecorator(flag: boolean) {
            if (flag) {
                return function (constructor: any) {
                    // 将getName()绑定到构造方法的原型上
                    constructor.prototype.getName = () => {
                        console.log('Decorator');
                    };
                };
            } else {
                return function (constructor: any) {};
            }
        }
     
        // 使用
        // 这种情况下，使用装饰器要加上 ()，并传入参数
        @testDecorator(true)
        class Test {}
        const test = new Test();
        // 定义Test类时没有getName()方法，所以直接使用会报错，将test实例断言为any，就不报错了
        (test as any).getName();
     ```
   - 给装饰器的参数指定类型。在前面的类装饰器中，我们都指定其参数——constructor的类型为any。但是我们最好能精确限定constructor的类型为构造函数，指定的方式有两种，通过泛型指定和直接指定。
     - 泛型指定
       ```typescript
          function testDecoratorTwo<T extends new (...args: any[]) => any>(target: T) {
            // console.log(target.prototype);
        
            return class extends target {
                school = 'bupt';
                getInfo = () => {
                    return this.school;
                };
            };
        }
        
          // @testDecorator
          @testDecoratorTwo
          class NewTest {
              // 成员属性必须实例化以后才能使用
              name = 'aaa';
              age = 20;
              // 成员方法则定义在构造函数的原型上
              getName() {
                console.log('123');
              }
          }
        
          const nt = new NewTest();
          nt.getName();
          // bupt
          console.log((nt as any).getInfo());
       ```
       `(...args: any[]) => any`表示这是一个函数，`...args`在函数的参数中使用，表示剩余参数，将一个或者多个参数，装进args这个数组中。`any[]`表示`args`这个数组中元素的类型的`any`，也就是说，这个函数可以接收任意类型，任意数量的参数。函数的返回值的类型是`any`。  
       在函数前面加一个`new`，表示这是一个构造方法。  
       泛型T继承了这个构造方法，表示泛型T的构造函数，可以接收任意数量，任意类型的参数。
       而装饰器函数的constructor参数，也被约束为泛型T，进而表示constructor为构造方法。
     - 直接指定
       ```typescript
          function testDecorator(target: new (...args: any[]) => any) {
              console.log(target.prototype);
          
              for (let key in target.prototype) {
                  const method = target.prototype[key];
                  method();
              }
          }
          @testDecorator
          class NewTest {
              // 成员属性必须实例化以后才能使用
              name = 'aaa';
              age = 20;
              // 成员方法则定义在构造函数的原型上
              getName() {
                  console.log('123');
              }
          }
          
          const nt = new NewTest();
       ```
       直接指定是将前面所说的构造函数类型：`(...args: any[]) => any`，直接约束类装饰器的参数。这样比较简单。
2. 方法的装饰器
   - 方法的装饰器用于对类中成员方法的装饰。
   - 示例代码：
     ```typescript
        
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
        
        class Test {
            name: string;
            constructor(name: string) {
                this.name = name;
            }
        
             @getNameDecorator
             static getName() {
                 // return this.name;
                 return '123';
            }
     }
     ```
   - 函数装饰器接收三个参数：
     - **target**  
       如果是修饰的是普通方法，target对应的是类的原型对象 prototype，如果是静态方法，则target对应的是构造方法 constructor
     - **key**  
       被修饰的方法的名称，是字符串
     - **descriptor**  
       属性描述符，用来设定类的属性和方法的一些行为，例如：  
       writable: 比如说能否被重写  
       enumerable: 能否枚举  
       value: 被修饰的熟悉的值  
       configurable: 是否可以通过Object.defineProperty对对象再次配置
   - 实际上，常用的是前两个参数。
   - 还可以给函数装饰器传递参数。示例代码如下所示：
     ```typescript
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
            // 带参数的装饰器
            @getNameDecoratorWithParam('jakky')
            getName() {
                return this.name;
            }
        }
        
        const test = new Test('jack');
        test.getName();
     ```
   - 使用工厂模式，将真正的装饰器函数作为返回值返回，也就是闭包。所以，我们在使用时，要先传入参数，使得外层函数先执行，而闭包中，保留着对params的引用。
   - 函数的装饰器的执行时机：装饰器函数装饰了类中的方法，在创建类的时候就会被使用。
   - descriptor中的value实际上是对方法的引用，因此，可以将方法进行覆写。
   
3. 访问器的装饰器
   - 访问器值得是getter和setter方法。
   - TypeScript不允许同时装饰一个成员的get和set访问器。取而代之的是一个成员的所有装饰的必须应用在文档顺序的第一个访问器上。原因是：在装饰器应用于一个属性描述符时，它联合了get和set访问器，而不是分开声明的。
   - 示例代码：
     ```typescript
        /**
         * 访问器的装饰器的参数和方法装饰器的一样
         * @param target 对于静态成员来说是类的构造函数，对于实例成员是类的原型对象
         * @param key 属性的名称
         * @param descriptor 描述符
         */
        function visitorDecorator(
            target: any,
            key: string,
            descriptor: PropertyDescriptor
        ) {
            // Test5 {}
            console.log(target);
            // name
            console.log(key);
            // {
            //   get: [Function: get],
            //   set: [Function: set],
            //   enumerable: false,
            //   configurable: true
            // }
            console.log(descriptor);
            // descriptor.writable = false;
            descriptor.get = () => {
                return 'smith';
            };  
        }
        
        class Test5 {
            private _name: string;
            constructor(name: string) {
                this._name = name;
            }
        
            @visitorDecorator
            set name(name: string) {
                this._name = name;
            }
            get name() {
                return this._name;
            }
        }
        
        const test = new Test5('jack');
        // console.log(test.name);
        test.name = 'rose';
        test.name = 'curry';
        
        // smith
        console.log(test.name);
     ```
   - 访问器的装饰器接收三个参数：
     - **target**  
       对于静态成员来说是类的构造函数，对于实例成员是类的原型对象
     - **key**  
       被修饰的访问器的名称，也就是getter或者setter的名称
     - **descriptor**  
       属性的描述符
   - 访问器的装饰器实际上与方法的装饰器类似，都是对方法的装饰。装饰器函数接收的参数都是一样的，区别是第三个参数descriptor的内容。
   - 访问器的装饰器的执行时机：装饰器函数装饰了类中的访问器，在创建类的时候就会被使用。

4. 属性的装饰器
   - 这里所说的属性，指的是类中的成员属性或者静态属性。
   - 示例代码：
     ```typescript
        /**
         *
         * @param target 对于静态成员来说是类的构造函数，对于实例成员是类的原型对象
         * @param key 成员的名字
         */
        function nameDecorator(target: any, key: string): any {
            // console.log(target, key);
            // 虽然参数中没有传入属性描述符，但是我们可以自定义一个新的属性描述符，替换原来的属性描述符
            const descriptor: PropertyDescriptor = {
                // 设置其writable为false，则不可以改变这个属性的值
                writable: false,
            };
        
            return descriptor;
        }        
        class Test {
            @nameDecorator
            name = 'dell';
        }
        
        const test = new Test();
        // 当我们在装饰器中，设置其描述符中的writale为false，就不能改写name属性了
        test.name = 'rose';
        // TypeError: Cannot assign to read only property 'name' of object '#<Test>'
        console.log(test.name);
     ```
   - 属性装饰器的参数是：
     - **target**  
       对于静态成员来说是类的构造函数，对于实例成员是类的原型对象
     - **key**  
       成员的名字
   
   - 我们可以设置新的属性描述符（PropertyDescriptor）来覆盖属性原来的描述符，进而对属性进行约束。
   - 如果在装饰器中对类中的某个属性进行设置，实际上我们修改的是原型上面的属性，而不是实例上的属性：
     ```typescript
        
        
        function nameDecorator(target: any, key: string): any {
             // target是类的原型，因此我们这样修改的实际上是原型的属性
             // 没有办法直接修改实例属性
             target[key] = 'rose';
        }
        
        class Test {
            @nameDecorator
            name = 'dell';
        }
        
        const test = new Test();
        // name是实例属性
        // dell
        // console.log(test.name);
        
        // 想要通过实例，访问原型上的属性，只能通过__proto__去访问
        // 由于实例上，直接访问__proto__会报错，所以首先将其断言为any，在进行访问
        // rose
        console.log((test as any).__proto__.name);
     ```
   - 也就是说，属性装饰器，无法修改实例属性。

5. 参数的装饰器
   - 这里的参数指的是成员方法的参数。
   - 参数装饰器只能用来监视一个方法的参数是否被传入。
   - 示例代码：
     ```typescript
        /**
         *
         * @param target 对于静态成员来说是类的构造函数，对于实例成员是类的原型对象
         * @param method 被装饰的参数所在的函数
         * @param paramIndex 被修饰的参数的位置
         */
        function paramDecorator(target: any, method: string, paramIndex: number) {
            // Test { getInfo: [Function] } getInfo 0
            console.log(target, method, paramIndex);
        }
        
        class Test {
            getInfo(@paramDecorator name: string, age: number) {
                console.log(name, age);
            }
        }
        
        const test = new Test();
        // jack 20
        test.getInfo('jack', 20);
     ```
   - 参数装饰器的接收参数是：
     - **target**  
     对于静态成员来说是类的构造函数，对于实例成员是类的原型对象
     - **method**  
     被装饰的参数所在的函数，实际上就是字符串
     - **paramIndex**  
     被修饰的参数的位置


### 15. reflect-metadata与装饰器

1. 参考资料：[JavaScript Reflect Metadata 详解](https://www.jianshu.com/p/653bce04db0b)

2. reflect-metadata基本说明  
   - 这个一个反射的模块。在Java等编程语言中，都有反射机制，在Java中，反射机制的作用是通过一个实例，获取这个类的方法、属性等。而TS中的反射，则是来获取究竟有哪些装饰器添加到这个类/方法上。
   -简单来说，你可以通过装饰器来给类添加一些自定义的信息。然后通过反射将这些信息提取出来。当然你也可以通过反射来添加这些信息。
   
3. 几个概念
   - `Metadata Key {Any}` 简写 k。元数据的 Key，对于一个对象来说，他可以有很多元数据，每一个元数据都对应有一个 Key。一个很简单的例子就是说，你可以在一个对象上面设置一个叫做 name 的 Key 用来设置他的名字，用一个 created time 的 Key 来表示他创建的时间。这个 Key 可以是任意类型。在后面会讲到内部本质就是一个 Map 对象。
   - `Metadata Value {Any}` 简写 v。元数据的值，任意类型都行。
   - `Target {Object}` 简写 t。表示要在这个对象上面添加元数据。
   - `Property {String|Symbol}` 简写 p。用于设置在哪个属性上面添加元数据。大家可能会想，这个是干什么用的，不是可以在对象上面添加元数据了么？其实不仅仅可以在对象上面添加元数据，甚至还可以在对象的属性上面添加元数据。其实大家可以这样理解，当你给一个对象定义元数据的时候，相当于你是默认指定了 undefined 作为 Property。
   
4. 用法
   - 先看一段示例代码：
     ```typescript
        // 直接通过import的方式进行引入
        import 'reflect-metadata';
        
        @Reflect.metadata('name', 'A')
        class A {
            @Reflect.metadata('hello', 'world')
            public hello(): string {
                return 'hello world';
            }
        }    
        // A
        const v1 = Reflect.getMetadata('name', A);
        // 
        const v2 = Reflect.getMetadata('hello', new A());
     ``` 
   - 要使reflect-metadata这个模块，首先要进行安装：`npm install reflect-metadata --save`。然后直接导入：`import 'reflect-metadata';`
   - `Reflect.metadata('name', 'A')`，表示在某个类上、属性或者方法上定义元数据。其中name表示元数据的key，A表示元数据的value。
   - `Reflect.getMetadata('name', A)`，获得某个类上面的某个元数据。其中name表示元数据的key，A表示添加了元数据的类。

   - 第二段代码：
     ```typescript
        @Reflect.metadata('name', 'A')
        class A {
            @Reflect.metadata('hello', 'world')
            public hello(): string {
                return 'hello world';
            }
        
            @Reflect.metadata('name', 'hello')
            hello2() {}
        }
        
        // A
        const v1 = Reflect.getMetadata('name', A);
        // world
        const v2 = Reflect.getMetadata('hello', new A(), 'hello');
        
        // console.log(v1);
        console.log(v2);
        
        const objs = [A, new A(), A.prototype];
        
        const res = objs.map(obj => [
            // 对类的装饰，都是定义在对象上面
            Reflect.getMetadata('name', obj),
            // 对类的属性或者方法的修饰，都是定义在类的原型上,并且以属性或者方法的 key 作为 property，也就是属性或者方法的名称
            Reflect.getMetadata('name', obj, 'hello2'),
            Reflect.getOwnMetadata('name', obj),
            Reflect.getOwnMetadata('name', obj, 'hello2'),
        ]);
        
        // [
        //   [ 'A', undefined, 'A', undefined ],
        //   [ undefined, 'hello', undefined, undefined ],
        //   [ undefined, 'hello', undefined, 'hello' ]
        // ]
        console.log(res);
     ```
   - 使用Reflect.metadata()添加元数据，有以下几种情况：
     - 对类的装饰，都是定义在对象上面
     - 对类的属性或者方法的修饰，都是定义在类的原型上,并且以属性或者方法的 key 作为 property，也就是属性或者方法的名称。
   - 查找元数据的方式也是通过原型链进行的。示例代码如下：
     ```typescript
        class B {
            @Reflect.metadata('name', 'dell')
            hello() {}
        }
        
        const t1 = new B();
        const t2 = new B();
        
        // 定义在实例上
        Reflect.defineMetadata('otherName', 'world', t2, 'hello');
        // 定义在类上
        Reflect.defineMetadata('otherNameT1', 'China', B, 'greeting');
        
        // dell
        console.log(Reflect.getMetadata('name', t1, 'hello'));
        // undefined
        console.log(Reflect.getMetadata('otherName', t1, 'hello'));
        // world
        console.log(Reflect.getMetadata('otherNameT1', B, 'greeting'));
        
        // dell
        console.log(Reflect.getMetadata('name', t2, 'hello'));
        // world
        console.log(Reflect.getMetadata('otherName', t2, 'hello'));
        
        // undefined
        console.log(Reflect.getOwnMetadata('name', t2, 'hello'));
        // undefined
        console.log(Reflect.getOwnMetadata('name', t1, 'hello'));
        // world
        console.log(Reflect.getOwnMetadata('otherName', t2, 'hello'));
     ```
   - 因为给类B的成员方法hello()添加了元数据，所以这个元数据被加到了B的原型上。
   - 通过getMetadata()获取某个实例或者类的元数据，查找通过原型链的方式进行。以`Reflect.getMetadata('name', t1, 'hello')`为例，要查找添加在实例t1上的属性hello的元数据，其key为name，那么首先在实例t1上进行查找，没有这个元数据，则我们顺着原型链，去类B的原型上去查找，类B的原型上存在这个元数据，则返回这个元数据。
   - `Reflect.defineMetadata('otherName', 'world', t2, 'hello');`，在实例t2上，定义一个元数据，key为otherName，value为world，添加元数据的属性是hello。根据后面测试的表现来看，这个没有添加到类B的原型上，而是添加到实例t2上面了。
   - `Reflect.getMetadata('otherName', t1, 'hello');`，因为t1及其原型链上没有`otherName`这个元数据，所以得到的是`undefined`。
   - `Reflect.getOwnMetadata('otherName', t2, 'hello')`，带了own，表示只去查找在实例上面的元数据。因为otherName定义在实例t2上，所以可以查找到，而name定义在原型上，所以查找不到。
5. 主要API
   
   - metadata(k, v): (target, property?) => void  
     **给类、属性或者方法添加元数据**
     
   - defineMetadata(k, v, t, p?): void  
     **在对象上面定义元数据**
     
   - hasMetadata(k, t, p?): boolean  
     **是否存在元数据**
     
   - hasOwnMetadata(k, t, p?): boolean  
     **是否存在元数据（实例）**
 
   - getMetadata(k, t, p?): any  
     **获取元数据**
     
   - getOwnMetadata(k, t, p?): any  
     **获取实例的元数据**
     
   - getMetadataKeys(t, p?): any[]  
     **获取所有元数据的 Key**
     
   - getOwnMetadataKeys(t, p?): any[]  
     获取所有元数据（实例）的 Key 
     
   - deleteMetadata(k, t, p?): boolean  
     删除元数据
