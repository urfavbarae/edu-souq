import React, { useState, useRef } from 'react';
import { useAuthStore } from '../store/authStore';
import { User, Bell, Shield, Globe, Moon, Save } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useThemeLanguage } from '../contexts/ThemeLanguageContext';

export default function Settings() {
  const { user, updateUser } = useAuthStore();
  const { t } = useTranslation();
  const { language, setLanguage } = useThemeLanguage();
  const [activeTab, setActiveTab] = useState('profile');
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Form state
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    bio: user?.bio || 'Passionate learner and educator',
    language: user?.language || 'english',
    notifications: user?.notifications || {
      email: true,
      browser: true,
      mobile: false
    },

    twoFactorAuth: user?.twoFactorAuth || false,
    profilePicture: user?.profilePicture || ''
  });

  // Password state
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordData({
      ...passwordData,
      [name]: value
    });
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData({
        ...formData,
        [parent]: {
          ...formData[parent as keyof typeof formData] as Record<string, boolean>,
          [child]: checked
        }
      });
    } else {
      setFormData({
        ...formData,
        [name]: checked
      });
    }
  };

  const handleProfilePictureClick = () => {
    // Trigger file input click
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // In a real app, you would upload the file to a server
      // For this demo, we'll create a data URL
      const reader = new FileReader();
      reader.onload = () => {
        const profilePicture = reader.result as string;
        setFormData({
          ...formData,
          profilePicture
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpdatePassword = () => {
    // Validate passwords
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert('New passwords do not match!');
      return;
    }

    if (!passwordData.currentPassword) {
      alert('Please enter your current password');
      return;
    }

    if (passwordData.newPassword.length < 6) {
      alert('New password must be at least 6 characters');
      return;
    }

    // In a real app, you would verify the current password and update it on the server
    alert('Password updated successfully!');
    
    // Reset password fields
    setPasswordData({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Update user data in the store
    updateUser({
      name: formData.name,
      email: formData.email,
      bio: formData.bio,
      language: formData.language,

      twoFactorAuth: formData.twoFactorAuth,
      notifications: formData.notifications,
      profilePicture: formData.profilePicture
    });
    
    alert('Settings saved successfully!');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-[#4A90E2] to-[#00C4B4] rounded-xl p-6 text-white mb-8">
        <h1 className="text-2xl font-bold mb-2">Account Settings</h1>
        <p className="opacity-90">Manage your profile and preferences</p>
      </div>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Tabs Navigation */}
        <div className="flex border-b">
          <button
            onClick={() => setActiveTab('profile')}
            className={`flex items-center gap-2 px-6 py-4 font-medium ${activeTab === 'profile' ? 'text-[#4A90E2] border-b-2 border-[#4A90E2]' : 'text-gray-600'}`}
          >
            <User size={18} />
            Profile
          </button>
          <button
            onClick={() => setActiveTab('notifications')}
            className={`flex items-center gap-2 px-6 py-4 font-medium ${activeTab === 'notifications' ? 'text-[#4A90E2] border-b-2 border-[#4A90E2]' : 'text-gray-600'}`}
          >
            <Bell size={18} />
            Notifications
          </button>
          <button
            onClick={() => setActiveTab('security')}
            className={`flex items-center gap-2 px-6 py-4 font-medium ${activeTab === 'security' ? 'text-[#4A90E2] border-b-2 border-[#4A90E2]' : 'text-gray-600'}`}
          >
            <Shield size={18} />
            Security
          </button>
          <button
            onClick={() => setActiveTab('preferences')}
            className={`flex items-center gap-2 px-6 py-4 font-medium ${activeTab === 'preferences' ? 'text-[#4A90E2] border-b-2 border-[#4A90E2]' : 'text-gray-600'}`}
          >
            <Globe size={18} />
            Preferences
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          <form onSubmit={handleSubmit}>
            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <div className="space-y-6">
                <div className="flex items-center gap-6 mb-8">
                  <div className="w-24 h-24 bg-[#4A90E2] rounded-full flex items-center justify-center text-white text-3xl font-bold overflow-hidden">
                    {formData.profilePicture ? (
                      <img 
                        src={formData.profilePicture} 
                        alt="Profile" 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      user?.name?.charAt(0) || 'U'
                    )}
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold">{formData.name}</h2>
                    <p className="text-gray-600">{formData.email}</p>
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileChange}
                      accept="image/*"
                      className="hidden"
                    />
                    <button 
                      type="button" 
                      onClick={handleProfilePictureClick}
                      className="mt-2 text-sm text-[#4A90E2] hover:underline"
                    >
                      Change profile picture
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4A90E2]"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4A90E2]"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-1">
                    Bio
                  </label>
                  <textarea
                    id="bio"
                    name="bio"
                    value={formData.bio}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4A90E2]"
                  />
                </div>
              </div>
            )}

            {/* Notifications Tab */}
            {activeTab === 'notifications' && (
              <div className="space-y-6">
                <h3 className="text-lg font-medium text-gray-900">Email Notifications</h3>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="email-notifications"
                        name="notifications.email"
                        type="checkbox"
                        checked={formData.notifications.email}
                        onChange={handleCheckboxChange}
                        className="h-4 w-4 text-[#4A90E2] focus:ring-[#4A90E2] border-gray-300 rounded"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="email-notifications" className="font-medium text-gray-700">Course updates</label>
                      <p className="text-gray-500">Get notified about new lessons and course materials</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="browser-notifications"
                        name="notifications.browser"
                        type="checkbox"
                        checked={formData.notifications.browser}
                        onChange={handleCheckboxChange}
                        className="h-4 w-4 text-[#4A90E2] focus:ring-[#4A90E2] border-gray-300 rounded"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="browser-notifications" className="font-medium text-gray-700">Browser notifications</label>
                      <p className="text-gray-500">Receive notifications in your browser</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="mobile-notifications"
                        name="notifications.mobile"
                        type="checkbox"
                        checked={formData.notifications.mobile}
                        onChange={handleCheckboxChange}
                        className="h-4 w-4 text-[#4A90E2] focus:ring-[#4A90E2] border-gray-300 rounded"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="mobile-notifications" className="font-medium text-gray-700">Mobile notifications</label>
                      <p className="text-gray-500">Receive push notifications on your mobile device</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Security Tab */}
            {activeTab === 'security' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Change Password</h3>
                  <div className="grid grid-cols-1 gap-4">
                    <div>
                      <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 mb-1">
                        Current Password
                      </label>
                      <input
                        type="password"
                        id="currentPassword"
                        name="currentPassword"
                        value={passwordData.currentPassword}
                        onChange={handlePasswordChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4A90E2]"
                      />
                    </div>
                    <div>
                      <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-1">
                        New Password
                      </label>
                      <input
                        type="password"
                        id="newPassword"
                        name="newPassword"
                        value={passwordData.newPassword}
                        onChange={handlePasswordChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4A90E2]"
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
                        value={passwordData.confirmPassword}
                        onChange={handlePasswordChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4A90E2]"
                      />
                    </div>
                  </div>
                  <div className="mt-4">
                    <button
                      type="button"
                      onClick={handleUpdatePassword}
                      className="px-4 py-2 bg-[#4A90E2] text-white rounded-lg hover:bg-[#4A90E2]/90 transition-colors"
                    >
                      Update Password
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Preferences Tab */}
            {activeTab === 'preferences' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">{t('settings.language')}</h3>
                  <div className="max-w-xs">
                    <select
                      id="language"
                      name="language"
                      value={language}
                      onChange={(e) => setLanguage(e.target.value as 'en' | 'fr' | 'ar')}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4A90E2]"
                    >
                      <option value="en">{t('settings.english')}</option>
                      <option value="fr">{t('settings.french')}</option>
                      <option value="ar">{t('settings.arabic')}</option>
                    </select>
                  </div>
                </div>
                
                
              </div>
            )}

            <div className="mt-6 flex justify-end">
              <button
                type="submit"
                className="flex items-center gap-2 px-4 py-2 bg-[#4A90E2] text-white rounded-lg hover:bg-[#4A90E2]/90 transition-colors"
              >
                <Save size={18} />
                {t('settings.saveSettings')}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}