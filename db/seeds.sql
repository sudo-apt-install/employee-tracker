USE employee_db;

INSERT INTO department (department_id, department_name)
VALUES
(140, "Engineering"),
(141, "Finance"),
(142, "Legal"),
(143, "Sales"),
(144, "Service");

INSERT INTO role (role_id, position_title, department_id)
VALUES
(1100, "Senior Engineer", 140),
(1101, "Sales Manager", 143),
(1102, "Senior Legal Specialist", 142),
(1103, "Accounting Manager", 141),
(1104, "Customer Service Manager", 144),
(1105, "Salesperson", 143),
(1106, "Customer Service Representative", 144);

INSERT INTO employees (employee_id, first_name, last_name, salary, manager_id)
VALUES
(1, "Lee", "Nover", 75000, 1000),
(2, "Amanda", "Mount", 115000, 1001),
(3, "Colin", "Forsecs", 75000, 1002),
(4, "Wayne", "Kerr", 95000, 1003),
(5, "Eaton", "Beever", 120000, 1004),
(6, "Betty", "Humter", 75000, 1005),
(7, "Anya", "Neeze", 55000, null),
(8, "Lou", "Briccant", 40000, null),
(9, "Oliver", "Clozeoff", 60000, null),
(10, "Luke", "Atmyaz", 50000, null),
(11, "Willie", "Beahardigan", 50000, null),
(12, "Wilma", "Fingerdoo", 65000, null),
(13, "Lou", "Sirr", 45000, null),
(14, "Mayai", "Tutchem", 40000, null),
(15, "Ollie", "Tabooger", 35000, null),
(16, "Phil", "Aysheo", 35000, null),
(17, "Eileen", "Ulik", 45000, null);
