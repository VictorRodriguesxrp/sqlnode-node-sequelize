const express = require("express");

const routes = express.Router();

const userController = require("./controllers/UserController")
const addressesController = require("./controllers/AddressesController")
const techController = require("./controllers/TechController")
const reportController = require("./controllers/ReportController")


routes.get("/users", userController.index);
routes.post("/users", userController.validateUser, userController.store);

routes.get("/users/:user_id/addresses", addressesController.validateIfUserExists, addressesController.index)
routes.post("/users/:user_id/addresses", addressesController.validateIfUserExists, addressesController.store)


routes.get("/users/:user_id/techs", techController.index);
routes.post("/users/:user_id/techs", techController.store);
routes.delete("/users/:user_id/techs", techController.delete);

routes.get("/report", reportController.show);




module.exports = routes;