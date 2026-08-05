const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/User");

// ===============================
// Register User
// ===============================
const registerUser = async ({ name, email, password, role = "staff" }) => {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
        throw new Error("User with this email already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
        name,
        email,
        password: hashedPassword,
        role,
    });

    return {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
    };
};

// ===============================
// Login User
// ===============================
const loginUser = async ({ email, password }) => {

    const user = await User.findOne({ email });

    if (!user) {
        throw new Error("Invalid email or password");
    }

    console.log("User Found:");
    console.log({
        id: user._id,
        email: user.email,
        role: user.role,
    });

    const isPasswordValid = await bcrypt.compare(
        password,
        user.password
    );

    if (!isPasswordValid) {
        throw new Error("Invalid email or password");
    }

    const payload = {
        userId: user._id,
        role: user.role,
    };

    console.log("JWT Payload:");
    console.log(payload);

    const token = jwt.sign(
        payload,
        process.env.JWT_SECRET,
        {
            expiresIn: "1d",
        }
    );

    console.log("Generated Token:");
    console.log(token);

    return {
        token,
        user: {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
        },
    };
};

module.exports = {
    registerUser,
    loginUser,
};