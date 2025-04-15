import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DesignersPage = () => {
  const [designers, setDesigners] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    contact_no: ''
  });
  const [editing, setEditing] = useState(null);

  const fetchDesigners = async () => {
    try {
      const res = await axios.get('http://localhost:3000/api/designers');
      setDesigners(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchDesigners();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editing) {
        await axios.put(`http://localhost:3000/api/designers/${editing}`, formData);
      } else {
        await axios.post('http://localhost:3000/api/designers', formData);
      }
      setFormData({ name: '', address: '', contact_no: '' });
      setEditing(null);
      fetchDesigners();
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (designer) => {
    setEditing(designer.designer_id);
    setFormData({
      name: designer.name,
      address: designer.address,
      contact_no: designer.contact_no
    });
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/designers/${id}`);
      fetchDesigners();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-4 bg-gray-100 rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Designers</h1>
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
        <button
          type="submit"
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          {editing ? "Update Designer" : "Add Designer"}
        </button>
      </form>
      <ul className="space-y-2">
        {designers.map(designer => (
          <li key={designer.designer_id} className="bg-white p-4 rounded flex justify-between items-center shadow-sm">
            <span className="text-gray-800">{designer.name} - {designer.address}</span>
            <div className="space-x-2">
              <button
                onClick={() => handleEdit(designer)}
                className="bg-yellow-500 text-white py-1 px-2 rounded hover:bg-yellow-600"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(designer.designer_id)}
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

export default DesignersPage;
