import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./utils/db.js";
import userRouter from "./routes/user.routes.js";
import { createDefaultAdmin } from "./utils/admin.js";
import movieRouter from "./routes/movie.routes.js";
dotenv.config();
const app = express();
const port = process.env.PORT || 3000;
connectDB()
  .then(() => {
    createDefaultAdmin();
  })
  .catch((e) => console.log(e));

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use("/api/auth", userRouter);
app.use("/api/movie", movieRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${3000}`);
});
