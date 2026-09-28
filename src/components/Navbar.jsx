import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Bell, 
  Clock, 
  Sparkles, 
  ShieldCheck, 
  ChevronRight,
  Maximize2,
  Minimize2,
  RefreshCw
} from 'lucide-react';

export default function Navbar({ 
  currentRoute, 
  currentSubRoute, 
  onNavigate, 
  onSearchQuery, 
  unreadAlertsCount = 2,
  activePersona 
}) {
  const [time, setTime] = useState(new Date());
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [quickSearch, setQuickSearch] = useState('');

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
        setIsFullscreen(false);
      }
    }
  };

  const routeBreadcrumbs = () => {
    const formatName = (str) => {
      if (!str) return '';
      return str.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    };

    return (
      <div className="flex items-center gap-2 text-xs text-slate-500">
        <span className="hover:text-slate-700 cursor-pointer" onClick={() => onNavigate('home')}>PS 26116</span>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        <span className="font-medium text-slate-700">{formatName(currentRoute)}</span>
        {currentSubRoute && (
          <>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="font-semibold text-cyan-600">{formatName(currentSubRoute)}</span>
          </>
        )}
      </div>
    );
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (quickSearch.trim()) {
      onSearchQuery(quickSearch);
      onNavigate('find-a-place', 'search-room');
    }
  };

  return (
    <header className="h-16 bg-white/95 backdrop-blur-md border-b border-slate-200 px-6 flex items-center justify-between sticky top-0 z-20 shadow-sm">
      {/* Left: Breadcrumbs */}
      <div className="flex items-center gap-4">
        {routeBreadcrumbs()}
      </div>

      {/* Middle: Global Search Input */}
      <form onSubmit={handleSearchSubmit} className="hidden md:flex items-center relative w-72 lg:w-96">
        <Search className="w-4 h-4 text-slate-400 absolute left-3 pointer-events-none" />
        <input
          type="text"
          placeholder="Search rooms, offices, EV slots, structural beams (mm)..."
          value={quickSearch}
          onChange={(e) => setQuickSearch(e.target.value)}
          className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-4 py-1.5 text-xs text-slate-700 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition"
        />
        <span className="absolute right-2 text-[10px] font-mono text-slate-400 border border-slate-200 rounded px-1.5 py-0.5">
          ⌘K
        </span>
      </form>

      {/* Right: Tools & Live Clock */}
      <div className="flex items-center gap-3">
        {/* Live System Time */}
        <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-xl bg-slate-50 border border-slate-200 text-xs font-mono text-cyan-600">
          <Clock className="w-3.5 h-3.5 text-cyan-500 animate-pulse" />
          <span>{time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}</span>
        </div>

        {/* SIH Status Tag */}
        <div className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-cyan-50 border border-cyan-200 text-[11px] font-medium text-cyan-600">
          <Sparkles className="w-3.5 h-3.5 text-yellow-500" />
          <span>B+G+9 Revit Model</span>
        </div>

        {/* Alerts Notification Trigger */}
        <button 
          onClick={() => onNavigate('alerts')}
          className="relative p-2 rounded-xl text-slate-500 hover:text-slate-700 hover:bg-slate-100 transition"
          title="View Building Alerts"
        >
          <Bell className="w-5 h-5 text-rose-500" />
          {unreadAlertsCount > 0 && (
            <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-rose-500 rounded-full animate-ping" />
          )}
        </button>

        {/* Fullscreen Toggle */}
        <button 
          onClick={toggleFullscreen}
          className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition"
          title="Toggle Fullscreen"
        >
          {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
        </button>

        {/* User Persona Switcher */}
        <div 
          onClick={() => onNavigate('login')}
          className="flex items-center gap-2 pl-2 border-l border-slate-200 cursor-pointer hover:opacity-80 transition"
        >
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-cyan-600 to-indigo-600 flex items-center justify-center text-white text-xs font-bold border border-cyan-300/40">
            {activePersona?.avatar || "AP"}
          </div>
        </div>
      </div>
    </header>
  );
}
