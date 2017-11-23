import * as express from 'express'
import * as mongodb from 'mongodb'

const app = express()

const url = 'mongodb://soap:soap@localhost:27017/soap'

app.set('port', process.env.PORT || 3000)

app.get('/', (req, res) => {
  return res.json({
    data: 1
  })
})

mongodb.MongoClient.connect(url, () => {
  console.log(123123)
})

app.listen(app.get('port'), () => {
  console.log(('  App is running at http://localhost:%d'), app.get('port'))
  console.log('  Press CTRL-C to stop\n')
})
