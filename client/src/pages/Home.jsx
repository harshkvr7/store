import React, { useState } from 'react';
import { Building, ShoppingBag, Users, User, Pencil, MessageCircle } from 'lucide-react';

export default function GarmentStoreManagement() {
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Complaint submitted successfully!');
    setEmail('');
    setSubject('');
    setDescription('');
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header Section */}
      <header className="bg-blue-600 text-white p-8 text-center">
        <h1 className="text-3xl font-bold mb-2">Garment Store Management</h1>
        <p className="mb-6">A comprehensive solution for managing all aspects of your garment business</p>
        <button className="bg-white text-blue-600 px-4 py-2 rounded hover:bg-gray-100 transition-colors">
          Enter Application
        </button>
      </header>

      {/* Key Features Section */}
      <section className="py-10 px-4">
        <h2 className="text-2xl font-bold text-center mb-8">Key Features</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-6xl mx-auto">
          {/* Feature 1 */}
          <div className="bg-gray-50 p-6 rounded text-center">
            <div className="flex justify-center mb-4">
              <Building className="text-blue-600" size={28} />
            </div>
            <h3 className="font-bold mb-2">Branch Management</h3>
            <p className="text-sm text-gray-600">Manage multiple store locations with detailed information.</p>
          </div>

          {/* Feature 2 */}
          <div className="bg-gray-50 p-6 rounded text-center">
            <div className="flex justify-center mb-4">
              <ShoppingBag className="text-blue-600" size={28} />
            </div>
            <h3 className="font-bold mb-2">Inventory Control</h3>
            <p className="text-sm text-gray-600">Track all clothing items, their stock levels and prices.</p>
          </div>

          {/* Feature 3 */}
          <div className="bg-gray-50 p-6 rounded text-center">
            <div className="flex justify-center mb-4">
              <Users className="text-blue-600" size={28} />
            </div>
            <h3 className="font-bold mb-2">Customer Relations</h3>
            <p className="text-sm text-gray-600">Maintain customer profiles and purchase history.</p>
          </div>

          {/* Feature 4 */}
          <div className="bg-gray-50 p-6 rounded text-center">
            <div className="flex justify-center mb-4">
              <User className="text-blue-600" size={28} />
            </div>
            <h3 className="font-bold mb-2">Employee Management</h3>
            <p className="text-sm text-gray-600">Track employee information, roles and schedule.</p>
          </div>

          {/* Feature 5 */}
          <div className="bg-gray-50 p-6 rounded text-center">
            <div className="flex justify-center mb-4">
              <Pencil className="text-blue-600" size={28} />
            </div>
            <h3 className="font-bold mb-2">Designer Collaboration</h3>
            <p className="text-sm text-gray-600">Work with designers to create new styles.</p>
          </div>

          {/* Feature 6 */}
          <div className="bg-gray-50 p-6 rounded text-center">
            <div className="flex justify-center mb-4">
              <MessageCircle className="text-blue-600" size={28} />
            </div>
            <h3 className="font-bold mb-2">Complaint Handling</h3>
            <p className="text-sm text-gray-600">Efficiently manage customer complaints and feedback.</p>
          </div>
        </div>
      </section>

      {/* Customer Support Section */}
      <section className="py-10 px-4 bg-gray-50">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-4">Customer Support</h2>
          <p className="text-center mb-8">We value your feedback. If you have any complaints or suggestions, please let us know.</p>
          
          {/* Complaint Form */}
          <div className="bg-white p-6 rounded shadow">
            <h3 className="font-bold text-lg text-center mb-4">Submit a Complaint</h3>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm mb-1">Email Address</label>
                <input 
                  type="email" 
                  className="w-full p-2 border rounded" 
                  placeholder="your.email@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-sm mb-1">Complaint Subject</label>
                <input 
                  type="text" 
                  className="w-full p-2 border rounded" 
                  placeholder="Brief subject of your complaint"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  required
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-sm mb-1">Complaint Description</label>
                <textarea 
                  className="w-full p-2 border rounded" 
                  rows="4" 
                  placeholder="Please provide details about your complaint..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
              </div>
              
              <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors">
                Submit Complaint
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white p-6 mt-auto">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <div>
            <h3 className="font-bold">Garment Store Management</h3>
            <p className="text-sm">© 2025 All Rights Reserved</p>
          </div>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="#" className="hover:text-gray-300">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
            </a>
            <a href="#" className="hover:text-gray-300">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path></svg>
            </a>
            <a href="#" className="hover:text-gray-300">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
            </a>
            <a href="#" className="hover:text-gray-300">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}