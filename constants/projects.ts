
export interface Project {
  id: string;
  title: string;
  location: string;
  type: string;
  price: string;
  beds?: number;
  baths?: number;
  sqft: string;
  description: string;
  mainImage: string;
  mainVideo?: string; // Optional field for video thumbnails or hero backgrounds
  gallery: string[];
  features: string[];
}

export const PROJECTS: Project[] = [
  {
    id: "vanbagh-farm",
    title: "Vanbagh Farm",
    location: "Alwar, Rajasthan",
    type: "Farmhouse Estate",
    price: "Price Upon Request",
    sqft: "12,000 - 45,000",
    description: "An elite gated community featuring 27 exclusive farmhouse plots nestled in a lush green valley. The estate is secured by a grand stone-masonry entrance and features 40ft wide internal roads. Each plot is meticulously planned to offer panoramic views of the surrounding hills, making it the premier choice for luxury agricultural living.",
    // Points to public/images/vanbagh-main.jpg
    mainImage: "/images/VANBAGHFARMIMAGE.jpeg",
    mainVideo: "https://thirdeyesecurity.ca/wp-content/uploads/2026/01/vanbagh1-1.mp4",
    gallery: [
      "/images/vanbagh1.jpeg",
      "/images/VANBAGHFARMLAYOUT.jpeg",
    
    ],
    features: ["27 Exclusive Plots", "Grand Stone Entrance", "Gated Security", "40ft Wide Roads", "Aravalli Hill Views"]
  },
  {
    id: "laxmi-vatika",
    title: "Laxmi Vatika",
    location: "Village Jatiyana, Alwar",
    type: "Planned Township",
    price: "Premium Allocation",
    sqft: "2,500 - 15,000",
    description: "A master-planned township strategically located in Village Jatiyana. Laxmi Vatika features a high-visibility commercial sector integrated with residential plots. The layout is served by 40ft wide main roads and 30ft wide internal boulevards, ensuring smooth traffic flow and high property appreciation near the Behor-Alwar corridor.",
    // Points to public/images/laxmi-main.jpg
    mainImage: "/images/LAXMIVATIKAlayout.jpg",
    gallery: [
      "/images/LAXMIVATIKAlayout.jpg",
      "/images/LAXMIVATIKAlayout.jpg"
    ],
    features: ["Commercial Shop Fronts", "40ft Main Boulevards", "Direct Highway Access", "Planned Residential Grid", "Street Lighting & Drainage"]
  },
  {
    id: "vigyan-vatika",
    title: "Vigyan Vatika",
    location: "Village Tulera, Alwar",
    type: "Planned Township",
    price: "Premium Allocation",
    sqft: "3,000 - 18,000",
    description: "Located on the 100ft wide Alwar-Bhiwadi Road near Vigyan Nagar, Vigyan Vatika is a premium residential development. This project offers a self-contained ecosystem including dedicated areas for a school, facility zones, and a power sub-station. It is designed for families seeking modern infrastructure in a high-growth zone.",
    // Points to public/images/vigyan-main.jpg
    mainImage: "/images/VIGYANVATIKAlayout.jpg",
    gallery: [
      "/images/VIGYANVATIKAlayout.jpg",
      "/images/VIGYANVATIKAlayout.jpg"
    ],
    features: ["100ft Road Connectivity", "Primary School Zone", "Utility Sub-station Area", "Vigyan Nagar Proximity", "Landscaped Park Areas"]
  }
];
