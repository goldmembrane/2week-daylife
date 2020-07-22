const { users } = require("../../models");

// module.exports = {
//   post: (req, res) => {
//     const { email, username, password } = req.body;

//     users
//       .findOrCreate({
//         where: {
//           email: email,
//         },
//         default: {
//           username: username,
//           password: password,
//         },
//       })
//       .then(async ([user, created]) => {
//         if (!created) {
//           res.status(409).json({ message: "Already existed user" });
//         }
//         res.status(201).json({ message: "Success" });
//       })
//       .catch((error) => {
//         res.status(500).send(error);
//       });
//   },
// };
module.exports = {
  post: (req, res) => {
    const { username, email, password } = req.body;

    users
      .findOrCreate({
        where: {
          email: email,
        },
        defaults: {
          username: username,
          password: password,
        },
      })
      .then(async ([user, created]) => {
        if (!created) {
          res.status(409).json({ message: "Already exists user" });
        } else {
          res.status(200).send(user.dataValues);
        }
      })
      .catch((err) => {
        res.status(500).send(err);
      });
  },
};
