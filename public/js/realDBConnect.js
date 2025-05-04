const firebaseConfig = {
    apiKey: "AIzaSyBk0QuQmNSMDMkB5NsFJEocPZMNuG9_OVg",
    authDomain: "appl-10441.firebaseapp.com",
    databaseURL: "https://appl-10441-default-rtdb.firebaseio.com",
    projectId: "appl-10441",
    storageBucket: "appl-10441.appspot.com",
    messagingSenderId: "728465921539",
    appId: "1:728465921539:web:7f856d993ce586e58ae036"
};
// ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑

firebase.initializeApp(firebaseConfig);
const db = firebase.database();
const realDBSearch = firebase.database();
const products = realDBSearch.ref("products");
const products1 = db.ref("products");
const orders = db.ref("orders");
const productsIds = db.ref("productsIds");

let youMayAlsoLikedResult = [];
console.log(youMayAlsoLikedResult);
let womenResult = [];
let menResult = [];
let shoesResult = [];
let accessoriesResult = [];
let womenSection = document.getElementById('womenResults');
let menSection = document.getElementById('menResults');
let shoesSection = document.getElementById('shoesResults');
let accessoriesSection = document.getElementById('accessoriesResults');


function loadData() {
    products.on("value", function (snapshot) {
        if (!snapshot.exists()) {
            console.log("No products found");
        } else {
            snapshot.forEach(function (element) {
                let data = element.val();
                data.id = element.key.toString().replace("+ ", "").trim();
                console.log(data.id);

                getCategoryProducts(data, '1');
                getCategoryProducts(data, '2');
                getCategoryProducts(data, '3');
                getCategoryProducts(data, '4');
                getCategoryProducts(data, '5');
            })
        }
        if(womenSection) {
            createResultCards(womenResult)
        } else if(menSection) {
            createResultCards(menResult)
        } else if(shoesSection) {
            createResultCards(shoesResult)
        } else if(accessoriesSection) {
            createResultCards(accessoriesResult)
        }

        createProductSlider('Accessories', 'product-accessories', accessoriesResult);
        createProductSlider('Shoes', 'product-shoes', shoesResult);
        createProductSlider('You may also like', 'product-you-may-also-liked', youMayAlsoLikedResult);
    });
}

window.addEventListener("load", loadData);

function getCategoryProducts(data, category) {
    let itemCategories = data.category.toString().replaceAll(",", "");

    if (itemCategories.includes(category)) {
        switch (category) {
            case '1' : return youMayAlsoLikedResult.push(data);
            case '2' : return menResult.push(data);
            case '3' : return womenResult.push(data);
            case '4' : return shoesResult.push(data);
            case '5' : return accessoriesResult.push(data);
        }
    }
}

function getProductById(data, id) {

        let itemId = data.id.toString().replaceAll(",", "");

        if (itemId === id) {
            //setting up texts
            const name = document.querySelector('.product-brand');
            const shortDes = document.querySelector('.product-short-des');
            const des = document.querySelector('.des');

            name.innerHTML = data.name;
            shortDes.innerHTML = data.shortDes;
            des.innerHTML = data.des;

            // pricing
            const sellPrice = document.querySelector('.product-price');
            const actualPrice = document.querySelector('.product-actual-price');
            const discount = document.querySelector('.product-discount');


            sellPrice.innerHTML = `$${(Number(data.actualPrice) - (Number(data.actualPrice) * Number(data.discount) / 100)).toFixed(2)}`;
            actualPrice.innerHTML = `$${Number(data.actualPrice).toFixed(2)}`;
            discount.innerHTML = `(${Number(data.discount).toFixed(0)}% off)`;


            setData(data);

            // wishlist and cart btn
            const wishlistBtn = document.querySelector('.wishlist-btn');
            // wishlistBtn.addEventListener('click', () => {
            //     wishlistBtn.innerHTML = add_product_to_cart_or_wishlist('wishlist', product);
            // })

            const cartBtn = document.querySelector('.cart-btn');
            // cartBtn.addEventListener('click', () => {
            //     cartBtn.innerHTML = add_product_to_cart_or_wishlist('cart', product);
            // })
        }
}

