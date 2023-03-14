import { Router } from 'express'
import * as postsCtrl from '../controllers/posts.js'
import { decodeUserFromToken } from '../middleware/auth.js'

const router = Router()

/*---------- Public Routes ----------*/
router.get('/', notesCtrl.index)



/*---------- Protected Routes ----------*/
router.use(decodeUserFromToken)


export { router }