
export interface Project {
  id: string;
  title: string;
  location: string;
  type: string;
  price: string;
  beds: number;
  baths: number;
  sqft: string;
  description: string;
  mainImage: string;
  gallery: string[];
  features: string[];
}

export const PROJECTS: Project[] = [
  {
    id: "onyx-villa",
    title: "The Onyx Villa",
    location: "Dubai, UAE",
    type: "Residential",
    price: "$12,500,000",
    beds: 6,
    baths: 8,
    sqft: "14,500",
    description: "Nestled in the heart of Emirates Hills, The Onyx Villa is a masterclass in brutalist luxury. Featuring floor-to-ceiling smart glass and a private helipad, this residence redefines the Dubai skyline's living standards.",
    mainImage: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1600",
    gallery: [
      "https://images.unsplash.com/photo-1600607687940-477a4a4b0b73?q=80&w=1200",
      "https://images.unsplash.com/photo-1600566753190-17f0bb2a6c3e?q=80&w=1200",
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1200"
    ],
    features: ["Private Cinema", "Infinity Pool", "Wine Cellar", "Smart Home OS"]
  },
  {
    id: "emerald-heights",
    title: "Emerald Heights",
    location: "Mumbai, India",
    type: "Residential",
    price: "$8,200,000",
    beds: 4,
    baths: 5,
    sqft: "8,000",
    description: "A vertical garden oasis in the bustling heart of Mumbai. Emerald Heights combines sustainable architecture with uncompromising luxury, offering panoramic views of the Arabian Sea.",
    mainImage: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1600",
    gallery: [
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=1200",
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?q=80&w=1200"
    ],
    features: ["Oxygen Filtration", "Zen Garden", "Private Elevator", "Ayurvedic Spa"]
  },
  {
    id: "azure-plaza",
    title: "Azure Plaza",
    location: "Paris, France",
    type: "Commercial",
    price: "$45,000,000",
    beds: 0,
    baths: 12,
    sqft: "45,000",
    description: "Located on the Avenue des Champs-Élysées, Azure Plaza is the pinnacle of Parisian commercial real estate. Historical facade meets high-tech interior infrastructure.",
    mainImage: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1600",
    gallery: [
      "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1200",
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2?q=80&w=1200"
    ],
    features: ["Vibrant Lobby", "Secure Server Room", "Executive Rooftop", "Underground Parking"]
  },
  {
    id: "the-glass-house",
    title: "The Glass House",
    location: "London, UK",
    type: "Residential",
    price: "$18,000,000",
    beds: 5,
    baths: 6,
    sqft: "11,200",
    description: "An architectural marvel in Hampstead. Designed to disappear into the surrounding woodland, this home utilizes advanced structural glazing to offer an immersive nature experience.",
    mainImage: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?q=80&w=1600",
    gallery: [
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=1200",
      "https://images.unsplash.com/photo-1613977257363-707ba9348227?q=80&w=1200"
    ],
    features: ["Heated Glass", "Invisible Sound System", "Geothermal Heating", "Art Gallery Hall"]
  }
];
