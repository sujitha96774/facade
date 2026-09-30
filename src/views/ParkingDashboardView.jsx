import React, { useState, useMemo, useEffect } from 'react';
import { EV_PARKING_GRID } from '../data/mockData';
import { 
  Car, 
  Zap, 
  CheckCircle2, 
  Clock, 
  ShieldCheck, 
  Search, 
  Power, 
  TrendingUp,
  Layers,
  Sparkles,
  RefreshCw,
  X,
  Gauge,
  Info,
  Check,
  Accessibility,
  MapPin,
  SlidersHorizontal,
  Navigation,
  Compass,
  ArrowUpRight,
  BatteryCharging,
  Eye,
  LayoutGrid,
  Map,
  Activity,
  ParkingSquare,
  Play,
  Pause,
  AlertTriangle
} from 'lucide-react';

export default function ParkingDashboardView() {
  const [slotsData, setSlotsData] = useState(EV_PARKING_GRID);
  const [levelFilter, setLevelFilter] = useState('B1'); // 'B1' | 'B2' | 'ALL'
  const [zoneFilter, setZoneFilter] = useState('ALL'); // 'ALL' | 'A' | 'B' | 'C' | 'D'
  const [statusFilter, setStatusFilter] = useState('ALL'); // 'ALL' | 'Available' | 'Occupied' | 'Reserved' | 'EV Charging' | 'EV Available' | 'Accessible'
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [actionNotification, setActionNotification] = useState(null);
  const [viewMode, setViewMode] = useState('cad'); // 'cad' (Interactive Floor Map) | 'grid' (Dense Matrix)
  const [autoSimulationActive, setAutoSimulationActive] = useState(false);

  // ─────────────────────────────────────────────────────────────
  // 1. DYNAMIC CALCULATIONS & METRICS (Recalculated on every state mutation)
  // ─────────────────────────────────────────────────────────────
  const totalSlots = slotsData.length; // 400 Total Parking Slots
  const occupiedCount = slotsData.filter(s => s.status === 'Occupied').length;
  const availableCount = slotsData.filter(s => s.status === 'Available').length;
  const reservedCount = slotsData.filter(s => s.status === 'Reserved').length;
  const evChargingCount = slotsData.filter(s => s.status === 'EV Charging').length;

  // EV charging occupied vs available
  const totalEvSlots = slotsData.filter(s => s.isEv).length; // 60 total EV stalls
  const evAvailableCount = slotsData.filter(s => s.isEv && s.status === 'Available').length;
  const evOccupiedCount = evChargingCount;

  // Disabled-accessible slots (Total, Available, Occupied, Reserved)
  const totalAccessibleSlots = slotsData.filter(s => s.isAccessible).length; // 20 dedicated mobility bays
  const accessibleAvailableCount = slotsData.filter(s => s.isAccessible && s.status === 'Available').length;
  const accessibleOccupiedCount = slotsData.filter(s => s.isAccessible && s.status === 'Occupied').length;
  const accessibleReservedCount = slotsData.filter(s => s.isAccessible && s.status === 'Reserved').length;

  // Occupancy percentage including occupied, reserved, and EV charging bays
  const totalUtilized = occupiedCount + reservedCount + evChargingCount;
  const occupancyPercentage = ((totalUtilized / totalSlots) * 100).toFixed(1);

  // EV Power telemetry
  const totalKwDrawn = slotsData
    .filter(s => s.status === 'EV Charging')
    .reduce((acc, curr) => acc + (curr.kwDrawn || 0), 0);

  // Level specific metrics (Floor-wise availability)
  const b1Slots = useMemo(() => slotsData.filter(s => s.level === 'B1'), [slotsData]);
  const b2Slots = useMemo(() => slotsData.filter(s => s.level === 'B2'), [slotsData]);

  const b1Total = b1Slots.length;
  const b2Total = b2Slots.length;
  const b1Available = b1Slots.filter(s => s.status === 'Available').length;
  const b2Available = b2Slots.filter(s => s.status === 'Available').length;
  const b1Occupied = b1Slots.filter(s => s.status === 'Occupied').length;
  const b2Occupied = b2Slots.filter(s => s.status === 'Occupied').length;
  const b1Reserved = b1Slots.filter(s => s.status === 'Reserved').length;
  const b2Reserved = b2Slots.filter(s => s.status === 'Reserved').length;
  const b1EvCharging = b1Slots.filter(s => s.status === 'EV Charging').length;
  const b2EvCharging = b2Slots.filter(s => s.status === 'EV Charging').length;
  const b1AccessibleFree = b1Slots.filter(s => s.isAccessible && s.status === 'Available').length;
  const b2AccessibleFree = b2Slots.filter(s => s.isAccessible && s.status === 'Available').length;
  const b1OccupancyRate = (((b1Total - b1Available) / b1Total) * 100).toFixed(1);
  const b2OccupancyRate = (((b2Total - b2Available) / b2Total) * 100).toFixed(1);

  // Zone specific metrics (Zone-wise availability across Zone A, B, C, D)
  const zonesInfo = useMemo(() => {
    const zoneKeys = [
      { key: 'A', name: 'Zone A', role: 'Commercial & Retail' },
      { key: 'B', name: 'Zone B', role: 'Residential Tower' },
      { key: 'C', name: 'Zone C', role: 'EV Smart Hub' },
      { key: 'D', name: 'Zone D', role: 'VIP & Long Stay' }
    ];

    return zoneKeys.map(z => {
      const zoneSlots = slotsData.filter(s => {
        const matchesLevel = levelFilter === 'ALL' || s.level === levelFilter;
        return matchesLevel && s.zoneKey === z.key;
      });

      const zTotal = zoneSlots.length;
      const zAvailable = zoneSlots.filter(s => s.status === 'Available').length;
      const zOccupied = zoneSlots.filter(s => s.status === 'Occupied').length;
      const zReserved = zoneSlots.filter(s => s.status === 'Reserved').length;
      const zEvCharging = zoneSlots.filter(s => s.status === 'EV Charging').length;
      const zAccessible = zoneSlots.filter(s => s.isAccessible).length;
      const zOccupancyRate = zTotal > 0 ? (((zTotal - zAvailable) / zTotal) * 100).toFixed(0) : '0';

      return {
        ...z,
        total: zTotal,
        available: zAvailable,
        occupied: zOccupied,
        reserved: zReserved,
        evCharging: zEvCharging,
        accessible: zAccessible,
        occupancyRate: zOccupancyRate
      };
    });
  }, [slotsData, levelFilter]);

  // Filtered slots for grid & map presentation
  const filteredSlots = useMemo(() => {
    return slotsData.filter(slot => {
      if (levelFilter !== 'ALL' && slot.level !== levelFilter) return false;
      if (zoneFilter !== 'ALL' && slot.zoneKey !== zoneFilter) return false;

      if (statusFilter === 'Available' && slot.status !== 'Available') return false;
      if (statusFilter === 'Occupied' && slot.status !== 'Occupied') return false;
      if (statusFilter === 'Reserved' && slot.status !== 'Reserved') return false;
      if (statusFilter === 'EV Charging' && slot.status !== 'EV Charging') return false;
      if (statusFilter === 'EV Available' && !(slot.isEv && slot.status === 'Available')) return false;
      if (statusFilter === 'Accessible' && !slot.isAccessible) return false;

      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesId = slot.slotId.toLowerCase().includes(query);
        const matchesPlate = slot.vehiclePlate && slot.vehiclePlate.toLowerCase().includes(query);
        const matchesModel = slot.vehicleModel && slot.vehicleModel.toLowerCase().includes(query);
        const matchesZone = slot.zone && slot.zone.toLowerCase().includes(query);
        const matchesReserved = slot.reservedFor && slot.reservedFor.toLowerCase().includes(query);
        if (!matchesId && !matchesPlate && !matchesModel && !matchesZone && !matchesReserved) {
          return false;
        }
      }
      return true;
    });
  }, [slotsData, levelFilter, zoneFilter, statusFilter, searchQuery]);

  // Show temporary toast message
  const triggerNotification = (msg) => {
    setActionNotification(msg);
    setTimeout(() => {
      setActionNotification(null);
    }, 3200);
  };

  // State mutation handler for single slot actions
  const handleUpdateSlotStatus = (slotId, newStatus, extraData = {}) => {
    setSlotsData(prev => prev.map(slot => {
      if (slot.slotId === slotId) {
        let updatedSlot = {
          ...slot,
          status: newStatus,
          ...extraData
        };

        if (newStatus === 'Available') {
          updatedSlot.vehiclePlate = null;
          updatedSlot.vehicleModel = null;
          updatedSlot.entryTime = null;
          updatedSlot.reservedFor = null;
          updatedSlot.kwDrawn = 0;
          updatedSlot.batteryPct = null;
          updatedSlot.timeRemainingMins = null;
        } else if (newStatus === 'Occupied') {
          if (!updatedSlot.vehiclePlate) {
            updatedSlot.vehiclePlate = `DL-02-CP-${Math.floor(1000 + Math.random() * 8999)}`;
            updatedSlot.vehicleModel = slot.isAccessible 
              ? 'Mobility Accessible Van / Permit #AC-912' 
              : 'Passenger Car / Executive SUV';
          }
          updatedSlot.entryTime = 'Just now';
          updatedSlot.reservedFor = null;
          updatedSlot.kwDrawn = 0;
        } else if (newStatus === 'Reserved') {
          updatedSlot.reservedFor = extraData.reservedFor || (
            slot.isAccessible 
              ? 'Designated Accessible Resident (Priority Access)' 
              : 'Designated VIP / Resident Pre-booking'
          );
          updatedSlot.kwDrawn = 0;
        } else if (newStatus === 'EV Charging') {
          updatedSlot.isEv = true;
          updatedSlot.vehiclePlate = updatedSlot.vehiclePlate || `DL-01-EV-${Math.floor(1000 + Math.random() * 8999)}`;
          updatedSlot.vehicleModel = updatedSlot.vehicleModel || 'Electric Vehicle (CCS2 Fast Charge)';
          updatedSlot.entryTime = 'Just now';
          updatedSlot.batteryPct = 34;
          updatedSlot.kwDrawn = 120;
          updatedSlot.timeRemainingMins = 42;
        }

        if (selectedSlot && selectedSlot.slotId === slotId) {
          setSelectedSlot(updatedSlot);
        }
        return updatedSlot;
      }
      return slot;
    }));

    triggerNotification(`Bay ${slotId} updated to ${newStatus}`);
  };

  // Quick Action: Simulate Random Traffic Flow (single pulse)
  const handleSimulateTraffic = () => {
    const randomIndex = Math.floor(Math.random() * slotsData.length);
    const targetSlot = slotsData[randomIndex];
    const transitions = {
      'Available': targetSlot.isEv ? 'EV Charging' : 'Occupied',
      'Occupied': 'Available',
      'Reserved': 'Available',
      'EV Charging': 'Available'
    };
    const nextStatus = transitions[targetSlot.status] || 'Available';
    handleUpdateSlotStatus(targetSlot.slotId, nextStatus);
  };

  // Auto-simulation interval
  useEffect(() => {
    let intervalId = null;
    if (autoSimulationActive) {
      intervalId = setInterval(() => {
        handleSimulateTraffic();
      }, 3500);
    }
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [autoSimulationActive, slotsData]);

  // Quick Action: Find and highlight nearest available bay
  const handleFindNearestFree = () => {
    const freeSlot = slotsData.find(s => s.status === 'Available');
    if (freeSlot) {
      setLevelFilter(freeSlot.level);
      setZoneFilter(freeSlot.zoneKey);
      setStatusFilter('Available');
      setSelectedSlot(freeSlot);
      triggerNotification(`Nearest free stall: ${freeSlot.slotId} (${freeSlot.zone})`);
    } else {
      triggerNotification('No free stalls currently available!');
    }
  };

  // Quick Action: Find nearest EV charging stall
  const handleFindNearestEv = () => {
    const freeEv = slotsData.find(s => s.isEv && s.status === 'Available');
    if (freeEv) {
      setLevelFilter(freeEv.level);
      setZoneFilter(freeEv.zoneKey);
      setStatusFilter('EV Available');
      setSelectedSlot(freeEv);
      triggerNotification(`Available EV stall: ${freeEv.slotId} (${freeEv.type})`);
    } else {
      triggerNotification('All EV fast charging stalls are currently occupied!');
    }
  };

  // Quick Action: Find nearest Disabled-accessible bay
  const handleFindNearestAccessible = () => {
    const freeAccessible = slotsData.find(s => s.isAccessible && s.status === 'Available');
    if (freeAccessible) {
      setLevelFilter(freeAccessible.level);
      setZoneFilter(freeAccessible.zoneKey);
      setStatusFilter('Accessible');
      setSelectedSlot(freeAccessible);
      triggerNotification(`Available Accessible stall: ${freeAccessible.slotId} (Next to Elevator Lobby)`);
    } else {
      triggerNotification('All disabled-accessible stalls are currently in use!');
    }
  };

  return (
    <div className="px-4 sm:px-6 md:px-7 py-6 space-y-6 max-w-[1400px] mx-auto w-full pb-24 text-[#17201D]">
      
      {/* ─── TOAST NOTIFICATION ─── */}
      {actionNotification && (
        <div className="fixed top-4 right-4 z-50 flex items-center gap-2 px-4 py-2.5 bg-[#18221F] text-white rounded-xl shadow-2xl border border-[#2F4940] text-xs font-semibold animate-slideDown">
          <Check className="w-4 h-4 text-[#4D8A68]" />
          <span>{actionNotification}</span>
        </div>
      )}

      {/* ─── PAGE HEADER & OPERATIONS BAR ─── */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-white p-4 sm:p-6 rounded-2xl border border-[#DCE0DA] shadow-xs">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-[#557A68] font-semibold uppercase tracking-wider">
            <ParkingSquare className="w-4 h-4 text-[#557A68]" />
            <span>Subsurface BIM Mobility Infrastructure</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#4D8A68] animate-pulse"></span>
            <span className="text-[10px] text-[#6B7772] font-normal">Architectural Earth</span>
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[#17201D] mt-1 tracking-tight">
            Parking <span className="text-[#557A68]">Dashboard</span>
          </h1>
          <p className="text-[#6B7772] text-xs sm:text-sm mt-1 max-w-2xl leading-relaxed">
            Real-time IoT slot monitoring, automated EV power distribution, barrier gate ANPR, and dynamic bay allocation across 400 underground stalls.
          </p>
        </div>

        {/* Quick Operations Actions */}
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={handleFindNearestFree}
            className="flex items-center gap-1.5 px-3 py-2 bg-[#4D8A68]/10 hover:bg-[#4D8A68]/20 text-[#4D8A68] text-xs font-bold rounded-xl border border-[#4D8A68]/30 transition shadow-2xs active:scale-95 cursor-pointer"
            title="Locate nearest free standard parking stall"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#4D8A68]" />
            <span>Find Free Bay</span>
          </button>

          <button
            onClick={handleFindNearestEv}
            className="flex items-center gap-1.5 px-3 py-2 bg-[#3D8B8B]/10 hover:bg-[#3D8B8B]/20 text-[#3D8B8B] text-xs font-bold rounded-xl border border-[#3D8B8B]/30 transition shadow-2xs active:scale-95 cursor-pointer"
            title="Find vacant EV charging bay"
          >
            <Zap className="w-3.5 h-3.5 text-[#3D8B8B]" />
            <span>Find EV Bay</span>
          </button>

          <button
            onClick={handleFindNearestAccessible}
            className="flex items-center gap-1.5 px-3 py-2 bg-[#557A68]/10 hover:bg-[#557A68]/20 text-[#2F4940] text-xs font-bold rounded-xl border border-[#557A68]/30 transition shadow-2xs active:scale-95 cursor-pointer"
            title="Find vacant disabled-accessible stall"
          >
            <Accessibility className="w-3.5 h-3.5 text-[#557A68]" />
            <span>Find Accessible</span>
          </button>

          <button
            onClick={() => setAutoSimulationActive(!autoSimulationActive)}
            className={`flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-xl border transition shadow-2xs active:scale-95 cursor-pointer ${
              autoSimulationActive 
                ? 'bg-[#C69A45] text-white border-[#C69A45] animate-pulse' 
                : 'bg-white hover:bg-[#F4F2EC] text-[#17201D] border-[#DCE0DA]'
            }`}
            title="Continuously simulate real-time vehicle entry/exit events"
          >
            {autoSimulationActive ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 text-[#C69A45]" />}
            <span>{autoSimulationActive ? 'Live Traffic ON' : 'Auto Simulate'}</span>
          </button>

          <button
            onClick={handleSimulateTraffic}
            className="flex items-center gap-1.5 px-3 py-2 bg-white hover:bg-[#F4F2EC] text-[#17201D] text-xs font-semibold rounded-xl border border-[#DCE0DA] transition shadow-2xs active:scale-95 cursor-pointer"
            title="Simulate single vehicle arrival/departure"
          >
            <RefreshCw className="w-3.5 h-3.5 text-[#6B7772]" />
            <span>Pulse Event</span>
          </button>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          2. TOP SUMMARY METRIC CARDS (ALL 7 MANDATORY METRICS WITH NEW PALETTE)
          - Available: #4D8A68
          - Occupied: #C7654D
          - Reserved: #C69A45
          - EV: #3D8B8B
          - Critical / High Demand: #B94A48
          - Cards: #FFFFFF, Borders: #DCE0DA
      ───────────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-3 sm:gap-3.5">
        
        {/* CARD 1: Total Parking Slots (400) */}
        <div className="bg-white p-3.5 sm:p-4 rounded-2xl border border-[#DCE0DA] shadow-xs hover:shadow transition-shadow relative overflow-hidden group">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-[#6B7772] uppercase tracking-wider">Total Slots</span>
            <div className="w-7 h-7 rounded-lg bg-[#F4F2EC] text-[#2F4940] flex items-center justify-center border border-[#DCE0DA]">
              <Layers className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2.5">
            <div className="text-2xl sm:text-3xl font-black text-[#17201D] tracking-tight">
              {totalSlots}
            </div>
            <div className="flex items-center gap-1.5 mt-1 text-[11px] text-[#6B7772] font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-[#557A68]"></span>
              <span>B1: 200 • B2: 200</span>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#2F4940]"></div>
        </div>

        {/* CARD 2: Occupied (#C7654D) */}
        <div className="bg-white p-3.5 sm:p-4 rounded-2xl border border-[#DCE0DA] shadow-xs hover:shadow transition-shadow relative overflow-hidden group">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-[#6B7772] uppercase tracking-wider">Occupied</span>
            <div className="w-7 h-7 rounded-lg bg-[#C7654D]/10 text-[#C7654D] flex items-center justify-center border border-[#C7654D]/30">
              <Car className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2.5">
            <div className="text-2xl sm:text-3xl font-black text-[#C7654D] tracking-tight">
              {occupiedCount}
            </div>
            <div className="flex items-center justify-between text-[11px] text-[#6B7772] mt-1">
              <span>Standard parked</span>
              <span className="font-bold text-[#C7654D] font-mono">{((occupiedCount / totalSlots) * 100).toFixed(0)}%</span>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#C7654D]"></div>
        </div>

        {/* CARD 3: Available (#4D8A68) */}
        <div className="bg-white p-3.5 sm:p-4 rounded-2xl border border-[#DCE0DA] shadow-xs hover:shadow transition-shadow relative overflow-hidden group">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-[#6B7772] uppercase tracking-wider">Available</span>
            <div className="w-7 h-7 rounded-lg bg-[#4D8A68]/10 text-[#4D8A68] flex items-center justify-center border border-[#4D8A68]/30">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2.5">
            <div className="text-2xl sm:text-3xl font-black text-[#4D8A68] tracking-tight">
              {availableCount}
            </div>
            <div className="flex items-center justify-between text-[11px] text-[#6B7772] mt-1">
              <span className="text-[#4D8A68] font-medium">Free to park</span>
              <span className="font-bold text-[#4D8A68] font-mono">{((availableCount / totalSlots) * 100).toFixed(0)}%</span>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#4D8A68]"></div>
        </div>

        {/* CARD 4: Reserved (#C69A45) */}
        <div className="bg-white p-3.5 sm:p-4 rounded-2xl border border-[#DCE0DA] shadow-xs hover:shadow transition-shadow relative overflow-hidden group">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-[#6B7772] uppercase tracking-wider">Reserved</span>
            <div className="w-7 h-7 rounded-lg bg-[#C69A45]/10 text-[#C69A45] flex items-center justify-center border border-[#C69A45]/30">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2.5">
            <div className="text-2xl sm:text-3xl font-black text-[#C69A45] tracking-tight">
              {reservedCount}
            </div>
            <div className="flex items-center justify-between text-[11px] text-[#6B7772] mt-1">
              <span>VIP & Tenants</span>
              <span className="font-bold text-[#C69A45] font-mono">{((reservedCount / totalSlots) * 100).toFixed(0)}%</span>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#C69A45]"></div>
        </div>

        {/* CARD 5: EV Charging Occupied / Available (#3D8B8B) */}
        <div className="bg-white p-3.5 sm:p-4 rounded-2xl border border-[#DCE0DA] shadow-xs hover:shadow transition-shadow relative overflow-hidden group">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-[#6B7772] uppercase tracking-wider truncate">EV Charging</span>
            <div className="w-7 h-7 rounded-lg bg-[#3D8B8B]/10 text-[#3D8B8B] flex items-center justify-center border border-[#3D8B8B]/30">
              <Zap className="w-4 h-4 text-[#3D8B8B] animate-pulse" />
            </div>
          </div>
          <div className="mt-2.5">
            <div className="flex items-baseline gap-1.5">
              <span className="text-2xl sm:text-3xl font-black text-[#3D8B8B] tracking-tight">{evOccupiedCount}</span>
              <span className="text-xs text-[#6B7772] font-bold">/ {totalEvSlots}</span>
            </div>
            <div className="flex items-center justify-between text-[10px] text-[#17201D] mt-1 font-medium">
              <span className="text-[#C7654D] bg-[#C7654D]/10 px-1.5 py-0.5 rounded border border-[#C7654D]/30">
                {evOccupiedCount} Occ
              </span>
              <span className="text-[#4D8A68] bg-[#4D8A68]/10 px-1.5 py-0.5 rounded border border-[#4D8A68]/30">
                {evAvailableCount} Avail
              </span>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#3D8B8B]"></div>
        </div>

        {/* CARD 6: Disabled-Accessible Slots (#557A68) */}
        <div className="bg-white p-3.5 sm:p-4 rounded-2xl border border-[#DCE0DA] shadow-xs hover:shadow transition-shadow relative overflow-hidden group">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-[#6B7772] uppercase tracking-wider truncate">Accessible</span>
            <div className="w-7 h-7 rounded-lg bg-[#557A68]/10 text-[#557A68] flex items-center justify-center border border-[#557A68]/30">
              <Accessibility className="w-4 h-4 text-[#557A68]" />
            </div>
          </div>
          <div className="mt-2.5">
            <div className="flex items-baseline gap-1.5">
              <span className="text-2xl sm:text-3xl font-black text-[#557A68] tracking-tight">{accessibleAvailableCount}</span>
              <span className="text-xs text-[#6B7772] font-bold">/ {totalAccessibleSlots} Free</span>
            </div>
            <div className="flex items-center justify-between text-[10px] text-[#17201D] mt-1 font-medium">
              <span className="text-[#C7654D] bg-[#C7654D]/10 px-1.5 py-0.5 rounded border border-[#C7654D]/30">
                {accessibleOccupiedCount} Occ
              </span>
              <span className="text-[#C69A45] bg-[#C69A45]/10 px-1.5 py-0.5 rounded border border-[#C69A45]/30">
                {accessibleReservedCount} Res
              </span>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#557A68]"></div>
        </div>

        {/* CARD 7: Current Occupancy % (Critical: #B94A48) */}
        <div className="bg-white p-3.5 sm:p-4 rounded-2xl border border-[#DCE0DA] shadow-xs hover:shadow transition-shadow relative overflow-hidden group col-span-2 sm:col-span-1 lg:col-span-1">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-[#6B7772] uppercase tracking-wider">Occupancy %</span>
            <div className="w-7 h-7 rounded-lg bg-[#F4F2EC] text-[#2F4940] flex items-center justify-center border border-[#DCE0DA]">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2.5">
            <div className="text-2xl sm:text-3xl font-black text-[#17201D] tracking-tight">
              {occupancyPercentage}%
            </div>
            <div className="mt-1.5 w-full bg-[#F4F2EC] rounded-full h-1.5 overflow-hidden">
              <div 
                className={`h-full rounded-full transition-all duration-500 ${
                  Number(occupancyPercentage) > 85 ? 'bg-[#B94A48]' :
                  Number(occupancyPercentage) > 65 ? 'bg-[#C69A45]' : 'bg-[#4D8A68]'
                }`}
                style={{ width: `${Math.min(100, Math.max(0, occupancyPercentage))}%` }}
              />
            </div>
            <div className="flex items-center justify-between text-[10px] text-[#6B7772] mt-1">
              <span>{totalUtilized} / {totalSlots} Bays</span>
              <span className={`font-semibold ${Number(occupancyPercentage) > 85 ? 'text-[#B94A48]' : 'text-[#557A68]'}`}>
                {Number(occupancyPercentage) > 85 ? 'High Demand' : 'Normal Flow'}
              </span>
            </div>
          </div>
          <div className={`absolute bottom-0 left-0 right-0 h-1 ${Number(occupancyPercentage) > 85 ? 'bg-[#B94A48]' : 'bg-[#557A68]'}`}></div>
        </div>

      </div>

      {/* ─────────────────────────────────────────────────────────────
          3. FLOOR / ZONE-WISE AVAILABILITY BREAKDOWN
      ───────────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        
        {/* FLOOR-WISE AVAILABILITY CARDS (5 cols) */}
        <div className="lg:col-span-5 bg-white p-4 sm:p-5 rounded-2xl border border-[#DCE0DA] shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-[#DCE0DA] pb-2.5">
            <div className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-[#557A68]" />
              <h2 className="text-sm font-bold text-[#17201D] uppercase tracking-wide">Floor-Wise Availability</h2>
            </div>
            <span className="text-[11px] text-[#6B7772] font-mono">2 Underground Levels</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            
            {/* Basement 1 Card */}
            <div 
              onClick={() => setLevelFilter('B1')}
              className={`p-3.5 rounded-xl border transition cursor-pointer relative ${
                levelFilter === 'B1' 
                  ? 'border-[#557A68] bg-[#F4F2EC]/80 ring-2 ring-[#557A68]/20' 
                  : 'border-[#DCE0DA] hover:border-[#557A68]/50 bg-white'
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-black text-[#17201D]">Basement 1 (B1)</span>
                  <p className="text-[10px] text-[#6B7772]">Level -1 (Podium Access)</p>
                </div>
                <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full font-bold ${
                  levelFilter === 'B1' ? 'bg-[#557A68] text-white' : 'bg-[#F4F2EC] text-[#6B7772] border border-[#DCE0DA]'
                }`}>
                  {levelFilter === 'B1' ? 'Active' : 'Select'}
                </span>
              </div>

              <div className="mt-3 flex items-baseline justify-between">
                <span className="text-2xl font-black text-[#4D8A68]">{b1Available}</span>
                <span className="text-xs text-[#6B7772] font-mono">/ {b1Total} Free</span>
              </div>

              {/* Progress bar */}
              <div className="mt-2 w-full bg-[#F4F2EC] rounded-full h-1.5 overflow-hidden flex border border-[#DCE0DA]/50">
                <div style={{ width: `${(b1Occupied / b1Total) * 100}%` }} className="bg-[#C7654D] h-full" title="Occupied" />
                <div style={{ width: `${(b1Reserved / b1Total) * 100}%` }} className="bg-[#C69A45] h-full" title="Reserved" />
                <div style={{ width: `${(b1EvCharging / b1Total) * 100}%` }} className="bg-[#3D8B8B] h-full" title="EV Charging" />
              </div>

              <div className="mt-2.5 pt-2 border-t border-[#DCE0DA] grid grid-cols-3 gap-1 text-center text-[10px]">
                <div>
                  <span className="text-[#6B7772] block">Occupied</span>
                  <span className="font-bold text-[#C7654D]">{b1Occupied}</span>
                </div>
                <div>
                  <span className="text-[#6B7772] block">EV Stalls</span>
                  <span className="font-bold text-[#3D8B8B]">{b1EvCharging} chg</span>
                </div>
                <div>
                  <span className="text-[#6B7772] block">Accessible</span>
                  <span className="font-bold text-[#557A68]">{b1AccessibleFree} free</span>
                </div>
              </div>
            </div>

            {/* Basement 2 Card */}
            <div 
              onClick={() => setLevelFilter('B2')}
              className={`p-3.5 rounded-xl border transition cursor-pointer relative ${
                levelFilter === 'B2' 
                  ? 'border-[#557A68] bg-[#F4F2EC]/80 ring-2 ring-[#557A68]/20' 
                  : 'border-[#DCE0DA] hover:border-[#557A68]/50 bg-white'
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-black text-[#17201D]">Basement 2 (B2)</span>
                  <p className="text-[10px] text-[#6B7772]">Level -2 (Deep Substructure)</p>
                </div>
                <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full font-bold ${
                  levelFilter === 'B2' ? 'bg-[#557A68] text-white' : 'bg-[#F4F2EC] text-[#6B7772] border border-[#DCE0DA]'
                }`}>
                  {levelFilter === 'B2' ? 'Active' : 'Select'}
                </span>
              </div>

              <div className="mt-3 flex items-baseline justify-between">
                <span className="text-2xl font-black text-[#4D8A68]">{b2Available}</span>
                <span className="text-xs text-[#6B7772] font-mono">/ {b2Total} Free</span>
              </div>

              {/* Progress bar */}
              <div className="mt-2 w-full bg-[#F4F2EC] rounded-full h-1.5 overflow-hidden flex border border-[#DCE0DA]/50">
                <div style={{ width: `${(b2Occupied / b2Total) * 100}%` }} className="bg-[#C7654D] h-full" title="Occupied" />
                <div style={{ width: `${(b2Reserved / b2Total) * 100}%` }} className="bg-[#C69A45] h-full" title="Reserved" />
                <div style={{ width: `${(b2EvCharging / b2Total) * 100}%` }} className="bg-[#3D8B8B] h-full" title="EV Charging" />
              </div>

              <div className="mt-2.5 pt-2 border-t border-[#DCE0DA] grid grid-cols-3 gap-1 text-center text-[10px]">
                <div>
                  <span className="text-[#6B7772] block">Occupied</span>
                  <span className="font-bold text-[#C7654D]">{b2Occupied}</span>
                </div>
                <div>
                  <span className="text-[#6B7772] block">EV Stalls</span>
                  <span className="font-bold text-[#3D8B8B]">{b2EvCharging} chg</span>
                </div>
                <div>
                  <span className="text-[#6B7772] block">Accessible</span>
                  <span className="font-bold text-[#557A68]">{b2AccessibleFree} free</span>
                </div>
              </div>
            </div>

          </div>

          {/* Quick toggle all floors button */}
          <div className="flex items-center justify-between pt-1">
            <button
              onClick={() => setLevelFilter(levelFilter === 'ALL' ? 'B1' : 'ALL')}
              className="text-xs text-[#557A68] hover:text-[#2F4940] font-semibold flex items-center gap-1 cursor-pointer"
            >
              <span>{levelFilter === 'ALL' ? 'Show B1 Only' : 'View Both Levels Combined (400 Bays)'}</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#557A68]" />
            </button>
            <span className="text-[11px] font-mono text-[#6B7772]">Total: {totalSlots} stalls</span>
          </div>
        </div>

        {/* ZONE-WISE AVAILABILITY CARDS (7 cols) */}
        <div className="lg:col-span-7 bg-white p-4 sm:p-5 rounded-2xl border border-[#DCE0DA] shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-[#DCE0DA] pb-2.5">
            <div className="flex items-center gap-2">
              <Navigation className="w-4 h-4 text-[#557A68]" />
              <h2 className="text-sm font-bold text-[#17201D] uppercase tracking-wide">Zone-Wise Availability</h2>
            </div>
            <div className="flex items-center gap-1.5 text-[11px]">
              <span className="text-[#6B7772]">Click a zone to filter map:</span>
              {zoneFilter !== 'ALL' && (
                <button
                  onClick={() => setZoneFilter('ALL')}
                  className="text-[#557A68] font-bold hover:underline cursor-pointer"
                >
                  Clear Zone Filter
                </button>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {zonesInfo.map(zone => {
              const isSelected = zoneFilter === zone.key;
              return (
                <div
                  key={zone.key}
                  onClick={() => setZoneFilter(isSelected ? 'ALL' : zone.key)}
                  className={`p-3 rounded-xl border transition cursor-pointer relative group ${
                    isSelected 
                      ? 'border-[#557A68] bg-[#F4F2EC]/80 ring-2 ring-[#557A68]/20' 
                      : 'border-[#DCE0DA] hover:border-[#557A68]/50 bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-[#17201D]">{zone.name}</span>
                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                      isSelected ? 'bg-[#557A68] text-white' : 'bg-[#F4F2EC] text-[#6B7772] border border-[#DCE0DA]'
                    }`}>
                      {zone.occupancyRate}%
                    </span>
                  </div>

                  <p className="text-[10px] text-[#6B7772] truncate mt-0.5">{zone.role}</p>

                  <div className="mt-2.5">
                    <div className="text-lg font-black text-[#4D8A68] tracking-tight">
                      {zone.available} <span className="text-[11px] text-[#6B7772] font-normal">/ {zone.total}</span>
                    </div>
                    <span className="text-[10px] text-[#6B7772]">Free Stalls</span>
                  </div>

                  {/* Micro indicator bar */}
                  <div className="mt-2 w-full bg-[#F4F2EC] rounded-full h-1 overflow-hidden border border-[#DCE0DA]/50">
                    <div 
                      className="bg-[#557A68] h-full rounded-full" 
                      style={{ width: `${zone.occupancyRate}%` }} 
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Allocation Bar legend */}
          <div className="pt-1 flex items-center justify-between text-[11px] text-[#6B7772]">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#4D8A68]"></span> Available
              <span className="w-2 h-2 rounded-full bg-[#C7654D] ml-2"></span> Occupied
              <span className="w-2 h-2 rounded-full bg-[#C69A45] ml-2"></span> Reserved
              <span className="w-2 h-2 rounded-full bg-[#3D8B8B] ml-2"></span> EV Charging
            </span>
            <span className="font-mono text-[#6B7772]">ANPR Guided Routing</span>
          </div>
        </div>

      </div>

      {/* ─────────────────────────────────────────────────────────────
          4. LIVE PARKING MAP (ARCHITECTURAL FLOOR PLAN & HIGH-DENSITY GRID)
      ───────────────────────────────────────────────────────────── */}
      <div className="bg-white rounded-2xl border border-[#DCE0DA] shadow-xs p-4 sm:p-5 space-y-4">
        
        {/* Map Header & Controls */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-[#DCE0DA] pb-4">
          <div>
            <div className="flex items-center gap-2">
              <Map className="w-5 h-5 text-[#557A68]" />
              <h2 className="text-base sm:text-lg font-black text-[#17201D] tracking-tight">
                Live Parking Map
              </h2>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-[#4D8A68]/15 text-[#4D8A68] border border-[#4D8A68]/30 font-bold">
                {levelFilter === 'ALL' ? 'All Basements' : levelFilter === 'B1' ? 'Basement 1 (Level -1)' : 'Basement 2 (Level -2)'}
              </span>
              {zoneFilter !== 'ALL' && (
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-[#557A68]/15 text-[#2F4940] border border-[#557A68]/30 font-bold">
                  Zone {zoneFilter} Focus
                </span>
              )}
            </div>
            <p className="text-xs text-[#6B7772] mt-0.5">
              Showing {filteredSlots.length} stalls. Real-time ultrasonic sensor updates and bay status monitoring.
            </p>
          </div>

          {/* View Mode & Level Switcher */}
          <div className="flex items-center gap-2 flex-wrap">
            
            {/* View Mode Toggle */}
            <div className="flex items-center bg-[#F4F2EC] p-1 rounded-xl border border-[#DCE0DA] text-xs">
              <button
                onClick={() => setViewMode('cad')}
                className={`px-3 py-1 rounded-lg font-semibold flex items-center gap-1.5 transition cursor-pointer ${
                  viewMode === 'cad' ? 'bg-white text-[#17201D] shadow-xs font-bold' : 'text-[#6B7772] hover:text-[#17201D]'
                }`}
              >
                <Map className="w-3.5 h-3.5" />
                <span>Floor Plan</span>
              </button>
              <button
                onClick={() => setViewMode('grid')}
                className={`px-3 py-1 rounded-lg font-semibold flex items-center gap-1.5 transition cursor-pointer ${
                  viewMode === 'grid' ? 'bg-white text-[#17201D] shadow-xs font-bold' : 'text-[#6B7772] hover:text-[#17201D]'
                }`}
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span>Density Matrix</span>
              </button>
            </div>

            {/* Level Quick Select */}
            <div className="flex items-center bg-[#F4F2EC] p-1 rounded-xl border border-[#DCE0DA] text-xs">
              <button
                onClick={() => setLevelFilter('B1')}
                className={`px-2.5 py-1 rounded-lg font-bold transition cursor-pointer ${
                  levelFilter === 'B1' ? 'bg-white text-[#17201D] shadow-xs' : 'text-[#6B7772] hover:text-[#17201D]'
                }`}
              >
                B1 ({b1Available} Free)
              </button>
              <button
                onClick={() => setLevelFilter('B2')}
                className={`px-2.5 py-1 rounded-lg font-bold transition cursor-pointer ${
                  levelFilter === 'B2' ? 'bg-white text-[#17201D] shadow-xs' : 'text-[#6B7772] hover:text-[#17201D]'
                }`}
              >
                B2 ({b2Available} Free)
              </button>
              <button
                onClick={() => setLevelFilter('ALL')}
                className={`px-2.5 py-1 rounded-lg font-bold transition cursor-pointer ${
                  levelFilter === 'ALL' ? 'bg-white text-[#17201D] shadow-xs' : 'text-[#6B7772] hover:text-[#17201D]'
                }`}
              >
                All (400)
              </button>
            </div>

          </div>
        </div>

        {/* Filter Pills & Search Bar Row */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 bg-[#F4F2EC] p-3 rounded-xl border border-[#DCE0DA]">
          
          {/* Status Filter Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
            {[
              { id: 'ALL', label: 'All Stalls', icon: Layers },
              { id: 'Available', label: 'Available', icon: CheckCircle2, color: 'text-[#4D8A68]' },
              { id: 'Occupied', label: 'Occupied', icon: Car, color: 'text-[#C7654D]' },
              { id: 'Reserved', label: 'Reserved', icon: Clock, color: 'text-[#C69A45]' },
              { id: 'EV Charging', label: 'EV Charging', icon: Zap, color: 'text-[#3D8B8B]' },
              { id: 'EV Available', label: 'EV Free', icon: BatteryCharging, color: 'text-[#3D8B8B]' },
              { id: 'Accessible', label: 'Accessible', icon: Accessibility, color: 'text-[#557A68]' }
            ].map(f => {
              const isSelected = statusFilter === f.id;
              const IconComponent = f.icon;
              return (
                <button
                  key={f.id}
                  onClick={() => setStatusFilter(f.id)}
                  className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold transition shrink-0 flex items-center gap-1.5 cursor-pointer ${
                    isSelected 
                      ? 'bg-[#18221F] text-white shadow-xs' 
                      : 'bg-white hover:bg-[#F4F2EC] text-[#17201D] border border-[#DCE0DA]'
                  }`}
                >
                  <IconComponent className={`w-3.5 h-3.5 ${isSelected ? 'text-white' : f.color || 'text-[#6B7772]'}`} />
                  <span>{f.label}</span>
                </button>
              );
            })}
          </div>

          {/* Search Box */}
          <div className="relative min-w-[220px] sm:min-w-[280px]">
            <Search className="w-3.5 h-3.5 text-[#6B7772] absolute left-3 top-2.5 pointer-events-none" />
            <input
              type="text"
              placeholder="Search stall (e.g. B1-015), plate, vehicle..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-[#DCE0DA] rounded-xl pl-8 pr-3 py-1.5 text-xs text-[#17201D] placeholder-[#6B7772] focus:outline-none focus:border-[#557A68] transition shadow-2xs"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-2 text-[#6B7772] hover:text-[#17201D] text-xs cursor-pointer"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* ─── CAD FLOOR PLAN ARCHITECTURAL MAP VIEW ─── */}
        {viewMode === 'cad' ? (
          <div className="border border-[#2F4940] rounded-2xl bg-[#18221F] text-[#DCE0DA] p-4 sm:p-6 relative shadow-inner overflow-x-auto">
            
            <div className="min-w-[700px] sm:min-w-full space-y-4">
              {/* Architectural Layout Background Grid */}
              <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#557A68_1px,transparent_1px)] [background-size:16px_16px]"></div>

              {/* Top Blueprint Info Bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#2F4940] pb-3 relative z-10 text-xs text-[#DCE0DA]/70">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-[#557A68] font-bold uppercase tracking-wider flex items-center gap-1.5">
                    <Compass className="w-4 h-4 text-[#557A68]" />
                    CAD Subsurface Map: {levelFilter === 'ALL' ? 'Combined View' : levelFilter === 'B1' ? 'Floor -1' : 'Floor -2'}
                  </span>
                  <span className="hidden sm:inline text-[#2F4940]">•</span>
                  <span className="font-mono text-[#6B7772]">Scale 1:250 • Structural Grid C1-C24</span>
                </div>

                {/* Map Legend */}
                <div className="flex items-center gap-3 flex-wrap text-[11px]">
                  <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-sm bg-[#4D8A68]"></span> Available</span>
                  <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-sm bg-[#C7654D]"></span> Occupied</span>
                  <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-sm bg-[#C69A45]"></span> Reserved</span>
                  <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-sm bg-[#3D8B8B]"></span> EV Hub</span>
                  <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-sm bg-[#557A68]"></span> Accessible</span>
                </div>
              </div>

              {/* Floor Infrastructure Header (Ramps, ANPR, Lobbies) */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-3 my-4 relative z-10 text-xs">
                
                {/* Entrance Gate */}
                <div className="bg-[#2F4940]/50 border border-[#2F4940] rounded-xl p-2.5 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#4D8A68] animate-ping"></div>
                    <div>
                      <span className="font-bold text-[#DCE0DA]">ENTRY RAMP & ANPR</span>
                      <p className="text-[10px] text-[#6B7772]">Barrier Gate 1 • Active</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono text-[#4D8A68] font-bold bg-[#18221F] px-2 py-0.5 rounded border border-[#4D8A68]/40">
                    OPEN
                  </span>
                </div>

                {/* North Lift Lobby Core */}
                <div className="bg-[#2F4940]/50 border border-[#2F4940] rounded-xl p-2.5 flex items-center justify-between">
                  <div>
                    <span className="font-bold text-[#DCE0DA]">NORTH ELEVATOR LOBBY</span>
                    <p className="text-[10px] text-[#6B7772]">Near Accessible Stalls 31-40</p>
                  </div>
                  <Accessibility className="w-4 h-4 text-[#557A68]" />
                </div>

                {/* South Lift Lobby Core */}
                <div className="bg-[#2F4940]/50 border border-[#2F4940] rounded-xl p-2.5 flex items-center justify-between">
                  <div>
                    <span className="font-bold text-[#DCE0DA]">SOUTH RESIDENTIAL CORE</span>
                    <p className="text-[10px] text-[#6B7772]">Penthouses & Luxury Access</p>
                  </div>
                  <ShieldCheck className="w-4 h-4 text-[#C69A45]" />
                </div>

                {/* Exit Ramp */}
                <div className="bg-[#2F4940]/50 border border-[#2F4940] rounded-xl p-2.5 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#557A68]"></div>
                    <div>
                      <span className="font-bold text-[#DCE0DA]">EXIT RAMP TO SURFACE</span>
                      <p className="text-[10px] text-[#6B7772]">RFID Auto-Scan Active</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono text-[#557A68] font-bold bg-[#18221F] px-2 py-0.5 rounded border border-[#557A68]/40">
                    CLEAR
                  </span>
                </div>

              </div>

              {/* Central Driveway Lane Indicator */}
              <div className="relative z-10 flex items-center justify-between py-1.5 px-3 bg-[#2F4940]/40 rounded-lg border border-dashed border-[#2F4940] text-[10px] font-mono text-[#DCE0DA]/70 mb-4">
                <span>⬅ ENTRY LANE (MAX 15 KM/H)</span>
                <span className="text-[#557A68]">▲ DIRECTIONAL GUIDANCE SENSORS ACTIVE ▲</span>
                <span>EXIT DIRECTION ➡</span>
              </div>

              {/* Interactive Parking Map Grid */}
              <div className="relative z-10">
                {filteredSlots.length === 0 ? (
                  <div className="py-16 text-center text-[#6B7772] text-xs">
                    No parking bays match the selected filters or search query.
                  </div>
                ) : (
                  <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 xl:grid-cols-12 gap-2 p-2 rounded-xl bg-[#18221F]/90 border border-[#2F4940]">
                    {filteredSlots.map(slot => {
                      const isAvailable = slot.status === 'Available';
                      const isOccupied = slot.status === 'Occupied';
                      const isReserved = slot.status === 'Reserved';
                      const isCharging = slot.status === 'EV Charging';
                      const isAccessible = slot.isAccessible;

                      let borderColor = "border-[#2F4940]";
                      let bgColor = "bg-[#2F4940]/30";
                      let textColor = "text-[#DCE0DA]";
                      let badgeBg = "bg-[#2F4940] text-[#DCE0DA]";
                      let iconNode = <CheckCircle2 className="w-3.5 h-3.5 text-[#4D8A68]" />;

                      if (isCharging) {
                        borderColor = "border-[#3D8B8B] shadow-2xs shadow-[#3D8B8B]/30";
                        bgColor = "bg-[#3D8B8B]/25 hover:bg-[#3D8B8B]/40";
                        textColor = "text-[#DCE0DA]";
                        badgeBg = "bg-[#3D8B8B]/50 text-[#DCE0DA]";
                        iconNode = <Zap className="w-3.5 h-3.5 text-[#3D8B8B] animate-pulse" />;
                      } else if (isAccessible) {
                        if (isAvailable) {
                          borderColor = "border-[#557A68]";
                          bgColor = "bg-[#557A68]/25 hover:bg-[#557A68]/40";
                          textColor = "text-[#DCE0DA]";
                          badgeBg = "bg-[#557A68]/50 text-[#DCE0DA]";
                          iconNode = <Accessibility className="w-3.5 h-3.5 text-[#557A68]" />;
                        } else {
                          borderColor = "border-[#C7654D]/70";
                          bgColor = "bg-[#C7654D]/25";
                          textColor = "text-[#DCE0DA]";
                          badgeBg = "bg-[#C7654D]/40 text-[#DCE0DA]";
                          iconNode = <Accessibility className="w-3.5 h-3.5 text-[#C7654D]" />;
                        }
                      } else if (isAvailable) {
                        if (slot.isEv) {
                          borderColor = "border-[#3D8B8B]/70";
                          bgColor = "bg-[#3D8B8B]/15 hover:bg-[#3D8B8B]/30";
                          textColor = "text-[#DCE0DA]";
                          badgeBg = "bg-[#3D8B8B]/40 text-[#DCE0DA]";
                          iconNode = <BatteryCharging className="w-3.5 h-3.5 text-[#4D8A68]" />;
                        } else {
                          borderColor = "border-[#4D8A68]/70";
                          bgColor = "bg-[#4D8A68]/15 hover:bg-[#4D8A68]/30";
                          textColor = "text-[#DCE0DA]";
                          badgeBg = "bg-[#4D8A68]/40 text-[#DCE0DA]";
                          iconNode = <CheckCircle2 className="w-3.5 h-3.5 text-[#4D8A68]" />;
                        }
                      } else if (isOccupied) {
                        borderColor = "border-[#C7654D]/70";
                        bgColor = "bg-[#C7654D]/20 hover:bg-[#C7654D]/35";
                        textColor = "text-[#DCE0DA]";
                        badgeBg = "bg-[#C7654D]/40 text-[#DCE0DA]";
                        iconNode = <Car className="w-3.5 h-3.5 text-[#C7654D]" />;
                      } else if (isReserved) {
                        borderColor = "border-[#C69A45]/70";
                        bgColor = "bg-[#C69A45]/20 hover:bg-[#C69A45]/35";
                        textColor = "text-[#DCE0DA]";
                        badgeBg = "bg-[#C69A45]/40 text-[#DCE0DA]";
                        iconNode = <Clock className="w-3.5 h-3.5 text-[#C69A45]" />;
                      }

                      const isSelected = selectedSlot?.slotId === slot.slotId;

                      return (
                        <button
                          key={slot.slotId}
                          onClick={() => setSelectedSlot(slot)}
                          className={`p-2 rounded-xl border text-center transition flex flex-col items-center justify-between min-h-[76px] relative group cursor-pointer ${borderColor} ${bgColor} ${textColor} ${
                            isSelected ? 'ring-2 ring-[#557A68] ring-offset-2 ring-offset-[#18221F] scale-105 z-20 shadow-lg' : ''
                          }`}
                          title={`${slot.slotId} • ${slot.type} • Status: ${slot.status}${slot.vehiclePlate ? ` • ${slot.vehiclePlate}` : ''}`}
                        >
                          {/* Top: Slot ID & Zone Indicator */}
                          <div className="flex items-center justify-between w-full">
                            <span className="font-mono text-[10px] font-black tracking-tight">
                              {slot.slotId}
                            </span>
                            {slot.isEv && (
                              <Zap className="w-2.5 h-2.5 text-[#3D8B8B]" />
                            )}
                            {slot.isAccessible && (
                              <Accessibility className="w-2.5 h-2.5 text-[#557A68]" />
                            )}
                          </div>

                          {/* Center Icon */}
                          <div className="my-1 flex items-center justify-center">
                            {iconNode}
                          </div>

                          {/* Bottom Status Snippet */}
                          <span className={`text-[8.5px] font-mono px-1.5 py-0.2 rounded font-bold uppercase truncate max-w-full ${badgeBg}`}>
                            {isCharging ? `${slot.kwDrawn}kW` : 
                             isAccessible ? (isAvailable ? 'ACC-FREE' : 'ACC-OCC') :
                             isReserved ? 'RES' : 
                             isOccupied ? 'OCC' : 'FREE'}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Bottom CAD Info Strip */}
              <div className="mt-4 pt-3 border-t border-[#2F4940] flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[11px] text-[#6B7772]">
                <div className="flex items-center gap-2">
                  <Info className="w-3.5 h-3.5 text-[#557A68]" />
                  <span>Click any bay stall to view vehicle telemetry or modify allocation.</span>
                </div>
                <span className="font-mono text-[#6B7772]">Ultrasonic Sensors 40kHz • BIM Architectural Earth</span>
              </div>

            </div>

          </div>
        ) : (
          /* ─── HIGH DENSITY MATRIX GRID VIEW ─── */
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs text-[#6B7772]">
              <span>Dense matrix display ({filteredSlots.length} bays shown)</span>
              <span>Fast visual scanner</span>
            </div>

            <div className="overflow-x-auto">
              <div className="min-w-[640px] sm:min-w-full">
                <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 xl:grid-cols-12 gap-1.5 p-2 border border-[#DCE0DA] rounded-xl bg-[#F4F2EC]/60">
                  {filteredSlots.map(slot => {
                    const isAvailable = slot.status === 'Available';
                    const isOccupied = slot.status === 'Occupied';
                    const isReserved = slot.status === 'Reserved';
                    const isCharging = slot.status === 'EV Charging';

                    let style = "bg-white border-[#DCE0DA] text-[#17201D] hover:border-[#557A68]";
                    let badgeColor = "text-[#6B7772]";
                    
                    if (isCharging) {
                      style = "bg-[#3D8B8B]/10 border-[#3D8B8B]/40 text-[#17201D] hover:border-[#3D8B8B]";
                      badgeColor = "text-[#3D8B8B] font-bold";
                    } else if (slot.isAccessible) {
                      style = isAvailable 
                        ? "bg-[#557A68]/10 border-[#557A68]/40 text-[#17201D] hover:border-[#557A68]"
                        : "bg-[#C7654D]/10 border-[#C7654D]/40 text-[#17201D]";
                      badgeColor = "text-[#557A68] font-bold";
                    } else if (isAvailable) {
                      style = "bg-[#4D8A68]/10 border-[#4D8A68]/40 text-[#17201D] hover:border-[#4D8A68]";
                      badgeColor = "text-[#4D8A68] font-bold";
                    } else if (isOccupied) {
                      style = "bg-[#C7654D]/10 border-[#C7654D]/40 text-[#17201D] hover:border-[#C7654D]";
                      badgeColor = "text-[#C7654D]";
                    } else if (isReserved) {
                      style = "bg-[#C69A45]/10 border-[#C69A45]/40 text-[#17201D] hover:border-[#C69A45]";
                      badgeColor = "text-[#C69A45] font-medium";
                    }

                    const isSelected = selectedSlot?.slotId === slot.slotId;

                    return (
                      <button
                        key={slot.slotId}
                        onClick={() => setSelectedSlot(slot)}
                        className={`p-2 rounded-xl border text-center transition flex flex-col items-center justify-center space-y-1 relative group cursor-pointer ${style} ${
                          isSelected ? 'ring-2 ring-[#17201D] ring-offset-1 shadow-md scale-105 z-10' : ''
                        }`}
                        title={`${slot.slotId} • ${slot.type} • Status: ${slot.status}`}
                      >
                        <span className="font-mono text-[10px] font-extrabold block truncate w-full">
                          {slot.slotId}
                        </span>

                        <div className="w-5 h-5 flex items-center justify-center">
                          {isCharging ? (
                            <Zap className="w-3.5 h-3.5 text-[#3D8B8B] animate-pulse" />
                          ) : slot.isAccessible ? (
                            <Accessibility className="w-3.5 h-3.5 text-[#557A68]" />
                          ) : isReserved ? (
                            <Clock className="w-3.5 h-3.5 text-[#C69A45]" />
                          ) : isOccupied ? (
                            <Car className="w-3.5 h-3.5 text-[#C7654D]" />
                          ) : (
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#4D8A68]" />
                          )}
                        </div>

                        <span className={`text-[8.5px] font-mono uppercase tracking-tight truncate w-full ${badgeColor}`}>
                          {isCharging ? 'EV-Chg' : slot.isAccessible ? (isAvailable ? 'Acc-Free' : 'Acc-Occ') : isReserved ? 'Res' : isOccupied ? 'Occ' : 'Free'}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* ─────────────────────────────────────────────────────────────
          5. SLOT INSPECTOR / MANAGEMENT MODAL
      ───────────────────────────────────────────────────────────── */}
      {selectedSlot && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#18221F]/70 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white rounded-2xl max-w-lg w-full p-5 sm:p-6 shadow-2xl border border-[#DCE0DA] space-y-4 animate-scaleUp">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-[#DCE0DA] pb-3">
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center border font-mono font-bold text-sm ${
                  selectedSlot.status === 'Available' ? 'bg-[#4D8A68]/15 text-[#4D8A68] border-[#4D8A68]/30' :
                  selectedSlot.status === 'Occupied' ? 'bg-[#C7654D]/15 text-[#C7654D] border-[#C7654D]/30' :
                  selectedSlot.status === 'Reserved' ? 'bg-[#C69A45]/15 text-[#C69A45] border-[#C69A45]/30' :
                  'bg-[#3D8B8B]/15 text-[#3D8B8B] border-[#3D8B8B]/30'
                }`}>
                  {selectedSlot.isEv ? <Zap className="w-6 h-6 text-[#3D8B8B] animate-pulse" /> : 
                   selectedSlot.isAccessible ? <Accessibility className="w-6 h-6 text-[#557A68]" /> :
                   <Car className="w-6 h-6 text-[#C7654D]" />}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-extrabold text-[#17201D] text-lg">Bay {selectedSlot.slotId}</h3>
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full font-bold uppercase ${
                      selectedSlot.status === 'Available' ? 'bg-[#4D8A68]/15 text-[#4D8A68] border border-[#4D8A68]/30' :
                      selectedSlot.status === 'Occupied' ? 'bg-[#C7654D]/15 text-[#C7654D] border border-[#C7654D]/30' :
                      selectedSlot.status === 'Reserved' ? 'bg-[#C69A45]/15 text-[#C69A45] border border-[#C69A45]/30' :
                      'bg-[#3D8B8B]/15 text-[#3D8B8B] border border-[#3D8B8B]/30'
                    }`}>
                      {selectedSlot.status}
                    </span>
                  </div>
                  <p className="text-xs text-[#6B7772]">{selectedSlot.type} • {selectedSlot.zone}</p>
                </div>
              </div>

              <button
                onClick={() => setSelectedSlot(null)}
                className="p-1.5 rounded-lg text-[#6B7772] hover:text-[#17201D] hover:bg-[#F4F2EC] transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content Details */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-[#F4F2EC] rounded-xl border border-[#DCE0DA] space-y-1">
                <span className="text-[#6B7772] text-[10px] uppercase font-semibold">Basement Level</span>
                <p className="font-bold text-[#17201D]">{selectedSlot.level === 'B1' ? 'Basement -1 (Upper Level)' : 'Basement -2 (Lower Level)'}</p>
              </div>

              <div className="p-3 bg-[#F4F2EC] rounded-xl border border-[#DCE0DA] space-y-1">
                <span className="text-[#6B7772] text-[10px] uppercase font-semibold">Allocated Zone</span>
                <p className="font-bold text-[#17201D] truncate">{selectedSlot.zone}</p>
              </div>

              {selectedSlot.isAccessible && (
                <div className="col-span-2 p-3 bg-[#557A68]/10 rounded-xl border border-[#557A68]/30 space-y-1">
                  <div className="flex items-center gap-1.5 text-[#557A68] text-[10px] uppercase font-bold">
                    <Accessibility className="w-3.5 h-3.5" />
                    <span>Mobility & Disabled-Accessible Features</span>
                  </div>
                  <p className="text-xs text-[#17201D] font-medium">
                    Extra-wide 3.6m bay width with 1.2m transfer access aisle. Located 14 meters from Elevator Core #1 with direct barrier-free ramp access.
                  </p>
                </div>
              )}

              {selectedSlot.vehiclePlate && (
                <div className="p-3 bg-[#F4F2EC] rounded-xl border border-[#DCE0DA] space-y-1">
                  <span className="text-[#6B7772] text-[10px] uppercase font-semibold">Vehicle Plate (ANPR)</span>
                  <p className="font-mono font-bold text-[#17201D]">{selectedSlot.vehiclePlate}</p>
                </div>
              )}

              {selectedSlot.vehicleModel && (
                <div className="p-3 bg-[#F4F2EC] rounded-xl border border-[#DCE0DA] space-y-1">
                  <span className="text-[#6B7772] text-[10px] uppercase font-semibold">Vehicle Description</span>
                  <p className="font-bold text-[#17201D] truncate">{selectedSlot.vehicleModel}</p>
                </div>
              )}

              {selectedSlot.reservedFor && (
                <div className="col-span-2 p-3 bg-[#C69A45]/10 rounded-xl border border-[#C69A45]/30 space-y-1">
                  <span className="text-[#C69A45] text-[10px] uppercase font-semibold">Designated Reservation</span>
                  <p className="font-bold text-[#17201D]">{selectedSlot.reservedFor}</p>
                </div>
              )}

              {selectedSlot.status === 'EV Charging' && (
                <>
                  <div className="p-3 bg-[#3D8B8B]/10 rounded-xl border border-[#3D8B8B]/30 space-y-1">
                    <span className="text-[#3D8B8B] text-[10px] uppercase font-semibold">Fast Charging Output</span>
                    <p className="font-mono font-bold text-[#17201D]">{selectedSlot.kwDrawn} kW (150kW Peak DC)</p>
                  </div>
                  <div className="p-3 bg-[#3D8B8B]/10 rounded-xl border border-[#3D8B8B]/30 space-y-1">
                    <span className="text-[#3D8B8B] text-[10px] uppercase font-semibold">Battery State</span>
                    <p className="font-bold text-[#17201D]">{selectedSlot.batteryPct}% ({selectedSlot.timeRemainingMins} mins remaining)</p>
                  </div>
                </>
              )}
            </div>

            {/* Modal Actions to Mutate State dynamically */}
            <div className="pt-2 border-t border-[#DCE0DA] space-y-2">
              <span className="text-[11px] font-semibold text-[#17201D] block">Manage Bay Allocation Status:</span>
              
              <div className="grid grid-cols-2 gap-2">
                {selectedSlot.status !== 'Available' && (
                  <button
                    onClick={() => handleUpdateSlotStatus(selectedSlot.slotId, 'Available')}
                    className="w-full py-2.5 px-3 bg-[#4D8A68] hover:bg-[#2F4940] text-white font-semibold text-xs rounded-xl transition shadow-2xs flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Set as Available</span>
                  </button>
                )}

                {selectedSlot.status !== 'Occupied' && (
                  <button
                    onClick={() => handleUpdateSlotStatus(selectedSlot.slotId, 'Occupied')}
                    className="w-full py-2.5 px-3 bg-[#C7654D] hover:bg-[#B94A48] text-white font-semibold text-xs rounded-xl transition shadow-2xs flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Car className="w-3.5 h-3.5" />
                    <span>Park Vehicle</span>
                  </button>
                )}

                {selectedSlot.status !== 'Reserved' && (
                  <button
                    onClick={() => handleUpdateSlotStatus(selectedSlot.slotId, 'Reserved')}
                    className="w-full py-2.5 px-3 bg-[#C69A45] hover:bg-[#C69A45]/80 text-white font-semibold text-xs rounded-xl transition shadow-2xs flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Clock className="w-3.5 h-3.5" />
                    <span>Reserve Bay</span>
                  </button>
                )}

                {selectedSlot.status !== 'EV Charging' && (
                  <button
                    onClick={() => handleUpdateSlotStatus(selectedSlot.slotId, 'EV Charging')}
                    className="w-full py-2.5 px-3 bg-[#3D8B8B] hover:bg-[#2F4940] text-white font-semibold text-xs rounded-xl transition shadow-2xs flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Zap className="w-3.5 h-3.5" />
                    <span>Plug In EV Charger</span>
                  </button>
                )}
              </div>
            </div>

          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          6. EV SUBSTATION, AIR QUALITY & ANPR AUTOMATION INFRASTRUCTURE
      ───────────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1">
        <div className="bg-white p-4.5 rounded-2xl border border-[#DCE0DA] shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#6B7772]">EV Substation Load</span>
            <Power className="w-4 h-4 text-[#3D8B8B]" />
          </div>
          <div className="text-2xl font-black text-[#17201D]">{totalKwDrawn} kW <span className="text-sm text-[#6B7772] font-normal">/ 600 kW Peak</span></div>
          <p className="text-[11px] text-[#6B7772]">42% Solar Offset via Rooftop PV Array Integration</p>
        </div>

        <div className="bg-white p-4.5 rounded-2xl border border-[#DCE0DA] shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#6B7772]">Basement Air Quality & Ventilation</span>
            <ShieldCheck className="w-4 h-4 text-[#557A68]" />
          </div>
          <div className="text-2xl font-black text-[#4D8A68]">AQI 22 (Optimal)</div>
          <p className="text-[11px] text-[#6B7772]">CO Sensors 4.2 PPM • Jet Induction Fans Running at 30%</p>
        </div>

        <div className="bg-white p-4.5 rounded-2xl border border-[#DCE0DA] shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#6B7772]">Automated Barrier Gates (ANPR)</span>
            <CheckCircle2 className="w-4 h-4 text-[#557A68]" />
          </div>
          <div className="text-2xl font-black text-[#17201D]">4 RFID Lanes Active</div>
          <p className="text-[11px] text-[#6B7772]">High-Speed License Plate Optical Recognition (99.9%)</p>
        </div>
      </div>

    </div>
  );
}
