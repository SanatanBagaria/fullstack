import React, { useState, useEffect, useContext } from 'react';
import { userAPI } from '../../services/api';
import { AuthContext } from '../../context/AuthContext';
import UserStats from './UserStats';
import BadgeCollection from './BadgeCollection';

const UserProfile = () => {
  const { currentUser } = useContext(AuthContext);
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await userAPI.getProfile();
        console.log('Profile data received:', response.data);
        setProfileData(response.data.data);
      } catch (err) {
        console.error('Failed to fetch profile data:', err);
        // Use currentUser as fallback if API fails
        if (currentUser) {
          setProfileData(currentUser);
        } else {
          setError('Failed to load profile data');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, [currentUser]);

  if (loading) return <div className="p-4">Loading profile...</div>;
  if (error) return <div className="p-4 text-red-500">{error}</div>;
  if (!profileData) return <div className="p-4">Please log in to view your profile</div>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">My Profile</h2>
      <div className="bg-white rounded-lg p-6 mb-6 shadow-sm">
        <h3 className="text-xl font-bold mb-2">{profileData.name}</h3>
        <p className="text-gray-600">{profileData.email}</p>
      </div>
      
      <UserStats user={profileData} /> {/* Changed from stats to user */}
      <BadgeCollection badges={profileData.badges || []} />
    </div>
  );
};

export default UserProfile;
