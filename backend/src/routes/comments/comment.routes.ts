import { Router } from "express";
import addComment from "../../controllers/comments/addComment.ts";
import deleteComment from "../../controllers/comments/deleteComment.ts";
import fetchComments from "../../controllers/comments/fetchComments.ts";
import updateComment from "../../controllers/comments/updateComment.ts";
import myComments from "../../controllers/comments/myComments.ts";
import postComments from "../../controllers/comments/postComments.ts";
import likeComment from "../../controllers/comments/likeComment.ts";
import commentLikers from "../../controllers/comments/commentLikers.ts";
import getComment from "../../controllers/comments/getComment.ts";
import addSubComment from "../../controllers/comments/addSubComment.ts";
import getSubComment from "../../controllers/comments/getSubComment.ts";
import dislikeComment from "../../controllers/comments/dislikeComment.ts";
const commentRouter = Router();

commentRouter.post("/add", addComment);
commentRouter.get("/fetch", fetchComments);
commentRouter.get("/get/:id", myComments);
commentRouter.get("/comment/:id", getComment);
commentRouter.post("/subComment", addSubComment);
commentRouter.get("/subComment/:id", getSubComment);
commentRouter.get("/post/:id", postComments);
commentRouter.put("/update/:id", updateComment);
commentRouter.delete("/delete/:id", deleteComment);
commentRouter.post("/like/:id", likeComment);
commentRouter.post("/dislike/:id", dislikeComment);
commentRouter.get("/likers/:id", commentLikers);

export default commentRouter;
