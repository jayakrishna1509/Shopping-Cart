import { ShoppingCart, History, CheckCircle, LogOut } from 'lucide-react';
import { logoutUser, getCart, getOrders, createOrder } from '../utils/api';
import { useState } from 'react';

const Navbar = ({ onLogout }) => {
  const [loading, setLoading] = useState(false);

  const handleCartClick = async () => {
    try {
      const response = await getCart();
      const cart = response.data;
      
      if (!cart.items || cart.items.length === 0) {
        window.alert('Your Cart Is Empty');
        return;
      }

      const cartInfo = cart.items.map((item, index) => 
        `Item ${index + 1}: Cart ID: ${cart._id}, Item ID: ${item.item._id || item.item}`
      ).join('\n');

      window.alert(`Cart Items:\n\n${cartInfo}`);
    } catch (error) {
      window.alert('Error fetching cart: ' + (error.response?.data?.error || error.message));
    }
  };

  const handleOrderHistoryClick = async () => {
    try {
      const response = await getOrders();
      const orders = response.data;
      
      if (!orders || orders.length === 0) {
        window.alert('No Orders Found');
        return;
      }

      const orderIds = orders.map(order => `Order ID: ${order._id}`).join('\n');
      window.alert(`Order History:\n\n${orderIds}`);
    } catch (error) {
      window.alert('Error fetching orders: ' + (error.response?.data?.error || error.message));
    }
  };

  const handleCheckout = async () => {
    if (!window.confirm('Are You Sure You Want To Checkout?')) {
      return;
    }

    setLoading(true);
    try {
      await createOrder();
      window.alert('Order Successful!');
      // Optionally refresh the page or update state
      window.location.reload();
    } catch (error) {
      window.alert('Error Placing Order: ' + (error.response?.data?.error || error.message));
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logoutUser();
      localStorage.removeItem('token');
      onLogout();
    } catch (error) {
      console.error('Logout Error:', error);
      localStorage.removeItem('token');
      onLogout();
    }
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          <div className="flex items-center">
            <h1 className="text-xl md:text-2xl font-bold text-indigo-600">
              Shopping Cart Portal 🛒
            </h1>
          </div>

          <div className="flex items-center gap-2 md:gap-4">
            <button
              onClick={handleCheckout}
              disabled={loading}
              className="flex items-center gap-1 md:gap-2 px-3 md:px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all disabled:opacity-50 text-sm md:text-base"
            >
              <CheckCircle className="w-4 h-4 md:w-5 md:h-5" />
              <span className="hidden sm:inline">Checkout</span>
            </button>

            <button
              onClick={handleCartClick}
              className="flex items-center gap-1 md:gap-2 px-3 md:px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all text-sm md:text-base"
            >
              <ShoppingCart className="w-4 h-4 md:w-5 md:h-5" />
              <span className="hidden sm:inline">Cart</span>
            </button>

            <button
              onClick={handleOrderHistoryClick}
              className="flex items-center gap-1 md:gap-2 px-3 md:px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all text-sm md:text-base"
            >
              <History className="w-4 h-4 md:w-5 md:h-5" />
              <span className="hidden sm:inline">Orders</span>
            </button>

            <button
              onClick={handleLogout}
              className="flex items-center gap-1 md:gap-2 px-3 md:px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-all text-sm md:text-base"
            >
              <LogOut className="w-4 h-4 md:w-5 md:h-5" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
