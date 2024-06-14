var router = require('express')();
var db = require('./config');

router.get('/', (req, res) => {
    var query = `select sp.*, lsp.TenLoai, hsp.TenHang
    from sanpham sp
    inner join loaisanpham lsp on lsp.MaLoai = sp.MaLoai
    inner join Hang hsp on hsp.MaHang = sp.MaHang
    ;`;
    db.query(query, (error, result) => {
        if (error) res.status(500).send('Loi ket noi csdl');
        res.json(result);
    })
});

router.get('/:id', function (req, res) {
    var query = 'select * from sanpham where MaSanPham =' + req.params.id;
    db.query(query, function (err, result) {
        if (err) res.status(500).send(err);
        res.json(result);
    });
});

router.post('/them', function (req, res) {
    console.log(req.body);
    var tensp = req.body.TenSanPham;
    var maloai = req.body.MaLoai;
    var mahang = req.body.MaHang;
    var luotxem = req.body.LuotXem;
    var trangthai = req.body.TrangThai;
    var motangan = req.body.MoTaNgan;
    var mota = req.body.MoTa;
    var query = `insert into sanpham(tensanpham,maloai,mahang,luotxem,trangthai,motangan,mota) values('${tensp}','${maloai}','${mahang}','${luotxem}',${trangthai},'${motangan}','${mota}')`;
    db.query(query, function (err, result) {
        if (err) res.status(500).send(err);
        res.json("Thêm thanh công");
    });
});

router.put('/edit', function (req, res) {
    var ma = req.body.MaSanPham;
    var tensp = req.body.TenSanPham;
    var maloai = req.body.MaLoai;
    var mahang = req.body.MaHang;
    var luotxem = req.body.LuotXem;
    var trangthai = req.body.TrangThai;
    var motangan = req.body.MoTaNgan
    var mota = req.body.MoTa;
    var query = `update sanpham set tensanpham='${tensp}',Maloai='${maloai}',mahang='${mahang}',luotxem='${luotxem}',trangthai=${trangthai},motangan='${motangan}' , mota='${mota}' where MaSanPham= ${ma}`;
    db.query(query, function (err, result) {
        if (err) res.status(500).send(err);
        res.json("Sửa thanh công");
    });
});

router.delete('/xoa/:id', function (req, res) {
    var query = `delete  from sanpham where MaSanPham= ${req.params.id}`;
    db.query(query, function (err, result) {
        if (err) res.status(500).send(err);
        res.json("Xóa thanh công");
    });
})


module.exports = router;
