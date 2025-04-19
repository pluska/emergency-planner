import Card from '../components/ui/Card';
import { useAuth } from '../context/AuthContext';

const Profile = () => {
  const { user, profile, essentialInfo, loading, error } = useAuth();

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

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Not Logged In</strong>
          <span className="block sm:inline"> Please log in to view your profile.</span>
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
              <p className="mt-1 text-lg text-gray-900">{user.email}</p>
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
              <p className="mt-1 text-lg text-gray-900">{essentialInfo?.age_range}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Number of Dependents</label>
              <p className="mt-1 text-lg text-gray-900">{essentialInfo?.dependents_count}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Living Situation</label>
              <p className="mt-1 text-lg text-gray-900">{essentialInfo?.living_situation}</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Profile;
