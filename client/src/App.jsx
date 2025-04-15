import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import BranchesPage from "./pages/BranchesPage";
import ClothesPage from "./pages/ClothesPage";
import ComplaintsPage from "./pages/ComplaintsPage";
import CustomersPage from "./pages/CustomersPage";
import DesignersPage from "./pages/DesignersPage";
import EmployeesPage from "./pages/EmployeesPage";
import HomePage from "./pages/Home"

function App() {
  return (
    <Router>
      <nav className="bg-gray-800 p-4 shadow-md">
        <ul className="flex justify-center space-x-6">
          <li>
            <Link to="/branches" className="text-white font-medium hover:text-gray-300">
              Branches
            </Link>
          </li>
          <li>
            <Link to="/clothes" className="text-white font-medium hover:text-gray-300">
              Clothes
            </Link>
          </li>
          <li>
            <Link to="/complaints" className="text-white font-medium hover:text-gray-300">
              Complaints
            </Link>
          </li>
          <li>
            <Link to="/customers" className="text-white font-medium hover:text-gray-300">
              Customers
            </Link>
          </li>
          <li>
            <Link to="/designers" className="text-white font-medium hover:text-gray-300">
              Designers
            </Link>
          </li>
          <li>
            <Link to="/employees" className="text-white font-medium hover:text-gray-300">
              Employees
            </Link>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path="/branches" element={<BranchesPage />} />
        <Route path="/clothes" element={<ClothesPage />} />
        <Route path="/complaints" element={<ComplaintsPage />} />
        <Route path="/customers" element={<CustomersPage />} />
        <Route path="/designers" element={<DesignersPage />} />
        <Route path="/employees" element={<EmployeesPage />} />
        <Route path="/" element={<HomePage />} /> 
      </Routes>
    </Router>
  );
}

export default App;
