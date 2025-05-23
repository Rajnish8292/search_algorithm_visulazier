const express = require("express");
const app = express()
const path = require("path");
const PORT = 3000;
app.listen(2301);


app.get("/", (req, res) => {
    res.sendFile("index.html", {root : path.join(__dirname, "/src/")});
})

app.use(express.static('src'));