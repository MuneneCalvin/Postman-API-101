require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const { MongoClient } = require("mongodb");
const routes = require("./src/routes/index");
const morgan = require("morgan");


const app = express();

mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Database Connected"));

const client = new MongoClient(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

client.connect((err) => {
    if (err) {
        console.error("Error connecting to MongoDB:", err);
        return;
    }
    console.log("Connected to MongoDB");
});

// Middleware to make MongoDB client accessible in routes
app.use((req, res, next) => {
    req.dbClient = client;
    next();
});

app.use(morgan("dev"));
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Postman API 101");
});

app.use("/v1", routes);

app.listen(process.env.PORT || 5000, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});
