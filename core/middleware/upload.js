import uid from 'uid-safe'
import qn from 'qn'
import config from 'config'

export async function uploadImage (file) {
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
