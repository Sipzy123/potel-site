export interface Product {
  id: number;
  name: string;
  category: string;
  subcategory: string;
  description: string;
  price: string;
  image: string;
  specs: string; // JSON string
  is_featured: number;
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
  {
    name: "Tilt Sensors",
    subcategories: ["Single Axis Tilt Sensor", "Dual Axis Tilt Sensor", "Digital Tilt Switch"],
  },
  {
    name: "Speed Sensors",
    subcategories: ["Gear Tooth Speed Sensors SO", "Gear Tooth Speed And Direction Sensors DO"],
  },
  {
    name: "Potentiometers",
    subcategories: ["Precision Wirewound", "Conductive Plastic", "Hybrid Technology"],
  },
  {
    name: "Electronic Cards",
    subcategories: ["Signal Conditioning", "Amplifier Cards", "Interface Modules"],
  },
  {
    name: "Mounting Accessories",
    subcategories: ["Couplings", "Brackets", "Connectors"],
  },
  {
    name: "Rotary Switch",
    subcategories: ["Precision Rotary Switch", "Coded Switch"],
  },
  {
    name: "Slide Wire Resistive Element",
    subcategories: ["Custom Resistive Tracks", "Linear Elements"],
  },
  {
    name: "Signal Converters",
    subcategories: ["Analog to Digital", "Voltage to Current", "Frequency to Voltage"],
  },
];
