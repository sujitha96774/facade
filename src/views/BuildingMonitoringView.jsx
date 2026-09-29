import React from 'react';
import { Line, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { 
  Activity, 
  Zap, 
  Sun, 
  Droplets, 
  Wind
} from 'lucide-react';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export default function BuildingMonitoringView() {
  const hours = ['06:00', '08:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00'];

  const solarEnergyData = {
    labels: hours,
    datasets: [
      {
        label: 'Rooftop Solar PV (kW)',
        data: [20, 65, 140, 178, 165, 110, 45, 10],
        borderColor: '#eab308',
        backgroundColor: 'rgba(234, 179, 8, 0.15)',
        fill: true,
        tension: 0.4
      },
      {
        label: 'Grid Electrical Power (kW)',
        data: [120, 150, 110, 85, 95, 130, 160, 140],
        borderColor: '#0ea5e9',
        backgroundColor: 'rgba(14, 165, 233, 0.1)',
        fill: true,
        tension: 0.4
      }
    ]
  };

  const hvacData = {
    labels: hours,
    datasets: [
      {
        label: 'HVAC Chiller Load (kW)',
        data: [45, 70, 95, 115, 120, 105, 80, 55],
        backgroundColor: '#f97316',
        borderRadius: 6
      },
      {
        label: 'Basement EV Chargers Load (kW)',
        data: [30, 45, 80, 148, 120, 90, 110, 85],
        backgroundColor: '#10b981',
        borderRadius: 6
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: '#475569',
          font: { family: 'Inter', size: 10 },
          boxWidth: 12
        }
      }
    },
    scales: {
      x: {
        grid: { color: 'rgba(0, 0, 0, 0.05)' },
        ticks: { color: '#64748b', font: { size: 9 }, maxRotation: 0 }
      },
      y: {
        grid: { color: 'rgba(0, 0, 0, 0.05)' },
        ticks: { color: '#64748b', font: { size: 9 } }
      }
    }
  };

  return (
    <div className="p-3.5 sm:p-5 md:p-6 space-y-4 sm:space-y-6 max-w-7xl mx-auto w-full">
      
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 sm:gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-purple-600">
            <Activity className="w-4 h-4 text-purple-500" />
            <span>REAL-TIME IOT TELEMETRY ENGINE</span>
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 mt-0.5">
            Building Monitoring <span className="text-purple-600">Dashboard</span>
          </h1>
          <p className="text-slate-500 text-xs mt-1 max-w-2xl leading-relaxed">
            Live telemetry for solar PV generation, HVAC COP performance, greywater recycling, and indoor AQI sensors.
          </p>
        </div>

        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-purple-50 border border-purple-200 text-xs text-purple-600 font-mono shrink-0 self-start md:self-auto">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
          <span>IoT Online (148 Nodes)</span>
        </div>
      </div>

      {/* Metric Cards - 2 cols on mobile, 4 on desktop */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        
        <div className="glass-panel p-3.5 sm:p-5 rounded-2xl border border-slate-200 space-y-1 sm:space-y-2">
          <div className="flex items-center justify-between text-[11px] sm:text-xs text-slate-500">
            <span>Solar Peak</span>
            <Sun className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-yellow-500" />
          </div>
          <div className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-yellow-500">178 kW</div>
          <p className="text-[10px] sm:text-xs text-slate-600">98.8% Solar Capacity</p>
        </div>

        <div className="glass-panel p-3.5 sm:p-5 rounded-2xl border border-slate-200 space-y-1 sm:space-y-2">
          <div className="flex items-center justify-between text-[11px] sm:text-xs text-slate-500">
            <span>HVAC COP</span>
            <Zap className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-orange-500" />
          </div>
          <div className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-orange-500">4.8 COP</div>
          <p className="text-[10px] sm:text-xs text-slate-600">Magnetic Chillers</p>
        </div>

        <div className="glass-panel p-3.5 sm:p-5 rounded-2xl border border-slate-200 space-y-1 sm:space-y-2">
          <div className="flex items-center justify-between text-[11px] sm:text-xs text-slate-500">
            <span>Greywater</span>
            <Droplets className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-cyan-500" />
          </div>
          <div className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-cyan-600">14,200 L</div>
          <p className="text-[10px] sm:text-xs text-slate-600">100% Irrigation</p>
        </div>

        <div className="glass-panel p-3.5 sm:p-5 rounded-2xl border border-slate-200 space-y-1 sm:space-y-2">
          <div className="flex items-center justify-between text-[11px] sm:text-xs text-slate-500">
            <span>Air Quality</span>
            <Wind className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-500" />
          </div>
          <div className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-emerald-600">AQI 18</div>
          <p className="text-[10px] sm:text-xs text-slate-600">CO₂: 410 ppm</p>
        </div>

      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        
        <div className="glass-panel p-4 sm:p-6 rounded-2xl border border-slate-200 space-y-3 sm:space-y-4">
          <h2 className="font-bold text-slate-900 text-sm sm:text-base flex items-center gap-2">
            <Sun className="w-4.5 h-4.5 text-yellow-500" />
            <span>Power Generation & Grid Mix (kW)</span>
          </h2>
          <div className="h-56 sm:h-64">
            <Line data={solarEnergyData} options={chartOptions} />
          </div>
        </div>

        <div className="glass-panel p-4 sm:p-6 rounded-2xl border border-slate-200 space-y-3 sm:space-y-4">
          <h2 className="font-bold text-slate-900 text-sm sm:text-base flex items-center gap-2">
            <Zap className="w-4.5 h-4.5 text-orange-500" />
            <span>HVAC Chillers & EV Charging Demand (kW)</span>
          </h2>
          <div className="h-56 sm:h-64">
            <Bar data={hvacData} options={chartOptions} />
          </div>
        </div>

      </div>

    </div>
  );
}
