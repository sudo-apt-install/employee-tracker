const express = require("express");
const mysql = require("mysql2");
const inquirer = require("inquirer");
process.stdin.setMaxListeners(30);
require("dotenv").config();

// Connect to database
const db = mysql.createConnection({
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: "localhost",
});

const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

function addEmployee() {
  return new Promise((resolve, reject) => {
    inquirer
      .prompt([
        {
          type: "input",
          message: "What is the employee's first name?",
          name: "first_name",
        },
        {
          type: "input",
          message: "What is the employee's last name?",
          name: "last_name",
        },
        {
          type: "input",
          message: "What is the employee's salary?",
          name: "salary",
        },
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
          name: "manager",
        },
      ])
      .then((answers) => {
        const { first_name, last_name, salary } = answers;
        const sql = `INSERT INTO employees (first_name, last_name, salary) VALUES (?, ?, ?)`;
        const params = [first_name, last_name, salary];

        db.query(sql, params, (err, result) => {
          if (err) {
            console.log({ error: err.message });
            reject(err);
            return;
          }

          console.log({
            message: "Successfully added employee!",
          });
          resolve();
        });
      })
      .catch((error) => {
        console.error("Goblins in the machine!", error);
        reject(error);
      });
  });
}

function addRole() {
  return new Promise((resolve, reject) => {
    inquirer
      .prompt([
        {
          type: "input",
          message: "Enter the role name:",
          name: "position_title",
        },
        {
          type: "input",
          message: "Enter a department id for this role:",
          name: "department_id",
        },
      ])
      .then((answers) => {
        const position_title = answers.position_title;
        const department_id = answers.department_id;
        const sql = `INSERT INTO role (position_title, department_id) VALUES (?, ?)`;
        const params = [position_title, department_id];

        db.query(sql, params, (err, result) => {
          if (err) {
            console.log({ error: err.message });
            reject(err);
            return;
          }

          console.log({
            message: "Successfully added role!",
          });
          resolve();
        });
      })
      .catch((error) => {
        console.error("Goblins in the machine!", error);
        resolve(); // Resolve the promise even if an error occurs to allow program continuation
      });
  });
}


// Function to display a specific table
function viewTable(tableName) {
  db.query(`SELECT * FROM ${tableName}`, (error, results) => {
    if (error) {
      console.error("Error retrieving data from MySQL:", error);
      return;
    }

    // Display the table data
    console.log("\n");
    console.log("Table:", tableName);
    console.table(results);
    console.log("\n");
  });
}

async function init() {
  console.log("\n");
  try {
    const answers = await inquirer.prompt([
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
        name: "action",
      },
    ]);

    const selectedAction = answers.action;
    await performSelectedAction(selectedAction);

    // After each action, call the init() function unless leave() was called
    if (selectedAction !== "Quit") {
      setTimeout(() => {
        init();
      }, 300);
    }
  } catch (error) {
    console.error("Error occurred", error);
    leave();
  }
}

function performSelectedAction(action) {
  return new Promise((resolve, reject) => {
    switch (action) {
      case "Add Employee":
        addEmployee()
          .then(() => resolve())
          .catch((error) => reject(error));
        break;
      case "Update Employee Role":
        updateEmployeeRole()
          .then(() => resolve())
          .catch((error) => reject(error));
        break;
      case "View All Roles":
        viewTable("role");
        resolve();
        break;
      case "Add Role":
        addRole()
          .then(() => resolve())
          .catch((error) => reject(error));
        break;
      case "Add Department":
        // Add Department function
        resolve();
        break;
      case "View All Departments":
        viewTable("department");
        resolve();
        break;
      case "View All Employees":
        viewTable("employees");
        resolve();
        break;
      default:
        leave();
        resolve();
        break;
    }
  });
}

function departmentName() {
  inquirer.prompt([
    {
      type: "list",
      message: "Which department?: ",
      choices: ["Engineering", "Finance", "Legal", "Sales", "Service"],
      name: "department",
    },
  ]);
}

function updateEmployeeRole() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "Enter the ID of the employee whose role you want to update:",
        name: "employee_id",
      },
      {
        type: "input",
        message: "Enter the new role ID for the employee:",
        name: "role_id",
      },
    ])
    .then((answers) => {
      const { employee_id, role_id } = answers;
      const sql = `UPDATE employees SET role_id = ? WHERE employee_id = ?`;
      const params = [role_id, employee_id];

      db.query(sql, params, (err, result) => {
        if (err) {
          console.log({ error: err.message });
          return;
        }

        console.log({
          message: "Successfully updated employee role!",
        });
        leave();
      });
    })
    .catch((error) => {
      console.error("Error occurred:", error);
      leave();
    });
}

function leave() {
  db.end();

  process.exit(0);
}

init();
