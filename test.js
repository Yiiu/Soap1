var Promise = require('bluebird');
var promisify = require('promisify-any').use(Promise);

let code = promisify((test, abc) => {
  console.log(123123123, test,abc)
  return new Promise((resolve, reject) => {
    return resolve(12312312)
  })
})
code()
  .then(e => console.log(e))