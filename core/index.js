import connect from 'core/models'
export default async function Soap () {
  await connect()
  console.log('mongodb数据库准备就绪~')
}
