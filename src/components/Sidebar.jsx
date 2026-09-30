import React, { useState } from 'react';
import { 
  Building2, 
  Home, 
  Compass, 
  Layers, 
  Car, 
  Trees, 
  Hammer, 
  Sun, 
  Activity, 
  Bell, 
  Video, 
  ChevronDown, 
  ChevronRight, 
  Search, 
  ShieldCheck,
  Building,
  Store,
  Briefcase,
  Sliders,
  X
} from 'lucide-react';

export default function Sidebar({ 
  currentRoute, 
  currentSubRoute, 
  onNavigate, 
  activePersona, 
  unreadAlertsCount = 2,
  collapsed,
  setCollapsed,
  isMobile = false,
  mobileMenuOpen = false,
  onCloseMobile
}) {
  const [openSubMenus, setOpenSubMenus] = useState({
    findAPlace: true,
    bimModel: true
  });

  const toggleSubMenu = (menuKey) => {
    setOpenSubMenus(prev => ({
      ...prev,
      [menuKey]: !prev[menuKey]
    }));
  };

  const handleItemClick = (route, subRoute = null) => {
    onNavigate(route, subRoute);
    if (isMobile && onCloseMobile) {
      onCloseMobile();
    }
  };

  const navItemClass = (route, subRoute = null) => {
    const isSelected = subRoute 
      ? (currentRoute === route && currentSubRoute === subRoute)
      : (currentRoute === route && !currentSubRoute);
      
    return `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 cursor-pointer ${
      isSelected 
        ? 'bg-[#557A68] text-white shadow-md shadow-[#18221F]/50 font-semibold' 
        : 'text-[#DCE0DA]/80 hover:text-white hover:bg-[#2F4940]/60'
    }`;
  };

  const subNavItemClass = (route, subRoute) => {
    const isSelected = currentRoute === route && currentSubRoute === subRoute;
    return `flex items-center gap-2.5 pl-9 pr-3 py-2 rounded-lg text-xs font-medium transition-all cursor-pointer ${
      isSelected 
        ? 'text-[#557A68] bg-[#557A68]/20 border-l-2 border-[#557A68] font-semibold' 
        : 'text-[#DCE0DA]/60 hover:text-white hover:bg-[#2F4940]/40'
    }`;
  };

  const isExpanded = isMobile || !collapsed;

  return (
    <aside className={`fixed top-0 left-0 bottom-0 h-screen bg-[#18221F] border-r border-[#2F4940] flex flex-col transition-all duration-300 z-40 select-none pb-safe ${
      isMobile 
        ? `w-72 max-w-[85vw] ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}` 
        : (collapsed ? 'w-20' : 'w-72')
    }`}>
      {/* Header Logo */}
      <div className="p-4 border-b border-[#2F4940] flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3 overflow-hidden">
          <div className="w-10 h-10 rounded-xl bg-[#2F4940] border border-[#557A68]/50 flex items-center justify-center text-white shadow-md shrink-0">
            <Building2 className="w-6 h-6 text-[#DCE0DA]" />
          </div>
          {isExpanded && (
            <div className="flex flex-col">
              <span className="font-extrabold tracking-tight text-white text-base leading-tight">
                URBAN FACADE <span className="text-[#557A68]">360</span>
              </span>
              <span className="text-[10px] text-[#6B7772] font-mono tracking-wider">REVIT B+G+9 BIM</span>
            </div>
          )}
        </div>
        {isMobile ? (
          <button 
            onClick={onCloseMobile}
            className="text-[#DCE0DA]/70 hover:text-white p-2 rounded-xl hover:bg-[#2F4940] transition cursor-pointer"
            title="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        ) : (
          <button 
            onClick={() => setCollapsed(!collapsed)}
            className="text-[#DCE0DA]/70 hover:text-white p-1 rounded-lg hover:bg-[#2F4940] transition cursor-pointer"
            title={collapsed ? "Expand menu" : "Collapse menu"}
          >
            {collapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronDown className="w-5 h-5 rotate-90" />}
          </button>
        )}
      </div>

      {/* User Profile Banner */}
      <div className="p-3 mx-2 my-2 rounded-xl bg-[#2F4940]/40 border border-[#2F4940] flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2.5 overflow-hidden">
          <div className="w-8 h-8 rounded-full bg-[#2F4940] border border-[#557A68] flex items-center justify-center text-[#DCE0DA] text-xs font-bold shrink-0">
            {activePersona?.avatar || "SIH"}
          </div>
          {isExpanded && (
            <div className="flex flex-col truncate">
              <span className="text-xs font-semibold text-white truncate">{activePersona?.name || "Jury / Evaluator"}</span>
              <span className="text-[10px] text-[#557A68] font-mono">{activePersona?.role || "Autodesk Assessor"}</span>
            </div>
          )}
        </div>
      </div>

      {/* Navigation Links */}
      <div className="flex-1 overflow-y-auto px-3 py-2 space-y-1">
        
        {/* 🏠 HOME */}
        <div 
          className={navItemClass('home')}
          onClick={() => handleItemClick('home')}
          title="Home Dashboard"
        >
          <Home className="w-5 h-5 text-sky-400 shrink-0" />
          {isExpanded && <span>Home</span>}
        </div>

        {/* 🧭 FIND A PLACE */}
        <div>
          <div 
            className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium text-[#DCE0DA]/80 hover:text-white hover:bg-[#2F4940]/60 transition cursor-pointer ${
              currentRoute === 'find-a-place' ? 'bg-[#2F4940] text-white font-semibold' : ''
            }`}
            onClick={() => {
              if (collapsed) {
                setCollapsed(false);
                setOpenSubMenus(prev => ({ ...prev, findAPlace: true }));
              } else {
                toggleSubMenu('findAPlace');
              }
            }}
            title="Find a Place"
          >
            <div className="flex items-center gap-3">
              <Compass className="w-5 h-5 text-[#C69A45] shrink-0" />
              {isExpanded && <span>Find a Place</span>}
            </div>
            {isExpanded && (
              <ChevronDown className={`w-4 h-4 text-[#6B7772] transition-transform ${openSubMenus.findAPlace ? 'rotate-180' : ''}`} />
            )}
          </div>

          {isExpanded && openSubMenus.findAPlace && (
            <div className="mt-1 space-y-0.5 animate-fadeIn">
              <div 
                className={subNavItemClass('find-a-place', 'search-room')}
                onClick={() => handleItemClick('find-a-place', 'search-room')}
              >
                <Building className="w-3.5 h-3.5 text-[#6B7772]" />
                <span>Search Room</span>
              </div>
              <div 
                className={subNavItemClass('find-a-place', 'search-office')}
                onClick={() => handleItemClick('find-a-place', 'search-office')}
              >
                <Briefcase className="w-3.5 h-3.5 text-[#6B7772]" />
                <span>Search Office</span>
              </div>
              <div 
                className={subNavItemClass('find-a-place', 'search-shop')}
                onClick={() => handleItemClick('find-a-place', 'search-shop')}
              >
                <Store className="w-3.5 h-3.5 text-[#6B7772]" />
                <span>Search Shop</span>
              </div>
              <div 
                className={subNavItemClass('find-a-place', 'search-facility')}
                onClick={() => handleItemClick('find-a-place', 'search-facility')}
              >
                <Sliders className="w-3.5 h-3.5 text-[#6B7772]" />
                <span>Search Facility</span>
              </div>
            </div>
          )}
        </div>

        {/* 🏢 BIM MODEL */}
        <div>
          <div 
            className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium text-[#DCE0DA]/80 hover:text-white hover:bg-[#2F4940]/60 transition cursor-pointer ${
              currentRoute === 'bim-model' ? 'bg-[#2F4940] text-white font-semibold' : ''
            }`}
            onClick={() => {
              if (collapsed && !isMobile) {
                setCollapsed(false);
                setOpenSubMenus(prev => ({ ...prev, bimModel: true }));
              } else {
                toggleSubMenu('bimModel');
              }
            }}
            title="BIM Model"
          >
            <div className="flex items-center gap-3">
              <Layers className="w-5 h-5 text-[#3D8B8B] shrink-0" />
              {isExpanded && <span>BIM Model</span>}
            </div>
            {isExpanded && (
              <ChevronDown className={`w-4 h-4 text-[#6B7772] transition-transform ${openSubMenus.bimModel ? 'rotate-180' : ''}`} />
            )}
          </div>

          {isExpanded && openSubMenus.bimModel && (
            <div className="mt-1 space-y-0.5 animate-fadeIn">
              <div 
                className={subNavItemClass('bim-model', '3d-building')}
                onClick={() => handleItemClick('bim-model', '3d-building')}
              >
                <Building2 className="w-3.5 h-3.5 text-[#557A68]" />
                <span>3D Building</span>
              </div>
              <div 
                className={subNavItemClass('bim-model', 'floor-explorer')}
                onClick={() => handleItemClick('bim-model', 'floor-explorer')}
              >
                <Search className="w-3.5 h-3.5 text-[#6B7772]" />
                <span>Floor Explorer</span>
              </div>
            </div>
          )}
        </div>

        {/* 🚗 PARKING DASHBOARD */}
        <div 
          className={navItemClass('parking-ev')}
          onClick={() => handleItemClick('parking-ev')}
          title="Parking Dashboard"
        >
          <Car className="w-5 h-5 text-[#4D8A68] shrink-0" />
          {isExpanded && (
            <div className="flex items-center justify-between flex-1">
              <span>Parking Dashboard</span>
              <span className="px-1.5 py-0.5 rounded text-[10px] bg-[#2F4940] text-[#DCE0DA] border border-[#557A68]/40 font-mono font-bold">
                400 Slots
              </span>
            </div>
          )}
        </div>

        {/* 🌿 COURTYARD & CLIMATE */}
        <div 
          className={navItemClass('courtyard-climate')}
          onClick={() => handleItemClick('courtyard-climate')}
          title="Courtyard & Climate (Forma)"
        >
          <Trees className="w-5 h-5 text-[#557A68] shrink-0" />
          {isExpanded && <span>Courtyard & Climate</span>}
        </div>

        {/* 🏗 STRUCTURE */}
        <div 
          className={navItemClass('structure')}
          onClick={() => handleItemClick('structure')}
          title="Structural Detailing & Rebar"
        >
          <Hammer className="w-5 h-5 text-[#C7654D] shrink-0" />
          {isExpanded && <span>Structure</span>}
        </div>

        {/* 🌞 FACADE */}
        <div 
          className={navItemClass('facade')}
          onClick={() => handleItemClick('facade')}
          title="Kinetic Climate-Responsive Facade"
        >
          <Sun className="w-5 h-5 text-[#C69A45] shrink-0" />
          {isExpanded && <span>Facade</span>}
        </div>

        {/* 📊 BUILDING MONITORING */}
        <div 
          className={navItemClass('building-monitoring')}
          onClick={() => handleItemClick('building-monitoring')}
          title="IoT Building Monitoring"
        >
          <Activity className="w-5 h-5 text-[#3D8B8B] shrink-0" />
          {isExpanded && <span>Building Monitoring</span>}
        </div>

        {/* 🚨 ALERTS */}
        <div 
          className={navItemClass('alerts')}
          onClick={() => handleItemClick('alerts')}
          title="Alerts & System Logs"
        >
          <Bell className="w-5 h-5 text-[#B94A48] shrink-0" />
          {isExpanded && (
            <div className="flex items-center justify-between flex-1">
              <span>Alerts</span>
              {unreadAlertsCount > 0 && (
                <span className="w-5 h-5 rounded-full bg-[#B94A48] text-white text-xs font-bold flex items-center justify-center">
                  {unreadAlertsCount}
                </span>
              )}
            </div>
          )}
        </div>

      </div>

      {/* Footer / Autodesk Badge */}
      {isExpanded && (
        <div className="p-3 border-t border-[#2F4940] bg-[#18221F] text-center shrink-0">
          <div className="flex items-center justify-center gap-1.5 text-xs text-[#DCE0DA]/80">
            <ShieldCheck className="w-4 h-4 text-[#557A68]" />
            <span>Revit B+G+9 Standard</span>
          </div>
          <p className="text-[10px] text-[#6B7772] mt-0.5">400 Parking Slots • Architectural Earth</p>
        </div>
      )}
    </aside>
  );
}
