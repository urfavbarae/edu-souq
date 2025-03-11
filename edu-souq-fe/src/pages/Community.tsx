import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { MessageSquare, Users, BookOpen, Search, ThumbsUp, MessageCircle, Share2, X } from 'lucide-react';

type ForumPost = {
  id: number;
  author: string;
  authorAvatar: string;
  title: string;
  content: string;
  category: string;
  date: string;
  likes: number;
  comments: number;
  isLiked: boolean;
};

type ForumCategory = {
  id: string;
  name: string;
  icon: React.ReactNode;
  count: number;
};

type NewPostData = {
  title: string;
  content: string;
  category: string;
};

export default function Community() {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('discussions');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isCreatePostModalOpen, setIsCreatePostModalOpen] = useState(false);
  const [newPostData, setNewPostData] = useState<NewPostData>({
    title: '',
    content: '',
    category: 'general'
  });

  // Sample forum categories
  const categories: ForumCategory[] = [
    { id: 'all', name: t('community.allCategories'), icon: <MessageSquare size={18} />, count: 124 },
    { id: 'general', name: t('community.general'), icon: <Users size={18} />, count: 45 },
    { id: 'courses', name: t('community.coursesDiscussions'), icon: <BookOpen size={18} />, count: 38 },
    { id: 'questions', name: t('community.questions'), icon: <MessageCircle size={18} />, count: 27 },
    { id: 'announcements', name: t('community.announcements'), icon: <MessageSquare size={18} />, count: 14 },
  ];

  // Sample forum posts
  const posts: ForumPost[] = [
    {
      id: 1,
      author: 'Sarah Johnson',
      authorAvatar: 'https://i.pravatar.cc/150?img=1',
      title: t('community.samplePost1Title'),
      content: t('community.samplePost1Content'),
      category: 'general',
      date: '2 hours ago',
      likes: 24,
      comments: 8,
      isLiked: false
    },
    {
      id: 2,
      author: 'Mohammed Ali',
      authorAvatar: 'https://i.pravatar.cc/150?img=2',
      title: t('community.samplePost2Title'),
      content: t('community.samplePost2Content'),
      category: 'courses',
      date: '1 day ago',
      likes: 18,
      comments: 5,
      isLiked: true
    },
    {
      id: 3,
      author: 'Fatima Zahra',
      authorAvatar: 'https://i.pravatar.cc/150?img=3',
      title: t('community.samplePost3Title'),
      content: t('community.samplePost3Content'),
      category: 'questions',
      date: '3 days ago',
      likes: 32,
      comments: 14,
      isLiked: false
    },
  ];

  // Filter posts based on search query and selected category
  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         post.content.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Toggle like on a post
  const toggleLike = (postId: number) => {
    // In a real app, this would call an API to update the like status
    console.log(`Toggled like on post ${postId}`);
  };

  // Handle new post creation
  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would call an API to create the post
    console.log('Creating new post:', newPostData);
    // Reset form and close modal
    setNewPostData({
      title: '',
      content: '',
      category: 'general'
    });
    setIsCreatePostModalOpen(false);
  };

  // Handle input changes for new post
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewPostData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-primary to-secondary rounded-xl p-6 text-white mb-8">
        <h1 className="text-2xl font-bold mb-2">{t('community.communityTitle')}</h1>
        <p className="opacity-90">{t('community.communityDescription')}</p>
      </div>

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar */}
        <div className="lg:w-1/4">
          <div className="bg-light-card dark:bg-dark-card rounded-xl shadow-md p-4 mb-6">
            <h3 className="text-lg font-semibold mb-4 text-light-text dark:text-dark-text">{t('community.categories')}</h3>
            <ul className="space-y-2">
              {categories.map(category => (
                <li key={category.id}>
                  <button
                    onClick={() => setSelectedCategory(category.id)}
                    className={`w-full flex items-center justify-between p-2 rounded-lg transition-colors ${selectedCategory === category.id ? 'bg-primary/10 text-primary' : 'text-light-text dark:text-dark-text hover:bg-light-background dark:hover:bg-dark-background/50'}`}
                  >
                    <div className="flex items-center gap-2">
                      {category.icon}
                      <span>{category.name}</span>
                    </div>
                    <span className="text-xs bg-light-background dark:bg-dark-background/70 px-2 py-1 rounded-full">
                      {category.count}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>


        </div>

        {/* Main Forum Content */}
        <div className="lg:w-3/4">
          {/* Search and Tabs */}
          <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
            <div className="relative w-full">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={18} className="text-light-textSecondary dark:text-dark-textSecondary" />
              </div>
              <input
                type="text"
                placeholder={t('community.searchPlaceholder')}
                className="w-full pl-10 pr-4 py-2 border border-light-border dark:border-dark-border rounded-lg bg-light-card dark:bg-dark-card text-light-text dark:text-dark-text focus:outline-none focus:ring-2 focus:ring-primary"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* Create Post Button */}
          <button 
            onClick={() => setIsCreatePostModalOpen(true)}
            className="w-full mb-6 bg-primary text-white py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
          >
            <MessageSquare size={18} />
            {t('community.createNewPost')}
          </button>

          {/* Create Post Modal */}
          {isCreatePostModalOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
              <div className="bg-white dark:bg-dark-card rounded-xl shadow-xl w-full max-w-2xl">
                <div className="flex items-center justify-between p-6 border-b border-light-border dark:border-dark-border">
                  <h2 className="text-xl font-semibold text-light-text dark:text-dark-text">{t('community.createNewPost')}</h2>
                  <button 
                    onClick={() => setIsCreatePostModalOpen(false)}
                    className="text-light-textSecondary dark:text-dark-textSecondary hover:text-primary transition-colors"
                  >
                    <X size={24} />
                  </button>
                </div>
                <form onSubmit={handleCreatePost} className="p-6 space-y-4">
                  <div>
                    <label htmlFor="title" className="block text-sm font-medium text-light-text dark:text-dark-text mb-1">
                      {t('community.postTitle')}
                    </label>
                    <input
                      type="text"
                      id="title"
                      name="title"
                      value={newPostData.title}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-light-border dark:border-dark-border rounded-lg bg-light-card dark:bg-dark-card text-light-text dark:text-dark-text focus:outline-none focus:ring-2 focus:ring-primary"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="category" className="block text-sm font-medium text-light-text dark:text-dark-text mb-1">
                      {t('community.category')}
                    </label>
                    <select
                      id="category"
                      name="category"
                      value={newPostData.category}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-light-border dark:border-dark-border rounded-lg bg-light-card dark:bg-dark-card text-light-text dark:text-dark-text focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      {categories.filter(cat => cat.id !== 'all').map(category => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="content" className="block text-sm font-medium text-light-text dark:text-dark-text mb-1">
                      {t('community.postContent')}
                    </label>
                    <textarea
                      id="content"
                      name="content"
                      value={newPostData.content}
                      onChange={handleInputChange}
                      rows={6}
                      className="w-full px-4 py-2 border border-light-border dark:border-dark-border rounded-lg bg-light-card dark:bg-dark-card text-light-text dark:text-dark-text"
                    />
                  </div>
                  <div className="flex justify-end gap-4">
                    <button
                      type="button"
                      onClick={() => setIsCreatePostModalOpen(false)}
                      className="px-6 py-2 border border-light-border dark:border-dark-border rounded-lg text-light-text dark:text-dark-text hover:bg-light-background dark:hover:bg-dark-background/50 transition-colors"
                    >
                      {t('common.cancel')}
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                    >
                      {t('community.publish')}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Posts List */}
          <div className="space-y-6">
            {filteredPosts.length > 0 ? (
              filteredPosts.map(post => (
                <div key={post.id} className="bg-light-card dark:bg-dark-card rounded-xl shadow-md p-6 border border-light-border dark:border-dark-border">
                  <div className="flex items-center gap-3 mb-4">
                    <img src={post.authorAvatar} alt={post.author} className="w-10 h-10 rounded-full" />
                    <div>
                      <p className="font-medium text-light-text dark:text-dark-text">{post.author}</p>
                      <p className="text-xs text-light-textSecondary dark:text-dark-textSecondary">{post.date}</p>
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-light-text dark:text-dark-text">{post.title}</h3>
                  <p className="text-light-text dark:text-dark-text mb-4">{post.content}</p>
                  <div className="flex items-center justify-between pt-4 border-t border-light-border dark:border-dark-border">
                    <div className="flex items-center gap-6">
                      <button 
                        onClick={() => toggleLike(post.id)}
                        className={`flex items-center gap-1 ${post.isLiked ? 'text-primary' : 'text-light-textSecondary dark:text-dark-textSecondary'} hover:text-primary transition-colors`}
                      >
                        <ThumbsUp size={18} />
                        <span>{post.likes}</span>
                      </button>
                      <button className="flex items-center gap-1 text-light-textSecondary dark:text-dark-textSecondary hover:text-primary transition-colors">
                        <MessageCircle size={18} />
                        <span>{post.comments}</span>
                      </button>
                    </div>
                    <button className="text-light-textSecondary dark:text-dark-textSecondary hover:text-primary transition-colors">
                      <Share2 size={18} />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="bg-light-card dark:bg-dark-card rounded-xl shadow-md p-8 text-center">
                <MessageSquare size={48} className="mx-auto mb-4 text-light-textSecondary dark:text-dark-textSecondary" />
                <h3 className="text-xl font-semibold mb-2 text-light-text dark:text-dark-text">{t('community.noPostsFound')}</h3>
                <p className="text-light-textSecondary dark:text-dark-textSecondary">{t('community.tryDifferentSearch')}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}