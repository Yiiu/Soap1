import app from './src';

process.on('SIGINT', () => {
  console.log('bye~')
  process.exit()
})

app()
