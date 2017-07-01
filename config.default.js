const config = {
  secret: 'yiiu',
  port: 2333,
  mongodb: {
    host: 'localhost',
    port: 27017,
    db: 'fishy',
    username: 'fishy',
    pwd: 'fishy'
  },
  oauth: {
    github: {
      client_id: 111,
      client_secret: 111
    }
  }
}
export const mongo = config.mongodb
export default config
