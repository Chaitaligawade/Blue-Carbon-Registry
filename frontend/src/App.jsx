import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Navbar from './Pages/Navbar';
import Sidebar from './Pages/Sidebar';
import Home from './Pages/Home';
import SubmitPage from './Pages/SubmitPage';
import CertificatePage from './Pages/CertificatePage ';
import LoginPage from './Pages/Auth/LoginPage';
import SignupPage from './Pages/Auth/SignupPage';
import useAuthStore from './stores/useAuthStore';
import { useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import MySubmissionsPage from './Pages/MySubmissionsPage';
import ProjectDetailPage from './Pages/ProjectDetailPage';

const App = () => {
  const { authUser, isCheckingAuth, checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, []);

  useEffect(() => {
    if (authUser !== null) {
      console.log("✅ Auth user:", authUser);
    }
  }, [authUser]);

  return (
    <div className="flex flex-col h-screen">
      <Toaster />
      {/* Navbar at top */}
      {authUser && <Navbar />}

      {/* Sidebar + Page Content */}
      <div className="flex flex-1 overflow-hidden">
        {authUser && <Sidebar />}

        <main className="flex-1 overflow-auto ">
          <Routes>
            <Route path="/" element={authUser ?<Home />:<Navigate to={'/signup'} />} />
            <Route path="/new-submission" element={authUser ?<SubmitPage />:<Navigate to={'/signup'} />} />
            <Route path="/my-submissions" element={authUser ?<MySubmissionsPage />:<Navigate to={'/signup'} />} />
            <Route path="/projects/:projectId" element={authUser ? <ProjectDetailPage /> : <Navigate to={'/signup'} />} />

            <Route path="/certificate/:projectId" element={authUser ?<CertificatePage />:<Navigate to={'/signup'} />} />
            <Route path='/signup' element={!authUser ? <SignupPage /> : <Navigate to={'/'} />} />
            <Route path='/login' element={!authUser ? <LoginPage /> : <Navigate to={'/'} />} />
            {/* <Route path='/test' element={<MyProjectsPage />} /> */}
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default App;