import React, { useState } from 'react';
import { EV_PARKING_GRID } from '../data/mockData';
import { 
  Car, 
  Zap, 
  BatteryCharging, 
  CheckCircle2, 
  AlertCircle, 
  Clock, 
  ShieldCheck, 
  Filter, 
  Search, 
  Power
} from 'lucide-react';

export default function ParkingEvView() {
  const [filterType, setFilterType] = useState('ALL'); // ALL, EV_ONLY, AVAILABLE
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [slotsData, setSlotsData] = useState(EV_PARKING_GRID);

  const totalEv = slotsData.filter(s => s.isEv).length;
  const chargingNow = slotsData.filter(s => s.status === 'Charging').length;
  const availableSlots = slotsData.filter(s => s.status === 'Available').length;
  const totalKwDrawn = slotsData.reduce((acc, curr) => acc + curr.kwDrawn, 0);

  const filteredSlots = slotsData.filter(slot => {
    if (filterType === 'EV_ONLY') return slot.isEv;
    if (filterType === 'AVAILABLE') return slot.status === 'Available';
    return true;
  });

  const handleToggleReserveSlot = (slotId) => {
    setSlotsData(prev => prev.map(s => {
      if (s.slotId === slotId) {
        const isAvail = s.status === 'Available';
        return {
          ...s,
          status: isAvail ? 'Occupied' : 'Available',
          kwDrawn: 0,
          batteryPct: null
        };
      }
      return s;
    }));
    if (selectedSlot && selectedSlot.slotId === slotId) {
      setSelectedSlot(null);
    }
  };

  return (
    <div className="p-3.5 sm:p-5 md:p-6 space-y-4 sm:space-y-6 max-w-7xl mx-auto w-full">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 sm:gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-emerald-600">
            <Car className="w-4 h-4 text-emerald-500" />
            <span>BASEMENT PARKING LEVEL (-1)</span>
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 mt-0.5">
            Parking & EV Charging <span className="text-emerald-600">Dashboard</span>
          </h1>
          <p className="text-slate-500 text-xs mt-1 max-w-2xl leading-relaxed">
            Real-time management of 200 parking stalls, 40 DC fast EV chargers (150kW), and load balancing grid.
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar bg-slate-100 p-1 sm:p-1.5 rounded-xl border border-slate-200 self-start md:self-auto">
          <button
            onClick={() => setFilterType('ALL')}
            className={`px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-semibold shrink-0 transition ${filterType === 'ALL' ? 'bg-emerald-600 text-white shadow-sm' : 'text-slate-500 hover:text-slate-900'}`}
          >
            All 200
          </button>
          <button
            onClick={() => setFilterType('EV_ONLY')}
            className={`px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-semibold shrink-0 transition ${filterType === 'EV_ONLY' ? 'bg-emerald-600 text-white shadow-sm' : 'text-slate-500 hover:text-slate-900'}`}
          >
            40 EV Stalls
          </button>
          <button
            onClick={() => setFilterType('AVAILABLE')}
            className={`px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-semibold shrink-0 transition ${filterType === 'AVAILABLE' ? 'bg-emerald-600 text-white shadow-sm' : 'text-slate-500 hover:text-slate-900'}`}
          >
            Free ({availableSlots})
          </button>
        </div>
      </div>

      {/* Top Metric Cards - 2 cols on mobile, 4 on desktop */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        
        <div className="glass-panel p-3.5 sm:p-5 rounded-2xl border border-slate-200 space-y-1 sm:space-y-2">
          <div className="flex items-center justify-between text-[11px] sm:text-xs text-slate-500">
            <span>Total Stalls</span>
            <Car className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-400" />
          </div>
          <div className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-slate-900">200 Stalls</div>
          <p className="text-[10px] sm:text-[11px] text-emerald-600 font-semibold">{availableSlots} Stalls Free</p>
        </div>

        <div className="glass-panel p-3.5 sm:p-5 rounded-2xl border border-slate-200 space-y-1 sm:space-y-2">
          <div className="flex items-center justify-between text-[11px] sm:text-xs text-slate-500">
            <span>EV Fast Chargers</span>
            <Zap className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-500" />
          </div>
          <div className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-emerald-600">{totalEv} Chargers</div>
          <p className="text-[10px] sm:text-[11px] text-emerald-600 font-semibold">{chargingNow} Active Chargers</p>
        </div>

        <div className="glass-panel p-3.5 sm:p-5 rounded-2xl border border-slate-200 space-y-1 sm:space-y-2">
          <div className="flex items-center justify-between text-[11px] sm:text-xs text-slate-500">
            <span>Total EV Load</span>
            <Power className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-yellow-500" />
          </div>
          <div className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-yellow-500">{totalKwDrawn} kW</div>
          <p className="text-[10px] sm:text-[11px] text-slate-500">Solar Offset: 42%</p>
        </div>

        <div className="glass-panel p-3.5 sm:p-5 rounded-2xl border border-slate-200 space-y-1 sm:space-y-2">
          <div className="flex items-center justify-between text-[11px] sm:text-xs text-slate-500">
            <span>Air Quality</span>
            <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-teal-500" />
          </div>
          <div className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-teal-600">AQI 24 (Good)</div>
          <p className="text-[10px] sm:text-[11px] text-slate-500">CO Sensors Online</p>
        </div>

      </div>

      {/* 2D Basement Parking Grid */}
      <div className="glass-panel p-3.5 sm:p-6 rounded-2xl border border-slate-200 space-y-3 sm:space-y-4">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 sm:gap-3 border-b border-slate-200 pb-3">
          <h2 className="font-bold text-slate-900 text-sm sm:text-base flex items-center gap-2">
            <Car className="w-4.5 h-4.5 text-emerald-500 shrink-0" />
            <span>Basement -1 Parking Grid Map (200 Slots)</span>
          </h2>

          <div className="flex items-center gap-3 sm:gap-4 text-[11px] sm:text-xs font-mono">
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded bg-emerald-600 shrink-0" />
              <span className="text-slate-600">EV (40)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded bg-blue-600 shrink-0" />
              <span className="text-slate-600">Occupied</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded bg-white border border-slate-300 shrink-0" />
              <span className="text-slate-600">Free</span>
            </div>
          </div>
        </div>

        {/* Grid display: 4 cols on mobile, up to 12 on large */}
        <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 xl:grid-cols-12 gap-1.5 sm:gap-2 max-h-[460px] overflow-y-auto p-1">
          {filteredSlots.map(slot => {
            const isCharging = slot.status === 'Charging';
            const isOccupied = slot.status === 'Occupied';
            const isAvail = slot.status === 'Available';

            let bgColor = 'bg-white border-slate-200 text-slate-700 hover:border-cyan-400 shadow-sm';
            if (isCharging) bgColor = 'bg-emerald-50 border-emerald-400 text-emerald-700 shadow-md shadow-emerald-200/50';
            else if (isOccupied) bgColor = 'bg-blue-50 border-blue-400 text-blue-700 shadow-sm';

            return (
              <button
                key={slot.slotId}
                onClick={() => setSelectedSlot(slot)}
                className={`p-1.5 sm:p-2 rounded-xl border text-center transition flex flex-col items-center justify-center space-y-0.5 sm:space-y-1 ${bgColor}`}
              >
                <span className="font-mono text-[9px] sm:text-[10px] font-bold block truncate w-full">{slot.slotId}</span>
                {slot.isEv ? (
                  <Zap className={`w-3 h-3 sm:w-3.5 sm:h-3.5 ${isCharging ? 'text-emerald-500 animate-pulse' : 'text-amber-500'}`} />
                ) : (
                  <Car className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-slate-400" />
                )}
                <span className="text-[8px] sm:text-[9px] font-mono opacity-80 truncate w-full">
                  <span className="sm:hidden">{isCharging ? 'Chg' : isOccupied ? 'Occ' : 'Free'}</span>
                  <span className="hidden sm:inline">{slot.status}</span>
                </span>
              </button>
            );
          })}
        </div>

      </div>

      {/* Selected Slot Details Modal / Card */}
      {selectedSlot && (
        <div className="glass-panel p-6 rounded-2xl border border-emerald-300 space-y-4 animate-fadeIn">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-200">
                {selectedSlot.isEv ? <Zap className="w-5 h-5" /> : <Car className="w-5 h-5" />}
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-lg">Stall {selectedSlot.slotId}</h3>
                <p className="text-xs text-slate-500">{selectedSlot.type}</p>
              </div>
            </div>

            <button
              onClick={() => setSelectedSlot(null)}
              className="text-xs text-slate-600 hover:text-slate-900 px-3 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 border border-slate-200 transition"
            >
              Close Details
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
              <span className="text-slate-500 text-[10px]">Stall Status</span>
              <p className="font-bold text-slate-900 text-sm">{selectedSlot.status}</p>
            </div>

            {selectedSlot.isEv && (
              <>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                  <span className="text-slate-500 text-[10px]">Current Power Draw</span>
                  <p className="font-mono font-bold text-emerald-400 text-sm">{selectedSlot.kwDrawn} kW</p>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                  <span className="text-slate-500 text-[10px]">Battery State / Est. Finish</span>
                  <p className="font-bold text-yellow-400 text-xs">
                    {selectedSlot.batteryPct ? `${selectedSlot.batteryPct}% (${selectedSlot.timeRemainingMins} mins remaining)` : 'Idle Stall'}
                  </p>
                </div>
              </>
            )}
          </div>

          <div className="pt-2 flex justify-end">
            <button
              onClick={() => handleToggleReserveSlot(selectedSlot.slotId)}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-semibold text-xs transition shadow-sm"
            >
              {selectedSlot.status === 'Available' ? 'Simulate Vehicle Arrival' : 'Release Parking Stall'}
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
