var fns = [];
fns.push(function(next){console.log(1);next('rr');});
fns.push(function(next){console.log(2);next();});
fns.push(function(err,next){console.error('wrong',err)});
var index =0;//代表将要执行的函数的索引
function next(error){
    if(index < fns.length){//如果当前索引小于数组长度的话就继续
        var fn = fns[index++];//取出此函数
        if(error){//如果error有值，表示出错了
            if(fn.length==2){
                fn(error);
            }else{
                next(error);
            }
        }else{
            if(fn.length==1)
                fn(next);//调用索引对应的函数,并传入next
        }

    }
}
next();