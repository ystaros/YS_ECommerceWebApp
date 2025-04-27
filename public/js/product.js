const productImages = document.querySelectorAll(".product-images img");
const productImageSlide = document.querySelector(".image-slider");

let activeImageSlide = 0;

productImages.forEach((item, i) => {
    item.addEventListener('click', () => {
        productImages[activeImageSlide].classList.remove('active');
        item.classList.add('active');
        productImageSlide.style.backgroundImage = `url('${item.src}')`;
        activeImageSlide = i;
    })
})

// from Wera
function checkFirstAvailableSize() {
    // Find the first visible size button and check it
    const firstAvailableSizeBtn = Array.from(sizeBtns).find(btn => btn.style.display !== 'none');
    if (firstAvailableSizeBtn) {
        firstAvailableSizeBtn.click();
    }
}

// toggle size buttons
const sizeBtns = document.querySelectorAll('.size-radio-btn');
let checkedBtn = 0;
let size;

sizeBtns.forEach((item, i) => {
    item.addEventListener('click', () => {
        sizeBtns[checkedBtn].classList.remove('check');
        item.classList.add('check');
        checkedBtn = i;
        size = item.innerHTML;
    });
});


//Show product's images and size buttons on page
const setData = (data) => {
    let title = document.querySelector('title');
    title.innerHTML += " ";
    title.innerHTML += name.innerHTML = data.name;

    productImages.forEach((img, i) => {
        if (data.images[i]) {
            img.src = data.images[i];
        } else {
            img.style.display = 'none';
        }
    })
    productImages[0].click();

    //setup size buttons
    sizeBtns.forEach(item => {
        if (!data.sizes.includes(item.innerHTML)) {
            item.style.display = 'none';
        }
    });
    checkFirstAvailableSize();
}

let productId = null;

//fetch current product from db by ID
products.on("value", function (snapshot) {
    if (!snapshot.exists()) {
        console.log("No products found");
    } else {
        snapshot.forEach(function (element) {
            let data = element.val();
            data.id = element.key.toString().replace("+ ", "").trim();

            // if(currentProductId !== null && currentProductId !== 0) {
            //     getProductById(data, currentProductId); // <-- function from realDBConnect
            // }

            if (location.pathname !== '/product') {
                productId = decodeURI(location.pathname.split('/').pop());
            }
            getProductById(data, productId);
        });
    }
})

//order
let orderId = null;

const createOrderId = function () {
    const date = new Date();
    console.log("date", date.getTime());

    return date.getTime()
}

//fetch active order if exists OR create active order if no orders found in DB
orders.on("value", function (snapshot) {
    if (!snapshot.exists()) {
        console.log("No orders found");
        createOrder();
    } else {
        snapshot.forEach(function (element) {
            let order = element.val();

            if (order.active === "true") {
                orderId = order.id;
                console.log("Active order found: id = ", orderId);
            }
        })
    }
    if (orderId === null) {
        createOrder();
        console.log(" *******  inside null");
    }
})


//create active order if NO ACTIVE orders found in DB
function createOrder() {
    console.log("orderId = ", orderId);

    if (orderId === null) {
        console.log("No active orders found.");

        orderId = createOrderId().toString();
        db
            .ref('orders/' + orderId)
            .set({
                id: orderId.valueOf(),
                active: "true"
            });
    }
}

//get current product id
let currentProductId = getCurrentProductId();

function getCurrentProductId() {
    if (location.pathname !== '/product') {

        return decodeURI(location.pathname.split('/').pop());
    }

    return 0;
}
console.log(currentProductId);

//fetch productsIDs from active order OR create empty productsIds record in DB
let productsInActiveOrder = "";

productsIds.on("value", function (snapshot) {
    if (!snapshot.exists() && productsInActiveOrder === "") {
        console.log("No productsInOrder found");

        db
            .ref('productsIds/')
            .set({
                ids: productsInActiveOrder
            });
    } else {
        snapshot.forEach(function (element) {
            console.log("productsInActiveOrder variable before updating = ", productsInActiveOrder);

            productsInActiveOrder = element.val();

            console.log("productsInActiveOrder variable after updating = ", productsInActiveOrder);
        });
    }
})

