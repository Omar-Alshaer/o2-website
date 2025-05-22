const { useState, useEffect } = React;

// Egyptian governorates (in English, no duplicates)
const governorates = [
  'Cairo', 'Alexandria', 'Giza', 'Port Said', 'Suez', 'Ismailia',
  'North Sinai', 'South Sinai', 'Kafr El-Sheikh', 'Dakahlia', 'Sharqia',
  'Qalyubia', 'Gharbia', 'Beheira', 'Monufia', 'Faiyum', 'Beni Suef',
  'Minya', 'Asyut', 'Sohag', 'Qena', 'Luxor', 'Aswan', 'Red Sea',
  'Matruh', 'New Valley', 'Damietta'
];

// Sample products with color-specific images (using placeholders)
const products = [
  { 
    id: 1, 
    code: 'O2-TS001', 
    name: 'O2 Classic Tee', 
    price: 25, 
    category: 'T-shirt', 
    image: 'https://via.placeholder.com/300x400?text=Classic+Tee', 
    sizes: ['S', 'M', 'L', 'XL'], 
    colors: ['Black', 'Grey', 'White'],
    colorImages: {
      Black: 'https://via.placeholder.com/300x400?text=Classic+Tee+Black',
      Grey: 'https://via.placeholder.com/300x400?text=Classic+Tee+Grey',
      White: 'https://via.placeholder.com/300x400?text=Classic+Tee+White'
    }
  },
  { 
    id: 2, 
    code: 'O2-TS002', 
    name: 'O2 Graphic Tee', 
    price: 30, 
    category: 'T-shirt', 
    image: 'https://via.placeholder.com/300x400?text=Graphic+Tee', 
    sizes: ['S', 'M', 'L'], 
    colors: ['Black', 'Charcoal'],
    colorImages: {
      Black: 'https://via.placeholder.com/300x400?text=Graphic+Tee+Black',
      Charcoal: 'https://via.placeholder.com/300x400?text=Graphic+Tee+Charcoal'
    }
  },
  { 
    id: 3, 
    code: 'O2-HD001', 
    name: 'O2 Hoodie', 
    price: 50, 
    category: 'Hoodie', 
    image: 'https://via.placeholder.com/300x400?text=Hoodie', 
    sizes: ['M', 'L', 'XL'], 
    colors: ['Grey', 'Black'],
    colorImages: {
      Grey: 'https://via.placeholder.com/300x400?text=Hoodie+Grey',
      Black: 'https://via.placeholder.com/300x400?text=Hoodie+Black'
    }
  },
  { 
    id: 4, 
    code: 'O2-TS003', 
    name: 'O2 Neon Tee', 
    price: 28, 
    category: 'T-shirt', 
    image: 'https://via.placeholder.com/300x400?text=Neon+Tee', 
    sizes: ['S', 'M'], 
    colors: ['Black', 'White'],
    colorImages: {
      Black: 'https://via.placeholder.com/300x400?text=Neon+Tee+Black',
      White: 'https://via.placeholder.com/300x400?text=Neon+Tee+White'
    }
  }
];

