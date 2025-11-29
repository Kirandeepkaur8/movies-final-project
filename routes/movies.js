const express = require("express");
const router = express.Router();
const Movie = require("../models/Movie");

// Middleware to require login
function requireLogin(req, res, next) {
  if (!req.session.user) {
    req.flash("error_msg", "You must be logged in to do this");
    return res.redirect("/users/login");
  }
  next();
}

// =============================
// Add Movie - GET
// =============================
router.get("/add", requireLogin, (req, res) => {
  res.render("movies/add_movie");
});

// =============================
// Add Movie - POST
// =============================
router.post("/add", requireLogin, async (req, res) => {
  try {
    const { name, description, year, genres, rating } = req.body;

    const movie = new Movie({
      name,
      description,
      year,
      genres: genres.split(",").map((g) => g.trim()),
      rating,
      postedBy: req.session.user._id
    });

    await movie.save();
    req.flash("success_msg", "Movie added successfully");
    res.redirect("/");
  } catch (err) {
    console.error(err);
    req.flash("error_msg", "Error adding movie");
    res.redirect("/movies/add");
  }
});

// =============================
// Edit Movie - GET
// =============================
router.get("/edit/:id", requireLogin, async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id).lean();

    if (!movie) {
      req.flash("error_msg", "Movie not found");
      return res.redirect("/");
    }

    if (req.session.user._id.toString() !== movie.postedBy.toString()) {
      req.flash("error_msg", "Not authorized");
      return res.redirect("/");
    }

    res.render("movies/edit_movie", { movie });
  } catch (err) {
    console.error(err);
    req.flash("error_msg", "Error loading movie");
    res.redirect("/");
  }
});

// =============================
// Edit Movie - POST
// =============================
router.post("/edit/:id", requireLogin, async (req, res) => {
  try {
    const { name, description, year, genres, rating } = req.body;

    const movie = await Movie.findById(req.params.id);

    if (!movie) {
      req.flash("error_msg", "Movie not found");
      return res.redirect("/");
    }

    if (req.session.user._id.toString() !== movie.postedBy.toString()) {
      req.flash("error_msg", "Not authorized");
      return res.redirect("/");
    }

    movie.name = name;
    movie.description = description;
    movie.year = year;
    movie.genres = genres.split(",").map((g) => g.trim());
    movie.rating = rating;

    await movie.save();
    req.flash("success_msg", "Movie updated successfully");
    res.redirect("/");
  } catch (err) {
    console.error(err);
    req.flash("error_msg", "Error updating movie");
    res.redirect("/");
  }
});

// =============================
// Delete Movie - POST
// =============================
router.post("/delete/:id", requireLogin, async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);

    if (!movie) {
      req.flash("error_msg", "Movie not found");
      return res.redirect("/");
    }

    if (req.session.user._id.toString() !== movie.postedBy.toString()) {
      req.flash("error_msg", "Not authorized");
      return res.redirect("/");
    }

    await Movie.findByIdAndDelete(req.params.id);
    req.flash("success_msg", "Movie deleted successfully");
    res.redirect("/");
  } catch (err) {
    console.error(err);
    req.flash("error_msg", "Error deleting movie");
    res.redirect("/");
  }
});

module.exports = router;
