import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Bell, 
  Clock, 
  Sparkles, 
  ChevronRight,
  Maximize2,
  Minimize2,
  Menu,
  X
} from 'lucide-react';

export default function Navbar({ 
  currentRoute, 
  currentSubRoute, 
  onNavigate, 
  onSearchQuery, 
  unreadAlertsCount = 2,
  activePersona,
  isMobile = false,
  onToggleMobileMenu
}) {
  const [time, setTime] = useState(new Date());
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [quickSearch, setQuickSearch] = useState('');
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);

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
      <div className="flex items-center gap-1 sm:gap-1.5 md:gap-2 text-[11px] sm:text-xs text-slate-500 truncate">
        <span className="hover:text-slate-700 cursor-pointer hidden md:inline shrink-0" onClick={() => onNavigate('home')}>PS 26116</span>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400 hidden md:inline shrink-0" />
        <span className="font-semibold text-slate-800 truncate">{formatName(currentRoute)}</span>
        {currentSubRoute && (
          <>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="font-semibold text-cyan-600 truncate">{formatName(currentSubRoute)}</span>
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
      setMobileSearchOpen(false);
    }
  };

  return (
    <header className="bg-white/95 backdrop-blur-md border-b border-slate-200 px-2.5 sm:px-4 md:px-6 sticky top-0 z-20 shadow-sm transition-all">
      <div className="h-14 md:h-16 flex items-center justify-between gap-2">
        {/* Left: Hamburger (mobile) + Breadcrumbs */}
        <div className="flex items-center gap-1.5 sm:gap-2 md:gap-4 min-w-0">
          {/* Mobile Hamburger Button */}
          {isMobile && (
            <button
              onClick={onToggleMobileMenu}
              className="p-2 -ml-1 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition shrink-0"
              title="Open Menu"
              aria-label="Open Menu"
            >
              <Menu className="w-5 h-5" />
            </button>
          )}
          {routeBreadcrumbs()}
        </div>

        {/* Middle: Global Search Input (desktop) */}
        <form onSubmit={handleSearchSubmit} className="hidden md:flex items-center relative w-64 lg:w-96">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 pointer-events-none" />
          <input
            type="text"
            placeholder="Search rooms, offices, EV slots..."
            value={quickSearch}
            onChange={(e) => setQuickSearch(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-4 py-1.5 text-xs text-slate-700 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition"
          />
        </form>

        {/* Right: Tools & Live Clock */}
        <div className="flex items-center gap-1 sm:gap-2 md:gap-3 shrink-0">
          {/* Mobile Search Toggle */}
          <button
            onClick={() => setMobileSearchOpen(!mobileSearchOpen)}
            className="md:hidden p-2 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition"
            title="Search"
            aria-label="Search"
          >
            {mobileSearchOpen ? <X className="w-4.5 h-4.5 text-slate-700" /> : <Search className="w-4.5 h-4.5" />}
          </button>

          {/* Live System Time (hidden on tiny screens) */}
          <div className="hidden sm:flex items-center gap-1.5 md:gap-2 px-2 md:px-3 py-1 rounded-xl bg-slate-50 border border-slate-200 text-[11px] sm:text-xs font-mono text-cyan-600">
            <Clock className="w-3.5 h-3.5 text-cyan-500 animate-pulse shrink-0" />
            <span className="hidden lg:inline">{time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}</span>
            <span className="lg:hidden">{time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
          </div>

          {/* SIH Status Tag (desktop only) */}
          <div className="hidden xl:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-cyan-50 border border-cyan-200 text-[11px] font-medium text-cyan-600">
            <Sparkles className="w-3.5 h-3.5 text-yellow-500" />
            <span>B+G+9 Revit Model</span>
          </div>

          {/* Alerts Notification Trigger */}
          <button 
            onClick={() => onNavigate('alerts')}
            className="relative p-2 rounded-xl text-slate-500 hover:text-slate-700 hover:bg-slate-100 transition"
            title="View Building Alerts"
            aria-label="View Building Alerts"
          >
            <Bell className="w-4.5 h-4.5 sm:w-5 sm:h-5 text-rose-500" />
            {unreadAlertsCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-rose-500 rounded-full animate-ping" />
            )}
          </button>

          {/* Fullscreen Toggle (desktop only) */}
          <button 
            onClick={toggleFullscreen}
            className="hidden md:block p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition"
            title="Toggle Fullscreen"
            aria-label="Toggle Fullscreen"
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>

          {/* User Persona Switcher */}
          <div 
            onClick={() => onNavigate('login')}
            className="flex items-center gap-2 pl-1.5 sm:pl-2 border-l border-slate-200 cursor-pointer hover:opacity-80 transition"
            title="Switch User Role"
          >
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gradient-to-tr from-cyan-600 to-indigo-600 flex items-center justify-center text-white text-[10px] sm:text-xs font-bold border border-cyan-300/40">
              {activePersona?.avatar || "AP"}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Search Expandable Drawer */}
      {mobileSearchOpen && (
        <form onSubmit={handleSearchSubmit} className="md:hidden pb-3 pt-1 animate-fadeIn">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5 pointer-events-none" />
            <input
              type="text"
              placeholder="Search rooms, offices, EV slots..."
              value={quickSearch}
              onChange={(e) => setQuickSearch(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-800 focus:outline-none focus:border-cyan-500 transition"
              autoFocus
            />
          </div>
        </form>
      )}
    </header>
  );
}
