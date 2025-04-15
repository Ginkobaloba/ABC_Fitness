function addToCart(item, price, image) {
    let cart = JSON.parse(sessionStorage.getItem('cart')) || [];
    cart.push({ item, price, image });
    sessionStorage.setItem('cart', JSON.stringify(cart));
    displayCart();
}

function displayCart() {
    let cart = JSON.parse(sessionStorage.getItem('cart')) || [];
    let cartItems = document.getElementById('cart-items');
    let cartSummary = document.getElementById('cart-summary');
    let cartEmpty = document.getElementById('cart-empty');
    let closeBtn = document.getElementById('closeBtn');
    let checkoutBtn = document.getElementById('checkoutBtn');
    if(cartItems){cartItems.innerHTML = '';};
    let subtotal = 0;

    if (cart.length === 0) {
        if(cartSummary){cartSummary.style.display = 'none';};     
        if(closeBtn){closeBtn.style.display = 'none';};
        if(checkoutBtn){checkoutBtn.style.display = 'none';};
        if(cartEmpty){cartEmpty.style.display = 'block';
            cartEmpty.innerHTML = `<p>Your cart is empty. Please add items to your cart.</p>`;
        };        
          
    } else {
        if(cartSummary){cartSummary.style.display = 'block';};
        if(cartEmpty){cartEmpty.style.display = 'none';};
        if(closeBtn){closeBtn.style.display = 'inline-block';};
        if(checkoutBtn){checkoutBtn.style.display = 'inline-block';};    
        cart.forEach((cartItem, index) => {
            let li = document.createElement('li');
            li.className = 'list-group-item d-flex justify-content-between align-items-center';
            li.innerHTML = `
                <img src="https://raw.githubusercontent.com/Ginkobaloba/ABC_Fitness/main/assets/Images/${cartItem.image}" alt="${cartItem.item}" class="cart-item-img">
                ${cartItem.item} - $${cartItem.price}
                <div>
                    <input type="number" value="${cartItem.quantity || 1}" min="1" class="form-control form-control-sm" style="width: 60px; display: inline-block;" onchange="updateCartItem(${index}, this.value)">
                    <button class="btn btn-danger btn-sm" onclick="removeCartItem(${index})">Remove</button>
                </div>
            `;
            if(cartItems){cartItems.appendChild(li);};        
            subtotal += cartItem.price * (cartItem.quantity || 1);
        });
        let tax = subtotal * 0.051;
        let total = subtotal + tax;
        if(document.getElementById('cart-subtotal')){document.getElementById('cart-subtotal').innerText = `Subtotal: $${subtotal.toFixed(2)}`;}
        if(document.getElementById('cart-tax')){document.getElementById('cart-tax').innerText = `Tax (0.051%): $${tax.toFixed(2)}`;};
        if(document.getElementById('cart-total')){document.getElementById('cart-total').innerText = `Total: $${total.toFixed(2)}`;};
    }
}

function updateCartItem(index, quantity) {
    let cart = JSON.parse(sessionStorage.getItem('cart')) || [];
    cart[index].quantity = parseInt(quantity);
    sessionStorage.setItem('cart', JSON.stringify(cart));
    displayCart();
}

function removeCartItem(index) {
    let cart = JSON.parse(sessionStorage.getItem('cart')) || [];
    cart.splice(index, 1);
    sessionStorage.setItem('cart', JSON.stringify(cart));
    displayCart();
}

function checkout() {
    alert('Proceeding to checkout...');
    // Implement checkout functionality here
}

function enrollClass(className) {
    let schedule = JSON.parse(sessionStorage.getItem('schedule')) || [];
    schedule.push(className);
    sessionStorage.setItem('schedule', JSON.stringify(schedule));
    displaySchedule();
}

function displaySchedule() {
    let schedule = JSON.parse(sessionStorage.getItem('schedule')) || [];
    let classSchedule = document.getElementById('class-schedule');
    classSchedule.innerHTML = '';
    schedule.forEach((className, index) => {
        let li = document.createElement('li');
        li.textContent = className;
        classSchedule.appendChild(li);
    });
}

// Ensure the DOM is fully loaded before calling displayCart and displaySchedule
document.addEventListener("DOMContentLoaded", function() {
    displayCart();
    //displaySchedule();
});

document.querySelectorAll('.modal .close').forEach(btn => {
    btn.onclick = function() {
        const modal = this.closest('.modal');
        modal.style.display = 'none';
        document.body.classList.remove('modal-open');
    };
});

window.onclick = function(event) {
    displayCart();
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        if (event.target === modal) {
            modal.style.display = 'none';
            document.body.classList.remove('modal-open');
        }
    });
};

function openCartModal() {
    let cartItems = JSON.parse(sessionStorage.getItem('cart')) || [];
    const cartListDiv = document.getElementById('cart-items');
    cartListDiv.innerHTML = "";
    let total = 0;

    cartItems.forEach(item => {     
        total += item.price * item.qty;
        cartListDiv.innerHTML += `
            <div class="cart-item">
                <img src="https://raw.githubusercontent.com/Ginkobaloba/ABC_Fitness/main/assets/Images/${item.image}" alt="${item.name}" class="cart-item-img">
                <span class="item-name">${item.image}</span>
                <span class="item-qty">x${item.qty}</span>
                <span class="item-price">$${item.price * item.qty}</span>
            </div>`;
    });

    document.getElementById('cart-total').innerText = "Total: $" + total.toFixed(2);
    const cartModal = new bootstrap.Modal(document.getElementById('cartModal'));
    cartModal.show();
}

function handleSubmit(event) {
    event.preventDefault();
    const form = document.getElementById('signup-form');
    const thankYouMessage = document.getElementById('thank-you-message');
    form.querySelectorAll('input, select, button').forEach(input => input.disabled = true);
    thankYouMessage.style.display = 'block';
}

if(document.getElementById('checkoutBtn')){
    document.getElementById('checkoutBtn').onclick = function() {
        const cartListDiv = document.getElementById('cart-items');
        cartListDiv.innerHTML = "<p>Thank you for your purchase!</p>";
        document.getElementById('cart-total').innerText = "";
        sessionStorage.clear();
        this.disabled = true;
    };}

document.querySelectorAll('.class-item').forEach(item => {
    item.addEventListener('click', () => {
        item.classList.toggle('show-details');
    });
});