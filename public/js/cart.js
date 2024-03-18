// create small product cards
const createSmallCards = (data) => {
    return `
    <div class="sm-product">
        <img src="../img/product_image_1.png" class="sm-product-img" alt="">
        <div class="sm-text">
            <p class="sm-product-name">BRAND</p>
            <p class="sm-des">this is a short line about</p>
        </div>
        <div class="item-counter">
            <button class="counter-btn decrement">-</button>
            <p class="item-count">1</p>
            <button class="counter-btn increment">+</button>
        </div>
        <p class="sm-price">$20</p>
        <button class="sm-delete-btn"><img src="../img/close.png" alt=""></button>
    </div>
    `;
}



// // create small product cards
// const createSmallCards = (data) => {
//     return `
// <!-- этот код закомментировали в cart.html и перенесли в cart.js, вместо статики преобразовали в динамику -->
//     <div class="sm-product">
// <!--        <img src="img/product_image_1.png" class="sm-product-img" alt="">  -->
//         <img src="${data.image}" class="sm-product-img" alt="">
//         <div class="sm-text">
// <!--            <p class="sm-product-name">BRAND</p>-->
//             <p class="sm-product-name">${data.name}</p>
// <!--            <p class="sm-des">this is a short line about</p>-->
//             <p class="sm-des">${data.shortDes}</p>
//         </div>
//         <div class="item-counter">
//             <button class="counter-btn decrement">-</button>
// <!--            <p class="item-count">1</p>-->
//             <p class="item-count">${data.item}</p>
//             <button class="counter-btn increment">+</button>
//         </div>
// <!--        <p class="sm-price">$20</p>-->
//         <p class="sm-price" data-price="${data.sellPrice}">${data.sellPrice * data.item}</p>
//         <button class="sm-delete-btn"><img src="img/close.png" alt=""></button>
//     </div>
//     `;
// }
//
// const setProducts = (name) => {
//     const element = document.querySelector(`.${name}`)
// //                           document.querySelector - это метод, который позволяет выбирать элементы на веб-странице
// //                           с использованием селекторов CSS.
//     let data = JSON.parse(localStorage.getItem(name));
//     if (data == null){
//         element.innerHTML = `<img src="img/empty-cart.png" class="empty-img" alt="">`;
//     } else{
//         for (let i = 0; i < data.length; i++){
//             element.innerHTML += createSmallCards(data[i])
//         }
//     }
// }
//
// setProducts('cart');
// setProducts('wishlist');