//Bài tập 1:
var searchForm = document.getElementById("searchForm");
var searchContent = document.getElementById("searchContent");
var searchButton  = document.getElementById("searchButton");
searchContent.addEventListener('keypress', function(e){
if (e.keyCode ==  13){
        sendData();
    }
});
function sendData(){
    if (searchContent.value.length != 0){
        searchForm.action = "/timkiem.html";
        alert("Gửi thành công");
    }
    else {
        alert("Gửi thất bại");
    }
}

// Bài tập 2:

function formValidate(){
    var form = document.forms['regform'];
    //email
    var mail  = form.mail;
    var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    // Mật khẩu
    var mk = form.psw;
    var strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
    // Nhập lại mật khẩu
    var pre_mk = form.pre_psw;
    
    // Kiểm tra mail
    if (!filter.test(mail.value)){
        alert("Hãy nhập đúng định dạng Mail");
        mail.focus();
        return false;
    }
    
    // Kiểm tra mật khẩu 
    if (strongRegex.test(mk.value) == false || mk.value.lenght < 8){
        alert("MK có ký tự HOA, thường, ký tự đặc biệt và số!. Có độ dài ít nhất 8 ký tự");
        mk.focus();
        return false;
    }

    // Nhập lại mật khẩu
    if (mk.value != pre_mk.value){
        alert("Mật khẩu nhập lại không trùng khớp");
        pre_mk.focus;
        return false;
    }
    alert("Đăng ký thành công");
    return true;            
}

// Bài tập 3 + Bài tập 4:


var itemList = {
    sp001: {
      name: "Sữa Chua Vị Kiwi",
      price: 21000,
      photo: "images_lab1/sanpham/kiwi.jpg",
    },
  
    sp002: {
      name: "Sữa Chua Vị Xoài",
      price: 22000,
      photo: "images_lab1/sanpham/mango.jpg",
    },
  
    sp003: {
      name: "Sữa Chua Vị Dưa lưới",
      price: 23000,
      photo: "images_lab1/sanpham/cantaloupe.jpg",
    },
  
    sp004: {
      name: "Sữa Chua Vị Mâm Xôi",
      price: 24000,
      photo: "images_lab1/sanpham/blackberry.jpg",
    },
  
    sp005: {
      name: "Sữa Chua Vị Dâu Tây",
      price: 25000,
      photo: "images_lab1/sanpham/strawberry.jpg",
    },
  
    sp006: {
      name: "Sữa Chua Vị Việt Quất",
      price: 26000,
      photo: "images_lab1/sanpham/blueberry.jpg",
    },
  
    sp007: {
      name: "Sữa Chua Vị Bưởi",
      price: 27000,
      photo: "images_lab1/sanpham/grapes.jpg",
    },
  
    sp008: {
      name: "Sữa Chua Vị Táo Xanh",
      price: 28000,
      photo: "images_lab1/sanpham/green-apple.jpg",
    },
  
    sp009: {
      name: "Sữa Chua Vị Dứa",
      price: 29000,
      photo: "images_lab1/sanpham/pineapple.jpg",
    },
  };

function addCart(code) {
    var number = document.getElementById(code).value;
    
    if (typeof localStorage[code] === "undefined") {
      window.localStorage.setItem(code, number);
      alert("Đã thêm vào đơn đặt hàng")
    } 
    else {
        let number = parseInt(document.getElementById(code).value);
        let current = parseInt(window.localStorage.getItem(code));
        if (current + number > 100) {
            window.localStorage.setItem(code, 100);
            alert("Vượt quá số lượng cho phép đặt hàng");
            alert("Số lượng được đặt bằng 100");
        } 
        else {
            window.localStorage.setItem(code, current + number);
            alert("Đã cộng thêm số lượng vào đơn đặt hàng");
        }
    }
}
// Thêm sản phẩm
function add(sp,tr){
  var td = document.createElement('td');
  td.textContent = sp;
  tr.appendChild(td);
}

// Xóa sản phẩm

function removeCart(code){
  if (typeof localStorage[code] !== "undefined"){
    localStorage.removeItem(code);
    document.getElementById("code").innerHTML="";
    showCart();
  }
}


