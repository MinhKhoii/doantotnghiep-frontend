var router = require('express')();
var db = require('./config');

router.get('/', (req, res) => {
    var query = `select ct.*,ct.MaChiTietSanPham,ms.TenMau,ms.MaMau,kt.TenKichThuoc,sp.TenSanPham,lsp.MaLoai,lsp.TenLoai
                from chitietsanpham ct 
                inner join mausac ms on  ms.MaMau = ct.MaMau
                inner join sanpham sp on sp.MaSanPham = ct.MaSanPham 
                inner join loaisanpham lsp on lsp.MaLoai = sp.MaLoai
                inner join kichthuoc kt on kt.MaKichThuoc = ct.MaKichThuoc
                `; 
    db.query(query, (error, result) => {
        console.log(error)
        if (error) res.status(500).send(error.message);
        res.json(result);
    })
});

router.get('/:id', function (req, res) {
    var query = `select ct.*,ms.TenMau,kt.TenKichThuoc,sp.TenSanPham
        from chitietsanpham ct 
        inner join mausac ms on  ms.MaMau = ct.MaMau
        inner join kichthuoc kt on kt.MaKichThuoc = ct.MaKichThuoc
        inner join sanpham sp on sp.MaSanPham = ct.MaSanPham 
        where ct.MaChiTietSanPham =` + req.params.id;
    db.query(query, function (err, result) {
        if (err) res.status(500).send(err);
        res.json(result);
    });
});

router.post('/them', function (req, res) {
    console.log(req.body);
    var makichthuoc = req.body.MaKichThuoc;
    var masanpham = req.body.MaSanPham;
    var mamau = req.body.MaMau;
    var GiaBan = req.body.GiaBan;
    var GiaKhuyenMai = req.body.GiaKhuyenMai;
    var HinhAnh = []
    var SoLuongTon = req.body.SoLuongTon;
    var query = `insert into chitietsanpham(MaKichThuoc,MaSanPham,MaMau,GiaBan,GiaKhuyenMai,HinhAnh,SoLuongTon) values('${makichthuoc}','${masanpham}','${mamau}',${GiaBan},${GiaKhuyenMai},'${JSON.stringify(HinhAnh)}',${SoLuongTon})`;
    db.query(query, function (err, result) {
        if (err) res.status(500).send(err);
        res.json("Thêm thanh công");
    });
});

router.put('/edit', function (req, res) {
    var ma = req.body.MaChiTietSanPham;
    var makichthuoc = req.body.MaKichThuoc;
    var masanpham = req.body.MaSanPham;
    var mamau = req.body.MaMau;
    var GiaBan = req.body.GiaBan;
    var GiaKhuyenMai = req.body.GiaKhuyenMai;
    var HinhAnh = req.body.HinhAnh
    var SoLuongTon = req.body.SoLuongTon;

    var query = `update chitietsanpham set MaKichThuoc='${makichthuoc}',MaSanPham='${masanpham}',MaMau='${mamau}',GiaBan=${GiaBan},GiaKhuyenMai=${GiaKhuyenMai},HinhAnh='${JSON.stringify(HinhAnh)}',SoLuongTon=${SoLuongTon} where MaChiTietSanPham= ${ma}`;
    db.query(query, function (err, result) {
        if (err) res.status(500).send(err);
        res.json("Sửa thanh công");
    });
});

router.put('/editquantity', function (req, res) {
    var ma = req.body.MaChiTietSanPham;
    var SoLuong = req.body.SoLuong
    var query = `update chitietsanpham set SoLuongTon=SoLuongTon-${SoLuong} where MaChiTietSanPham= ${ma}`;
    db.query(query, function (err, result) {
        if (err) res.status(500).send(err);
        res.json("Sửa thanh công");
    });
});

router.delete('/xoa/:id', function (req, res) {
    var query = `delete  from chitietsanpham where MaChiTietSanPham= ${req.params.id}`;
    db.query(query, function (err, result) {
        if (err) res.status(500).send(err);
        res.json("Xóa thanh công");
    });
})


module.exports = router;
