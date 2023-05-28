const bcrypt = require("bcrypt");
const userModel = require("../model/userModel");

exports.userSignUp = async (req, res) => {
  console.log("JJ");
  let { name, email, password } = req.body;
  try {
    userModel.findOne({ email: email }).then(async (result) => {
      if (result) {
        res.status(401).json({ message: "Email already registered" });
      } else {
        password = await bcrypt.hash(password, 10);
        const details = {
          name,
          email,
          password,
        };
        userModel.create(details).then((data) => {
          res.status(201).json({ message: "USER SIGNED UP", data: data });
          console.log(data);
        });
      }
    });
  } catch (error) {}
};
