var fns = [];
fns.push(function(next){
    console.log(1);
    next();
});
fns.push(function(next){
    console.log(2);
    next();
});
var index =0;//代表将要执行的函数的索引
function next(){
    if(index < fns.length)//如果当前索引小于数组长度的话就继续
        fns[index++](next);//调用索引对应的函数,并传入next
}
next();