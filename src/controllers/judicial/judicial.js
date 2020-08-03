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

          let judicialArray = jsonData.PrecSearch.prec;

          let judicialNumber = judicialArray.map((element) => {
            return element["판례일련번호"]._text;
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

                judicate.create({
                  title: list[i].title,
                  subtitle: list[i].subtitle,
                  judicate: element,
                  user_id: userId,
                  keyword: keywords,
                });
                if (list[i].result.includes("기각한다")) {
                  dismiss.create({
                    dismiss: element,
                    title: list[i].title,
                    subtitle: list[i].subtitle,
                    user_id: userId,
                    keyword: keywords,
                  });
                } else {
                  accept.create({
                    accept: element,
                    title: list[i].title,
                    subtitle: list[i].subtitle,
                    user_id: userId,
                    keyword: keywords,
                  });
                }
              });
              return list;
            });
          }
          res.status(201).json({ message: "Success" }).end();
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
            keyword: keyword,
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

