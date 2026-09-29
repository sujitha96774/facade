import React, { useState, useEffect, useRef } from 'react';
import { FORMA_CLIMATE_DATA } from '../data/mockData';
import { 
  Trees, 
  Sun, 
  Wind, 
  Sparkles, 
  Thermometer
} from 'lucide-react';

export default function CourtyardClimateView() {
  const windCanvasRef = useRef(null);

  useEffect(() => {
    const canvas = windCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationId;

    let width = canvas.width = canvas.parentElement.clientWidth || 320;
    const height = canvas.height = 220;

    const particles = Array.from({ length: 45 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      speed: 1.5 + Math.random() * 2,
      length: 15 + Math.random() * 20,
      opacity: 0.3 + Math.random() * 0.5
    }));

    const handleCanvasResize = () => {
      if (!canvas || !canvas.parentElement) return;
      const newWidth = canvas.parentElement.clientWidth;
      if (newWidth > 0 && newWidth !== width) {
        width = canvas.width = newWidth;
      }
    };

    window.addEventListener('resize', handleCanvasResize);
    let ro = null;
    if (window.ResizeObserver && canvas.parentElement) {
      ro = new ResizeObserver(handleCanvasResize);
      ro.observe(canvas.parentElement);
    }

    const draw = () => {
      ctx.fillStyle = 'rgba(248, 250, 252, 0.4)';
      ctx.fillRect(0, 0, width, height);

      ctx.strokeStyle = 'rgba(20, 184, 166, 0.4)';
      ctx.lineWidth = 2;
      ctx.strokeRect(width * 0.35, height * 0.2, width * 0.3, height * 0.6);

      ctx.fillStyle = 'rgba(20, 184, 166, 0.1)';
      ctx.fillRect(width * 0.35, height * 0.2, width * 0.3, height * 0.6);

      ctx.fillStyle = '#0d9488';
      ctx.font = '10px monospace';
      ctx.fillText('BIOPHILIC ATRIUM (800 m²)', Math.max(10, width * 0.37), height * 0.5);

      particles.forEach(p => {
        ctx.beginPath();
        ctx.strokeStyle = `rgba(6, 182, 212, ${p.opacity})`;
        ctx.lineWidth = 1.5;

        const isNearCourtyard = p.x > width * 0.3 && p.x < width * 0.7;
        const targetY = isNearCourtyard ? height * 0.5 : p.y;
        
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(p.x + p.length, p.y + (targetY - p.y) * 0.1);
        ctx.stroke();

        p.x += p.speed;
        if (p.x > width) {
          p.x = 0;
          p.y = Math.random() * height;
        }
      });

      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleCanvasResize);
      if (ro) ro.disconnect();
    };
  }, []);

  return (
    <div className="p-3.5 sm:p-5 md:p-6 space-y-4 sm:space-y-6 max-w-7xl mx-auto w-full">
      
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 sm:gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-teal-600">
            <Trees className="w-4 h-4 text-teal-500" />
            <span>AUTODESK FORMA SITE DESIGN INTEGRATION</span>
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 mt-0.5">
            Courtyard & Climate <span className="text-teal-600">Analysis</span>
          </h1>
          <p className="text-slate-500 text-xs mt-1 max-w-2xl leading-relaxed">
            Data-driven microclimate studies: sun path solar irradiation, CFD wind vector airflow, and biophilic courtyard cooling.
          </p>
        </div>

        <div className="px-3 py-1.5 rounded-xl bg-teal-50 border border-teal-200 text-xs text-teal-600 flex items-center gap-2 font-mono shrink-0 self-start md:self-auto">
          <Sparkles className="w-4 h-4 text-yellow-500" />
          <span>Forma Environmental Model</span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
        
        <div className="glass-panel p-4 sm:p-5 rounded-2xl border border-slate-200 space-y-1.5 sm:space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>Microclimate Cooling</span>
            <Thermometer className="w-4 h-4 text-cyan-500" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-cyan-600">-3.4 °C Drop</div>
          <p className="text-xs text-slate-600">Evaporative cooling via central water body & native flora.</p>
        </div>

        <div className="glass-panel p-4 sm:p-5 rounded-2xl border border-slate-200 space-y-1.5 sm:space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>Airflow Efficiency</span>
            <Wind className="w-4 h-4 text-teal-500" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-teal-600">+82% Boost</div>
          <p className="text-xs text-slate-600">Bi-directional wind scoop shaft through residential levels.</p>
        </div>

        <div className="glass-panel p-4 sm:p-5 rounded-2xl border border-slate-200 space-y-1.5 sm:space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>Daylight Autonomy</span>
            <Sun className="w-4 h-4 text-yellow-500" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-yellow-500">78% Coverage</div>
          <p className="text-xs text-slate-600">Spaces receiving &gt;300 Lux natural light for 8+ hrs/day.</p>
        </div>

      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        
        <div className="glass-panel p-4 sm:p-6 rounded-2xl border border-slate-200 space-y-3 sm:space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-bold text-slate-900 text-sm sm:text-base flex items-center gap-2">
              <Wind className="w-4.5 h-4.5 text-teal-500" />
              <span>CFD Airflow Simulation (Forma Engine)</span>
            </h2>
            <span className="font-mono text-[10px] text-teal-600 px-2 py-0.5 rounded bg-teal-50 border border-teal-200">
              Live Vector Map
            </span>
          </div>

          <div className="bg-slate-50 rounded-xl overflow-hidden border border-slate-200 relative">
            <canvas ref={windCanvasRef} className="w-full block" />
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
              <span className="text-slate-500 text-[10px]">Prevailing Summer Wind</span>
              <p className="font-bold text-slate-700">{FORMA_CLIMATE_DATA.windConditions.prevailingWindSummer}</p>
            </div>
            <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
              <span className="text-slate-500 text-[10px]">Pedestrian Comfort Index</span>
              <p className="font-bold text-teal-600">{FORMA_CLIMATE_DATA.windConditions.pedestrianWindComfortIndex}</p>
            </div>
          </div>
        </div>

        <div className="glass-panel p-6 rounded-2xl border border-slate-200 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-bold text-slate-900 text-base flex items-center gap-2">
              <Sun className="w-5 h-5 text-yellow-500" />
              <span>Sun Path & Solar Radiation Study</span>
            </h2>
            <span className="font-mono text-[10px] text-yellow-600 px-2 py-0.5 rounded bg-yellow-50 border border-yellow-200">
              kWh / m²
            </span>
          </div>

          <div className="space-y-3 text-xs">
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
              <div className="flex justify-between font-semibold">
                <span className="text-slate-600">Summer Solstice Radiation</span>
                <span className="font-mono text-yellow-600">{FORMA_CLIMATE_DATA.sunPath.summerSolsticeRadiationKwh} kWh/m²/day</span>
              </div>
              <p className="text-slate-500 text-[11px]">Mitigated by kinetic louver facade on South-West elevations.</p>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
              <div className="flex justify-between font-semibold">
                <span className="text-slate-600">Winter Solstice Radiation</span>
                <span className="font-mono text-yellow-600">{FORMA_CLIMATE_DATA.sunPath.winterSolsticeRadiationKwh} kWh/m²/day</span>
              </div>
              <p className="text-slate-500 text-[11px]">Maximized passive solar heating into central courtyard atrium.</p>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
              <div className="flex justify-between font-semibold">
                <span className="text-slate-600">Shading Effectiveness Rating</span>
                <span className="font-mono text-emerald-600">{FORMA_CLIMATE_DATA.sunPath.shadingEffectivenessPct}% Shaded</span>
              </div>
              <p className="text-slate-500 text-[11px]">Reduces indoor glare by 64% while maintaining natural view corridors.</p>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
