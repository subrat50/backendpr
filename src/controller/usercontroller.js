
const mongoose = require('mongoose')
const jwt= require('jsonwebtoken')
const userModel=require("../model/usermodel")

const isValid = function (value) {
    if (typeof value === "undefined" || value === null) return false;
    if (typeof value === "string" && value.trim().length === 0) return false;
    if (typeof value != "string") return false;
    return true;
};
const loginUser = async function (req, res) {
    try {
        let requestBody = req.body
        if (!isvalidRequest(requestBody)) return res.status(400).send({ msg: false, msg: "please provied requestbody" })
        let { email, password } = requestBody
        if (!isValid(email)) {
            return res.status(400).send({ status: false, msg: "Email is required" })
        }
        if (!(/^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/.test(email))) return res.status(400).send({ status: false, message: "email Id is invalid" })
        if (!isValid(password)) return res.status(400).send({ status: false, msg: "Password is required" })

        let user = await userModel.findOne({ email: email, password: password })
        if (!user) return res.status(400).send({ status: false, msg: "email & password is incorrect" })
        //---------creat jwt token-----------
        let token = jwt.sign({
            email: user.email.toString(),
            userId: user._id.toString(),
            project: "userlogin"
        },
            "subrat543",
            {
                expiresIn: "72h",
            }
        )
        res.setHeader("x-api-key", token)
        return res.status(400).send({ status: true, token: token, msg: "login sucessfully" })
    } catch (err) {
        res.status(500).send({ status: false, msg: err.message })
    }
}

const getUser = async function (req, res) {
    try {
        const userId = req.params.userId;
        if (!mongoose.isValidObjectId(userId)) return res.status(400).send({ msg: "inavalid id format" })
        if(req.userId != userId) return res.status(403).send({status: false , message : "you are not authorized"})

        const user = await userModel.findOne({ _id: userId });

        return res.status(200).send({ status: true, message: "User profile details", data: user });
    } catch (error) {
        return res.status(500).send({ status: false, message: error.message });
    }
};

module.exports={loginUser,getUser}