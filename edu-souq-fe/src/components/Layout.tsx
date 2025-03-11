import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { useTranslation } from 'react-i18next';
import { useThemeLanguage } from '../contexts/ThemeLanguageContext';
import UserMenu from './UserMenu';
import logoM from '../images/logo.png';
export default function Layout() {
  const { isAuthenticated } = useAuthStore();
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-light-background text-light-text">
      {/* Navigation */}
      <nav className="bg-light-card shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-6">
            <Link to="/">
              <img 
                src={logoM}
                alt="Edu-SouQ Logo" 
                className="h-16"
              />
            </Link>
            <div className="hidden md:flex items-center gap-6">
              <Link to="/courses" className="text-light-textSecondary hover:text-primary transition-colors">
                {t('common.courses')}
              </Link>
              {isAuthenticated && (
                <>
                  <Link to="/teach" className="text-light-textSecondary hover:text-primary transition-colors">
                    {t('common.teach')}
                  </Link>
                  <Link to="/community" className="text-light-textSecondary hover:text-primary transition-colors">
                    {t('common.community')}
                  </Link>
                </>
              )}
            </div>
          </div>
          <div className="flex items-center gap-4">
            {isAuthenticated ? (
              <UserMenu />
            ) : (
              <>
                <Link to="/signin" className="text-primary hover:text-primary/80 transition-colors">
                  {t('common.signIn')}
                </Link>
                <Link to="/signup" className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors">
                  {t('common.getStarted')}
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>

      <Outlet />

      {/* Footer */}
      <footer className="bg-dark-card text-dark-text py-8">
        <div className="container mx-auto px-4 text-center">
          <img 
            src={logoM}
            alt="Edu-SouQ Logo" 
            className="h-28 mx-auto mb-4"
          />
          <p>© 2025 Edu-SouQ. {t('common.footerTagline', 'Empowering Education in Morocco.')}</p>
        </div>
      </footer>
    </div>
  );
}