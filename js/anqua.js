let orderProducts = document.getElementsByClassName('quantity');
let quantity = document.getElementsByClassName('quantity-input');
let btnOrder = document.querySelectorAll('.btn-order');


let arrOrderProducts = Array.from(orderProducts);
let arrBtnOrder = Array.from(btnOrder);
let arrQuantity = Array.from(quantity);


arrOrderProducts.map((item, index) => {
        let quantityProduct = item.querySelector('.quantity-input');
        let btnOrderProduct = item.querySelector('.btn-order');
        var soLuong = 0;
        quantityProduct.onchange = (e) => {
                soLuong = e.target.value;
            }
            //localStorage.setItem(`soLuongSanPham${index + 1}`, {});


        btnOrderProduct.onclick = () => {
            if (soLuong > 100 || soLuong == 0) {

                alert("Số Lượng Phải Tối Thiểu 1 Và Tối Đa 100");
            } else {
                localStorage.setItem(`soLuongSanPham${index + 1}`, JSON.stringify({
                    "detailProducts": itemList[index],
                    "soLuong": +soLuong
                }));
                alert("Đã thêm vào giỏ hàng");
            }
        }

    })
    //hard code
var itemList = [{
        "name": "Bơ",
        "price": 35000,
        "photo": "image/PhanLoaiRau/RAQ-bo.png",
    },
    {
        "name": "Bí ngô",
        "price": 15000,
        "photo": "image/PhanLoaiRau/RAQ-bi-do.jpg"
    },
    {
        "name": "Cà chua",
        "price": 32000,
        "photo": "image/PhanLoaiRau/RAQ-ca-chua.png"
    },
    {
        "name": "Khổ qua",
        "price": 45000,
        "photo": "image/PhanLoaiRau/RAQ-kho-qua.jpg"
    },
    {
        "name": "Dưa chuột",
        "price": 30000,
        "photo": "image/PhanLoaiRau/RAQ-dua-chuot-gai.jpg"
    },
    {
        "name": "Cà tím",
        "price": 25000,
        "photo": "image/PhanLoaiRau/RAQ-ca-tim.jpg"
    },
    {
        "name": "Ớt chuông",
        "price": 80000,
        "photo": "image/PhanLoaiRau/RAQ-ot.jpg"
    },
    {
        "name": "Mướp",
        "price": 30000,
        "photo": "image/PhanLoaiRau/RAQ-muop.jpg"
    }
];



for (let i = 0; i < 8; i++) {
    if (localStorage.length < 8) {
        localStorage.setItem(`soLuongSanPham${i + 1}`, JSON.stringify({
            "detailProducts": itemList[i],
            "soLuong": 0
        }));
    }
}