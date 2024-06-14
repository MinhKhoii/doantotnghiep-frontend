var router = require('express')();
var db = require('./config');

router.get('/', (req, res) => {
    var query = `select ct.*,ncc.HoTen as tennhacungcap, ng.HoTen as tennguoidung  from hoadonnhap ct
    inner join nhacungcap ncc on ncc.MaNhaCungCap = ct.MaNhaCungCap
    inner join nguoidung ng on ng.MaNguoiDung = ct.MaNguoiDung
    `;
    db.query(query, (error, result) => {
        if (error) res.status(500).send('Loi ket noi csdl');
        res.json(result);
    })
});

router.get('/:id', function (req, res) {
    var query = 'select * from hoadonnhap where MaHoaDonNhap =' + req.params.id;
    db.query(query, function (err, result) {
        if (err) res.status(500).send(err);
        res.json(result);
    });
});

router.post('/them', function (req, res) {
    console.log(req.body);
    var manhacungcap = req.body.MaNhaCungCap;
    var manguoidung = req.body.MaNguoiDung;
    var NgayNhap = req.body.NgayNhap;
    var query = `insert into hoadonnhap(MaNhaCungCap,MaNguoiDung,NgayNhap) values('${manhacungcap}','${manguoidung}','${NgayNhap}')`;
    db.query(query, function (err, result) {
        if (err) res.status(500).send(err);
        res.json("Thêm thanh công");
    });
});

router.put('/edit', function (req, res) {
    var ma = req.body.MaHoaDonNhap;
    var manhacungcap = req.body.MaNhaCungCap;
    var manguoidung = req.body.MaNguoiDung;
    var NgayNhap = req.body.NgayNhap;
    var query = `update hoadonnhap set MaNhaCungCap='${manhacungcap}',MaNguoiDung='${manguoidung}',NgayNhap='${NgayNhap}' where MaHoaDonNhap= ${ma}`;
    db.query(query, function (err, result) {
        if (err) res.status(500).send(err);
        res.json("Sửa thanh công");
    });
});

router.delete('/xoa/:id', function (req, res) {
    var query = `delete  from hoadonnhap where MaHoaDonNhap= ${req.params.id}`;
    db.query(query, function (err, result) {
        if (err) res.status(500).send(err);
        res.json("Xóa thanh công");
    });
})


module.exports = router;
