const express = require("express");
const router = express.Router();
const userRoute = require("./user.route");
const jokesRoute = require("./jokes.route");

const defaultRoutes = [
    {path: "/users", route: userRoute},
    {path: "/jokes", route: jokesRoute},
];

defaultRoutes.forEach((route) => {
    router.use(route.path, route.route);
});

module.exports = router;