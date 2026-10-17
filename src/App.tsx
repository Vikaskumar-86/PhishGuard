import React, { useEffect, useState } from 'react';
import { TestHistoryPage } from './pages/TestHistoryPage';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { TrainingProvider } from './context/TrainingContext';
import Navbar from "./components/common/Navbar"; 
import { Footer } from './components/common/Footer';

// Pages
import { HomePage } from './pages/HomePage';
import { RegisterPage } from './pages/RegisterPage';
import { LoginPage } from './pages/LoginPage';
import { DashboardPage } from './pages/DashboardPage';
import { LearnPage } from './pages/LearnPage';
import { ModuleDetailPage } from './pages/ModuleDetailPage';
import { SimulatorPage } from './pages/SimulatorPage';
import { QuizPage } from './pages/QuizPage';
import { ResultsPage } from './pages/ResultsPage';
import { SettingsPage } from './pages/SettingsPage';

export function AppContent() {
  const [currentPath, setCurrentPath] = useState<string>(() => {
    // Check URL hash first (for seamless sandbox support), fallback to pathname
    const hash = window.location.hash.replace(/^#/, ''); 
    if (hash) return hash;
    return window.location.pathname || '/';
  });

  const [isNavigating, setIsNavigating] = useState(false);

  useEffect(() => {
    const handlePopState = () => {
      const hash = window.location.hash.replace(/^#/, '');
      if (hash) {
        setCurrentPath(hash);
      } else {
        setCurrentPath(window.location.pathname || '/');
      }
    };

    window.addEventListener('popstate', handlePopState);
    window.addEventListener('hashchange', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('hashchange', handlePopState);
    };
  }, []);

  const navigate = (path: string) => {
    if (path === currentPath) return;
    setIsNavigating(true);
    // Smooth scroll to top and update path
    window.scrollTo({ top: 0, behavior: 'smooth' });
    window.location.hash = path;
    setCurrentPath(path);
    setTimeout(() => {
      setIsNavigating(false);
    }, 180);
  };

  // Route resolution
  const renderCurrentPage = () => {
    // Check if it is a module detail path: /learn/:id
    if (currentPath.startsWith('/learn/')) {
      const moduleId = currentPath.replace('/learn/', '');
      return <ModuleDetailPage moduleId={moduleId} onNavigate={navigate} />;
    }

    switch (currentPath) {
      case '/history':
        return <TestHistoryPage onNavigate={navigate} />;
      case '/login':
        return <LoginPage onNavigate={navigate} />;
      case '/register':
        return <RegisterPage onNavigate={navigate} />;
      case '/dashboard':
        return <DashboardPage onNavigate={navigate} />;
      case '/learn':
        return <LearnPage onNavigate={navigate} />;
      case '/simulator':
        return <SimulatorPage onNavigate={navigate} />;
      case '/quiz':
        return <QuizPage onNavigate={navigate} />;
      case '/results':
        return <ResultsPage onNavigate={navigate} />;
      case '/settings':
        return <SettingsPage onNavigate={navigate} />;
      case '/':
      default:
        return <HomePage onNavigate={navigate} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[var(--bg-page)] text-[var(--text-primary)] transition-colors duration-200">
      {/* Top Thin Progress Bar during navigation */}
      {isNavigating && (
        <div className="fixed top-0 left-0 right-0 z-50 h-0.5 bg-[var(--accent-color)] animate-pulse" />
      )}

      {/* Strict Top Bar Contract Navbar */}
      <Navbar currentPath={currentPath} onNavigate={navigate} />

      {/* Main Content View with subtle fade-in */}
      <main className="flex-1 animate-in fade-in duration-150">
        {renderCurrentPage()}
      </main>

      {/* Platform Footer */}
      <Footer onNavigate={navigate} />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <TrainingProvider>
          <AppContent />
        </TrainingProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
