import { useCart } from "../context/CartContext";
import { Link, useNavigate } from "react-router-dom";
import { Trash2, Minus, Plus, ArrowRight } from "lucide-react";

const CartPage = () => {
  const { cart, removeFromCart, addToCart, clearCart } = useCart();
  const navigate = useNavigate();

  // --- SAFE CALCULATIONS ---
  // 1. Subtotal: Sum of (Price * Qty)
  const subtotal = cart.reduce((acc, item) => {
    const price = Number(item.price) || 0; // Force to Number
    const qty = Number(item.qty) || 1;     // Force to Number
    return acc + (price * qty);
  }, 0);

  // 2. Tax (18% GST)
  const tax = Math.round(subtotal * 0.18);

  // 3. Shipping (Free if > 500, else 50)
  const shipping = subtotal > 500 ? 0 : 50;

  // 4. Grand Total
  const total = subtotal + tax + shipping;

  return (
    <div className="min-h-screen bg-[#0f0c29] text-gray-800 p-6 md:p-12">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 flex items-center gap-2">
          Shopping Cart <span className="text-sm bg-pink-600 px-2 py-1 rounded-full">{cart.length} Items</span>
        </h1>

        {cart.length === 0 ? (
          <div className="text-center py-20 bg-[#1a163a] rounded-2xl border border-dashed border-gray-200">
            <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
            <Link to="/shop" className="bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-3 rounded-full font-bold">Start Shopping</Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            
            {/* CART ITEMS LIST */}
            <div className="lg:col-span-2 space-y-4">
              {cart.map((item) => (
                <div key={item._id} className="bg-[#1a163a] p-4 rounded-xl border border-gray-200 flex gap-4 items-center">
                  <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-lg bg-black" />
                  
                  <div className="flex-1">
                    <h3 className="font-bold text-lg">{item.name}</h3>
                    <p className="text-cyan-400 font-bold">₹{item.price}</p>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center bg-[#0f0c29] rounded-lg border border-gray-200">
                    <button 
                      onClick={() => addToCart({ ...item, qty: -1 })} 
                      disabled={item.qty <= 1}
                      className="p-2 hover:bg-white/10 disabled:opacity-30"
                    >
                      <Minus size={16}/>
                    </button>
                    <span className="px-2 font-bold">{item.qty}</span>
                    <button 
                      onClick={() => addToCart({ ...item, qty: 1 })} 
                      className="p-2 hover:bg-white/10"
                    >
                      <Plus size={16}/>
                    </button>
                  </div>

                  <button onClick={() => removeFromCart(item._id)} className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg">
                    <Trash2 size={20}/>
                  </button>
                </div>
              ))}
              
              <button onClick={clearCart} className="text-red-400 text-sm hover:underline mt-4">Clear Cart</button>
            </div>

            {/* ORDER SUMMARY */}
            <div className="lg:col-span-1 h-fit bg-[#1a163a] p-6 rounded-2xl border border-gray-200 sticky top-4">
              <h2 className="text-xl font-bold mb-6">Order Summary</h2>
              
              <div className="space-y-3 mb-6 text-gray-300">
                <div className="flex justify-between"><span>Subtotal</span> <span>₹{subtotal}</span></div>
                <div className="flex justify-between"><span>GST (18%)</span> <span>₹{tax}</span></div>
                <div className="flex justify-between">
                  <span>Shipping</span> 
                  <span className={shipping === 0 ? "text-green-400" : ""}>{shipping === 0 ? "Free" : `₹${shipping}`}</span>
                </div>
                <div className="border-t border-gray-200 pt-3 flex justify-between font-bold text-gray-800 text-xl">
                  <span>Total</span> <span>₹{total}</span>
                </div>
              </div>

              <button 
                onClick={() => navigate("/checkout")} 
                className="w-full bg-gradient-to-r from-pink-600 to-purple-600 py-4 rounded-xl font-bold hover:shadow-lg hover:shadow-pink-500/20 transition flex items-center justify-center gap-2"
              >
                Proceed to Checkout <ArrowRight size={20}/>
              </button>
            </div>

          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;