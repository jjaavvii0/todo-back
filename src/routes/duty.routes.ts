import {Router} from 'express'
const router = Router()

import * as dutyCtrl from '../controllers/duty.controller'


router.get('/', dutyCtrl.getDuties)
router.post('/', dutyCtrl.createDuty)
router.delete('/', dutyCtrl.deleteDuty)

export default router