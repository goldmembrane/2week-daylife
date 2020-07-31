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

      const url = `http://law.go.kr/DRF/lawSearch.do?OC=extinctictworld`;
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

      axios({
        method: "get",
        url: resultURL,
        responseType: "xml",
      })
        .then((response) => {

           let jsonData = convert.xml2json(response.data, {
            compact: true,
            spaces: 4,
          });
          console.log(jsonData, "\n");
          keyword
            .findOrCreate({
              where: {
                keyword: keywords,
              },
              defaults: {
                judicate: jsonData,
              },
            })
            .then(async ([data, created]) => {
              if (!created) {
                res.status(201).send(jsonData);
              } else {
                res.status(200).send(data.dataValues.judicate);
              }
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
};
