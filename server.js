const express = require("express");
const app = express()
const path = require("path");
app.listen(8080, () => {
    console.log(`Development server started at PORT 8080`)
});


app.get("/", (req, res) => {
    res.sendFile("index.html", {root : path.join(__dirname, "/src/")});
})

app.use(express.static('src'));