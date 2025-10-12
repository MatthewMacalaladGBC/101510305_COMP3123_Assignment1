const Employee = require("../models/Employee.js");

// Format helper function to rename _id to employee_id when fetching
const formatEmployee = (employee) => ({
    employee_id: employee._id,
    first_name: employee.first_name,
    last_name: employee.last_name,
    email: employee.email,
    position: employee.position,
    salary: employee.salary,
    date_of_joining: employee.department,
    department: employee.department
});

// GET - /api/v1/emp/employees
const getAllEmployees = async (req, res) => {
    try {
        const employees = await Employee.find().select("-__v -created_at -updated_at");
        const formattedEmployees = employees.map(formatEmployee);
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
        const newEmployee = new Employee(req.body);
        await newEmployee.save();
        res.status(201).json({
            message: "Employee created succesfully.",
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
        const employee = await Employee.findById(req.params.eid);
        if (!employee) {
            return res.status(404).json({
                status: false,
                message: "Could not find employee with given id."
            });
        };
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
        const updatedEmp = await Employee.findByIdAndUpdate(req.params.eid, req.body);
        if (!updatedEmp) {
            return res.status(404).json({
                status: false,
                message: "Could not find employee with given id."
            });
        };
        res.status(200).json({ message: "Employee details successfully updated."});
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
        const deletedEmp = await Employee.findByIdAndDelete(req.params.eid);
        if (!deletedEmp) {
            return res.status(404).json({
                status: false,
                message: "Could not find employee with given id."
            });
        }
        res.status(204).send();
    } catch (error) {
        res.status(500).json({
            status: false,
            message: "Error deleting employee.",
            error: error.message
        });
    };
};

module.exports = { getAllEmployees, createNewEmployee, getEmployeeById, updateEmployee, deleteEmployeeById };