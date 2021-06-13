const express = require("express");
const app = express();
const morgan = require("morgan");
const mongoose = require("mongoose");
const blogRoutes = require("./routes/blogRoutes");

//connect to MongoDB
const dbURI =
  "mongodb+srv://vasan2001:Vasan212001@cluster0.fpfy4.mongodb.net/node-tuts?retryWrites=true&w=majority";
mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(3030))
  .catch((err) => console.log(err));

//register view engine
//they look into views folder by default
app.set("view engine", "ejs");
//in case of different folder
//app.set('views','dir_name');

//middleware && static files
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

//use does not know what to do next
app.use((req, res, next) => {
  console.log("new request made:");
  console.log("host: ", req.hostname);
  console.log("path: ", req.path);
  console.log("method: ", req.method);
  next();
});
app.use((req, res, next) => {
  console.log("in the next middleware");
  next();
});

//routes
app.get("/", (req, res) => {
  //res.send('<p>Home page</p>');
  res.redirect("/blogs");
});

app.get("/about", (req, res) => {
  //res.send('<p>About page</p>');
  res.render("about", { title: "About" });
});

//blog routes
//starts from the path /
//app.use(blogRoutes);

//starts url from /blogs
app.use("/blogs", blogRoutes);

//404(goes thru each handler and then executes this if theres not a proper match)
app.use((req, res) => {
  res.status(404).render("404", { title: "Error" });
});
//position of app.use is very important(like default in switch case)
