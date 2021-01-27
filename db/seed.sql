INSERT INTO employee (firstName, lastName, roleId, managerId) 
VALUES
("Niki", "C", 1, null),
("Jon", "G", 2, 1),
("Chris", "H", 2, 1),
("Austin", "McLeod", 2, 1),
("Jon", "Saunders", 3, 6),
("Michel", "Cheng", 4, null),
("Dave", "Rubin", 5, null);


INSERT INTO department (deptName) 
VALUES
    ("Engineering"),
    ("Executive"),
    ("Information Technology"),
    ("Legal"),
    ("Accounting"),
    ("Marketing"),
    ("Human Relations");

    INSERT INTO role (title, salary, department_id)
VALUES 
    ("Senior Software Engineer", 130000, 1),
    ("Junior Engineer", 85000, 1),
    ("CEO", 100000, 2),
    ("Database Administrator", 95000, 3),
    ("Lawyer", 180000, 4),
    ("Accounts R/P", 47000, 5),
    ("Social Media", 50000, 6),
    ("HR", 130000, 7);