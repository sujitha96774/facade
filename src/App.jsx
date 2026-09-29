import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import { Home, Layers, Compass, Car, Menu } from 'lucide-react';

import LoginView, { PERSONAS } from './views/LoginView';
import HomeView from './views/HomeView';
import FindAPlaceView from './views/FindAPlaceView';
import BimModelView from './views/BimModelView';
import ParkingEvView from './views/ParkingEvView';
import CourtyardClimateView from './views/CourtyardClimateView';
import StructureView from './views/StructureView';
import FacadeView from './views/FacadeView';
import BuildingMonitoringView from './views/BuildingMonitoringView';


export default function App() {
  const [currentRoute, setCurrentRoute] = useState('login');
  const [currentSubRoute, setCurrentSubRoute] = useState(null);
  const [activePersona, setActivePersona] = useState(PERSONAS[0]);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile & tablet screen (< 1024px)
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      if (!mobile) {
        setMobileMenuOpen(false);
      }
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Lock body scroll when mobile drawer is open
  useEffect(() => {
    if (isMobile && mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobile, mobileMenuOpen]);

  const handleNavigate = (route, subRoute = null) => {
    setCurrentRoute(route);
    setCurrentSubRoute(subRoute);
    if (isMobile) setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSearchQuery = (query) => {
    setSearchQuery(query);
  };

  const renderActiveView = () => {
    switch (currentRoute) {
      case 'login':
        return (
          <LoginView 
            onLoginSuccess={(persona) => setActivePersona(persona)} 
            onNavigate={handleNavigate} 
          />
        );
      case 'home':
        return <HomeView onNavigate={handleNavigate} />;
      case 'find-a-place':
        return <FindAPlaceView subRoute={currentSubRoute} searchQuery={searchQuery} />;
      case 'bim-model':
        return <BimModelView subRoute={currentSubRoute} />;
      case 'parking-ev':
        return <ParkingEvView />;
      case 'courtyard-climate':
        return <CourtyardClimateView />;
      case 'structure':
        return <StructureView />;
      case 'facade':
        return <FacadeView />;
      case 'building-monitoring':
        return <BuildingMonitoringView />;
      case 'alerts':
        return <AlertsView />;
      default:
        return (
          <LoginView 
            onLoginSuccess={(persona) => setActivePersona(persona)} 
            onNavigate={handleNavigate} 
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-white text-slate-800 flex font-sans antialiased selection:bg-cyan-500 selection:text-white">
      
      {/* Mobile Sidebar Overlay Backdrop */}
      {isMobile && mobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-40 transition-opacity animate-fadeIn"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar - Desktop: sticky side | Mobile: slide-over drawer */}
      <div className={`
        ${isMobile 
          ? `fixed top-0 left-0 h-full z-50 transition-transform duration-300 ease-in-out ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`
          : ''
        }
      `}>
        <Sidebar 
          currentRoute={currentRoute}
          currentSubRoute={currentSubRoute}
          onNavigate={handleNavigate}
          activePersona={activePersona}
          unreadAlertsCount={2}
          collapsed={isMobile ? false : sidebarCollapsed}
          setCollapsed={setSidebarCollapsed}
          isMobile={isMobile}
          onCloseMobile={() => setMobileMenuOpen(false)}
        />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <Navbar 
          currentRoute={currentRoute}
          currentSubRoute={currentSubRoute}
          onNavigate={handleNavigate}
          onSearchQuery={handleSearchQuery}
          unreadAlertsCount={2}
          activePersona={activePersona}
          isMobile={isMobile}
          onToggleMobileMenu={() => setMobileMenuOpen(!mobileMenuOpen)}
        />

        <main className={`flex-1 overflow-y-auto ${isMobile && currentRoute !== 'login' ? 'pb-20' : 'pb-6'}`}>
          {renderActiveView()}
        </main>
      </div>

      {/* Mobile Bottom Quick-Action Bar */}
      {isMobile && currentRoute !== 'login' && (
        <nav className="fixed bottom-0 left-0 right-0 z-30 bg-white/95 backdrop-blur-md border-t border-slate-200 px-2 py-1.5 flex items-center justify-around pb-safe shadow-lg">
          <button
            onClick={() => handleNavigate('home')}
            className={`flex flex-col items-center gap-0.5 py-1 px-3 rounded-xl transition ${
              currentRoute === 'home' ? 'text-cyan-600 font-bold' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <Home className="w-5 h-5" />
            <span className="text-[10px]">Home</span>
          </button>

          <button
            onClick={() => handleNavigate('bim-model', '3d-building')}
            className={`flex flex-col items-center gap-0.5 py-1 px-3 rounded-xl transition ${
              currentRoute === 'bim-model' ? 'text-cyan-600 font-bold' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <Layers className="w-5 h-5" />
            <span className="text-[10px]">3D BIM</span>
          </button>

          <button
            onClick={() => handleNavigate('find-a-place')}
            className={`flex flex-col items-center gap-0.5 py-1 px-3 rounded-xl transition ${
              currentRoute === 'find-a-place' ? 'text-cyan-600 font-bold' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <Compass className="w-5 h-5" />
            <span className="text-[10px]">Explore</span>
          </button>

          <button
            onClick={() => handleNavigate('parking-ev')}
            className={`flex flex-col items-center gap-0.5 py-1 px-3 rounded-xl transition ${
              currentRoute === 'parking-ev' ? 'text-cyan-600 font-bold' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <Car className="w-5 h-5" />
            <span className="text-[10px]">EV Parking</span>
          </button>

          <button
            onClick={() => setMobileMenuOpen(true)}
            className="flex flex-col items-center gap-0.5 py-1 px-3 rounded-xl text-slate-500 hover:text-slate-800 transition"
          >
            <Menu className="w-5 h-5" />
            <span className="text-[10px]">Menu</span>
          </button>
        </nav>
      )}
    </div>
  );
}
