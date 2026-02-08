import { useState, useEffect } from 'react';
import { getItems, addToCart } from '../utils/api';
import { ShoppingBag, Plus } from 'lucide-react';

const ItemList = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [addingToCart, setAddingToCart] = useState({});

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await getItems();
      console.log('Items response:', response);
      if (response && response.data) {
        console.log('Items data:', response.data);
        setItems(Array.isArray(response.data) ? response.data : []);
      } else {
        setItems([]);
      }
    } catch (error) {
      console.error('Error fetching items:', error);
      setItems([]);
      if (error.response) {
        window.alert('Error loading items: ' + (error.response?.data?.error || error.message));
      } else if (error.request) {
        window.alert('Unable to connect to server. Please check if the backend is running.');
      } else {
        window.alert('Error loading items: ' + error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async (itemId) => {
    setAddingToCart(prev => ({ ...prev, [itemId]: true }));
    try {
      await addToCart(itemId);
      window.alert('Item Added to Cart Successfully!');
    } catch (error) {
      window.alert('Error Adding to Cart: ' + (error.response?.data?.error || error.message));
    } finally {
      setAddingToCart(prev => ({ ...prev, [itemId]: false }));
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading Items...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
            Available Items
          </h2>
          <p className="text-gray-600 text-sm md:text-base">
            Click On Any Item To Add It To Your Cart
          </p>
        </div>

        {items.length === 0 ? (
          <div className="text-center py-12">
            <ShoppingBag className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 text-lg">No Items Available</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
            {items.map((item) => (
              <div
                key={item._id}
                className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer transform hover:-translate-y-1"
                onClick={() => handleAddToCart(item._id)}
              >
                <div className="p-4 md:p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="bg-indigo-100 p-3 rounded-lg">
                      <ShoppingBag className="w-6 h-6 md:w-8 md:h-8 text-indigo-600" />
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAddToCart(item._id);
                      }}
                      disabled={addingToCart[item._id]}
                      className="bg-indigo-600 text-white p-2 rounded-lg hover:bg-indigo-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Plus className="w-4 h-4 md:w-5 md:h-5" />
                    </button>
                  </div>

                  <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-2 line-clamp-2">
                    {item.name}
                  </h3>

                  {item.description && (
                    <p className="text-gray-600 text-sm md:text-base mb-4 line-clamp-2">
                      {item.description}
                    </p>
                  )}

                  <div className="flex items-center justify-between">
                    <span className="text-2xl md:text-3xl font-bold text-indigo-600">
                      ${item.price?.toFixed(2) || '0.00'}
                    </span>
                    {addingToCart[item._id] && (
                      <span className="text-sm text-gray-500">Adding...</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ItemList;
