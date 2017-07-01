import connect from './models'
export default async function Soap () {
  await connect()
  console.log('mongodb数据库准备就绪~')
}
