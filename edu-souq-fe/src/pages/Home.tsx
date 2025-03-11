import React from 'react';
import { BookOpen, Users, Globe2, Award, ArrowRight, Languages, Wallet } from 'lucide-react';
import { Link } from 'react-router-dom';

function FeatureCard({ icon: Icon, title, description }: { icon: React.ElementType, title: string, description: string }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
      <div className="h-12 w-12 bg-[#4A90E2]/10 rounded-lg flex items-center justify-center mb-4">
        <Icon className="text-[#4A90E2]" size={24} />
      </div>
      <h3 className="text-xl font-semibold mb-2 text-gray-800">{title}</h3>
      <p className="text-[#7A7F80]">{description}</p>
    </div>
  );
}

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-[#4A90E2] to-[#00C4B4] text-white">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-6">Welcome to Edu-SouQ</h1>
            <p className="text-xl mb-8">Empowering Moroccan communities through collaborative learning and knowledge sharing</p>
            <Link 
              to="/courses"
              className="bg-[#FFC107] text-gray-900 px-8 py-3 rounded-full font-semibold hover:bg-[#FFC107]/90 transition-colors flex items-center gap-2 mx-auto w-fit"
            >
              Start Learning <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Why Choose Edu-SouQ?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <FeatureCard
            icon={BookOpen}
            title="Learn & Earn"
            description="Earn SQtokens by teaching others and completing courses. Use tokens to access more learning opportunities."
          />
          <FeatureCard
            icon={Users}
            title="Community Driven"
            description="Join a vibrant community of learners and teachers, sharing knowledge and experiences."
          />
          <FeatureCard
            icon={Languages}
            title="Multilingual Support"
            description="Access content in Arabic, French, and English to suit your preferred language."
          />
          <FeatureCard
            icon={Globe2}
            title="Accessible Learning"
            description="Optimized content delivery for all regions, including areas with limited internet connectivity."
          />
          <FeatureCard
            icon={Wallet}
            title="Token Economy"
            description="Manage your SQtokens through an integrated wallet system. Earn, spend, and track your learning journey."
          />
          <FeatureCard
            icon={Award}
            title="Earn Certificates"
            description="Get recognized for your achievements with verified certificates and earn bonus tokens."
          />
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-[#00C4B4] text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Start Your Learning Journey?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of learners and teachers in Morocco's most innovative educational platform.
          </p>
          <Link
            to="/signup"
            className="bg-white text-[#00C4B4] px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors flex items-center gap-2 mx-auto w-fit"
          >
            Join Now <ArrowRight size={20} />
          </Link>
        </div>
      </div>
    </>
  );
}