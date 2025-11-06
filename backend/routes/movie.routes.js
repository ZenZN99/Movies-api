import express from "express";
import * as movieController from "../controllers/movie.controller.js";
import { isAuthenticate } from "../middlewares/auth.middleware.js";
import { authenticateAdmin } from "../middlewares/admin.middleware.js";

const movieRouter = express.Router();

movieRouter.get("/", movieController.getAllMovies);
movieRouter.get("/:id", movieController.getMovieById);
movieRouter.post(
  "/",
  isAuthenticate,
  authenticateAdmin,
  movieController.upload.single("image"),
  movieController.createMovie
);
movieRouter.put(
  "/:id",
  isAuthenticate,
  authenticateAdmin,
  movieController.updateMovie
);
movieRouter.delete(
  "/:id",
  isAuthenticate,
  authenticateAdmin,
  movieController.deleteMovie
);
movieRouter.get(
  "/admin/movies",
  isAuthenticate,
  authenticateAdmin,
  movieController.getMovieAdmin
);

movieRouter.post("/like/:id", isAuthenticate, movieController.likedMovie);

export default movieRouter;
