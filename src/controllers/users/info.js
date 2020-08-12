const { users } = require("../../models");

const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = {
  get: (req, res) => {
    let token = req.cookies.token;
    let secret = process.env.JWT_SECRET;

    if (token) {
      let decoded = jwt.verify(token, secret);
      users.findOne({ where: { id: decoded.id } }).then((user) => {
        if (user === null) {
          res.status(204).json({ message: "empty" });
        } else {
          res.status(200).send({
            id: user.dataValues.id,
            username: user.dataValues.username,
            email: user.dataValues.email,
          });
        }
      });
    } else {
      res.status(401).json({ message: "need user session" });
    }
  },
  put: (req, res) => {
    let token = req.cookies.token;
    if (!token) {
      res.status(401).json({ message: "need user session" });
    } else {
      let userId = jwt.verify(token, process.env.JWT_SECRET).id;

      let username = req.body.username;
      users
        .findOne({
          where: { id: userId },
        })
        .then((data) => {
          if (data) {
            users
              .update(
                {
                  username: username,
                },
                {
                  where: { id: userId },
                }
              )
              .then(() => {
                res.status(200).json({ message: "Success" }).end();
              });
          } else {
            res.status(404).json({ message: "Update Error" }).end();
          }
        });
    }
  },
};
