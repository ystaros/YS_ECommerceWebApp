// create small product
// const createSmallCard = (data, productId) => {
//     return `
//     <div class="sm-product">
//         <img src="../img/product%20image%201.png" class="sm-product-img" alt="">
//         <div class="sm-text">
//             <p class="sm-product-name">`${}`</p>
//             <p class="sm-des">this is a short line about</p>
//         </div>
//         <div class="item-counter">
//             <button class="counter-btn decrement">-</button>
//             <p class="item-count">1</p>
//             <button class="counter-btn increment">+</button>
//         <p class="sm-price">$20</p>
//         <button class="sm-delete-btn"><img src="../img/close.png" alt=""></button>
//     </div>
//     `;
// }
// getProductByIdOnCart();

const ordersRef = db.ref("orders");
const productsRef = db.ref("products");

let totalBill = 0;
let cartProductTotalCount = 0;
let cartProducts = [];

const createSmallCards = (product) => {
    if (!product) {
        return '';
    }
    return `
        <div class="sm-product">
            <img src="${product.images}" class="sm-product-img" alt="">
            <div class="sm-text">
                <p class="sm-product-name">${product.name}</p>
                <p class="sm-des">${product.shortDes}</p>
                <p class="sm-size">Size: ${product.size}</p>
            </div>
            <div class="item-counter">
                <button class="counter-btn decrement">-</button>
                <p class="item-count">${product.amount}</p>
                <button class="counter-btn increment">+</button>
            </div>
            
             <p class="sm-price" data-price="${product.sellPrice}">$${(Number(product.sellPrice) * Number(product.amount)).toFixed(2)}</p>
           
            <button class="sm-delete-btn"><img src="../img/close.png" alt=""></button>
        </div>
    `;
}

window.onload = function() {
    loadCartData();
};

async function loadCartData() {
    try {
        const snapshot = await ordersRef.orderByChild('active').equalTo("true").once('value');
        if (snapshot.exists()) {
            const orderSnapshots = Object.entries(snapshot.val());

            for (const [orderId, orderData] of orderSnapshots) {
                const productSnapshot = await db.ref('orders/' + orderId + '/products').once('value');
                if (productSnapshot.exists()) {
                    const products = Object.values(productSnapshot.val());

                    for (const product of products) {
                        const productId = product.productId;
                        const amountProduct = product.amount;
                        const size = product.checkedSizeId;
                        const productDetailsSnapshot = await productsRef.child(" + " + productId).once('value');
                        const productDetails = productDetailsSnapshot.val();

                        if (productDetails) {
                            productDetails.amount = amountProduct;
                            productDetails.size = size;
                            const price = productDetails.sellPrice;

                            cartProducts.push(productDetails);

                            totalBill += Number(price) * amountProduct;
                        } else {
                            console.warn(`Product details not found for: ${productId}`);
                        }
                    }
                    renderProducts('cart', cartProducts);
                    updateBill();
                    await updateTotalBill();
                }
            }
        } else {
            document.querySelector('.cart').innerHTML = `<img src="../img/empty-cart.png" class="empty-card-img" alt="">`;
        }
    } catch (error) {
        console.error("Error loading data:", error);
    }
}

function renderProducts(section, products) {
    const element = document.querySelector(`.${section}`);
    element.innerHTML = '';
    products.forEach(product => {
        if (product && product.sellPrice && product.images) {
            element.innerHTML += createSmallCards(product);
        }
    });
    setupEvents(section);
}

async function updateTotalBill() {
    try {
        const activeOrdersSnapshot = await ordersRef.orderByChild('active').equalTo("true").once('value');
        if (activeOrdersSnapshot.exists()) {
            activeOrdersSnapshot.forEach(async orderSnapshot => {
                const orderId = orderSnapshot.key;
                await ordersRef.child(orderId).update({ totalBill: totalBill });
            });
        }
    } catch (error) {
        console.error("Error updating total bill:", error);
    }
}


function updateBill() {
    let billPrice = document.querySelector('.bill');
    billPrice.innerHTML = `$${Number(totalBill).toFixed(2)}`;

}

