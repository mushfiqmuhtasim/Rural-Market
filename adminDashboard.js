// Admin Dashboard JavaScript

// Initialize Dashboard on Page Load
document.addEventListener('DOMContentLoaded', function() {
  initializeDashboard();
  loadDashboardData();
  setupNavigation();
  setCurrentDate();
});

// Initialize Dashboard
function initializeDashboard() {
  loadDashboardStats();
  loadRecentOrders();
  loadNewUsers();
}

// Set Current Date
function setCurrentDate() {
  const dateElement = document.getElementById('current-date');
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const today = new Date();
  dateElement.textContent = today.toLocaleDateString('en-US', options);
}

// Setup Navigation
function setupNavigation() {
  const navItems = document.querySelectorAll('.nav-item');
  navItems.forEach(item => {
    item.addEventListener('click', function(e) {
      e.preventDefault();
      
      // Remove active class from all nav items
      navItems.forEach(nav => nav.classList.remove('active'));
      
      // Add active class to clicked item
      this.classList.add('active');
      
      // Get section name
      const section = this.getAttribute('data-section');
      
      // Hide all content sections
      document.querySelectorAll('.content-section').forEach(section => {
        section.classList.remove('active');
      });
      
      // Show selected section
      if (section) {
        const sectionElement = document.getElementById(section + '-section');
        if (sectionElement) {
          sectionElement.classList.add('active');
          
          // Load section data
          switch(section) {
            case 'users':
              loadUsers();
              break;
            case 'sellers':
              loadSellers();
              break;
            case 'products':
              loadProducts();
              break;
            case 'orders':
              loadOrders();
              break;
            case 'categories':
              loadCategories();
              break;
          }
        }
      }
    });
  });
}

// Load Dashboard Data
function loadDashboardData() {
  // This would typically fetch from your backend API
  fetch('adminAPI.php?action=getDashboardStats')
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        updateDashboardStats(data);
      }
    })
    .catch(error => console.error('Error loading dashboard data:', error));
}

// Load Dashboard Stats
function loadDashboardStats() {
  // Sample data - replace with actual API call
  const stats = {
    totalUsers: 1250,
    totalSellers: 85,
    totalProducts: 3420,
    totalOrders: 5680,
    totalRevenue: '৳ 45,50,000',
    pendingOrders: 142
  };

  document.getElementById('total-users').textContent = stats.totalUsers;
  document.getElementById('total-sellers').textContent = stats.totalSellers;
  document.getElementById('total-products').textContent = stats.totalProducts;
  document.getElementById('total-orders').textContent = stats.totalOrders;
  document.getElementById('total-revenue').textContent = stats.totalRevenue;
  document.getElementById('pending-orders').textContent = stats.pendingOrders;
}

// Load Recent Orders
function loadRecentOrders() {
  const ordersTable = document.getElementById('recent-orders-table');
  
  // Sample data - replace with actual API call
  const orders = [
    {
      orderId: '#RM-10254',
      customer: 'Fatima Khan',
      seller: 'Green Harvest',
      amount: '৳ 3,500',
      status: 'shipped',
      date: '2024-01-18'
    },
    {
      orderId: '#RM-10253',
      customer: 'Rahul Sharma',
      seller: 'Craft Village',
      amount: '৳ 2,200',
      status: 'delivered',
      date: '2024-01-17'
    },
    {
      orderId: '#RM-10252',
      customer: 'Aisha Begum',
      seller: 'Organic Farmers',
      amount: '৳ 1,850',
      status: 'processing',
      date: '2024-01-16'
    },
    {
      orderId: '#RM-10251',
      customer: 'Karim Ahmed',
      seller: 'Handcraft Hub',
      amount: '৳ 4,200',
      status: 'pending',
      date: '2024-01-15'
    }
  ];

  ordersTable.innerHTML = orders.map(order => `
    <tr>
      <td><strong>${order.orderId}</strong></td>
      <td>${order.customer}</td>
      <td>${order.seller}</td>
      <td>${order.amount}</td>
      <td><span class="badge badge-${order.status}">${order.status}</span></td>
      <td>${order.date}</td>
    </tr>
  `).join('');
}

