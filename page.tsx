"use client";

import { useEffect, useState } from 'react';

export default function ProfilePage() {
  const [user, setUser] = useState({ name: '', email: '', age: '', location: '' });
  const [email, setEmail] = useState('');

  useEffect(() => {
    if (email) {
      fetch(`/api/profile?email=${email}`)
        .then((res) => res.json())
        .then((data) => setUser(data));
    }
  }, [email]);

  const handleUpdate = async () => {
    await fetch('/api/profile', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user),
    });

    alert('Profile updated successfully!');
  };

  return (
    <div className="max-w-md mx-auto p-4 border rounded">
      <h2 className="text-xl font-bold mb-4">User Profile</h2>
      
      <input
        type="email"
        placeholder="Enter Email to Fetch Profile"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border p-2 w-full mb-2"
      />
      
      <button onClick={() => setEmail(email)} className="bg-blue-500 text-white p-2 w-full mb-4">
        Load Profile
      </button>

      <input
        type="text"
        placeholder="Name"
        value={user.name}
        onChange={(e) => setUser({ ...user, name: e.target.value })}
        className="border p-2 w-full mb-2"
      />
      <input
        type="number"
        placeholder="Age"
        value={user.age}
        onChange={(e) => setUser({ ...user, age: (e.target.value) })}
        className="border p-2 w-full mb-2"
      />
      <input
        type="text"
        placeholder="Location"
        value={user.location}
        onChange={(e) => setUser({ ...user, location: e.target.value })}
        className="border p-2 w-full mb-2"
      />

      <button onClick={handleUpdate} className="bg-green-500 text-white p-2 w-full">
        Update Profile
      </button>
    </div>
  );
}
