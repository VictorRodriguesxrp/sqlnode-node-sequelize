const { request } = require("express");
const Address = require("../models/Addresses")
const User = require("../models/User")


module.exports = {
  async validateIfUserExists(req, res, next) {
    const { user_id } = req.params;
    const user = await User.findByPk(user_id, {
      include: { association: 'adresses'}
    });

    if(!user) {
      return res.status(400).json({
        error: "User does not exists!" 
      })
    }

    request.user = user;
    next();
  },

  async store (req, res) {
    const { user_id } = req.params;
    const { zipcode, street, number } = req.body;

    const address = await Address.create({ user_id, zipcode, street, number })

    return res.status(201).json(address);
  },

  async index (req, res) {
    const { user } = req;
    
    return res.status(200).json(user);
  }
}