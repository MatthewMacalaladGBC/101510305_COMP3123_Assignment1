const Employee = require("../models/Employee.js");

// Format helper function to rename _id to employee_id when fetching
const formatEmployee = (employee) => ({
    employee_id: employee._id,
    first_name: employee.first_name,
    last_name: employee.last_name,
    email: employee.email,
    position: employee.position,
    salary: employee.salary,
    date_of_joining: employee.date_of_joining,
    department: employee.department
});

// GET - /api/v1/emp/employees
const getAllEmployees = async (req, res) => {
    try {
        // Retrieve all employees in the database (hiding unnecessary fields)
        const employees = await Employee.find().select("-__v -created_at -updated_at");
        // format "_id" field to "employee_id" using helper function defined above
        const formattedEmployees = employees.map(formatEmployee);
        // Return success message
        res.status(200).json(formattedEmployees);
    } catch (error) {
        res.status(500).json({
            status: false,
            message: "Error fetching all employees.",
            error: error.message
        });
    };
};

// POST - /api/v1/emp/employees
const createNewEmployee = async (req, res) => {
    try {
        // Instantiate a new employee using request body
        const newEmployee = new Employee(req.body);
        await newEmployee.save();
        // Return success message
        res.status(201).json({
            status: true,
            message: "Employee created successfully.",
            employee_id: newEmployee._id
        });
    } catch (error) {
        res.status(500).json({
            status: false,
            message: "Error creating new employee.",
            error: error.message
        });
    };
};

// GET - /api/v1/emp/employees/{eid}
const getEmployeeById = async (req, res) => {
    try {
        // Look for employee using path param
        const employee = await Employee.findById(req.params.eid);
        // If not found, return error status
        if (!employee) {
            return res.status(404).json({
                status: false,
                message: "Could not find employee with given id."
            });
        };
        // Otherwise, return success message
        res.status(200).json(formatEmployee(employee));
    } catch (error) {
        res.status(500).json({
            status: false,
            message: "Error fetching employee.",
            error: error.message
        });
    };
};

// PUT - /api/v1/emp/employees/{eid}
const updateEmployee = async (req, res) => {
    try {
        // Look for employee to update using path param and update using request body
        const updatedEmp = await Employee.findByIdAndUpdate(
            req.params.eid, 
            req.body,
            { new: true }
        );
        // If not found, return error status
        if (!updatedEmp) {
            return res.status(404).json({
                status: false,
                message: "Could not find employee with given id."
            });
        };
        // Otherwise, return success message
        res.status(200).json({ 
            status: true,
            message: "Employee details successfully updated.",
            employee: formatEmployee(updatedEmp)
        });
    } catch (error) {
        res.status(500).json({
            status: false,
            message: "Error updating employee details.",
            error: error.message
        });
    };
};

// DELETE - /api/v1/emp/employees?eid=xxx
const deleteEmployeeById = async (req, res) => {
    try {
        // Get the id object from the request query
        const { eid } = req.query; 

        // Look for employee with matching ID, and delete
        const deletedEmp = await Employee.findByIdAndDelete(eid);
        // If not found, return error status
        if (!deletedEmp) {
            return res.status(404).json({
                status: false,
                message: "Could not find employee with given id."
            });
        }
        // Otherwise, return success status
        res.status(204).send();
    } catch (error) {
        res.status(500).json({
            status: false,
            message: "Error deleting employee.",
            error: error.message
        });
    };
};

const searchEmployees = async (req, res) => {
    // Get query values from request
    const { query } = req.query; 

    try {
        const employees = await Employee.find({
            $or: [
                { first_name: { $regex: query, $options: "i" } },
                { last_name: { $regex: query, $options: "i" } },
                { department: { $regex: query, $options: "i" } },
                { position: { $regex: query, $options: "i" } }
            ]
        }).select("-__v -created_at -updated_at");

        res.status(200).json(employees.map(formatEmployee));
    } catch (error) {
        res.status(500).json({
            status: false,
            message: "Error searching employee.",
            error: error.message
        });
    }
}

module.exports = { getAllEmployees, createNewEmployee, getEmployeeById, updateEmployee, deleteEmployeeById, searchEmployees };