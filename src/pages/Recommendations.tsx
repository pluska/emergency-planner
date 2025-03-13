import { Link } from 'react-router-dom';

const Recommendations = () => {
  return (
    <div className="min-h-screen bg-secondary py-12 px-4 sm:px-6 lg:px-8 overflow-y-auto">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-header font-bold text-primary text-center mb-12">
          Recommendations for Security and Emergency Plans
        </h1>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Emergency Storage Card */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col">
            <div className="p-6 flex-1">
              <div className="flex items-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-third" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                </svg>
                <h2 className="text-xl font-header font-semibold ml-3 text-gray-800">
                  Emergency Storage
                </h2>
              </div>
              <p className="text-gray-600 leading-relaxed">
          Having an emergency storage is crucial for ensuring that you have the necessary supplies during a crisis. 
                This includes:
              </p>
              <ul className="mt-4 space-y-2 text-gray-600">
                <li className="flex items-center">
                  <span className="h-1.5 w-1.5 bg-primary rounded-full mr-2"></span>
                  Food and water supplies
                </li>
                <li className="flex items-center">
                  <span className="h-1.5 w-1.5 bg-primary rounded-full mr-2"></span>
                  Medical supplies
                </li>
                <li className="flex items-center">
                  <span className="h-1.5 w-1.5 bg-primary rounded-full mr-2"></span>
                  Essential items
                </li>
              </ul>
            </div>
            <div className="p-6 pt-0">
              <Link to="/plan?type=storage">
                <button className="w-full py-4 px-6 bg-primary hover:bg-primary/90 text-white font-header font-semibold rounded-lg transition-colors duration-200">
                  Create Storage Plan
                </button>
              </Link>
            </div>
          </div>

          {/* Emergency Bagpack Card */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col">
            <div className="p-6 flex-1">
              <div className="flex items-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-third" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                    d="M20 7v10a2 2 0 01-2 2H6a2 2 0 01-2-2V7m16 0a2 2 0 00-2-2H6a2 2 0 00-2 2m16 0v-2a2 2 0 00-2-2H6a2 2 0 00-2 2v2m4 1v10m8-10v10" />
                </svg>
                <h2 className="text-xl font-header font-semibold ml-3 text-gray-800">
                  Emergency Bagpack
                </h2>
              </div>
              <p className="text-gray-600 leading-relaxed">
                An emergency bagpack or "go bag" is a portable kit for 72-hour survival. Essential items include:
              </p>
              <ul className="mt-4 space-y-2 text-gray-600">
                <li className="flex items-center">
                  <span className="h-1.5 w-1.5 bg-primary rounded-full mr-2"></span>
                  Identification documents
                </li>
                <li className="flex items-center">
                  <span className="h-1.5 w-1.5 bg-primary rounded-full mr-2"></span>
                  First aid kit
                </li>
                <li className="flex items-center">
                  <span className="h-1.5 w-1.5 bg-primary rounded-full mr-2"></span>
                  Flashlight and batteries
                </li>
                <li className="flex items-center">
                  <span className="h-1.5 w-1.5 bg-primary rounded-full mr-2"></span>
                  Personal hygiene items
                </li>
              </ul>
            </div>
            <div className="p-6 pt-0">
              <Link to="/plan?type=emergency-bagpack">
                <button className="w-full py-4 px-6 bg-primary hover:bg-primary/90 text-white font-header font-semibold rounded-lg transition-colors duration-200">
                  Create Bagpack Plan
                </button>
              </Link>
            </div>
          </div>

          {/* Emergency Fund Card */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col">
            <div className="p-6 flex-1">
              <div className="flex items-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-third" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h2 className="text-xl font-header font-semibold ml-3 text-gray-800">
                  Emergency Fund
                </h2>
              </div>
              <p className="text-gray-600 leading-relaxed">
                A financial safety net for unexpected expenses. Recommended savings:
              </p>
              <ul className="mt-4 space-y-2 text-gray-600">
                <li className="flex items-center">
                  <span className="h-1.5 w-1.5 bg-primary rounded-full mr-2"></span>
                  3-6 months of living expenses
                </li>
                <li className="flex items-center">
                  <span className="h-1.5 w-1.5 bg-primary rounded-full mr-2"></span>
                  Easily accessible account
                </li>
                <li className="flex items-center">
                  <span className="h-1.5 w-1.5 bg-primary rounded-full mr-2"></span>
                  Regular contributions
                </li>
              </ul>
            </div>
            <div className="p-6 pt-0">
              <Link to="/plan?type=emergency-fund">
                <button className="w-full py-4 px-6 bg-primary hover:bg-primary/90 text-white font-header font-semibold rounded-lg transition-colors duration-200">
                  Create Fund Plan
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* Additional Tips Section with Basic Guide Button */}
        <div className="mt-12 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-header font-semibold text-gray-800 mb-4">
            Additional Tips
          </h2>
          <div className="grid md:grid-cols-2 gap-6 text-gray-600 mb-8">
            <div className="flex items-start">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary mt-1 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p>Regularly check and update your emergency supplies to ensure they haven't expired.</p>
            </div>
            <div className="flex items-start">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary mt-1 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <p>Share your emergency plans with family members and ensure everyone knows their role.</p>
            </div>
          </div>
          
          {/* Basic Guide Button */}
          <div className="text-center">
            <p className="text-gray-600 mb-4">Not sure where to start? Begin with our basic guide!</p>
            <Link to="/plan">
              <button className="bg-third/80 hover:bg-third text-white font-header py-3 px-8 rounded-lg transition-colors duration-200">
                Start with Basic Guide
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Recommendations;
