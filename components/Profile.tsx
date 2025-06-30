import React, { useState, ChangeEvent, FormEvent } from 'react';

export interface ProfileProps {
  textColor: string;
}

export const Profile: React.FC<ProfileProps> = ({ textColor }) => {
  const [fullName, setFullName] = useState('Admin User');
  const [email, setEmail] = useState('admin@example.com');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [profilePicture, setProfilePicture] = useState<string | null>('https://randomuser.me/api/portraits/women/44.jpg');

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const fileUrl = URL.createObjectURL(e.target.files[0]);
      setProfilePicture(fileUrl);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Handle save changes logic here
    alert('Changes saved!');
  };

  return (
    <div className={`min-h-screen p-6 bg-gradient-to-r from-purple-700 to-blue-600 text-${textColor}`}>
      <h2 className="text-3xl font-bold mb-2">Profile Settings</h2>
      <p className="mb-6">Manage your account details and preferences.</p>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Profile Picture Section */}
        <div className="bg-purple-800 rounded-lg p-6 flex flex-col items-center">
          <h3 className="font-semibold mb-4 text-white">Profile Picture</h3>
          <img
            src={profilePicture || ''}
            alt="Profile"
            className="w-32 h-32 rounded-full object-cover mb-4"
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="text-sm text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-gray-700 file:text-white hover:file:bg-gray-600 cursor-pointer"
          />
        </div>

        {/* Personal Information and Change Password Section */}
        <div className="md:col-span-2 bg-purple-900 rounded-lg p-6 text-white flex flex-col justify-between">
          <div>
            <h3 className="font-semibold mb-4">Personal Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <label htmlFor="fullName" className="block text-sm font-semibold mb-1">
                  Full Name
                </label>
                <input
                  id="fullName"
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full rounded bg-purple-700 border border-purple-600 px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-semibold mb-1">
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded bg-purple-700 border border-purple-600 px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
            </div>

            <h3 className="font-semibold mb-4">Change Password</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="currentPassword" className="block text-sm font-semibold mb-1">
                  Current Password
                </label>
                <input
                  id="currentPassword"
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="w-full rounded bg-purple-700 border border-purple-600 px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <div>
                <label htmlFor="newPassword" className="block text-sm font-semibold mb-1">
                  New Password
                </label>
                <input
                  id="newPassword"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full rounded bg-purple-700 border border-purple-600 px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
            </div>
          </div>

          <div className="mt-6 flex justify-end">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded flex items-center space-x-2"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"></path>
              </svg>
              <span>Save Changes</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
