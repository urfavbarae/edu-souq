import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { User, LogOut, Wallet, Settings, BookOpen } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { useTranslation } from 'react-i18next';

export default function UserMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuthStore();
  const { t } = useTranslation();

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 text-light-text hover:text-primary transition-colors"
      >
        <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
          <User className="text-white" size={18} />
        </div>
        <span>{user?.name}</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-light-card rounded-lg shadow-lg py-2 z-50 border border-light-border">
          <div className="px-4 py-2 border-b border-light-border">
            <p className="text-sm text-light-textSecondary">{t('common.balance')}</p>
            <p className="font-semibold text-primary">{user?.tokens} {t('common.tokens')}</p>
          </div>
          
          <Link
            to="/dashboard"
            className="flex items-center gap-2 px-4 py-2 text-light-text hover:bg-light-background"
          >
            <BookOpen size={18} />
            {t('common.dashboard')}
          </Link>
          
          <Link
            to="/wallet"
            className="flex items-center gap-2 px-4 py-2 text-light-text hover:bg-light-background"
          >
            <Wallet size={18} />
            {t('common.wallet')}
          </Link>
          
          <Link
            to="/settings"
            className="flex items-center gap-2 px-4 py-2 text-light-text hover:bg-light-background"
          >
            <Settings size={18} />
            {t('common.settings')}
          </Link>
          
          <button
            onClick={() => {
              logout();
              setIsOpen(false);
            }}
            className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-light-background w-full text-left"
          >
            <LogOut size={18} />
            {t('common.signOut')}
          </button>
        </div>
      )}
    </div>
  );
}