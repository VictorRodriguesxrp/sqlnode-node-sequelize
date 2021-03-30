const Sequelize = require("sequelize");
const dbConfig = require("../config/database")

const User = require("../models/User")
const Addresses = require("../models/Addresses")
const Tech = require("../models/Tech")

const connection = new Sequelize(dbConfig);

Tech.init(connection)
User.init(connection);
Addresses.init(connection);


User.associate(connection.models);
Addresses.associate(connection.models);
Tech.associate(connection.models);


module.exports = connection;