// Load New Users
function loadNewUsers() {
  const usersTable = document.getElementById('new-users-table');
  
  // Sample data - replace with actual API call
  const users = [
    {
      userId: 'U-2841',
      name: 'Noor Fatima',
      email: 'noor@example.com',
      role: 'Buyer',
      dateJoined: '2024-01-18'
    },
    {
      userId: 'U-2840',
      name: 'Hassan Khan',
      email: 'hassan@example.com',
      role: 'Seller',
      dateJoined: '2024-01-17'
    },
    {
      userId: 'U-2839',
      name: 'Saira Ahmed',
      email: 'saira@example.com',
      role: 'Buyer',
      dateJoined: '2024-01-16'
    }
  ];

  usersTable.innerHTML = users.map(user => `
    <tr>
      <td><strong>${user.userId}</strong></td>
      <td>${user.name}</td>
      <td>${user.email}</td>
      <td>${user.role}</td>
      <td>${user.dateJoined}</td>
    </tr>
  `).join('');
}

// Load Users
function loadUsers() {
  const usersTable = document.getElementById('users-table');
  
  // Sample data - replace with actual API call
  const users = [
    {
      userId: 'U-2841',
      name: 'Noor Fatima',
      email: 'noor@example.com',
      phone: '+880-1700-000001',
      role: 'Buyer',
      status: 'active'
    },
    {
      userId: 'U-2840',
      name: 'Hassan Khan',
      email: 'hassan@example.com',
      phone: '+880-1700-000002',
      role: 'Seller',
      status: 'active'
    },
    {
      userId: 'U-2839',
      name: 'Saira Ahmed',
      email: 'saira@example.com',
      phone: '+880-1700-000003',
      role: 'Buyer',
      status: 'inactive'
    }
  ];

  usersTable.innerHTML = users.map(user => `
    <tr>
      <td><strong>${user.userId}</strong></td>
      <td>${user.name}</td>
      <td>${user.email}</td>
      <td>${user.phone}</td>
      <td>${user.role}</td>
      <td><span class="badge badge-${user.status}">${user.status}</span></td>
      <td>
        <div class="action-buttons">
          <button class="btn btn-view btn-sm" onclick="viewUser('${user.userId}')">View</button>
          <button class="btn btn-edit btn-sm" onclick="editUser('${user.userId}')">Edit</button>
          <button class="btn btn-delete btn-sm" onclick="deleteUser('${user.userId}')">Delete</button>
        </div>
      </td>
    </tr>
  `).join('');
}

// Load Sellers
function loadSellers() {
  const sellersTable = document.getElementById('sellers-table');
  
  // Sample data - replace with actual API call
  const sellers = [
    {
      sellerId: 'S-521',
      businessName: 'Green Harvest',
      ownerName: 'Rashid Ahmed',
      email: 'rashid@greenharvest.com',
      products: 45,
      rating: '4.8',
      status: 'active'
    },
    {
      sellerId: 'S-520',
      businessName: 'Craft Village',
      ownerName: 'Sultana Begum',
      email: 'sultana@craftvillage.com',
      products: 32,
      rating: '4.6',
      status: 'active'
    },
    {
      sellerId: 'S-519',
      businessName: 'Handcraft Hub',
      ownerName: 'Karim Khan',
      email: 'karim@handcrafthub.com',
      products: 28,
      rating: '4.5',
      status: 'pending'
    }
  ];

  sellersTable.innerHTML = sellers.map(seller => `
    <tr>
      <td><strong>${seller.sellerId}</strong></td>
      <td>${seller.businessName}</td>
      <td>${seller.ownerName}</td>
      <td>${seller.email}</td>
      <td>${seller.products}</td>
      <td>${seller.rating}★</td>
      <td><span class="badge badge-${seller.status}">${seller.status}</span></td>
      <td>
        <div class="action-buttons">
          <button class="btn btn-view btn-sm" onclick="viewSeller('${seller.sellerId}')">View</button>
          ${seller.status === 'pending' ? 
            `<button class="btn btn-approve btn-sm" onclick="approveSeller('${seller.sellerId}')">Approve</button>
             <button class="btn btn-reject btn-sm" onclick="rejectSeller('${seller.sellerId}')">Reject</button>` :
            `<button class="btn btn-edit btn-sm" onclick="editSeller('${seller.sellerId}')">Edit</button>`
          }
        </div>
      </td>
    </tr>
  `).join('');
}

