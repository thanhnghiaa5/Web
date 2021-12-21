let tableProducts = document.querySelector('.body-table');
let getSumPrice = document.querySelector('.sumPrice');
let getDiscount = document.querySelector('.discount');
let getTax = document.querySelector('.tax');
let getResult = document.querySelector('.result');

var itemList = ['soLuongSanPham1', 'soLuongSanPham2', 'soLuongSanPham3',
    'soLuongSanPham4', 'soLuongSanPham5', 'soLuongSanPham6',
    'soLuongSanPham7', 'soLuongSanPham8', 'soLuongSanPham9',
]
var itemProduct = [{
        "name": "Sữa Chua Vị Kiwi",
        "price": 21000,
        "photo": "images/sanpham/kiwi.jpg"
    },
    {
        "name": "Sữa Chua Vị Xoài",
        "price": 22000,
        "photo": "images/sanpham/mango.jpg"
    },
    {
        "name": "Sữa Chua Vị Dưa lưới",
        "price": 23000,
        "photo": "images/sanpham/cantaloupe.jpg"
    },
    {
        "name": "Sữa Chua Vị Mâm Xôi",
        "price": 24000,
        "photo": "images/sanpham/blackberry.jpg"
    },
    {
        "name": "Sữa Chua Vị Dâu Tây",
        "price": 25000,
        "photo": "images/sanpham/strawberry.jpg"
    },
    {
        "name": "Sữa Chua Vị Việt Quất",
        "price": 26000,
        "photo": "images/sanpham/blueberry.jpg"
    },
    {
        "name": "Sữa Chua Vị Bưởi",
        "price": 27000,
        "photo": "images/sanpham/grapes.jpg"
    },
    {
        "name": "Sữa Chua Vị Táo Xanh",
        "price": 28000,
        "photo": "images/sanpham/green-apple.jpg"
    },
    {
        "name": "Sữa Chua Vị Dứa",
        "price": 29000,
        "photo": "images/sanpham/pineapple.jpg"
    }
];
var total = 0;
var discount = 0;
var tax = 0;
var result = 0;
// hard code
itemList.map((item, index) => {
    tableProducts.innerHTML += `
    <tr class="${item}">
        
    </tr>
    `
    var cart = JSON.parse(localStorage.getItem(item));
    window.addEventListener("storage", storageEventHandler);
    if (cart) {
        function showCart() {
            if (cart.soLuong === 0) {} else {
                document.querySelector(`.${item}`).innerHTML += `
                    
                        <td class="img-product">
                            <div class="img__products"
                                style="background-image: url(${cart.detailProducts.photo});">

                            </div>
                        </td>
                        <td>${cart.detailProducts.name}</td>
                        <td>${cart.soLuong}</td>
                        <td>${cart.detailProducts.price}</td>
                        <td>${cart.detailProducts.price * cart.soLuong}</td>
                        <td >
                            <i class="fas fa-trash-alt trash-icon" data-index="${index}"></i>
                        </td>
                    

                    `

            }

        }
        showCart();

        function getDayDiscount() {
            var d = new Date();
            var weekday = d.getDay();
            var totalMins = d.getHours() * 60 + d.getMinutes();
            if (weekday >= 1 && weekday <= 3 && ((totalMins >= 420 && totalMins <= 660) || (totalMins >= 780 && totalMins <= 1020))) {
                return 0.1;
            } else {
                return 0;

            }
        }
        total += cart.detailProducts.price * cart.soLuong;
        discount = getDayDiscount() * total;
        tax = 0.1 * (total - discount);
        result = total - discount + tax;

        getSumPrice.innerHTML = `Tổng Thành Tiền (A) = ${total}`;
        getDiscount.innerHTML = `Chiết Khấu (B) = ${discount}`;
        getTax.innerHTML = `Thuế (C) = ${tax}`;
        getResult.innerHTML = `Tổng Đơn Hàng = ${result}`;

    }

    function storageEventHandler(evt) {
        let newURL = new URL(evt.url)
            //console.log(evt.key);
        if (location.pathname !== newURL.pathname) {
            let data = JSON.parse(evt.newValue)

            if (data) {
                document.querySelector(`.${evt.key}`).innerHTML = `

                            <td class="img-product">
                                <div class="img__products"
                                    style="background-image: url(${data.detailProducts.photo});">

                                </div>
                            </td>
                            <td>${data.detailProducts.name}</td>
                            <td>${data.soLuong}</td>
                            <td>${data.detailProducts.price}</td>
                            <td>${data.detailProducts.price * data.soLuong}</td>
                            <td >
                                <i class="fas fa-trash-alt trash-icon" data-index="${index}"></i>
                            </td>


                        `

            }
            if (!JSON.parse(evt.oldValue)) {
                showCart();
            }

        }

    }

    //delete
    let btnTrashBin = document.querySelectorAll('.trash-icon');
    let arrBtnTrashbin = Array.from(btnTrashBin);
    if (arrBtnTrashbin) {
        arrBtnTrashbin.map((item, index) => {
            item.onclick = (e) => {
                let indexProduct = +e.target.dataset.index;
                console.log(indexProduct + 1);

                let getTD = document.querySelectorAll(`.soLuongSanPham${indexProduct + 1} td`);
                arrTD = Array.from(getTD);
                arrTD.map((value, index) => {
                    value.remove()
                })
                localStorage.setItem(`soLuongSanPham${indexProduct + 1}`, JSON.stringify({
                    "detailProducts": itemProduct[indexProduct],
                    "soLuong": 0
                }));

            }

        })

    }
})