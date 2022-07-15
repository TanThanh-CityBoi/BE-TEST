const query = require("../configDB")

class AuthController {
    register = async (req, res) => {
        try {
            console.log(req.body);
            const { email, phone, password, firstname, lastname } = req.body
            
            const sql = `INSERT INTO account (email, phone, password, firstname, lastname) VALUES (?, ?, ?, ?, ?)`
            const userInfo = [
                email,
                phone,
                password,
                firstname,
                lastname
            ];

            const result = await query(sql, userInfo);
            if (result.affectedRows !== 1) throw Error();

            res.status(200).send(JSON.stringify({
                message: "Register successfully !!"
            }))

        } catch (err) {
            res.status(400).send(err.message)
        }
    }

    login = async (req, res) => {

    }

    resetPassword = async (req, res) => {

    }
}

module.exports = new AuthController();