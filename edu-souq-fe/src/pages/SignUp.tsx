import React from 'react';
import { useTranslation } from 'react-i18next';
import { useAuthStore } from '../store/authStore';
import { Link, useNavigate } from 'react-router-dom';
import PasswordInput from '../components/PasswordInput';

export default function SignUp() {
  const navigate = useNavigate();
  const login = useAuthStore(state => state.login);
  const { t } = useTranslation();
  
  const [error, setError] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const [termsAccepted, setTermsAccepted] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!termsAccepted) {
      setError('Please accept the Terms of Service and Privacy Policy');
      return;
    }

    setError('');
    setIsLoading(true);

    const formData = new FormData(e.target as HTMLFormElement);
    const name = `${formData.get('firstName')} ${formData.get('lastName')}`;
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const password_confirmation = formData.get('confirmPassword') as string;

    if (password !== password_confirmation) {
      setError('Passwords do not match');
      setIsLoading(false);
      return;
    }

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
  };

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">{t('auth.createAccount')}</h2>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                {t('auth.firstName')}
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4A90E2]"
                placeholder={t('auth.firstNamePlaceholder')}
              />
            </div>
            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                {t('auth.lastName')}
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4A90E2]"
                placeholder={t('auth.lastNamePlaceholder')}
              />
            </div>
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              {t('auth.emailAddress')}
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4A90E2]"
              placeholder={t('auth.emailPlaceholder')}
            />
          </div>
          <div>
            <PasswordInput
              id="password"
              name="password"
              required
              label={t('auth.password')}
              placeholder="••••••••"
            />
          </div>
          <div>
            <PasswordInput
              id="confirmPassword"
              name="confirmPassword"
              required
              label={t('auth.confirmPassword')}
              placeholder="••••••••"
            />
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="terms"
              checked={termsAccepted}
              onChange={(e) => setTermsAccepted(e.target.checked)}
              className="h-4 w-4 text-[#4A90E2] focus:ring-[#4A90E2] border-gray-300 rounded"
            />
            <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
              {t('auth.agreeToTerms')}{' '}
              <Link to="/terms" className="text-[#4A90E2] hover:text-[#4A90E2]/80">
                {t('auth.termsOfService')}
              </Link>{' '}
              {t('auth.and')}{' '}
              <Link to="/privacy" className="text-[#4A90E2] hover:text-[#4A90E2]/80">
                {t('auth.privacyPolicy')}
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
            {isLoading ? t('auth.creatingAccount') : t('auth.createAccount')}
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-gray-600">
          {t('auth.alreadyHaveAccount')}{' '}
          <Link to="/signin" className="text-[#4A90E2] hover:text-[#4A90E2]/80">
            {t('auth.signIn')}
          </Link>
        </p>
      </div>
    </div>
  );
}