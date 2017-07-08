import express from 'express'
import { Photo, User } from 'core/models'
import { isUserLogger, addPhoto } from 'core/middleware'

const router = express.Router()

router
  .use(isUserLogger)
  .get('/photos', async (req, res, next) => {
    try {
      let { type } = req.query
      if (!type) type = 'new'
      let data = await Photo.find()
      res.json(data)
    } catch (error) {
      next(error)
    }
  })
  .post('/photos', addPhoto, async (req, res, next) => {
    try {
      const { user, photoInfo} = req
      if (!req.photoInfo) {
        throw new Error('error_download')
      }
      let photo = await new Photo({ ...photoInfo, user: user._id}).save()
      await User.update({
        _id: user._id
      }, {
        $inc: { photos: 1 }
      })
      res.json(photo)
    } catch (error) {
      next(error)
    }
  })

export default router
