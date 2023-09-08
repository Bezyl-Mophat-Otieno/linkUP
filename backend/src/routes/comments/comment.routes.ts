import { Router } from "express";
import addComment from "../../controllers/comments/addComment.ts";
import deleteComment from "../../controllers/comments/deleteComment.ts";
import fetchComments from "../../controllers/comments/fetchComments.ts";
import updateComment from "../../controllers/comments/updateComment.ts";
import myComments from "../../controllers/comments/myComments.ts";
import postComments from "../../controllers/comments/postComments.ts";
import likeComment from "../../controllers/comments/likeComment.ts";
import commentLikers from "../../controllers/comments/commentLikers.ts";
const commentRouter = Router();

commentRouter.post("/add", addComment);
commentRouter.get("/fetch", fetchComments);
commentRouter.get("/get/:id", myComments);
commentRouter.get("/post/:id", postComments);
commentRouter.put("/update/:id", updateComment);
commentRouter.delete("/delete/:id", deleteComment);
commentRouter.post("/like/:id", likeComment);
commentRouter.get("/likers/:id", commentLikers);

export default commentRouter;
