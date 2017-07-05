import express from 'express'
import api from './api'
import upload from './upload'

const router = express.Router()
router.use('/api', api)
router.use('/upload', upload)

export default router
