INSERT INTO departments (department_name)
VALUES
  ('Sales'),
  ('Engineering'),
  ('Research & Development'),
  ('Accounting'),
  ('Human Resources');

INSERT INTO roles (title, salary, department_id)
VALUES
  ('Engineer', 80000.00 , 2),
  ('Field Analyst', 65000.00, 3),
  ('Finance Advisor', 57000.00, 1),
  ('Receptionist', 45000.00, 5),
  ('Manager', 100000.00, 4);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES
  ('Ronald', 'Firbank', 3, 5),
  ('Virginia', 'Woolf', 2, 5),
  ('Piers', 'Gaveston', 4, 5),
  ('Charles', 'LeRoi', 1, 5),
  ('Katherine', 'Mansfield', 5, NULL);
  