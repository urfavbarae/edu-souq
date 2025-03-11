import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Courses from './pages/Courses';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Dashboard from './pages/Dashboard';
import Wallet from './pages/Wallet';
import Settings from './pages/Settings';
import Community from './pages/Community';
import Teach from './components/Teach';
import {CourseDetails} from './pages/CourseDetails';
import { ThemeLanguageProvider } from './contexts/ThemeLanguageContext';

function App() {
  return (
    <ThemeLanguageProvider>
      <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="courses" element={<Courses />} />
            <Route path="signin" element={<SignIn />} />
            <Route path="signup" element={<SignUp />} />
            <Route path="/courses/:id" element={<CourseDetails />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="wallet" element={<Wallet />} />
            <Route path="settings" element={<Settings />} />
            <Route path="community" element={<Community />} />
            <Route path="/teach" element={<Teach />}/> 
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeLanguageProvider>
  );
}

export default App;