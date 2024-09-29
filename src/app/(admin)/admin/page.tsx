import React from 'react'

export default function page() {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Welcome to the Admin Dashboard</h2>
      <p className="text-gray-700 mb-4">Here you can manage your application settings, users, and more.</p>

      {/* Example Content Sections */}
      <section className="bg-white p-4 rounded shadow mb-4">
        <h3 className="text-lg font-semibold mb-2">User Statistics</h3>
        <p className="text-gray-600">Total Users: 150</p>
        <p className="text-gray-600">Active Users: 120</p>
        <p className="text-gray-600">Inactive Users: 30</p>
      </section>

      <section className="bg-white p-4 rounded shadow mb-4">
        <h3 className="text-lg font-semibold mb-2">Recent Activity</h3>
        <ul className="list-disc pl-5 text-gray-600">
          <li>User John Doe logged in.</li>
          <li>User Jane Smith updated their profile.</li>
          <li>User Alex Brown signed up.</li>
        </ul>
      </section>

      <section className="bg-white p-4 rounded shadow mb-4">
        <h3 className="text-lg font-semibold mb-2">Settings Overview</h3>
        <p className="text-gray-600">Manage your application settings below:</p>
        <ul className="list-inside list-disc text-gray-600">
          <li><a href="#" className="text-blue-500 hover:underline">Update Profile</a></li>
          <li><a href="#" className="text-blue-500 hover:underline">Change Password</a></li>
          <li><a href="#" className="text-blue-500 hover:underline">Notification Settings</a></li>
        </ul>
      </section>
    </div>
  )
}
