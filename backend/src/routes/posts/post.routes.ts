import { Router } from "express";
import addPost from "../../controllers/posts/addPost.ts";
import fetchAllPosts from "../../controllers/posts/fetchAllPosts.ts";
import getPost from "../../controllers/posts/getPost.ts";
import myPost from "../../controllers/posts/myPost.ts";
import updatePost from "../../controllers/posts/updatePost.ts";
import deletePost from "../../controllers/posts/deletePost.ts";
import fetchFollowedPosts from "../../controllers/posts/fetchFollowedPosts.ts";
import likePost from "../../controllers/posts/likePost.ts";
import postLikers from "../../controllers/posts/postLikers.ts";
import dislikePost from "../../controllers/posts/dislikePost.ts";
const postRouter = Router();

postRouter.post("/add/:id", addPost);
postRouter.get("/fetch", fetchAllPosts);
postRouter.get("/fetch/followed/:id", fetchFollowedPosts);
postRouter.get("/get/:id", getPost);
postRouter.get("/myPost/:id", myPost);
postRouter.put("/update/:id", updatePost);
postRouter.delete("/delete/:id", deletePost);
postRouter.post("/like/:id", likePost);
postRouter.post("/dislike/:id", dislikePost);
postRouter.get("/likers/:id", postLikers);

export default postRouter;
