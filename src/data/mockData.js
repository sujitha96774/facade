// Comprehensive mock dataset for Autodesk PS 26116 Urban Mixed-Use Design Challenge (B+G+9)

export const PROJECT_METRICS = {
  id: "PS-26116",
  title: "Urban Mixed-Use Design Challenge",
  organization: "Autodesk Education Experience",
  totalFloors: "B + G + 9 (11 Levels Total)",
  plotAreaMm: "40000 x 80000 mm (3,200 sq.m)",
  totalBuiltUpAreaSqM: 28400,
  commercialAreaSqM: 5600,
  residentialAreaSqM: 18400,
  basementParkingAreaSqM: 4200,
  courtyardAreaSqM: 800,
  greenCoverageRatio: "42.5%",
  totalEvChargingStalls: 40,
  totalParkingSlots: 200,
  residentialUnitsCount: 72,
  commercialShopsCount: 16,
  officesCount: 8,
  structuralGridsMm: "8000 x 8000 mm",
  concreteGrade: "M30 (Slabs) / M40 (Columns)",
  steelGrade: "Fe500D TMT Rebar",
  solarPvCapacityKw: 180,
  sustainabilityRating: "GBCI LEED Platinum (Projected)"
};

export const SPACE_DIRECTORY = [
  // Shops (Ground & 1st Floor Commercial)
  {
    id: "SHOP-G01",
    name: "Autodesk Design Experience Hub & Cafe",
    category: "Shop",
    type: "Retail & Bistro",
    floor: "Ground Floor",
    floorNumber: 0,
    areaSqM: 240,
    dimensionsMm: "12000 x 20000 mm",
    status: "Occupied",
    tenant: "Urban Brew & Tech Cafe",
    daylightFactor: "4.8% (Excellent)",
    evAccess: "Direct via Elevators 1 & 2"
  },
  {
    id: "SHOP-G02",
    name: "Eco-Boutique Organic Supermarket",
    category: "Shop",
    type: "Anchor Retail",
    floor: "Ground Floor",
    floorNumber: 0,
    areaSqM: 380,
    dimensionsMm: "19000 x 20000 mm",
    status: "Occupied",
    tenant: "Green Harvest Co.",
    daylightFactor: "4.2%",
    evAccess: "Direct via Ramp & Elevator 1"
  },
  {
    id: "SHOP-101",
    name: "Smart Electronics & IoT Experience Store",
    category: "Shop",
    type: "Commercial Retail",
    floor: "1st Floor",
    floorNumber: 1,
    areaSqM: 180,
    dimensionsMm: "12000 x 15000 mm",
    status: "Available",
    tenant: "Vacant (Leasing Open)",
    daylightFactor: "5.1%",
    evAccess: "Elevator 2 & Escalator"
  },
  {
    id: "SHOP-102",
    name: "Urban Health & Pharmacy Center",
    category: "Shop",
    type: "Essential Services",
    floor: "1st Floor",
    floorNumber: 1,
    areaSqM: 140,
    dimensionsMm: "10000 x 14000 mm",
    status: "Occupied",
    tenant: "Apex Wellness",
    daylightFactor: "4.5%",
    evAccess: "Elevator 1"
  },

  // Offices (1st Floor)
  {
    id: "OFF-101",
    name: "Autodesk Innovation Co-Working Space",
    category: "Office",
    type: "Co-Working Hub",
    floor: "1st Floor",
    floorNumber: 1,
    areaSqM: 450,
    dimensionsMm: "18000 x 25000 mm",
    status: "Occupied",
    tenant: "BIM Studio & Incubator",
    daylightFactor: "5.4%",
    evAccess: "Elevators 1 & 3"
  },
  {
    id: "OFF-102",
    name: "Urban Dynamics Architecture Suite",
    category: "Office",
    type: "Corporate Office",
    floor: "1st Floor",
    floorNumber: 1,
    areaSqM: 280,
    dimensionsMm: "14000 x 20000 mm",
    status: "Occupied",
    tenant: "Matrix Design Group",
    daylightFactor: "4.9%",
    evAccess: "Elevator 3"
  },

  // Rooms / Residential Units (2nd to 9th Floor)
  {
    id: "RES-201",
    name: "Courtyard View 2BHK Luxury Suite",
    category: "Room",
    type: "2BHK Residential",
    floor: "2nd Floor",
    floorNumber: 2,
    areaSqM: 110,
    dimensionsMm: "10000 x 11000 mm",
    status: "Occupied",
    tenant: "Private Owner",
    daylightFactor: "4.9%",
    evAccess: "Elevators 1, 2, 3"
  },
  {
    id: "RES-304",
    name: "Sky Garden 3BHK Duplex Unit",
    category: "Room",
    type: "3BHK Premium",
    floor: "3rd Floor",
    floorNumber: 3,
    areaSqM: 165,
    dimensionsMm: "15000 x 11000 mm",
    status: "Available",
    tenant: "For Sale",
    daylightFactor: "5.8%",
    evAccess: "Elevators 1, 2, 3"
  },
  {
    id: "RES-502",
    name: "Climate-Responsive Balcony 2BHK",
    category: "Room",
    type: "2BHK Residential",
    floor: "5th Floor",
    floorNumber: 5,
    areaSqM: 115,
    dimensionsMm: "10000 x 11500 mm",
    status: "Occupied",
    tenant: "Resident - Apt 502",
    daylightFactor: "5.2%",
    evAccess: "Elevator 2"
  },
  {
    id: "RES-901",
    name: "Penthouse Sky Terrace Residence",
    category: "Room",
    type: "4BHK Penthouse",
    floor: "9th Floor",
    floorNumber: 9,
    areaSqM: 240,
    dimensionsMm: "16000 x 15000 mm",
    status: "Reserved",
    tenant: "Executive Suite",
    daylightFactor: "6.2%",
    evAccess: "Private Elevator Access"
  },

  // Facilities
  {
    id: "FAC-B01",
    name: "Basement EV Smart Charging Hub (40 Fast Chargers)",
    category: "Facility",
    type: "EV Charging Infrastructure",
    floor: "Basement -1",
    floorNumber: -1,
    areaSqM: 1200,
    dimensionsMm: "30000 x 40000 mm",
    status: "Active",
    tenant: "Building Facility Mgmt",
    daylightFactor: "N/A (Artificial LED 500 Lux)",
    evAccess: "Direct Parking Level -1"
  },
  {
    id: "FAC-G01",
    name: "Central Landscape Biophilic Courtyard",
    category: "Facility",
    type: "Biophilic Atrium & Park",
    floor: "Ground Floor",
    floorNumber: 0,
    areaSqM: 800,
    dimensionsMm: "20000 x 40000 mm",
    status: "Active",
    tenant: "Public & Resident Access",
    daylightFactor: "6.5% (Open Atrium)",
    evAccess: "Ground Promenade"
  },
  {
    id: "FAC-501",
    name: "Mid-Rise Sky Terrace & Resident Lounge",
    category: "Facility",
    type: "Green Amenity Terrace",
    floor: "5th Floor",
    floorNumber: 5,
    areaSqM: 320,
    dimensionsMm: "16000 x 20000 mm",
    status: "Active",
    tenant: "Resident Amenity",
    daylightFactor: "6.0%",
    evAccess: "Elevators 1 & 2"
  },
  {
    id: "FAC-901",
    name: "Rooftop Solar PV Farm & Rainwater Harvesting Unit",
    category: "Facility",
    type: "Green Energy System",
    floor: "Roof (Level 10)",
    floorNumber: 10,
    areaSqM: 1200,
    dimensionsMm: "30000 x 40000 mm",
    status: "Active",
    tenant: "Building Energy Mgmt",
    daylightFactor: "100%",
    evAccess: "Stairwell 2 & Service Lift"
  }
];

