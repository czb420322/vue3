//判断数据类型
function dataType(obj){
    let type= typeof obj;
    if(type!=="object"){
        return type
    }
    return Object.prototype.toString.call(obj).replace(/^\[object(\S+)\]$/,"$1")
}
console.log(dataType([]));