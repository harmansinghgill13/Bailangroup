
import React from 'react';

const Services: React.FC = () => {
  const servicesList = [
    { title: "Property Appraisal", desc: "Accurate market valuations for your assets.", img: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=800" },
    { title: "Investment Strategy", desc: "Expert advice on high-yield real estate portfolios.", img: "https://images.pexels.com/photos/35501871/pexels-photo-35501871.jpeg" },
    { title: "Global Sales", desc: "Seamless cross-border property transactions.", img: "https://images.unsplash.com/photo-1582408921715-18e7806365c1?q=80&w=800" },
    { title: "Luxury Rentals", desc: "Find short-term and long-term premium stays.", img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800" },
    { title: "Interior Consulting", desc: "Transform your space with elite designers.", img: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=800" },
    { title: "Legal Assistance", desc: "Complete documentation and legal support.", img: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=800" },
  ];

  return (
    <div className="bg-white pt-32 pb-20">
      <div className="px-[6%] mb-20 text-center">
        <span className="text-[#7A2318] font-bold uppercase tracking-widest mb-4 block">Our Expertise</span>
        <h1 className="playfair text-6xl font-black text-gray-900 mb-8">What We Offer</h1>
        <p className="text-gray-500 max-w-2xl mx-auto text-lg">
          We provide a comprehensive suite of real estate services designed to meet the demands of modern property owners and investors.
        </p>
      </div>

      <div className="px-[6%] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {servicesList.map((service, i) => (
          <div key={i} className="group relative rounded-[30px] overflow-hidden shadow-lg hover:shadow-2xl transition-all h-[400px]">
            <img src={service.img} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-8">
              <h3 className="text-white text-2xl font-bold mb-2">{service.title}</h3>
              <p className="text-white/70 text-sm mb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {service.desc}
              </p>
              <button className="bg-[#7A2318] text-white w-fit px-6 py-2 rounded-lg font-bold text-sm transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all">
                Learn More
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;
