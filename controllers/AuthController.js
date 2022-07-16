const query = require("../configDB")
const jwt = require("jsonwebtoken");
const { param } = require("../routers/auth");
require("dotenv").config();

class AuthController {
    register = async (req, res) => {
        try {
            console.log(req.body);
            const { email, phone, password, firstname, lastname } = req.body

            //check email
            const user = await query("SELECT * FROM account WHERE email = ?", [email]);
            if (user.length > 0) {
                throw Error('Email already exist!!');
            }

            //hash password
            var hashPassword = jwt.sign(password, process.env.TOKEN_SECRET);

            //insert data
            const sql = `INSERT INTO account (email, phone, password, firstname, lastname) VALUES (?, ?, ?, ?, ?)`
            const userInfo = [
                email,
                phone,
                hashPassword,
                firstname,
                lastname
            ];

            await query(sql, userInfo);

            res.status(201).send(JSON.stringify({
                message: "Register successfully !!"
            }))

        } catch (err) {
            res.status(403).send(err.message)
        }
    }

    login = async (req, res) => {
        try {
            const { email, password } = req.body;

            const user = await query("SELECT * FROM account WHERE email = ?", [email]);
            if (user.length < 1) {
                return res.status(400).send('User not found');
            }

            var hashPassword = jwt.sign(password, process.env.TOKEN_SECRET);
            if (user[0].password !== hashPassword) {
                throw Error('Password is not correct!')
            }

            var token = jwt.sign({ email: user[0].email, id: user[0].id }, process.env.TOKEN_SECRET, { expiresIn: 3600000 });

            res.status(200).send(JSON.stringify({
                message: 'Login successfully',
                token: token
            }))
        }
        catch (err) {
            res.status(403).send(err.message);
        }
    }

    resetPassword = async (req, res) => {
        try {
            const { oldPassword, newPassword } = req.body

            const email = res.locals.data.email;
            console.log('email: ', email);
            const user = await query("SELECT * FROM account WHERE email = ?", [email]);
            if (user.length < 1) {
                return res.status(400).send('User not found');
            }

            if (user[0].password !== jwt.sign(oldPassword, process.env.TOKEN_SECRET)) {
                throw Error('Password is not correct!')
            }

            const sql = `UPDATE account
                        SET password = ?
                        WHERE email = ?;`

            await query(sql, [jwt.sign(newPassword, process.env.TOKEN_SECRET), email]);

            res.status(200).send('Update successfully');
        }
        catch (err) {
            res.status(403).send(err.message);
        }
    }
}

module.exports = new AuthController();