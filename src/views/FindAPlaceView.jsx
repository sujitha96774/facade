import React, { useState } from 'react';
import { SPACE_DIRECTORY } from '../data/mockData';
import { 
  Search, 
  Building, 
  Briefcase, 
  Store, 
  Sliders, 
  Compass, 
  ArrowUpRight, 
  CheckCircle2,
  Maximize2,
  Sun,
  Zap,
  MapPin,
  X
} from 'lucide-react';

export default function FindAPlaceView({ subRoute, searchQuery = '' }) {
  const [activeTab, setActiveTab] = useState(() => {
    if (subRoute === 'search-office') return 'Office';
    if (subRoute === 'search-shop') return 'Shop';
    if (subRoute === 'search-facility') return 'Facility';
    return 'Room';
  });

  const [filterQuery, setFilterQuery] = useState(searchQuery);
  const [selectedItem, setSelectedItem] = useState(null);

  const filteredItems = SPACE_DIRECTORY.filter(item => {
    const matchesCategory = item.category === activeTab;
    const matchesSearch = filterQuery === '' || 
      item.name.toLowerCase().includes(filterQuery.toLowerCase()) ||
      item.type.toLowerCase().includes(filterQuery.toLowerCase()) ||
      item.floor.toLowerCase().includes(filterQuery.toLowerCase()) ||
      item.id.toLowerCase().includes(filterQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const tabs = [
    { id: 'Room', label: 'Search Room', icon: Building, count: SPACE_DIRECTORY.filter(i => i.category === 'Room').length },
    { id: 'Office', label: 'Search Office', icon: Briefcase, count: SPACE_DIRECTORY.filter(i => i.category === 'Office').length },
    { id: 'Shop', label: 'Search Shop', icon: Store, count: SPACE_DIRECTORY.filter(i => i.category === 'Shop').length },
    { id: 'Facility', label: 'Search Facility', icon: Sliders, count: SPACE_DIRECTORY.filter(i => i.category === 'Facility').length },
  ];

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
            <Compass className="w-4 h-4 text-amber-400" />
            <span>NAVIGATION & SPACE DIRECTORY</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900">
            Find a Place in <span className="text-cyan-400">PS 26116 Building</span>
          </h1>
          <p className="text-slate-500 text-xs mt-1">
            Search residential apartments, commercial offices, podium retail shops, and basement EV facilities.
          </p>
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
          <input
            type="text"
            placeholder={`Search ${activeTab.toLowerCase()}s by name, floor, or ID...`}
            value={filterQuery}
            onChange={(e) => setFilterQuery(e.target.value)}
            className="w-full bg-white border border-slate-300 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-cyan-500 transition"
          />
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-3">
        {tabs.map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold transition ${
                isActive 
                  ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-lg shadow-cyan-200/50' 
                  : 'bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
              <span className={`px-1.5 py-0.5 rounded-full text-[10px] ${isActive ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'}`}>
                {tab.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Directory Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredItems.map(item => (
          <div
            key={item.id}
            onClick={() => setSelectedItem(item)}
            className="glass-panel p-5 rounded-2xl border border-slate-200 hover:border-cyan-500/50 hover:bg-slate-50 transition cursor-pointer group flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-cyan-400 px-2.5 py-1 rounded-md bg-cyan-50 border border-cyan-200">
                  {item.id}
                </span>
                <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                  item.status === 'Occupied' || item.status === 'Active' 
                    ? 'bg-emerald-50 text-emerald-400 border border-emerald-200' 
                    : item.status === 'Available'
                    ? 'bg-blue-50 text-blue-400 border border-blue-200'
                    : 'bg-amber-50 text-amber-400 border border-amber-200'
                }`}>
                  {item.status}
                </span>
              </div>

              <div>
                <h3 className="font-bold text-slate-900 text-base group-hover:text-cyan-600 transition-colors">
                  {item.name}
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">{item.type} • {item.floor}</p>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-2 text-xs border-t border-slate-200">
                <div className="bg-slate-50 p-2 rounded-lg border border-slate-200">
                  <span className="text-[10px] text-slate-500 block">Area</span>
                  <span className="font-bold text-slate-700">{item.areaSqM} sq.m</span>
                </div>
                <div className="bg-slate-50 p-2 rounded-lg border border-slate-200">
                  <span className="text-[10px] text-slate-500 block">Dimensions</span>
                  <span className="font-mono text-[11px] text-cyan-400">{item.dimensionsMm}</span>
                </div>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-between text-xs text-cyan-400 group-hover:text-cyan-600 font-medium">
              <span>View Full Revit BIM Specs</span>
              <ArrowUpRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        ))}
      </div>

      {/* Details Modal */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white glass-panel max-w-lg w-full rounded-2xl border border-slate-200 p-6 space-y-5 relative animate-fadeIn shadow-2xl">
            <button 
              onClick={() => setSelectedItem(null)}
              className="absolute top-4 right-4 text-slate-500 hover:text-slate-900 p-1 rounded-lg bg-slate-100 hover:bg-slate-200 transition"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-1">
              <span className="font-mono text-xs font-bold text-cyan-400 px-2.5 py-1 rounded bg-cyan-50 border border-cyan-200 inline-block">
                {selectedItem.id}
              </span>
              <h2 className="text-xl font-extrabold text-slate-900 mt-1">{selectedItem.name}</h2>
              <p className="text-xs text-slate-500">{selectedItem.type} • {selectedItem.floor}</p>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                <span className="text-slate-500 text-[10px]">Carpet Area</span>
                <p className="font-bold text-slate-900 text-base">{selectedItem.areaSqM} sq.m</p>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                <span className="text-slate-500 text-[10px]">Revit Dimensions (mm)</span>
                <p className="font-mono font-bold text-cyan-400 text-sm">{selectedItem.dimensionsMm}</p>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                <span className="text-slate-500 text-[10px]">Daylight Autonomy Index</span>
                <p className="font-bold text-yellow-400 text-sm flex items-center gap-1">
                  <Sun className="w-3.5 h-3.5" />
                  <span>{selectedItem.daylightFactor}</span>
                </p>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                <span className="text-slate-500 text-[10px]">EV Parking Access</span>
                <p className="font-bold text-emerald-400 text-xs flex items-center gap-1">
                  <Zap className="w-3.5 h-3.5" />
                  <span>{selectedItem.evAccess}</span>
                </p>
              </div>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-1">
              <span className="text-slate-500 text-[10px]">Current Tenant / Allocation Status</span>
              <p className="font-semibold text-slate-700">{selectedItem.tenant}</p>
            </div>

            <button
              onClick={() => setSelectedItem(null)}
              className="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs border border-slate-200 transition"
            >
              Close Spec Sheet
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
