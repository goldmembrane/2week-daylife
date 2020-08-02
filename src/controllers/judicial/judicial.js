const { judicate, keywords } = require("../../models");
const axios = require("axios");
const convert = require("xml-js");

module.exports = {
  post: (req, res) => {
    let token = req.cookies.token;
    if (!token) {
      res.status(401).json({ message: "need user session" }).end();
    } else {
      let keyword = req.body.keyword;
      let keywordId = keywords.id;

      const url = `http://law.go.kr/DRF/lawSearch.do?OC=extinctictworld`;
      const targetParams = `target=prec`;
      const keywordParams = `query=${encodeURI(keyword)}`;
      const typeParams = `type=XML`;
      const displayParams = `display=5`;

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
          console.log(response.data);
          let data = convert.xml2json(response.data, {
            compact: true,
            spaces: 4,
          });

          console.log(data, "\n");

          let jsonData = JSON.parse(data);

          console.log(jsonData);

          let judicialArray = jsonData.PrecSearch.prec;

          let judicialNumber = judicialArray.map((element) => {
            return element["판례일련번호"]._text;
          });

          console.log(judicialNumber);

          let judicialNumberString = JSON.stringify(judicialNumber);

          judicate
            .create({
              judicate: judicialNumberString,
              keyword_id: keywordId,
            })
            .then((data) => {
              res.status(201).send(judicialNumberString).end();
            })
            .catch((error) => {
              res.status(502).send(error).end();
            });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  },
};
