function runner(generator) {
  const resultArray = [];

  function execute(generator, yieldValue) {
    let next = generator.next(yieldValue);

    if (!next.done) {
      if(typeof next.value === 'function') {
        const result = next.value();
        resultArray.push(result);
        execute(generator, result);
      }
      else if (next.value instanceof Promise) {
        next.value.then(
          data => {
            resultArray.push(data);
            execute(generator, data);
          },
          err => {
            console.log(err);
          }
        );

      }
      else {
        const result = next.value;
        resultArray.push(result);
        execute(generator, result);
      }
    } else {
      return;
    }
  }
  execute(generator);
  console.log(resultArray);
}

//     let data = generator.next();
//     let { value, done } = data;
//     console.log(`value: ${value}`);
//     console.log(`done: ${done}`);
//
//     const executor = (generator, value) => {
//       console.log('-----')
//       resultArray.push(value);
//       switch (typeof value) {
//         case 'function':
//           console.log('function');
//           const result = value();
//           resultArray.push(result);
//           data = generator.next(result);
//           value = data.value;
//           done = data.done;
//           executor(generator, value);
//           break;
//         case 'object':
//           if(value instanceof Promise) {
//             value.then(data => {
//               value = data;
//               console.log(`value: ${value}`);
//             });
//             executor(generator, value);
//             break;
//           } else {
//           console.log('object');
//           resultArray.push(value);
//           data = generator.next(value);
//           value = data.value;
//           done = data.done;
//           executor(generator, value);
//           break;
//         }
//
//         default:
//           console.log('primitive');
//           resultArray.push(value);
//           data = generator.next(value);
//           value = data.value;
//           done = data.done;
//           executor(generator, value);
//       }
//
//       if (!done) {
//         value.then(
//           result => execute(generator, result),
//           err => generator.throw(err)
//         );
//
//         return;
//     };
//
//
//
//
//   console.log(data);
//   // return runner(generator);
// }

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
const g = gen();
runner(g);