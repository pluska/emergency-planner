import { useEffect, useState } from 'react';
import Card from '../components/ui/Card';
import { getProfile, getFormInformation } from '../services/profile';
import type { Profile, FormInformation } from '../types/profile';

const Profile = () => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [formInfo, setFormInfo] = useState<FormInformation | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // TODO: Replace with actual user ID from auth context
        const userId = 1;
        const [profileData, formData] = await Promise.all([
          getProfile(userId),
          getFormInformation(userId)
        ]);
        setProfile(profileData);
        setFormInfo(formData);
      } catch (err) {
        setError('Failed to load profile data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
          <div className="space-y-6">
            <div className="h-40 bg-gray-200 rounded"></div>
            <div className="h-40 bg-gray-200 rounded"></div>
            <div className="h-40 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Error!</strong>
          <span className="block sm:inline"> {error}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-header font-bold text-gray-800 mb-8">Profile</h1>
      
      <div className="space-y-6">
        {/* Personal Information Card */}
        <Card title="Personal Information">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <p className="mt-1 text-lg text-gray-900">
                {profile?.first_name} {profile?.last_name}
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <p className="mt-1 text-lg text-gray-900">{profile?.email}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Phone</label>
              <p className="mt-1 text-lg text-gray-900">{profile?.phone_number}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Address</label>
              <p className="mt-1 text-lg text-gray-900">{profile?.address}</p>
            </div>
          </div>
        </Card>

        {/* Form Information Card */}
        <Card title="Additional Information">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Age Range</label>
              <p className="mt-1 text-lg text-gray-900">{formInfo?.age_range}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Number of Dependents</label>
              <p className="mt-1 text-lg text-gray-900">{formInfo?.dependents_count}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Living Situation</label>
              <p className="mt-1 text-lg text-gray-900">{formInfo?.living_situation}</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Profile;