export const FLOOR_EXPLORER_DATA = [
  {
    level: -1,
    name: "Basement Level (-1)",
    type: "Car Parking & EV Fast Charging Station",
    heightMm: 3500,
    areaSqM: 4200,
    description: "200 Car Parking Slots (40 DC Fast EV Chargers + 160 Standard Stalls), Fire Pump Room, HVAC Chiller Plant, Electrical Substation.",
    features: ["40x 150kW DC Fast Chargers", "Automatic License Plate Recognition", "CO Sensor Ventilation Boost", "Sprinkler Fire Suppression"]
  },
  {
    level: 0,
    name: "Ground Floor (Level 0)",
    type: "Commercial Podium & Central Courtyard Entrance",
    heightMm: 4200,
    areaSqM: 3200,
    description: "Active retail facade, organic supermarket, cafe bistro, double-height main residential lobbies, biophilic landscape courtyard entrance.",
    features: ["800 sq.m Open Air Atrium", "Double Height Glazed Lobbies", "Kinetic Shading Entry Canopy", "Permeable Paver Plaza"]
  },
  {
    level: 1,
    name: "1st Floor (Level 1)",
    type: "Commercial Podium & Co-Working Hub",
    heightMm: 3800,
    areaSqM: 3200,
    description: "Co-working spaces, boutique offices, pharmacy, retail mezzanine overlook, outdoor garden dining terrace.",
    features: ["Continuous Outdoor Balcony Walkway", "High Performance Low-E Glazing", "Flexible Open Office Modules", "Direct Courtyard Visuals"]
  },
  {
    level: 2,
    name: "2nd Floor (Level 2)",
    type: "Residential Units (2BHK / 3BHK)",
    heightMm: 3200,
    areaSqM: 2400,
    description: "9 Residential Apartments with staggered green balconies, cross-ventilation shafts, and noise-attenuating double facade.",
    features: ["Bi-directional Natural Ventilation", "Recessed Balcony Planters", "Acoustic Double Glazing", "Courtyard Overlook"]
  },
  {
    level: 3,
    name: "3rd Floor (Level 3)",
    type: "Residential Units (2BHK / 3BHK)",
    heightMm: 3200,
    areaSqM: 2400,
    description: "9 Residential Apartments with operable motorized shading louvers and integrated drip-irrigated planter boxes.",
    features: ["Parametric Solar Louvers", "Drip Irrigated Vertical Greens", "Smart Home Energy Meters", "Private Foyers"]
  },
  {
    level: 4,
    name: "4th Floor (Level 4)",
    type: "Residential Units (2BHK / 3BHK)",
    heightMm: 3200,
    areaSqM: 2400,
    description: "9 Residential Apartments configured for optimal morning sun capture and afternoon heat gain reduction.",
    features: ["Low SHGC Solar Glass", "Cross-Ventilated Bedrooms", "Rainwater Greywater Dual Plumbing", "LED Cove Lighting"]
  },
  {
    level: 5,
    name: "5th Floor (Level 5)",
    type: "Mid-Rise Sky Garden & Residential Level",
    heightMm: 3600,
    areaSqM: 2400,
    description: "Community sky terrace garden (320 sq.m), fitness pavilion, and 6 premium residential suites with panoramic city views.",
    features: ["Public Resident Sky Garden", "Native Drought-Tolerant Plants", "Solar Bench Charging Stations", "Yoga & Wellness Deck"]
  },
  {
    level: 6,
    name: "6th Floor (Level 6)",
    type: "Residential Units (2BHK / 3BHK)",
    heightMm: 3200,
    areaSqM: 2400,
    description: "9 Residential Apartments featuring deep overhang sun shades and soundproof acoustic flooring assemblies.",
    features: ["Deep Cantilevered Balconies", "Floor-to-Ceiling Glazing (High SHGC Control)", "Smart Thermostat Hubs", "Storage Lockers"]
  },
  {
    level: 7,
    name: "7th Floor (Level 7)",
    type: "Residential Units (2BHK / 3BHK)",
    heightMm: 3200,
    areaSqM: 2400,
    description: "9 Residential Apartments with unobstructed breeze corridors connected to central air shafts.",
    features: ["Air Velocity Enhancement Shafts", "Zero-VOC Interior Finishes", "Water Sense Sanitary Fittings", "Energy Star Appliances"]
  },
  {
    level: 8,
    name: "8th Floor (Level 8)",
    type: "Residential Units (2BHK / 3BHK)",
    heightMm: 3200,
    areaSqM: 2400,
    description: "9 Residential Apartments featuring high-elevation privacy fins and solar louver integration.",
    features: ["High Elevation Wind Baffling", "Privacy Vertical Fin Array", "Double Height Balcony Terraces", "Heat Recovery HVAC"]
  },
  {
    level: 9,
    name: "9th Floor (Level 9)",
    type: "Luxury Penthouses & Duplex Residences",
    heightMm: 3600,
    areaSqM: 2400,
    description: "6 Luxury Penthouses with private rooftop gardens, skylights, and premium automated curtain wall systems.",
    features: ["Private Roof Solarium", "Custom Kinetic Louver Controls", "Integrated Solar Skylights", "Panoramic City & Park Views"]
  }
];

