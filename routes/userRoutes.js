const express = require("express");
const { body, validationResult } = require("express-validator"); 
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
        body("username")
            .notEmpty().withMessage("Username cannot be empty."),
        body("email")
            .notEmpty().withMessage("Email cannot be empty.")
            .isEmail().withMessage("Email must be in valid email format."),
        body("password")
            .isLength({ min: 8 }).withMessage("Password must have minimum length of 8.")
    ],
    validate, // Calls validate, defined above
    userController.signup // Signup handled in controller
);

routerUser.post("/login",
    [
        // Validation checks for each field in signup request
        body("login").notEmpty().withMessage("Email or Username is required"),
        body("password").isLength({ min: 8 })
    ],
    // Check that login body has at least one of email or username
    (req, res, next) => {
        const { login } = req.body;
        // If not, return error status
        if ( !login ) {
            return res.status(400).json({
                status: false,
                message: "Must contain either a username or email."
            })
        }
        // If valid, move to validate
        next();
    },
    validate, // Calls validate, defined above
    userController.login // Login handled in controller
);

module.exports = routerUser;