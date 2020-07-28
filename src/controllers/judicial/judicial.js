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

      const url = `http://law.go.kr/DRF/lawSearch.do?OC=${process.env.API_KEY}`;
      const targetParams = `target=prec`;
      const keywordParams = `query=${encodeURI(keywords)}`;
      const typeParams = `type=XML`;
      const displayParams = `display=100`;

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

      keyword
        .create({
          user_id: userId,
          keyword: keywords,
          judicate: axios({
            method: "get",
            url: resultURL,
            responseType: "xml",
          })
            .then((response) => {
              let result = convert.xml2json(response.data, {
                compact: false,
                spaces: 4,
              });
              console.log(result);
              return result;
            })
            .catch((error) => {
              console.log(error);
            }),
        })
        .then((data) => {
          res.status(201).json({ message: "Success" }).end();
        })
        .catch((error) => {
          console.log(error);
          res.status(502).send(error);
        });
    }
  },
  get: (req, res) => {
    let token = req.cookies.token;
    if (!token) {
      res.status(401).json({ message: "need user session" }).end();
    } else {
      let userId = jwt.verify(token, process.env.JWT_SECRET).id;

      keyword
        .findAll({
          where: {
            user_id: userId,
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
