const resultArray = [];
let state = false;

function runner(generator) {

    let data = generator.next();
    let {value, done } = data;
    console.log(`value: ${value}`);
    console.log(`done: ${done}`);

    const executor = (generator, value) => {
      switch (typeof value) {
        case 'function':
          console.log('function');
          const result = value();
          resultArray.push(result);
          data = generator.next(result);
          value = data.value;
          done = data.done;
          break;
        case 'object':
          // if(value instanceof Promise) {
          //   value.resolve(data).then(data => {
          //     value = data;
          //     console.log(`value: ${value}`);
          //   });
          //   console.log('promise');
          //   break;
          // } else {
          console.log('object');
          resultArray.push(value);
          data = generator.next(value);
          value = data.value;
          done = data.done;
          break;
        // }

        default:
          console.log('primitive');
          resultArray.push(value);
          data = generator.next(value);
          value = data.value;
          done = data.done;
      }
      if(state === false) {
        executor(generator, value);
      } else
        return;
    };




  console.log(data);
  // return runner(generator);
}

const sum = (a, b) => a + b;

const prom = new Promise(res => {
  setTimeout(res, 0, 10)
});

function *gen() {
  const a = yield () => sum(1,2);
  const a1 = yield a + 10;
  const b = yield prom;
  const b1 = yield b +1;
  const c = yield {user: 'userName'};
  // console.log(a, a1, b, c);
}
console.log(resultArray);
const g = gen();
runner(g);
console.log(resultArray);