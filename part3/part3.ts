// solutions for 3.1 and 3.2

function* gen1() {
    yield 1;
    yield 3;
    yield 5;
    // yield 7;
    // yield 9;
    // yield 11;
    // yield 13;
}
function* gen2() {
    yield 2;
    yield 4;
    yield 6;
    yield 8;
    yield 10;
}

function* take (n: number , generator: Generator){
    for(let v of generator){
        if(n <= 0){
            return;
        }
        n--;
        yield v;
    }
}

function* braid(generator1: () => Generator, generator2: () => Generator){
    const g1 = generator1();
    const g2 = generator2();
    let val1 = g1.next();
    let val2 = g2.next();
    while(!val1.done || !val2.done){
        if(!val1.done){
            yield val1.value;
        }
        if(!val2.done){
            yield val2.value;
        }
        val1 = g1.next();
        val2 = g2.next();
    }
}

function* biased(generator1: () => Generator, generator2: () => Generator){
    const g1 = generator1();
    const g2 = generator2();
    let val1 = g1.next();
    let val2 = g2.next();
    while(!val1.done || !val2.done){
        if(!val1.done){
            yield val1.value;
            val1 = g1.next();
            if(!val1.done){
                yield val1.value;
            }
        }
        if(!val2.done){
            yield val2.value;
        }
        val1 = g1.next();
        val2 = g2.next();
    }
}


for (let n of take(10, braid(gen1,gen2))) {
    //console.log(n);
    process.stdout.write(n + " ");
}
console.log("");
for (let n of take(10, biased(gen1,gen2))) {
    //console.log(n);
    process.stdout.write(n + " ");
}
    