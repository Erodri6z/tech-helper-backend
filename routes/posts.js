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
router.put('/:id', checkAuth, postsCtrl.edit)
router.post('/:id', checkAuth, postsCtrl.createComment)
router.delete('/:id/:commentId', checkAuth, postsCtrl.deleteComment)


export { router }