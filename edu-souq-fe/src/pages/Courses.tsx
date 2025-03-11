import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { SearchBar } from '../components/SearchBar';
import { CourseCard } from '../components/CourseCard';

export function Courses() {
  const { t } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    'all',
    'programming',
    'design',
    'business',
    'marketing',
    'languages',
  ];

  const mockCourses = [
    {
      id: '1',
      title: 'Introduction to React',
      description: 'Learn the basics of React development',
      thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80',
      category: 'programming',
      level: 'beginner',
      duration: 10,
      rating: 4.8,
      enrolledCount: 1200,
      price: 50,
      instructor: {
        name: 'John Doe',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
      }
    },
    {
      id: '2',
      title: 'UI/UX Design Fundamentals',
      description: 'Master the principles of user interface and user experience design',
      thumbnail: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80',
      category: 'design',
      level: 'intermediate',
      duration: 15,
      rating: 4.6,
      enrolledCount: 850,
      price: 65,
      instructor: {
        name: 'Sarah Johnson',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
      }
    },
    {
      id: '3',
      title: 'Digital Marketing Strategy',
      description: 'Learn how to create and implement effective digital marketing campaigns',
      thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80',
      category: 'marketing',
      level: 'advanced',
      duration: 12,
      rating: 4.9,
      enrolledCount: 2100,
      price: 75,
      instructor: {
        name: 'Michael Chen',
        avatar: 'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
      }
    },
    {
      id: '4',
      title: 'Business Analytics',
      description: 'Develop skills in data analysis and business intelligence',
      thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80',
      category: 'business',
      level: 'intermediate',
      duration: 20,
      rating: 4.7,
      enrolledCount: 1500,
      price: 80,
      instructor: {
        name: 'Emily Brown',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
      }
    },
    {
      id: '5',
      title: 'Spanish for Beginners',
      description: 'Start your journey to Spanish fluency with comprehensive lessons',
      thumbnail: 'https://images.unsplash.com/photo-1516321497487-e288fb19713f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80',
      category: 'languages',
      level: 'beginner',
      duration: 25,
      rating: 4.5,
      enrolledCount: 3000,
      price: 45,
      instructor: {
        name: 'Ana Rodriguez',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
      }
    },
    {
      id: '6',
      title: 'Advanced JavaScript Patterns',
      description: 'Master advanced JavaScript concepts and design patterns',
      thumbnail: 'https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80',
      category: 'programming',
      level: 'advanced',
      duration: 18,
      rating: 4.9,
      enrolledCount: 750,
      price: 90,
      instructor: {
        name: 'David Wilson',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
      }
    }
 
  ];

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const filteredCourses = mockCourses
    .filter(course => selectedCategory === 'all' || course.category === selectedCategory)
    .filter(course =>
      searchQuery === '' ||
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4 md:mb-0">{t('courses')}</h1>
        <SearchBar onSearch={handleSearch} />
      </div>

      <div className="flex overflow-x-auto space-x-4 mb-8 pb-4">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-full whitespace-nowrap ${
              selectedCategory === category
                ?'bg-primary text-white'
                :'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            {t(category)}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </div>
  );
}
export default Courses;