// Rural Market - Shared Application Logic
// Uses localStorage for client-side data management

class RuralMarketApp {
  constructor() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser')) || null;
    this.users = JSON.parse(localStorage.getItem('users')) || [];
    this.products = JSON.parse(localStorage.getItem('products')) || this.initializeProducts();
    this.orders = JSON.parse(localStorage.getItem('orders')) || [];
    this.cart = JSON.parse(localStorage.getItem('cart')) || [];
    this.sellers = JSON.parse(localStorage.getItem('sellers')) || this.initializeSellers();
  }

  // Initialize default products
  initializeProducts() {
    const products = [
      {
        id: 'P001',
        name: 'Handwoven Silk Saree',
        category: 'Textiles',
        price: 3500,
        seller: 'Amir\'s Shop',
        sellerId: 'S001',
        rating: 4.8,
        reviews: 24,
        image: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="200" height="150"%3E%3Crect fill="%23d4a574" width="200" height="150"/%3E%3Ctext x="50%" y="50%" font-size="18" fill="%23fff" text-anchor="middle" dy=".3em"%3ESilk Saree%3C/text%3E%3C/svg%3E',
        stock: 15,
        description: 'Traditional handwoven silk saree with intricate patterns'
      },
      {
        id: 'P002',
        name: 'Organic Rice (5kg)',
        category: 'Agriculture',
        price: 450,
        seller: 'Green Harvest Farm',
        sellerId: 'S002',
        rating: 4.9,
        reviews: 42,
        image: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="200" height="150"%3E%3Crect fill="%23c8a882" width="200" height="150"/%3E%3Ctext x="50%" y="50%" font-size="18" fill="%23fff" text-anchor="middle" dy=".3em"%3EOrganic Rice%3C/text%3E%3C/svg%3E',
        stock: 50,
        description: 'Premium organic rice from local farmers'
      },
      {
        id: 'P003',
        name: 'Terracotta Vase',
        category: 'Handicrafts',
        price: 600,
        seller: 'Craft Village',
        sellerId: 'S003',
        rating: 4.7,
        reviews: 18,
        image: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="200" height="150"%3E%3Crect fill="%23c65d3b" width="200" height="150"/%3E%3Ctext x="50%" y="50%" font-size="18" fill="%23fff" text-anchor="middle" dy=".3em"%3ETerracotta Vase%3C/text%3E%3C/svg%3E',
        stock: 8,
        description: 'Handcrafted terracotta vase with traditional design'
      },
      {
        id: 'P004',
        name: 'Bamboo Handicraft',
        category: 'Handicrafts',
        price: 850,
        seller: 'Amir\'s Shop',
        sellerId: 'S001',
        rating: 4.6,
        reviews: 15,
        image: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="200" height="150"%3E%3Crect fill="%238fbc8f" width="200" height="150"/%3E%3Ctext x="50%" y="50%" font-size="18" fill="%23fff" text-anchor="middle" dy=".3em"%3EBamboo Craft%3C/text%3E%3C/svg%3E',
        stock: 12,
        description: 'Beautiful bamboo handicraft items'
      },
      {
        id: 'P005',
        name: 'Fresh Vegetables Box',
        category: 'Agriculture',
        price: 300,
        seller: 'Green Harvest Farm',
        sellerId: 'S002',
        rating: 4.8,
        reviews: 35,
        image: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="200" height="150"%3E%3Crect fill="%2390ee90" width="200" height="150"/%3E%3Ctext x="50%" y="50%" font-size="18" fill="%23000" text-anchor="middle" dy=".3em"%3EVegetables%3C/text%3E%3C/svg%3E',
        stock: 30,
        description: 'Fresh organic vegetables delivered weekly'
      },
      {
        id: 'P006',
        name: 'Cotton Bedsheet',
        category: 'Textiles',
        price: 1200,
        seller: 'Textile House',
        sellerId: 'S004',
        rating: 4.7,
        reviews: 28,
        image: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="200" height="150"%3E%3Crect fill="%23b0e0e6" width="200" height="150"/%3E%3Ctext x="50%" y="50%" font-size="18" fill="%23000" text-anchor="middle" dy=".3em"%3EBedsheet%3C/text%3E%3C/svg%3E',
        stock: 25,
        description: 'Premium cotton bedsheet set'
      },
      {
        id: 'P007',
        name: 'Honey (500ml)',
        category: 'Agriculture',
        price: 550,
        seller: 'Bee Farm Co.',
        sellerId: 'S005',
        rating: 4.9,
        reviews: 52,
        image: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="200" height="150"%3E%3Crect fill="%23ffd700" width="200" height="150"/%3E%3Ctext x="50%" y="50%" font-size="18" fill="%23000" text-anchor="middle" dy=".3em"%3EHoney%3C/text%3E%3C/svg%3E',
        stock: 40,
        description: 'Pure organic honey from local beekeepers'
      },
      {
        id: 'P008',
        name: 'Embroidered Pillow Cover',
        category: 'Handicrafts',
        price: 400,
        seller: 'Craft Village',
        sellerId: 'S003',
        rating: 4.5,
        reviews: 12,
        image: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="200" height="150"%3E%3Crect fill="%23ffb6c1" width="200" height="150"/%3E%3Ctext x="50%" y="50%" font-size="18" fill="%23fff" text-anchor="middle" dy=".3em"%3EPillow Cover%3C/text%3E%3C/svg%3E',
        stock: 20,
        description: 'Hand embroidered decorative pillow covers'
      }
    ];
    localStorage.setItem('products', JSON.stringify(products));
    return products;
  }

  // Initialize default sellers
  initializeSellers() {
    const sellers = [
      {
        id: 'S001',
        name: 'Amir\'s Shop',
        owner: 'Amir Khan',
        email: 'amir@shop.com',
        phone: '+880-1700-000001',
        rating: 4.8,
        products: 12,
        status: 'active'
      },
      {
        id: 'S002',
        name: 'Green Harvest Farm',
        owner: 'Rashid Ahmed',
        email: 'rashid@farm.com',
        phone: '+880-1700-000002',
        rating: 4.9,
        products: 20,
        status: 'active'
      },
      {
        id: 'S003',
        name: 'Craft Village',
        owner: 'Fatima Begum',
        email: 'fatima@craft.com',
        phone: '+880-1700-000003',
        rating: 4.7,
        products: 18,
        status: 'active'
      },
      {
        id: 'S004',
        name: 'Textile House',
        owner: 'Karim Ahmed',
        email: 'karim@textile.com',
        phone: '+880-1700-000004',
        rating: 4.7,
        products: 15,
        status: 'active'
      },
      {
        id: 'S005',
        name: 'Bee Farm Co.',
        owner: 'Nasir Uddin',
        email: 'nasir@beefarm.com',
        phone: '+880-1700-000005',
        rating: 4.9,
        products: 8,
        status: 'active'
      }
    ];
    localStorage.setItem('sellers', JSON.stringify(sellers));
    return sellers;
  }

  // Save current state to localStorage
  save() {
    localStorage.setItem('users', JSON.stringify(this.users));
    localStorage.setItem('products', JSON.stringify(this.products));
    localStorage.setItem('orders', JSON.stringify(this.orders));
    localStorage.setItem('cart', JSON.stringify(this.cart));
    localStorage.setItem('sellers', JSON.stringify(this.sellers));
    localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
  }

  // User Management
  registerUser(userData) {
    const newUser = {
      id: 'U' + Date.now(),
      ...userData,
      createdAt: new Date().toISOString(),
      status: 'active'
    };

    // Check if email already exists
    if (this.users.find(u => u.email === userData.email)) {
      return { success: false, message: 'Email already registered' };
    }

    this.users.push(newUser);
    this.save();
    return { success: true, message: 'User registered successfully', user: newUser };
  }

  loginUser(email, password) {
    const user = this.users.find(u => u.email === email && u.password === password);
    
    if (!user) {
      return { success: false, message: 'Invalid email or password' };
    }

    this.currentUser = user;
    this.save();
    return { success: true, message: 'Login successful', user };
  }

  logoutUser() {
    this.currentUser = null;
    localStorage.removeItem('currentUser');
    localStorage.removeItem('cart');
  }

  updateUser(updates) {
    if (!this.currentUser) return { success: false };
    
    const index = this.users.findIndex(u => u.id === this.currentUser.id);
    if (index !== -1) {
      this.users[index] = { ...this.users[index], ...updates };
      this.currentUser = this.users[index];
      this.save();
      return { success: true };
    }
    return { success: false };
  }

  // Cart Management
  addToCart(productId, quantity = 1) {
    if (!this.currentUser) {
      return { success: false, message: 'Please login first' };
    }

    const product = this.products.find(p => p.id === productId);
    if (!product) {
      return { success: false, message: 'Product not found' };
    }

    if (product.stock < quantity) {
      return { success: false, message: 'Insufficient stock' };
    }

    const cartItem = this.cart.find(item => item.id === productId);
    if (cartItem) {
      cartItem.quantity += quantity;
    } else {
      this.cart.push({
        id: productId,
        name: product.name,
        price: product.price,
        seller: product.seller,
        quantity,
        image: product.image
      });
    }

    this.save();
    return { success: true, message: 'Added to cart', cart: this.cart };
  }

  removeFromCart(productId) {
    this.cart = this.cart.filter(item => item.id !== productId);
    this.save();
    return { success: true, cart: this.cart };
  }

  updateCartQuantity(productId, quantity) {
    const cartItem = this.cart.find(item => item.id === productId);
    if (cartItem) {
      if (quantity <= 0) {
        this.removeFromCart(productId);
      } else {
        const product = this.products.find(p => p.id === productId);
        if (product && product.stock >= quantity) {
          cartItem.quantity = quantity;
          this.save();
          return { success: true };
        }
        return { success: false, message: 'Insufficient stock' };
      }
    }
    return { success: false };
  }

  clearCart() {
    this.cart = [];
    this.save();
  }

  getCartTotal() {
    return this.cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  }

  // Order Management
  createOrder(orderData) {
    if (!this.currentUser || this.cart.length === 0) {
      return { success: false, message: 'Invalid order' };
    }

    const order = {
      id: '#RM' + Date.now(),
      customerId: this.currentUser.id,
      customerName: this.currentUser.fullName,
      items: [...this.cart],
      totalAmount: this.getCartTotal(),
      status: 'pending',
      paymentStatus: 'completed',
      shippingAddress: orderData.shippingAddress,
      orderDate: new Date().toISOString(),
      estimatedDelivery: new Date(Date.now() + 7*24*60*60*1000).toISOString()
    };

    // Update product stock
    this.cart.forEach(item => {
      const product = this.products.find(p => p.id === item.id);
      if (product) {
        product.stock -= item.quantity;
      }
    });

    this.orders.push(order);
    this.clearCart();
    this.save();

    return { success: true, message: 'Order placed successfully', order };
  }

  getOrders(userId = null) {
    if (userId) {
      return this.orders.filter(o => o.customerId === userId);
    }
    return this.orders;
  }

  updateOrderStatus(orderId, status) {
    const order = this.orders.find(o => o.id === orderId);
    if (order) {
      order.status = status;
      this.save();
      return { success: true };
    }
    return { success: false };
  }

  // Product Management
  getProducts(filters = {}) {
    let products = [...this.products];

    if (filters.category) {
      products = products.filter(p => p.category === filters.category);
    }

    if (filters.search) {
      const search = filters.search.toLowerCase();
      products = products.filter(p => 
        p.name.toLowerCase().includes(search) ||
        p.description.toLowerCase().includes(search)
      );
    }

    if (filters.seller) {
      products = products.filter(p => p.sellerId === filters.seller);
    }

    if (filters.sortBy === 'price-low') {
      products.sort((a, b) => a.price - b.price);
    } else if (filters.sortBy === 'price-high') {
      products.sort((a, b) => b.price - a.price);
    } else if (filters.sortBy === 'rating') {
      products.sort((a, b) => b.rating - a.rating);
    }

    return products;
  }

  getProductById(productId) {
    return this.products.find(p => p.id === productId);
  }

  getCategories() {
    const categories = new Set(this.products.map(p => p.category));
    return Array.from(categories);
  }

  // Seller Functions
  getSellerProducts(sellerId) {
    return this.products.filter(p => p.sellerId === sellerId);
  }

  getSellerById(sellerId) {
    return this.sellers.find(s => s.id === sellerId);
  }

  // Search
  search(query) {
    return this.getProducts({ search: query });
  }
}

