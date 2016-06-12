/**
 * person.find().skip(3).limit(3).sort({age:-1});
 */
var person = {
    documents: [
        {age: 1}, {age: 2}, {age: 3}, {age: 4}, {age: 5}, {age: 6}, {age: 7}, {age: 8}, {age: 9}, {age: 10}
    ],
    skip(skip){
        person.skip = skip;
        return person;
    },

    limit(limit){
        person.limit = limit;
        return person;
    },

    sort(sort){
        person.sort = sort;
        return person;
    },

    find(){
        process.nextTick(function(){
            console.log(person.documents.sort(person.sort).slice(person.skip,person.limit+person.skip));
        });

        return person;
    }
}

person.skip(3).limit(3).find().sort(function(a,b){
    return  b.age - a.age;
});
