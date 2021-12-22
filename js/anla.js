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



for (let i = 0; i < 8; i++) {
    if (localStorage.length < 8) {
        localStorage.setItem(`soLuongSanPham${i + 1}`, JSON.stringify({
            "detailProducts": itemList[i],
            "soLuong": 0
        }));
    }
}