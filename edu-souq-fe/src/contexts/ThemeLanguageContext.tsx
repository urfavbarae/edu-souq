import React, { createContext, useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuthStore } from '../store/authStore';

type LanguageType = 'en' | 'fr' | 'ar';

interface ThemeLanguageContextType {
  language: LanguageType;
  setLanguage: (language: LanguageType) => void;
}

const ThemeLanguageContext = createContext<ThemeLanguageContextType | undefined>(undefined);

export const ThemeLanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, updateUser } = useAuthStore();
  const { i18n } = useTranslation();
  
  const [language, setLanguageState] = useState<LanguageType>(
    (user?.language as LanguageType) || 'en'
  );

  // Apply language
  useEffect(() => {
    i18n.changeLanguage(language);
    // For RTL support (Arabic)
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
  }, [language, i18n]);

  // Update language in user preferences
  const setLanguage = (newLanguage: LanguageType) => {
    setLanguageState(newLanguage);
    updateUser({ language: newLanguage });
  };

  return (
    <ThemeLanguageContext.Provider
      value={{
        language,
        setLanguage,
      }}
    >
      {children}
    </ThemeLanguageContext.Provider>
  );
};

// Custom hook to use the language context
export const useThemeLanguage = () => {
  const context = useContext(ThemeLanguageContext);
  if (context === undefined) {
    throw new Error('useThemeLanguage must be used within a ThemeLanguageProvider');
  }
  return context;
};