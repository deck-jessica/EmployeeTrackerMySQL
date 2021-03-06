ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '';

DROP DATABASE IF EXISTS company_db;

CREATE DATABASE company_db;
USE company_db;


CREATE TABLE department (
id INT NOT NULL AUTO_INCREMENT, 
deptName VARCHAR(30) NOT NULL, 
PRIMARY KEY (id)
);

CREATE TABLE role (
id INT NOT NULL AUTO_INCREMENT, 
title VARCHAR(30) NOT NULL, 
salary DECIMAL (10,2) NOT NULL,
department_id INT NOT NULL, 
PRIMARY KEY (id)
);

CREATE TABLE employee (
id INT NOT NULL AUTO_INCREMENT, 
firstName VARCHAR(30) NULL,
lastName VARCHAR(30) NULL,
roleId INT NULL,
managerId INT NULL,
PRIMARY KEY (id)
);