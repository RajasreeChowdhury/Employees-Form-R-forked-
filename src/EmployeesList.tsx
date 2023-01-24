import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getAllEmployees, Employee } from "./api/employees";

const EmployeeList: React.FC<{}> = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);

  useEffect(() => {
    const fetchEmployees = async () => {
      const employees = await getAllEmployees();
      setEmployees(employees);
    };
    fetchEmployees();
  }, []);

  return (
    <div>
      <h1>Employee List</h1>
      <table border={1}>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Date of Birth</th>
            <th>Sex</th>
            <th>Blood Group</th>
            <th>Marital Status</th>
            <th>Children</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.id}>
              <td>{employee.firstName}</td>
              <td>{employee.lastName}</td>
              <td>{employee.dateOfBirth}</td>
              <td>{employee.sex}</td>
              <td>{employee.bloodGroup}</td>
              <td>{employee.maritalStatus.includes("Married") ? "Married" : "Single"}</td>
              <td>{employee.children}</td>
              <td>
                <Link to={`/edit-employee/${employee.id}`}>Update </Link>
                 | <Link to={`/view-employee/${employee.id}`}>Details</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <br />
      <Link to="/add-employee">Add Employee</Link>
    </div>
  );
};

export default EmployeeList;
