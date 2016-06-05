var data = [1,2,3];
var newData = data.map(function(item){
    return '<li>'+item+'</li>';
}).join('');
console.log(data);
console.log(newData);