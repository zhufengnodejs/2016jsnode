var async = require('async');

var persons = [{id:1},{id:2},{id:3}];
console.time('cost');
/*async.forEach(persons,function(person,callback){
    setTimeout(function(){
        person.name = 'zfpx'+person.id;
        callback();
    },1000);
},function(){
    console.log(persons);
 console.timeEnd('cost');
})
console.time('cost');*/

async.eachSeries(persons,function(person,callback){
    setTimeout(function(){
        person.name = 'zfpx'+person.id;
        callback();
    },1000);
},function(){
    console.log(persons);
    console.timeEnd('cost');
})
