// Dados dos produtos - ATUALIZADO COM PROMOÇÕES
const products = {
    1: {
        id: 1,
        name: "Margherita",
        price: 42.90,
        image: "img/PizzaMarguerita.jpg",
        description: "Massa fina e crocante, molho de tomate italiano, mussarela de búfala fresca, manjericão e azeite extra virgem. A clássica pizza italiana em sua forma mais autêntica.",
        ingredients: ["Massa fina", "Molho de tomate italiano", "Mussarela de búfala", "Manjericão fresco", "Azeite extra virgem"]
    },
    2: {
        id: 2,
        name: "Pepperoni",
        price: 48.50,
        image: "img/Pepperoni.jpg",
        description: "Massa tradicional, molho de tomate caseiro, pepperoni italiano, mussarela especial e orégano. Perfeita para quem ama sabores intensos e marcantes.",
        ingredients: ["Massa tradicional", "Molho de tomate caseiro", "Pepperoni italiano", "Mussarela especial", "Orégano"]
    },
    3: {
        id: 3,
        name: "Quatro Queijos",
        price: 52.90,
        image: "img/Pizza-Quatro-Queijos.jpg",
        description: "Massa fina, molho branco especial, mussarela, gorgonzola, parmesão e provolone. Uma harmonização perfeita de queijos selecionados.",
        ingredients: ["Massa fina", "Molho branco especial", "Mussarela", "Gorgonzola", "Parmesão", "Provolone"]
    },
    // PROMOÇÕES
    4: {
        id: 4,
        name: "Margherita Classica",
        price: 39.90,
        image: "img/PizzaMarguerita.jpg",
        description: "Massa fina, molho de tomate italiano, mussarela fresca e manjericão. A clássica italiana com preço especial!",
        ingredients: ["Massa fina", "Molho de tomate italiano", "Mussarela fresca", "Manjericão", "Azeite extra virgem"]
    },
    5: {
        id: 5,
        name: "Pepperoni Supreme",
        price: 45.50,
        image: "img/PepperoniSupreme.jpg",
        description: "Pepperoni italiano, mussarela especial, orégano e molho caseiro. Sabor intenso com desconto!",
        ingredients: ["Massa tradicional", "Molho caseiro", "Pepperoni italiano", "Mussarela especial", "Orégano"]
    },
    6: {
        id: 6,
        name: "Calabresa Acebolada",
        price: 43.90,
        image: "img/CalabresaAcebolada.jpg",
        description: "Calabresa especial, cebola roxa, mussarela e azeitonas. Combinação perfeita de sabores!",
        ingredients: ["Massa tradicional", "Molho de tomate", "Calabresa especial", "Cebola roxa", "Mussarela", "Azeitonas"]
    },
    7: {
        id: 7,
        name: "Frango Catupiry",
        price: 47.90,
        image: "img/frangoCatupiry.jpg",
        description: "Frango desfiado, catupiry cremoso, milho e mussarela. Cremosidade e sabor incomparáveis!",
        ingredients: ["Massa tradicional", "Molho branco", "Frango desfiado", "Catupiry", "Milho", "Mussarela"]
    },
    8: {
        id: 8,
        name: "Basca",
        price: 47.90,
        image: "img/Basca.jpeg",
        description: "Sabor especial da casa com ingredientes selecionados. Uma experiência única!",
        ingredients: ["Massa especial", "Molho da casa", "Ingredientes selecionados"]
    },
    9: {
        id: 9,
        name: "Alho-Poró com Bacon",
        price: 47.90,
        image: "img/Alho-Poró com Bacon.jpg",
        description: "Alho-poró caramelizado, bacon crocante e queijos especiais. Sofisticação em cada pedaço!",
        ingredients: ["Massa fina", "Molho branco", "Alho-poró", "Bacon", "Queijos especiais"]
    }
};

// Sistema de Autenticação
let currentUser = JSON.parse(localStorage.getItem('currentUser'));
let users = JSON.parse(localStorage.getItem('users')) || [];

