const express = require("express");

const routes = express.Router();

const userController = require("./controllers/UserController")
const addressesController = require("./controllers/AddressesController")


routes.get("/users", userController.index);
routes.post("/users", userController.validateUser, userController.store);

routes.get("/users/:user_id/addresses", addressesController.validateIfUserExists, addressesController.index)
routes.post("/users/:user_id/addresses", addressesController.validateIfUserExists, addressesController.store)


module.exports = routes;