import {Router} from 'express'
import addComment from '../../controllers/comments/addComment.js' 
import deleteComment from '../../controllers/comments/deleteComment.js'
import fetchComments from '../../controllers/comments/fetchComments.js'
import updateComment from '../../controllers/comments/updateComment.js'
import myComments from '../../controllers/comments/myComments.js'
import postComments from '../../controllers/comments/postComments.js'
import likeComment from '../../controllers/comments/likeComment.js'
import commentLikers from '../../controllers/comments/commentLikers.js'
const commentRouter = Router()


commentRouter.post('/add', addComment )
commentRouter.get('/fetch',fetchComments )
commentRouter.get('/get/:id',myComments)
commentRouter.get('/post/:id', postComments )
commentRouter.put('/update/:id',updateComment )
commentRouter.delete('/delete/:id',deleteComment )
commentRouter.post('/like/:id',likeComment )
commentRouter.get('/likers/:id',commentLikers )





export default commentRouter