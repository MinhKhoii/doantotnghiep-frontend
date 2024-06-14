var router = require('express')();
var db = require('./config');

router.get('/', (req, res) => {
    var query = 'select * from vanchuyen;';
    db.query(query, (error, result) => {
        if (error) res.status(500).send('Loi ket noi csdl');
        res.json(result);
    })
});

router.get('/:id', function (req, res) {
    var query = 'select * from vanchuyen where MaVanChuyen =' + req.params.id;
    db.query(query, function (err, result) {
        if (err) res.status(500).send(err);
        res.json(result);
    });
});

router.post('/them', function (req, res) {
    var TenVanChuyen = req.body.TenVanChuyen;
    var Gia = req.body.Gia;
    var query = `insert into vanchuyen(TenVanChuyen,Gia) values('${TenVanChuyen}','${Gia}')`;
    db.query(query, function (err, result) {
        if (err) res.status(500).send(err);
        res.json("Thêm thanh công");
    });
});

router.put('/edit', function (req, res) {
    var ma = req.body.MaVanChuyen;
    var TenVanChuyen = req.body.TenVanChuyen;
    var Gia = req.body.Gia;
    var query = `update vanchuyen set TenVanChuyen='${TenVanChuyen}',Gia='${Gia}' where MaVanChuyen= ${ma}`;
    db.query(query, function (err, result) {
        if (err) res.status(500).send(err);
        res.json("Sửa thanh công");
    });
});

router.delete('/xoa/:id', function (req, res) {
    var query = `delete  from vanchuyen where MaVanChuyen= ${req.params.id}`;
    db.query(query, function (err, result) {
        if (err) res.status(500).send(err);
        res.json("Xóa thanh công");
    });
})


module.exports = router;
