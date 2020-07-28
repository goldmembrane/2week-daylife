const { users } = require("../../models");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = {
  post: (req, res) => {
    const { email, password } = req.body;
    console.log(email, password);
    const hashedPassword = (password) => {
      return crypto
        .createHmac("sha1", "AAASUL")
        .update(password)
        .digest("base64");
    };

    users
      .findOne({ where: { email: email } })
      .then((user) => {
        if (user) {
          if (user.dataValues.password === hashedPassword(password)) {
            let payload = { id: user.id };
            let secret = process.env.JWT_SECRET;
            jwt.sign(payload, secret, { expiresIn: "50m" }, (err, token) => {
              if (err) {
                console.log(err);
                res.status(500).send(err);
              } else {
                res.cookie("token", token);
                res.json({ id: user.dataValues.id });
              }
            });
          }
        } else {
          res.status(404).json({ message: "unvalid user." });
        }
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send(err);
      });
  },
};
