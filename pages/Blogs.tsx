
import React from 'react';

const Blogs: React.FC = () => {
  const blogs = [
    { title: "Why Real Estate is the best long-term asset", date: "Jan 12, 2024", cat: "Investment" },
    { title: "Top 10 Interior design trends for 2024", date: "Jan 08, 2024", cat: "Design" },
    { title: "Buying your first home: A checklist", date: "Dec 22, 2023", cat: "Guide" },
    { title: "Commercial property vs Residential", date: "Dec 15, 2023", cat: "Strategy" },
  ];

  return (
    <div className="bg-gray-50 pt-32 pb-20">
      <div className="px-[6%] max-w-7xl mx-auto">
        <div className="mb-20 text-center">
          <h1 className="playfair text-6xl font-black text-gray-900 mb-6">Our Perspective</h1>
          <p className="text-gray-500 max-w-xl mx-auto">Insights, news, and guides from the leaders in modern real estate.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {blogs.map((blog, i) => (
            <div key={i} className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-gray-100 flex flex-col">
              <div className="h-48 bg-gray-200 overflow-hidden">
                <img src={`https://picsum.photos/seed/${i+50}/500/300`} className="w-full h-full object-cover" />
              </div>
              <div className="p-8 flex-grow">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-[10px] font-bold uppercase bg-[#7A2318]/10 text-[#7A2318] px-3 py-1 rounded-full">{blog.cat}</span>
                  <span className="text-[10px] font-bold text-gray-400 uppercase">{blog.date}</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 leading-tight mb-6">{blog.title}</h3>
                <a href="#" className="text-[#7A2318] font-bold text-sm uppercase tracking-widest hover:underline">Read Story</a>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20 bg-[#7A2318] rounded-[50px] p-12 text-center text-white">
          <h2 className="text-3xl font-bold mb-6">Subscribe to our Newsletter</h2>
          <p className="text-white/70 mb-8 max-w-md mx-auto">Get the latest property insights and market trends delivered to your inbox.</p>
          <div className="flex flex-col md:flex-row gap-4 max-w-lg mx-auto">
            <input type="email" placeholder="Your Email Address" className="flex-grow px-6 py-4 rounded-2xl text-gray-900 outline-none" />
            <button className="bg-white text-[#7A2318] font-black px-10 py-4 rounded-2xl hover:bg-gray-100 transition-all">JOIN NOW</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blogs;
