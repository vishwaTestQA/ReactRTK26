const outerFn = () => {
    let sum = 0
    return (value) => {
       return sum+=value
    }
}

const res = outerFn()

console.log(res(10))
console.log(res(10))
console.log(res(10))
console.log(res(10))


const counter = () => {
    let count = 0
    return () => {
       return ++count
    }
}

const increment = counter()
console.log(increment())
console.log(increment())
console.log(increment())


function debounce(){
    let timer;
    return (...val) => {
       clearTimeout(timer); 
       timer = setTimeout(() => console.log(...val), 3000)
    }
}

const debounced = debounce()

// debounced('v')
// debounced('i')
// debounced('s')
// debounced('hwa')

const memoize = (fn) => {
    let map = new Map()
    return (...data) => {
       const key = JSON.stringify(data)
       if(map.has(key)){
        return map.get(key)
       }
       console.log('executed')
    //    const res = fn.apply(this, data)
       const res = fn.apply(this, data)
       map.set(key, res)
       return res
    }
}

const memoizeFnc = memoize((a,b) => a*b)

console.log(memoizeFnc(2,3))
console.log(memoizeFnc(2,4))
console.log(memoizeFnc(3,2))
console.log(memoizeFnc(2,3))

function memoizeObjectFn(fn){
    const map = new Map()
   return function(...args){
    const key = JSON.stringify(args)
     if(map.has(key)){
        return map.get(key)
     }
     console.log('memoizeExecuted')
     const res = fn.apply(this, ...args)
     map.set(key, res)
     return res;
   }
}

const memoizeobjFnRes = memoizeObjectFn((a,b) => a+b)
console.log(memoizeobjFnRes(10,20))
console.log(memoizeobjFnRes(20,10))
console.log(memoizeobjFnRes(100,20))
console.log(memoizeobjFnRes(50,20))
console.log(memoizeobjFnRes(50,20))
console.log(memoizeobjFnRes(50,20))


//real time ex

const cart = {
    taxRate: 0.18,
    calculate: memoizeObjectFn(function(value){ 
        return value * this.taxRate
    })
}

console.log("taxwithtotal",cart.calculate(100))


//its like instance of the class (singleTone)
const exeOnce = (fn) => {
    let called = false;
    let result;
    return (...args) => {
       if(called) return result
       called = true;
       result = fn.apply(this, args)
       return result
    }
}

const exeOnceRes = exeOnce(() => Math.random())

console.log(exeOnceRes(100))
console.log(exeOnceRes(1001))
console.log(exeOnceRes(1002))
console.log(exeOnceRes(1003))
