function frmValidate() {
    var frm = document.forms['regfr'];
    var hoten = frm.hoten;
    var tuoi = frm.tuoi;
    var sdt = frm.sdt;
    var bh = frm.bh;

    //hoten
    if (hoten.value.length == 0) {
        alert("Hãy điền họ tên!");
        hoten.focus();
        return false;
    }
    //tuoi
    if (tuoi.value.length == 0) {
        alert("Hãy nhập tuổi");
        tuoi.focus();
        return false;
    }
    // if (tuoi.value < 18 || tuoi.value < 45) {
    //     alert("Hãy điền tuổi < 18 hoặc > 45");
    //     tuoi.focus();
    //     return false;
    // }
    //sdt
    if (sdt.value.length != 10) {
        alert("Hãy điền số điện thoại đủ 10 ký tự!");
        sdt.focus();
        return false;
    }

    //mail
    var email = frm.email;
    var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (email.value.length == 0) {
        alert("Hãy điền email!");
        email.focus();
        return false;
    }
    if (!filter.test(email.value)) {
        alert("Hãy nhập đúng định dạng Mail!");
        email.focus();
        return false;
    }
    //MK
    var mk = frm.mk;
    var strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
    //nhập lại mk
    var pre_mk = frm.pre_mk;
    //kiểm tra mk
    /*
    Mật khẩu phải chứa ít nhất
    1 ký tự HOA
    1 ký tự thường
    1 chữ số
    1 ký tự đặc biệt
    độ dài tối thiểu 8 ký tự
    */
    if (strongRegex.test(mk.value) == false) {
        alert("Mk có ký tự in HOA, thường, ký tự đặc biệt và số!");
        mk.focus();
        return false;
    }
    //Nhập lại Mật khẩu: 
    //kiểm tra đúng với trường mật khẩu đã nhập trước đó
    if (mk.value != pre_mk.value) {
        alert("Nhập lại mk không trùng khớp");
        pre_mk.focus();
        return false;
    }


    alert("Đăng ký thành công!");
    return true;
}