// Carrinho de compras
let cart = [];

// Elementos do DOM
const cartIcon = document.getElementById('cartIcon');
const cartSidebar = document.getElementById('cartSidebar');
const closeCart = document.getElementById('closeCart');
const cartItems = document.getElementById('cartItems');
const cartCount = document.getElementById('cartCount');
const cartTotal = document.getElementById('cartTotal');
const checkoutBtn = document.getElementById('checkoutBtn');
const whatsappBtn = document.getElementById('whatsappBtn');

// Modal de produto
const productModal = document.getElementById('productModal');
const closeModal = document.getElementById('closeModal');
const modalImage = document.getElementById('modalImage');
const modalTitle = document.getElementById('modalTitle');
const modalPrice = document.getElementById('modalPrice');
const modalDescription = document.getElementById('modalDescription');
const modalIngredients = document.getElementById('modalIngredients');
const modalAddToCart = document.getElementById('modalAddToCart');

// Sistema de autenticação
const authModal = document.getElementById('authModal');
const closeAuthModal = document.getElementById('closeAuthModal');
const loginBtn = document.getElementById('loginBtn');
const userMenu = document.getElementById('userMenu');
const userName = document.getElementById('userName');
const logoutBtn = document.getElementById('logoutBtn');
const authTabs = document.querySelectorAll('.auth-tab');
const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');
const switchToRegister = document.querySelector('.switch-to-register');
const switchToLogin = document.querySelector('.switch-to-login');

// Modal de login obrigatório
const loginRequiredModal = document.getElementById('loginRequiredModal');
const goToLoginBtn = document.getElementById('goToLoginBtn');
const continueBrowsingBtn = document.getElementById('continueBrowsingBtn');

// Produto atualmente sendo visualizado no modal
let currentProduct = null;

// Funções de Autenticação
function saveUsers() {
    localStorage.setItem('users', JSON.stringify(users));
}

function loginUser(email, password) {
    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
        currentUser = user;
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        updateAuthUI();
        authModal.classList.remove('active');
        showNotification('Login realizado com sucesso!', 'success');
        return true;
    }
    return false;
}

function registerUser(userData) {
    // Verificar se o email já existe
    if (users.find(u => u.email === userData.email)) {
        return { success: false, message: 'Este email já está cadastrado.' };
    }
    
    // Verificar se as senhas coincidem
    if (userData.password !== userData.confirmPassword) {
        return { success: false, message: 'As senhas não coincidem.' };
    }
    
    // Criar novo usuário
    const newUser = {
        id: Date.now(),
        name: userData.name,
        email: userData.email,
        phone: userData.phone,
        address: userData.address,
        password: userData.password,
        createdAt: new Date().toISOString()
    };
    
    users.push(newUser);
    saveUsers();
    
    // Fazer login automaticamente
    currentUser = newUser;
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    updateAuthUI();
    
    return { success: true, message: 'Cadastro realizado com sucesso!' };
}

function logoutUser() {
    currentUser = null;
    localStorage.removeItem('currentUser');
    cart = [];
    updateAuthUI();
    updateCart();
    showNotification('Logout realizado com sucesso!', 'info');
}

function updateAuthUI() {
    if (currentUser) {
        loginBtn.style.display = 'none';
        userMenu.style.display = 'flex';
        userName.textContent = currentUser.name.split(' ')[0]; // Primeiro nome
        cartIcon.classList.remove('disabled');
        updateButtonStates();
    } else {
        loginBtn.style.display = 'flex';
        userMenu.style.display = 'none';
        cartIcon.classList.add('disabled');
        updateButtonStates();
    }
}

