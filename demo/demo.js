// let num = 1;
// let teacherName = 'abc';
//
// function addTwoNumbers(first: number, second: number) {
//     return first + second;
// }
//
// let ret = addTwoNumbers(1, 2);
// 使用类型断言实现类型保护
function trainAnimal(animal) {
    if (animal.fly) {
        return animal.sing();
    }
    else {
        return animal.bark();
    }
}
// 使用in关键字实现类型保护
// function trainAnimal2(animal: Bird | Dog) {
//     if ('sing' in animal) {
//         return animal.sing();
//     } else {
//         return animal.bark();
//     }
// }
//
// 使用typeof实现类型保护
// function add(first: string | number, second: string | number) {
//     if (typeof first === 'string' || typeof second === 'string') {
//         return `${first}${second}`;
//     }
//     return first + second;
// }
//
// class NumberObj {
//     count: number;
// }
//
// 使用instanceof实现类型保护
// function add2(first: object | NumberObj, second: object | NumberObj) {
//     if (first instanceof NumberObj && second instanceof NumberObj) {
//         return first.count + second.count;
//     }
//
//     return 0;
// }
// // 枚举
// enum Week {
//     Sun,
//     Mon,
//     Tue,
//     Wed,
//     Thu,
//     Fri,
//     Sat,
// }
//
// // true
// console.log(Week['Sun'] === 0);
// // true
// console.log(Week[1] === 'Mon');
//
// enum Week2 {
//     Sun = 1,
//     Mon,
//     Tue = 4,
//     Wed,
//     Thu,
//     Fri,
//     Sat,
// }
//
// // true
// console.log(Week2['Tue'] === 4);
// // true
// console.log(Week2[1] === 'Sun');
// // true
// console.log(Week2[5] === 'Wed');
// 函数泛型
// function join<T>(first: T, second: T) {
//     return `${first} ${second}`;
// }
//
// let ret = join<string>('1', '2');
// // 1 2
// console.log(ret);
// // 11 22
// let ret1 = join<number>(11, 22);
// console.log(ret1);
//
// function join2<T, U>(first: T, second: U) {
//     return `${first} ${second}`;
// }
// let ret2 = join2(1, '2');
//
// function join3<T>(first: T, second: T): T {
//     return first;
// }
// let ret3 = join3<string>('aaa', '2');
//
// function map<T>(param: Array<T>) {
//     return param;
// }
// 类中使用泛型
var DataManager = /** @class */ (function () {
    function DataManager(data) {
        this.data = data;
        this.data = data;
    }
    DataManager.prototype.getItem = function (index) {
        return this.data[index];
    };
    return DataManager;
}());
var data = new DataManager(['1', '2']);
// 2
console.log(data.getItem(1));
var data2 = new DataManager([100, 200]);
// 200
console.log(data2.getItem(1));
// 泛型继承了Item，则泛型中必须具有name这个属性
var DataManager2 = /** @class */ (function () {
    function DataManager2(data) {
        this.data = data;
        this.data = data;
    }
    DataManager2.prototype.getItem = function (index) {
        return this.data[index].name;
    };
    return DataManager2;
}());
var data3 = new DataManager2([
    {
        name: 'dell'
    },
]);
// dell
console.log(data3.getItem(0));
// 使用基本类型对泛型进行约束
var DataManager3 = /** @class */ (function () {
    function DataManager3(data) {
        this.data = data;
        this.data = data;
    }
    DataManager3.prototype.getItem = function (index) {
        return this.data[index];
    };
    return DataManager3;
}());
var data4 = new DataManager3(['dell', 'lee']);
console.log(data4.getItem(1));
