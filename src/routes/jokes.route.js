const express = require("express");
const router = express.Router();
const { jokesController } = require("../controllers");

router
    .route("/")
    .get(jokesController.getJokes)
    .post(jokesController.createJoke);

router
    .route("/:jokeId")
    .get(jokesController.getJokeById)
    .put(jokesController.updateJokeById)
    .delete(jokesController.deleteJokeById);

module.exports = router;