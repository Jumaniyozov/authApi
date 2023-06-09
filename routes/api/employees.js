const express = require("express");
const router = express.Router();
const employeesController = require("../../controllers/employee");
const ROLES_LIST = require("../../config/role_list");
const verifyRoles = require("../../middleware/verifyRoles");

router
  .route("/")
  .get(verifyRoles(ROLES_LIST.User), employeesController.getAllEmployees)
  .post(
    verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor),
    employeesController.createNewEmployee
  )
  .put(
    verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor),
    employeesController.updateEmployee
  )
  .delete(verifyRoles(ROLES_LIST.Admin), employeesController.deleteEmployee);

router
  .route("/:id")
  .get(verifyRoles(ROLES_LIST.User), employeesController.getEmployee);

module.exports = router;
