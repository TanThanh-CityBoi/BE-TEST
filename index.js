const express = require('express')
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 5000; // port number
const app = express()
const route = require("./routers/index"); // router impl
const query = require("./configDB")
var morgan = require("morgan");

app.use(morgan("combined"));

app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));

route(app);



app.listen(PORT, () => {
  console.log(`BE-TEST app listening on port ${PORT}`)
})