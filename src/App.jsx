import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import { Home, Layers, Compass, Car, Menu } from 'lucide-react';

import { PERSONAS } from './data/personas';
import HomeView from './views/HomeView';
import FindAPlaceView from './views/FindAPlaceView';
import BimModelView from './views/BimModelView';
import ParkingEvView from './views/ParkingEvView';
import CourtyardClimateView from './views/CourtyardClimateView';
import StructureView from './views/StructureView';
import FacadeView from './views/FacadeView';
import BuildingMonitoringView from './views/BuildingMonitoringView';
import AlertsView from './views/AlertsView';


export default function App() {
  const [currentRoute, setCurrentRoute] = useState('home');
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
        return <HomeView onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="h-screen w-screen overflow-hidden bg-[#F4F2EC] text-[#17201D] flex font-sans antialiased selection:bg-[#557A68] selection:text-white relative">
      
      {/* Mobile Sidebar Overlay Backdrop */}
      {isMobile && mobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-[#18221F]/70 backdrop-blur-sm z-40 transition-opacity animate-fadeIn"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* 1. FIXED LEFT SIDEBAR */}
      <Sidebar 
        currentRoute={currentRoute}
        currentSubRoute={currentSubRoute}
        onNavigate={handleNavigate}
        activePersona={activePersona}
        unreadAlertsCount={2}
        collapsed={isMobile ? false : sidebarCollapsed}
        setCollapsed={setSidebarCollapsed}
        isMobile={isMobile}
        mobileMenuOpen={mobileMenuOpen}
        onCloseMobile={() => setMobileMenuOpen(false)}
      />

      {/* 2 & 3. MAIN APPLICATION AREA (Starts after the fixed sidebar, height 100vh, overflow hidden) */}
      <div className={`flex-1 flex flex-col h-screen overflow-hidden min-w-0 transition-all duration-300 ${
        isMobile ? 'ml-0' : (sidebarCollapsed ? 'ml-20' : 'ml-72')
      }`}>
        {/* 2. FIXED/STICKY TOP HEADER (Starts after sidebar, remains fixed at top) */}
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

        {/* 3. SCROLLABLE MAIN CONTENT AREA (ONLY vertical scrolling container) */}
        <main className={`flex-1 overflow-y-auto overflow-x-hidden ${isMobile ? 'pb-24' : 'pb-12'}`}>
          {renderActiveView()}
        </main>
      </div>

      {/* Mobile Bottom Quick-Action Bar */}
      {isMobile && (
        <nav className="fixed bottom-0 left-0 right-0 z-30 bg-[#FFFFFF]/95 backdrop-blur-md border-t border-[#DCE0DA] px-2 py-1.5 flex items-center justify-around pb-safe shadow-lg">
          <button
            onClick={() => handleNavigate('home')}
            className={`flex flex-col items-center gap-0.5 py-1 px-3 rounded-xl transition cursor-pointer ${
              currentRoute === 'home' ? 'text-[#557A68] font-bold' : 'text-[#6B7772] hover:text-[#17201D]'
            }`}
          >
            <Home className="w-5 h-5" />
            <span className="text-[10px]">Home</span>
          </button>

          <button
            onClick={() => handleNavigate('bim-model', '3d-building')}
            className={`flex flex-col items-center gap-0.5 py-1 px-3 rounded-xl transition cursor-pointer ${
              currentRoute === 'bim-model' ? 'text-[#557A68] font-bold' : 'text-[#6B7772] hover:text-[#17201D]'
            }`}
          >
            <Layers className="w-5 h-5" />
            <span className="text-[10px]">3D BIM</span>
          </button>

          <button
            onClick={() => handleNavigate('find-a-place')}
            className={`flex flex-col items-center gap-0.5 py-1 px-3 rounded-xl transition cursor-pointer ${
              currentRoute === 'find-a-place' ? 'text-[#557A68] font-bold' : 'text-[#6B7772] hover:text-[#17201D]'
            }`}
          >
            <Compass className="w-5 h-5" />
            <span className="text-[10px]">Explore</span>
          </button>

          <button
            onClick={() => handleNavigate('parking-ev')}
            className={`flex flex-col items-center gap-0.5 py-1 px-3 rounded-xl transition cursor-pointer ${
              currentRoute === 'parking-ev' ? 'text-[#557A68] font-bold' : 'text-[#6B7772] hover:text-[#17201D]'
            }`}
          >
            <Car className="w-5 h-5" />
            <span className="text-[10px]">EV Parking</span>
          </button>

          <button
            onClick={() => setMobileMenuOpen(true)}
            className="flex flex-col items-center gap-0.5 py-1 px-3 rounded-xl text-[#6B7772] hover:text-[#17201D] transition cursor-pointer"
          >
            <Menu className="w-5 h-5" />
            <span className="text-[10px]">Menu</span>
          </button>
        </nav>
      )}
    </div>
  );
}
