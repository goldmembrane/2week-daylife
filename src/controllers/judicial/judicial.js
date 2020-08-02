const { judicate, keywords, accept, dismiss } = require("../../models");
const axios = require("axios");
const convert = require("xml-js");
const cheerio = require("cheerio");

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
      const displayParams = `display=20`;

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

          const crawlingURL = judicialNumber.map((element) => {
            return `http://www.law.go.kr/LSW/precInfoP.do?precSeq=${element}&mode=0`;
          });

          const getHtml = async (url) => {
            try {
              return await axios.get(url);
            } catch (error) {
              console.log(error);
            }
          };

          for (let element of crawlingURL) {
            getHtml(element).then((html) => {
              let list = [];
              const $ = cheerio.load(html.data);
              const bodyList = $("#contentBody").children("#conScroll");

              bodyList.each(function (i, elem) {
                list[i] = {
                  result: $(this).find("p.pty4_dep1").text(),
                };
                if (list[i].result.includes("기각한다")) {
                  dismiss.create({
                    dismiss: element,
                  });
                } else {
                  accept.create({
                    accept: element,
                  });
                }
              });
              return list;
            });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  },
};

