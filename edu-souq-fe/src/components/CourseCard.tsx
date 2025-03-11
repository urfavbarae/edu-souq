import React from 'react';
import { useTranslation } from 'react-i18next';
import { Star, Clock, Users } from 'lucide-react';
import { Course } from '../types';
import { Link } from 'react-router-dom';

interface CourseCardProps {
  course: Course;
}

export function CourseCard({ course }: CourseCardProps) {
  const { t } = useTranslation();

  return (
    <Link to={`/courses/${course.id}`} className="group">
      <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-200 hover:scale-105">
        <div className="relative pb-48">
          <img
            src={course.thumbnail}
            alt={course.title}
            className="absolute h-full w-full object-cover"
          />
        </div>
        <div className="p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-primary px-2 py-1 bg-primary/10 rounded-full">
              {course.category}
            </span>
            <span className="text-xs font-semibold text-accent">
              {course.level}
            </span>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">{course.title}</h3>
          <p className="text-sm text-gray-600 mb-4 line-clamp-2">{course.description}</p>
          <div className="flex items-center justify-between text-sm text-gray-500">
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-1" />
              <span>{course.duration}h</span>
            </div>
            <div className="flex items-center">
              <Star className="h-4 w-4 text-yellow-400 mr-1" />
              <span>{course.rating}</span>
            </div>
            <div className="flex items-center">
              <Users className="h-4 w-4 mr-1" />
              <span>{course.enrolledCount}</span>
            </div>
          </div>
          <div className="mt-4 flex items-center justify-between">
            <div className="flex items-center">
              <img
                src={course.instructor.avatar || 'https://ui-avatars.com/api/?name=' + course.instructor.name}
                alt={course.instructor.name}
                className="h-6 w-6 rounded-full mr-2"
              />
              <span className="text-sm text-gray-700">{course.instructor.name}</span>
            </div>
            <span className="text-lg font-bold text-primary">{course.price} tokens</span>
          </div>
        </div>
      </div>
    </Link>
  );
}