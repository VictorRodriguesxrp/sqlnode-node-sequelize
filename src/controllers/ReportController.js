const User = require("../models/User");
const { Op } = require("sequelize");

module.exports = {
  async show(req, res) {

    const users = await User.findAll({
      attributes: ['name', 'email'],
      where: {
        email: {
          [Op.iLike]: '%@rocketseat.com.br'
        }
      },
      include: [
        { association: 'addresses', where: { street: 'Gothan city'} },
        { association: 'techs',
          where: {
            name: {
              [Op.iLike]: 'React%'
            }
          } 
        }
      ]
    })
    return res.status(200).json(users)
  }
}