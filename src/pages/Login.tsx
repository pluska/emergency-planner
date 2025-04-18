import { Link } from 'react-router-dom';
import AuthForm from '../components/AuthForm';

const Login = () => {
  return (
    <div className="min-h-screen bg-secondary p-8">
      <div className="max-w-4xl mx-auto">
        <AuthForm mode="login" />
        <p className="text-center text-gray-600 mt-4">
          Don't have an account?{' '}
          <Link to="/register" className="text-primary hover:text-primary/90 font-semibold">
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login; 