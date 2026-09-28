import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';

import LoginView, { PERSONAS } from './views/LoginView';
import HomeView from './views/HomeView';
import FindAPlaceView from './views/FindAPlaceView';
import BimModelView from './views/BimModelView';
import ParkingEvView from './views/ParkingEvView';
import CourtyardClimateView from './views/CourtyardClimateView';
import StructureView from './views/StructureView';
import FacadeView from './views/FacadeView';
import BuildingMonitoringView from './views/BuildingMonitoringView';
import AlertsView from './views/AlertsView';
import WalkthroughView from './views/WalkthroughView';

export default function App() {
  // Set default initial route to 'login'
  const [currentRoute, setCurrentRoute] = useState('login');
  const [currentSubRoute, setCurrentSubRoute] = useState(null);
  const [activePersona, setActivePersona] = useState(PERSONAS[0]); // Jury persona default
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleNavigate = (route, subRoute = null) => {
    setCurrentRoute(route);
    setCurrentSubRoute(subRoute);
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
      case 'walkthrough':
        return <WalkthroughView />;
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
      {/* Sidebar Navigation */}
      <Sidebar 
        currentRoute={currentRoute}
        currentSubRoute={currentSubRoute}
        onNavigate={handleNavigate}
        activePersona={activePersona}
        unreadAlertsCount={2}
        collapsed={sidebarCollapsed}
        setCollapsed={setSidebarCollapsed}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Navbar */}
        <Navbar 
          currentRoute={currentRoute}
          currentSubRoute={currentSubRoute}
          onNavigate={handleNavigate}
          onSearchQuery={handleSearchQuery}
          unreadAlertsCount={2}
          activePersona={activePersona}
        />

        {/* View Content */}
        <main className="flex-1 overflow-y-auto">
          {renderActiveView()}
        </main>
      </div>
    </div>
  );
}
