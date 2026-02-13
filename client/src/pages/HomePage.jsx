import { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { Link } from 'react-router-dom';
import { ArrowRight, Shield, Zap, Globe } from 'lucide-react';
import toast from 'react-hot-toast';

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get('https://akruti-3d-store.onrender.com/api/products');
        setProducts(res.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="w-full overflow-hidden bg-white">
      
      {/* --- HERO SECTION WITH VIDEO BACKGROUND --- */}
      <div className="relative h-[80vh] w-full overflow-hidden flex items-center justify-center">
        {/* Video Background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-t from-[#0f0c29] via-[#0f0c29]/60 to-transparent z-10"></div>
          {/* Note: You can replace this URL with any 3D printing video you like */}
         <video 
  autoPlay 
  loop 
  muted 
  className="w-full h-full object-cover"
  /* OPTION 1: Abstract 3D Shapes (Very clean & modern) */
  src="https://videos.pexels.com/video-files/3129671/3129671-uhd_2560_1440_30fps.mp4"
  
  /* OPTION 2: If you prefer a tech/printing vibe, use this: */
  /* src="https://videos.pexels.com/video-files/3859065/3859065-uhd_2560_1440_25fps.mp4" */
/>
        </div>

        {/* HERO SECTION */}
      <section className="pt-32 pb-20 px-6 max-w-7xl mx-auto text-center relative overflow-hidden">
        
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-1.5 rounded-full text-sm font-semibold mb-8 animate-fade-up">
          <span className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></span>
          New 3D Collection Live
        </div>

        {/* Headline */}
        <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 tracking-tight mb-6 leading-[1.1] animate-fade-up" style={{animationDelay: "0.1s"}}>
          Next Gen <span className="text-blue-600">3D Printing</span> <br />
          For Modern Creators.
        </h1>

        {/* Subtext */}
        <p className="text-lg text-slate-500 max-w-2xl mx-auto mb-10 animate-fade-up" style={{animationDelay: "0.2s"}}>
          Secure, durable, and custom-designed 3D products. 
          Experience the future of manufacturing with Akruti.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-up" style={{animationDelay: "0.3s"}}>
          <Link to="/shop" className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-full transition-all shadow-xl shadow-blue-500/30 flex items-center gap-2">
            Start Shopping <ArrowRight size={18} />
          </Link>
          <Link to="/about" className="px-8 py-4 bg-white border border-slate-200 text-slate-700 font-bold rounded-full hover:bg-slate-50 transition-all">
            Learn More
          </Link>
        </div>

        {/* Abstract Background Blur */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-100/50 rounded-full blur-3xl -z-10 opacity-50"></div>
      </section>

      {/* FEATURES GRID */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-8">
          {[
            { icon: <Shield className="text-blue-600" size={32} />, title: "Secure & Durable", desc: "Built with premium materials." },
            { icon: <Zap className="text-blue-600" size={32} />, title: "Fast Production", desc: "From design to shipping in 24h." },
            { icon: <Globe className="text-blue-600" size={32} />, title: "Eco-Friendly", desc: "Sustainable PLA materials." }
          ].map((item, i) => (
            <div key={i} className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-all">
              <div className="mb-4 bg-blue-50 w-14 h-14 rounded-xl flex items-center justify-center">{item.icon}</div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">{item.title}</h3>
              <p className="text-slate-500">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* --- FEATURED PRODUCTS --- */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl font-bold mb-2 flex items-center gap-2">
              <Star className="text-yellow-500 fill-yellow-500" /> Trending Now
            </h2>
            <p className="text-gray-400">Our most popular 3D printed collections</p>
          </div>
          <Link to="/shop" className="hidden md:flex items-center gap-2 text-pink-500 font-bold hover:gap-4 transition-all">
            View All <ArrowRight size={20} />
          </Link>
        </div>

        {loading ? (
          <div className="text-center py-20 text-gray-500 animate-pulse">Loading amazing products...</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.slice(0, 4).map((product) => (
              <Link to={`/product/${product._id}`} key={product._id} className="group bg-[#1a163a] rounded-2xl overflow-hidden border border-gray-300/10 hover:border-pink-500/50 hover:shadow-[0_0_30px_rgba(236,72,153,0.15)] transition-all duration-300">
                <div className="relative overflow-hidden aspect-square">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  {product.discount > 0 && (
                    <div className="absolute top-3 right-3 bg-pink-600 text-gray-800 text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                      {product.discount}% OFF
                    </div>
                  )}
                </div>
                <div className="p-5">
                  <p className="text-xs text-cyan-400 mb-1 font-bold uppercase tracking-wider">{product.category}</p>
                  <h3 className="font-bold text-lg mb-2 truncate group-hover:text-pink-500 transition-colors">{product.name}</h3>
                  <div className="flex items-baseline gap-2">
                    <span className="text-xl font-bold text-gray-800">₹{product.price}</span>
                    {product.originalPrice && (
                      <span className="text-sm text-gray-500 line-through">₹{product.originalPrice}</span>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
        
        <div className="mt-12 text-center md:hidden">
          <Link to="/shop" className="inline-block bg-[#1a163a] border border-gray-300/20 px-8 py-3 rounded-full font-bold hover:bg-white/10">
            View All Products
          </Link>
        </div>
      </div>

    </div>
  );
};

export default HomePage;