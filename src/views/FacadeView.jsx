import React, { useState } from 'react';
import { 
  Sun, 
  Sliders, 
  Zap, 
  Sparkles, 
  CheckCircle2, 
  Trees, 
  Thermometer, 
  Eye,
  ShieldAlert
} from 'lucide-react';

export default function FacadeView() {
  const [louverAngle, setLouverAngle] = useState(45); // 0 to 90 deg
  const [autoTracking, setAutoTracking] = useState(true);

  // Dynamic calculations based on louver angle
  const shgc = (0.65 - (louverAngle / 90) * 0.41).toFixed(2); // 0.65 (open) down to 0.24 (fully closed 90 deg)
  const glareReductionPct = Math.round((louverAngle / 90) * 85);
  const hvacSavingsPct = (15 + (louverAngle / 90) * 23.5).toFixed(1);
  const daylightLux = Math.round(1200 - (louverAngle / 90) * 750);

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-yellow-400">
            <Sun className="w-4 h-4 text-yellow-400" />
            <span>KINETIC ARCHITECTURAL ENVELOPE</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900">
            Climate-Responsive <span className="text-yellow-400">Facade System</span>
          </h1>
          <p className="text-slate-500 text-xs mt-1">
            Motorized louver solar tracking sandbox: parametric angle control, solar heat gain (SHGC) response, and biophilic planter integration.
          </p>
        </div>

        {/* Auto Tracking Toggle */}
        <div className="flex items-center gap-3 bg-white p-2 rounded-xl border border-slate-200">
          <span className="text-xs text-slate-600 font-semibold">Sun Tracking Mode:</span>
          <button
            onClick={() => setAutoTracking(!autoTracking)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
              autoTracking 
                ? 'bg-gradient-to-r from-yellow-600 to-amber-600 text-white shadow-md' 
                : 'bg-slate-100 text-slate-600 hover:text-slate-900'
            }`}
          >
            {autoTracking ? 'AUTO SOLAR TRACKING' : 'MANUAL OVERRIDE'}
          </button>
        </div>
      </div>

      {/* Top Thermodynamic Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="glass-panel p-5 rounded-2xl border border-slate-200 space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>Solar Heat Gain (SHGC)</span>
            <Thermometer className="w-4 h-4 text-yellow-400" />
          </div>
          <div className="text-3xl font-extrabold text-yellow-400">{shgc} SHGC</div>
          <p className="text-xs text-slate-500">Base Low-E Glass: 0.65</p>
        </div>

        <div className="glass-panel p-5 rounded-2xl border border-slate-200 space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>Daylight Glare Mitigation</span>
            <Eye className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-3xl font-extrabold text-cyan-400">{glareReductionPct}% Reduced</div>
          <p className="text-xs text-slate-500">Indoor Light: {daylightLux} Lux</p>
        </div>

        <div className="glass-panel p-5 rounded-2xl border border-slate-200 space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>HVAC Energy Savings</span>
            <Zap className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-3xl font-extrabold text-emerald-400">{hvacSavingsPct}% Saved</div>
          <p className="text-xs text-slate-500">Annual Chiller Power Drop</p>
        </div>

        <div className="glass-panel p-5 rounded-2xl border border-slate-200 space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>Green Terrace Bio-Filter</span>
            <Trees className="w-4 h-4 text-teal-400" />
          </div>
          <div className="text-3xl font-extrabold text-teal-400">320 m² Planters</div>
          <p className="text-xs text-slate-500">Drip Irrigated Vertical Greens</p>
        </div>

      </div>

      {/* Interactive Louver Simulator Sandbox */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Interactive Louver Visualizer Canvas (2 Columns) */}
        <div className="lg:col-span-2 glass-panel p-6 rounded-2xl border border-slate-200 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <h2 className="font-bold text-slate-900 text-base flex items-center gap-2">
              <Sliders className="w-5 h-5 text-yellow-400" />
              <span>Parametric Kinetic Louver Angle Controls</span>
            </h2>
            <span className="font-mono text-xs text-yellow-400 font-bold px-3 py-1 rounded-full bg-yellow-50 border border-yellow-200">
              Louver Angle: {louverAngle}°
            </span>
          </div>

          {/* Interactive SVG Animation of Louver Angle */}
          <div className="bg-slate-50 rounded-2xl border border-slate-200 p-8 flex flex-col items-center justify-center min-h-[300px] relative">
            <svg viewBox="0 0 400 220" className="w-full max-w-lg">
              {/* Sun Light Rays */}
              <g opacity={0.6 + (louverAngle / 90) * 0.4}>
                <line x1="20" y1="20" x2="160" y2="90" stroke="#facc15" strokeWidth="2" strokeDasharray="4 3" />
                <line x1="20" y1="60" x2="160" y2="130" stroke="#facc15" strokeWidth="2" strokeDasharray="4 3" />
                <line x1="20" y1="100" x2="160" y2="170" stroke="#facc15" strokeWidth="2" strokeDasharray="4 3" />
              </g>

              {/* Window Glass Line */}
              <line x1="220" y1="20" x2="220" y2="200" stroke="#0284c7" strokeWidth="4" />
              <text x="230" y="30" fill="#0284c7" fontSize="10" fontFamily="monospace">Double Low-E Glazing</text>

              {/* Kinetic Motorized Louvers (Rotated dynamically) */}
              {[40, 90, 140, 190].map((yPos, i) => (
                <g key={i} transform={`translate(180, ${yPos}) rotate(${-louverAngle})`}>
                  {/* Louver blade */}
                  <rect x="-35" y="-4" width="70" height="8" rx="2" fill="#eab308" stroke="#ca8a04" strokeWidth="1" />
                  {/* Pivot axis dot */}
                  <circle cx="0" cy="0" r="3" fill="#f8fafc" stroke="#475569" strokeWidth="1" />
                </g>
              ))}

              {/* Balcony Vertical Planter Box below */}
              <rect x="240" y="150" width="100" height="45" rx="6" fill="#16a34a" stroke="#4ade80" strokeWidth="1.5" />
              <text x="250" y="178" fill="#ffffff" fontSize="9" fontWeight="bold">Vertical Planter</text>
            </svg>
          </div>

          {/* Louver Angle Slider */}
          <div className="space-y-2 bg-slate-50 p-4 rounded-xl border border-slate-200">
            <div className="flex justify-between text-xs font-semibold">
              <span className="text-slate-600">Set Motorized Louver Angle (0° = Open Horizontal, 90° = Closed Vertical)</span>
              <span className="font-mono text-yellow-400">{louverAngle}°</span>
            </div>
            <input
              type="range"
              min="0"
              max="90"
              value={louverAngle}
              onChange={(e) => {
                setLouverAngle(parseInt(e.target.value));
                setAutoTracking(false);
              }}
              className="w-full accent-yellow-500 cursor-pointer h-2"
            />
          </div>
        </div>

        {/* Facade Technical Specs (1 Column) */}
        <div className="glass-panel p-6 rounded-2xl border border-slate-200 space-y-4">
          <h3 className="font-bold text-slate-900 text-base border-b border-slate-200 pb-3">
            Facade Material Specifications
          </h3>

          <div className="space-y-3 text-xs">
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
              <span className="text-slate-500 text-[10px]">Louver Material</span>
              <p className="font-bold text-slate-700">Extruded Anodized Aluminum Fins</p>
              <p className="text-[11px] text-slate-500">Lightweight 2.5mm high-tensile alloy with anti-reflective solar coating.</p>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
              <span className="text-slate-500 text-[10px]">Actuator Motors</span>
              <p className="font-bold text-yellow-400">24V DC Low-Noise Stepper Motors</p>
              <p className="text-[11px] text-slate-500">Integrated with building IoT solar sensor array for real-time sun tracking.</p>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
              <span className="text-slate-500 text-[10px]">Terrace Planter Substrate</span>
              <p className="font-bold text-teal-400">Hydroponic Felt + Lightweight Pumice</p>
              <p className="text-[11px] text-slate-500">Automated drip irrigation using recycled greywater from building plant.</p>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