// Initialize app globally
const app = new RuralMarketApp();

// Utility Functions
function formatCurrency(amount) {
  return '৳ ' + amount.toLocaleString('en-BD');
}

function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString('en-BD', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
}

function showNotification(message, type = 'info') {
  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.textContent = message;
  notification.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    background: ${type === 'success' ? '#27ae60' : type === 'error' ? '#e74c3c' : '#3498db'};
    color: white;
    padding: 15px 25px;
    border-radius: 6px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    z-index: 9999;
    animation: slideIn 0.3s ease;
  `;
  
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.style.animation = 'slideOut 0.3s ease';
    setTimeout(() => notification.remove(), 300);
  }, 3000);
}

// Check if user is logged in
function isLoggedIn() {
  return app.currentUser !== null;
}

// Redirect if not logged in
function redirectIfNotLoggedIn() {
  if (!isLoggedIn()) {
    window.location.href = 'signin.html';
  }
}

// Redirect if logged in
function redirectIfLoggedIn() {
  if (isLoggedIn()) {
    if (app.currentUser.role === 'seller') {
      window.location.href = 'deshboardSeller.html';
    } else {
      window.location.href = 'buyerDashboard.html';
    }
  }
}

// Update cart count in header
function updateCartCount() {
  const cartElements = document.querySelectorAll('.cart-count, [data-cart-count]');
  cartElements.forEach(el => {
    el.textContent = app.cart.length;
  });
}

// Load app on page ready
document.addEventListener('DOMContentLoaded', updateCartCount);
