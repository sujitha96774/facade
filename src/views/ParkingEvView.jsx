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
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-emerald-400">
            <Car className="w-4 h-4 text-emerald-400" />
            <span>BASEMENT PARKING LEVEL (-1)</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900">
            Parking & EV Charging <span className="text-emerald-400">Dashboard</span>
          </h1>
          <p className="text-slate-500 text-xs mt-1">
            Real-time management of 200 parking stalls, 40 DC fast EV chargers (150kW), and load balancing grid.
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex items-center gap-2 bg-slate-100 p-1.5 rounded-xl border border-slate-200">
          <button
            onClick={() => setFilterType('ALL')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${filterType === 'ALL' ? 'bg-emerald-600 text-white shadow-sm' : 'text-slate-500 hover:text-slate-900'}`}
          >
            All 200 Slots
          </button>
          <button
            onClick={() => setFilterType('EV_ONLY')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${filterType === 'EV_ONLY' ? 'bg-emerald-600 text-white shadow-sm' : 'text-slate-500 hover:text-slate-900'}`}
          >
            40 EV Stalls
          </button>
          <button
            onClick={() => setFilterType('AVAILABLE')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${filterType === 'AVAILABLE' ? 'bg-emerald-600 text-white shadow-sm' : 'text-slate-500 hover:text-slate-900'}`}
          >
            Available Now ({availableSlots})
          </button>
        </div>
      </div>

      {/* Top Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="glass-panel p-5 rounded-2xl border border-slate-200 space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>Total Parking Stalls</span>
            <Car className="w-4 h-4 text-slate-500" />
          </div>
          <div className="text-3xl font-extrabold text-slate-900">200 Stalls</div>
          <p className="text-[11px] text-emerald-400 font-semibold">{availableSlots} Stalls Currently Free</p>
        </div>

        <div className="glass-panel p-5 rounded-2xl border border-slate-200 space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>DC Fast EV Chargers</span>
            <Zap className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-3xl font-extrabold text-emerald-400">{totalEv} Chargers</div>
          <p className="text-[11px] text-emerald-400 font-semibold">{chargingNow} Vehicles Actively Fast Charging</p>
        </div>

        <div className="glass-panel p-5 rounded-2xl border border-slate-200 space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>Total EV Power Load</span>
            <Power className="w-4 h-4 text-yellow-400" />
          </div>
          <div className="text-3xl font-extrabold text-yellow-400">{totalKwDrawn} kW</div>
          <p className="text-[11px] text-slate-500">Off-grid Solar PV Offset: 42%</p>
        </div>

        <div className="glass-panel p-5 rounded-2xl border border-slate-200 space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>Basement Air Quality</span>
            <ShieldCheck className="w-4 h-4 text-teal-400" />
          </div>
          <div className="text-3xl font-extrabold text-teal-400">AQI 24 (Good)</div>
          <p className="text-[11px] text-slate-500">CO Sensors Auto-Ventilated</p>
        </div>

      </div>

      {/* 2D Basement Parking Grid */}
      <div className="glass-panel p-6 rounded-2xl border border-slate-200 space-y-4">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-3">
          <h2 className="font-bold text-slate-900 text-base flex items-center gap-2">
            <Car className="w-5 h-5 text-emerald-400" />
            <span>Basement -1 Parking Grid Map (200 Slots)</span>
          </h2>

          <div className="flex items-center gap-4 text-xs font-mono">
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded bg-emerald-600" />
              <span className="text-slate-600">EV Charging (40)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded bg-blue-600" />
              <span className="text-slate-600">Occupied</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded bg-white border border-slate-300" />
              <span className="text-slate-600">Available</span>
            </div>
          </div>
        </div>

        {/* Grid display */}
        <div className="grid grid-cols-5 sm:grid-cols-8 md:grid-cols-10 lg:grid-cols-12 gap-2 max-h-[460px] overflow-y-auto p-1">
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
                className={`p-2 rounded-xl border text-center transition flex flex-col items-center justify-center space-y-1 ${bgColor}`}
              >
                <span className="font-mono text-[10px] font-bold block">{slot.slotId}</span>
                {slot.isEv ? (
                  <Zap className={`w-3.5 h-3.5 ${isCharging ? 'text-emerald-400 animate-pulse' : 'text-amber-400'}`} />
                ) : (
                  <Car className="w-3.5 h-3.5 text-slate-500" />
                )}
                <span className="text-[9px] font-mono opacity-80">{slot.status}</span>
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
