import React from 'react';
import { BookOpen, Clock, Award, TrendingUp } from 'lucide-react';
import { useAuthStore } from '../store/authStore';

const ENROLLED_COURSES = [
  {
    id: 1,
    title: "Introduction to Arabic Calligraphy",
    progress: 60,
    nextLesson: "Advanced Thuluth Script",
    image: "https://images.unsplash.com/photo-1609599006353-e629aaabfeae?auto=format&fit=crop&q=80&w=400&h=300"
  },
  {
    id: 2,
    title: "Moroccan Cuisine Fundamentals",
    progress: 30,
    nextLesson: "Traditional Tagine Preparation",
    image: "https://images.unsplash.com/photo-1541518763669-27fef04b14ea?auto=format&fit=crop&q=80&w=400&h=300"
  }
];

const ACHIEVEMENTS = [
  {
    id: 1,
    title: "Quick Learner",
    description: "Completed 5 lessons in one day",
    icon: TrendingUp,
    date: "2024-03-15"
  },
  {
    id: 2,
    title: "First Certificate",
    description: "Completed Arabic Basics Course",
    icon: Award,
    date: "2024-03-10"
  }
];

export default function Dashboard() {
  const { user } = useAuthStore();

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-[#4A90E2] to-[#00C4B4] rounded-xl p-6 text-white mb-8">
        <h1 className="text-2xl font-bold mb-2">Welcome back, {user?.name}!</h1>
        <p className="opacity-90">Continue your learning journey</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Progress Section */}
          <section>
            <h2 className="text-xl font-semibold mb-4">Your Courses</h2>
            <div className="space-y-4">
              {ENROLLED_COURSES.map(course => (
                <div key={course.id} className="bg-white rounded-xl shadow-sm p-4">
                  <div className="flex gap-4">
                    <img 
                      src={course.image} 
                      alt={course.title}
                      className="w-24 h-24 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold mb-2">{course.title}</h3>
                      <div className="mb-2">
                        <div className="h-2 bg-gray-200 rounded-full">
                          <div 
                            className="h-2 bg-[#4A90E2] rounded-full"
                            style={{ width: `${course.progress}%` }}
                          />
                        </div>
                        <p className="text-sm text-gray-600 mt-1">{course.progress}% Complete</p>
                      </div>
                      <p className="text-sm text-gray-600">
                        Next: {course.nextLesson}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Achievements Section */}
          <section>
            <h2 className="text-xl font-semibold mb-4">Recent Achievements</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {ACHIEVEMENTS.map(achievement => (
                <div key={achievement.id} className="bg-white rounded-xl shadow-sm p-4">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-[#4A90E2]/10 rounded-lg">
                      <achievement.icon className="text-[#4A90E2]" size={20} />
                    </div>
                    <div>
                      <h3 className="font-semibold">{achievement.title}</h3>
                      <p className="text-sm text-gray-600">{achievement.description}</p>
                      <p className="text-xs text-gray-500 mt-1">{achievement.date}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Stats */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-4">Your Stats</h2>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-[#4A90E2]/10 rounded-lg">
                  <BookOpen className="text-[#4A90E2]" size={20} />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Courses Enrolled</p>
                  <p className="font-semibold">4 Courses</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-[#4A90E2]/10 rounded-lg">
                  <Clock className="text-[#4A90E2]" size={20} />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Learning Time</p>
                  <p className="font-semibold">12.5 Hours</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-[#4A90E2]/10 rounded-lg">
                  <Award className="text-[#4A90E2]" size={20} />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Certificates</p>
                  <p className="font-semibold">2 Earned</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}