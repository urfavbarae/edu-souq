export interface User {
    id: string;
    name: string;
    email: string;
    avatar?: string;
    tokens: number;
    role: 'student' | 'teacher' | 'admin';
  }
  
  export interface Course {
    id: string;
    title: string;
    description: string;
    price: number;
    instructor: User;
    thumbnail: string;
    category: string;
    level: 'beginner' | 'intermediate' | 'advanced';
    duration: number;
    rating: number;
    enrolledCount: number;
  }
  
  export interface Message {
    id: string;
    senderId: string;
    receiverId: string;
    content: string;
    timestamp: Date;
    read: boolean;
  }
  
  export interface Transaction {
    id: string;
    userId: string;
    type: 'purchase' | 'earning';
    amount: number;
    description: string;
    timestamp: Date;
  }