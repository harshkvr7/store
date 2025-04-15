// BranchesPage.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BranchesPage = () => {
  const [branches, setBranches] = useState([]);
  const [formData, setFormData] = useState({
    branch_name: '',
    contact_no: '',
    manager: ''
  });
  const [editing, setEditing] = useState(null);

  const fetchBranches = async () => {
    try {
      const res = await axios.get('http://localhost:3000/api/branches');
      setBranches(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchBranches();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editing) {
        await axios.put(`http://localhost:3000/api/branches/${editing}`, formData);
      } else {
        await axios.post('http://localhost:3000/api/branches', formData);
      }
      setFormData({ branch_name: '', contact_no: '', manager: '' });
      setEditing(null);
      fetchBranches();
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (branch) => {
    setEditing(branch.branch_id);
    setFormData({
      branch_name: branch.branch_name,
      contact_no: branch.contact_no,
      manager: branch.manager
    });
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/branches/${id}`);
      fetchBranches();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-4 bg-gray-100 rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Branches</h1>
      <form onSubmit={handleSubmit} className="mb-6 space-y-4">
        <div>
          <input
            type="text"
            name="branch_name"
            placeholder="Branch Name"
            value={formData.branch_name}
            onChange={handleChange}
            required
            className="border border-gray-300 rounded p-2 w-full"
          />
        </div>
        <div>
          <input
            type="text"
            name="contact_no"
            placeholder="Contact No"
            value={formData.contact_no}
            onChange={handleChange}
            required
            className="border border-gray-300 rounded p-2 w-full"
          />
        </div>
        <div>
          <input
            type="text"
            name="manager"
            placeholder="Manager"
            value={formData.manager}
            onChange={handleChange}
            required
            className="border border-gray-300 rounded p-2 w-full"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          {editing ? 'Update Branch' : 'Add Branch'}
        </button>
      </form>
      <ul className="space-y-2">
        {branches.map((branch) => (
          <li
            key={branch.branch_id}
            className="bg-white p-4 rounded flex justify-between items-center shadow-sm"
          >
            <span className="text-gray-800">
              {branch.branch_name} - {branch.contact_no} - {branch.manager}
            </span>
            <div className="space-x-2">
              <button
                onClick={() => handleEdit(branch)}
                className="bg-yellow-500 text-white py-1 px-2 rounded hover:bg-yellow-600"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(branch.branch_id)}
                className="bg-red-500 text-white py-1 px-2 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BranchesPage;
