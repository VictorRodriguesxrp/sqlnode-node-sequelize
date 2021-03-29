const User = require("../models/User")

module.exports = {
  async validateUser (req, res, next) {
    const { email } = req.body;

    const user = await User.findOne({
      where: {
        email: email
      }
    })

    if(user) {
      return res.status(401).json({
        error: "user already exists"
      })
    }

    next();
  },

  async store (req, res) {
    const { name, email } = req.body;

    const user = await User.create({ name, email })

    return res.status(201).json(user);
  },

  async index (req, res) {
    const users = await User.findAll();

    return res.status(200).json(users);
  }
}