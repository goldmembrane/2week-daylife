const { judicate, accept, dismiss } = require("../../models");
const jwt = require("jsonwebtoken");
const axios = require("axios");
const convert = require("xml-js");
const cheerio = require("cheerio");

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
          let data = convert.xml2json(response.data, {
            compact: true,
            spaces: 4,
          });

          let jsonData = JSON.parse(data);

          let judicialNumberArray = jsonData.PrecSearch.prec;
          let judicialTitleArray = jsonData.PrecSearch.prec;
          let judicialSubtitleArray = jsonData.PrecSearch.prec;

          let judicialNumber = judicialNumberArray.map((element) => {
            return element["판례일련번호"]._text;
          });

          let judicialTitle = judicialTitleArray.map((element) => {
            return element["사건명"]._cdata;
          });

          let judicialSubTitle = judicialSubtitleArray.map((element) => {
            return element["사건번호"]._text;
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
              const bodyList = $("#contentBody");

              bodyList.each(function (i, elem) {
                list[i] = {
                  result: $(this).find("p.pty4_dep1").text(),
                  title: $(this).find("h2").text(),
                  subtitle: $(this).find("div.subtit1").text(),
                };

                if (list[i].result.includes("기각한다")) {
                  dismiss.findOrCreate({
                    where: {
                      keyword: keywords,
                      user_id: userId,
                    },
                    defaults: {
                      dismiss: element,
                      title: list[i].title,
                      subtitle: list[i].subtitle,
                    },
                  });
                } else {
                  accept.findOrCreate({
                    where: {
                      keyword: keywords,
                      user_id: userId,
                    },
                    defaults: {
                      accept: element,
                      title: list[i].title,
                      subtitle: list[i].subtitle,
                    },
                  });
                }
              });
            });
          }

          let judicialNumberString = JSON.stringify(judicialNumber);
          let judicialTitleString = JSON.stringify(judicialTitle);
          let judicialSubTitleString = JSON.stringify(judicialSubTitle);

          judicate
            .findOrCreate({
              where: {
                keyword: keywords,
                user_id: userId,
              },
              defaults: {
                judicate: judicialNumberString,
                title: judicialTitleString,
                subtitle: judicialSubTitleString,
              },
            })
            .then(async ([data, created]) => {
              if (!created) {
                res.status(200).send(data.dataValues).end();
              } else {
                res
                  .status(201)
                  .json({
                    number: judicialNumberString,
                    title: judicialTitleString,
                    subtitle: judicialSubTitleString,
                  })
                  .end();
              }
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
      let userId = jwt.verify(token, process.env.JWT_SECRET).id;

      let keyword = req.query.keyword;
      judicate
        .findAll({
          where: {
            user_id: userId,
            keyowrd: keyword,
          },
        })
        .then((data) => {
          res.status(200).send(data).end();
        })
        .catch((error) => {
          console.log(error);
          res.status(404).json({ message: "not found judicate" });
        });
    }
  },
};
