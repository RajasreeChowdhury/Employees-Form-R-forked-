import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getEmployeeById, updateEmployee } from "./api/employees";
import EmployeeForm from "./EmployeeForm";
import { useNavigate } from 'react-router-dom';

export default function EditEmployee(): JSX.Element {
  const {id} = useParams();
  const [employee, setEmployee] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmployee = async () => {
      const employee = await getEmployeeById(parseInt(id));
      setEmployee(employee);
    };
    fetchEmployee();
  },[id]);

  const handleSubmit = async (employeeUpdate: EmployeeUpdateInput) => {
    await updateEmployee(parseInt(id), employeeUpdate);
    navigate('/');
  };

  return (
    <div>
      <h2>Update Employee</h2>
      {employee ? (
        <EmployeeForm onSubmit={handleSubmit} employee={employee} />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
