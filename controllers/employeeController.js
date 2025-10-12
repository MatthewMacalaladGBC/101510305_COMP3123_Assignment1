const Employee = require("../models/Employee.js");

// GET - /api/v1/emp/employees
const getAllEmployees = async (req, res) => {
    try {
        
    } catch (error) {
        res.status(500).send(error);
    }
};

// POST - /api/v1/emp/employees
const createNewEmployee = async (req, res) => {
    try {

    } catch (error) {
        res.status(500).send(error);
    }
};

// GET - /api/v1/emp/employees/{eid}
const getEmployeeById = async (req, res) => {
    try {

    } catch (error) {
        res.status(500).send(error);
    }
};

// PUT - /api/v1/emp/employees/{eid}
const updateEmployee = async (req, res) => {
    try {

    } catch (error) {
        res.status(500).send(error);
    }
};

// DELETE - /api/v1/emp/employees?eid=xxx
const deleteEmployeeById = async (req, res) => {
    try {

    } catch (error) {
        res.status(500).send(error);
    }
};

module.exports = { getAllEmployees, createNewEmployee, getEmployeeById, updateEmployee, deleteEmployeeById };