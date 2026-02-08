import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';
import { Truck, ShieldCheck, CreditCard, Lock } from 'lucide-react'; 
import { useAuth } from '../context/AuthContext';

const CheckoutPage = () => {
  const { cart, total, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  
  const [form, setForm] = useState({
    address: '', city: '', zip: '', country: 'India'
  });

  // 1. Initiate Payment
  const handlePayment = async (e) => {
    e.preventDefault();
    if (cart.length === 0 || total <= 0) {
      return toast.error("Cart is empty! Please add items first.");
    }

    setLoading(true);

    try {
      console.log("Sending Payment Request for Amount:", total);
     

      // A. Create Order ID from Backend
      const { data: { data: order } } = await axios.post('https://akruti-3d-store.onrender.com/api/payment/orders', {
        amount: total
      });

      // B. Razorpay Options
      const options = {
        key: "rzp_test_SAwqPu376DkB0L", // <--- PASTE YOUR KEY ID HERE ALSO (For Frontend)
        amount: order.amount,
        currency: order.currency,
        name: "Akruti 3D",
        description: "3D Printed Products Order",
        order_id: order.id, // This is the ID we got from backend
        handler: async (response) => {
          try {
             // C. Verify Payment
             const verifyUrl = "https://akruti-3d-store.onrender.com/api/payment/verify";
             const { data } = await axios.post(verifyUrl, response);
             

             toast.success(data.message);
            clearCart();
            navigate("/orders");
             // D. If verified, Save Order to Database
             saveOrderToDatabase();

          } catch (error) {
             console.log(error);
             toast.error("Payment Verification Failed");
          }
        },
        prefill: {
          name: user.name,
          email: user.email,
        },
        theme: {
          color: "#db2777", // Pink color
        },
      };

      // C. Open Razorpay Modal
      const rzp1 = new window.Razorpay(options);
      rzp1.open();

    } catch (error) {
      console.error("PAYMENT ERROR:", error);
      // Show the exact error message from the backend if available
      toast.error(error.response?.data?.message || "Payment Initiation Failed");
    } finally {
      setLoading(false);
    }
  };

  // 2. Save to DB (Only called after success)
  const saveOrderToDatabase = async () => {
    try {
      const orderData = {
        userId: user._id,
        products: cart.map(item => ({
          productId: item._id, name: item.name, qty: item.qty, price: item.price
        })),
        amount: Math.round(total * 1.18),
        address: form,
        paymentMethod: "Online (Razorpay)",
        status: "Paid" // We mark it as Paid immediately
      };

      await axios.post('https://akruti-3d-store.onrender.com/api/orders', orderData);
      
      toast.success("Payment Successful! Order Placed.");
      clearCart();
      navigate('/orders');
      
    } catch (err) {
      console.error(err);
      toast.error("Payment taken, but order save failed. Contact Support.");
    }
  };

  if (cart.length === 0) return <div className="text-white text-center mt-20">Your cart is empty</div>;

  return (
    <div className="min-h-screen bg-[#0f0c29] text-white p-6 md:p-12">
      <h1 className="text-3xl font-bold mb-8 text-center">Secure Checkout</h1>

      <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-12">
        
        {/* LEFT: Shipping Form */}
        <div className="space-y-6">
          <div className="bg-[#1a163a] p-6 rounded-xl border border-white/10">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2"><Truck className="text-pink-500"/> Shipping Details</h2>
            <form id="checkout-form" onSubmit={handlePayment} className="space-y-4">
              <div><label className="text-sm text-gray-400">Address</label><input required type="text" value={form.address} onChange={e=>setForm({...form, address: e.target.value})} className="w-full bg-[#0f0c29] border border-white/20 p-3 rounded-lg outline-none focus:border-pink-500"/></div>
              <div className="grid grid-cols-2 gap-4">
                <div><label className="text-sm text-gray-400">City</label><input required type="text" value={form.city} onChange={e=>setForm({...form, city: e.target.value})} className="w-full bg-[#0f0c29] border border-white/20 p-3 rounded-lg outline-none focus:border-pink-500"/></div>
                <div><label className="text-sm text-gray-400">Zip</label><input required type="text" value={form.zip} onChange={e=>setForm({...form, zip: e.target.value})} className="w-full bg-[#0f0c29] border border-white/20 p-3 rounded-lg outline-none focus:border-pink-500"/></div>
              </div>
            </form>
          </div>

          <div className="bg-green-900/20 border border-green-500/30 p-4 rounded-xl flex items-center gap-3">
             <Lock className="text-green-500" size={24}/>
             <div className="text-sm text-green-400">
               <strong>100% Secure Payment</strong><br/>
               Transactions are encrypted and secured by Razorpay.
             </div>
          </div>
        </div>

        {/* RIGHT: Summary */}
        <div className="bg-[#1a163a] p-6 rounded-xl border border-white/10 h-fit">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2"><ShieldCheck className="text-cyan-500"/> Order Summary</h2>
          <div className="space-y-2 mb-4 max-h-40 overflow-y-auto pr-2">
            {cart.map(item => (
              <div key={item._id} className="flex justify-between text-sm">
                <span className="text-gray-400">{item.qty}x {item.name}</span><span>₹{item.price * item.qty}</span>
              </div>
            ))}
          </div>
          <div className="border-t border-white/10 pt-4 space-y-2">
             <div className="flex justify-between"><span>Subtotal</span><span>₹{total}</span></div>
             <div className="flex justify-between font-bold text-lg text-cyan-400"><span>Total</span><span>₹{Math.round(total * 1.18)}</span></div>
          </div>
          
          <button type="submit" form="checkout-form" disabled={loading} className="w-full mt-6 bg-gradient-to-r from-blue-600 to-cyan-600 py-3 rounded-lg font-bold hover:shadow-lg transition disabled:opacity-50 flex items-center justify-center gap-2">
             <CreditCard size={20}/> {loading ? "Processing..." : `Pay ₹${Math.round(total * 1.18)} Now`}
          </button>
        </div>

      </div>
    </div>
  );
};

export default CheckoutPage;