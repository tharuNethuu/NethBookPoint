import React, { useState, useEffect } from 'react';
import firebase from '../firebase/firebase.config';
import 'firebase/auth';

const EditProfile = ({ user }) => {
  const [newEmail, setNewEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [error, setError] = useState(null);

  const handleUpdateProfile = async () => {
    try {
      if (newEmail) {
        await user.updateEmail(newEmail);
      }
      if (newPassword) {
        await user.updatePassword(newPassword);
      }
      setError(null);
      alert('Profile updated successfully!');
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 pt-6">
      <h1 className="text-2xl font-bold mb-4">Edit Profile for {user.email}</h1>
      <form>
        <label className="block mb-2">
          New Email:
          <input
            type="email"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
            className="w-full p-2 pl-10 text-sm text-gray-700"
          />
        </label>
        <label className="block mb-2">
          New Password:
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full p-2 pl-10 text-sm text-gray-700"
          />
        </label>
        {error && (
          <div className="text-red-500 text-sm mb-2">{error}</div>
        )}
        <button
          className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleUpdateProfile}
        >
          Update Profile
        </button>
      </form>
    </div>
  );
};

const App = () => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setCurrentUser(user);
      } else {
        setCurrentUser(null);
      }
    });
  }, []);

  return (
    <div>
      {currentUser && (
        <EditProfile user={currentUser} />
      )}
    </div>
  );
};

export default App;