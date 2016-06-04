// a c b
console.log('a');
process.nextTick(function(){
    console.log('b');
})
console.log('c');