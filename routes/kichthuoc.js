var router = require('express')();
var db = require('./config');

router.get('/', (req, res) => {
    var query = 'select * from kichthuoc;';
    db.query(query, (error, result) => {
        if (error) res.status(500).send('Loi ket noi csdl');
        res.json(result);
    })
});

router.get('/:id', function (req, res) {
    var query = 'select * from kichthuoc where MaKichThuoc =' + req.params.id;
    db.query(query, function (err, result) {
        if (err) res.status(500).send(err);
        res.json(result);
    });
});

router.post('/them', function (req, res) {
    var TenKichThuoc = req.body.TenKichThuoc;
    var mota = req.body.MoTa;
    var query = `insert into kichthuoc(TenKichThuoc) values('${TenKichThuoc}')`;
    db.query(query, function (err, result) {
        if (err) res.status(500).send(err);
        res.json("Thêm thanh công");
    });
});

router.put('/edit', function (req, res) {
    var ma = req.body.MaKichThuoc;
    var TenKichThuoc = req.body.TenKichThuoc;
    var query = `update kichthuoc set TenKichThuoc='${TenKichThuoc}' where MaKichThuoc= ${ma}`;
    db.query(query, function (err, result) {
        if (err) res.status(500).send(err);
        res.json("Sửa thanh công");
    });
});

router.delete('/xoa/:id', function (req, res) {
    var query = `delete  from kichthuoc where MaKichThuoc= ${req.params.id}`;
    db.query(query, function (err, result) {
        if (err) res.status(500).send(err);
        res.json("Xóa thanh công");
    });
})


module.exports = router;
