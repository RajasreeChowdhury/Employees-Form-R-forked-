import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getEmployeeById, Employee as EmployeeType } from './api/employees';

interface Params {
  id: string;
}
const EmployeeDetail: React.FC = () => {
  const { id } = useParams<Params>();
  const [employee, setEmployee] = useState<EmployeeType | null>(null);
  useEffect(() => {
    const fetchEmployee = async () => {
      const employee = await getEmployeeById(Number(id));
      setEmployee(employee);
    };
    fetchEmployee();
  }, [id]);

  if (!employee) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <h1>Employee Details</h1>
      <p>First Name: {employee.firstName}</p>
      <p>Last Name: {employee.lastName}</p>
      <p>Date of Birth: {employee.dateOfBirth}</p>
      <p>Sex: {employee.sex}</p>
      <p>Blood Group: {employee.bloodGroup}</p>
      <p>Marital Status: {employee.maritalStatus}</p>
      <p>Children: {employee.children}</p>
      <h2>Current Address</h2>
      <p>Address Line 1: {employee.currentAddress.addressLine1}</p>
      {employee.currentAddress.addressLine2 && <p>Address Line 2: {employee.currentAddress.addressLine2}</p>}
      <p>City: {employee.currentAddress.city}</p>
      <p>State: {employee.currentAddress.state}</p>
      <p>Zip: {employee.currentAddress.zip}</p>
      <h2>Permanent Address</h2>
      <p>Address Line 1: {employee.permanentAddress.addressLine1}</p>
      {employee.permanentAddress.addressLine2 && <p>Address Line 2: {employee.permanentAddress.addressLine2}</p>}
      <p>City: {employee.permanentAddress.city}</p>
      <p>State: {employee.permanentAddress.state}</p>
      <p>Zip: {employee.permanentAddress.zip}</p> 
      <h2>Dependants</h2>
      {employee.dependants.length > 0?(
        <ul>
          {employee.dependants.map((dependant, index) => (
            <li key={index}>
              <h3>Dependant {index + 1}</h3>
              <p>First Name: {dependant.firstName}</p>
              <p>Last Name: {dependant.lastName}</p>
              <p>Date of Birth: {dependant.dateOfBirth}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No dependants</p>
      )}
    </div>
  );
};

export default EmployeeDetail;
