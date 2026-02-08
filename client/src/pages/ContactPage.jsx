import { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Mail, Phone, MapPin, MessageCircle, Send } from 'lucide-react';

const ContactPage = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post('https://akruti-3d-store.onrender.com/api/messages', form);
      toast.success("Message sent! We'll reply shortly.");
      setForm({ name: '', email: '', message: '' }); // Clear form
    } catch (err) {
      toast.error("Failed to send message. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0f0c29] text-white pb-20">
      
      {/* Hero Section */}
      <div className="bg-[#1a163a] py-16 text-center border-b border-white/10">
        <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
        <p className="text-gray-400">We are here to help with your 3D printing needs</p>
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Contact Info */}
          <div className="space-y-8">
            <h2 className="text-3xl font-bold">Get in touch</h2>
            <p className="text-gray-400">Have a custom design in mind? Need help with an order? Drop us a message!</p>
            
            <div className="space-y-6">
              <div className="flex items-center gap-4 bg-[#1a163a] p-4 rounded-xl border border-white/10">
                <div className="bg-blue-500/20 p-3 rounded-full text-blue-400"><Mail size={24} /></div>
                <div><h4 className="font-bold">Email</h4><p className="text-sm text-gray-400">support@akruti.com</p></div>
              </div>
              <div className="flex items-center gap-4 bg-[#1a163a] p-4 rounded-xl border border-white/10">
                <div className="bg-purple-500/20 p-3 rounded-full text-purple-400"><Phone size={24} /></div>
                <div><h4 className="font-bold">Phone</h4><p className="text-sm text-gray-400">+91 98765 43210</p></div>
              </div>
              <div className="flex items-center gap-4 bg-[#1a163a] p-4 rounded-xl border border-white/10">
                <div className="bg-orange-500/20 p-3 rounded-full text-orange-400"><MapPin size={24} /></div>
                <div><h4 className="font-bold">Office</h4><p className="text-sm text-gray-400">Bhiwandi, Maharashtra</p></div>
              </div>
            </div>
          </div>

          {/* Functional Contact Form */}
          <div className="bg-[#1a163a] p-8 rounded-2xl border border-white/10 shadow-2xl">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <MessageCircle className="text-cyan-500" /> Send a message
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input type="text" value={form.name} onChange={e=>setForm({...form, name: e.target.value})} className="w-full bg-[#0f0c29] border border-white/20 rounded-lg p-3 text-white outline-none focus:border-pink-500" placeholder="Your Name" required />
              <input type="email" value={form.email} onChange={e=>setForm({...form, email: e.target.value})} className="w-full bg-[#0f0c29] border border-white/20 rounded-lg p-3 text-white outline-none focus:border-pink-500" placeholder="Your Email" required />
              <textarea rows="4" value={form.message} onChange={e=>setForm({...form, message: e.target.value})} className="w-full bg-[#0f0c29] border border-white/20 rounded-lg p-3 text-white outline-none focus:border-pink-500" placeholder="How can we help?" required />
              
              <button disabled={loading} className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 font-bold py-3 rounded-xl hover:shadow-lg transition flex items-center justify-center gap-2 disabled:opacity-50">
                {loading ? "Sending..." : <>Send Message <Send size={18}/></>}
              </button>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ContactPage;