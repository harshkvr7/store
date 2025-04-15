import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ClothesPage = () => {
  const [clothes, setClothes] = useState([]);
  const [formData, setFormData] = useState({
    type: '',
    fabric: '',
    colour: '',
    size: '',
    price: '',
    mfd: '',
    sold_date: '',
    designer_id: '',
    branch_id: '',
    customer_id: '',
  });
  const [editing, setEditing] = useState(null);

  const fetchClothes = async () => {
    try {
      const res = await axios.get('http://localhost:3000/api/clothes');
      setClothes(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchClothes();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editing) {
        await axios.put(`http://localhost:3000/api/clothes/${editing}`, formData);
      } else {
        await axios.post('http://localhost:3000/api/clothes', formData);
      }
      setFormData({
        type: '',
        fabric: '',
        colour: '',
        size: '',
        price: '',
        mfd: '',
        sold_date: '',
        designer_id: '',
        branch_id: '',
        customer_id: '',
      });
      setEditing(null);
      fetchClothes();
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (cloth) => {
    setEditing(cloth.cloth_id);
    setFormData({
      type: cloth.type,
      fabric: cloth.fabric,
      colour: cloth.colour,
      size: cloth.size,
      price: cloth.price,
      mfd: cloth.mfd,
      sold_date: cloth.sold_date,
      designer_id: cloth.designer_id,
      branch_id: cloth.branch_id,
      customer_id: cloth.customer_id,
    });
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/clothes/${id}`);
      fetchClothes();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-4 bg-gray-100 rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Clothes</h1>
      <form onSubmit={handleSubmit} className="mb-6 space-y-4">
        <div>
          <input
            type="text"
            name="type"
            placeholder="Type"
            value={formData.type}
            onChange={handleChange}
            required
            className="border border-gray-300 rounded p-2 w-full"
          />
        </div>
        <div>
          <input
            type="text"
            name="fabric"
            placeholder="Fabric"
            value={formData.fabric}
            onChange={handleChange}
            required
            className="border border-gray-300 rounded p-2 w-full"
          />
        </div>
        <div>
          <input
            type="text"
            name="colour"
            placeholder="Colour"
            value={formData.colour}
            onChange={handleChange}
            required
            className="border border-gray-300 rounded p-2 w-full"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            name="size"
            placeholder="Size"
            value={formData.size}
            onChange={handleChange}
            required
            className="border border-gray-300 rounded p-2"
          />
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={formData.price}
            onChange={handleChange}
            required
            className="border border-gray-300 rounded p-2"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <input
            type="date"
            name="mfd"
            placeholder="Manufacture Date"
            value={formData.mfd}
            onChange={handleChange}
            required
            className="border border-gray-300 rounded p-2"
          />
          <input
            type="date"
            name="sold_date"
            placeholder="Sold Date"
            value={formData.sold_date}
            onChange={handleChange}
            required
            className="border border-gray-300 rounded p-2"
          />
        </div>
        <div className="grid grid-cols-3 gap-4">
          <input
            type="number"
            name="designer_id"
            placeholder="Designer ID"
            value={formData.designer_id}
            onChange={handleChange}
            required
            className="border border-gray-300 rounded p-2"
          />
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
            name="customer_id"
            placeholder="Customer ID"
            value={formData.customer_id}
            onChange={handleChange}
            required
            className="border border-gray-300 rounded p-2"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          {editing ? 'Update Cloth' : 'Add Cloth'}
        </button>
      </form>
      <ul className="space-y-2">
        {clothes.map(cloth => (
          <li key={cloth.cloth_id} className="bg-white p-4 rounded flex justify-between items-center shadow-sm">
            <span className="text-gray-800">{cloth.type} - {cloth.fabric} - {cloth.colour}</span>
            <div className="space-x-2">
              <button onClick={() => handleEdit(cloth)} className="bg-yellow-500 text-white py-1 px-2 rounded hover:bg-yellow-600">
                Edit
              </button>
              <button onClick={() => handleDelete(cloth.cloth_id)} className="bg-red-500 text-white py-1 px-2 rounded hover:bg-red-600">
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ClothesPage;
