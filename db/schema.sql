DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;

USE employee_db;

CREATE TABLE employees (
    employee_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    salary INT NOT NULL,
    manager_id INT
);

CREATE TABLE department (
    department_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    department_name VARCHAR(30) NOT NULL
);

CREATE TABLE role (
    role_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    position_title VARCHAR(30) NOT NULL,
    department_id INT NOT NULL,
    FOREIGN KEY (department_id) REFERENCES department(department_id)
);


INSERT INTO department (department_id, department_name)
VALUES
(100, "Engineering"),
(101, "Finance"),
(102, "Legal"),
(103, "Sales"),
(104, "Service");

INSERT INTO role (role_id, position_title, department_id)
VALUES
(1100, "Senior Engineer", 100),
(1101, "Sales Manager", 103),
(1102, "Senior Legal Specialist", 102),
(1103, "Accounting Manager", 101),
(1104, "Customer Service Manager", 104),
(1105, "Salesperson", 103),
(1106, "Customer Service Representative", 104);


INSERT INTO employees (employee_id, first_name, last_name, salary, manager_id)
VALUES
(1, "Lee", "Nover", 60000, 1000),
(2, "Amanda", "Mount", 80000, 1001),
(3, "Colin", "Forsecs", 75000, 1002),
(4, "Wayne", "Kerr", 95000, 1003),
(5, "Eaton", "Beever", 82000, 1004),
(6, "Betty", "Humter", 60000, 1005);
