import React, { useState } from 'react';
import { STRUCTURAL_SPECS } from '../data/mockData';
import { 
  Hammer, 
  Layers, 
  ShieldCheck, 
  CheckCircle2, 
  FileText, 
  Compass, 
  Maximize2, 
  Box
} from 'lucide-react';

export default function StructureView() {
  const [activeTab, setActiveTab] = useState('2d-drawings'); // 2d-drawings, specs

  return (
    <div className="p-3.5 sm:p-5 md:p-6 space-y-4 sm:space-y-6 max-w-7xl mx-auto w-full">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 sm:gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-orange-600">
            <Hammer className="w-4 h-4 text-orange-500" />
            <span>REVIT STRUCTURAL DETAILING (B+G+9)</span>
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 mt-0.5">
            Structural Modeling & <span className="text-orange-600">Rebar Detailing</span>
          </h1>
          <p className="text-slate-500 text-xs mt-1 max-w-2xl leading-relaxed">
            2D vector structural drawings, beam-column node cross-sections, M40 concrete specs, and Fe500D rebar schedules.
          </p>
        </div>

        <div className="flex items-center gap-1.5 sm:gap-2 bg-slate-100 p-1 sm:p-1.5 rounded-xl border border-slate-200 self-start md:self-auto">
          <button
            onClick={() => setActiveTab('2d-drawings')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${activeTab === '2d-drawings' ? 'bg-orange-600 text-white shadow-sm' : 'text-slate-500 hover:text-slate-900'}`}
          >
            2D Rebar Drawings
          </button>
          <button
            onClick={() => setActiveTab('specs')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${activeTab === 'specs' ? 'bg-orange-600 text-white shadow-sm' : 'text-slate-500 hover:text-slate-900'}`}
          >
            BIM Material Specs
          </button>
        </div>
      </div>

      {/* 2D STRUCTURAL DRAWINGS TAB */}
      {activeTab === '2d-drawings' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          
          {/* Drawing 1: Beam-Column Joint Cross Section */}
          <div className="glass-panel p-4 sm:p-6 rounded-2xl border border-slate-200 space-y-3 sm:space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <div>
                <span className="font-mono text-[10px] text-orange-600 font-bold px-2 py-0.5 rounded bg-orange-50 border border-orange-200">
                  DRAWING ST-01
                </span>
                <h3 className="font-bold text-slate-900 text-sm sm:text-base mt-1">Primary Transfer Beam-Column Node</h3>
              </div>
              <span className="text-xs font-mono text-slate-500">Grid C-12</span>
            </div>

            {/* Vector SVG Beam-Column Detail */}
            <div className="bg-slate-100 rounded-2xl border border-slate-200 p-3 sm:p-6 flex flex-col items-center justify-center min-h-[220px] sm:min-h-[280px]">
              <svg viewBox="0 0 400 240" className="w-full max-w-md">
                {/* Column outer shape */}
                <rect x="160" y="20" width="80" height="200" fill="#e2e8f0" stroke="#f97316" strokeWidth="2" />
                {/* Beam crossing */}
                <rect x="20" y="80" width="360" height="60" fill="#cbd5e1" stroke="#f97316" strokeWidth="2" />

                {/* Column Main Rebar Lines (Verticals) */}
                <line x1="172" y1="20" x2="172" y2="220" stroke="#06b6d4" strokeWidth="3" />
                <line x1="228" y1="20" x2="228" y2="220" stroke="#06b6d4" strokeWidth="3" />

                {/* Beam Main Tension/Compression Rebar (Horizontals) */}
                <line x1="20" y1="90" x2="380" y2="90" stroke="#38bdf8" strokeWidth="3" />
                <line x1="20" y1="130" x2="380" y2="130" stroke="#38bdf8" strokeWidth="3" />

                {/* Shear Stirrup Ties */}
                {[40, 70, 100, 130, 160, 270, 300, 330, 360].map((x, i) => (
                  <line key={i} x1={x} y1="88" x2={x} y2="132" stroke="#eab308" strokeWidth="1.5" strokeDasharray="3 2" />
                ))}

                {/* Annotation Labels */}
                <text x="175" y="15" fill="#38bdf8" fontSize="9" fontFamily="monospace">Column C1 (750x750 mm)</text>
                <text x="25" y="75" fill="#f97316" fontSize="9" fontFamily="monospace">Beam TB-01 (600x900 mm)</text>
                <text x="250" y="150" fill="#eab308" fontSize="9" fontFamily="monospace">12mm Stirrups @ 100mm c/c</text>
              </svg>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                <span className="text-slate-500 text-[10px]">Column Concrete</span>
                <p className="font-mono font-bold text-orange-400">M40 Self-Compacting</p>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                <span className="text-slate-500 text-[10px]">Steel Grade</span>
                <p className="font-mono font-bold text-cyan-400">Fe500D TMT Rebar</p>
              </div>
            </div>
          </div>

          {/* Drawing 2: Post-Tensioned Flat Slab Mesh Detail */}
          <div className="glass-panel p-6 rounded-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <div>
                <span className="font-mono text-[10px] text-orange-400 font-bold px-2 py-0.5 rounded bg-orange-50 border border-orange-200">
                  DRAWING ST-02
                </span>
                <h3 className="font-bold text-slate-900 text-base mt-1">Flat Slab Reinforcement & Drop Panel</h3>
              </div>
              <span className="text-xs font-mono text-slate-500">220mm Slab</span>
            </div>

            {/* Vector SVG Slab Detail */}
            <div className="bg-slate-100 rounded-2xl border border-slate-200 p-6 flex flex-col items-center justify-center min-h-[280px]">
              <svg viewBox="0 0 400 240" className="w-full max-w-md">
                {/* Slab outline */}
                <rect x="20" y="60" width="360" height="35" fill="#e2e8f0" stroke="#f97316" strokeWidth="2" />
                {/* Drop Panel outline */}
                <rect x="130" y="95" width="140" height="20" fill="#cbd5e1" stroke="#f97316" strokeWidth="2" />
                {/* Column below */}
                <rect x="170" y="115" width="60" height="105" fill="#f1f5f9" stroke="#64748b" strokeWidth="2" />

                {/* Top Rebar Mesh */}
                <line x1="25" y1="68" x2="375" y2="68" stroke="#38bdf8" strokeWidth="2" />
                {/* Bottom Rebar Mesh */}
                <line x1="25" y1="87" x2="375" y2="87" stroke="#38bdf8" strokeWidth="2" />

                {/* Rebar dots representing transverse bars */}
                {[40, 70, 100, 130, 160, 190, 220, 250, 280, 310, 340].map((x, i) => (
                  <g key={i}>
                    <circle cx={x} cy="73" r="2.5" fill="#facc15" />
                    <circle cx={x} cy="82" r="2.5" fill="#facc15" />
                  </g>
                ))}

                {/* Annotations */}
                <text x="25" y="50" fill="#38bdf8" fontSize="9" fontFamily="monospace">220mm PT Flat Slab (M30)</text>
                <text x="130" y="130" fill="#f97316" fontSize="9" fontFamily="monospace">Drop Panel: 3000x3000x100mm</text>
                <text x="25" y="110" fill="#facc15" fontSize="9" fontFamily="monospace">Top/Bottom T12 @ 150mm c/c</text>
              </svg>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                <span className="text-slate-500 text-[10px]">Slab Thickness</span>
                <p className="font-mono font-bold text-slate-700">220 mm</p>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                <span className="text-slate-500 text-[10px]">Drop Panel Extent</span>
                <p className="font-mono font-bold text-orange-400">3000 x 3000 x 100 mm</p>
              </div>
            </div>
          </div>

        </div>
      )}

      {/* BIM SPECS TAB */}
      {activeTab === 'specs' && (
        <div className="glass-panel p-6 rounded-2xl border border-slate-200 space-y-6">
          <h2 className="font-bold text-slate-900 text-lg border-b border-slate-200 pb-3">
            BIM Structural Material Specifications
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
            {/* Columns & Shear Core */}
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
              <h3 className="font-bold text-orange-400 text-sm flex items-center gap-2">
                <Hammer className="w-4 h-4" />
                <span>Columns & Central Core (M40)</span>
              </h3>
              <p className="text-slate-600">
                750 x 750 mm RC columns up to Level 2 transfer, transitioning to 600 x 600 mm on residential levels. Central elevator & staircase core wall thickness: 350 mm.
              </p>
              <div className="pt-2 font-mono text-slate-500">Rebar: 20-25mm dia main bars + 10mm ties @ 150mm c/c.</div>
            </div>

            {/* Foundation Raft */}
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
              <h3 className="font-bold text-cyan-400 text-sm flex items-center gap-2">
                <ShieldCheck className="w-4 h-4" />
                <span>Foundation & Piles</span>
              </h3>
              <p className="text-slate-600">
                Raft foundation (4,500 mm depth below ground) supported by 800 mm diameter bored cast-in-situ concrete piles socketed into hard rock.
              </p>
              <div className="pt-2 font-mono text-slate-500">Seismic Zone IV compliance factor: R = 5.0.</div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
