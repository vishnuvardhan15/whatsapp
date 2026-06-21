const User = require("../model/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//getAllUsers
const getAllUsers = async(req,res)=>{ 
    try{
        const users = await User.find();
        res.send(users);
    }
    catch(err){
        res.send(err);
    }
}
// SIGNUP
const signup = async (req, res) => {

    try {

        const { name, email, password } = req.body;

        const existingUser = await User.findOne({ email });

        if (existingUser) {

            return res.status(400).json({
                message: "Email already exists"
            });

        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({
            name,
            email,
            password: hashedPassword
        });

        await user.save();

        res.status(201).json({
            message: "User Registered Successfully"
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};
const login = async (req, res) => {

    try {

        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {

            return res.status(404).json({
                message: "User Not Found! Please Sign Up"
            });

        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {

            return res.status(400).json({
                message: "Invalid Password"
            });

        }
        
        // if(null){
        //     return res.status(400).json({
        //         message: "Please verify your email before logging in"
        //     });
        // }

        const token = jwt.sign(
            { id: user._id, email: user.email, name: user.name },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        

        res.status(200).json({
            message: "Login Successful",
            token,
            user_id: user._id,
            user_name: user.name.split(' ')[0]
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};
const forgotPassword = async (req, res) => {

    res.status(200).json({
        message: "Reset Password Link Sent"
    });

};
const resetPassword = async (req, res) => {

    res.status(200).json({
        message: "Password Reset Successful"
    });

};
const logout = async (req, res) => {

    res.status(200).json({
        message: "Logout Successful"
    });

};


module.exports = {
    signup,
    login,
    forgotPassword,
    resetPassword,
    logout,
    getAllUsers
};