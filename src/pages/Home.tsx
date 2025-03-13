import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="min-h-screen bg-secondary p-8">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-header font-bold text-primary mb-6">
          Welcome to the Emergency Planner
        </h1>
        <p className="text-lg md:text-xl font-body text-gray-700 mb-12">
          Create your personalized emergency plan to stay prepared for any situation.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Link to="/plan?type=emergency-bagpack">
            <button className="w-full py-4 px-6 bg-third hover:bg-third/90 text-white font-header font-semibold rounded-lg transition-colors duration-200">
              Emergency Bagpack
            </button>
          </Link>
          <Link to="/plan?type=storage">
            <button className="w-full py-4 px-6 bg-third hover:bg-third/90 text-white font-header font-semibold rounded-lg transition-colors duration-200">
              Storage
            </button>
          </Link>
          <Link to="/plan?type=emergency-fund">
            <button className="w-full py-4 px-6 bg-third hover:bg-third/90 text-white font-header font-semibold rounded-lg transition-colors duration-200">
              Emergency Fund
            </button>
          </Link>
        </div>
        
        <div className="mt-8 p-6 bg-white/50 rounded-lg shadow-sm">
          <p className="text-gray-600 mb-4">Not sure how to begin your emergency planning?</p>
          <Link to="/plan">
            <button className="bg-third/80 hover:bg-third text-white font-header py-3 px-8 rounded-lg transition-colors duration-200">
              Start with Basic Guide
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
