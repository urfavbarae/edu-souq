import React from 'react';
import { useTranslation } from 'react-i18next';
import { BookOpen, Trophy, Star, TrendingUp } from 'lucide-react';
import { CourseCard } from '../components/CourseCard';

export function Dashboard() {
  const { t } = useTranslation();

  const mockEnrolledCourses = [
    {
      id: '1',
      title: 'Introduction to React',
      description: 'Learn the basics of React development',
      thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80',
      category: 'Programming',
      level: 'beginner',
      duration: 10,
      rating: 4.8,
      enrolledCount: 1200,
      price: 50,
      instructor: {
        name: 'John Doe',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
      }
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center">
            <BookOpen className="h-10 w-10 text-primary" />
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-gray-900">{t('coursesEnrolled')}</h3>
              <p className="text-2xl font-bold text-primary">5</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center">
            <Trophy className="h-10 w-10 text-accent" />
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-gray-900">{t('achievements')}</h3>
              <p className="text-2xl font-bold text-accent">12</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center">
            <Star className="h-10 w-10 text-yellow-400" />
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-gray-900">{t('averageRating')}</h3>
              <p className="text-2xl font-bold text-yellow-400">4.8</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center">
            <TrendingUp className="h-10 w-10 text-green-500" />
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-gray-900">{t('tokenBalance')}</h3>
              <p className="text-2xl font-bold text-green-500">250</p>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">{t('myLearning')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockEnrolledCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">{t('recommendedCourses')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockEnrolledCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}