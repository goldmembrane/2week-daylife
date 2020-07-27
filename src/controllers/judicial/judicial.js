const { keyword } = require("../../models");
const request = require("request");
const jwt = require("jsonwebtoken");

module.exports = {
  post: (req, res) => {
    let token = req.cookies.token;
    if (!token) {
      res.status(401).json({ message: "need user session" }).end();
    } else {
      let keywords = req.body.keyword;
      let userId = jwt.verify(token, process.env.JWT_SECRET).id;

      const url = `http://www.law.go.kr/DRF/lawSearch.do?OC=${process.env.API_KEY}`;
      const targetParams = `target=prec`;
      const keywordParams = `query=${keywords}`;
      const displayParams = `display=max`;

      var judicate = request(
        {
          url:
            url +
            "&" +
            targetParams +
            "&" +
            keywordParams +
            "&" +
            displayParams,
          method: "POST",
        },
        function (error, response, body) {
          if (!error && response.statusCode === 200) {
            console.log(body);
          }
        }
      );
      keyword
        .create({
          keyword: keywords,
          user_id: userId,
          judicate: judicate,
        })
        .then((data) => {
          res.status(201).json({ message: "Success" }).end();
        })
        .catch((error) => {
          res.status(502).send(error);
        });
    }
  },
};
