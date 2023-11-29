// Phân tích và xây dựng layout ==> Done
// Phân tích mô hình 3 khối ==> Done
// Viết các chức năng xử lí cho người dùng

// 30 = km * 1 + 18 * km2 + (30 - 1 - 18) * km3
/** Mô hình 3 khối
 * Đầu vào: Loại xe người dùng đi, số KM, thời gian bác tài chờ, bảng giá cước của từng loại xe
 *
 * Các bước xử lí: Dùng dữ liệu người dùng để phân tích xem người dùng đi loại xe nào từ đó có bảng giá phù hợp
 * Dựa vào số km đi của người dùng, thì sẽ có 3 TH xảy ra:
 * - Người dùng mở cửa xong không đi: Km
 * - Người dùng đi trong khoảng từ 1 đến 19: Km * 1 + (soKmDi -1) * Km2
 * - Người dùng đi hơn 19km : Km * 1 + 18 * Km2 + (soKmDi - 19) * Km3
 *
 * Đầu ra: Tổng số tiền người dùng phải trả
 */

// Tạo ra hằng số giúp lưu trữ tên của 3 loại xe
const UBER_CAR = 'uberCar';
const UBER_SUV = 'uberSUV';
const UBER_BLACK = 'uberBlack';

var tongTien;

var sdChang1=0; 
var sdChang2=0;
var sdChang3=0;
var sdCho=0; 

var dgChang1; 
var dgChang2; 
var dgChang3; 
var dgCho; 

var thanhTienChang1=0;
var thanhTienChang2=0;
var thanhTienChang3=0;
var thanhTienCho=0; 


// Thực hiện dom tới button tính tiền và gắn một sự kiện onclick
document.getElementById('btn-tinhTien').onclick = function () {
  var loaiXe = document.querySelector(
    ".type input[name='selector']:checked"
  ).value;
  console.log("Loai xe: "+loaiXe);
  // lấy dữ liệu soKm
  var soKm = document.getElementById('txt-km').value * 1;
  console.log("So km: "+soKm);
  // lấy dữ liệu thời gian chờ
  var thoiGianCho = document.getElementById('txt-thoiGianCho').value * 1;
  console.log("Thoi gian cho: "+thoiGianCho);
  console.log("Thời gian chờ bị tính phạt: "+Math.floor(thoiGianCho/3));
  sdCho = thoiGianCho;

  // thông qua biến loại xe sẽ thực hiện xem coi giá tiền của từng chặn là bao nhiêu
  var giaKmDauTien = tinhGiaTienKmChang1(loaiXe);
  var giaKmChang2 = tinhGiaTienKmChang2(loaiXe);
  var giaKmChang3 = tinhGiaTienKmChang3(loaiXe);

  dgChang1 = giaKmDauTien;
  dgChang2 = giaKmChang2;
  dgChang3 = giaKmChang3;

  // đi tính toán xem người dùng sẽ đi hết bao nhiêu tiền, lưu ý sẽ có 3TH xảy ra nhé
  tongTien = 0;
  if (soKm <= 1) {
    tongTien = giaKmDauTien * soKm;
    thanhTienChang1 = giaKmDauTien * soKm;
    sdChang1 = soKm;
  } else if (soKm > 1 && soKm <= 19) {
    tongTien = giaKmDauTien * 1 + giaKmChang2 * (soKm - 1);

    thanhTienChang1 = giaKmDauTien;
    sdChang1 = 1;
    thanhTienChang2 = giaKmChang2 * (soKm - 1);
    sdChang2 = (soKm - 1);

  } else {
    tongTien = giaKmDauTien * 1 + giaKmChang2 * 18 + giaKmChang3 * (soKm - 19);
    sdChang1 = 1; 
    thanhTienChang1 = giaKmDauTien;
    sdChang2 = 18; 
    thanhTienChang2 = giaKmChang2;
    thanhTienChang3 = giaKmChang3 * (soKm - 19);
    sdChang3 = (soKm - 19);
  }
  console.log("Tổng tiền chưa phạt chờ: "+tongTien)


  var priceWaiting; 
  if (thoiGianCho>=3){
    switch (loaiXe){
      case UBER_CAR:{
        priceWaiting = Math.floor(thoiGianCho/3)*2000; 
        dgCho = 2000;
        thanhTienCho = priceWaiting;
        break;   
      }
      case UBER_SUV:{
        priceWaiting = Math.floor(thoiGianCho/3)*3000;
        dgCho = 3000;
        thanhTienCho = priceWaiting;
        break;   
      }
      case UBER_BLACK:{
        priceWaiting = Math.floor(thoiGianCho/3)*3500;
        dgCho = 3500;
        thanhTienCho = Math.floor(thoiGianCho/3)*3500;
        break;   
      }
    }
  }else {
    priceWaiting = 0; 
    thanhTienCho = 0;
  }

  //Tính tiền chờ 
  console.log("Tiền phạt chờ: "+priceWaiting);
  tongTien = tongTien + priceWaiting;

  // gọi truyền display block cho div có id divThanhTien
  document.getElementById('divThanhTien').style.display = 'block';
  document.getElementById('xuatTien').innerHTML = tongTien.toLocaleString(
    'it-IT', 
    {
        style : 'currency', 
        currency : 'VND'
    }
);

  // với các dữ liệu được lấy ở trên, tạo ra 2 biến giaKmChang2, giaKmChang3 thực hiện kiểm tra và lấy về giá tiền của 2 chặng còn lại
  // Với số KM của người dùng đi, sẽ kiểm tra xem rơi vào trường hợp nào và tính toán ra kết quả
};

