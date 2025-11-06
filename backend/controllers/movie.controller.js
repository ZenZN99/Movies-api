import Movie from "../models/Movie.js";
import cloudinary from "../utils/cloudinary.js";
import streamifier from "streamifier";
import multer from "multer";

const storage = multer.memoryStorage();
export const upload = multer({ storage });

export async function getAllMovies(req, res) {
  try {
    const movies = await Movie.find().sort({ createdAt: -1 });

    if (!movies || movies.length === 0) {
      return res.status(404).json({ error: "No movies found yet" });
    }

    return res.status(200).json(movies);
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ error: "Error occurred while fetching movies" });
  }
}

export async function getMovieById(req, res) {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(401).json({ error: "Movie ID is required" });
    }
    const movie = await Movie.findById(id);
    if (!movie) {
      return res.status(404).json({ error: "Movie not found" });
    }
    return res.status(200).json(movie);
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ error: "Error occurred while fetching the movie" });
  }
}

export async function createMovie(req, res) {
  try {
    const { title, content, director, date, genre } = req.body;
    if (!title || !content || !director || !date || !genre) {
      return res.status(401).json({ error: "All fields are required" });
    }

    if (!req.file) {
      return res.status(401).json({ error: "Image is required" });
    }

    const userId = req.user._id;

    const result = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: "movies" },
        (error, result) => {
          if (error) return reject(error);
          else resolve(result);
        }
      );
      streamifier.createReadStream(req.file.buffer).pipe(stream);
    });

    const movie = await Movie.create({
      title,
      content,
      image: result.secure_url,
      director,
      date,
      genre,
      likes: 0,
      likedBy: [],
      userId,
    });

    await movie.save();

    return res
      .status(201)
      .json({ success: "Movie created successfully", movie });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ error: "Error occurred while creating the movie" });
  }
}

export async function updateMovie(req, res) {
  try {
    const { id } = req.params;
    const user = req.user;
    if (!id) {
      return res.status(401).json({ error: "Movie ID is required" });
    }

    if (!user) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const { title, content, director, date, genre } = req.body;
    if (!title || !content || !director || !date || !genre) {
      return res.status(401).json({ error: "All fields are required" });
    }

    const movie = await Movie.findByIdAndUpdate(
      { _id: id, userId: user._id },
      { title, content, director, date, genre },
      { new: true }
    );

    if (!movie) {
      return res.status(404).json({ error: "Movie not found" });
    }
    return res
      .status(200)
      .json({ success: "Movie updated successfully", movie });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ error: "Error occurred while updating the movie" });
  }
}

export async function deleteMovie(req, res) {
  try {
    const { id } = req.params;
    const user = req.user;
    if (!id) {
      return res.status(401).json({ error: "Movie ID is required" });
    }

    if (!user) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const movie = await Movie.findByIdAndDelete(
      { _id: id, userId: user._id },
      { new: true }
    );

    if (!movie) {
      return res.status(404).json({ error: "Movie not found" });
    }

    return res
      .status(200)
      .json({ success: "Movie deleted successfully", movie });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ error: "Error occurred while deleting the movie" });
  }
}

export async function getMovieAdmin(req, res) {
  try {
    const user = req.user;
    if (!user) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const movies = await Movie.find({ userId: user._id }).sort({
      createdAt: -1,
    });
    if (!movies || movies.length === 0) {
      return res.status(404).json({ error: "No movies found yet" });
    }

    return res.status(200).json(movies);
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ error: "Error occurred while fetching admin movies" });
  }
}

export async function likedMovie(req, res) {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(401).json({ error: "Movie ID is required" });
    }

    const userId = req.user._id;
    const movie = await Movie.findById(id);

    if (!movie) {
      return res.status(404).json({ error: "Movie not found" });
    }

    const hasLiked = movie.likedBy.some(
      (likedId) => likedId.toString() === userId.toString()
    );

    if (hasLiked) {
      movie.likes = Math.max(0, movie.likes - 1);
      movie.likedBy = movie.likedBy.filter(
        (likedId) => likedId.toString() !== userId.toString()
      );
    } else {
      movie.likes += 1;
      movie.likedBy.push(userId);
    }

    await movie.save();

    return res.status(200).json({
      success: hasLiked ? "Like removed" : "Movie liked successfully",
      likes: movie.likes,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Server error" });
  }
}