// Load Products
function loadProducts() {
  const productsTable = document.getElementById('products-table');
  
  // Sample data - replace with actual API call
  const products = [
    {
      productId: 'P-8521',
      name: 'Handwoven Silk Saree',
      seller: 'Green Harvest',
      category: 'Textiles',
      price: '৳ 4,500',
      stock: 12,
      status: 'active'
    },
    {
      productId: 'P-8520',
      name: 'Organic Rice (5kg)',
      seller: 'Organic Farmers',
      category: 'Agriculture',
      price: '৳ 450',
      stock: 85,
      status: 'active'
    },
    {
      productId: 'P-8519',
      name: 'Terracotta Vase',
      seller: 'Craft Village',
      category: 'Handicrafts',
      price: '৳ 600',
      stock: 0,
      status: 'inactive'
    }
  ];

  productsTable.innerHTML = products.map(product => `
    <tr>
      <td><strong>${product.productId}</strong></td>
      <td>${product.name}</td>
      <td>${product.seller}</td>
      <td>${product.category}</td>
      <td>${product.price}</td>
      <td>${product.stock}</td>
      <td><span class="badge badge-${product.status}">${product.status}</span></td>
      <td>
        <div class="action-buttons">
          <button class="btn btn-view btn-sm" onclick="viewProduct('${product.productId}')">View</button>
          <button class="btn btn-edit btn-sm" onclick="editProduct('${product.productId}')">Edit</button>
          <button class="btn btn-delete btn-sm" onclick="deleteProduct('${product.productId}')">Delete</button>
        </div>
      </td>
    </tr>
  `).join('');
}

// Load Orders
function loadOrders() {
  const ordersTable = document.getElementById('orders-table');
  
  // Sample data - replace with actual API call
  const orders = [
    {
      orderId: '#RM-10254',
      customer: 'Fatima Khan',
      seller: 'Green Harvest',
      amount: '৳ 3,500',
      status: 'shipped',
      payment: 'Completed',
      date: '2024-01-18'
    },
    {
      orderId: '#RM-10253',
      customer: 'Rahul Sharma',
      seller: 'Craft Village',
      amount: '৳ 2,200',
      status: 'delivered',
      payment: 'Completed',
      date: '2024-01-17'
    },
    {
      orderId: '#RM-10252',
      customer: 'Aisha Begum',
      seller: 'Organic Farmers',
      amount: '৳ 1,850',
      status: 'processing',
      payment: 'Completed',
      date: '2024-01-16'
    }
  ];

  ordersTable.innerHTML = orders.map(order => `
    <tr>
      <td><strong>${order.orderId}</strong></td>
      <td>${order.customer}</td>
      <td>${order.seller}</td>
      <td>${order.amount}</td>
      <td><span class="badge badge-${order.status}">${order.status}</span></td>
      <td>${order.payment}</td>
      <td>${order.date}</td>
      <td>
        <div class="action-buttons">
          <button class="btn btn-view btn-sm" onclick="viewOrder('${order.orderId}')">View</button>
          <button class="btn btn-edit btn-sm" onclick="editOrder('${order.orderId}')">Edit</button>
        </div>
      </td>
    </tr>
  `).join('');
}

// Load Categories
function loadCategories() {
  const categoriesTable = document.getElementById('categories-table');
  
  // Sample data - replace with actual API call
  const categories = [
    {
      categoryId: 'C-001',
      name: 'Agriculture',
      products: 125,
      description: 'Fresh agricultural products and organic goods',
      status: 'active'
    },
    {
      categoryId: 'C-002',
      name: 'Textiles',
      products: 87,
      description: 'Traditional and modern textiles',
      status: 'active'
    },
    {
      categoryId: 'C-003',
      name: 'Handicrafts',
      products: 156,
      description: 'Handmade crafts and artisan products',
      status: 'active'
    }
  ];

  categoriesTable.innerHTML = categories.map(cat => `
    <tr>
      <td><strong>${cat.categoryId}</strong></td>
      <td>${cat.name}</td>
      <td>${cat.products}</td>
      <td>${cat.description}</td>
      <td><span class="badge badge-${cat.status}">${cat.status}</span></td>
      <td>
        <div class="action-buttons">
          <button class="btn btn-edit btn-sm" onclick="editCategory('${cat.categoryId}')">Edit</button>
          <button class="btn btn-delete btn-sm" onclick="deleteCategory('${cat.categoryId}')">Delete</button>
        </div>
      </td>
    </tr>
  `).join('');
}

