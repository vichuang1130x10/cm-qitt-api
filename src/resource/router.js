import { Router } from 'express'
import controller from './controller'

const router = Router()
// /api/:id
router.route('/:id').get(controller.fetchCmData)
router.route('/UserDefineDate/:id').get(controller.fetchCmDataByDate)
export default router
