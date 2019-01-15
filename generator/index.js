function runner(iterator) {
  const resultArray = [];

  return new Promise((res, rej) => {
      function executor(previousValue) {
        const { value, done } = iterator.next(previousValue);

        if(done) {
          res(resultArray);
        }
        else if (value instanceof Promise){
          value.then(
            data => executor(data),
            err => rej(err)
          );
        }
        else if (typeof value === 'function') {
          const result = value();
          resultArray.push(result);
          executor(result);
        }
        else {
          resultArray.push(value);
          executor(value);
        }
      }

      executor();
    })
}

function sum() {
  console.log(1);
  return [].reduce.call(arguments, (acc, el) => acc+=el);
}

const prom = x => new Promise(res => {
  console.log(2);
  setTimeout(res,2000,x);
});

function pow() {
  console.log(3);
  return [].reduce.call(arguments, (acc, el) => acc*=el);
}

const arr = [1,2,3,4];

function *gen() {
  const a = yield sum.bind(null, ...arr);
  const b = yield prom(a);
  const c = yield pow.bind(null, ...arr);
  const d = yield arr;
  yield a + b + c + d;
}

runner(gen()).then(data => console.log(data.pop() === '441,2,3,4' ? "Good Job" : "You are fail this task"))
