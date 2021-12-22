let tableProducts = document.querySelector('.body-table');
let getSumPrice = document.querySelector('.sumPrice');
let getDiscount = document.querySelector('.discount');
let getTax = document.querySelector('.tax');
let getResult = document.querySelector('.result');
let getShip = document.querySelector('.ship');

var itemList = ['soLuongSanPham1', 'soLuongSanPham2', 'soLuongSanPham3',
    'soLuongSanPham4', 'soLuongSanPham5', 'soLuongSanPham6',
    'soLuongSanPham7', 'soLuongSanPham8',
]
var itemProduct = [{
        "name": "Cải cầu vòng",
        "price": 140000,
        "photo": "image/PhanLoaiRau/RAL-cai-cau-vong.jpg",
    },
    {
        "name": "Bắp cải",
        "price": 21000,
        "photo": "image/PhanLoaiRau/RAL-bap-cai.jpg"
    },
    {
        "name": "Cải thìa",
        "price": 22000,
        "photo": "image/PhanLoaiRau/RAL-cai-thia.jpg"
    },
    {
        "name": "Lá vừng",
        "price": 120000,
        "photo": "image/PhanLoaiRau/RAL-la-vung.png"
    },
    {
        "name": "Rau má",
        "price": 20000,
        "photo": "image/PhanLoaiRau/RAL-rau-ma.jpg"
    },
    {
        "name": "Cải bó xôi",
        "price": 70000,
        "photo": "image/PhanLoaiRau/RAL-rau_chan_vit.jpg"
    },
    {
        "name": "Tần ô",
        "price": 50000,
        "photo": "image/PhanLoaiRau/RAL-tan-o.jpeg"
    },
    {
        "name": "Rau dền khoang",
        "price": 35000,
        "photo": "image/PhanLoaiRau/RAL-den-khoang.jpeg"
    }
];
var total = 0;
var discount = 0;
var tax = 0;
var result = 0;
var ship = 30000;
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
        ship = 30000;
        result = total - discount + tax + ship;

        getSumPrice.innerHTML = `Tạm Tính= ${total} VNĐ`;
        getDiscount.innerHTML = `Chiết Khấu = ${discount} VNĐ`;
        getTax.innerHTML = `Thuế VAT (10%) = ${tax} VNĐ`;
        getShip.innerHTML = `Phí vận chuyển = ${ship} VNĐ`;
        getResult.innerHTML = `Tổng Tiền = ${result} VNĐ`;

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