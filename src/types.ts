// ─── Electrical variant (sidebar sub-tab in Electrical Specs) ─────────────────
// Each variant = one sidebar item (e.g. "Electrical Analog O/P")
// It has optional diagram images and a spec table (parameter + result rows)
export interface ElectricalVariant {
  name: string;                                  // sidebar label
  diagram_images?: string[];                     // uploaded diagram/graph images
  specs?: { parameter: string; result: string }[]; // spec table rows
  notes?: string;                                // optional free-text note
}

export interface Product {
  id: number;
  name: string;
  category: string;
  subcategory: string;
  brief_description?: string;
  description: string;
  price: string;
  image: string;
  images?: string[];
  specs: string;               // JSON string – quick-spec boxes on card
  is_featured: number;
  variants?: string[];
  benefits?: string[];
  mounting_info?: string[];
  magnetic_cross_talk?: string;

  // ── Electrical tab ─────────────────────────────────────────────────────────
  // electrical_variants: sidebar sub-tabs with diagrams + table each
  electrical_variants?: ElectricalVariant[];
  // Legacy flat electrical (kept for backwards compat, shown when no variants)
  electrical?: { parameter: string; result: string }[];
  electrical_options?: { option: string; description: string }[];

  // ── Mechanical tab ─────────────────────────────────────────────────────────
  mechanical?: {
    parameters: string[];
    ball_bearing: string[];
    sleeve_bushing: string[];
  };
  material?: { component: string; material: string }[];
  environment?: { parameter: string; value: string }[];

  // ── Ordering tab ───────────────────────────────────────────────────────────
  ordering_info?: string;

  // ── Downloads tab ──────────────────────────────────────────────────────────
  downloads?: { name: string; type: string; size: string; url?: string }[];
}

export interface Category {
  name: string;
  subcategories: string[];
}

export const CATEGORIES: Category[] = [
  {
    name: "Rotary Angles Sensors (Encoders)",
    subcategories: ["Rotary Miniature Angle Sensor", "Rotary Servo Non Contact Sensor", "Rotary Multiturn Contactless Sensor", "Rotary Rugged Sensor Encoder", "Touchless Miniature Kit Version", "Touchless Flat Servo Sensor"],
  },
  {
    name: "Linear Sensors (Transducers)",
    subcategories: ["Linear Miniature Sensor (10X10mm)", "Linear Miniature Sensor (10mm)", "Linear Hall Position Sensor", "Linear Displacement Transducer (18X18mm)", "Draw Wire Linear Displacement Transducer", "Draw Wire Encoder"],
  },
  { name: "Tilt Sensors",           subcategories: ["Single Axis Tilt Sensor", "Dual Axis Tilt Sensor", "Digital Tilt Switch"] },
  { name: "Speed Sensors",          subcategories: ["Gear Tooth Speed Sensors SO", "Gear Tooth Speed And Direction Sensors DO"] },
  { name: "Potentiometers",         subcategories: ["Precision Wirewound", "Conductive Plastic", "Hybrid Technology"] },
  { name: "Electronic Cards",       subcategories: ["Signal Conditioning", "Amplifier Cards", "Interface Modules"] },
  { name: "Mounting Accessories",   subcategories: ["Couplings", "Brackets", "Connectors"] },
  { name: "Rotary Switch",          subcategories: ["Precision Rotary Switch", "Coded Switch"] },
  { name: "Slide Wire Resistive Element", subcategories: ["Custom Resistive Tracks", "Linear Elements"] },
  { name: "Signal Converters",      subcategories: ["Analog to Digital", "Voltage to Current", "Frequency to Voltage"] },
];
