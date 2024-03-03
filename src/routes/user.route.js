const express = require("express");
const router = express.Router();
const { userController } = require("../controllers");
const verifyToken = require("../middlewares/verifyToken");

router
    .route("/")
    .get(userController.getUsers)
    .post(userController.registerUser);

router
    .route("/login")
    .post(userController.loginUser);

router
    .route("/:userId").all(verifyToken)
    .get(userController.getUserById)
    .put(userController.updateUserById)
    .delete(userController.deleteUserById);

module.exports = router;