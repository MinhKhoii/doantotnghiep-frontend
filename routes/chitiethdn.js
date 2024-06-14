var router = require('express')();
var db = require('./config');

router.get('/', (req, res) => {
    var query = `select ct.*,sp.TenSanPham,ms.TenMau,kt.TenKichThuoc from chitiethoadonnhap ct 
    inner join chitietsanpham ctsp on ctsp.MaChiTietSanPham = ct.MaChiTietSanPham 
    inner join sanpham sp on sp.MaSanPham = ctsp.MaSanPham
    inner join mausac ms on ms.MaMau = ctsp.MaMau
    inner join kichthuoc kt on kt.MaKichThuoc = ctsp.MaKichThuoc;
    `;
    db.query(query, (error, result) => {
        if (error) res.status(500).send('Loi ket noi csdl');
        res.json(result);
    })
});

router.get('/:id', function (req, res) {
    var query = 'select ct.*,ctsp.MaMau,ctsp.MaKichThuoc from chitiethoadonnhap ct inner join chitietsanpham ctsp on ctsp.MaChiTietSanPham = ct.MaChiTietSanPham where ct.MaChiTietHoaDonNhap =' + req.params.id;
    db.query(query, function (err, result) {
        if (err) res.status(500).send(err);
        res.json(result);
    });
});

router.post('/them', function (req, res) {
    console.log(req.body);
    
    var MaHoaDonNhap = req.body.MaHoaDonNhap;
    var MaChiTietSanPham = req.body.MaChiTietSanPham;
    var SoLuong = req.body.SoLuong;
    var GiaNhap = req.body.GiaNhap;
    var query = `insert into chitiethoadonnhap(MaHoaDonNhap,MaChiTietSanPham,SoLuong,GiaNhap) values('${MaHoaDonNhap}','${MaChiTietSanPham}' ,'${SoLuong}','${GiaNhap}')`;
    db.query(query, function (err, result) {
        if (err) res.status(500).send(err);
        res.json("Thêm thanh công");
    });
});

router.put('/edit', function (req, res) {
    var ma = req.body.MaChiTietHoaDonNhap;
    var MaHoaDonNhap = req.body.MaHoaDonNhap;
    var MaChiTietSanPham = req.body.MaChiTietSanPham;
    var SoLuong = req.body.SoLuong;
    var GiaNhap = req.body.GiaNhap;
    var query = `update chitiethoadonnhap set MaHoaDonNhap='${MaHoaDonNhap}', MaChiTietSanPham='${MaChiTietSanPham}' ,SoLuong='${SoLuong}'  ,GiaNhap='${GiaNhap}' where MaChiTietHoaDonNhap= ${ma}`;
    db.query(query, function (err, result) {
        if (err) res.status(500).send(err);
        res.json("Sửa thanh công");
    });
});

router.delete('/xoa/:id', function (req, res) {
    var query = `delete  from chitiethoadonnhap where MaChitTietHoaDonNhap= ${req.params.id}`;
    db.query(query, function (err, result) {
        if (err) res.status(500).send(err);
        res.json("Xóa thanh công");
    });
})


module.exports = router;
