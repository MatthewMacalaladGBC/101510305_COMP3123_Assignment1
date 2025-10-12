const express = require("express");
const { body, validationResult } = require("express-validator"); 
const employeeController = require("../controllers/employeeController")
const routerEmployee = express.Router();

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

routerEmployee.get("/employees", employeeController.getAllEmployees)

routerEmployee.post("/employees",
    [
        // Validation checks for each field in create employee request
        body("first_name")
            .notEmpty().withMessage("First name cannot be empty."),
        body("last_name")
            .notEmpty().withMessage("Last name cannot be empty."),
        body("email")
            .notEmpty().withMessage("Email cannot be empty.")
            .isEmail().withMessage("Email must be in valid email format."),
        body("position")
            .notEmpty().withMessage("Position cannot be empty."),
        body("salary")
            .notEmpty().withMessage("Salary cannot be empty.")
            .isFloat({min: 0}).withMessage("Salary must be a valid, positive number."),
        body("date_of_joining")
            .notEmpty().withMessage("Date of joining cannot be empty.")
            .isDate().withMessage("Date must be in valid date format."),
        body("department")
            .notEmpty().withMessage("First name cannot be empty.")
    ],
    validate, // Calls validate, defined above
    employeeController.createNewEmployee // Creation handled in controller
);

routerEmployee.get("/employees/:eid", employeeController.getEmployeeById);

routerEmployee.put("/employees/:eid", employeeController.updateEmployee);

routerEmployee.delete("/employees", employeeController.deleteEmployeeById);

module.exports = routerEmployee;