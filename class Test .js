class Test {
    constructor(a, b) {
        this.a = a;
        this.b = b;
        this.c = 3;
        this.d = 4
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
        console.log(Test.total(this.a, this.b, this.c, this.d))
    }
}
const test1 = new Test1(1, 2);
const res1 = test1.plus();
console.log(res1)