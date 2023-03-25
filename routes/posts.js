import { Router } from 'express'
import * as postsCtrl from '../controllers/posts.js'
import { checkAuth, decodeUserFromToken } from '../middleware/auth.js'

const router = Router()

/*---------- Public Routes ----------*/
router.get('/', postsCtrl.index)



/*---------- Protected Routes ----------*/
router.use(decodeUserFromToken)
router.post('/', checkAuth, postsCtrl.create)
router.get('/:id', checkAuth, postsCtrl.show)
router.delete('/:id', checkAuth, postsCtrl.delete)


export { router }