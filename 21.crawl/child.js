//console.log(process.execPath);
//console.log(process.argv);

//console.log(Object.prototype.toString.call(process.argv));

var args = process.argv.slice(2);
var result = args.reduce((curr,next)=> curr+Number(next),0);
console.log(result);
setTimeout(function(){
    console.log(result);
},3000)