function OrderConfirmationPopup({ cart, onConfirm, onCancel }) {
  const [governorate, setGovernorate] = useState('');
  const [address, setAddress] = useState('');

  const handleConfirm = () => {
    if (!governorate || !address) {
      alert('Please select a governorate and enter an address.');
      return;
    }
    onConfirm(governorate, address);
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <h2>Confirm Your Order</h2>
        <div>
          <h3 className="text-lg font-bold mb-2">Order Details:</h3>
          {cart.map((item, index) => (
            <div key={index} className="mb-2">
              <p>Product: {item.name}</p>
              <p>Code: {item.code}</p>
              <p>Size: {item.size}</p>
              <p>Color: {item.color}</p>
              <p>Quantity: {item.quantity}</p>
              <p>Price: ${item.price * item.quantity}</p>
            </div>
          ))}
          <p className="font-bold">Total: ${total}</p>
        </div>
        <div className="mt-4">
          <label className="block text-sm mb-1">Governorate:</label>
          <select
            value={governorate}
            onChange={(e) => setGovernorate(e.target.value)}
            className="w-full"
          >
            <option value="">Select Governorate</option>
            {governorates.map((gov) => (
              <option key={gov} value={gov}>{gov}</option>
            ))}
          </select>
        </div>
        <div className="mt-4">
          <label className="block text-sm mb-1">Address Details:</label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Enter your full address"
            className="w-full"
          />
        </div>
        <div className="flex justify-end gap-4 mt-6">
          <button
            className="bg-gray-600 hover:bg-gray-500 text-white py-2 px-4 rounded"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            className="bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded"
            onClick={handleConfirm}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}

function App() {
  const [cart, setCart] = useState([]);
  const [selectedSize, setSelectedSize] = useState({});
  const [selectedColor, setSelectedColor] = useState({});
  const [filters, setFilters] = useState({ category: 'All', size: 'All', color: 'All' });
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [email, setEmail] = useState('');
  const [showPopup, setShowPopup] = useState(false);

  // GSAP animations
  useEffect(() => {
    gsap.from('.hero', { opacity: 0, y: 50, duration: 1 });
    gsap.from('.product-card', { opacity: 0, y: 100, stagger: 0.2, duration: 1, scrollTrigger: { trigger: '.gallery', start: 'top 80%' } });
    gsap.from('.product-details', { opacity: 0, x: 100, duration: 1, scrollTrigger: { trigger: '.product-details', start: 'top 80%' } });
    gsap.from('.header', { y: -100, duration: 1, ease: 'bounce.out' });
    gsap.from('.header a', { opacity: 0, y: 20, stagger: 0.1, duration: 0.5, delay: 0.5 });
    gsap.from('.footer', { opacity: 0, y: 50, duration: 1, delay: 0.5 });
    gsap.from('.footer .social-icon', { opacity: 0, scale: 0, stagger: 0.2, duration: 0.5, delay: 1 });
  }, [currentPage]);

  // Filter products
  const filteredProducts = products.filter(product => {
    return (
      (filters.category === 'All' || product.category === filters.category) &&
      (filters.size === 'All' || product.sizes.includes(filters.size)) &&
      (filters.color === 'All' || product.colors.includes(filters.color))
    );
  });

  const addToCart = (product) => {
    const size = selectedSize[product.id] || product.sizes[0];
    const color = selectedColor[product.id] || product.colors[0];
    setCart([...cart, { ...product, size, color, quantity: 1 }]);
  };

  const updateQuantity = (index, delta) => {
    const newCart = [...cart];
    newCart[index].quantity = Math.max(1, newCart[index].quantity + delta);
    setCart(newCart);
  };

  const removeFromCart = (index) => {
    setCart(cart.filter((_, i) => i !== index));
  };

  const proceedToWhatsApp = () => {
    setShowPopup(true);
  };

  const confirmOrder = (governorate, address) => {
    const message = cart.map(item => 
      `Product: ${item.name}, Code: ${item.code}, Size: ${item.size}, Color: ${item.color}, Quantity: ${item.quantity}`
    ).join('\n');
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const encodedMessage = encodeURIComponent(
      `Order Confirmation:\n${message}\nTotal: $${total}\nGovernorate: ${governorate}\nAddress: ${address}`
    );
    window.open(`https://wa.me/+201283548248?text=${encodedMessage}`, '_blank');
    setShowPopup(false);
  };

  const handleSubscribe = async () => {
    if (!email) {
      alert('Please enter a valid email.');
      return;
    }
    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
      if (response.ok) {
        alert('Subscribed successfully!');
        setEmail('');
      } else {
        alert('Failed to subscribe. Please try again.');
      }
    } catch (error) {
      alert('Error: ' + error.message);
    }
  };

  const navigateTo = (page, productId = null) => {
    setCurrentPage(page);
    setSelectedProductId(productId);
    window.scrollTo(0, 0);
  };

  // Home Page
  const HomePage = () => (
    <div>
      <section className="hero min-h-screen flex items-center justify-center text-center">
        <div>
          <h2 className="text-5xl font-bold mb-4">O2: Wear the Vibe, Own the Scene</h2>
          <p className="text-xl mb-6">Trendy streetwear for the fearless Gen-Z.</p>
          <a href="#shop" onClick={() => navigateTo('shop')} className="bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded">Shop Now</a>
        </div>
      </section>
      <section className="gallery py-12 px-6">
        <h2 className="text-3xl font-bold text-center mb-8">Our Collection</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {products.map(product => (
            <div 
              key={product.id} 
              className="product-card bg-gray-900 p-4 rounded-lg shadow-lg cursor-pointer"
              onClick={() => navigateTo('product', product.id)}
            >
              <img src={product.image} alt={product.name} className="w-full h-64 object-cover rounded" />
              <h3 className="text-xl font-bold mt-4 text-center">{product.name}</h3>
            </div>
          ))}
        </div>
      </section>
    </div>
  );

  // Shop Page
  const ShopPage = () => (
    <section className="gallery py-12 px-6">
      <h2 className="text-3xl font-bold text-center mb-8">Shop Our Collection</h2>
      <div className="flex flex-col md:flex-row">
        <aside className="w-full md:w-1/4 p-4 bg-gray-900 rounded-lg mb-6 md:mr-6">
          <h3 className="text-xl font-bold mb-4">Filters</h3>
          <div className="mb-4">
            <label className="block text-sm mb-2">Category</label>
            <select 
              className="bg-gray-800 text-white p-2 rounded w-full"
              onChange={(e) => setFilters({ ...filters, category: e.target.value })}
            >
              <option value="All">All</option>
              <option value="T-shirt">T-shirt</option>
              <option value="Hoodie">Hoodie</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-sm mb-2">Size</label>
            <select 
              className="bg-gray-800 text-white p-2 rounded w-full"
              onChange={(e) => setFilters({ ...filters, size: e.target.value })}
            >
              <option value="All">All</option>
              <option value="S">S</option>
              <option value="M">M</option>
              <option value="L">L</option>
              <option value="XL">XL</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-sm mb-2">Color</label>
            <select 
              className="bg-gray-800 text-white p-2 rounded w-full"
              onChange={(e) => setFilters({ ...filters, color: e.target.value })}
            >
              <option value="All">All</option>
              <option value="Black">Black</option>
              <option value="Grey">Grey</option>
              <option value="White">White</option>
              <option value="Charcoal">Charcoal</option>
            </select>
          </div>
        </aside>
        <div className="w-full md:w-3/4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {filteredProducts.length === 0 ? (
              <p className="text-center col-span-3">No products match your filters.</p>
            ) : (
              filteredProducts.map(product => (
                <div 
                  key={product.id} 
                  className="product-card bg-gray-900 p-4 rounded-lg shadow-lg cursor-pointer"
                  onClick={() => navigateTo('product', product.id)}
                >
                  <img src={product.image} alt={product.name} className="w-full h-64 object-cover rounded" />
                  <h3 className="text-xl font-bold mt-4">{product.name}</h3>
                  <p className="text-gray-400">Code: ${product.code}</p>
                  <p className="text-gray-400">Price: ${product.price}</p>
                  <p className="text-gray-400">Category: ${product.category}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );

  // Product Details Page
  const ProductDetailsPage = () => {
    const product = products.find(p => p.id === selectedProductId);
    if (!product) return <p className="text-center py-12">Product not found.</p>;

    return (
      <section className="product-details py-12 px-6">
        <h2 className="text-3xl font-bold mb-8">{product.name}</h2>
        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-1/2">
            <img 
              src={selectedColor[product.id] ? product.colorImages[selectedColor[product.id]] : product.image} 
              alt={product.name} 
              className="w-full h-96 object-cover rounded"
            />
            <div className="flex gap-4 mt-4">
              {product.colors.map(color => (
                <img 
                  key={color}
                  src={product.colorImages[color]} 
                  alt={`${product.name} ${color}`}
                  className={`w-20 h-20 object-cover rounded cursor-pointer ${selectedColor[product.id] === color ? 'border-2 border-white' : ''}`}
                  onClick={() => setSelectedColor({ ...selectedColor, [product.id]: color })}
                />
              ))}
            </div>
          </div>
          <div className="w-full md:w-1/2">
            <p className="text-gray-400">Code: ${product.code}</p>
            <p className="text-gray-400">Price: ${product.price}</p>
            <p className="text-gray-400">Category: ${product.category}</p>
            <div className="mt-4">
              <label className="block text-sm">Size:</label>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map(size => (
                  <button
                    key={size}
                    className={`px-3 py-1 rounded-full border ${selectedSize[product.id] === size ? 'bg-gray-700 border-gray-500' : 'bg-gray-800 border-gray-600'} hover:bg-gray-600`}
                    onClick={() => setSelectedSize({ ...selectedSize, [product.id]: size })}
                  >
                    {size}
                  </button>
                ))}
              </div>
              <p className="text-sm text-gray-500 mt-1">Available: ${product.sizes.join(', ')}</p>
            </div>
            <div className="mt-4">
              <label className="block text-sm">Color:</label>
              <div className="flex flex-wrap gap-2">
                {product.colors.map(color => (
                  <button
                    key={color}
                    className={`w-8 h-8 rounded-full border ${selectedColor[product.id] === color ? 'border-white' : 'border-gray-600'} color-swatch`}
                    style={{ backgroundColor: color.toLowerCase() }}
                    onClick={() => setSelectedColor({ ...selectedColor, [product.id]: color })}
                  />
                ))}
              </div>
              <p className="text-sm text-gray-500 mt-1">Available: ${product.colors.join(', ')}</p>
            </div>
            <button 
              className="bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded mt-6 w-full"
              onClick={() => addToCart(product)}
            >
              Add to Cart
            </button>
            <button 
              className="bg-gray-600 hover:bg-gray-500 text-white py-2 px-4 rounded mt-2 w-full"
              onClick={() => navigateTo('shop')}
            >
              Back to Shop
            </button>
          </div>
        </div>
      </section>
    );
  };

  // Cart Page
  const CartPage = () => (
    <section className="py-12 px-6">
      <h2 className="text-3xl font-bold text-center mb-8">Your Cart</h2>
      {cart.length === 0 ? (
        <p className="text-center">Your cart is empty.</p>
      ) : (
        <div>
          {cart.map((item, index) => (
            <div key={index} className="bg-gray-900 p-4 rounded-lg mb-4 flex justify-between items-center">
              <div>
                <h3 className="text-lg font-bold">{item.name}</h3>
                <p className="text-gray-400">Code: ${item.code}</p>
                <p className="text-gray-400">Size: ${item.size}</p>
                <p className="text-gray-400">Color: ${item.color}</p>
                <p className="text-gray-400">Price: ${item.price}</p>
                <p className="text-gray-400">Quantity: ${item.quantity}</p>
              </div>
              <div className="flex items-center">
                <button 
                  className="bg-gray-700 hover:bg-gray-600 text-white py-1 px-2 rounded mr-2"
                  onClick={() => updateQuantity(index, -1)}
                >
                  -
                </button>
                <button 
                  className="bg-gray-700 hover:bg-gray-600 text-white py-1 px-2 rounded mr-2"
                  onClick={() => updateQuantity(index, 1)}
                >
                  +
                </button>
                <button 
                  className="bg-red-600 hover:bg-red-500 text-white py-1 px-2 rounded"
                  onClick={() => removeFromCart(index)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
          <p className="text-xl font-bold text-right">Total: ${cart.reduce((sum, item) => sum + item.price * item.quantity, 0)}</p>
          <button 
            className="bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded mt-4 w-full"
            onClick={proceedToWhatsApp}
          >
            Confirm Order on WhatsApp
          </button>
        </div>
      )}
      {showPopup && (
        <OrderConfirmationPopup
          cart={cart}
          onConfirm={confirmOrder}
          onCancel={() => setShowPopup(false)}
        />
      )}
    </section>
  );

  // Main App
  return (
    <div>
      <header className="header py-4 px-6 flex justify-between items-center bg-black/80 backdrop-blur-md sticky top-0 z-10 shadow-lg">
        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-300 to-gray-500">O2</h1>
        <nav className="flex items-center">
          <a href="#home" onClick={() => navigateTo('home')} className="nav-link mx-4 text-lg relative">Home</a>
          <a href="#shop" onClick={() => navigateTo('shop')} className="nav-link mx-4 text-lg relative">Shop</a>
          <a href="#cart" onClick={() => navigateTo('cart')} className="nav-link mx-4 text-lg relative flex items-center">
            <i className="fas fa-shopping-cart mr-2"></i>
            Cart
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {cart.length}
              </span>
            )}
          </a>
        </nav>
      </header>
      {currentPage === 'home' && <HomePage />}
      {currentPage === 'shop' && <ShopPage />}
      {currentPage === 'product' && <ProductDetailsPage />}
      {currentPage === 'cart' && <CartPage />}
      <footer className="footer py-8 px-6 bg-black text-center">
        <div className="mb-4">
          <h3 className="text-xl font-bold mb-2">Stay Connected</h3>
          <div className="flex justify-center gap-4">
            <a href="https://instagram.com" target="_blank" className="social-icon text-2xl hover:text-gray-400"><i className="fab fa-instagram"></i></a>
            <a href="https://twitter.com" target="_blank" className="social-icon text-2xl hover:text-gray-400"><i className="fab fa-twitter"></i></a>
            <a href="https://facebook.com" target="_blank" className="social-icon text-2xl hover:text-gray-400"><i className="fab fa-facebook"></i></a>
          </div>
        </div>
        <div className="mb-4">
          <h3 className="text-lg font-bold mb-2">Join Our Newsletter</h3>
          <div className="flex justify-center">
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="bg-gray-800 text-white p-2 rounded-l w-64"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button 
              className="bg-gray-700 hover:bg-gray-600 text-white p-2 rounded-r"
              onClick={handleSubscribe}
            >
              Subscribe
            </button>
          </div>
        </div>
        <p>© 2025 O2. All rights reserved.</p>
      </footer>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
