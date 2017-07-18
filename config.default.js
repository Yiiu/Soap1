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
  }
}
export const mongo = config.mongodb
export default config
