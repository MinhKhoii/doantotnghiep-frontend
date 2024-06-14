var createError = require('http-errors');
var express = require('express');
const cors = require('cors');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');


var loaispRouter = require('./routes/loaisp');
var sanphamRouter = require('./routes/sanpham');
var hangRouter = require('./routes/hang');
var mauRouter = require('./routes/mau');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var kichthuocRouter = require('./routes/kichthuoc');
var anhRouter = require('./routes/anh');
var chitietsanphamRouter = require('./routes/chitietsanpham');
var nguoidungRouter = require('./routes/nguoidung');
var nhacungcapRouter = require('./routes/nhacungcap');
var vanchuyenRouter = require('./routes/vanchuyen');
var hoadonbanRouter = require('./routes/hoadonban');
var hoadonnhapRouter = require('./routes/hoadonhap');
var chitiethdnRouter = require('./routes/chitiethdn');
var chitiethdbRouter = require('./routes/chitiethdb');
var khachhangRouter = require('./routes/khachhang');
var danhgiaRouter = require('./routes/danhgia');

const pay = require('./routes/pay')


var app = express();

app.use(cors({
  origin: '*'
}));

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'ejs');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');



app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

var bodyparser = require('body-parser');
app.use(bodyparser.urlencoded({extended:false}));
var fileupload = require('express-fileupload');
app.use(fileupload());


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/loaisp',loaispRouter);
app.use('/sanpham',sanphamRouter);
app.use('/hang', hangRouter);
app.use('/mau',mauRouter);
app.use('/kichthuoc',kichthuocRouter);
app.use('/anh',anhRouter);
app.use('/chitietsanpham',chitietsanphamRouter);
app.use('/nguoidung',nguoidungRouter);
app.use('/khachhang',khachhangRouter);
app.use('/nhacungcap',nhacungcapRouter);
app.use('/vanchuyen',vanchuyenRouter);
app.use('/hoadonban',hoadonbanRouter);
app.use('/hoadonnhap',hoadonnhapRouter);
app.use('/chitiethdn',chitiethdnRouter);
app.use('/chitiethdb',chitiethdbRouter);
app.use('/danhgia',danhgiaRouter);
app.use('/order',pay)

console.log(path.join(__dirname, 'public/uploads'))


// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
// Tạo một instance của Multer middleware
// app.use('/public/uploads', express.static(path.join(__dirname, 'public/uploads')));

app.use('/public/uploads', express.static('public/uploads'));
// app.use('/uploads/users', express.static('uploads/users'));
// app.use('/uploads/news', express.static('uploads/news'));
// Định nghĩa route xử lý việc tải lên tệp

module.exports = app;
