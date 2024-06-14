var router = require('express')();
var db = require('./config');

router.get('/', (req, res) => {
    var query = 'select * from hang;';
    db.query(query, (error, result) => {
        if (error) res.status(500).send('Loi ket noi csdl');
        res.json(result);
    })
});

router.get('/:id', function (req, res) {
    var query = 'select * from hang where MaHang =' + req.params.id;
    db.query(query, function (err, result) {
        if (err) res.status(500).send(err);
        res.json(result);
    });
});

router.post('/them', function (req, res) {
    var tenhang = req.body.TenHang;
    var mota = req.body.MoTa;
    var query = `insert into hang(tenhang,mota) values('${tenhang}','${mota}')`;
    db.query(query, function (err, result) {
        if (err) res.status(500).send(err);
        res.json("Thêm thanh công");
    });
});

router.put('/edit', function (req, res) {
    var ma = req.body.MaHang;
    var tenhang = req.body.TenHang;
    var mota = req.body.MoTa;
    var query = `update hang set tenhang='${tenhang}', mota='${mota}' where MaHang= ${ma}`;
    db.query(query, function (err, result) {
        if (err) res.status(500).send(err);
        res.json("Sửa thanh công");
    });
});

router.delete('/xoa/:id', function (req, res) {
    var query = `delete  from hang where MaHang= ${req.params.id}`;
    db.query(query, function (err, result) {
        if (err) res.status(500).send(err);
        res.json("Xóa thanh công");
    });
})


module.exports = router;
