import { motion } from 'framer-motion';
import { ShoppingCart } from 'lucide-react';

const ProductCard = ({ product, onAddToCart }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      whileHover={{ y: -8 }}
      className="bg-white rounded-2xl p-4 shadow-soft hover:shadow-hover transition-all duration-300 border border-gray-100 group"
    >
      {/* Image Container */}
      <div className="relative h-64 rounded-xl overflow-hidden bg-gray-50 mb-4">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-primary">
          {product.category}
        </div>
      </div>

      {/* Details */}
      <div>
        <h3 className="text-lg font-bold text-primary mb-1">{product.name}</h3>
        <p className="text-gray-500 text-sm mb-4 line-clamp-2">{product.description}</p>
        
        <div className="flex items-center justify-between">
          <span className="text-xl font-bold text-primary">₹{product.price}</span>
          <motion.button 
            whileTap={{ scale: 0.9 }}
            onClick={() => onAddToCart(product)}
            className="bg-primary text-white p-3 rounded-xl hover:bg-white/70 backdrop-blur-lg border border-white/40 shadow-xlccent transition-colors"
          >
            <ShoppingCart size={20} />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;