function getDiscountRate(){
  var d = new Date();
  var weekday = d.getDate();
  var totalMins = d.getHours()*60+d.getMinutes();
  if (weekday >= 1 && weekday <=3 && ((totalMins>=420 && totalMins <660) || (totalMins >=780 && totalMins <= 1200))){
    return 0.1;
  }
  return 0;
}

function showCart(){
    var TotalPreTax = 0;
    var A = 0; 
    var listSanPham = document.getElementById('listSanPham');
    for(var i =0; i < localStorage.length; i++){
        var key = localStorage.key(i);
        var item  = itemList[key];
        var photo = item.photo;
        var name = item.name;
        var price = item.price;
        var orderNumber = localStorage.getItem(key); 
        // Tạo ô dữ liệu chứa thông tin sản phẩm
        var tr = document.createElement('tr');
        var id = document.createAttribute('id');
        id.value = key;
        tr.setAttributeNode(id);
        listSanPham.appendChild(tr);    
        // Tạo ô dữ liệu chứa hình sản phẩm
        var td = document.createElement('td');
        td.style.width='150px';
        td.innerHTML = "<img width = '100px' src='./"+ photo +"'>";
        tr.appendChild(td);
        // Tạo ô dữ liệu chứa tên sản phẩm 
        add(name,tr);
        // Tạo ô dữ liệu chứa số lượng
        add(orderNumber,tr);
        // Tạo ô dữ liệu chứa giá
        var tdGia= document.createElement('td');
        tdGia.textContent = new Intl.NumberFormat('vi-VI', { style: 'currency', currency: 'VND' }).format(price);
        tr.appendChild(tdGia);

        // Tạo ô dữ liệu chứa thành tiền
        var tdThanhTien = document.createElement('td');
        var thanhTien = orderNumber * price;
        A += thanhTien;
        tdThanhTien.textContent = new Intl.NumberFormat('vi-VI', { style: 'currency', currency: 'VND' }).format(thanhTien);
        tr.appendChild(tdThanhTien);
        // Tạo ô dữ liệu chứa nút xóa sản phẩm 
        var tdXoa = document.createElement('td');
        tdXoa.innerHTML = "<i class='fa fa-trash icon-pink'> </i> </a>";
        tdXoa.style.textAlign="center";
        tr.appendChild(tdXoa);
        // Xóa đơn hàng 
      }
    // Tổng thành tiền
    var tongThanhTien = document.getElementById("tongThanhTien");
    var spanTT = document.createElement('span');
    spanTT.textContent = new Intl.NumberFormat('vi-VI', { style: 'currency', currency: 'VND' }).format(A);
    tongThanhTien.appendChild(spanTT);
    // Chiết khấu
    var chietKhau  = document.getElementById("chietKhau");
    var spanCK= document.createElement('span');
    var phanTramCK = getDiscountRate();
    var B = A*phanTramCK;
    spanCK.textContent = new Intl.NumberFormat('vi-VI', { style: 'currency', currency: 'VND' }).format(B);
    chietKhau.appendChild(spanCK);
    // Thuế
    var thue = document.getElementById("thue");
    var spanThue = document.createElement('span');
    var C = 0.1 * (A-B);
    spanThue.textContent = new Intl.NumberFormat('vi-VI', { style: 'currency', currency: 'VND' }).format(C);
    thue.appendChild(spanThue);
    // Tổng đơn hàng
    var tongDonHang = document.getElementById("tongDonHang");
    var spanTongDonHang = document.createElement('span');
    var TotalPreTax = A - B + C;
    spanTongDonHang.textContent = new Intl.NumberFormat('vi-VI', { style: 'currency', currency: 'VND' }).format(TotalPreTax);
    tongDonHang.appendChild(spanTongDonHang);
}

// Di chuyển đến chi tiết đơn hàng
var cart = document.getElementById("cart");
cart.onclick = function (){
  window.location.href="donhang.html";
}
cart.addEventListener('click',showCart());

window.onstorage = () => {
      showCart();
}
