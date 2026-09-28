import React, { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';
import { FLOOR_EXPLORER_DATA, PROJECT_METRICS } from '../data/mockData';
import { 
  Building2, 
  Layers, 
  Sun, 
  Eye, 
  Sliders, 
  Maximize2, 
  RotateCcw, 
  Compass, 
  Box, 
  CheckCircle2, 
  Zap, 
  Trees, 
  Sparkles,
  Search
} from 'lucide-react';

export default function BimModelView({ subRoute }) {
  const [activeTab, setActiveTab] = useState(() => {
    if (subRoute === 'floor-explorer') return 'floor-explorer';
    return '3d-building';
  });

  // 3D Canvas state
  const mountRef = useRef(null);
  const [explosion, setExplosion] = useState(0); // 0 to 1 slider
  const [wireframe, setWireframe] = useState(false);
  const [sunAngle, setSunAngle] = useState(45); // 0 to 180 deg
  const [materialMode, setMaterialMode] = useState('realistic'); // realistic, thermal, solar, structural
  const [cameraPreset, setCameraPreset] = useState('isometric');

  // Floor explorer state
  const [selectedFloorLevel, setSelectedFloorLevel] = useState(0); // Level 0 (Ground) default

  // Three.js Scene refs
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  const floorsGroupRef = useRef(null);
  const sunLightRef = useRef(null);

  // Initialize Three.js 3D Building Scene
  useEffect(() => {
    if (activeTab !== '3d-building' || !mountRef.current) return;

    const width = mountRef.current.clientWidth;
    const height = mountRef.current.clientHeight;

    // Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf1f5f9);
    sceneRef.current = scene;

    // Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(65, 45, 65);
    camera.lookAt(0, 15, 0);
    cameraRef.current = camera;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    mountRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Ambient & Directional Lights (Sunlight)
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.85);
    scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight(0xfff8e7, 1.8);
    sunLight.position.set(30, 60, 30);
    sunLight.castShadow = true;
    sunLight.shadow.mapSize.width = 2048;
    sunLight.shadow.mapSize.height = 2048;
    scene.add(sunLight);
    sunLightRef.current = sunLight;

    // Grid Ground Helper
    const gridHelper = new THREE.GridHelper(120, 30, 0x06b6d4, 0xcbd5e1);
    gridHelper.position.y = -4;
    scene.add(gridHelper);

    // Group for building floors
    const floorsGroup = new THREE.Group();
    scene.add(floorsGroup);
    floorsGroupRef.current = floorsGroup;

    // Build 11 Floor Meshes (Basement -1 to 9th Floor)
    // Building dimensions: Width = 30, Length = 50, Height per floor = 2.8
    const baseFloorHeight = 2.8;

    for (let level = -1; level <= 9; level++) {
      const floorMeshGroup = new THREE.Group();
      floorMeshGroup.userData = { level };

      const floorY = level < 0 ? -baseFloorHeight : level * baseFloorHeight;

      // Color scheme based on function
      let floorColor = 0x38bdf8; // Default blue
      if (level < 0) floorColor = 0x10b981; // Basement green
      else if (level <= 1) floorColor = 0xf59e0b; // Podium amber/orange
      else if (level === 5) floorColor = 0x14b8a6; // Sky terrace teal
      else floorColor = 0x3b82f6; // Residential blue

      const mat = new THREE.MeshStandardMaterial({
        color: floorColor,
        roughness: 0.3,
        metalness: 0.2,
        transparent: true,
        opacity: 0.85,
        wireframe: wireframe
      });

      // Main Slab Mesh
      const slabGeo = new THREE.BoxGeometry(28, 0.4, 46);
      const slabMesh = new THREE.Mesh(slabGeo, mat);
      slabMesh.castShadow = true;
      slabMesh.receiveShadow = true;
      floorMeshGroup.add(slabMesh);

      // Central Courtyard Void Cutout simulation (inner courtyard box)
      const courtyardVoidGeo = new THREE.BoxGeometry(10, 0.45, 16);
      const voidMat = new THREE.MeshBasicMaterial({ color: 0xf1f5f9 });
      const voidMesh = new THREE.Mesh(courtyardVoidGeo, voidMat);
      floorMeshGroup.add(voidMesh);

      // Columns on this floor
      const colMat = new THREE.MeshStandardMaterial({ color: 0x64748b, wireframe: wireframe });
      const colLocations = [
        [-12, -20], [-12, 0], [-12, 20],
        [12, -20], [12, 0], [12, 20]
      ];
      colLocations.forEach(([cx, cz]) => {
        const colGeo = new THREE.BoxGeometry(0.8, baseFloorHeight, 0.8);
        const colMesh = new THREE.Mesh(colGeo, colMat);
        colMesh.position.set(cx, baseFloorHeight / 2, cz);
        floorMeshGroup.add(colMesh);
      });

      // Glazing / Windows for Commercial & Residential
      if (level >= 0) {
        const glassMat = new THREE.MeshPhysicalMaterial({
          color: level <= 1 ? 0x06b6d4 : 0x93c5fd,
          transparent: true,
          opacity: 0.4,
          roughness: 0.1,
          transmission: 0.6
        });

        // Facade perimeter glass panels
        const glassFacadeGeo = new THREE.BoxGeometry(27.8, baseFloorHeight * 0.8, 45.8);
        const glassMesh = new THREE.Mesh(glassFacadeGeo, glassMat);
        glassMesh.position.set(0, baseFloorHeight / 2, 0);
        floorMeshGroup.add(glassMesh);

        // Balconies for Residential (Levels 2-9)
        if (level >= 2) {
          const balconyMat = new THREE.MeshStandardMaterial({ color: 0x334155 });
          const balconyGeo = new THREE.BoxGeometry(30, 0.2, 3);
          const balconyMesh = new THREE.Mesh(balconyGeo, balconyMat);
          balconyMesh.position.set(0, 0.5, 23);
          floorMeshGroup.add(balconyMesh);

          // Green Planter on Balcony
          const planterMat = new THREE.MeshStandardMaterial({ color: 0x22c55e });
          const planterGeo = new THREE.BoxGeometry(28, 0.4, 0.6);
          const planterMesh = new THREE.Mesh(planterGeo, planterMat);
          planterMesh.position.set(0, 0.8, 24.2);
          floorMeshGroup.add(planterMesh);
        }
      }

      floorMeshGroup.position.set(0, floorY, 0);
      floorsGroup.add(floorMeshGroup);
    }

    // Central Courtyard Biophilic Trees at Ground Level
    const treeMat = new THREE.MeshStandardMaterial({ color: 0x16a34a });
    const trunkMat = new THREE.MeshStandardMaterial({ color: 0x78350f });
    for (let i = 0; i < 4; i++) {
      const treeGroup = new THREE.Group();
      const trunkGeo = new THREE.CylinderGeometry(0.3, 0.4, 3);
      const trunk = new THREE.Mesh(trunkGeo, trunkMat);
      trunk.position.y = 1.5;

      const foliageGeo = new THREE.DodecahedronGeometry(2);
      const foliage = new THREE.Mesh(foliageGeo, treeMat);
      foliage.position.y = 3.5;

      treeGroup.add(trunk);
      treeGroup.add(foliage);
      treeGroup.position.set((i % 2 === 0 ? 3 : -3), 0, (i < 2 ? 4 : -4));
      floorsGroup.add(treeGroup);
    }

    // Animation Render Loop
    let animationFrameId;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      floorsGroup.rotation.y += 0.0015; // Slow ambient orbit
      renderer.render(scene, camera);
    };
    animate();

    // Handle Resize
    const handleResize = () => {
      if (!mountRef.current) return;
      const w = mountRef.current.clientWidth;
      const h = mountRef.current.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [activeTab]);

  // Update Floor Explosion Gap
  useEffect(() => {
    if (!floorsGroupRef.current) return;
    const gap = explosion * 5.5; // multiplier
    floorsGroupRef.current.children.forEach(child => {
      if (child.userData && typeof child.userData.level === 'number') {
        const lvl = child.userData.level;
        const baseY = lvl < 0 ? -2.8 : lvl * 2.8;
        child.position.y = baseY + lvl * gap;
      }
    });
  }, [explosion]);

  // Update Sun Angle Light Position
  useEffect(() => {
    if (!sunLightRef.current) return;
    const rad = (sunAngle * Math.PI) / 180;
    sunLightRef.current.position.set(
      60 * Math.cos(rad),
      60 * Math.sin(rad),
      30
    );
  }, [sunAngle]);

  // Camera Presets
  const handleCameraPreset = (preset) => {
    setCameraPreset(preset);
    if (!cameraRef.current) return;
    const cam = cameraRef.current;
    if (preset === 'isometric') {
      cam.position.set(65, 45, 65);
    } else if (preset === 'front') {
      cam.position.set(0, 20, 85);
    } else if (preset === 'top') {
      cam.position.set(0, 110, 0.1);
    } else if (preset === 'courtyard') {
      cam.position.set(0, 8, 25);
    }
    cam.lookAt(0, 15, 0);
  };

  const selectedFloorObj = FLOOR_EXPLORER_DATA.find(f => f.level === selectedFloorLevel) || FLOOR_EXPLORER_DATA[1];

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
            <Layers className="w-4 h-4 text-blue-400" />
            <span>AUTODESK REVIT BIM ENGINE</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900">
            BIM Model Explorer <span className="text-cyan-400">(B+G+9)</span>
          </h1>
          <p className="text-slate-500 text-xs mt-1">
            Interactive WebGL 3D building visualizer with exploded stack view, thermal materials, and 2D floor explorer.
          </p>
        </div>

        {/* Tab Selector */}
        <div className="flex gap-2 bg-slate-100 p-1.5 rounded-xl border border-slate-200">
          <button
            onClick={() => setActiveTab('3d-building')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition ${
              activeTab === '3d-building' 
                ? 'bg-cyan-600 text-white shadow-md' 
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            <Box className="w-4 h-4" />
            <span>3D Building Model</span>
          </button>

          <button
            onClick={() => setActiveTab('floor-explorer')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition ${
              activeTab === 'floor-explorer' 
                ? 'bg-cyan-600 text-white shadow-md' 
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            <Search className="w-4 h-4" />
            <span>Floor Explorer (11 Levels)</span>
          </button>
        </div>
      </div>

      {/* 3D BUILDING TAB CONTENT */}
      {activeTab === '3d-building' && (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          
          {/* 3D Canvas Viewport (3 Columns) */}
          <div className="lg:col-span-3 glass-panel rounded-2xl border border-slate-200 relative h-[560px] overflow-hidden flex flex-col justify-between">
            
            {/* Top Toolbar Overlay */}
            <div className="absolute top-4 left-4 right-4 z-10 flex flex-wrap items-center justify-between gap-3 pointer-events-auto">
              
              {/* Camera Presets */}
              <div className="flex items-center gap-1 bg-white/90 backdrop-blur-md p-1 rounded-xl border border-slate-200 shadow-sm">
                <button
                  onClick={() => handleCameraPreset('isometric')}
                  className={`px-3 py-1.5 rounded-lg text-[11px] font-semibold transition ${cameraPreset === 'isometric' ? 'bg-cyan-600 text-white' : 'text-slate-600 hover:text-slate-900'}`}
                >
                  Isometric
                </button>
                <button
                  onClick={() => handleCameraPreset('front')}
                  className={`px-3 py-1.5 rounded-lg text-[11px] font-semibold transition ${cameraPreset === 'front' ? 'bg-cyan-600 text-white' : 'text-slate-600 hover:text-slate-900'}`}
                >
                  Front
                </button>
                <button
                  onClick={() => handleCameraPreset('top')}
                  className={`px-3 py-1.5 rounded-lg text-[11px] font-semibold transition ${cameraPreset === 'top' ? 'bg-cyan-600 text-white' : 'text-slate-600 hover:text-slate-900'}`}
                >
                  Top Plan
                </button>
                <button
                  onClick={() => handleCameraPreset('courtyard')}
                  className={`px-3 py-1.5 rounded-lg text-[11px] font-semibold transition ${cameraPreset === 'courtyard' ? 'bg-cyan-600 text-white' : 'text-slate-600 hover:text-slate-900'}`}
                >
                  Courtyard
                </button>
              </div>

              {/* Status Badge */}
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/90 backdrop-blur-md border border-slate-200 text-xs text-slate-700 shadow-sm">
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="font-mono">Revit 3D Canvas Active</span>
              </div>
            </div>

            {/* Three.js Canvas mount container */}
            <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

            {/* Bottom Controls Overlay */}
            <div className="absolute bottom-4 left-4 right-4 z-10 bg-white/95 backdrop-blur-md p-4 rounded-xl border border-slate-200 shadow-lg grid grid-cols-1 sm:grid-cols-3 gap-4">
              
              {/* Explosion Slider */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-semibold text-slate-700">
                  <span className="flex items-center gap-1.5">
                    <Sliders className="w-3.5 h-3.5 text-cyan-400" />
                    Floor Explosion View
                  </span>
                  <span className="font-mono text-cyan-400">{Math.round(explosion * 100)}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={explosion}
                  onChange={(e) => setExplosion(parseFloat(e.target.value))}
                  className="w-full accent-cyan-500 cursor-pointer"
                />
              </div>

              {/* Sun Position Slider */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-semibold text-slate-700">
                  <span className="flex items-center gap-1.5">
                    <Sun className="w-3.5 h-3.5 text-yellow-400" />
                    Sun Angle Simulation
                  </span>
                  <span className="font-mono text-yellow-400">{sunAngle}°</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="180"
                  value={sunAngle}
                  onChange={(e) => setSunAngle(parseInt(e.target.value))}
                  className="w-full accent-yellow-500 cursor-pointer"
                />
              </div>

              {/* Toggles */}
              <div className="flex items-center justify-end gap-3">
                <button
                  onClick={() => setWireframe(!wireframe)}
                  className={`px-3 py-2 rounded-xl text-xs font-semibold border transition ${
                    wireframe 
                      ? 'bg-cyan-50 text-cyan-700 border-cyan-300' 
                      : 'bg-slate-100 text-slate-600 border-slate-300 hover:text-slate-900'
                  }`}
                >
                  {wireframe ? 'Wireframe ON' : 'Solid Mesh'}
                </button>
              </div>

            </div>

          </div>

          {/* Side Controls & Legend (1 Column) */}
          <div className="space-y-4">
            
            {/* Legend Card */}
            <div className="glass-panel p-5 rounded-2xl border border-slate-200 space-y-4">
              <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                <Eye className="w-4 h-4 text-cyan-400" />
                <span>BIM Color Legend</span>
              </h3>

              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-200">
                  <div className="flex items-center gap-2">
                    <div className="w-3.5 h-3.5 rounded bg-amber-500" />
                    <span className="text-slate-700">Podium Commercial (G + 1)</span>
                  </div>
                  <span className="font-mono text-slate-500">Retail & Office</span>
                </div>

                <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-200">
                  <div className="flex items-center gap-2">
                    <div className="w-3.5 h-3.5 rounded bg-blue-500" />
                    <span className="text-slate-700">Residential Towers (2 - 9)</span>
                  </div>
                  <span className="font-mono text-slate-500">72 Apartments</span>
                </div>

                <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-200">
                  <div className="flex items-center gap-2">
                    <div className="w-3.5 h-3.5 rounded bg-teal-500" />
                    <span className="text-slate-700">Level 5 Sky Garden</span>
                  </div>
                  <span className="font-mono text-slate-500">Green Terrace</span>
                </div>

                <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-200">
                  <div className="flex items-center gap-2">
                    <div className="w-3.5 h-3.5 rounded bg-emerald-500" />
                    <span className="text-slate-700">Basement Level (-1)</span>
                  </div>
                  <span className="font-mono text-slate-500">120 Slots / EV</span>
                </div>
              </div>
            </div>

            {/* Quick Specs Card */}
            <div className="glass-panel p-5 rounded-2xl border border-slate-200 space-y-3 text-xs">
              <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-yellow-400" />
                <span>Building Geometry (mm)</span>
              </h3>

              <div className="space-y-1.5 text-slate-600">
                <div className="flex justify-between">
                  <span className="text-slate-500">Total Height:</span>
                  <span className="font-mono font-bold text-cyan-400">35,600 mm</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Floor-to-Floor Height:</span>
                  <span className="font-mono text-slate-700">3,200 mm</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Podium Clearance:</span>
                  <span className="font-mono text-slate-700">4,200 mm</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Structural Grid:</span>
                  <span className="font-mono text-slate-700">8000 x 8000 mm</span>
                </div>
              </div>
            </div>

          </div>

        </div>
      )}

      {/* FLOOR EXPLORER TAB CONTENT */}
      {activeTab === 'floor-explorer' && (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          
          {/* Level Selector Sidebar (1 Column) */}
          <div className="glass-panel p-4 rounded-2xl border border-slate-200 space-y-2 max-h-[580px] overflow-y-auto">
            <h3 className="font-bold text-slate-500 text-xs px-2 mb-2 uppercase tracking-wider">
              Select Floor Level
            </h3>

            {FLOOR_EXPLORER_DATA.map(f => {
              const isSelected = selectedFloorLevel === f.level;
              return (
                <div
                  key={f.level}
                  onClick={() => setSelectedFloorLevel(f.level)}
                  className={`p-3 rounded-xl border text-xs cursor-pointer transition flex items-center justify-between ${
                    isSelected 
                      ? 'bg-gradient-to-r from-cyan-600 to-blue-600 border-cyan-400 text-white font-semibold shadow-md' 
                      : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <div className="space-y-0.5">
                    <span className="font-bold text-sm block">{f.name}</span>
                    <span className={`text-[10px] ${isSelected ? 'text-cyan-100' : 'text-slate-500'}`}>{f.type}</span>
                  </div>
                  <span className={`font-mono text-[10px] px-2 py-0.5 rounded ${isSelected ? 'bg-white/20 text-white' : 'bg-white text-slate-600 border border-slate-200'}`}>
                    {f.areaSqM} m²
                  </span>
                </div>
              );
            })}
          </div>

          {/* Architectural Floor Plan Card (3 Columns) */}
          <div className="lg:col-span-3 glass-panel p-6 rounded-2xl border border-slate-200 space-y-6">
            
            {/* Header info */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
              <div>
                <span className="font-mono text-xs text-cyan-400 font-bold px-2.5 py-1 rounded bg-cyan-50 border border-cyan-200">
                  REVIT LEVEL SPECIFICATION
                </span>
                <h2 className="text-2xl font-extrabold text-slate-900 mt-1">{selectedFloorObj.name}</h2>
                <p className="text-xs text-slate-500 mt-0.5">{selectedFloorObj.type}</p>
              </div>

              <div className="flex items-center gap-3 text-xs font-mono">
                <div className="p-2 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-[10px] text-slate-500 block">Height</span>
                  <span className="font-bold text-cyan-400">{selectedFloorObj.heightMm} mm</span>
                </div>
                <div className="p-2 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-[10px] text-slate-500 block">Floor Area</span>
                  <span className="font-bold text-emerald-400">{selectedFloorObj.areaSqM} sq.m</span>
                </div>
              </div>
            </div>

            {/* 2D Architectural Schematic Vector Viewport */}
            <div className="bg-slate-50 rounded-2xl border border-slate-200 p-6 relative min-h-[300px] flex flex-col items-center justify-center space-y-4">
              <div className="w-full max-w-xl border-2 border-cyan-500/40 rounded-xl p-4 bg-cyan-50/50 relative space-y-4">
                <div className="flex items-center justify-between border-b border-cyan-200/60 pb-2 text-xs font-mono text-cyan-400">
                  <span>GRID: A1 - D4 (8000mm x 8000mm)</span>
                  <span>CENTRAL COURTYARD ATRIUM</span>
                </div>

                <div className="grid grid-cols-3 gap-3 h-40">
                  <div className="border border-slate-200 bg-white rounded-lg p-2 flex flex-col justify-between text-[11px] text-slate-600 shadow-sm">
                    <span className="font-bold text-cyan-400">ZONE A (North)</span>
                    <span className="text-[10px] text-slate-500">Residential / Office Unit</span>
                    <span className="font-mono text-[9px] text-emerald-400">Daylight: 5.2%</span>
                  </div>

                  <div className="border-2 border-dashed border-teal-500/60 bg-teal-50 rounded-lg p-2 flex flex-col items-center justify-center text-center text-xs text-teal-700">
                    <Trees className="w-5 h-5 text-teal-400 mb-1" />
                    <span className="font-bold text-[11px]">Courtyard Vent Shaft</span>
                    <span className="text-[9px] text-teal-400">Natural Light Scoop</span>
                  </div>

                  <div className="border border-slate-200 bg-white rounded-lg p-2 flex flex-col justify-between text-[11px] text-slate-600 shadow-sm">
                    <span className="font-bold text-cyan-400">ZONE B (South)</span>
                    <span className="text-[10px] text-slate-500">Residential / Retail Unit</span>
                    <span className="font-mono text-[9px] text-emerald-400">Daylight: 4.8%</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-cyan-200 text-[10px] text-slate-500 font-mono">
                  <span>CORE: Elevator (3 Lifts) + Staircase 1 & 2</span>
                  <span>BALCONY RECESSED 1800mm</span>
                </div>
              </div>
            </div>

            {/* Description & Key Features */}
            <div className="space-y-3">
              <h3 className="font-bold text-slate-900 text-sm">Level Functional Overview</h3>
              <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-200">
                {selectedFloorObj.description}
              </p>

              <h4 className="font-bold text-slate-900 text-xs pt-2">Architectural Highlights</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {selectedFloorObj.features.map((feat, idx) => (
                  <div key={idx} className="flex items-center gap-2 p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-600">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>
      )}

    </div>
  );
}
