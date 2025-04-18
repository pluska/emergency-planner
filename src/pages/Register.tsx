import { Link } from 'react-router-dom';
import AuthForm from '../components/AuthForm';

const Register = () => {
  return (
    <div className="min-h-screen bg-secondary p-8">
      <div className="max-w-4xl mx-auto">
        <AuthForm mode="register" />
        <p className="text-center text-gray-600 mt-4">
          Already have an account?{' '}
          <Link to="/login" className="text-primary hover:text-primary/90 font-semibold">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