function getCurrentOrderId() {
    if (location.pathname !== '/cart') {

        return decodeURI(location.pathname.split('/').pop());
    }

    return 0;
}

function getProductsInActiveOrder() {
    let productsInActiveOrder;
}

// const createSmallCard = (product) => {
//     return `
//     <div class="sm-product">
//         <img src="../img/product%20image%201.png" class="sm-product-img" alt="">
//         <div class="sm-text">
//             <p class="sm-product-name">${product.name}</p>
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

function getProductByIdOnCart() {

    console.log("Something");

    const currentOrderId = getCurrentOrderId();

    productsIds.on("value", function (snapshot) {
        if (!snapshot.exists()) {
            console.log("No productsInOrder found");

            location.href = '/404';
        } else {
            snapshot.forEach(function (element) {

              const productsInActiveOrder = element.val();

                console.log("productsInActiveOrder  = ", productsInActiveOrder);
                // return productsInActiveOrder;


        //setting up texts
        const name1 = document.querySelector('.sm-product-name');
        const shortDes = document.querySelector('.sm-des');
        const price = document.querySelector('.sm-price');
        const priceTotal = document.querySelector('.bill');
        const itemCount = document.querySelector('.item-count');
        const size = document.querySelector('.sm-size');

    // let start = document.querySelector('.cart');
    let middle = '';
    let end = '</div>';
    let product;
    let dataID;



        for (let i = 1; i < productsInActiveOrder.length; i++) {
            const allProducts = productsInActiveOrder.split(" ");
            // getProductsInActiveOrder()
            // console.log("productsInActiveOrder = ", productsInActiveOrder);
            console.log("allProducts === ", allProducts);

            const productID = allProducts[i].split("-")[0];
            const productSize = allProducts[i].split("-")[1];

            products1.on("value", function (snapshot) {
                if (!snapshot.exists()) {
                    console.log("No products found");
                } else {
                    snapshot.forEach(function (element) {
                        let data = element.val();
                        data.id = element.key.toString().replace("+ ", "").trim();
                        dataID = element.key.toString().replace("+ ", "").trim();

                        // product = data;

                        console.log("++++++++  ", data.name);
                        console.log("productID = ", productID);
                        console.log("dataID = ", dataID);
                        console.log("SIZE = ", productSize);


                        if (productID === dataID) {
                            console.log("!!!! Show us something, please!!!!!")
                            middle += createSmallCard(data);

                            console.log(middle);
                        }
                    });
                }
            });

        }
            });
        }
    })

    let cardContainer = document.querySelector('.cart');
    // НУЖЕН ЕЩЕ ОДИН ЭЛЕМНТ!!!
    cardContainer.innerHTML = middle + end;
}

// function getOrderById(data, id) {
//
//     let orderId = data.id.toString();
//
//     if (orderId === id) {
//
//         //setting up texts
//         const name = document.querySelector('.product-brand');
//         const shortDes = document.querySelector('.product-short-des');
//         const des = document.querySelector('.des');
//
//         name.innerHTML = data.name;
//         shortDes.innerHTML = data.shortDes;
//         des.innerHTML = data.des;
//
//         // pricing
//         const sellPrice = document.querySelector('.product-price');
//         const actualPrice = document.querySelector('.product-actual-price');
//         const discount = document.querySelector('.product-discount');
//
//         sellPrice.innerHTML = `$${data.sellPrice}`;
//         actualPrice.innerHTML = `$${data.actualPrice}`;
//         discount.innerHTML = `( ${data.discount}% off )`;
//
//         setData(data);
//
//         // wishlist and cart btn
//         const wishlistBtn = document.querySelector('.wishlist-btn');
//         // wishlistBtn.addEventListener('click', () => {
//         //     wishlistBtn.innerHTML = add_product_to_cart_or_wishlist('wishlist', product);
//         // })
//
//         const cartBtn = document.querySelector('.cart-btn');
//         // cartBtn.addEventListener('click', () => {
//         //     cartBtn.innerHTML = add_product_to_cart_or_wishlist('cart', product);
//         // })
//     }
// }

