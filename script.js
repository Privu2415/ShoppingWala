const products = [
{ id:1, name:"DSLR Camera", category:"electronics", price:599.99, originalPrice:699.99, discount:14, rating:4.7, reviews:320, image:"https://images.unsplash.com/photo-1519183071298-a2962eadc5a3?w=500" },
{ id:2, name:"Gaming Mouse", category:"electronics", price:49.99, originalPrice:69.99, discount:28, rating:4.5, reviews:210, image:"https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=500" },
{ id:3, name:"Leather Wallet", category:"fashion", price:29.99, originalPrice:39.99, discount:25, rating:4.4, reviews:180, image:"https://images.unsplash.com/photo-1627123424574-724758594e93?w=500" },
{ id:4, name:"Men Hoodie", category:"fashion", price:59.99, originalPrice:79.99, discount:25, rating:4.6, reviews:260, image:"https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500" },
{ id:5, name:"Office Chair", category:"home", price:129.99, originalPrice:169.99, discount:24, rating:4.5, reviews:140, image:"https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=500" },
{ id:6, name:"Bed Side Table", category:"home", price:74.99, originalPrice:99.99, discount:25, rating:4.3, reviews:90, image:"https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=500" },
{ id:7, name:"Cricket Bat", category:"sports", price:89.99, originalPrice:119.99, discount:25, rating:4.7, reviews:310, image:"https://images.unsplash.com/photo-1593766788306-28561086694e?w=500" },
{ id:8, name:"Tennis Racket", category:"sports", price:69.99, originalPrice:94.99, discount:26, rating:4.5, reviews:170, image:"https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?w=500" },
{ id:9, name:"Air Fryer", category:"home", price:99.99, originalPrice:139.99, discount:29, rating:4.6, reviews:280, image:"https://images.unsplash.com/photo-1585238342024-78d387f4a707?w=500" },
{ id:10, name:"Electric Kettle", category:"home", price:34.99, originalPrice:49.99, discount:30, rating:4.4, reviews:200, image:"https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=500" },
{ id:11, name:"Bluetooth Earbuds", category:"electronics", price:59.99, originalPrice:79.99, discount:25, rating:4.5, reviews:390, image:"https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=500" },
{ id:12, name:"Mechanical Keyboard", category:"electronics", price:109.99, originalPrice:139.99, discount:21, rating:4.7, reviews:250, image:"https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500" },
{ id:13, name:"Women Handbag", category:"fashion", price:64.99, originalPrice:89.99, discount:28, rating:4.6, reviews:220, image:"https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=500" },
{ id:14, name:"Sneakers", category:"fashion", price:84.99, originalPrice:119.99, discount:29, rating:4.5, reviews:310, image:"https://images.unsplash.com/photo-1528701800489-20be3c2ea4a2?w=500" },
{ id:15, name:"Gym Bench", category:"sports", price:149.99, originalPrice:199.99, discount:25, rating:4.4, reviews:120, image:"https://images.unsplash.com/photo-1599058918144-1ffabb6ab9a0?w=500" },
{ id:16, name:"Protein Shaker", category:"sports", price:14.99, originalPrice:19.99, discount:25, rating:4.2, reviews:160, image:"https://images.unsplash.com/photo-1599059813005-11265ba4b4ce?w=500" },
{ id:17, name:"Study Desk", category:"home", price:159.99, originalPrice:219.99, discount:27, rating:4.6, reviews:130, image:"https://images.unsplash.com/photo-1519710164239-da123dc03ef4?w=500" },
{ id:18, name:"Monitor Stand", category:"electronics", price:39.99, originalPrice:54.99, discount:27, rating:4.3, reviews:145, image:"https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=500" },
{ id:19, name:"Casual Cap", category:"fashion", price:19.99, originalPrice:29.99, discount:33, rating:4.1, reviews:175, image:"https://images.unsplash.com/photo-1521369909029-2afed882baee?w=500" },
{ id:20, name:"Skipping Rope", category:"sports", price:12.99, originalPrice:17.99, discount:28, rating:4.4, reviews:210, image:"https://images.unsplash.com/photo-1594737625785-c1f4bcd6cba3?w=500" }
];


let users = JSON.parse(localStorage.getItem('shophub_users')) || [];
let cart = JSON.parse(localStorage.getItem('shophub_cart')) || [];
let currentUser = JSON.parse(localStorage.getItem('shophub_currentUser')) || null;
let currentCategory = 'all';


const el = (id) => document.getElementById(id);
const toggleUI = (id, show) => {
    el(id).classList.toggle('active', show);
    el('overlay').classList.toggle('active', show);
};


