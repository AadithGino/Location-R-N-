const userModel = require("../model/userModel");
const bcrypt = require("bcrypt");

exports.userLogin = async (req, res) => {
  console.log("JJ");
  try {
    userModel.findOne({ email: req.body.email }).then((result) => {

      console.log(result);
      if (result) {
        bcrypt.compare(
          req.body.password,
          result.password,
          function (err, data) {
            if (data) {
            res.status(200).json(result);
            } else {
              res.status(401).json({ message: "Invalid password" });
            }
          }
        );
      } else {
        res.status(401).json({ message: "Email is not registered" });
      }
    });
  } catch (error) {}
};


exports.test = (req,res)=>{
  res.json({poda:"podaa"})
}