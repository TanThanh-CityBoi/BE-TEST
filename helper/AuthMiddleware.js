require("dotenv").config();
const jwt = require("jsonwebtoken");

async function AuthMiddleware(req, res, next) {

    const authorizationHeader = req.headers["authorization"];
    const token = authorizationHeader?.split(" ")[1];

    console.log("autho:  ", authorizationHeader)
    if (!token) res.sendStatus(401);

    jwt.verify(token, process.env.TOKEN_SECRET, (err, data) => {
        console.log({ err, data });
        if (err) res.sendStatus(403);
        res.locals.data = data
        next();
    });
}

module.exports = AuthMiddleware;