const createProductCard = (result) => {
    return `
         <div class="product-card" onclick="location.href='/product/${result.id}'">
             <div class="product-image">
                 <img src="${result.images[0]}" class="product-thumb" alt=""
<!--                 <img src = "../img/AJShop/bag-icon.png" class = "bag-quick" alt = "" >-->
             </div>
             <div class="product-info">
                <!-- <p class="product-name">${result.id}</p> -->
                 <p class="product-name">${result.name}</p>
                 <span class="actual-price">$${Number(result.actualPrice).toFixed(2)}</span>
                 <span class="price">$${Number(result.sellPrice).toFixed(2)}</span>

             </div>
         </div>
    `;
}

const createSearchResultCards = (searchResult, parent) => {
    let start = '<div class="product-search-container">';
    let middle = '';
    let end = '</div>';

    for(let i = 0; i < searchResult.length; i++){
        if(searchResult[i].id !== decodeURI(location.pathname.split('/').pop())){
            middle += createProductCard(searchResult[i]);
        }
    }
    if(parent){
        let cardContainer = document.querySelector(parent);
        cardContainer.innerHTML = start + middle + end;
    } else{
        return start + middle + end;
    }
}

const createResultCards = (result) => {
    let start = '<div class="category-container">';
    let middle = '';
    let end = '</div>';

    for(let i = 0; i < result.length; i++){
        if(result[i]){
            middle += createProductCard(result[i]);
        }
    }
    if(parent){
        let cardContainer = document.querySelector('.card-container');
        cardContainer.innerHTML = start + middle + end;
    } else{
        return start + middle + end;
    }
}

const createProductSlider = (categoryTitle, categoryParent, categoryResult) => {

    const start = `
        <h2 class="section-heading">${categoryTitle}</h2>
        <button class="pre-btn"><img src="../img/arrow.png" alt=""></button>
        <button class="nxt-btn"><img src="../img/arrow.png" alt=""></button>
        <div class="product-container">
    `;
    let middle = '';
    const end = '</div>';

    for(let i = 0; i < categoryResult.length; i++){
        middle += createProductCard(categoryResult[i]);
    }

    let slideContainer = document.querySelector(`.product.${categoryParent}`);
    if(slideContainer){
        slideContainer.innerHTML = start + middle + end;
    } else{
        return start + middle + end;
    }
    setupSlidingEffect();
}

const setupSlidingEffect = () => {
    const productContainers = [...document.querySelectorAll('.product-container')];
    const nxtBtn = [...document.querySelectorAll('.nxt-btn')];
    const preBtn = [...document.querySelectorAll('.pre-btn')];

    productContainers.forEach((item, i) => {
        let containerDimenstions = item.getBoundingClientRect();
        let containerWidth = containerDimenstions.width;

        nxtBtn[i].addEventListener('click', () => {
            item.scrollLeft += containerWidth;
        })

        preBtn[i].addEventListener('click', () => {
            item.scrollLeft -= containerWidth;
        })
    })
}

function cleanTags(tags) {
    tags = tags.trim().toLowerCase();
    const arrTags = tags.split(" ");
    arrTags.forEach((tag) => {
        const index = arrTags.indexOf(tag);
        tag = tag.replaceAll(/[^0-9A-Za-z_\u0400-\u04FF]/gi, '').replaceAll(/\s+/g, ' ');
        arrTags[index] = tag;
    })
    return arrTags;
}