// Filter Orders
function filterOrders() {
  const filter = document.getElementById('order-filter').value;
  // Reload orders with filter
  loadOrders();
}

// Modal Functions
function openUserModal() {
  alert('Add New User Modal - Implement modal functionality');
}

function openSellerModal() {
  alert('Approve Seller Modal - Implement modal functionality');
}

function openProductModal() {
  alert('Add Product Modal - Implement modal functionality');
}

function openCategoryModal() {
  alert('Add Category Modal - Implement modal functionality');
}

// Action Functions
function viewUser(userId) {
  console.log('View user:', userId);
  alert('View user ' + userId + ' - Implement view functionality');
}

function editUser(userId) {
  console.log('Edit user:', userId);
  alert('Edit user ' + userId + ' - Implement edit functionality');
}

function deleteUser(userId) {
  if (confirm('Are you sure you want to delete this user?')) {
    console.log('Delete user:', userId);
    alert('User ' + userId + ' deleted - Implement delete functionality');
  }
}

function viewSeller(sellerId) {
  console.log('View seller:', sellerId);
  alert('View seller ' + sellerId + ' - Implement view functionality');
}

function editSeller(sellerId) {
  console.log('Edit seller:', sellerId);
  alert('Edit seller ' + sellerId + ' - Implement edit functionality');
}

function approveSeller(sellerId) {
  if (confirm('Are you sure you want to approve this seller?')) {
    console.log('Approve seller:', sellerId);
    alert('Seller ' + sellerId + ' approved - Implement approve functionality');
  }
}

function rejectSeller(sellerId) {
  if (confirm('Are you sure you want to reject this seller?')) {
    console.log('Reject seller:', sellerId);
    alert('Seller ' + sellerId + ' rejected - Implement reject functionality');
  }
}

function viewProduct(productId) {
  console.log('View product:', productId);
  alert('View product ' + productId + ' - Implement view functionality');
}

function editProduct(productId) {
  console.log('Edit product:', productId);
  alert('Edit product ' + productId + ' - Implement edit functionality');
}

function deleteProduct(productId) {
  if (confirm('Are you sure you want to delete this product?')) {
    console.log('Delete product:', productId);
    alert('Product ' + productId + ' deleted - Implement delete functionality');
  }
}

function viewOrder(orderId) {
  console.log('View order:', orderId);
  alert('View order ' + orderId + ' - Implement view functionality');
}

function editOrder(orderId) {
  console.log('Edit order:', orderId);
  alert('Edit order ' + orderId + ' - Implement edit functionality');
}

function editCategory(categoryId) {
  console.log('Edit category:', categoryId);
  alert('Edit category ' + categoryId + ' - Implement edit functionality');
}

function deleteCategory(categoryId) {
  if (confirm('Are you sure you want to delete this category?')) {
    console.log('Delete category:', categoryId);
    alert('Category ' + categoryId + ' deleted - Implement delete functionality');
  }
}

// Logout
function logout() {
  if (confirm('Are you sure you want to logout?')) {
    app.logoutUser();
    window.location.href = 'homepage.html';
  }
}

// Search functionality
document.addEventListener('DOMContentLoaded', function() {
  const searchInputs = document.querySelectorAll('.search-input');
  
  searchInputs.forEach(input => {
    input.addEventListener('keyup', function(e) {
      const searchTerm = this.value.toLowerCase();
      const table = this.closest('section').querySelector('.dashboard-table');
      
      if (table) {
        const rows = table.querySelectorAll('tbody tr');
        rows.forEach(row => {
          const text = row.textContent.toLowerCase();
          if (text.includes(searchTerm)) {
            row.style.display = '';
          } else {
            row.style.display = 'none';
          }
        });
      }
    });
  });
});
