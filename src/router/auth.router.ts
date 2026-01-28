import { Router } from 'express'
import { login, signup } from '../controllers/auth.controller.js'
import { validateBody, authLoginSchema, authSignupSchema } from '../utils/validation.js'

const router: Router = Router()

router.post('/login', validateBody(authLoginSchema), login)
router.post('/signup', validateBody(authSignupSchema), signup)

export default router
