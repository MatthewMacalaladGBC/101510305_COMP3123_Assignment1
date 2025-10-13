const User = require("../models/User");

// POST - /api/v1/user/signup
const signup = async (req, res) => {
    try{
        const { username, email, password } = req.body;

        // Ends the request if any field is missing (removed because added check in userRoutes)
        // if ( !username || !email || !password ) {
        //     return res.status(400).send("Request body must contain all fields (username, email, password)")
        // }

        // Checks if the provided username or email already exist
        const userExists = await User.findOne({
            $or: [
                { username: username },
                { email: email }
            ]
        })

        // If user already exists (username or email already in database) then return error status
        if (userExists) {
            // Sets dupeVal to whichever of Username or Email is a duplicate (default to Username if both)
            const dupeVal = userExists.username === username ? "Username" : "Email"
            return res.status(400).json({ 
                status: false,
                message: `${dupeVal} is already in use. Please try again.`
            })
        }

        // Creates new user using provided values, then saves to database
        const newUser = new User({ username, email, password });
        await newUser.save();
        res.status(201).json({
            message: "User created successfully.",
            user_id: newUser._id
        });
    } catch (error) {
        res.status(500).json({
            status: false,
            message: "Error signing up.",
            error: error.message
        });
    }
};

// POST - /api/v1/user/login
const login = async (req, res) => {
    try{
        const { email, username, password } = req.body;

        // Ends request if any field is missing (removed because added check in userRoutes)
        // if ( (!email && !username) || !password ) {
        //     return res.status(400).send("Request body must contain either a username or email, and a password).")
        // }

        const user = await User.findOne(email ? {email: email} : {username: username})

        // If a user is not found, returns a message and terminates request
        if (!user) {
            return res.status(401).json({
                status: false,
                message: `Invalid credentials: ${email ? "email" : "username"} not found.`
            });
        };

        // Uses the comparePassword method defined in the User model
        const correctPass = await user.comparePassword(password);
        // If password does not match, return error status
        if (!correctPass) {
            return res.status(401).json({
                status: false,
                message: "Invalid credentials: Password is incorrect."
            });
        };

        res.status(200).json({
            message: "Login successful."
        });
    } catch (error) {
        res.status(500).json({
            status: false,
            message: "Error logging in.",
            error: error.message
        });
    }
};

module.exports = { signup, login };