function updateButtonStates() {
    const isLoggedIn = !!currentUser;
    const promoButtons = document.querySelectorAll('.promo-btn');
    const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
    
    promoButtons.forEach(btn => {
        if (!isLoggedIn) {
            btn.classList.add('disabled');
            btn.setAttribute('title', 'Faça login para adicionar ao carrinho');
        } else {
            btn.classList.remove('disabled');
            btn.removeAttribute('title');
        }
    });
    
    addToCartButtons.forEach(btn => {
        if (!isLoggedIn) {
            btn.classList.add('disabled');
        } else {
            btn.classList.remove('disabled');
        }
    });
}

function showNotification(message, type = 'info') {
    // Criar elemento de notificação
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <span>${message}</span>
        <button class="close-notification">&times;</button>
    `;
    
    // Adicionar ao corpo
    document.body.appendChild(notification);
    
    // Mostrar notificação
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    // Remover notificação após 5 segundos
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 5000);
    
    // Fechar notificação ao clicar no X
    notification.querySelector('.close-notification').addEventListener('click', () => {
        notification.classList.remove('show');
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    });
}

// Funções do carrinho
function updateCart() {
    // Atualizar contador
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;

    // Atualizar itens do carrinho
    cartItems.innerHTML = '';
    if (cart.length === 0) {
        cartItems.innerHTML = '<p style="text-align: center; color: var(--cinza-claro);">Seu carrinho está vazio</p>';
    } else {
        cart.forEach(item => {
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.innerHTML = `
                <div class="cart-item-info">
                    <h4>${item.name}</h4>
                    <div class="cart-item-price">R$ ${item.price.toFixed(2)}</div>
                </div>
                <div class="cart-item-quantity">
                    <button class="quantity-btn minus" data-id="${item.id}">-</button>
                    <span>${item.quantity}</span>
                    <button class="quantity-btn plus" data-id="${item.id}">+</button>
                    <button class="remove-item" data-id="${item.id}">Remover</button>
                </div>
            `;
            cartItems.appendChild(cartItem);
        });
    }

    // Atualizar total
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotal.textContent = `Total: R$ ${total.toFixed(2)}`;

    // Adicionar event listeners aos botões do carrinho
    document.querySelectorAll('.quantity-btn.minus').forEach(btn => {
        btn.addEventListener('click', () => {
            const id = parseInt(btn.getAttribute('data-id'));
            decreaseQuantity(id);
        });
    });

    document.querySelectorAll('.quantity-btn.plus').forEach(btn => {
        btn.addEventListener('click', () => {
            const id = parseInt(btn.getAttribute('data-id'));
            increaseQuantity(id);
        });
    });

    document.querySelectorAll('.remove-item').forEach(btn => {
        btn.addEventListener('click', () => {
            const id = parseInt(btn.getAttribute('data-id'));
            removeFromCart(id);
        });
    });
}

function addToCart(productId) {
    if (!currentUser) {
        loginRequiredModal.classList.add('active');
        return;
    }

    const product = products[productId];
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            quantity: 1
        });
    }

    updateCart();
    showNotification(`${product.name} adicionado ao carrinho!`, 'success');

    // Feedback visual
    const cartIconElement = document.querySelector('.cart-icon');
    cartIconElement.style.animation = 'none';
    setTimeout(() => {
        cartIconElement.style.animation = 'click-wave 0.4s ease-out';
    }, 10);
}

function increaseQuantity(productId) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity += 1;
        updateCart();
    }
}

function decreaseQuantity(productId) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        if (item.quantity > 1) {
            item.quantity -= 1;
        } else {
            removeFromCart(productId);
        }
        updateCart();
    }
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCart();
    showNotification('Item removido do carrinho', 'info');
}

// Funções do modal
function openProductModal(productId) {
    const product = products[productId];
    currentProduct = product;

    modalImage.src = product.image;
    modalTitle.textContent = product.name;
    modalPrice.textContent = `R$ ${product.price.toFixed(2)}`;
    modalDescription.textContent = product.description;

    // Limpar e adicionar ingredientes
    modalIngredients.innerHTML = '';
    product.ingredients.forEach(ingredient => {
        const ingredientTag = document.createElement('span');
        ingredientTag.className = 'ingredient-tag';
        ingredientTag.textContent = ingredient;
        modalIngredients.appendChild(ingredientTag);
    });

    productModal.classList.add('active');
}

// NOVO: Integração com WhatsApp
function sendWhatsAppOrder() {
    if (!currentUser) {
        loginRequiredModal.classList.add('active');
        return;
    }

    if (cart.length === 0) {
        showNotification('Seu carrinho está vazio!', 'error');
        return;
    }

    let message = "🍕 *PEDIDO - LA BELLA PIZZA* 🍕\n\n";
    message += "*Itens do Pedido:*\n";
    
    cart.forEach(item => {
        message += `• ${item.quantity}x ${item.name} - R$ ${(item.price * item.quantity).toFixed(2)}\n`;
    });
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    message += `\n*Total: R$ ${total.toFixed(2)}*\n\n`;
    message += "*Informações do Cliente:*\n";
    message += `Nome: ${currentUser.name}\n`;
    message += `Telefone: ${currentUser.phone}\n`;
    message += `Endereço: ${currentUser.address}\n`;
    message += "Observações: \n\n";
    message += "_Pedido gerado automaticamente pelo site_";

    const phone = "556155556789"; // Número da pizzaria (formato internacional)
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
}

// Função para redirecionar para o Google Maps
function openLocationInMaps(location) {
    const encodedLocation = encodeURIComponent(location);
    const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodedLocation}`;
    window.open(mapsUrl, '_blank');
}

