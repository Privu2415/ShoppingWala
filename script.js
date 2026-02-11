// 1. DATA
const products = [
  { id: 1, name: "Headphones", category: "electronics", price: 79.99, originalPrice: 99.99, discount: 20, rating: 4.6, reviews: 210, icon: "🎧" },
  { id: 2, name: "Smart Watch", category: "electronics", price: 199.99, originalPrice: 249.99, discount: 20, rating: 4.7, reviews: 340, icon: "⌚" },
  { id: 3, name: "Running Shoes", category: "fashion", price: 89.99, originalPrice: 119.99, discount: 25, rating: 4.5, reviews: 150, icon: "👟" },
  { id: 4, name: "Coffee Maker", category: "home", price: 59.99, originalPrice: 79.99, discount: 25, rating: 4.4, reviews: 95, icon: "☕" },
  { id: 5, name: "Yoga Mat", category: "sports", price: 29.99, originalPrice: 39.99, discount: 25, rating: 4.8, reviews: 420, icon: "🧘" },
  { id: 1, name: "Headphones", category: "electronics", price: 79.99, originalPrice: 99.99, discount: 20, rating: 4.6, reviews: 210, icon: "🎧" },
  { id: 2, name: "Smart Watch", category: "electronics", price: 199.99, originalPrice: 249.99, discount: 20, rating: 4.7, reviews: 340, icon: "⌚" },
  { id: 3, name: "Running Shoes", category: "fashion", price: 89.99, originalPrice: 119.99, discount: 25, rating: 4.5, reviews: 150, icon: "👟" },
  { id: 4, name: "Coffee Maker", category: "home", price: 59.99, originalPrice: 79.99, discount: 25, rating: 4.4, reviews: 95, icon: "☕" },
  { id: 5, name: "Yoga Mat", category: "sports", price: 29.99, originalPrice: 39.99, discount: 25, rating: 4.8, reviews: 420, icon: "🧘" }
];


// Users stored in localStorage
let users = JSON.parse(localStorage.getItem('shophub_users')) || [];
let currentCategory = 'all';

// 2. DOM HELPERS
const el = (id) => document.getElementById(id);
const toggleUI = (id, show) => {
    el(id).classList.toggle('active', show);
    el('overlay').classList.toggle('active', show);
};

// 3. CORE FUNCTIONS
function renderProducts(filter = "all") {
  let filteredProducts = [...products];

  // category filter
  if (filter !== "all") {
    filteredProducts = filteredProducts.filter(p => p.category === filter);
  }

  // search
  const searchTerm = (el("searchInput")?.value || "").toLowerCase();
  if (searchTerm) {
    filteredProducts = filteredProducts.filter(p =>
      p.name.toLowerCase().includes(searchTerm) ||
      p.category.toLowerCase().includes(searchTerm)
    );
  }

  // sort
  const sortValue = el("sortBy")?.value || "popular";
  if (sortValue === "price-low") filteredProducts.sort((a, b) => a.price - b.price);
  else if (sortValue === "price-high") filteredProducts.sort((a, b) => b.price - a.price);

  // product count
  el("productCount").textContent = `Showing ${filteredProducts.length} products`;

  // render products
  el("productsGrid").innerHTML = filteredProducts.map(product => `
    <div class="product-card" onclick="openProductModal(${product.id})">

      <div class="product-image">${product.icon}</div>

      <div class="product-info">
        <span class="product-category">${product.category}</span>

        <h3 class="product-name">${product.name}</h3>

        <div class="product-rating">
          <span>⭐ ${product.rating} (${product.reviews} reviews)</span>
        </div>

        <div class="product-price">
          <span class="current-price">$${product.price.toFixed(2)}</span>
          <span class="original-price">$${product.originalPrice.toFixed(2)}</span>
          <span class="discount-badge">${product.discount}% OFF</span>
        </div>

        <button class="btn-add-cart" onclick="addToCart(event, ${product.id})">
          <i class="fas fa-shopping-cart"></i> Add to Cart
        </button>
      </div>

    </div>
  `).join("");
}





el('userIcon').onclick = () => toggleUI('authSidebar', true);


// INITIALIZE
renderProducts();

