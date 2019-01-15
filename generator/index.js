function runner(generator) {
  const resultArray = [];

  return new Promise(resolve => {
    function execute(generator, yieldValue = null) {
      let next = generator.next(yieldValue);

      if (!next.done) {
        if(typeof next.value === 'function') {
          const result = next.value();
          resultArray.push(result);
          execute(generator, result);
        } else if (next.value instanceof Promise) {
          next.value.then(
            data => {
              execute(generator, data);
            },
            err => {
              console.log(err);
            }
          );
        } else {
          const result = next.value;
          resultArray.push(result);
          execute(generator, result);
        }
      } else {
        resolve(resultArray);
      }
    }

    execute(generator);
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

