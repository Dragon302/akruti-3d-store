import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import { LogIn, User, Lock, ArrowRight } from 'lucide-react';
import BASE_URL from '../api'; // Use your API helper if you have it, or hardcode localhost

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault(); // Stop page reload
    console.log("Attempting login..."); // Debug log

    setLoading(true);

    try {
      // 1. Send Login Request
      const res = await axios.post('http://localhost:5000/api/auth/login', {
        email,
        password
      });

      console.log("Login Success:", res.data); // Debug log

      // 2. Save User Data
      login(res.data); 

      toast.success("Welcome back!");
      navigate('/'); // Redirect to Home
    } catch (err) {
      console.error("Login Error:", err);
      toast.error(err.response?.data || "Login failed. Check email/password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0f0c29] flex items-center justify-center p-4">
      <div className="bg-[#1a163a] w-full max-w-md p-8 rounded-2xl border border-white/10 shadow-2xl relative">
        
        <h2 className="text-3xl font-bold text-center text-white mb-2">Welcome Back</h2>
        
        <form onSubmit={handleSubmit} className="space-y-5 mt-8">
          
          <div className="space-y-1">
            <label className="text-sm font-bold text-gray-400 ml-1">Email</label>
            <div className="relative">
              <User className="absolute left-3 top-3.5 text-gray-500" size={18} />
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#0f0c29] border border-white/20 text-white pl-10 pr-4 py-3 rounded-xl outline-none focus:border-pink-500"
                placeholder="admin@akruti.com"
                required 
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-sm font-bold text-gray-400 ml-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-3.5 text-gray-500" size={18} />
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#0f0c29] border border-white/20 text-white pl-10 pr-4 py-3 rounded-xl outline-none focus:border-pink-500"
                placeholder="••••••"
                required 
              />
            </div>
          </div>

          {/* ADDED type="submit" HERE */}
          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-gradient-to-r from-pink-600 to-purple-600 text-white font-bold py-3.5 rounded-xl hover:shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? "Signing In..." : <>Sign In <ArrowRight size={20} /></>}
          </button>
        </form>

        <p className="text-center text-gray-500 mt-6 text-sm">
          Don't have an account? <Link to="/register" className="text-pink-500 font-bold hover:underline">Create One</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;