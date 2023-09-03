export  default function Watcher (){
this.collection =[];
this.cb = null
}
Watcher.prototype.set = function(collection,callback){
this.collection= collection;
this.cb =callback
}
Watcher.prototype.update= function(preValue,currentVlaue){
this.collection.forEach(element => {
    element.innerText = currentVlaue
});
this.cb(preValue,currentValue)
}


/*
function Watcher(){
    this.collection = null;
    this.cb = null
}

new Watcher()

return this


Watcher.prototype



*/


/* class构造函数书写 */
export default  class Watcher{
    constructor(){
        this.collection =null;
        this.cb =null
    }
    set(){
        this.collection = collection;
        this.cb = callback
    }
    update(preValue,currentValue){
        this.collection.forEach(element => {
            element.innerText= currentValue
        });
        this.cb(preValue,currentValue)
    }

}