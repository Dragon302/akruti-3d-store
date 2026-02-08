import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { Package, Clock, CheckCircle, Truck, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
  if (user && user.accessToken) { // Ensure the token exists
    axios.get(`http://localhost:5000/api/orders/find/${user._id}`, {
      headers: { 
        token: `Bearer ${user.accessToken}` // This line is the fix
      }
    })
    .then(res => {
      setOrders(res.data);
      setLoading(false);
    })
    .catch(err => {
      console.error(err);
      setLoading(false);
    });
  }
}, [user]);

  if (loading) return <div className="min-h-screen bg-[#0f0c29] text-white flex items-center justify-center">Loading Orders...</div>;

  return (
    <div className="min-h-screen bg-[#0f0c29] text-white p-6 md:p-12">
      <h1 className="text-3xl font-bold mb-8 text-center">My Orders</h1>

      {orders.length === 0 ? (
        <div className="text-center text-gray-400 mt-20">
          <p className="mb-4">You haven't placed any orders yet.</p>
          <Link to="/shop" className="text-cyan-400 hover:underline">Start Shopping</Link>
        </div>
      ) : (
        <div className="max-w-4xl mx-auto space-y-6">
          {orders.map((order) => (
            <div key={order._id} className="bg-[#1a163a] p-6 rounded-xl border border-white/10 hover:border-cyan-500/30 transition-all">
              
              {/* Header */}
              <div className="flex flex-col md:flex-row justify-between md:items-center mb-4 border-b border-white/10 pb-4">
                <div>
                  <p className="text-xs text-gray-400 uppercase font-bold">Order ID</p>
                  <p className="font-mono text-sm text-cyan-400">#{order._id}</p>
                </div>
                <div className="mt-2 md:mt-0 text-right">
                  <p className="text-xs text-gray-400 uppercase font-bold">Date</p>
                  <p className="text-sm">{new Date(order.createdAt).toLocaleDateString()}</p>
                </div>
              </div>

              {/* DYNAMIC STATUS BAR */}
<div className={`flex items-center gap-2 mb-6 p-3 rounded-lg w-fit border ${
  order.status === 'Delivered' ? 'bg-green-500/10 border-green-500/50 text-green-400' :
  order.status === 'Shipped' ? 'bg-blue-500/10 border-blue-500/50 text-blue-400' :
  'bg-yellow-500/10 border-yellow-500/50 text-yellow-400'
}`}>
  {order.status === 'Processing' && <Clock size={18} />}
  {order.status === 'Shipped' && <Truck size={18} />}
  {order.status === 'Delivered' && <CheckCircle size={18} />}
  
  <span className="font-bold text-sm">
    {order.status === 'Delivered' ? 'Order Completed' : `Order ${order.status}`}
  </span>
</div>

              {/* Products List */}
              <div className="space-y-3">
                {order.products.map((p, index) => (
                  <div key={index} className="flex justify-between items-center text-sm">
                    <div className="flex items-center gap-3">
                      <div className="bg-white/10 p-2 rounded-lg"><Package size={16}/></div>
                      <span className="text-gray-200">
                        {p.qty}x <span className="font-bold">{p.name}</span>
                      </span>
                    </div>
                    <span className="text-gray-400">₹{p.price * p.qty}</span>
                  </div>
                ))}
              </div>

              {/* Total */}
              <div className="mt-6 pt-4 border-t border-white/10 flex justify-between items-center">
                <span className="text-sm text-gray-400">Total Amount</span>
                <span className="text-xl font-bold text-pink-500">₹{order.amount}</span>
              </div>

            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrdersPage;