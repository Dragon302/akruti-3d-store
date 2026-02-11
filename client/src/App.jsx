import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

// Import Pages
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import HomePage from './pages/HomePage';
import ShopPage from './pages/ShopPage';
import ProductDetails from './pages/ProductDetails';
import CartPage from './pages/CartPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AdminDashboard from './components/AdminDashboard';
import OrdersPage from './pages/OrdersPage';
import CheckoutPage from './pages/CheckoutPage';

// --- IMPORT CONTACT PAGE ---
import ContactPage from './pages/ContactPage'; 

function App() {
  return (
    <div className="bg-[#0f0c29] min-h-screen text-gray-800 flex flex-col">
      <Toaster position="top-center" />
      <Navbar />
      
      <div className="flex-grow">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/orders" element={<OrdersPage />} />
          
          {/* --- ADD THIS ROUTE --- */}
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </div>

      <Footer />
    </div>
  );
}

export default App;