function tinhGiaTienKmChang1(LX) {
  switch (LX) {
    case UBER_CAR: {
      return 8000;
    }
    case UBER_SUV: {
      return 9000;
    }
    case UBER_BLACK: {
      return 10000;
    }
  }
}

function tinhGiaTienKmChang2(LX) {
  switch (LX) {
    case UBER_CAR: {
      return 7500;
    }
    case UBER_SUV: {
      return 8500;
    }
    case UBER_BLACK: {
      return 9500;
    }
  }
}

function tinhGiaTienKmChang3(LX) {
  switch (LX) {
    case UBER_CAR: {
      return 7000;
    }
    case UBER_SUV: {
      return 8000;
    }
    case UBER_BLACK: {
      return 9000;
    }
  }
}

document.getElementById('btn-inHoaDon').onclick = function(){
  document.getElementById('hoaDon').style.display = 'block';

  document.getElementById('sdChang1').innerHTML = sdChang1;
  document.getElementById('sdChang2').innerHTML = sdChang2;
  document.getElementById('sdChang3').innerHTML = sdChang3;
  
  document.getElementById('sdCho').innerHTML = sdCho;

  document.getElementById('dg1').innerHTML = dgChang1.toLocaleString(
    'it-IT', 
    {
        style : 'currency', 
        currency : 'VND'
    }
);
  document.getElementById('dg2').innerHTML = dgChang2.toLocaleString(
    'it-IT', 
    {
        style : 'currency', 
        currency : 'VND'
    }
);
  document.getElementById('dg3').innerHTML = dgChang3.toLocaleString(
    'it-IT', 
    {
        style : 'currency', 
        currency : 'VND'
    }
);
  document.getElementById('dgCho').innerHTML = dgCho.toLocaleString(
    'it-IT', 
    {
        style : 'currency', 
        currency : 'VND'
    }
);

  document.getElementById('thanhTienChang1').innerHTML = thanhTienChang1.toLocaleString(
    'it-IT', 
    {
        style : 'currency', 
        currency : 'VND'
    }
);
  document.getElementById('thanhTienChang2').innerHTML = thanhTienChang2.toLocaleString(
    'it-IT', 
    {
        style : 'currency', 
        currency : 'VND'
    }
);
  document.getElementById('thanhTienChang3').innerHTML = thanhTienChang3.toLocaleString(
    'it-IT', 
    {
        style : 'currency', 
        currency : 'VND'
    }
);
  document.getElementById('thanhTienCho').innerHTML = thanhTienCho.toLocaleString(
    'it-IT', 
    {
        style : 'currency', 
        currency : 'VND'
    }
);

  document.getElementById('tongTien').innerHTML = tongTien.toLocaleString(
    'it-IT', 
    {
        style : 'currency', 
        currency : 'VND'
    }
);
}
