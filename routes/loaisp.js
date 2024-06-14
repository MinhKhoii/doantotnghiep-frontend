var router = require('express')();
var db = require('./config');

router.get('/', (req, res) => {
    var query = 'select * from loaisanpham;';
    db.query(query, (error, result) => {
        if (error) res.status(500).send('Loi ket noi csdl');
        res.json(result);
    })
});

router.get('/:id', function (req, res) {
    var query = `select * from loaisanpham lsp where lsp.MaLoai =` + req.params.id;
    db.query(query, function (err, result) {
        if (err) res.status(500).send(err);
        res.json(result);
    });
});

router.post('/them', function (req, res) {
    var tenloai = req.body.TenLoai;
    var mota = req.body.MoTa;
    var query = `insert into loaisanpham(tenloai,mota) values('${tenloai}','${mota}')`;
    db.query(query, function (err, result) {
        if (err) res.status(500).send(err);
        res.json("Thêm thanh công");
    });
});

router.put('/edit', function (req, res) {
    var ma = req.body.MaLoai;
    var tenloai = req.body.TenLoai;
    var mota = req.body.MoTa;
    var query = `update loaisanpham set tenloai='${tenloai}', mota='${mota}' where Maloai= ${ma}`;
    db.query(query, function (err, result) {
        if (err) res.status(500).send(err);
        res.json("Sửa thanh công");
    });
});

router.delete('/xoa/:id', function (req, res) {
    var query = `delete  from loaisanpham where MaLoai= ${req.params.id}`;
    db.query(query, function (err, result) {
        if (err) res.status(500).send(err);
        res.json("Xóa thanh công");
    });
})


module.exports = router;
