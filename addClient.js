const prompts = require('prompts');

const connect = require('./build/src/model/index').default
const { Client } = require('./build/src/model/index')
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
    type: 'multiselect',
    name: 'grants',
    message: 'grants',
    choices: [
      { title: 'password', value: 'password' },
      { title: 'refresh_token', value: 'refresh_token' },
      { title: 'client_credentials', value: 'client_credentials' },
      { title: 'authorization_code', value: 'authorization_code' }
    ],
    initial: 0
  },
  {
    name: 'client_id',
    message: 'client_id',
    type: 'text'
  }
]

let a = async () => {
  console.log('添加一个认证客户端~')
  let d = {}
  let error = null
  for (let i of data) {
    let result = await prompts(i)
    if (!result[i.name] && !error) {
      error = i.name
    }
    d[i.name] = result[i.name]
  }
  if (!error) {
    console.log('添加中...')
    await connect()
    let clients = await Client.create(d)
    console.log('添加成功!\n', clients)
    process.exit(1)
  } else {
    console.log(`警告！${error}是必填`)
    process.exit(1)
  }
}

a()
