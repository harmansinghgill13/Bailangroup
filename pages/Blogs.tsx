import React, { useState } from 'react';
import { inquiryService } from '../services/inquiryService';

const Blogs: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const blogs = [
    { title: "Why Real Estate is the best long-term asset", date: "Jan 12, 2024", cat: "Investment" },
    { title: "Top 10 Interior design trends for 2024", date: "Jan 08, 2024", cat: "Design" },
    { title: "Buying your first home: A checklist", date: "Dec 22, 2023", cat: "Guide" },
    { title: "Commercial property vs Residential", date: "Dec 15, 2023", cat: "Strategy" },
  ];

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsSubmitting(true);
    try {
      await inquiryService.saveInquiry({
        firstName: "New Subscriber",
        lastName: `(${email})`,
        email: email,
        type: 'Newsletter',
        message: `New subscription request from the Blogs page newsletter widget.`
      });
      setIsSuccess(true);
      setEmail('');
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

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

        <div className="mt-20 bg-[#7A2318] rounded-[50px] p-12 text-center text-white relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
            <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
              <path d="M0 0 L100 100 M100 0 L0 100" stroke="white" strokeWidth="0.5" />
            </svg>
          </div>

          {isSuccess ? (
            <div className="animate-reveal">
              <h2 className="text-3xl font-bold mb-4">Subscription Active.</h2>
              <p className="text-white/70 mb-8 max-w-md mx-auto">Welcome to the inner circle. Your intelligence briefing will arrive shortly.</p>
              <button onClick={() => setIsSuccess(false)} className="text-[10px] font-black uppercase tracking-widest bg-white text-[#7A2318] px-8 py-3 rounded-xl">Add Another</button>
            </div>
          ) : (
            <>
              <h2 className="text-3xl font-bold mb-6">Subscribe to our Newsletter</h2>
              <p className="text-white/70 mb-8 max-w-md mx-auto">Get the latest property insights and market trends delivered to your inbox.</p>
              <form onSubmit={handleSubscribe} className="flex flex-col md:flex-row gap-4 max-w-lg mx-auto relative z-10">
                <input 
                  required
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your Email Address" 
                  className="flex-grow px-6 py-4 rounded-2xl text-gray-900 outline-none" 
                />
                <button 
                  disabled={isSubmitting}
                  className="bg-white text-[#7A2318] font-black px-10 py-4 rounded-2xl hover:bg-gray-100 transition-all flex items-center justify-center gap-2"
                >
                  {isSubmitting ? "SYNCING..." : "JOIN NOW"}
                </button>
              </form>
              <p className="mt-6 text-[8px] font-black uppercase tracking-[0.3em] opacity-30">Encrypted Submission • Direct to Vault</p>
            </>
          )}
        </div>
      </div>
      <style>{`
        @keyframes reveal {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-reveal {
          animation: reveal 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>
    </div>
  );
};

export default Blogs;