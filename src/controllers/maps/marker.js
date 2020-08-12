const { maps } = require("../../models");

module.exports = {
  get: (req, res) => {
    maps.findAll().then((data) => {
      res.send(data);
    });
  },
};
