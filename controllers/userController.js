const User = require('../models/User');
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
require('dotenv').config();

const register = async (req, res) => {
    try {
        const { username, password } = req.body;

        // Check if username already exists
        // const existingUser = await User.findOne({ username });
        // if (existingUser) {
        //     return res.status(400).json({ message: "User already exists" });
        // }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const newUser = new User({ username, password: hashedPassword });
        await newUser.save();

        res.status(201).json({ message: "User created successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

async function checkUsername(req, res) {
 const { username } = req.body;
  User.findOne({ username }, (err, user) => {
    if (err) {
        return res.status(500).json({ message: 'Internal Server Error' });
    }
    if (user) {
        // User exists
        return res.json({ exists: true });
    } else {
        // User does not exist
        return res.json({ exists: false });
    }
});
;
}

async function login(req, res) {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ message: 'Invalid username or password' });
        }

        // Compare the provided password with the hashed password
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            return res.status(400).json({ message: 'Invalid username or password' });
        }

        // If passwords match, create a JWT token
        const token = jwt.sign({ username: user.username }, process.env.JWT_SECRET);
        res.json({ token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
}

module.exports = { register, login, checkUsername };
