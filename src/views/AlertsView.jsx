import React, { useState } from 'react';
import { ALERTS_DATA } from '../data/mockData';
import { 
  Bell, 
  AlertTriangle, 
  Info, 
  CheckCircle2, 
  ShieldAlert, 
  Clock, 
  MapPin
} from 'lucide-react';

export default function AlertsView() {
  const [filterSeverity, setFilterSeverity] = useState('ALL');
  const [alerts, setAlerts] = useState(ALERTS_DATA);

  const filteredAlerts = alerts.filter(a => {
    if (filterSeverity === 'CRITICAL') return a.severity === 'Critical';
    if (filterSeverity === 'WARNING') return a.severity === 'Warning';
    if (filterSeverity === 'INFO') return a.severity === 'Info';
    return true;
  });

  const handleResolveAlert = (id) => {
    setAlerts(prev => prev.map(a => a.id === id ? { ...a, status: 'Resolved' } : a));
  };

  return (
    <div className="p-3.5 sm:p-5 md:p-6 space-y-4 sm:space-y-6 max-w-7xl mx-auto">
      
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-rose-600">
            <Bell className="w-4 h-4 text-rose-500 shrink-0" />
            <span>BUILDING SAFETY & ALERT SYSTEM</span>
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 mt-1">
            System Alerts & <span className="text-rose-600">Notifications</span>
          </h1>
          <p className="text-slate-500 text-xs mt-1 max-w-2xl">
            Real-time notifications from structural strain sensors, EV charger power grid, facade automation, and fire readiness.
          </p>
        </div>

        <div className="flex items-center gap-1.5 sm:gap-2 bg-slate-100 p-1.5 rounded-xl border border-slate-200 overflow-x-auto no-scrollbar shrink-0 self-start md:self-auto">
          <button
            onClick={() => setFilterSeverity('ALL')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition ${filterSeverity === 'ALL' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
          >
            All Alerts
          </button>
          <button
            onClick={() => setFilterSeverity('CRITICAL')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition ${filterSeverity === 'CRITICAL' ? 'bg-rose-600 text-white' : 'text-slate-500 hover:text-slate-700'}`}
          >
            Critical
          </button>
          <button
            onClick={() => setFilterSeverity('WARNING')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition ${filterSeverity === 'WARNING' ? 'bg-amber-500 text-white' : 'text-slate-500 hover:text-slate-700'}`}
          >
            Warning
          </button>
        </div>
      </div>

      <div className="space-y-3">
        {filteredAlerts.map(alert => {
          const isCritical = alert.severity === 'Critical';
          const isWarning = alert.severity === 'Warning';
          const isResolved = alert.status === 'Resolved';

          let borderCol = 'border-slate-200';
          let iconCol = 'text-cyan-500';
          let IconComp = Info;

          if (isCritical) {
            borderCol = 'border-rose-200 bg-rose-50/50';
            iconCol = 'text-rose-500';
            IconComp = ShieldAlert;
          } else if (isWarning) {
            borderCol = 'border-amber-200 bg-amber-50/50';
            iconCol = 'text-amber-500';
            IconComp = AlertTriangle;
          }

          return (
            <div
              key={alert.id}
              className={`glass-panel p-3.5 sm:p-5 rounded-2xl border ${borderCol} transition flex flex-col md:flex-row md:items-center justify-between gap-3 sm:gap-4`}
            >
              <div className="flex items-start gap-3 sm:gap-4">
                <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-white flex items-center justify-center shrink-0 border border-slate-200 ${iconCol}`}>
                  <IconComp className="w-4.5 h-4.5 sm:w-5 sm:h-5" />
                </div>

                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                    <span className="font-mono text-[10px] font-bold text-slate-500 px-2 py-0.5 rounded bg-slate-100 border border-slate-200">
                      {alert.id}
                    </span>
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                      isCritical ? 'bg-rose-50 text-rose-600 border border-rose-200' :
                      isWarning ? 'bg-amber-50 text-amber-600 border border-amber-200' :
                      'bg-cyan-50 text-cyan-600 border border-cyan-200'
                    }`}>
                      {alert.severity}
                    </span>
                    <span className="text-[11px] text-slate-500 font-mono flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {alert.timestamp}
                    </span>
                  </div>

                  <h3 className="font-bold text-slate-900 text-sm sm:text-base">{alert.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{alert.message}</p>

                  <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs text-slate-500 pt-1">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span>{alert.location}</span>
                    </div>
                    <span>•</span>
                    <span className="text-cyan-600 font-semibold">{alert.category}</span>
                  </div>
                </div>
              </div>

              <div className="shrink-0 flex items-center justify-end w-full md:w-auto pt-2 md:pt-0 border-t md:border-t-0 border-slate-200/60">
                {isResolved ? (
                  <span className="w-full md:w-auto justify-center px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-200 text-xs font-semibold flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" />
                    Resolved
                  </span>
                ) : (
                  <button
                    onClick={() => handleResolveAlert(alert.id)}
                    className="w-full md:w-auto px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-900 text-xs font-semibold border border-slate-200 transition text-center"
                  >
                    Acknowledge & Resolve
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}
