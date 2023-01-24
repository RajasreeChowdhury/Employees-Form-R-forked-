import React from 'react';
import EmployeeForm from './EmployeeForm';
import {addEmployee, EmployeeInput} from './api/employees';
import {useNavigate} from 'react-router-dom';

export default function AddEmployeeForm(): JSX.Element {
  const navigate = useNavigate();
  const handleSubmit = async (employee: EmployeeInput) => {
    await addEmployee(employee);
    navigate('/');
  };
  
  return (
    <div>
      <h2>Add Employee</h2>
      <EmployeeForm onSubmit={handleSubmit}/>
    </div>
  );
}
