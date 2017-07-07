import express from 'express'
import { Photo } from 'core/models'
import { isUserLogger } from 'core/middleware'

const router = express.Router()

router
  .get('/photo/all', isUserLogger, async (req, res, next) => {
    try {
      let data = await Photo.find()
      console.log(data)
      res.json(data)
    } catch (error) {
      next(error)
    }
  })

export default router