function setupEvents(section) {
    const counts = document.querySelectorAll(`.${section} .item-count`);
    const counterMinus = document.querySelectorAll(`.${section} .decrement`);
    const counterPlus = document.querySelectorAll(`.${section} .increment`);
    const prices = document.querySelectorAll(`.${section} .sm-price`);
    const deleteBtn = document.querySelectorAll(`.${section} .sm-delete-btn`);

    counterMinus.forEach((btn, i) => {
        let cost = Number(prices[i].textContent.replace('$', ''));
        let amountProduct = Number(counts[i].textContent);

        btn.addEventListener('click', async () => {
            if (amountProduct > 1) {
                amountProduct--;
                totalBill -= cost;
                prices[i].textContent = `$${amountProduct * cost}`;
                counts[i].textContent = amountProduct;
                if (section === 'cart') {
                    updateBill();
                    await updateTotalBill();
                }
                await updateProductQuantity( i, amountProduct);
            }
        });
    });

    counterPlus.forEach((btn, i) => {
        let cost = Number(prices[i].textContent.replace('$', ''));
        let amountProduct = Number(counts[i].textContent);

        btn.addEventListener('click', async () => {
            if (amountProduct < cartProducts[i].stock) {
                amountProduct++;
                totalBill += cost;
                // prices[i].textContent = `$${amountProduct * cost}`;
                prices[i].textContent = `$${Number(amountProduct * cost).toFixed(2)}`;
                counts[i].textContent = amountProduct;
                if (section === 'cart') {
                    updateBill();
                    await updateTotalBill();
                }
                await updateProductQuantity( i, amountProduct);
            } else {
                showAlert('Stock limit exceeded');
            }
        });
    });

    deleteBtn.forEach((btn, i) => {
        btn.addEventListener('click', () => {
            deleteProduct(i);
        });
    });
}

async function updateProductQuantity(index, quantity) {
    showLoading();

    try {
        const activeOrdersSnapshot = await ordersRef.orderByChild('active').equalTo("true").once('value');
        if (activeOrdersSnapshot.exists()) {
            let updated = false;
            for (const orderSnapshot of Object.entries(activeOrdersSnapshot.val())) {
                const orderId = orderSnapshot[0];
                const productsSnapshot = await db.ref(`orders/${orderId}/products`).once('value');

                if (productsSnapshot.exists()) {
                    const products = productsSnapshot.val();
                    const productKeys = Object.keys(products);

                    if (index < productKeys.length) {
                        const productKey = productKeys[index];
                        const productRef = db.ref(`orders/${orderId}/products/${productKey}`);
                        await productRef.update({ amount: quantity });
                        updated = true;
                        break;
                    } else {
                        index -= productKeys.length;
                    }
                }
            }
            if (!updated) {
                console.warn(`No product found to update at index ${index}`);
            }
        }

        await delay(1000);
        window.location.reload();
    } catch (error) {
        console.error("Error updating product quantity:", error);
    } finally {
        hideLoading();
    }
}

function showLoading() {

    const loadingOverlay = document.getElementById('loading-overlay');
    loadingOverlay.classList.remove('hidden');

    document.body.classList.add('blur');
}

function hideLoading() {
    // Remove loading element and clear blur from page
    const loadingOverlay = document.getElementById('loading-overlay');
    if (loadingOverlay) {
        loadingOverlay.classList.add('hidden');
    }

    document.body.classList.remove('blur');
}

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function deleteProduct(index) {
    try {
        const activeOrdersSnapshot = await ordersRef.orderByChild('active').equalTo("true").once('value');
        if (activeOrdersSnapshot.exists()) {
            let i = 0;
            for (const orderSnapshot of Object.entries(activeOrdersSnapshot.val())) {
                const orderId = orderSnapshot[0];
                const productsSnapshot = await db.ref(`orders/${orderId}/products`).once('value');
                if (productsSnapshot.exists()) {
                    const products = productsSnapshot.val();
                    const productKeys = Object.keys(products);
                    for (const productKey of productKeys) {
                        if (i++ === index) {
                            await db.ref(`orders/${orderId}/products/${productKey}`).remove();
                            window.location.reload();
                            return; // Exit once the product is deleted
                        }
                    }
                }
            }
        }
    } catch (error) {
        console.error("Error deleting product:", error);
    }
}
