const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const flash = require("connect-flash");
const path = require("path");

const app = express();

// =============================
// CONNECT TO MONGO
// =============================
async function connectDB() {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/moviesapp");
    console.log("✅ MongoDB Connected Successfully");
  } catch (err) {
    console.error("❌ MongoDB Connection FAILED", err);
    process.exit(1);
  }
}
connectDB();

// =============================
// MIDDLEWARE
// =============================
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Express session
app.use(
  session({
    secret: "secret-key",
    resave: false,
    saveUninitialized: true,
  })
);

// Flash messages
app.use(flash());

// Set Pug as view engine
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

// Static folder
app.use(express.static(path.join(__dirname, "public")));

// Flash message middleware + make user available in templates
app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  res.locals.user = req.session.user || null;
  next();
});

// =============================
// ROUTES
// =============================
const Movie = require("./models/Movie");

// Home page - list all movies
app.get("/", async (req, res) => {
  try {
    const movies = await Movie.find().populate("postedBy").lean();
    res.render("index", { movies, user: req.session.user });
  } catch (err) {
    console.error("Error fetching movies:", err);
    res.render("index", { movies: [], user: req.session.user });
  }
});

// Movies routes
const moviesRouter = require("./routes/movies");
app.use("/movies", moviesRouter);

// Users routes
const usersRouter = require("./routes/users");
app.use("/users", usersRouter);

// =============================
// START SERVER
// =============================
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
