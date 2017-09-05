import qn from 'qn'
import uid from 'uid-safe'
import config from 'config'

export async function uploadQnImage (file) {
  return new Promise(async (resolve, reject) => {
    let client = qn.create(config.qn)
    client.upload(file, {
      key: await uid(18)
    }, (err, result) => {
      if (err) {
        return reject(err)
      }
      return resolve(result)
    })
  })
}
