import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import { UserPlus, User, Lock, Mail, ArrowRight } from 'lucide-react';

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  
  // Get register function from Context
  const { register } = useAuth(); 
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // 1. Send Register Request to Backend
      const res = await axios.post('https://akruti-3d-store.onrender.com/api/auth/register', {
        username: name,
        email,
        password
      });

      // 2. Save User Data via Context
      register(res.data);

      // 3. Success Message
      toast.success("Account Created Successfully! 🎉");
      
      // 4. Redirect to Home
      navigate('/');
      
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0f0c29] flex items-center justify-center p-4">
      <div className="bg-[#1a163a] w-full max-w-md p-8 rounded-2xl border border-white/10 shadow-2xl relative">
        
        {/* Header Icon */}
        <div className="flex justify-center mb-6">
          <div className="bg-gradient-to-r from-cyan-500 to-blue-600 p-3 rounded-full">
            <UserPlus size={32} className="text-white" />
          </div>
        </div>

        <h2 className="text-3xl font-bold text-center text-white mb-2">Create Account</h2>
        <p className="text-gray-400 text-center mb-8">Join us to start your 3D journey</p>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Full Name Input */}
          <div className="space-y-1">
            <label className="text-sm font-bold text-gray-400 ml-1">Full Name</label>
            <div className="relative">
              <User className="absolute left-3 top-3.5 text-gray-500" size={18} />
              <input 
                type="text" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-[#0f0c29] border border-white/20 text-white pl-10 pr-4 py-3 rounded-xl outline-none focus:border-cyan-500 transition-colors"
                placeholder="John Doe"
                required 
              />
            </div>
          </div>

          {/* Email Input */}
          <div className="space-y-1">
            <label className="text-sm font-bold text-gray-400 ml-1">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-3.5 text-gray-500" size={18} />
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#0f0c29] border border-white/20 text-white pl-10 pr-4 py-3 rounded-xl outline-none focus:border-cyan-500 transition-colors"
                placeholder="john@example.com"
                required 
              />
            </div>
          </div>

          {/* Password Input */}
          <div className="space-y-1">
            <label className="text-sm font-bold text-gray-400 ml-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-3.5 text-gray-500" size={18} />
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#0f0c29] border border-white/20 text-white pl-10 pr-4 py-3 rounded-xl outline-none focus:border-cyan-500 transition-colors"
                placeholder="••••••"
                required 
              />
            </div>
          </div>

          {/* Submit Button */}
          <button 
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold py-3.5 rounded-xl hover:shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-all flex items-center justify-center gap-2 mt-4 disabled:opacity-50"
          >
            {loading ? "Creating..." : <>Create Account <ArrowRight size={20} /></>}
          </button>
        </form>

        <p className="text-center text-gray-500 mt-6 text-sm">
          Already have an account? <Link to="/login" className="text-cyan-400 font-bold hover:underline">Log In</Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;