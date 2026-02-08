import { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Plus, Trash2, Package, ShoppingBag, Truck, CheckCircle, Mail, MessageSquare } from 'lucide-react';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('products'); // 'products', 'orders', 'messages'
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [messages, setMessages] = useState([]);
  
  const [form, setForm] = useState({
    name: '', description: '', category: '', image: '',
    originalPrice: '', discount: 0, price: '', gst: 18, shippingCost: 0
  });

  // --- LOAD DATA ---
  useEffect(() => {
    if (activeTab === 'products') fetchProducts();
    if (activeTab === 'orders') fetchOrders();
    if (activeTab === 'messages') fetchMessages();
  }, [activeTab]);

  const fetchProducts = async () => { try { const res = await axios.get('https://akruti-3d-store.onrender.com/api/products'); setProducts(res.data); } catch (err) {} };
  const fetchOrders = async () => { try { const res = await axios.get('https://akruti-3d-store.onrender.com/api/orders'); setOrders(res.data); } catch (err) {} };
  const fetchMessages = async () => { try { const res = await axios.get('https://akruti-3d-store.onrender.com/api/messages'); setMessages(res.data); } catch (err) {} };

  // --- LOGIC: PRODUCTS ---
  useEffect(() => {
    if (form.originalPrice && form.discount >= 0) {
      const mrp = Number(form.originalPrice);
      const disc = Number(form.discount);
      setForm(prev => ({ ...prev, price: Math.round(mrp - (mrp * disc / 100)) }));
    }
  }, [form.originalPrice, form.discount]);

  const handleAddProduct = async (e) => {
    e.preventDefault();
    try { await axios.post('https://akruti-3d-store.onrender.com/api/products', form); toast.success("Added!"); fetchProducts(); } catch (err) { toast.error("Failed"); }
  };
  const handleDeleteProduct = async (id) => {
    if(window.confirm("Delete?")) { await axios.delete(`https://akruti-3d-store.onrender.com/api/products/${id}`); fetchProducts(); }
  };

  // --- LOGIC: ORDERS ---
  const updateOrderStatus = async (id, status) => {
    try { await axios.put(`https://akruti-3d-store.onrender.com/api/orders/${id}`, { status }); toast.success(`Order ${status}`); fetchOrders(); } catch (err) {}
  };

  // --- LOGIC: MESSAGES ---
  const handleDeleteMessage = async (id) => {
    if(window.confirm("Delete message?")) { await axios.delete(`https://akruti-3d-store.onrender.com/api/messages/${id}`); fetchMessages(); }
  };

  return (
    <div className="min-h-screen bg-[#0f0c29] text-gray-800 p-6 md:p-12">
      <h1 className="text-3xl font-bold mb-8 text-center text-transparent lip-text bg-gradient-to-r from-pink-500 to-cyan-500">Admin Dashboard</h1>

      {/* --- TABS --- */}
      <div className="flex flex-wrap justify-center gap-4 mb-8">
        <button onClick={() => setActiveTab('products')} className={`px-6 py-2 rounded-full font-bold flex gap-2 ${activeTab === 'products' ? 'bg-pink-600' : 'bg-[#1a163a]'}`}><Package size={18} /> Products</button>
        <button onClick={() => setActiveTab('orders')} className={`px-6 py-2 rounded-full font-bold flex gap-2 ${activeTab === 'orders' ? 'yan-600' : 'bg-[#1a163a]'}`}><ShoppingBag size={18} /> Orders</button>
        <button onClick={() => setActiveTab('messages')} className={`px-6 py-2 rounded-full font-bold flex gap-2 ${activeTab === 'messages' ? 'bg-purple-600' : 'bg-[#1a163a]'}`}><Mail size={18} /> Inbox</button>
      </div>

      <div className="max-w-7xl mx-auto">
        
        {/* PRODUCTS TAB */}
        {activeTab === 'products' && (
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1 bg-[#1a163a] p-6 rounded-2xl border border-gray-300/10 h-fit sticky top-6">
              <h2 className="text-xl font-bold mb-4 flex gap-2"><Plus className="text-pink-500" /> Add Product</h2>
              <form onSubmit={handleAddProduct} className="space-y-4">
                <input type="text" placeholder="Name" required value={form.name} onChange={e => setForm({...form, name: e.target.value})} className="w-full bg-[#0f0c29] border border-gray-300/20 p-3 rounded-lg"/>
                <input type="text" placeholder="Image URL" required value={form.image} onChange={e => setForm({...form, image: e.target.value})} className="w-full bg-[#0f0c29] border border-gray-300/20 p-3 rounded-lg"/>
                <input type="text" placeholder="Category" required value={form.category} onChange={e => setForm({...form, category: e.target.value})} className="w-full bg-[#0f0c29] border border-gray-300/20 p-3 rounded-lg"/>
                <div className="grid grid-cols-2 gap-2">
                     <input type="number" placeholder="MRP" required value={form.originalPrice} onChange={e => setForm({...form, originalPrice: e.target.value})} className="bg-[#1a163a] border border-gray-300/20 p-2 rounded-lg"/>
                     <input type="number" placeholder="Disc %" required value={form.discount} onChange={e => setForm({...form, discount: e.target.value})} className="bg-[#1a163a] border border-gray-300/20 p-2 rounded-lg"/>
                </div>
                <input type="number" readOnly value={form.price} className="w-full bg-green-900/20 border border-green-500/50 p-2 rounded-lg text-green-400 font-bold text-center"/>
                <button className="w-full bg-gradient-to-r from-pink-600 to-purple-600 font-bold py-3 rounded-xl">Publish</button>
              </form>
            </div>
            <div className="lg:col-span-2 space-y-4">
              {products.map((p) => (
                <div key={p._id} className="bg-[#1a163a] p-4 rounded-xl border border-gray-300/10 flex justify-between items-center">
                  <div className="flex items-center gap-4"><img src={p.image} className="w-16 h-16 rounded-lg bg-black" /><h3 className="font-bold">{p.name}</h3></div>
                  <button onClick={() => handleDeleteProduct(p._id)} className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg"><Trash2 size={18} /></button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ORDERS TAB */}
        {activeTab === 'orders' && (
          <div className="space-y-4">
             {orders.map(order => (
               <div key={order._id} className="bg-[#1a163a] p-6 rounded-xl border border-gray-300/10 flex flex-col md:flex-row justify-between items-center gap-4">
                  <div>
                    <p className="text-xs text-gray-400 font-bold">ID: {order._id}</p>
                    <p className="text-pink-500 font-bold text-xl">₹{order.amount}</p>
                    <span className="text-xs bg-white/10 px-2 py-1 rounded">{order.status}</span>
                  </div>
                  <div className="flex gap-2">
                     <button onClick={() => updateOrderStatus(order._id, 'Shipped')} className="bg-blue-600/20 text-blue-400 px-3 py-1 rounded flex gap-1 items-center"><Truck size={14}/> Ship</button>
                     <button onClick={() => updateOrderStatus(order._id, 'Delivered')} className="bg-green-600/20 text-green-400 px-3 py-1 rounded flex gap-1 items-center"><CheckCircle size={14}/> Done</button>
                  </div>
               </div>
             ))}
          </div>
        )}

        {/* MESSAGES TAB (NEW) */}
        {activeTab === 'messages' && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2"><Mail className="text-purple-500" /> Customer Inbox ({messages.length})</h2>
            {messages.length === 0 && <div className="text-center text-gray-500">No messages yet.</div>}
            
            {messages.map((msg) => (
              <div key={msg._id} className="bg-[#1a163a] p-6 rounded-xl border border-gray-300/10 hover:border-purple-500/30 transition relative">
                <button onClick={() => handleDeleteMessage(msg._id)} className="absolute top-4 right-4 text-gray-500 hover:text-red-500"><Trash2 size={18} /></button>
                <div className="flex items-center gap-3 mb-3">
                  <div className="bg-purple-500/20 p-2 rounded-full"><MessageSquare size={20} className="text-purple-400" /></div>
                  <div>
                    <h3 className="font-bold text-lg">{msg.name}</h3>
                    <p className="text-xs text-gray-400">{msg.email}</p>
                  </div>
                </div>
                <p className="text-gray-300 bg-[#0f0c29] p-4 rounded-lg border border-gray-300/5">"{msg.message}"</p>
                <p className="text-xs text-gray-500 mt-2 text-right">{new Date(msg.createdAt).toLocaleString()}</p>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};

export default AdminDashboard;