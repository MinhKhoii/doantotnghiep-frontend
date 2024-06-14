var router = require('express')();
var db = require('./config');

router.get('/', (req, res) => {
    var query = 'select * from hoadonban;';
    db.query(query, (error, result) => {
        if (error) res.status(500).send('Loi ket noi csdl');
        res.json(result);
    })
});

router.get('/hoadonmoi', (req, res) => {
    var query = 'SELECT * FROM hoadonban ORDER BY mahoadon DESC LIMIT 1;'
    db.query(query, (error, result) => {
        if (error) res.status(500).send(error);
        res.json(result);
    })
});

router.get('/:id', function (req, res) {
    var query = 'select * from hoadonban where MaHoaDon =' + req.params.id;
    db.query(query, function (err, result) {
        if (err) res.status(500).send(err);
        res.json(result);
    });
});

router.get('/trangthai/:id', function (req, res) {
    var query = 'select * from hoadonban where trangthai =' + req.params.id;
    db.query(query, function (err, result) {
        if (err) res.status(500).send(err);
        res.json(result);
    });
});


router.post('/them', function (req, res) {
    console.log(req.body);
    var makhachhang = req.body.MaKhachHang;
    var NgayTao = req.body.NgayTao;
    var DiaChiNhan = req.body.DiaChiNhan;
    var DienThoaiNhan = req.body.DienThoaiNhan;
    var TrangThai = req.body.TrangThai;
    var NguoiNhan = req.body.NguoiNhan;
    var TongTien = req.body.TongTien;
    var HinhThucThanhToan = req.body.HinhThucThanhToan
    var query = `insert into hoadonban(MaKhachHang,NgayTao,DiaChiNhan,TrangThai,DienThoaiNhan,NguoiNhan,HinhThucThanhToan,TongTien) values('${makhachhang}','${NgayTao}','${DiaChiNhan}','${TrangThai}','${DienThoaiNhan}','${NguoiNhan}','${HinhThucThanhToan}','${TongTien}')`;
    db.query(query, function (err, result) {
        if (err) res.status(500).send(err);
        else{
            res.json({msg:"Thêm thanh công",result:true});
        }
        
    });
});

router.put('/edit', function (req, res) {
    var ma = req.body.MaHoaDon;
    var makhachhang = req.body.MaKhachHang;
    var NgayTao = req.body.NgayTao;
    var DiaChiNhan = req.body.DiaChiNhan;
    var TrangThai = req.body.TrangThai;
    var NguoiNhan = req.body.NguoiNhan;
    var MaPhieu = req.body.MaPhieu;
    var HinhThucThanhToan = req.body.HinhThucThanhToan;
    var TongTien = req.body.TongTien;
    var query = `update hoadonban set MaKhachHang='${makhachhang}',NgayTao='${NgayTao}',DiaChiNhan='${DiaChiNhan}',TrangThai='${TrangThai}' ,NguoiNhan='${NguoiNhan}' ,MaPhieu='${MaPhieu}' ,HinhThucThanhToan='${HinhThucThanhToan}' ,TongTien='${TongTien}'  where MaHoaDon= ${ma}`;
    db.query(query, function (err, result) {
        if (err) res.status(500).send(err);
        res.json("Sửa thanh công");
    });
});

router.put('/update', function (req, res) {
    var MaHoaDon = req.body.MaHoaDon;
    var TrangThai = req.body.TrangThai;
    var query = `update hoadonban set MaHoaDon='${MaHoaDon}',TrangThai='${TrangThai}'  where MaHoaDon= ${MaHoaDon}`;
    db.query(query, function (err, result) {
        if (err) res.status(500).send(err);
        res.json("Sửa thanh công");
    });
});

router.delete('/xoa/:id', function (req, res) {
    var query = `delete  from hoadonban where MaHoaDon= ${req.params.id}`;
    db.query(query, function (err, result) {
        if (err) res.status(500).send(err);
        res.json("Xóa thanh công");
    });
})


module.exports = router;
