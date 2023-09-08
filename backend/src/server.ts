import express from "express";
import { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { dbConnection } from "./config/db.ts";
import userRouter from "./routes/users/user.routes.ts";
import productRouter from "./routes/products/product.routes.ts";
import postRouter from "./routes/posts/post.routes.ts";
import commentRouter from "./routes/comments/comment.routes.ts";
import followerRouter from "./routes/followers/followers.routes.ts";
dotenv.config();
const app = express();
const PORT: string = process.env.PORT || "5000";
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/users", userRouter);
app.use("/api/v1/products", productRouter);
app.use("/api/v1/posts", postRouter);
app.use("/api/v1/comments", commentRouter);
app.use("/api/v1/followers", followerRouter);

app.use("/", (req: Request, res: Response) => {
  res.send("Server is running successfully");
});
app.listen(PORT, async () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
  await dbConnection();
});
