type Sex = "Male" | "Female" | "Others";
type BloodGroup = "A+" | "A-" | "B+" | "B-" | "O+" | "O-" | "AB+" | "AB-";
type MaritalStatus = "Single" | "Married";

interface Address {
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  zip: string;
}


export interface Employee {
  firstName: string;
  lastName: string;
  dateOfBirth: string; // formatted as yyyy-mm-dd
  sex: Sex;
  bloodGroup: BloodGroup;
  maritalStatus: MaritalStatus;
  children: number;
  id: number;
  currentAddress: Address;
  permanentAddress: Address;
}

export type EmployeeInput = Omit<Employee, "id">;

export type EmployeeUpdateInput = Partial<EmployeeInput>;

let employees: Employee[] = [
 {
  id: 1,
  firstName: "John",
  lastName: "Doe",
  dateOfBirth: "1990-01-01",
  sex: "Male",
  bloodGroup: "O+",
  maritalStatus: "Single",
  children: 0,
  currentAddress: {
      addressLine1: "123 Main St",
      city: "New York",
      state: "NY",
      zip: "10001",
    },
    permanentAddress: {
      addressLine1: "123 Main St",
      city: "New York",
      state: "NY",
      zip: "10001",
    },
},
{
  id: 2,
  firstName: "Jane",
  lastName: "Doe",
  dateOfBirth: "1995-01-01",
  sex: "Female",
  bloodGroup: "A+",
  maritalStatus: "Married",
  children: 2,
  currentAddress: {
      addressLine1: "123 Main St",
      city: "New York",
      state: "NY",
      zip: "10001",
    },
    permanentAddress: {
      addressLine1: "522 Main St",
      city: "New York",
      state: "NY",
      zip: "10002",
    },
}
];

// Mock API function to fetch all employees
export const getAllEmployees: () => Promise<Employee[]> = async () => {
  return new Promise((resolve) => {
    resolve(employees);
  });
};

// Mock API function to add a new employee
export const addEmployee: (input: EmployeeInput) => Promise<Employee> = async (
  employee
) => {
  return new Promise((resolve) => {
    // Generate a new ID for the employee
    const newEmployee = { id: employees.length + 1, ...employee };
    employees.push(newEmployee);
    resolve(newEmployee);
  });
};

// Mock API function to update an existing employee
export const updateEmployee: (
  id: number,
  update: EmployeeUpdateInput
) => Promise<Employee | null> = async (id, employee) => {
  return new Promise((resolve, reject) => {
    const index = employees.findIndex((e) => e.id === id);
    if (index === -1) {
      return reject(new Error("No such employee found"));
    }
    employees[index] = { ...employees[index], ...employee, id };
    resolve(employees[index]);
  });
};

// Mock API function to delete an existing employee
export const deleteEmployee: (id: number) => Promise<boolean> = async (id) => {
  return new Promise((resolve) => {
    employees = employees.filter((e) => e.id !== id);
    resolve(true);
  });
};

export const getEmployeeById: (id: number) => Promise<Employee | null> = async (id) => {
  return new Promise((resolve) => {
    const employee = employees.find((e) => e.id === id);
    if (!employee) {
      return resolve(null);
    }
    resolve(employee);
  });
};

