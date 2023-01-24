import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import EmployeesList from "./EmployeesList";
import AddEmployee from "./AddEmployee";
import EditEmployee from "./EditEmployee";
import EmployeeDetail from "./EmployeeDetail";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<EmployeesList />} />
          <Route path="/add-employee" element={<AddEmployee />} />
          <Route path="/edit-employee/:id" element={<EditEmployee />} />
          <Route path="/view-employee/:id" element={<EmployeeDetail />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