// Event Listeners
document.addEventListener('DOMContentLoaded', function () {
    // Inicializar interface de autenticação
    updateAuthUI();

    // Event Listeners de Autenticação
    loginBtn.addEventListener('click', () => {
        authModal.classList.add('active');
    });

    closeAuthModal.addEventListener('click', () => {
        authModal.classList.remove('active');
    });

    logoutBtn.addEventListener('click', logoutUser);

    // Alternar entre login e cadastro
    authTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const tabName = tab.getAttribute('data-tab');
            
            // Atualizar tabs
            authTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            // Mostrar formulário correspondente
            document.querySelectorAll('.auth-form').forEach(form => {
                form.classList.remove('active');
            });
            document.getElementById(`${tabName}Form`).classList.add('active');
        });
    });

    switchToRegister.addEventListener('click', (e) => {
        e.preventDefault();
        document.querySelector('[data-tab="register"]').click();
    });

    switchToLogin.addEventListener('click', (e) => {
        e.preventDefault();
        document.querySelector('[data-tab="login"]').click();
    });

    // Formulário de Login
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;
        
        if (loginUser(email, password)) {
            loginForm.reset();
        } else {
            showNotification('Email ou senha incorretos!', 'error');
        }
    });

    // Formulário de Cadastro
    registerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = {
            name: document.getElementById('registerName').value,
            email: document.getElementById('registerEmail').value,
            phone: document.getElementById('registerPhone').value,
            address: document.getElementById('registerAddress').value,
            password: document.getElementById('registerPassword').value,
            confirmPassword: document.getElementById('registerConfirmPassword').value
        };
        
        const result = registerUser(formData);
        if (result.success) {
            registerForm.reset();
            showNotification(result.message, 'success');
        } else {
            showNotification(result.message, 'error');
        }
    });

    // Modal de login obrigatório
    goToLoginBtn.addEventListener('click', () => {
        loginRequiredModal.classList.remove('active');
        authModal.classList.add('active');
    });

    continueBrowsingBtn.addEventListener('click', () => {
        loginRequiredModal.classList.remove('active');
    });

    // Adicionar evento de clique aos botões de promoção
    document.querySelectorAll('.promo-btn').forEach(btn => {
        btn.addEventListener('click', function () {
            const productId = parseInt(this.getAttribute('data-product-id'));
            addToCart(productId);
            
            // Feedback visual apenas se logado
            if (currentUser) {
                const originalText = this.innerHTML;
                this.innerHTML = '✓ Adicionado!';
                this.style.background = 'linear-gradient(45deg, var(--verde), #00a86b)';
                
                setTimeout(() => {
                    this.innerHTML = originalText;
                    this.style.background = 'linear-gradient(45deg, var(--dourado), #ffd700)';
                }, 2000);
            }
        });
    });

    // Adicionar evento de clique aos itens do menu
    document.querySelectorAll('.menu-item-vertical').forEach(item => {
        item.addEventListener('click', function () {
            const productId = parseInt(this.getAttribute('data-product-id'));
            openProductModal(productId);
        });
    });

    // Adicionar evento de clique ao botão "Adicionar ao Carrinho" no modal
    modalAddToCart.addEventListener('click', function () {
        if (currentProduct) {
            addToCart(currentProduct.id);
            productModal.classList.remove('active');
        }
    });

    // Adicionar evento de clique ao ícone do carrinho
    cartIcon.addEventListener('click', function () {
        if (!currentUser) {
            loginRequiredModal.classList.add('active');
            return;
        }
        cartSidebar.classList.add('active');
    });

    // Adicionar evento de clique para fechar o carrinho
    closeCart.addEventListener('click', function () {
        cartSidebar.classList.remove('active');
    });

    // Adicionar evento de clique para fechar o modal
    closeModal.addEventListener('click', function () {
        productModal.classList.remove('active');
    });

    // Adicionar evento de clique para finalizar pedido
    checkoutBtn.addEventListener('click', function () {
        if (!currentUser) {
            loginRequiredModal.classList.add('active');
            return;
        }

        if (cart.length === 0) {
            showNotification('Seu carrinho está vazio!', 'error');
            return;
        }

        const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        showNotification(`🍕 Pedido realizado com sucesso! Total: R$ ${total.toFixed(2)}`, 'success');

        // Limpar carrinho
        cart = [];
        updateCart();
        cartSidebar.classList.remove('active');
    });

    // Adicionar evento de clique para pedir pelo WhatsApp
    whatsappBtn.addEventListener('click', sendWhatsAppOrder);

    // Adicionar event listeners aos cards de unidades
    document.querySelectorAll('.unidade-card').forEach(card => {
        card.addEventListener('click', function() {
            const location = this.getAttribute('data-location');
            if (location) {
                openLocationInMaps(location);
            }
        });
        
        // Adicionar efeito visual ao passar o mouse
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
            this.style.cursor = 'pointer';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Fechar modais ao clicar fora
    window.addEventListener('click', function (event) {
        if (event.target === productModal) {
            productModal.classList.remove('active');
        }
        if (event.target === cartSidebar) {
            cartSidebar.classList.remove('active');
        }
        if (event.target === authModal) {
            authModal.classList.remove('active');
        }
        if (event.target === loginRequiredModal) {
            loginRequiredModal.classList.remove('active');
        }
    });

    // Adicionar efeito de contador regressivo para a promoção
    const promoTitle = document.querySelector('.promo-title');
    let countdown = 24 * 60 * 60; // 24 horas em segundos

    function updateCountdown() {
        const hours = Math.floor(countdown / 3600);
        const minutes = Math.floor((countdown % 3600) / 60);
        const seconds = countdown % 60;

        if (countdown > 0) {
            promoTitle.innerHTML = `🍕 Promozione Speciale! 🍕<br><small>Tempo restante: ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}</small>`;
            countdown--;
        } else {
            promoTitle.innerHTML = `🍕 Promozione Speciale! 🍕<br><small>Promoção encerrada!</small>`;
            clearInterval(countdownInterval);
        }
    }

    // Iniciar o contador
    const countdownInterval = setInterval(updateCountdown, 1000);
    updateCountdown(); // Chamar imediatamente para evitar atraso inicial

    // Inicializar carrinho
    updateCart();
});