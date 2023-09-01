import { Router } from "express";
import addPost from "../../controllers/posts/addPost.js";
import fetchAllPosts from "../../controllers/posts/fetchAllPosts.js";
import getPost from "../../controllers/posts/getPost.js";
import myPost from "../../controllers/posts/myPost.js";
import updatePost from "../../controllers/posts/updatePost.js";
import deletePost from "../../controllers/posts/deletePost.js";
const postRouter = Router();



postRouter.post('/add/:id', addPost)
postRouter.get('/fetch', fetchAllPosts)
postRouter.get('/get/:id', getPost)
postRouter.get('/myPost/:id', myPost)
postRouter.put('/update/:id', updatePost)
postRouter.delete('/delete/:id', deletePost)



export default postRouter