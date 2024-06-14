var router = require('express')();
var db = require('./config');

router.get('/', (req, res) => {
    var query = 'select danhgia.*,khachhang.HoVaTen from danhgia inner join khachhang on khachhang.makhachhang = danhgia.makhachhang;';
    db.query(query, (error, result) => {
        if (error) res.status(500).send('Loi ket noi csdl');
        res.json(result);
    })
});

router.get('/:id', function (req, res) {
    var query = 'select * from danhgia where MaDanhGia =' + req.params.id;
    db.query(query, function (err, result) {
        if (err) res.status(500).send(err);
        res.json(result);
    });
});

router.post('/them', function (req, res) {
    var MaKhachHang = req.body.MaKhachHang;
    var MaChiTietSanPham = req.body.MaChiTietSanPham;
    var SoSao = req.body.SoSao;
    var BinhLuan = req.body.BinhLuan;
    var NgayDang = req.body.NgayDang;
    var HinhAnh = req.body.HinhAnh;

    var query = `insert into danhgia(MaKhachHang,MaChiTietSanPham,SoSao,BinhLuan,NgayDang,HinhAnh) values('${MaKhachHang}','${MaChiTietSanPham}','${SoSao}','${BinhLuan}','${NgayDang}','${HinhAnh}')`;
    db.query(query, function (err, result) {
        if (err) res.status(500).send(err);
        res.json("Thêm thanh công");
    });
});

router.put('/edit', function (req, res) {
    var ma = req.body.MaDanhGia;
    var MaKhachHang = req.body.MaKhachHang;
    var MaChiTietSanPham = req.body.MaChiTietSanPham;
    var SoSao = req.body.SoSao;
    var BinhLuan = req.body.BinhLuan;
    var NgayDang = req.body.NgayDang;
    var HinhAnh = req.body.HinhAnh;
    var query = `update danhgia set MaKhachHang='${MaKhachHang}', MaChiTietSanPham='${MaChiTietSanPham}',SoSao='${SoSao}', BinhLuan='${BinhLuan}',NgayDang='${NgayDang}', HinhAnh='${HinhAnh}' where MaDanhGia= ${ma}`;
    db.query(query, function (err, result) {
        if (err) res.status(500).send(err);
        res.json("Sửa thanh công");
    });
});

router.delete('/xoa/:id', function (req, res) {
    var query = `delete  from danhgia where MaDanhGia= ${req.params.id}`;
    db.query(query, function (err, result) {
        if (err) res.status(500).send(err);
        res.json("Xóa thanh công");
    });
})


module.exports = router;