import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { ArrowRight, Truck, ShieldCheck, Zap, Star } from 'lucide-react';
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

        {/* 1. HERO SECTION (SafeTag Style) */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 px-6">
        <div className="max-w-7xl mx-auto text-center relative z-10">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full font-semibold text-sm mb-8 animate-fade-up">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
            </span>
            New Collection 2026 Live
          </div>

          {/* Big Headline */}
          <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 tracking-tight mb-6 leading-tight animate-fade-up" style={{ animationDelay: "0.1s" }}>
            Protect What <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">Matters.</span> <br className="hidden md:block"/>
            Create What You Love.
          </h1>

          {/* Subtext */}
          <p className="text-lg md:text-xl text-slate-500 max-w-2xl mx-auto mb-10 animate-fade-up" style={{ animationDelay: "0.2s" }}>
            Premium 3D printed accessories, secure tags, and custom designs. 
            Engineered for durability, designed for you.
          </p>

          {/* Buttons */}
          <div className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full font-bold shadow-lg shadow-blue-500/30 transition-all" style={{ animationDelay: "0.3s" }}>
            <Link to="/shop" className="w-full sm:w-auto px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-full transition-all shadow-xl shadow-blue-500/30 flex items-center justify-center gap-2">
              Shop Now <ArrowRight size={20} />
            </Link>
            <Link to="/about" className="w-full sm:w-auto px-8 py-4 bg-white border-2 border-slate-200 text-slate-700 font-bold rounded-full hover:border-slate-400 transition-all flex items-center justify-center">
              Learn More
            </Link>
          </div>
        </div>

        {/* Abstract Background Decoration (The "Tech" feel) */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full z-0 pointer-events-none opacity-40">
           <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400/20 rounded-full blur-3xl animate-pulse"></div>
           <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "2s" }}></div>
        </div>
      </section>
      </div>

      {/* 2. TRUST BADGES (Security Section) */}
      <section className="py-12 border-y border-slate-100 bg-slate-50/50">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
           <div className="flex flex-col items-center gap-2 text-slate-600">
              <ShieldCheck className="text-blue-600" size={32} />
              <span className="font-bold text-slate-900">100% Secure</span>
           </div>
           <div className="flex flex-col items-center gap-2 text-slate-600">
              <Truck className="text-blue-600" size={32} />
              <span className="font-bold text-slate-900">Fast Shipping</span>
           </div>
           <div className="flex flex-col items-center gap-2 text-slate-600">
              <Star className="text-blue-600" size={32} />
              <span className="font-bold text-slate-900">Top Rated</span>
           </div>
           {/* Add more as needed */}
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