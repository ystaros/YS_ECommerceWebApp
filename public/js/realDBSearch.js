let searchResult = [];
let inDemandResult1 = [];

products.on("value", function (snapshot) {
    if (!snapshot.exists()) {
        console.log("No products found");
    } else {
        snapshot.forEach(function (element) {
            let data = element.val();
            data.id = element.key.toString().replace("+ ", "").trim();

            searchResult = getSearchResult(data);
            console.log(searchResult)

            inDemandResult1 = getCategoryProducts(data, '1');

            createSearchResultCards(searchResult, '.card-container');

        })

        createProductSlider('You may also like', 'product-you-may-also-liked', youMayAlsoLikedResult);
    }
})


// let searchResult = [];
// let inDemandResult1 = [];
//
// products.on("value", function (snapshot) {
//     if (!snapshot.exists()) {
//         console.log("No products found");
//     } else {
//         snapshot.forEach(function (element) {
//             let data = element.val();
//             data.id = element.key.toString().replace("-", "").trim();
//
//             searchResult = getSearchResult(data);
//             inDemandResult1 = getCategoryProducts(data, '1');
//
//             createSearchResultCards(searchResult, '.card-container');
//
//         })
//
//         createInDemandProductSlider();
//     }
// })
