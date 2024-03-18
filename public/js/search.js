const searchKey = decodeURI(location.pathname.split('/').pop());
const searchSpanElement = document.querySelector('#search-key');

searchSpanElement.innerHTML = searchKey;
document.title = "YS Fashion | Search Result for " + searchKey.toUpperCase();

let keyWords = searchKey;
keyWords = cleanKeyWords(keyWords);
console.log("keyWords = ", keyWords);

function cleanKeyWords(string) {
    return string.trim().toLowerCase()
        .replace(/[^0-9A-Za-z_\u0400-\u04FF]/gi, ' ')
        .replace(/\s+/g, ' ')
        .split(" ");
}

let result = [];
let tempResult = "";

function getSearchResult(data) {
    if(keyWords.length) {
        const id = data.id;
        let tags = data.tags.toString() + data.name.toString() + data.des.toString() + data.shortDes.toString();  // по каким полям идет поиск
        tags = cleanTags(tags);

        keyWords.forEach((keyWord) => {
            // console.log("keyWord = ", keyWord);
            if(keyWord.length > 2) {
                tags.forEach((tag) => {
                    // console.log("tag = ", tag);
                    if (tag.includes(keyWord)) {
                        // console.log("Yes!");
                        // console.log("tempResult = ", tempResult);
                        if (!tempResult.includes(id)) {
                            // console.log("Not included!");
                            tempResult += id + " ";
                            // console.log("tempResult = ", tempResult);

                            result.push(data);
                            console.log("searchResult", result);
                        }
                    }
                })
            }
        })
        return result;
    }
}
// createInDemandProductSlider();

// let searchResult = [];
// let tempResult = "";
//
// function getSearchResult(data) {
//     const id = data.id;
//     let tags = data.tags.toString();
//     tags = cleanTags(tags);
//
//     keyWords.forEach((keyWord) => {
//         console.log("keyWord = ", keyWord);
//         if(keyWord.length > 2) {
//             tags.forEach((tag) => {
//                 console.log("tag = ", tag);
//                 if (tag.includes(keyWord)) {
//                     console.log("Yes!");
//                     console.log("tempResult = ", tempResult);
//                     if (!tempResult.includes(id)) {
//                         console.log("Not included!");
//                         tempResult += id + " ";
//                         console.log("tempResult = ", tempResult);
//
//                         searchResult.push(data);
//                         console.log("searchResult", searchResult);
//                     }
//                 }
//             })
//         }
//     })
//     return searchResult;
// }


// fetch product cards
// const getProducts = (tag) => {
//     return fetch('/get-products', {
//         method: "post",
//         headers: new Headers({"Content-Type": "application/json"}),
//         body: JSON.stringify({tag: tag})
//     })
//         .then(res => res.json())
//         .then(data => {
//             return data;
//         })
// }

//



// getProducts(searchKey).then(data => createProductCards(data, '.card-container'));



//
// <script>
//     const firebaseConfig = {
//     apiKey: "AIzaSyCB-JoobxE4Jkyq-HWgfkZFWszZhjTFfXs",
//     authDomain: "ajshop-be1e0.firebaseapp.com",
//     databaseURL: "https://ajshop-be1e0-default-rtdb.firebaseio.com",
//     projectId: "ajshop-be1e0",
//     storageBucket: "ajshop-be1e0.appspot.com",
//     messagingSenderId: "136800496353",
//     appId: "1:136800496353:web:b8972f32172498b3bbe5a0"
// };
//
//     firebase.initializeApp(firebaseConfig);
//     const db = firebase.database();
//     const products = db.ref("products");
//
//     // let searchResult = [];
//
//     products.on("value", function (snapshot) {
//     if (!snapshot.exists()) {
//     console.log("No products found");
// } else {
//     snapshot.forEach(function (element) {
//     let data = element.val();
//     data.id = element.key.toString().replace("-", "").trim();
//     console.log(data);
//
//     // const id = data.id;
//     let tags = data.tags.toString();
//     //     tags = cleanTags(tags);
//
//     getSearchResult(keyWords, data);
//
//     if(tags.toLowerCase().includes("AWAKE".trim().toLowerCase())) {
//         console.log("Found product!")
//
//         searchResult.push(data);
//     }
// })
// }
// })
//
//     console.log("searchResult = ", searchResult);

    // let searchResult = [];
    // let tempResult = "";
    //
    // let keyWords = searchBox.value;

    // function cleanKeyWords(string) {
    //     return string
    //         .trim()
    //         .toLowerCase()
    //         .replace(/[^0-9A-Za-z_\u0400-\u04FF]/gi, ' ')
    //         .replace(/\s+/g, ' ')
    //         .split(" ");
    // }

    // function cleanTags(tags) {
    //     tags = tags.trim().toLowerCase();
    //     const arrTags = tags.split(" ");
    //     arrTags.forEach((tag) => {
    //         const index = arrTags.indexOf(tag);
    //         tag = tag
    //             .replaceAll(/[^0-9A-Za-z_\u0400-\u04FF]/gi, '')
    //             .replaceAll(/\s+/g, ' ');
    //         arrTags[index] = tag;
    //     })
    //
    //     return arrTags;
    // }

    // function getSearchResult(keyWords, data) {
    //     const id = data.id;
    //     let tags = data.tags.toString();
    //     tags = cleanTags(tags);
    //
    //     keyWords.forEach((keyWord) => {
    //         console.log("keyWord = ", keyWord);
    //         if(keyWord.length > 2) {
    //             tags.forEach((tag) => {
    //                 console.log("tag = ", tag);
    //                 if (tag.includes(keyWord)) {
    //                     console.log("Yes!");
    //                     console.log("tempResult = ", tempResult);
    //                     if (!tempResult.includes(id)) {
    //                         console.log("Not included!");
    //                         tempResult += id + " ";
    //                         console.log("tempResult = ", tempResult);
    //
    //                         searchResult.push(data);
    //                         console.log("searchResult", searchResult);
    //                     }
    //                 }
    //             })
    //         }
    //     })
    // }

    // keyWords = cleanKeyWords(keyWords);
    // console.log("keyWords = ", keyWords);
    //
    // products.on("value", function (snapshot) {
    //     if (!snapshot.exists()) {
    //         console.log("No products found");
    //     } else {
    //         snapshot.forEach(function (element) {
    //             let data = element.val();
    //             data.id = element.key.toString().replace("-", "").trim();
    //             console.log(data);
    //
    //             getSearchResult(keyWords, data);
    //
    //             // if(tags.toLowerCase().includes("AWAKE".trim().toLowerCase())) {
    //             //     console.log("Found product!")
    //             //
    //             //     searchResult.push(data);
    //             // }
    //         })
    //     }
    // })
    // </script>

