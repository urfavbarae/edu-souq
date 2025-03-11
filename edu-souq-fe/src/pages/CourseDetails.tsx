import React from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Clock, Users, BarChart, MessageSquare } from 'lucide-react';

export function CourseDetails() {
  const { t } = useTranslation();
  const { id } = useParams();

  const mockCourses = [
    {
      id: '1',
      title: 'Introduction to React',
      description: 'Learn the basics of React development with this comprehensive course. We will cover everything from the fundamentals to advanced concepts.',
      thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80',
      category: 'Programming',
      level: 'beginner',
      duration: 10,
      rating: 4.8,
      enrolledCount: 1200,
      price: 50,
      instructor: {
        name: 'John Doe',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        bio: 'Senior React Developer with 8 years of experience'
      },
      curriculum: [
        {
          title: 'Getting Started',
          lessons: ['Introduction', 'Setup Development Environment', 'Your First React App']
        },
        {
          title: 'React Fundamentals',
          lessons: ['Components', 'Props', 'State', 'Lifecycle Methods']
        }
      ]
    },
    {
      id: '2',
      title: 'UI/UX Design Fundamentals',
      description: 'Master the principles of user interface and user experience design with hands-on projects and real-world examples.',
      thumbnail: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80',
      category: 'Design',
      level: 'intermediate',
      duration: 15,
      rating: 4.6,
      enrolledCount: 850,
      price: 65,
      instructor: {
        name: 'Sarah Johnson',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        bio: 'UX Design Lead with 10+ years of experience'
      },
      curriculum: [
        {
          title: 'Design Basics',
          lessons: ['Design Principles', 'Color Theory', 'Typography']
        },
        {
          title: 'UX Process',
          lessons: ['User Research', 'Wireframing', 'Prototyping', 'User Testing']
        }
      ]
    },
    {
      id: '3',
      title: 'Digital Marketing Strategy',
      description: 'Learn how to create and implement effective digital marketing campaigns',
      thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80',
      category: 'Marketing',
      level: 'advanced',
      duration: 12,
      rating: 4.9,
      enrolledCount: 2100,
      price: 75,
      instructor: {
        name: 'Michael Chen',
        avatar: 'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        bio: 'Digital Marketing Expert with 12 years of experience'
      },
      curriculum: [
        {
          title: 'Marketing Fundamentals',
          lessons: ['Understanding Digital Marketing', 'Market Research', 'Target Audience Analysis']
        },
        {
          title: 'Campaign Strategy',
          lessons: ['Campaign Planning', 'Content Strategy', 'Analytics and Optimization']
        }
      ]
    },
    {
      id: '4',
      title: 'Business Analytics',
      description: 'Develop skills in data analysis and business intelligence',
      thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80',
      category: 'Business',
      level: 'intermediate',
      duration: 20,
      rating: 4.7,
      enrolledCount: 1500,
      price: 80,
      instructor: {
        name: 'Emily Brown',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        bio: 'Business Intelligence Consultant with 15 years of experience'
      },
      curriculum: [
        {
          title: 'Data Analysis Basics',
          lessons: ['Introduction to Analytics', 'Data Collection', 'Data Visualization']
        },
        {
          title: 'Advanced Analytics',
          lessons: ['Predictive Analysis', 'Business Metrics', 'Reporting']
        }
      ]
    },
    {
      id: '5',
      title: 'Spanish for Beginners',
      description: 'Start your journey to Spanish fluency with comprehensive lessons',
      thumbnail: 'https://images.unsplash.com/photo-1516321497487-e288fb19713f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80',
      category: 'Languages',
      level: 'beginner',
      duration: 25,
      rating: 4.5,
      enrolledCount: 3000,
      price: 45,
      instructor: {
        name: 'Ana Rodriguez',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        bio: 'Native Spanish Teacher with 10 years of teaching experience'
      },
      curriculum: [
        {
          title: 'Basic Spanish',
          lessons: ['Pronunciation', 'Common Phrases', 'Basic Grammar']
        },
        {
          title: 'Practical Spanish',
          lessons: ['Daily Conversations', 'Reading Skills', 'Writing Practice']
        }
      ]
    },
    {
      id: '6',
      title: 'Advanced JavaScript Patterns',
      description: 'Master advanced JavaScript concepts and design patterns',
      thumbnail: 'https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80',
      category: 'Programming',
      level: 'advanced',
      duration: 18,
      rating: 4.9,
      enrolledCount: 750,
      price: 90,
      instructor: {
        name: 'David Wilson',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        bio: 'JavaScript Architect with 10 years of experience'
      },
      curriculum: [
        {
          title: 'Advanced Concepts',
          lessons: ['Design Patterns', 'Functional Programming', 'Performance Optimization']
        },
        {
          title: 'Real-world Applications',
          lessons: ['Architecture Patterns', 'Testing Strategies', 'Project Implementation']
        }
      ]
    }
  ];

  const course = mockCourses.find(course => course.id === id) || mockCourses[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <img
            src={course.thumbnail}
            alt={course.title}
            className="w-full h-64 object-cover rounded-lg mb-6"
          />
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{course.title}</h1>
          
          <div className="flex items-center space-x-6 mb-6">
            <div className="flex items-center">
              <Clock className="h-5 w-5 text-gray-400 mr-2" />
              <span>{course.duration}h</span>
            </div>
            <div className="flex items-center">
              <Users className="h-5 w-5 text-gray-400 mr-2" />
              <span>{course.enrolledCount} students</span>
            </div>
            <div className="flex items-center">
              <BarChart className="h-5 w-5 text-gray-400 mr-2" />
              <span>{course.level}</span>
            </div>
          </div>

          <div className="prose max-w-none mb-8">
            <h2 className="text-xl font-semibold mb-4">{t('description')}</h2>
            <p className="text-gray-600">{course.description}</p>
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">{t('curriculum')}</h2>
            <div className="space-y-4">
              {course.curriculum.map((section, index) => (
                <div key={index} className="bg-white rounded-lg shadow-sm p-4">
                  <h3 className="font-medium text-gray-900 mb-2">{section.title}</h3>
                  <ul className="space-y-2">
                    {section.lessons.map((lesson, lessonIndex) => (
                      <li key={lessonIndex} className="flex items-center text-gray-600">
                        <span className="w-6 h-6 flex items-center justify-center bg-primary/10 text-primary rounded-full text-sm mr-3">
                          {lessonIndex + 1}
                        </span>
                        {lesson}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-lg p-6 sticky top-8">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-primary">{course.price} tokens</h3>
            </div>
            
            <button className="w-full bg-primary text-white py-3 px-4 rounded-lg hover:bg-primary/90 mb-4">
              {t('enroll')}
            </button>
            
            <button className="w-full bg-white text-primary border border-primary py-3 px-4 rounded-lg hover:bg-primary/10">
              <MessageSquare className="h-5 w-5 inline mr-2" />
              {t('contactInstructor')}
            </button>

            <div className="mt-6 pt-6 border-t">
              <h4 className="font-medium text-gray-900 mb-4">{t('instructor')}</h4>
              <div className="flex items-center">
                <img
                  src={course.instructor.avatar}
                  alt={course.instructor.name}
                  className="h-12 w-12 rounded-full"
                />
                <div className="ml-3">
                  <p className="font-medium text-gray-900">{course.instructor.name}</p>
                  <p className="text-sm text-gray-500">{course.instructor.bio}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}