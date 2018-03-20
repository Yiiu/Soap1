import * as qiniu from 'qiniu'

import config from '../config'

export function qiniuUpload () {
  const mac = new qiniu.auth.digest.Mac(config.qn.accessKey, config.qn.secretKey);
  const qiniuConfig = {
    scope: config.qn.bucket
  };
  const uploadConfig = new qiniu.conf.Config() as any
  uploadConfig.zone = qiniu.zone.Zone_z0
  const formUploader = new qiniu.form_up.FormUploader(uploadConfig);
  const putPolicy = new qiniu.rs.PutPolicy(qiniuConfig);
  const putExtra = new qiniu.form_up.PutExtra();
  const uploadToken = putPolicy.uploadToken(mac);

  return (req, res, next) => {
    if (req.file) {
      const { file } = req
      formUploader.putFile(uploadToken, file.filename, file.path, putExtra, (respErr, respBody, respInfo) => {
        if (respErr) {
          next(respErr)
        }
        if (respInfo.statusCode === 200) {
          req.file = {
            ...req.file,
            ...respBody
          }
          console.log(req.file)
          next()
        } else {
          next(respInfo)
        }
      });
    } else {
      next('no_file')
    }
  }
  console.log(123123)
}