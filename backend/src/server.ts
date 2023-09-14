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
import { Server, Socket } from "socket.io";
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

// app.use("/", (req: Request, res: Response) => {
//   res.send("Server is running successfully");
// });
const server = app.listen(PORT, async () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
  await dbConnection();
});

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket: Socket) => {
  console.log(`a user with connection id ${socket.id} connected`);
  // connected user
  socket.on("user-connected", (data) => {
    const socket_id = socket.id;
    const room = data.user_id;
    const username = data.username;
    socket.join(room);
    socket.to(room).emit("user-connected", { username, socket_id });
  });
  socket.on("typing", (data) => {
    const room = data.user_id;
    const username = data.username;
    socket.to(room).emit("typing", username);
  });

  // send message
  socket.on("disconnect", () => {
    console.log(`user with connection id ${socket.id} disconnected`);
  });

  socket.on("message", (data) => {
    const room = data.user_id;
    const username = data.username;
    const message = data.message;
    const socket_id = socket.id;
    io.to(room).emit("message", { username, message, socket_id });
  });
});
