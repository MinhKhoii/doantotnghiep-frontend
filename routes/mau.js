var router = require('express')();
var db = require('./config');

router.get('/', (req, res) => {
    var query = 'select * from mausac;';
    db.query(query, (error, result) => {
        if (error) res.status(500).send('Loi ket noi csdl');
        res.json(result);
    })
});

router.get('/:id', function (req, res) {
    var query = 'select * from mausac where MaMau =' + req.params.id;
    db.query(query, function (err, result) {
        if (err) res.status(500).send(err);
        res.json(result);
    });
});

router.post('/them', function (req, res) {
    var tenmau = req.body.TenMau;
    var query = `insert into mausac(tenmau) values('${tenmau}')`;
    db.query(query, function (err, result) {
        if (err) res.status(500).send(err);
        res.json("Thêm thanh công");
    });
});

router.put('/edit', function (req, res) {
    var ma = req.body.MaMau;
    var TenMau = req.body.TenMau;
    var query = `update mausac set TenMau='${TenMau}' where MaMau= ${ma}`;
    db.query(query, function (err, result) {
        if (err) res.status(500).send(err);
        res.json("Sửa thanh công");
    });
});

router.delete('/xoa/:id', function (req, res) {
    var query = `delete  from mausac where MaMau= ${req.params.id}`;
    db.query(query, function (err, result) {
        if (err) res.status(500).send(err);
        res.json("Xóa thanh công");
    });
})


module.exports = router;