// Generate 200 parking grid items (40 EV Fast Chargers + 160 Standard Parking)
export const EV_PARKING_GRID = Array.from({ length: 200 }, (_, i) => {
  const isEv = i < 40;
  const isOccupied = (i * 7 + 3) % 10 < 6;
  const isCharging = isEv && isOccupied && (i % 2 === 0);
  return {
    slotId: `B1-${(i + 1).toString().padStart(3, '0')}`,
    type: isEv ? "EV Fast Charger (150kW)" : "Standard Parking",
    isEv,
    status: isCharging ? "Charging" : isOccupied ? "Occupied" : "Available",
    batteryPct: isCharging ? Math.floor(40 + (i * 13) % 55) : null,
    kwDrawn: isCharging ? 120 + (i % 30) : 0,
    timeRemainingMins: isCharging ? Math.floor(15 + (i * 9) % 35) : null,
    vehicleType: isOccupied ? (isEv ? "Tesla Model Y / Hyundai Ioniq 5" : "Sedan / SUV") : "N/A"
  };
});

export const STRUCTURAL_SPECS = {
  foundation: {
    type: "Raft Foundation with Bored Cast-in-Situ Piles",
    depthMm: 4500,
    pileDiameterMm: 800,
    concreteGrade: "M40 High Strength Self-Compacting Concrete",
    rebarGrade: "Fe500D TMT Bars"
  },
  columns: [
    { grid: "C1-C12", dimensionsMm: "750 x 750 mm", location: "Basement to Level 2 (Podium)", concrete: "M40", rebar: "20 Nos. 25mm dia Fe500D main bars + 10mm ties @ 150mm c/c" },
    { grid: "C13-C24", dimensionsMm: "600 x 600 mm", location: "Level 3 to Level 9 (Residential)", concrete: "M35", rebar: "16 Nos. 20mm dia Fe500D main bars + 10mm ties @ 150mm c/c" }
  ],
  beams: [
    { type: "Primary Transfer Beams (TB-01)", dimensionsMm: "600 x 900 mm", spanMm: 8000, concrete: "M40", rebar: "Top: 6-25mm, Bottom: 8-25mm Fe500D, 12mm 4-legged stirrups @ 100mm c/c" },
    { type: "Standard Floor Beams (FB-02)", dimensionsMm: "300 x 600 mm", spanMm: 8000, concrete: "M30", rebar: "Top: 4-20mm, Bottom: 4-20mm Fe500D, 8mm 2-legged stirrups @ 150mm c/c" }
  ],
  slabs: {
    type: "Two-Way Post-Tensioned Flat Slabs with Drop Panels",
    thicknessMm: 220,
    dropPanelMm: "3000 x 3000 x 100 mm drop",
    rebarMesh: "Top & Bottom T12 @ 150mm c/c both ways",
    concrete: "M30 Grade"
  },
  shearCore: {
    thicknessMm: 350,
    location: "Central Elevator & Staircase Core",
    concrete: "M40 Grade",
    rebar: "T16 @ 120mm c/c double curtain reinforcement"
  }
};

