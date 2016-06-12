var document = {
    cookies:[],
    get cookie(){
        return this.cookies.join('; ');
    },
    set cookie(cookie){//name=zfpx
        //分割传入的参数 ['name','zfpx']
        var params = cookie.split('=');
        //循环原数组
        for(var i=0;i<document.cookies.length;i++){
            var vals = document.cookies[i].split('=');//['name','zfpx']
            //如果当前匹配到的元素的key和 传入的参数key相同
            if(vals[0] == params[0]){
                //那么则用参数里的字符串替换原来的元素
                document.cookies.splice(i,1,cookie);
                return;
            }
        }
        //如果没有匹配到元素的话就追加一个元素
        this.cookies.push(cookie);
    }
}
//赋值时会调用 set cookie
document.cookie = 'name=zfpx';
document.cookie = 'name=zfpx2';
document.cookie = 'age=8';
//取值的时候会调用get cookie
console.log(document.cookie);