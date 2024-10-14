import React, { useState } from 'react';
import firebase from '../firebase/firebase.config';
import 'firebase/auth';

const PasswordUpdate = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);

  const handleUpdatePassword = async () => {
    try {
      const user = firebase.auth().currentUser;
      if (newPassword !== confirmPassword) {
        setError('Passwords do not match');
        return;
      }
      await user.updatePassword(newPassword);
      setError(null);
      alert('Password updated successfully!');
    } catch (error) {
      setError(error.message);
      alert('Not updated !');

    }
  };

  return (
    <div className="max-w-md mx-auto p-4 pt-6">
      <h1 className="text-2xl font-bold mb-4">Update Password</h1>
      <form>
        <label className="block mb-2">
          New Password:
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full p-2 pl-10 text-sm text-gray-700"
          />
        </label>
        <label className="block mb-2">
          Confirm Password:
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full p-2 pl-10 text-sm text-gray-700"
          />
        </label>
        {error && (
          <div className="text-red-500 text-sm mb-2">{error}</div>
        )}
        <button
          className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleUpdatePassword}
        >
          Update Password
        </button>
      </form>
    </div>
  );
};

export default PasswordUpdate;