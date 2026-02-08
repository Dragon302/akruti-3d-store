import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import toast from 'react-hot-toast';
import { Star, ShoppingCart, Truck, ShieldCheck, Trash2, Plus, Minus } from 'lucide-react';

const ProductPage = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[2]; // Get ID from URL
  
  const [product, setProduct] = useState({});
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(true);
  
  const { addToCart } = useCart();
  const { user } = useAuth(); 

  // 1. Fetch Product Data
  useEffect(() => {
    const getProduct = async () => {
      try {
        console.log("Fetching Product ID:", id);
        const res = await axios.get(`http://localhost:5000/api/products/find/${id}`);
        setProduct(res.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };
    getProduct();
  }, [id]);

  // 2. Add to Cart Handler
  const handleAddToCart = () => {
    addToCart({ ...product, qty });
    toast.success("Added to Cart 🛒");
  };

  // 3. Submit Review Handler
  const submitReview = async (e) => {
    e.preventDefault();
    if (!user) return toast.error("Please login to review");
    
    try {
      const res = await axios.post(`http://localhost:5000/api/products/${id}/reviews`, {
        name: user.username || user.name || "Customer", 
        rating,
        comment,
        user: user._id
      });
      setProduct(res.data); // Update UI with new review
      toast.success("Review Submitted!");
      setComment("");
    } catch (err) {
      toast.error("Error submitting review");
    }
  };

  // 4. Delete Review (Admin Only)
  const deleteReview = async (reviewId) => {
    if(!window.confirm("Are you sure you want to delete this review?")) return;
    try {
      // Note: Make sure your backend route matches this URL!
      const res = await axios.delete(`http://localhost:5000/api/products/${id}/reviews/${reviewId}`);
      setProduct(res.data); 
      toast.success("Review Deleted");
    } catch (err) {
      toast.error("Delete failed");
    }
  };

  if (loading) return <div className="min-h-screen bg-[#0f0c29] text-white flex items-center justify-center">Loading Product...</div>;

  return (
    <div className="min-h-screen bg-[#0f0c29] text-white p-6 md:p-12">
      <div className="max-w-6xl mx-auto">
        
        {/* --- TOP SECTION: IMAGES & INFO --- */}
        <div className="grid md:grid-cols-2 gap-12 mb-16">
          {/* Image */}
          <div className="bg-[#1a163a] p-4 rounded-2xl border border-white/10 flex items-center justify-center">
            <img 
  src={product.image} 
  alt={product.name} 
  onError={(e) => { e.target.src = "https://via.placeholder.com/500x500?text=No+Image"; }} 
  className="max-h-[500px] object-contain rounded-xl hover:scale-105 transition duration-500" 
/>
          </div>
          
          {/* Details */}
          <div className="space-y-6">
            <h1 className="text-4xl font-bold">{product.name}</h1>
            <p className="text-cyan-400 font-bold uppercase tracking-wider text-sm">{product.category}</p>
            
            <div className="flex items-center gap-4">
               <span className="text-4xl font-bold text-pink-500">₹{product.price}</span>
               {product.originalPrice && <span className="text-xl text-gray-500 line-through">₹{product.originalPrice}</span>}
               {product.discount > 0 && <span className="bg-pink-600 px-3 py-1 rounded-full text-sm font-bold animate-pulse">{product.discount}% OFF</span>}
            </div>

            <p className="text-gray-300 leading-relaxed text-lg border-l-4 border-pink-500 pl-4">{product.description}</p>
            
            {/* Quantity & Cart */}
            <div className="flex gap-4 mt-8">
              <div className="flex items-center bg-[#1a163a] rounded-xl border border-white/20">
                 <button onClick={() => setQty(q => Math.max(1, q-1))} className="px-4 py-3 hover:bg-white/10"><Minus size={18}/></button>
                 <span className="px-4 font-bold text-xl">{qty}</span>
                 <button onClick={() => setQty(q => q+1)} className="px-4 py-3 hover:bg-white/10"><Plus size={18}/></button>
              </div>
              <button onClick={handleAddToCart} className="flex-1 bg-gradient-to-r from-cyan-500 to-blue-600 font-bold py-3 rounded-xl hover:shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-all flex items-center justify-center gap-2 text-lg">
                <ShoppingCart size={24}/> Add to Cart
              </button>
            </div>
            
            {/* Trust Badges */}
            <div className="grid grid-cols-2 gap-4 text-sm text-gray-400 mt-6 pt-6 border-t border-white/10">
              <div className="flex items-center gap-3"><Truck size={20} className="text-cyan-400"/> Fast India-wide Delivery</div>
              <div className="flex items-center gap-3"><ShieldCheck size={20} className="text-pink-400"/> Premium Quality Verified</div>
            </div>
          </div>
        </div>

        {/* --- BOTTOM SECTION: REVIEWS --- */}
        <div className="grid lg:grid-cols-2 gap-12 pt-10 border-t border-white/10">
          
          {/* 1. Write Review Form */}
          <div className="bg-[#1a163a] p-8 rounded-2xl border border-white/10 h-fit">
            <h3 className="text-2xl font-bold mb-6">Write a Review</h3>
            <form onSubmit={submitReview} className="space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-2 font-bold">Rating</label>
                <select value={rating} onChange={(e) => setRating(Number(e.target.value))} className="w-full bg-[#0f0c29] border border-white/20 p-4 rounded-xl outline-none focus:border-cyan-500">
                  <option value="5">⭐⭐⭐⭐⭐ - Excellent</option>
                  <option value="4">⭐⭐⭐⭐ - Very Good</option>
                  <option value="3">⭐⭐⭐ - Good</option>
                  <option value="2">⭐⭐ - Fair</option>
                  <option value="1">⭐ - Poor</option>
                </select>
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2 font-bold">Comment</label>
                <textarea 
                  rows="4" 
                  placeholder="Share your experience with this product..." 
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="w-full bg-[#0f0c29] border border-white/20 p-4 rounded-xl outline-none focus:border-cyan-500 transition"
                  required
                />
              </div>
              <button className="w-full bg-white/10 hover:bg-white/20 font-bold py-4 rounded-xl transition text-cyan-400 border border-cyan-500/30">Submit Review</button>
            </form>
          </div>

          {/* 2. Display Reviews List */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
              Customer Reviews <span className="text-sm bg-pink-600 px-2 py-1 rounded-full text-white">{product.numReviews || 0}</span>
            </h3>
            
            {(!product.reviews || product.reviews.length === 0) && (
              <div className="text-center p-10 bg-[#1a163a] rounded-xl border border-dashed border-white/20 text-gray-500">
                No reviews yet. Be the first to review!
              </div>
            )}

            <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
  {/* The '?' after reviews is the SAFETY KEY */}
  {product.reviews?.map((review) => (
    <div key={review._id || Math.random()} className="bg-[#1a163a] p-6 rounded-xl border border-white/10 relative group">
      
      {/* ... your existing delete button code ... */}

      <div className="flex items-center gap-3 mb-3">
        <div className="bg-gradient-to-br from-pink-500 to-purple-600 w-10 h-10 rounded-full flex items-center justify-center font-bold text-white shadow-lg">
          {/* Safety check for name */}
          {review.name ? review.name.charAt(0).toUpperCase() : "U"}
        </div>
        <div>
          <h4 className="font-bold">{review.name || "Anonymous"}</h4>
          <div className="flex text-yellow-500 text-sm">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={14} fill={i < review.rating ? "currentColor" : "none"} />
            ))}
          </div>
        </div>
      </div>
      
      <p className="text-gray-300 ml-14 bg-[#0f0c29] p-3 rounded-lg border border-white/5 italic">
        "{review.comment}"
      </p>
    </div>
  ))}
</div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ProductPage;