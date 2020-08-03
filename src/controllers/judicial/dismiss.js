const { dismiss } = require("../../models");
const jwt = require("jsonwebtoken");

module.exports = {
  get: (req, res) => {
    let token = req.cookies.token;
    if (!token) {
      res.status(401).json({ message: "need user session" }).end();
    } else {
      let userId = jwt.verify(token, process.env.JWT_SECRET).id;

      let keyword = req.query.keyword;

      dismiss
        .findAll({
          where: {
            keyword: keyword,
            user_id: userId,
          },
        })
        .then((data) => {
          res.status(200).send(data).end();
        })
        .catch((error) => {
          console.log(error);
          res
            .status(404)
            .json({ message: "not found dismissed judicate" })
            .end();
        });
    }
  },
};
