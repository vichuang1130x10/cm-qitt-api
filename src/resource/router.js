import { Router } from 'express'
import controller from './controller'

const router = Router()
// /api/:id
router.route('/:id').get(controller.fetchCmData)

export default router
