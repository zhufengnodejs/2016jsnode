/**
 * 生成器用于生成一个迭代器
 * 迭代器使用next方法输出里面的元素
 */
/*function buy(books){
    let index = 0;
    return {
        next(){
            let value = books[index++];
            return {
                value:value,
                done:index>books.length
            }
        }
    }
}*/
function* buy(books){
    for(var i=0;i<books.length;i++){
        yield books[i];
    }
}
var iterator = buy(["javascript",'node.js']);
/*var book1 = iterator.next(); // {value:'javascript',done:false}
var book2 = iterator.next(); // {value:'node.js',done:false}
var book3 = iterator.next(); // {value:undefined,done:true}*/
/*var book;
do{
    book = iterator.next();
    console.log(book);
}while(!book.done);*/

//console.log(...iterator);

for(var book of iterator){
    console.log(book);
}