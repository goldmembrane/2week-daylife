const { users } = require("../../models");
const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = {
  post: (req, res) => {
    const { email, password } = req.body;
    console.log(email, password);

    users
      .findOne({ where: { email } })
      .then((user) => {
        if (user) {
          if (user.dataValues.password === password) {
            let payload = { id: user.id };
            let secret = process.env.JWT_SECRET;
            jwt.sign(payload, secret, { expiresIn: "30m" }, (err, token) => {
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
          res.status(404).json({ message: "unvalid user" });
        }
      })
      .catch((error) => {
        console.log(error);
        res.status(500).send(error);
      });
  },
};
