const { users } = require("../../models");

module.exports = {
  post: (req, res) => {
    const { email, username, password } = req.body;

    users
      .findOrCreate({
        where: { email },
        default: { username, password },
      })
      .then(async ([user, created]) => {
        if (!created) {
          res.status(409).json({ message: "Already existed user" });
        }
        res.status(201).json({ message: "Success" });
      })
      .catch((error) => {
        res.status(500).send(error);
      });
  },
};
