import React, { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';
import { 
  Video, 
  Play, 
  Pause, 
  RotateCcw, 
  Film,
  Sparkles
} from 'lucide-react';

export default function WalkthroughView() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  const mountRef = useRef(null);
  const animationFrameRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);

  useEffect(() => {
    if (!mountRef.current) return;

    const width = mountRef.current.clientWidth;
    const height = mountRef.current.clientHeight;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf1f5f9);
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
    camera.position.set(0, 10, 60);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mountRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(ambientLight);
    const sunLight = new THREE.DirectionalLight(0xfff8e7, 1.5);
    sunLight.position.set(40, 60, 40);
    scene.add(sunLight);

    const buildingGroup = new THREE.Group();
    scene.add(buildingGroup);

    for (let level = -1; level <= 9; level++) {
      const y = level < 0 ? -2.8 : level * 2.8;
      const color = level < 0 ? 0x10b981 : level <= 1 ? 0xf59e0b : level === 5 ? 0x14b8a6 : 0x3b82f6;
      
      const slabGeo = new THREE.BoxGeometry(26, 0.4, 40);
      const mat = new THREE.MeshStandardMaterial({ color, roughness: 0.3 });
      const slab = new THREE.Mesh(slabGeo, mat);
      slab.position.set(0, y, 0);
      buildingGroup.add(slab);

      if (level >= 0) {
        const glassGeo = new THREE.BoxGeometry(25.8, 2.4, 39.8);
        const glassMat = new THREE.MeshPhysicalMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.35 });
        const glass = new THREE.Mesh(glassGeo, glassMat);
        glass.position.set(0, y + 1.4, 0);
        buildingGroup.add(glass);
      }
    }

    const treeMat = new THREE.MeshStandardMaterial({ color: 0x22c55e });
    for (let i = 0; i < 6; i++) {
      const tree = new THREE.Mesh(new THREE.DodecahedronGeometry(1.8), treeMat);
      tree.position.set((i % 2 === 0 ? 3 : -3), 1.5, (i * 4 - 10));
      buildingGroup.add(tree);
    }

    const animateCamera = (tSec) => {
      const normT = (tSec % 30) / 30;
      const angle = normT * Math.PI * 2;
      const radius = 55 - Math.sin(normT * Math.PI) * 15;
      const camY = 6 + normT * 28;

      camera.position.x = radius * Math.sin(angle);
      camera.position.z = radius * Math.cos(angle);
      camera.position.y = camY;
      camera.lookAt(0, 12, 0);
    };

    let lastTime = performance.now();
    const renderLoop = (now) => {
      animationFrameRef.current = requestAnimationFrame(renderLoop);
      if (isPlaying) {
        const deltaSec = (now - lastTime) / 1000;
        setProgress(prev => {
          const nextVal = prev + deltaSec;
          return nextVal >= 30 ? 0 : nextVal;
        });
      }
      lastTime = now;
      animateCamera(progress);
      renderer.render(scene, camera);
    };

    renderLoop(performance.now());

    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [isPlaying, progress]);

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-pink-600">
            <Film className="w-4 h-4 text-pink-500" />
            <span>3D CINEMATIC ARCHITECTURAL TOUR</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900">
            30-Second 3D <span className="text-pink-600">Walkthrough Video</span>
          </h1>
          <p className="text-slate-500 text-xs mt-1">
            Seamless camera tour traversing the central biophilic courtyard, commercial podium, residential kinetic louvers, and rooftop solar farm.
          </p>
        </div>

        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-pink-50 border border-pink-200 text-xs text-pink-600 font-mono">
          <Sparkles className="w-4 h-4 text-yellow-500" />
          <span>Autodesk Revit 3D Camera Path</span>
        </div>
      </div>

      <div className="glass-panel p-6 rounded-2xl border border-slate-200 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-bold text-slate-900 text-base flex items-center gap-2">
            <Film className="w-5 h-5 text-pink-500" />
            <span>WebGL 3D Camera Tour (30 Seconds)</span>
          </h2>
          <span className="font-mono text-xs text-pink-600 font-bold px-3 py-1 rounded-full bg-pink-50 border border-pink-200">
            {progress.toFixed(1)}s / 30.0s
          </span>
        </div>

        <div className="bg-slate-100 rounded-2xl overflow-hidden border border-slate-200 h-[500px] relative">
          <div ref={mountRef} className="w-full h-full" />

          <div className="absolute top-4 left-4 px-3 py-1.5 rounded-xl bg-white/95 backdrop-blur-md border border-slate-200 text-xs font-semibold text-slate-700 shadow-sm">
            {progress < 7.5 ? 'WAYPOINT 1: Courtyard & Entrance Approach' :
             progress < 15.0 ? 'WAYPOINT 2: Podium Retail & Double Glazing' :
             progress < 22.5 ? 'WAYPOINT 3: Residential Balconies & Louvers' :
             'WAYPOINT 4: Rooftop Solar Garden & Overview'}
          </div>
        </div>

        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="w-11 h-11 rounded-xl bg-pink-600 hover:bg-pink-500 text-white flex items-center justify-center transition shadow-lg shadow-pink-200/50"
            >
              {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
            </button>

            <button
              onClick={() => { setProgress(0); setIsPlaying(false); }}
              className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 transition border border-slate-200"
              title="Reset Tour"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>

          <div className="flex-1 w-full space-y-1">
            <input
              type="range"
              min="0"
              max="30"
              step="0.1"
              value={progress}
              onChange={(e) => setProgress(parseFloat(e.target.value))}
              className="w-full accent-pink-500 cursor-pointer h-2"
            />
            <div className="flex justify-between text-[10px] font-mono text-slate-500">
              <span>00:00 (Courtyard)</span>
              <span>00:15 (Kinetic Louvers)</span>
              <span>00:30 (Rooftop Solar)</span>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
