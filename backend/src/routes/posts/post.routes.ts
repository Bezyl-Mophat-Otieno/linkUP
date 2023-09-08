import { Router } from "express";
import addPost from "../../controllers/posts/addPost.ts";
import fetchAllPosts from "../../controllers/posts/fetchAllPosts.ts";
import getPost from "../../controllers/posts/getPost.ts";
import myPost from "../../controllers/posts/myPost.ts";
import updatePost from "../../controllers/posts/updatePost.ts";
import deletePost from "../../controllers/posts/deletePost.ts";
const postRouter = Router();

postRouter.post("/add/:id", addPost);
postRouter.get("/fetch", fetchAllPosts);
postRouter.get("/get/:id", getPost);
postRouter.get("/myPost/:id", myPost);
postRouter.put("/update/:id", updatePost);
postRouter.delete("/delete/:id", deletePost);

export default postRouter;
