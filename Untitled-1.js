/* 词法作用域 */
// function outer(){
//     var outerVariable = 'Hello';
//     function inner(){
//         var innerVariable ='World'
//         console.log(outerVariable+' '+innerVariable)
//     }
//     inner()
// }
// outer()
/* 作用域链 */
var globalVariable = 'Global';
function outer() {
    var outerVariable = 'Hello';
    function inner() {
        var innerVariable = 'World';
        console.log(globalVariable + ' ' + outerVariable + ' ' + innerVariable)
    }
    inner()
}
outer()
/* 闭包 */
// function createCounter(){
//     var count =0;
//     return function(){
//         count++;
//         console.log(count)
//     }
// }
// var counter = createCounter();
// counter();
// counter();
// function outerFunction(outerVariable) {
//     function innerFunction(innerVariable) {
//         console.log(outerVariable,innerVariable,'35**')
//       console.log('outerVariable:', outerVariable);
//       console.log('innerVariable:', innerVariable);
//     }
//     return innerFunction;
//   }

//   var newFunction = outerFunction('outside');
//   newFunction('inside'); // 输出: outerVariable: outside innerVariable: inside
function createCounter() {
    let count = 0;
    return {
        increment: function () {
            count++;
            console.log(count)
        },
        decrement: function () {
            count--;
            console.log(count)
        },
        getCount: function () {
            console.log(count)
            return count;
        }
    };
}

const counter = createCounter();
counter.increment();
counter.increment();
console.log(counter.getCount()); // 输出: 2
/*  构造函数调用this指向新创建的对象 */
function Dog() {
    this.name = 'Puppy'
}
const dog = new Dog()
console.log(dog.name)
/* 构造函数返回对象；1.构造函数的this指向新创建的对象但是构造函数中使用 return 语句返回一个对象，则返回的对象将取代通过构造函数创建的实例 */
const puppet = {
    rules: false
};
function Emperor() {
    this.rules = true;
    return puppet
}
const emperor = new Emperor();
console.log(emperor.rules);

/* 构造函数调用时使用 call 或 apply时候，this的指向就被绑定在创建的对象上面 */
function greet() {
    return `Hello,${this.name}!`;
}
const person = {
    name: "Alice"
}
console.log(greet.call(person))
console.log(greet.apply(person))


/* 箭头函数的上下文；箭头函数没有自己的 this 值，而是捕获了封闭上下文的 this 值 */
const obj = {
    name: "Bob",
    greet: function () {
        const arrowFunc = () => {
            return `Hello,${this.name}:${this.age}`
        }
        return arrowFunc()
    },
    age: 15
}
console.log(obj.greet())
let arrs = [1, 2, 3, 4]
console.log(arrs.join())
console.log(arrs.toString())
console.log(arrs.toLocaleString())
let bb = arrs.reduce((a, b) => {
    a.push(b + 2)
    return a
}, [])
console.log(bb)
let strs = '12345'
console.log(strs.split(''))
/* 构造函数 */
function Person(name) {
    this.name = name
    this.sayHello = function () {
        console.log("2222")
    }
}
const persons = new Person('123')
console.log(persons, '1223')
persons.sayHello()
/* 
对象是一个无序的列表;
数组是一个有序的列表;
对象的数据的欸容是由容器内部的东西所决定的;

 
*/
const objS = {
    a: 1, b: 2
}
console.log(obj.c)
objS.c = 4;
console.log(objS, objS.c)


const objk = {
    a: 1, b: 2,
    /* 隐士属性 *///[[Prototype]]内部属性
    __proto__: Object.prototype//obj的构造器的原型属性
}
/* 
*
*
* __proto__(([[Prototype]]))是对象的隐士属性==>原型对象
* Object.prototype==>构造器定义的原型属性(函数的静态属性)
* 
* __proto__==>Object.prototype(两者不相等)
* __proto__保存对象构造器上的prototype属性的引用(两者是不相等)
* 
* 
* */
// function Test(){
//     this.a=1;
//     this.b=2;
//     this.c=33
// }


// const test = new Test()
// /* 扩展原型属性 */
// Test.prototype.c=3;
// Test.prototype.d=4;

// Object.prototype.e=5;
// Object.prototype.f=6;
// Object.prototype.d=44
// console.log(test)
// console.log(test.f)
// console.log(test.c)
// console.log(test.c)
// console.log(test.d)
/* 
*test=>{
    a:1,
    b:2,
    __proto__:Test.prototype{
        c:3,
        d:4,
        __proto__:Object.prototype{
            e:5,
            f:6
        }
    }
}
原型是原型对象加构造器原型属性
原型链:从对象开始一直找prototype的链条
*
*
*对象的属性是通过构造器的构造实列的过程中
产生的内部数据
*
对象访问属性的扩展是通过原型概念产生的
*
*test.__proto__.__proto__
*
*一个对象可以直接访问其原型链上的任意
属性的形式的方法叫做原型链的继承(节省__proto__)
*
*
*不管访问的是原型链上的那个节点内部属性,
只要对象自身存在,继承查找行为结束
*/




// console.log(Object.prototype)//所有对象的原型链的顶端


function MyObject() { }
const myObject = new MyObject()

// getter setter

Object.defineProperty(MyObject.prototype,
    '__prpoto__',
    {
        get() {
            return null
        },
        set(newValue) {
            if (typeof (newValue) === 'object') {
                throw new TypeError('44444')
            }
        }

    })
MyObject.prototype.__proto__ = 1;
console.log(MyObject.prototype.__proto__)
console.log(myObject)
MyObject.prototype.__proto__ = {}


function sets() { }
console.log(sets)
console.dir(sets.__proto__ === Function.prototype)

/* 
prototype的API
getPrototypeOf




*/

/* function  Taa (){
    this.a=1
}
Taa.prototype.b=2;
const rr = new Taa();
// Taa.__proto__
const taaPrototype=Object.getPrototypeOf(rr)
console.log(taaPrototype)
console.log(taaPrototype===rr.__proto__)
 */

const abc = {
    a: 2,
}
const objbPorto = {
    b: 1
}
Object.setPrototypeOf(abc, objbPorto)
console.log(abc)
const res = Object.prototype.isPrototypeOf(objbPorto)
console.log(res)

const obji = Object.create({
    c: 2, d: 2
}, {
    c: {
        value: "789",
        writable: true,
        configurable: true,
        enumerable: true
    },
    d: {
        value: "9887"
    }
});
obji.c = 300;
console.log(obji)
for (let key in obji) {
    console.log(key)
}

/* ------------------- */

// watcher







