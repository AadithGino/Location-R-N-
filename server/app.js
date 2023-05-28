const express = require("express");
const app = express();
const loginRoutes = require("./routes/Login");
const SignUpRoutes = require("./routes/SignUp");
const { default: mongoose } = require("mongoose");

mongoose.connect("mongodb+srv://aadith:9744052977@cluster0.d5plxiy.mongodb.net/?retryWrites=true&w=majority")

app.use(express.json())
app.use("/", loginRoutes);
app.use("/", SignUpRoutes);

app.listen(5000, () => {
  console.log("SERVER RUNNING ON PORT   5000");
});
