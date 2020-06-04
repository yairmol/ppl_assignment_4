// solutions for 4.1a and 4.2
const fPromise = (x: number): Promise<number> =>
    new Promise((resolve, reject) => {
        if (x === 0)
            reject("cannot divide by 0");
        else 
            resolve(1/x);
    })

const gPromise = (x: number): Promise<number> =>
    new Promise((resolve, reject) => {
        if (x === 1){
            reject("g error");
        } else {
            resolve(x*x);
        }
    })
    
function h (x: number) {
    gPromise(x)
        .then((result) => fPromise(result))
        .then((result) => console.log(result))
        .catch((message) => console.log("error: ", message))
}

const slower = (promises: [Promise<any>, Promise<any>]): Promise<any> => {
    return new Promise((resolve, reject) => {
        // if the first promise finishes first
        promises[0]
            .then((value) => promises[1])
            .then((value) => resolve([1, value]))
            .catch((message) => reject(message))
        // if the second promise finishes first
        promises[1]
            .then((value) => promises[0])
            .then((value) => resolve([0, value]))
            .catch((message) => reject(message))
    })
}

const promise1 = new Promise((resolve, reject) => setTimeout(resolve, 1000, 'one'));
const promise2 = new Promise((resolve, reject) => setTimeout(resolve, 999, 'two'));

slower([promise1, promise2])
    .then((value) => console.log(value))
    .catch((message) => console.log(message));