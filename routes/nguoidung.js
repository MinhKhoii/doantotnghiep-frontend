var router = require('express')();
var db = require('./config');

router.get('/', (req, res) => {
    var query = 'select * from nguoidung;';
    db.query(query, (error, result) => {
        if (error) res.status(500).send('Loi ket noi csdl');
        res.json(result);
    })
});

router.get('/:id', function (req, res) {
    var query = 'select * from nguoidung where MaNguoiDung =' + req.params.id;
    db.query(query, function (err, result) {
        if (err) res.status(500).send(err);
        res.json(result);
    });
});

router.post('/them', function (req, res) {
    console.log(req.body);
    var password = req.body.PassWord;
    var ngaysinh = req.body.NgaySinh;
    var Anh = req.body.Anh;
    var HoTen = req.body.HoTen;
    var DienThoai = req.body.DienThoai;
    var Email = req.body.Email
    var DiaChi = req.body.DiaChi;
    var Quyen = req.body.Quyen;
    var TrangThai = Number(req.body.TrangThai);
    var query = `insert into nguoidung(PassWord,NgaySinh,Anh,HoTen,DienThoai,Email,DiaChi,Quyen,TrangThai) values('${password}','${ngaysinh}','${Anh}','${HoTen}',${DienThoai},'${Email}','${DiaChi}','${Quyen}',${TrangThai})`;
    db.query(query, function (err, result) {
        if (err) res.status(500).send(err);
        res.json("Thêm thanh công");
    });
});

router.put('/edit', function (req, res) {
    var ma = req.body.MaNguoiDung;
    var password = req.body.PassWord;
    var ngaysinh = req.body.NgaySinh;
    var Anh = req.body.Anh;
    var HoTen = req.body.HoTen;
    var DienThoai = req.body.DienThoai;
    var DiaChi = req.body.DiaChi;
    var Quyen = req.body.Quyen;
    var TrangThai = Number(req.body.TrangThai);
    var query = `update nguoidung set PassWord='${password}',NgaySinh='${ngaysinh}',Anh='${Anh}',HoTen='${HoTen}',DienThoai=${DienThoai},DiaChi='${DiaChi}' , Quyen='${Quyen}', TrangThai=${TrangThai} where MaNguoiDung= ${ma}`;
    db.query(query, function (err, result) {
        if (err) res.status(500).send(err);
        res.json("Sửa thanh công");
    });
});

router.delete('/xoa/:id', function (req, res) {
    var query = `delete  from nguoidung where MaNguoiDung= ${req.params.id}`;
    db.query(query, function (err, result) {
        if (err) res.status(500).send(err);
        res.json("Xóa thanh công");
    });
})


module.exports = router;
