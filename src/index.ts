import * as express from 'express'

const app = express()

app.set('port', process.env.PORT || 3000);

app.get('/', (req, res) => {
  return res.json({
    data: 1
  })
});

app.listen('2333', () => {
  console.log(('  App is running at http://localhost:%d'), app.get('port'))
  console.log('  Press CTRL-C to stop\n')
});