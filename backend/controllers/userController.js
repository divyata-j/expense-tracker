
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const UserModel = require("../models/UserModel")

const saltRound = 10

const login = async (req, res) => {
    try {

        const { email, password } = req.body

        const user = await UserModel.findOne({ email: email })
        if (user && await bcrypt.compare(password, user.password)) {
            const token = jwt.sign({ id: user._id, email: user.email }, process.env.TOKEN_KEY)

            return res.status(200).json({ success: true, message: "Login Successful", token: token })
        }
        return res.status(401).json({ success: false, message: "Invalid Credentials" })
    }
    catch (error) {
        console.log(error.message);
        return res.status(500).json({ success: false, message: "Server Error" });
    }
}

const signup = async (req, res) => {
    try {
        const { username, email, password } = req.body

        if (!username || username === "") {
            return res.status(400).json({ success: false, message: "Username is required" })
        }
        if (!email || email === "") {
            return res.status(400).json({ success: false, message: "Email is required" })
        }

        if (!password || password === "") {
            return res.status(400).json({ success: false, message: "Password is required" })
        }

        const isEmail = await UserModel.findOne({ email: email })
        if (isEmail) {
            return res.status(400).json({ success: false, message: "Email already registered" })
        }

        const emailPattern = email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)
        if (!emailPattern) {
            return res.status(203).json({ success: false, message: "Invalid email id" })
        }
        const passpat =password.match(/[a-zA-Z0-9!@#$%^&]{6,16}$/);

        if(!passpat)
         return res.status(203).end("password length should be in range 7-14");
    

        const encryptedPassword = await bcrypt.hash(password, saltRound)
        const user = new UserModel({
            username: username,
            email: email,
            password: encryptedPassword,

        })
        const newUser = await user.save()
        //const token = jwt.sign({ id: newUser._id, email: newUser.email }, process.env.TOKEN_KEY)
        return res.status(200).json({ success: true, message: "Registered Successfully" })
    }
    catch (error) {
        console.log(error.message);
        return res.status(500).json({ success: false, message: "Server Error" });
    }
}

module.exports = {
    signup,
    login
}