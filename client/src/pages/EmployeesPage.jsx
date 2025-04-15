import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EmployeesPage = () => {
  const [employees, setEmployees] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    designation: '',
    contact_no: '',
    branch_id: '',
    salary: ''
  });
  const [editing, setEditing] = useState(null);

  const fetchEmployees = async () => {
    try {
      const res = await axios.get('http://localhost:3000/api/employees');
      setEmployees(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editing) {
        await axios.put(`http://localhost:3000/api/employees/${editing}`, formData);
      } else {
        await axios.post('http://localhost:3000/api/employees', formData);
      }
      setFormData({
        name: '',
        address: '',
        designation: '',
        contact_no: '',
        branch_id: '',
        salary: ''
      });
      setEditing(null);
      fetchEmployees();
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (employee) => {
    setEditing(employee.employee_id);
    setFormData({
      name: employee.name,
      address: employee.address,
      designation: employee.designation,
      contact_no: employee.contact_no,
      branch_id: employee.branch_id,
      salary: employee.salary
    });
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/employees/${id}`);
      fetchEmployees();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-4 bg-gray-100 rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Employees</h1>
      <form onSubmit={handleSubmit} className="mb-6 space-y-4">
        <div>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="border border-gray-300 rounded p-2 w-full"
          />
        </div>
        <div>
          <input
            type="text"
            name="address"
            placeholder="Address"
            value={formData.address}
            onChange={handleChange}
            required
            className="border border-gray-300 rounded p-2 w-full"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            name="designation"
            placeholder="Designation"
            value={formData.designation}
            onChange={handleChange}
            required
            className="border border-gray-300 rounded p-2"
          />
          <input
            type="text"
            name="contact_no"
            placeholder="Contact No"
            value={formData.contact_no}
            onChange={handleChange}
            required
            className="border border-gray-300 rounded p-2"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <input
            type="number"
            name="branch_id"
            placeholder="Branch ID"
            value={formData.branch_id}
            onChange={handleChange}
            required
            className="border border-gray-300 rounded p-2"
          />
          <input
            type="number"
            name="salary"
            placeholder="Salary"
            value={formData.salary}
            onChange={handleChange}
            required
            className="border border-gray-300 rounded p-2"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          {editing ? 'Update Employee' : 'Add Employee'}
        </button>
      </form>
      <ul className="space-y-2">
        {employees.map(employee => (
          <li key={employee.employee_id} className="bg-white p-4 rounded flex justify-between items-center shadow-sm">
            <span className="text-gray-800">{employee.name} - {employee.designation}</span>
            <div className="space-x-2">
              <button onClick={() => handleEdit(employee)} className="bg-yellow-500 text-white py-1 px-2 rounded hover:bg-yellow-600">
                Edit
              </button>
              <button onClick={() => handleDelete(employee.employee_id)} className="bg-red-500 text-white py-1 px-2 rounded hover:bg-red-600">
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EmployeesPage;
