import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { useTranslation } from 'react-i18next';

export default function SignUp() {
  const navigate = useNavigate();
  const login = useAuthStore(state => state.login);
  const { t } = useTranslation();
  
  const [error, setError] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">Create Your Account</h2>
        <form className="space-y-6" onSubmit={async (e) => {
          e.preventDefault();
          setError('');
          setIsLoading(true);

          const formData = new FormData(e.target as HTMLFormElement);
          const name = `${formData.get('firstName')} ${formData.get('lastName')}`;
          const email = formData.get('email') as string;
          const password = formData.get('password') as string;
          const password_confirmation = formData.get('confirmPassword') as string;

          try {
            const response = await fetch('http://localhost:8000/api/auth/register', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ name, email, password, password_confirmation }),
            });

            const data = await response.json();

            if (!response.ok) {
              throw new Error(
                data.errors ? Object.values(data.errors).flat().join('\n') : 
                data.message || 'Registration failed'
              );
            }

            login({
              id: data.user.id,
              name: data.user.name,
              email: data.user.email,
              tokens: data.user.SQ_token
            });

            localStorage.setItem('token', data.token);
            navigate('/dashboard');
          } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred');
          } finally {
            setIsLoading(false);
          }
        }}>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                First Name
              </label>
              <input
                type="text"
                id="firstName"
              name="firstName"
              required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4A90E2]"
                placeholder="John"
              />
            </div>
            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
              name="lastName"
              required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4A90E2]"
                placeholder="Doe"
              />
            </div>
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4A90E2]"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              required
              minLength={8}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4A90E2]"
              placeholder="••••••••"
            />
          </div>
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4A90E2]"
              placeholder="••••••••"
            />
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="terms"
              className="h-4 w-4 text-[#4A90E2] focus:ring-[#4A90E2] border-gray-300 rounded"
            />
            <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
              I agree to the{' '}
              <Link to="/terms" className="text-[#4A90E2] hover:text-[#4A90E2]/80">
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link to="/privacy" className="text-[#4A90E2] hover:text-[#4A90E2]/80">
                Privacy Policy
              </Link>
            </label>
          </div>
          {error && (
            <div className="text-red-500 text-sm text-center whitespace-pre-line">{error}</div>
          )}
          <button
            type="submit"
            className="w-full bg-[#4A90E2] text-white py-2 rounded-lg hover:bg-[#4A90E2]/90 transition-colors disabled:opacity-50"
            disabled={isLoading}
          >
            {isLoading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link to="/signin" className="text-[#4A90E2] hover:text-[#4A90E2]/80">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}