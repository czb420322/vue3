// /* 面向对象 */
// // function Test(){

// // }
// // // 任何函数都是构造函数
// // // 大驼峰来命名构造函数的名称;
// // Test()
// // const test = new Test()
// // //new 也是函数执行;
// // // new ==>改变函数内部的执行过程==>构造函数
// // // ==>一个新的对象(构造函数构造出来的实例.构造函数的实例化对象/实例化对象)
// // // js任何的对象都是实例化对象;
// // var obj ={}//new Object()
// function Test(a,b){
//     // var obj ={
//     //     a:1
//     // } 
//     // return obj
//     /* 
//     {}
//     this=>{}
//     this.a =1
//     */
//     this.a =a;
//     this.b=b;
//     console.log(this)
// }
// console.log(new Test())
// const test1 = new Test();
// const test2 = new Test();
// console.log(test1==test2)
// // 面向对象==>复用不同

// // 静态方法  js 引用值==>保存属性的功能==>静态属性
// Test.plus =function(){
// console.log(this)
// }
// //js中,原则上,那个调用了函数,函数内部的this就指向该对象
// Test.plus()



// // Test.plus该构造函数的工具函数
// //  Test.prototype==>静态属性==>底层自动增加==>原型属性
// // Test.prototype ={
// //     plus:function(){
// //         // console.log(this,'47***')//Test的实例化对象
// //         return this.a +this.b
// //     }
// // };
// //一般来说,原型属性只扩展用下面的写法
// Test.prototype.plus= function(){
//     return this.a +this.b
// }

// const  test3 = new Test(1,2);
// test3.plus()
// Array.prototype={};
// Function.prototype={}


// 模块化的糖
// class Test{
//     constructor(a,b){
//         this.a = a;
//         this.b =b
//     }
//    /*  plus(){
//         return this.a+this.b
//     } */
//     plus=()=>{
//         return this.a+this.b
//     }
// }
// const test = new Test()

// 父类的方法和数据子类可以直接继承的
class Test {
    constructor(a, b) {
        this.a = a;
        this.b = b;
        this.content =''
    }
    get res(){
return this.content
    }
    set res(val){
this.content = val;
update()
    }
    plus() {
        return this.a + this.b
    }
    static total(a, b, c, d) {
        return a + b + c + d
    }
}
class Test1 extends Test {
    constructor(a, b) {
        super(a, b)
    }
}
const test1= new Test1(1,2);
const res1 = test1.plus()


