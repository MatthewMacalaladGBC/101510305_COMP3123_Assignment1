const express = require("express");
const { query, validationResult } = require("express-validator"); 
const userController = require("../controllers/userController")
const routerUser = express.Router();

const validate = async (req, res, next) => {
    // Checks if the request is valid based on the defined validations
    const result = validationResult(req);
    if (!result.isEmpty()) {
        return res.status(400).json({
            message: "Invalid request.",
            errors: result.array()
        })
    }
    // If there are no errors (valid request), goes to the next callback
    next();
};

routerUser.post("/signup",
    [
        // Validation checks for each field in signup request
        query("username").notEmpty(),
        query("email").notEmpty().isEmail(),
        query("password").isLength({ min: 8 })
    ],
    validate, // Calls validate, defined above
    userController.signup // Signup handled in controller
);

routerUser.post("/login",
    [
        // Validation checks for each field in signup request
        query("username").optional().notEmpty(),
        query("email").optional().isEmail(),
        query("password").isLength({ min: 8 })
    ],
    (req, res, next) => {
        const { email, username } = req.body;
        if ( !email && !username ) {
            return res.status(400).send("Request body must contain either a username or email, and a password).")
        }
        next();
    },
    validate, // Calls validate, defined above
    userController.login // Login handled in controller
);

module.exports = routerUser;