const renderProducts = () => {
    const search = el('searchInput').value.toLowerCase();

    const filtered = products.filter(p =>
        (currentCategory === 'all' || p.category === currentCategory) &&
        p.name.toLowerCase().includes(search)
    );

    el('productsGrid').innerHTML = filtered.map(p => `
        <div class="product-card">

            <div class="product-image">
                <img src="${p.image}" alt="${p.name}">
            </div>

            <div class="product-info">
                <p class="product-category">${p.category}</p>
                <h3 class="product-name">${p.name}</h3>
                <p class="current-price">₹${p.price}</p>
                <button class="btn btn-primary" onclick="addToCart(${p.id})">Add to Cart</button>
            </div>

        </div>
    `).join('');

    el('productCount').textContent = `Showing ${filtered.length} products`;
};


const addToCart = (id) => {
    const item = products.find(p => p.id === id);
    const existing = cart.find(c => c.id === id);
    existing ? existing.qty++ : cart.push({...item, qty: 1});
    updateCart();
    showToast(`${item.name} added!`);
};

const updateCart = () => {
    localStorage.setItem('shophub_cart', JSON.stringify(cart));
    el('cartCount').textContent = cart.reduce((acc, item) => acc + item.qty, 0);
    el('cartItems').innerHTML = cart.map(i => `
        <div class="cart-item">
            <span>${i.icon} ${i.name} (x${i.qty})</span>
            <span>₹$(i.price * i.qty).toFixed(2)}</span>
        </div>
    `).join('');
    const total = cart.reduce((acc, i) => acc + (i.price * i.qty), 0);
    el('total').textContent = `$${total.toFixed(2)}`;
};

const removeFromCart = (id) => {
    cart = cart.filter(i => i.id !== id);
    updateCart();
};

const showToast = (msg) => {
    el('toastMessage').textContent = msg;
    el('toast').classList.add('show');
    setTimeout(() => el('toast').classList.remove('show'), 3000);
};


const switchAuthForm = (e) => {
    e.preventDefault();
    el('loginForm').style.display = el('loginForm').style.display === 'none' ? 'flex' : 'none';
    el('signupForm').style.display = el('signupForm').style.display === 'none' ? 'flex' : 'none';
};

const handleSignup = (e) => {
    e.preventDefault();
    const name = el('signupName').value;
    const email = el('signupEmail').value;
    const password = el('signupPassword').value;
    const confirm = el('signupConfirm').value;

    if (password !== confirm) {
        showToast('Passwords do not match!');
        return;
    }

    if (users.find(u => u.email === email)) {
        showToast('Email already registered!');
        return;
    }

    const user = { id: Date.now(), name, email, password };
    users.push(user);
    localStorage.setItem('shophub_users', JSON.stringify(users));
    showToast('Account created! Please login.');
    
    el('signupForm').reset();
    switchAuthForm(e);
};

const handleLogin = (e) => {
    e.preventDefault();
    const email = el('loginEmail').value;
    const password = el('loginPassword').value;

    const user = users.find(u => u.email === email && u.password === password);
    if (!user) {
        showToast('Invalid email or password!');
        return;
    }

    currentUser = { id: user.id, name: user.name, email: user.email };
    localStorage.setItem('shophub_currentUser', JSON.stringify(currentUser));
    showToast(`Welcome, ${currentUser.name}!`);
    
    el('loginForm').reset();
    updateAuthUI();
    toggleUI('authSidebar', false);
};

const handleLogout = () => {
    currentUser = null;
    localStorage.removeItem('shophub_currentUser');
    showToast('Logged out successfully!');
    updateAuthUI();
};

const updateAuthUI = () => {
    if (currentUser) {
        el('loginForm').style.display = 'none';
        el('signupForm').style.display = 'none';
        el('userProfile').style.display = 'block';
        el('userName').textContent = currentUser.name;
    } else {
        el('loginForm').style.display = 'flex';
        el('signupForm').style.display = 'none';
        el('userProfile').style.display = 'none';
    }
};


el('cartIcon').onclick = () => toggleUI('cartSidebar', true);
el('userIcon').onclick = () => toggleUI('authSidebar', true);
el('categoryBtn').onclick = () => toggleUI('categorySidebar', true);
el('overlay').onclick = () => {
    ['cartSidebar', 'authSidebar', 'categorySidebar'].forEach(s => toggleUI(s, false));
};

el('searchInput').oninput = renderProducts;

document.querySelectorAll('.category-item').forEach(btn => {
    btn.onclick = (e) => {
        document.querySelectorAll('.category-item').forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');
        currentCategory = e.target.dataset.category;
        renderProducts();
        toggleUI('categorySidebar', false);
    };
});

el('signupForm').onsubmit = handleSignup;
el('loginForm').onsubmit = handleLogin;
el('logoutBtn').onclick = handleLogout;

document.querySelectorAll('.close-btn').forEach(btn => {
    btn.onclick = () => {
        document.querySelectorAll('.sidebar').forEach(s => s.classList.remove('active'));
        el('overlay').classList.remove('active');
    };
});

renderProducts();
updateCart();
updateAuthUI();

