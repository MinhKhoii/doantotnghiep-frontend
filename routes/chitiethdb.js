var router = require('express')();
var db = require('./config');

router.get('/', (req, res) => {
    var query = 'select * from chitiethoadonban;';
    db.query(query, (error, result) => {
        if (error) res.status(500).send('Loi ket noi csdl');
        res.json(result);
    })
});



router.get('/:id', function (req, res) {
    var query = `select * from chitiethoadonban ct 
    inner join chitietsanpham ctsp on ctsp.MaChiTietSanPham = ct.machitietsanpham 
    inner join sanpham sp on sp.masanpham = ctsp.masanpham 
    inner join mausac ms on ms.mamau = ctsp.mamau 
    inner join kichthuoc kt on kt.makichthuoc = ctsp.makichthuoc 
    inner join hoadonban hdb on hdb.mahoadon = ct.mahoadon
    where ct.MaHoaDon =` + req.params.id;
    db.query(query, function (err, result) {
        if (err) res.status(500).send(err);
        res.json(result);
    });
});

router.post('/them', function (req, res) {
    console.log(req.body);
    var MaChiTietSanPham = req.body.MaChiTietSanPham;
    var MaHoaDon = req.body.MaHoaDon;
    var TongTien = req.body.TongTien;
    var soluong = req.body.SoLuong;
    var GiaBan = req.body.GiaBan;
    var query = `insert into chitiethoadonban(MaChiTietSanPham,MaHoaDon,TongTien,GiaBan,SoLuong) values('${MaChiTietSanPham}','${MaHoaDon}' ,'${TongTien}' ,'${GiaBan}','${soluong}')`;
    db.query(query, function (err, result) {
        if (err) res.status(500).send(err);
        res.json({result:true});
    });
});



router.delete('/xoa/:id', function (req, res) {
    var query = `delete  from chitiethoadonban where MaChiTietSanPham= ${req.params.id}`;
    db.query(query, function (err, result) {
        if (err) res.status(500).send(err);
        res.json("Xóa thanh công");
    });
})


module.exports = router;
