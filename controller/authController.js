import User from '../models/User.js';
import { comparePassword, hashPassword } from '../utils/authHelper.js';
import JWT from 'jsonwebtoken';

// REGISTER CONTROLLER
export const registerController = async (req, res) => {
    try {

        const { mobile, password, confirmPassword } = req.body;

        if (!mobile) {
            return res.status(400).send({ message: 'Please enter mobile field' });
        }
        if (!password) {
            return res.status(400).send({ message: 'Please enter password field' });
        }
        if (!confirmPassword) {
            return res.status(400).send({ message: 'Please enter confirm password field' });
        }

        if (password !== confirmPassword) {
            return res.status(400).send({ message: 'Passwords do not match' });
        }

        await User.deleteMany({ isVerified: false });

        let existingUser = await User.findOne({ mobile });
        if (existingUser) {
            return res.status(400).send({ message: 'User already exists. You can login...' });
        }

        const hashedPassword = await hashPassword(password)
        const user = await new User({
            mobile,
            password: hashedPassword,
        }).save();

        res.status(201).send({
            success: true,
            message: "User Registered succesfully",
            user,
        });

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in Registration...",
            error,
        })
    }
};

// VERIFICATION CONTROLLER
export const verificationController = async (req, res) => {
    try {
        const { mobile, otp } = req.body;

        if (!mobile) {
            return res.status(400).send({ message: 'Mobile Not Provided' });
        }
        if (!otp) {
            return res.status(400).send({ message: 'Please enter otp field' });
        }
        
        let user = await User.findOne({ mobile });
        if(user.isVerified){
            return res.status(200).send({ success: true, message: 'User already verified', user });
        }
        if(!user){
            return res.status(400).send({ message: 'User not found' });
        }
        if(otp != 123456){
            return res.status(400).send({ message: 'Enter correct otp' });
        }

        user.isVerified = true;

        await user.save();

        res.status(201).send({
            success: true,
            message: "User Registered succesfully",
            user,
        });

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in Registration...",
            error,
        })
    }
}

// LOGIN CONTROLLER
export const loginController = async (req, res) => {
    try {
        const { mobile, password } = req.body;

        if (!mobile) {
            return res.status(400).send({ message: 'Mobile Not Provided' });
        }
        if (!password) {
            return res.status(400).send({ message: 'Please enter password' });
        }
        
        const user = await User.findOne({mobile});
        if(!user){
            return res.status(404).send({
                success: false,
                message: "Mobile is not registered",
            })
        }
        if(!user.isVerified){
            return res.status(404).send({
                success: false,
                message: "Mobile is not verified",
            })
        }

        const match = await comparePassword(password, user.password);
        if(!match){
            return res.status(404).send({
                success: false,
                message: "Invalid password",
            })
        }

        // JWT Token
        const token = JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "7d",
        });

        res.status(200).send({
            success: true,
            message: "login succesfully",
            user: {
                name: user.mobile,
                verified: user.isVerified,
            },
            token,
        });

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in Login...",
            error,
        })
    }
} 