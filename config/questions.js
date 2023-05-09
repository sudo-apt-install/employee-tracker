const inquirer = require("inquirer");

/*
What would you like to do?
    * Add Employee
        * What is the employees first name? (OE)
        * What is the employees last name? (OE)
        * What is the employees role?
            * Sales Lead
            * Salesperson
            * Lead Engineer
            * Software Engineer
            * Account Manager
            * Accountant
            * Legal Team Lead
            * Lawyer
            * Customer Service
        * Who is the employees manager? (DD)

    * Update Employee Role
        * Which employees role would you like to update? (DD)

    * View All Roles

    * Add Role
        * What is the name of the role? (OE)
        * What is the salary of the role? (OE)
        * Which department does the role belong to?
            * Engineering
            * Finance
            * Legal
            * Sales
            * Service

    
    * Add Department
        * What is the name of the department? (OE)
    
    * View All Departments

    * View All Employees

    * Quit
*/

async function init() {
  const employeeUpdates = await inquirer.createPromptModule(
    {
      type: "list",
      message: "What would you like to do?: ",
      choices: [
        "Add Employee",
        "Update Employee Role",
        "View All Roles",
        "Add Role",
        "Add Department",
        "View All Departments",
        "View All Employees",
        "Quit",
      ],
    }
  );
}

async function departmentName() {
    const departments = await inquirer.createPromptModule(
      {
        type: "list",
        message: "What is the name of the department?: ",
        choices: [
          "Engineering",
          "Finance",
          "Legal",
          "Sales",
          "Service",
        ],
      }
    );
  }
  
  async function managers() {
    const employeeManagers = await inquirer.createPromptModule(
      {
        type: "list",
        message: "Who is the employees manager?: ",
        choices: [
            "Lee Nover",
            "Amanda Mount",
            "Colin Forsecs",
            "Wayne Kerr",
            "Eaton Beever",
            "Betty Humter",
        ],
      }
    );
  }
  