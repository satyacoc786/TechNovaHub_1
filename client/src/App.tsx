import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { BookmarkProvider } from './contexts/BookmarkContext';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { SearchModal } from './components/common/SearchModal';

// Pages
import { HomePage } from './pages/HomePage';
import { OpportunitiesPage } from './pages/OpportunitiesPage';
import { HackathonsPage } from './pages/HackathonsPage';
import { TechathonsPage } from './pages/TechathonsPage';
import { LearningCenterPage } from './pages/LearningCenterPage';
import { LanguageLearningPage } from './pages/LanguageLearningPage';
import { RoadmapsPage } from './pages/RoadmapsPage';
import { RoadmapDetailPage } from './pages/RoadmapDetailPage';
import { TechNewsPage } from './pages/TechNewsPage';
import { ArticleDetailPage } from './pages/ArticleDetailPage';
import { AIToolsPage } from './pages/AIToolsPage';
import { AIAssistantPage } from './pages/AIAssistantPage';
import { CommunityPage } from './pages/CommunityPage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { UserDashboardPage } from './pages/UserDashboardPage';
import { AdminDashboardPage } from './pages/AdminDashboardPage';
import { NotFoundPage } from './pages/NotFoundPage';

export const App: React.FC = () => {
  const [searchModalOpen, setSearchModalOpen] = useState(false);

  return (
    <AuthProvider>
      <BookmarkProvider>
        <Router>
          <div className="min-h-screen bg-[#09090B] text-white flex flex-col font-sans selection:bg-[#FF7900] selection:text-black">
            {/* Global Navbar */}
            <Navbar onOpenSearch={() => setSearchModalOpen(true)} />

            {/* Main Content Area */}
            <main className="flex-1 pt-16">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/opportunities" element={<OpportunitiesPage />} />
                <Route path="/hackathons" element={<HackathonsPage />} />
                <Route path="/techathons" element={<TechathonsPage />} />
                <Route path="/learn" element={<LearningCenterPage />} />
                <Route path="/learn/:langSlug" element={<LanguageLearningPage />} />
                <Route path="/learn/:langSlug/:tutorialSlug" element={<LanguageLearningPage />} />
                <Route path="/roadmaps" element={<RoadmapsPage />} />
                <Route path="/roadmaps/:slug" element={<RoadmapDetailPage />} />
                <Route path="/news" element={<TechNewsPage />} />
                <Route path="/news/:slug" element={<ArticleDetailPage />} />
                <Route path="/ai-tools" element={<AIToolsPage />} />
                <Route path="/ai-assistant" element={<AIAssistantPage />} />
                <Route path="/community" element={<CommunityPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/dashboard" element={<UserDashboardPage />} />
                <Route path="/admin" element={<AdminDashboardPage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </main>

            {/* Global Footer */}
            <Footer />

            {/* Global Search Modal (Ctrl+K) */}
            <SearchModal
              isOpen={searchModalOpen}
              onClose={() => setSearchModalOpen(false)}
            />
          </div>
        </Router>
      </BookmarkProvider>
    </AuthProvider>
  );
};

export default App;
