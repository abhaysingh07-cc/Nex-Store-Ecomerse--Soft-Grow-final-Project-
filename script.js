function toggleSidebar() { document.getElementById('sidebar').classList.toggle('active'); }

function filterProducts() {
    const input = document.getElementById('productSearch').value.toLowerCase();
    const cards = document.getElementsByClassName('product-card');
    const noResults = document.getElementById('no-results');
    let found = 0;
    for (let card of cards) {
        const name = card.getAttribute('data-name');
        if (name.includes(input)) { card.style.display = "block"; found++; }
        else { card.style.display = "none"; }
    }
    noResults.style.display = found === 0 ? "block" : "none";
}

let isLogin = false;
function toggleAuthMode() {
    isLogin = !isLogin;
    document.getElementById('auth-title').innerText = isLogin ? "Login" : "Register";
    document.getElementById('auth-btn').innerText = isLogin ? "Sign In" : "Create Account";
    document.getElementById('auth-toggle').innerText = isLogin ? "New here? Register" : "Already have an account? Login";
    document.getElementById('reg-inputs').style.display = isLogin ? 'none' : 'block';
}

function handleAuth() {
    const email = document.getElementById('email').value;
    if(!email || !email.includes('@')) { alert("Please enter a valid email address."); return; }
    document.getElementById('auth-container').style.transform = 'translateY(-100%)';
    initScrollAnimations();
}

let cart = [];
function toggleCart() { document.getElementById('cart-drawer').classList.toggle('active'); }

function addToCart(name, price, img) {
    const variety = document.getElementById('variety-label').innerText.replace('Selected: ', '');
    cart.push({ name: `${name} (${variety})`, price, img });
    updateCartUI();
    closeProduct();
    if(!document.getElementById('cart-drawer').classList.contains('active')) toggleCart();
}

function updateCartUI() {
    const cartContainer = document.getElementById('cart-items');
    const emptyMsg = document.getElementById('cart-empty-msg');
    const badge = document.getElementById('cart-badge');
    badge.innerText = cart.length;
    cartContainer.innerHTML = '';
    if(cart.length === 0) { emptyMsg.style.display = 'block'; }
    else {
        emptyMsg.style.display = 'none';
        cart.forEach((item, index) => {
            const div = document.createElement('div');
            div.className = 'cart-item';
            div.innerHTML = `
                <img src="${item.img}" width="50" style="border-radius:5px">
                <div style="flex:1">
                    <p style="font-size:0.8rem; font-weight:600">${item.name}</p>
                    <p style="font-size:0.7rem; color:var(--primary)">$${item.price}</p>
                </div>
                <i class="fas fa-trash" style="color:#ef4444; cursor:pointer; font-size:0.8rem" onclick="removeFromCart(${index})"></i>
            `;
            cartContainer.appendChild(div);
        });
    }
}

function removeFromCart(index) { cart.splice(index, 1); updateCartUI(); }

function openProduct(name, price, img, desc) {
    document.getElementById('modal-title').innerText = name;
    document.getElementById('modal-price').innerText = "$" + price + ".00";
    document.getElementById('modal-img').src = img;
    document.getElementById('modal-desc').innerText = desc;
    document.getElementById('variety-label').innerText = 'Selected: Obsidian';
    document.getElementById('add-to-cart-btn').onclick = () => addToCart(name, price, img);
    const modal = document.getElementById('product-modal');
    modal.style.display = 'flex';
    setTimeout(() => modal.classList.add('open'), 10);
}

function updateVariety(name) {
    document.getElementById('variety-label').innerText = 'Selected: ' + name;
}

function closeProduct() {
    const modal = document.getElementById('product-modal');
    modal.classList.remove('open');
    setTimeout(() => modal.style.display = 'none', 400);
}

function placeOrder() { closeProduct(); document.getElementById('order-success-overlay').style.display = 'flex'; }
function closeSuccess() { document.getElementById('order-success-overlay').style.display = 'none'; }

function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('visible'); } });
    }, { threshold: 0.1 });
    document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));
}

let lastScrollY = window.scrollY;
window.addEventListener('scroll', () => {
    const sidebarIcon = document.getElementById('sidebarIcon');
    const cartIcon = document.getElementById('cartIcon');
    if (window.scrollY > lastScrollY && window.scrollY > 50) {
        sidebarIcon.classList.add('hidden-nav');
        cartIcon.classList.add('hidden-nav');
    } else {
        sidebarIcon.classList.remove('hidden-nav');
        cartIcon.classList.remove('hidden-nav');
    }
    lastScrollY = window.scrollY;
});