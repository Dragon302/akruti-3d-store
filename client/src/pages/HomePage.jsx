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
    <div className="min-h-screen bg-[#0f0c29] text-white">
      
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
            playsInline
            className="w-full h-full object-cover opacity-60"
          >
            <source src="https://cdn.pixabay.com/video/2022/11/20/140026-773801263_large.mp4" type="video/mp4" />
          </video>
        </div>

        {/* Hero Content */}
        <div className="relative z-20 text-center px-6 max-w-4xl mx-auto mt-10">
          <div className="inline-block px-4 py-1 border border-cyan-500/50 rounded-full bg-cyan-500/10 text-cyan-400 text-sm font-bold mb-6 animate-pulse">
            🚀 The Future of Manufacturing is Here
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-cyan-100 to-gray-400 drop-shadow-lg">
            Bring Your <span className="text-pink-500 italic">Ideas</span> to Life
          </h1>
          <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Premium 3D printed products, custom prototypes, and unique gifts. 
            Crafted with precision, delivered to your doorstep.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/shop" className="bg-gradient-to-r from-pink-600 to-purple-600 px-8 py-4 rounded-full font-bold text-lg hover:shadow-[0_0_20px_rgba(236,72,153,0.5)] transition-all flex items-center justify-center gap-2 group">
              Shop Now <ArrowRight className="group-hover:translate-x-1 transition-transform"/>
            </Link>
            <Link to="/contact" className="px-8 py-4 rounded-full font-bold text-lg border border-white/20 hover:bg-white/10 transition-all">
              Custom Order
            </Link>
          </div>
        </div>
      </div>

      {/* --- TRUST BADGES --- */}
      <div className="bg-[#1a163a] py-10 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="p-6 rounded-2xl bg-[#0f0c29]/50 border border-white/5 hover:border-cyan-500/30 transition group">
            <div className="w-14 h-14 bg-cyan-500/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition">
              <Zap size={28} className="text-cyan-400" />
            </div>
            <h3 className="text-xl font-bold mb-2">Rapid Prototyping</h3>
            <p className="text-gray-400 text-sm">From design to physical product in record time using advanced PLA & ABS.</p>
          </div>
          <div className="p-6 rounded-2xl bg-[#0f0c29]/50 border border-white/5 hover:border-pink-500/30 transition group">
            <div className="w-14 h-14 bg-pink-500/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition">
              <ShieldCheck size={28} className="text-pink-400" />
            </div>
            <h3 className="text-xl font-bold mb-2">Quality Assured</h3>
            <p className="text-gray-400 text-sm">Every layer is inspected. We guarantee high durability and fine details.</p>
          </div>
          <div className="p-6 rounded-2xl bg-[#0f0c29]/50 border border-white/5 hover:border-purple-500/30 transition group">
            <div className="w-14 h-14 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition">
              <Truck size={28} className="text-purple-400" />
            </div>
            <h3 className="text-xl font-bold mb-2">Pan-India Shipping</h3>
            <p className="text-gray-400 text-sm">Secure packaging and fast delivery partners to get your order safely.</p>
          </div>
        </div>
      </div>

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
              <Link to={`/product/${product._id}`} key={product._id} className="group bg-[#1a163a] rounded-2xl overflow-hidden border border-white/10 hover:border-pink-500/50 hover:shadow-[0_0_30px_rgba(236,72,153,0.15)] transition-all duration-300">
                <div className="relative overflow-hidden aspect-square">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  {product.discount > 0 && (
                    <div className="absolute top-3 right-3 bg-pink-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                      {product.discount}% OFF
                    </div>
                  )}
                </div>
                <div className="p-5">
                  <p className="text-xs text-cyan-400 mb-1 font-bold uppercase tracking-wider">{product.category}</p>
                  <h3 className="font-bold text-lg mb-2 truncate group-hover:text-pink-500 transition-colors">{product.name}</h3>
                  <div className="flex items-baseline gap-2">
                    <span className="text-xl font-bold text-white">₹{product.price}</span>
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
          <Link to="/shop" className="inline-block bg-[#1a163a] border border-white/20 px-8 py-3 rounded-full font-bold hover:bg-white/10">
            View All Products
          </Link>
        </div>
      </div>

    </div>
  );
};

export default HomePage;