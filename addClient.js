const prompts = require('prompts');
let data = [
  {
    name: 'client_name',
    message: 'client_name',
    type: 'text'
  },
  {
    name: 'client_secret',
    message: 'client_secret',
    type: 'text'
  },
  {
    name: 'client_id',
    message: 'client_id',
    type: 'text'
  },
  {
    type: 'multiselect',
    name: 'grants',
    message: 'grants',
    choices: [
      { title: 'password', value: 'password' }
    ],
    initial: 1
  }
]

let a = async () => {
  let d = {}
  for (let i of data) {
    let result = await prompts(i)
    d[i.name] = result[i.name]
  }
  console.log(d)
}

a()