//посчитать количество товара для продукта, который собираемся добавить
function countProductAmountInOrder(productId, checkedSizeId) {
    const currentProductIdAndSize = productId + '-' + checkedSizeId;
    console.log("currentProductIdAndSize = ", currentProductIdAndSize);

    console.log("productsInActiveOrder = ", productsInActiveOrder, "  ", productsInActiveOrder.length);

    let productAmount = 0;
    if(productsInActiveOrder === null) {
        productsInActiveOrder = "";
        console.log("productsInActiveOrder was NULL and now is empty string = ", productsInActiveOrder);
    } else if (productsInActiveOrder.length > 0) {
        if (productsInActiveOrder.includes(currentProductIdAndSize)) {
            productAmount = 1;
        }
    } else {
        productAmount = 0;
    }

    console.log("productAmount, который будет добавлен в ордер = ", productAmount);

    return productAmount;
}

// // Function to count the product amount in the order
// function countProductAmountInOrder(productId, checkedSizeId) {
//     const currentProductIdAndSize = productId + '-' + checkedSizeId;
//     console.log("currentProductIdAndSize = ", currentProductIdAndSize);
//
//     console.log("productsInActiveOrder = ", productsInActiveOrder, "  ", productsInActiveOrder.length);
//
//     let productAmount = 0;
//     if(productsInActiveOrder === null || !productsInActiveOrder) {
//         productsInActiveOrder = "";
//         console.log("productsInActiveOrder was NULL and now is empty string = ", productsInActiveOrder);
//     } else if (productsInActiveOrder.length > 0) {
//         const productRegex = new RegExp(`\\b${currentProductIdAndSize}\\b`);
//         const match = productsInActiveOrder.match(productRegex);
//         if (match) {
//             productAmount = parseInt(match[1], 10);
//         } else {
//             productAmount = 0;
//         }
//     } else {
//         productAmount = 0;
//     }
//
//     console.log("productAmount, который будет добавлен в ордер = ", productAmount);
//
//     return productAmount;
// }

// Function to add product to order
async function addProductToOrder(orderId, checkedSizeId, productId) {
    const productRowName = productId + '-' + checkedSizeId;
    let amount = 0;

    const productAmount = countProductAmountInOrder(productId, checkedSizeId);

    if (productAmount === 0) {
        amount = 1;

        // Add new product to order
        await db.ref('orders/' + orderId + '/products/' + productRowName).set({
            id: productRowName,
            productId: productId,
            checkedSizeId: checkedSizeId,
            amount: amount
        });

        productsInActiveOrder += ` ${productRowName}`;
        await db.ref('productsIds/').set({
            ids: productsInActiveOrder.trim()
        });

    } else {
        // Retrieve the current amount of the product in the order
        const snapshot = await db.ref('orders/' + orderId + '/products/' + productRowName).once('value');
        if (snapshot.exists()) {
            amount = snapshot.val().amount;
        }

        amount += 1;

        // Update the amount of the product in the order
        await db.ref('orders/' + orderId + '/products/' + productRowName).update({
            id: productRowName,
            productId: productId,
            checkedSizeId: checkedSizeId,
            amount: amount
        });

        // Debugging logs
        const newSnapshot = await db.ref('orders/' + orderId).once('value');
        if (newSnapshot.exists()) {
            console.log("newDataOrders = ", newSnapshot.val());
        }

        const productsIdsSnapshot = await db.ref('productsIds/').once('value');
        if (productsIdsSnapshot.exists()) {
            console.log("newProductsIds = ", productsIdsSnapshot.val());
        }
    }
}


const addToCartBtn = document.querySelector("#addToCart");
const viewCartBtn = document.querySelector("#viewCart");

addToCartBtn.addEventListener('click', async function (e) {
    console.log("!! clicked");
    const checkedSizeId = document.querySelector("label[class='size-radio-btn check']").id;

    await addProductToOrder(orderId, checkedSizeId, currentProductId);
})

viewCartBtn.addEventListener('click', async function (e) {
    location.href = `/cart/${orderId}`;
})

