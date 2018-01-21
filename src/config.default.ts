export interface MongodbConfig {
  host: string
  port: 27017
  db: string
  username: string
  pwd: string
  url: string
}

export interface Config {
  secret: string
  port: number
  mongodb: MongodbConfig
}

const config: Config = {
  mongodb: {
    host: 'localhost',
    port: 27017,
    db: 'soap',
    username: 'soap',
    pwd: 'soap',
    url: ''
  },
  secret: 'yiiu',
  port: 2333
}
const localhost = `mongodb://${config.mongodb.username}:${config.mongodb.pwd}@${config.mongodb.host}`

if (config.mongodb.pwd) {
  config.mongodb.url = `${localhost}:${config.mongodb.port}/${config.mongodb.db}`
} else {
  config.mongodb.url = `mongodb://${config.mongodb.host}/${config.mongodb.db}`
}

export default config
