const a = () => {
const b = 1
const c = 3

if (b<0) {
    console.log("first true")
} else if (b===10) {
    console.log("secondtrue")
} else if (b>c) {
    console.log("third true")
}
else {
    console.log("last else")
}
console.log("below last else")
}
a()


// const task = function(taskNum, seconds, negativeScenario) {
//     return new Promise((resolve, reject) => {
//       setTimeout(_ => {
//         if (negativeScenario)
//           reject(new Error('Task ' + taskNum + ' failed!'));
//         else
//           resolve('Task ' + taskNum + ' succeed!');
//       }, seconds * 1000)
//     });
//   };
  
// const run = async function() {
//     // tasks run immediately in parallel and wait for both results
//     let [r1, r2] = await Promise.all([
//       task(1, 5, false),
//       task(2, 5, false)
//     ]);
//     console.log(r1 + ' ' + r2);
//   };
//   run();







