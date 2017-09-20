const config = {
  secret: 'yiiu',
  port: 2333,
  mongodb: {
    host: 'localhost',
    port: 27017,
    db: 'soap',
    username: 'soap',
    pwd: 'soap'
  },
  oauth: {
    github: {
      client_id: 111,
      client_secret: 111
    }
  },
  qn: {
    accessKey: '123123',
    secretKey: '123123',
    bucket: '1',
    origin: 'up.qiniu.com'
  },
  default_avatar: '//cdn.wanan.me/u=3758858261,827265384&fm=28&gp=0.jpg'
}

if (config.mongodb.pwd) {
  config.mongodb.url = `mongodb://${config.mongodb.username}:${config.mongodb.pwd}@${config.mongodb.host}:${config.mongodb.port}/${config.mongodb.db}`
} else {
  config.mongodb.url = `mongodb://${config.mongodb.host}/${config.mongodb.db}`
}

export const mongo = config.mongodb
export default config
