const { dismiss } = require("../../models");

module.exports = {
  get: (req, res) => {
    let token = req.cookies.token;
    if (!token) {
      res.status(401).json({ message: "need user session" }).end();
    } else {
      let keyword = req.query.keyword;

      dismiss
        .findAll({
          where: {
            keyword: keyword,
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
