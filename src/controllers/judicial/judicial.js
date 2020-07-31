const { keyword } = require("../../models");
const axios = require("axios");
const jwt = require("jsonwebtoken");
const convert = require("xml-js");

module.exports = {
  post: (req, res) => {
    let token = req.cookies.token;
    if (!token) {
      res.status(401).json({ message: "need user session" }).end();
    } else {
      let keywords = req.body.keyword;
      let userId = jwt.verify(token, process.env.JWT_SECRET).id;

      const url = `http://law.go.kr/DRF/lawSearch.do?OC=extinctictworld`;
      const targetParams = `target=prec`;
      const keywordParams = `query=${encodeURI(keywords)}`;
      const typeParams = `type=XML`;
      const displayParams = `display=1`;

      const resultURL =
        url +
        "&" +
        targetParams +
        "&" +
        typeParams +
        "&" +
        keywordParams +
        "&" +
        displayParams;

      console.log(resultURL);

      axios({
        method: "get",
        url: resultURL,
        responseType: "xml",
      })
        .then((response) => {
          console.log(response.data);
          let jsonData = convert.xml2json(response.data, {
            compact: false,
            spaces: 4,
          });
          console.log(jsonData, "\n");
          keyword
            .create({
              user_id: userId,
              keyword: keywords,
              judicate: jsonData,
            })
            .then((data) => {
              res.status(201).json({ message: "Success" }).end();
            })
            .catch((error) => {
              console.log(error);
              res.status(502).send(error);
            });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  },
  get: (req, res) => {
    let token = req.cookies.token;
    if (!token) {
      res.status(401).json({ message: "need user session" }).end();
    } else {
      let keywords = req.query.keyword;

      keyword
        .findAll({
          where: {
            keyword: keywords,
          },
        })
        .then((data) => {
          res.status(200).send(data).end();
        })
        .catch((error) => {
          console.log(error);
          res.status(501).send(error);
        });
    }
  },
};
