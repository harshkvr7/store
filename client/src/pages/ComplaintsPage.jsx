import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ComplaintsPage = () => {
  const [complaints, setComplaints] = useState([]);
  const [formData, setFormData] = useState({
    customer_id: '',
    description: '',
    complaint_date: '',
    solution: ''
  });
  const [editing, setEditing] = useState(null);

  const fetchComplaints = async () => {
    try {
      const res = await axios.get('http://localhost:3000/api/complaints');
      setComplaints(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editing) {
        await axios.put(`http://localhost:3000/api/complaints/${editing}`, formData);
      } else {
        await axios.post('http://localhost:3000/api/complaints', formData);
      }
      setFormData({ customer_id: '', description: '', complaint_date: '', solution: '' });
      setEditing(null);
      fetchComplaints();
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (complaint) => {
    setEditing(complaint.complaint_id);
    setFormData({
      customer_id: complaint.customer_id,
      description: complaint.description,
      complaint_date: complaint.complaint_date,
      solution: complaint.solution
    });
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/complaints/${id}`);
      fetchComplaints();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-4 bg-gray-100 rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Complaints</h1>
      <form onSubmit={handleSubmit} className="mb-6 space-y-4">
        <div>
          <input
            type="number"
            name="customer_id"
            placeholder="Customer ID"
            value={formData.customer_id}
            onChange={handleChange}
            required
            className="border border-gray-300 rounded p-2 w-full"
          />
        </div>
        <div>
          <input
            type="text"
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            required
            className="border border-gray-300 rounded p-2 w-full"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <input
            type="date"
            name="complaint_date"
            placeholder="Complaint Date"
            value={formData.complaint_date}
            onChange={handleChange}
            required
            className="border border-gray-300 rounded p-2"
          />
          <input
            type="text"
            name="solution"
            placeholder="Solution"
            value={formData.solution}
            onChange={handleChange}
            required
            className="border border-gray-300 rounded p-2"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          {editing ? 'Update Complaint' : 'Add Complaint'}
        </button>
      </form>
      <ul className="space-y-2">
        {complaints.map(complaint => (
          <li key={complaint.complaint_id} className="bg-white p-4 rounded flex justify-between items-center shadow-sm">
            <span className="text-gray-800">{complaint.description} (Customer ID: {complaint.customer_id})</span>
            <div className="space-x-2">
              <button onClick={() => handleEdit(complaint)} className="bg-yellow-500 text-white py-1 px-2 rounded hover:bg-yellow-600">
                Edit
              </button>
              <button onClick={() => handleDelete(complaint.complaint_id)} className="bg-red-500 text-white py-1 px-2 rounded hover:bg-red-600">
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ComplaintsPage;
