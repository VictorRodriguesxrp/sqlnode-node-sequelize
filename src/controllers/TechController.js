const Tech = require("../models/Tech")
const User = require("../models/User")


module.exports = {
  async index (req, res) {
    const { user_id } = req.params;

    const user = await User.findByPk(user_id, {
      include: { association: 'techs', through: { attributes: [] } }
    })

    return res.status(200).json(user.techs);

  },

  async store (req, res) {
    const { user_id } = req.params;
    const { name } = req.body;

    const user = await User.findByPk(user_id)

    if(!user) {
      return res.status(401).json({
        message: "User does not exists!"
      })
    }
   
    // find or create retornar a tecnologia e um boolean informando se foi criada ou não
    const [ tech  ] = await Tech.findOrCreate({ 
      where: { name }
     })

     await user.addTech(tech);

     return res.status(201).json ({
       tech
     })
  },


  async delete(req, res) {
    const { user_id } = req.params;
    const { name } = req.body;

    const user = await User.findByPk(user_id);

    if(!user) {
      return res.status(401).json({
        message: "User does not exists!"
      });
    }

    const tech = await Tech.findOne({
      where: {
        name
      }
    });

    //deletando apenas o relacionamento do usuario com a tecnologia
    await user.removeTech(tech);

    return res.status(201).send();
  }

}