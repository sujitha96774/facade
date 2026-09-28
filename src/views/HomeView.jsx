import React from 'react';
import { 
  PROJECT_METRICS 
} from '../data/mockData';
import { 
  Building2, 
  Layers, 
  Trees, 
  Car, 
  Sun, 
  Hammer, 
  Award, 
  ArrowUpRight, 
  CheckCircle2, 
  Sparkles,
  Zap,
  Maximize2,
  Video,
  Activity,
  Compass
} from 'lucide-react';

export default function HomeView({ onNavigate }) {
  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      
      {/* Hero Banner Header */}
      <div className="relative rounded-3xl overflow-hidden glass-panel border border-slate-200 p-6 md:p-8 bg-gradient-to-r from-slate-50 via-white to-cyan-50/60">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-cyan-50 text-cyan-600 border border-cyan-200 text-xs font-semibold font-mono">
                {PROJECT_METRICS.id}
              </span>
              <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 text-xs font-semibold">
                Autodesk Grand Finale Model
              </span>
            </div>

            <h1 className="text-2xl md:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Urban Mixed-Use Design Challenge <br />
              <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
                Centrally Located B+G+9 Building
              </span>
            </h1>

            <p className="text-slate-600 text-xs md:text-sm leading-relaxed">
              Designed using Autodesk Revit BIM methodology. Featuring active commercial activations on Ground & 1st floor podiums, 8 residential tower levels, biophilic central landscape courtyard, kinetic climate-responsive facade, and basement parking with 200 slots & 40 DC fast EV chargers.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2 text-xs font-mono text-slate-600">
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-100 border border-slate-200">
                <Building2 className="w-3.5 h-3.5 text-cyan-400" />
                <span>11 Levels Total (B+G+9)</span>
              </div>
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-100 border border-slate-200">
                <Maximize2 className="w-3.5 h-3.5 text-blue-400" />
                <span>Plot: {PROJECT_METRICS.plotAreaMm}</span>
              </div>
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-100 border border-slate-200">
                <Trees className="w-3.5 h-3.5 text-emerald-400" />
                <span>Courtyard: {PROJECT_METRICS.courtyardAreaSqM} sq.m</span>
              </div>
            </div>
          </div>

          {/* Action Cards */}
          <div className="flex flex-col sm:flex-row lg:flex-col gap-3 w-full lg:w-72 shrink-0">
            <button
              onClick={() => onNavigate('bim-model', '3d-building')}
              className="px-4 py-3 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-semibold text-xs transition shadow-lg shadow-cyan-200/50 flex items-center justify-between group"
            >
              <div className="flex items-center gap-2.5">
                <Layers className="w-4 h-4 text-white" />
                <span>Launch 3D BIM Viewer</span>
              </div>
              <ArrowUpRight className="w-4 h-4 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>

            <button
              onClick={() => onNavigate('walkthrough')}
              className="px-4 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-900 font-semibold text-xs border border-slate-300 transition flex items-center justify-between group"
            >
              <div className="flex items-center gap-2.5">
                <Video className="w-4 h-4 text-pink-400" />
                <span>30s 3D Video Tour</span>
              </div>
              <ArrowUpRight className="w-4 h-4 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>
        </div>
      </div>

      {/* Primary Key Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Card 1: Building Levels */}
        <div 
          onClick={() => onNavigate('bim-model', 'floor-explorer')}
          className="glass-panel p-5 rounded-2xl border border-slate-200 hover:border-cyan-500/40 transition duration-200 cursor-pointer group space-y-3"
        >
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-xl bg-cyan-50 text-cyan-400 flex items-center justify-center border border-cyan-200">
              <Building2 className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">Level Explorer</span>
          </div>

          <div>
            <div className="text-2xl font-extrabold text-slate-900 group-hover:text-cyan-400 transition-colors">
              B + G + 9 Floors
            </div>
            <p className="text-xs text-slate-500 mt-0.5">28,400 sq.m Built-up Area</p>
          </div>

          <div className="pt-2 border-t border-slate-200 text-[11px] text-cyan-400 flex items-center justify-between">
            <span>2 Commercial + 8 Residential</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </div>
        </div>

        {/* Card 2: Parking & EV Chargers */}
        <div 
          onClick={() => onNavigate('parking-ev')}
          className="glass-panel p-5 rounded-2xl border border-slate-200 hover:border-emerald-500/40 transition duration-200 cursor-pointer group space-y-3"
        >
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-400 flex items-center justify-center border border-emerald-200">
              <Car className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">Basement (-1)</span>
          </div>

          <div>
            <div className="text-2xl font-extrabold text-slate-900 group-hover:text-emerald-400 transition-colors">
              200 Car Slots
            </div>
            <p className="text-xs text-slate-500 mt-0.5">40 DC Fast EV Charging Hubs</p>
          </div>

          <div className="pt-2 border-t border-slate-200 text-[11px] text-emerald-400 flex items-center justify-between">
            <span>Smart Power Load Balance</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </div>
        </div>

        {/* Card 3: Biophilic Courtyard */}
        <div 
          onClick={() => onNavigate('courtyard-climate')}
          className="glass-panel p-5 rounded-2xl border border-slate-200 hover:border-teal-500/40 transition duration-200 cursor-pointer group space-y-3"
        >
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-400 flex items-center justify-center border border-teal-200">
              <Trees className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">Forma Site Study</span>
          </div>

          <div>
            <div className="text-2xl font-extrabold text-slate-900 group-hover:text-teal-400 transition-colors">
              800 sq.m Courtyard
            </div>
            <p className="text-xs text-slate-500 mt-0.5">82% Natural Airflow Boost</p>
          </div>

          <div className="pt-2 border-t border-slate-200 text-[11px] text-teal-400 flex items-center justify-between">
            <span>3.4 °C Microclimate Cooling</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </div>
        </div>

        {/* Card 4: Kinetic Facade */}
        <div 
          onClick={() => onNavigate('facade')}
          className="glass-panel p-5 rounded-2xl border border-slate-200 hover:border-yellow-500/40 transition duration-200 cursor-pointer group space-y-3"
        >
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-xl bg-yellow-50 text-yellow-400 flex items-center justify-center border border-yellow-200">
              <Sun className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">Solar Response</span>
          </div>

          <div>
            <div className="text-2xl font-extrabold text-slate-900 group-hover:text-yellow-400 transition-colors">
              0° - 90° Kinetic Louvers
            </div>
            <p className="text-xs text-slate-500 mt-0.5">38.5% HVAC Load Reduction</p>
          </div>

          <div className="pt-2 border-t border-slate-200 text-[11px] text-yellow-400 flex items-center justify-between">
            <span>Automated Sun Tracking</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </div>
        </div>

      </div>

    </div>
  );
}