export const FORMA_CLIMATE_DATA = {
  sunPath: {
    summerSolsticeRadiationKwh: 6.8, // kWh/m²/day
    winterSolsticeRadiationKwh: 4.2,
    annualAverageRadiationKwh: 5.5,
    optimalFacadeOrientation: "North-South Primary, East-West Louvered",
    shadingEffectivenessPct: 38.5
  },
  windConditions: {
    prevailingWindSummer: "South-West (4.2 m/s)",
    prevailingWindWinter: "North-East (2.8 m/s)",
    courtyardVentilationEfficiency: "82% natural air draft boost",
    pedestrianWindComfortIndex: "Class A (Comfortable for sitting & walking)"
  },
  microclimate: {
    urbanHeatIslandReduction: "3.4 °C local temperature drop via biophilic courtyard",
    daylightAutonomyPct: "78% spaces receive >300 lux for 8+ hours/day",
    glareProbabilityIndex: "Reduced by 64% with kinetic louvers"
  }
};

export const ALERTS_DATA = [
  {
    id: "ALT-101",
    timestamp: "2026-09-23 14:32",
    severity: "Critical",
    category: "EV Power Grid",
    title: "High Power Load Warning at Basement -1 Charger B1-012",
    message: "150kW DC Charger drawing 148.5kW continuous. Thermal throttling initiated automatically.",
    status: "Active",
    location: "Basement -1 Stall 12"
  },
  {
    id: "ALT-102",
    timestamp: "2026-09-23 13:15",
    severity: "Warning",
    category: "Facade Automation",
    title: "West Facade Louver Blocked at Level 4 Zone B",
    message: "Obstruction sensor detected minor alignment deviation on louver panel #4B-03. Manual override available.",
    status: "Active",
    location: "Level 4 West Facade"
  },
  {
    id: "ALT-103",
    timestamp: "2026-09-23 11:45",
    severity: "Info",
    category: "Courtyard Irrigation",
    title: "Automated Drip Irrigation Cycle Completed",
    message: "Central Courtyard and vertical wall planters received 450L greywater irrigation cycle.",
    status: "Resolved",
    location: "Ground Courtyard Atrium"
  },
  {
    id: "ALT-104",
    timestamp: "2026-09-23 09:20",
    severity: "Info",
    category: "Solar PV Generation",
    title: "Peak Solar Generation Reached",
    message: "Rooftop PV array generating 178kW clean solar power (98.8% maximum capacity).",
    status: "Resolved",
    location: "Rooftop PV Array"
  }
];
