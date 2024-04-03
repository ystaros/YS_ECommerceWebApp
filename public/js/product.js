// /* переключение между разными кадрами продукта */

const productImages = document.querySelectorAll(".product-images img");
const productImageSlide = document.querySelector(".image-slider");

let activeImageSlide = 0;
const db = firebase.database();

productImages.forEach((item, i) => {
    item.addEventListener('click', () => {
        productImages[activeImageSlide].classList.remove('active');
        item.classList.add('active');
        productImageSlide.style.backgroundImage = `url('${item.src}')`;
        activeImageSlide = i
    })
})
// /* end переключение между разными кадрами продукта */

// toggle size buttons - переключение между кнопками размеров

const sizeBtns = document.querySelectorAll('.size-radio-btn');
let checkedBtn = 0;

sizeBtns.forEach((item, i) => {
    item.addEventListener('click', () => {
        sizeBtns[checkedBtn].classList.remove('check');
        item.classList.add('check');
        checkedBtn = i;
    })
})

// end переключение между кнопками размеров

const setData = (data) => {
    let title = document.querySelector('title');

    // setup the images
    productImages.forEach((img, i) => {
        if(data.images[i]){
            img.src = data.images[i];
        } else{
            img.style.display = 'none';
        }
    })
    productImages[0].click();

    // setup size buttons
    sizeBtns.forEach(item => {
        if(!data.sizes.includes(item.innerHTML)){
            item.style.display = 'none';
        }
    })

    //setting up texts
    // const name = document.querySelector('.product-brand');
    // const shortDes = document.querySelector('.product-short-des');
    // const des = document.querySelector('.des');

    title.innerHTML += " ";
    title.innerHTML += name.innerHTML = data.name;
    // shortDes.innerHTML = data.shortDes;
    // des.innerHTML = data.des;

    // pricing
    // const sellPrice = document.querySelector('.product-price');
    // const actualPrice = document.querySelector('.product-actual-price');
    // const discount = document.querySelector('.product-discount');

    // sellPrice.innerHTML = `$${data.sellPrice}`;
    // actualPrice.innerHTML = `$${data.actualPrice}`;
    // discount.innerHTML = `( ${data.discount}% off )`;

    // wishlist and cart btn
    // const wishlistBtn = document.querySelector('.wishlist-btn');
    // wishlistBtn.addEventListener('click', () => {
    //     wishlistBtn.innerHTML = add_product_to_cart_or_wishlist('wishlist', data);
    // })

    // const cartBtn = document.querySelector('.cart-btn');
    // cartBtn.addEventListener('click', () => {
    //     cartBtn.innerHTML = add_product_to_cart_or_wishlist('cart', data);
    // })
}

// fetch data
// const fetchProductData = () => {
//     fetch('/get-products', {
//         method: 'post',
//         headers: new Headers({ 'Content-Type': 'application/json' }),
//         body: JSON.stringify({id: productId})
//     })
//         .then(res => res.json())
//         .then(data => {
//             setData(data);
//             getProducts(data.tags[1]).then(data => createProductSlider(data, '.container-for-card-slider', 'similar products'))
//         })
//         .catch(err => {
//             location.replace('/404');
//         })
// }

let productId = null;
products.on("value", function (snapshot) {
    if (!snapshot.exists()) {
        console.log("No products found");
    } else {
        snapshot.forEach(function (element) {
            let data = element.val();
            data.id = element.key.toString().replace("+ ", "").trim();

            if(location.pathname !== '/product'){
                productId = decodeURI(location.pathname.split('/').pop());
                // getProductById(dbData, productId);
            }

            getProductById(data, productId);

        })
    }
})
// -----------------------------------------------------------------------------------
// const addToCartBtn = document.querySelector("#addToCart");
//
//
// addToCartBtn.addEventListener('click', function (e) {
//     const checkedSizeId = document.querySelector("label[class='size-radio-btn check']").id;
//
//     console.log("Id = " + checkedSizeId)
//
//     if (validateForm(checkedSizeId)) {
//         loader.style.display = 'block';
//         writeOrderData(productId, checkedSizeId);
//         location.reload();
//     }
// })
//
// function writeOrderData(productId, size) {
//     db
//         .ref('orders/' + docName)
//         .set({
//             name: productName.value,
//             shortDes: shortLine.value,
//             des: description.value,
//             images: downloadImagePaths,
//             sizes: sizesSet,
//             actualPrice: actPrice.value,
//             discount: discountPercentage.value,
//             sellPrice: sellingPrice.value,
//             stock: stockVal.value,
//             tags: tagsSet.value,
//             tac: tacCheck.checked,
//             email: userEmail
//         });
//     showAlert("Uploaded successfully.");
// }
//
// function getOrderId() {
//     orderid.on("value", function (snapshot) {
//         if (!snapshot.exists()) {
//             console.log("No products found");
//         } else {
//             snapshot.forEach(function (element) {
//                 let data = element.val();
//                 data.id = element.key.toString().replace("+ ", "").trim();
//
//                 if(location.pathname !== '/product'){
//                     productId = decodeURI(location.pathname.split('/').pop());
//                     // getProductById(dbData, productId);
//                 }
//
//                 getProductById(data, productId);
//
//             })
//         }
//     })
//
// }
// ----------------------------------------------------------------
const validateForm = (checkedSizeId) => {
    if (productId == null) {
        return showAlert('Product id not found.');
    } else if (checkedSizeId == null || checkedSizeId === "") {

        return showAlert('Please select a size.');
    }

    return true;
}

const createOrderId = function () {
    const date = new Date();
    console.log("OrderId     : ", date.getTime())

    return date.getTime();
}

let isOrderExisting;
const orderId = createOrderId();

orders.on("value", function (snapshot) {
    if (!snapshot.exists()) {
        console.log("No orders found");
        isOrderExisting = false;
        createNewOrder(orderId, new Date());
        isOrderExisting = true;
        console.log("****************** Order created ");
    } else {
        snapshot.forEach(function (element) {
            let data = element.val();
            if (data.active === true) {
                isOrderExisting = true;
                getOrderById(data, data.id);
            } else {
                isOrderExisting = false;
                createNewOrder(orderId, new Date());
                isOrderExisting = true;
                console.log("******************!!!!!!!!!! Order created ");
            }
        })
    }
})

let quantity = 0;
let checkedSizeId = 0;
let productsInOrder = [{productId, checkedSizeId, quantity}];
let totalPrice;

function addProductToOrder(
    orderId, productsInOrder, totalPrice){
    db
        .ref('orders/' + orderId)
        .set({
            products: productsInOrder,
            total: totalPrice.value
        });
    showAlert("Product added to cart successfully.");
}

function createNewOrder(
    orderId, orderDate){
    db
        .ref('orders/' + orderId)
        .set({
            id: orderId.value,
            date: orderDate.value,
            active: true,
        });
    showAlert("Order created successfully.");
}

const addToCartBtn = document.querySelector("#addToCart");
addToCartBtn.addEventListener('click', function (e) {

    checkedSizeId = document.querySelector("label[class='size-radio-btn check']").id;
    quantity = 1;
    console.log(checkedSizeId, quantity);

    if (validateForm(checkedSizeId)) {
        loader.style.display = 'block';
        addProductToOrder(orderId, productsInOrder, totalPrice);
        location.reload();
    }
})