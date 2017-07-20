import express from 'express'
import { Photo, User } from 'core/models'
import { isAuthenticated, addPhoto } from 'core/middleware'
import { ApiError } from 'core/util'

const router = express.Router()

router
  .use(isAuthenticated)
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
      if (!photoInfo) {
        throw new ApiError(400, 'error_download')
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
