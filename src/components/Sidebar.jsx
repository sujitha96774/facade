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
  LogIn, 
  ChevronDown, 
  ChevronRight, 
  Search, 
  ShieldCheck,
  Building,
  Store,
  Briefcase,
  Sliders,
  UserCheck
} from 'lucide-react';

export default function Sidebar({ 
  currentRoute, 
  currentSubRoute, 
  onNavigate, 
  activePersona, 
  unreadAlertsCount = 2,
  collapsed,
  setCollapsed
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

  const navItemClass = (route, subRoute = null) => {
    const isSelected = subRoute 
      ? (currentRoute === route && currentSubRoute === subRoute)
      : (currentRoute === route && !currentSubRoute);
      
    return `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 cursor-pointer ${
      isSelected 
        ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-lg shadow-cyan-900/30' 
        : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
    }`;
  };

  const subNavItemClass = (route, subRoute) => {
    const isSelected = currentRoute === route && currentSubRoute === subRoute;
    return `flex items-center gap-2.5 pl-9 pr-3 py-2 rounded-lg text-xs font-medium transition-all cursor-pointer ${
      isSelected 
        ? 'text-cyan-400 bg-cyan-950/40 border-l-2 border-cyan-400 font-semibold' 
        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
    }`;
  };

  return (
    <aside className={`h-screen sticky top-0 bg-slate-900/95 border-r border-slate-800 flex flex-col transition-all duration-300 z-30 select-none ${collapsed ? 'w-20' : 'w-72'}`}>
      {/* Header Logo */}
      <div className="p-4 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-3 overflow-hidden">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white shadow-md shadow-cyan-500/20 shrink-0">
            <Building2 className="w-6 h-6" />
          </div>
          {!collapsed && (
            <div className="flex flex-col">
              <span className="font-extrabold tracking-tight text-white text-base leading-tight">
                URBAN FACADE <span className="text-cyan-400">360</span>
              </span>
              <span className="text-[10px] text-slate-400 font-mono tracking-wider">REVIT B+G+9 BIM</span>
            </div>
          )}
        </div>
        <button 
          onClick={() => setCollapsed(!collapsed)}
          className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition"
          title={collapsed ? "Expand menu" : "Collapse menu"}
        >
          {collapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronDown className="w-5 h-5 rotate-90" />}
        </button>
      </div>

      {/* User Login Persona Banner */}
      <div className="p-3 mx-2 my-2 rounded-xl bg-slate-800/50 border border-slate-700/60 flex items-center justify-between">
        <div className="flex items-center gap-2.5 overflow-hidden">
          <div className="w-8 h-8 rounded-full bg-cyan-900/60 border border-cyan-500/40 flex items-center justify-center text-cyan-300 text-xs font-bold shrink-0">
            {activePersona?.avatar || "SIH"}
          </div>
          {!collapsed && (
            <div className="flex flex-col truncate">
              <span className="text-xs font-semibold text-slate-200 truncate">{activePersona?.name || "Jury / Evaluator"}</span>
              <span className="text-[10px] text-cyan-400 font-mono">{activePersona?.role || "Autodesk Assessor"}</span>
            </div>
          )}
        </div>
        {!collapsed && (
          <button 
            onClick={() => onNavigate('login')}
            className="p-1.5 rounded-lg text-slate-400 hover:text-cyan-300 hover:bg-slate-700/60 transition"
            title="Switch Login Persona"
          >
            <LogIn className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Navigation Links */}
      <div className="flex-1 overflow-y-auto px-3 py-2 space-y-1">
        
        {/* LOGIN PAGE LINK */}
        <div 
          className={navItemClass('login')}
          onClick={() => onNavigate('login')}
          title="Login Page"
        >
          <UserCheck className="w-5 h-5 text-indigo-400 shrink-0" />
          {!collapsed && <span>Login Page</span>}
        </div>

        {/* 🏠 HOME */}
        <div 
          className={navItemClass('home')}
          onClick={() => onNavigate('home')}
          title="Home Dashboard"
        >
          <Home className="w-5 h-5 text-sky-400 shrink-0" />
          {!collapsed && <span>Home</span>}
        </div>

        {/* 🧭 FIND A PLACE */}
        <div>
          <div 
            className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800/60 transition cursor-pointer ${
              currentRoute === 'find-a-place' ? 'bg-slate-800/80 text-cyan-300' : ''
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
              <Compass className="w-5 h-5 text-amber-400 shrink-0" />
              {!collapsed && <span>Find a Place</span>}
            </div>
            {!collapsed && (
              <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${openSubMenus.findAPlace ? 'rotate-180' : ''}`} />
            )}
          </div>

          {!collapsed && openSubMenus.findAPlace && (
            <div className="mt-1 space-y-0.5 animate-fadeIn">
              <div 
                className={subNavItemClass('find-a-place', 'search-room')}
                onClick={() => onNavigate('find-a-place', 'search-room')}
              >
                <Building className="w-3.5 h-3.5 text-slate-400" />
                <span>Search Room</span>
              </div>
              <div 
                className={subNavItemClass('find-a-place', 'search-office')}
                onClick={() => onNavigate('find-a-place', 'search-office')}
              >
                <Briefcase className="w-3.5 h-3.5 text-slate-400" />
                <span>Search Office</span>
              </div>
              <div 
                className={subNavItemClass('find-a-place', 'search-shop')}
                onClick={() => onNavigate('find-a-place', 'search-shop')}
              >
                <Store className="w-3.5 h-3.5 text-slate-400" />
                <span>Search Shop</span>
              </div>
              <div 
                className={subNavItemClass('find-a-place', 'search-facility')}
                onClick={() => onNavigate('find-a-place', 'search-facility')}
              >
                <Sliders className="w-3.5 h-3.5 text-slate-400" />
                <span>Search Facility</span>
              </div>
            </div>
          )}
        </div>

        {/* 🏢 BIM MODEL */}
        <div>
          <div 
            className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800/60 transition cursor-pointer ${
              currentRoute === 'bim-model' ? 'bg-slate-800/80 text-cyan-300' : ''
            }`}
            onClick={() => {
              if (collapsed) {
                setCollapsed(false);
                setOpenSubMenus(prev => ({ ...prev, bimModel: true }));
              } else {
                toggleSubMenu('bimModel');
              }
            }}
            title="BIM Model"
          >
            <div className="flex items-center gap-3">
              <Layers className="w-5 h-5 text-blue-400 shrink-0" />
              {!collapsed && <span>BIM Model</span>}
            </div>
            {!collapsed && (
              <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${openSubMenus.bimModel ? 'rotate-180' : ''}`} />
            )}
          </div>

          {!collapsed && openSubMenus.bimModel && (
            <div className="mt-1 space-y-0.5 animate-fadeIn">
              <div 
                className={subNavItemClass('bim-model', '3d-building')}
                onClick={() => onNavigate('bim-model', '3d-building')}
              >
                <Building2 className="w-3.5 h-3.5 text-cyan-400" />
                <span>3D Building</span>
              </div>
              <div 
                className={subNavItemClass('bim-model', 'floor-explorer')}
                onClick={() => onNavigate('bim-model', 'floor-explorer')}
              >
                <Search className="w-3.5 h-3.5 text-blue-400" />
                <span>Floor Explorer</span>
              </div>
            </div>
          )}
        </div>

        {/* 🚗 PARKING & EV */}
        <div 
          className={navItemClass('parking-ev')}
          onClick={() => onNavigate('parking-ev')}
          title="Parking & EV Charging"
        >
          <Car className="w-5 h-5 text-emerald-400 shrink-0" />
          {!collapsed && (
            <div className="flex items-center justify-between flex-1">
              <span>Parking & EV</span>
              <span className="px-1.5 py-0.5 rounded text-[10px] bg-emerald-950 text-emerald-400 border border-emerald-800/60">
                200 Slots
              </span>
            </div>
          )}
        </div>

        {/* 🌿 COURTYARD & CLIMATE */}
        <div 
          className={navItemClass('courtyard-climate')}
          onClick={() => onNavigate('courtyard-climate')}
          title="Courtyard & Climate (Forma)"
        >
          <Trees className="w-5 h-5 text-teal-400 shrink-0" />
          {!collapsed && <span>Courtyard & Climate</span>}
        </div>

        {/* 🏗 STRUCTURE */}
        <div 
          className={navItemClass('structure')}
          onClick={() => onNavigate('structure')}
          title="Structural Detailing & Rebar"
        >
          <Hammer className="w-5 h-5 text-orange-400 shrink-0" />
          {!collapsed && <span>Structure</span>}
        </div>

        {/* 🌞 FACADE */}
        <div 
          className={navItemClass('facade')}
          onClick={() => onNavigate('facade')}
          title="Kinetic Climate-Responsive Facade"
        >
          <Sun className="w-5 h-5 text-yellow-400 shrink-0" />
          {!collapsed && <span>Facade</span>}
        </div>

        {/* 📊 BUILDING MONITORING */}
        <div 
          className={navItemClass('building-monitoring')}
          onClick={() => onNavigate('building-monitoring')}
          title="IoT Building Monitoring"
        >
          <Activity className="w-5 h-5 text-purple-400 shrink-0" />
          {!collapsed && <span>Building Monitoring</span>}
        </div>

        {/* 🚨 ALERTS */}
        <div 
          className={navItemClass('alerts')}
          onClick={() => onNavigate('alerts')}
          title="Alerts & System Logs"
        >
          <Bell className="w-5 h-5 text-rose-400 shrink-0" />
          {!collapsed && (
            <div className="flex items-center justify-between flex-1">
              <span>Alerts</span>
              {unreadAlertsCount > 0 && (
                <span className="w-5 h-5 rounded-full bg-rose-600 text-white text-xs font-bold flex items-center justify-center">
                  {unreadAlertsCount}
                </span>
              )}
            </div>
          )}
        </div>

        {/* 🎥 WALKTHROUGH */}
        <div 
          className={navItemClass('walkthrough')}
          onClick={() => onNavigate('walkthrough')}
          title="30-Sec 3D Walkthrough Tour"
        >
          <Video className="w-5 h-5 text-pink-400 shrink-0" />
          {!collapsed && (
            <div className="flex items-center justify-between flex-1">
              <span>Walkthrough</span>
              <span className="px-1.5 py-0.5 rounded text-[9px] bg-pink-950 text-pink-300 border border-pink-800/60 font-mono">
                30s Tour
              </span>
            </div>
          )}
        </div>

      </div>

      {/* Footer / Autodesk Badge */}
      {!collapsed && (
        <div className="p-3 border-t border-slate-800 bg-slate-950/60 text-center">
          <div className="flex items-center justify-center gap-1.5 text-xs text-slate-400">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Revit B+G+9 Standard</span>
          </div>
          <p className="text-[10px] text-slate-500 mt-0.5">200 Parking Slots & 40 EV</p>
        </div>
      )}
    </aside>
  );
}
