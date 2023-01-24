# Requirements

1. The HR department of a company needs to have a dashboard. This dashboard will provide a central location for the HR department to manage employee information efficiently. 
2. The first screen displays a list of employees with their personal details such as First Name, Last Name, Date of Birth, Sex, Blood Group, Marital Status and Children. All these fields are mandatory. 
3. The HR should be able to add a new employee to the list or modify an existing employee's details. 

## Technical Requirements

1. A mock api is built for to get, add, end edit employees.
2. A screen to display the employees list is also provided.
3. You have to add routing to display the screens to add or edit an employee.
4. Add employee form should have the following fields.
* firstName: TextField
* lastName: TextField
* dateOfBirth: DateField // formatted as yyyy-mm-dd
* sex: Radio buttons for `Male`, `Female`, `Others`
* bloodGroup: Dropdown for all known blood groups
* maritalStatus: Checkbox to be selected if married;
* children: TextField to enter number of children;
5. All the fields should be mandatory and have appropriate validations.
