const express = require("express");
const { query, validationResult } = require("express-validator"); 
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
        query("first_name").notEmpty(),
        query("last_name").notEmpty(),
        query("last_name").notEmpty().isEmail(),
        query("position").notEmpty(),
        query("salary").notEmpty().isNumeric(),
        query("date_of_joining").notEmpty().isDate(),
        query("department").notEmpty()
    ],
    validate, // Calls validate, defined above
    employeeController.createNewEmployee // Creation handled in controller
);

routerEmployee.get("/employees/:eid", employeeController.getEmployeeById);

routerEmployee.put("/employees/:eid", employeeController.updateEmployee);

routerEmployee.delete("/employees", employeeController.deleteEmployeeById);

module.exports = routerEmployee;