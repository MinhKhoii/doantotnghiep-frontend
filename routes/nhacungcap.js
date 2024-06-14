var router = require('express')();
var db = require('./config');

router.get('/', (req, res) => {
    var query = 'select * from nhacungcap;';
    db.query(query, (error, result) => {
        if (error) res.status(500).send('Loi ket noi csdl');
        res.json(result);
    })
});

router.get('/:id', function (req, res) {
    var query = 'select * from nhacungcap where MaNhaCungCap =' + req.params.id;
    db.query(query, function (err, result) {
        if (err) res.status(500).send(err);
        res.json(result);
    });
});

router.post('/them', function (req, res) {
    console.log(req.body);
    var HoTen = req.body.HoTen;
    var DienThoai = req.body.DienThoai;
    var DiaChi = req.body.DiaChi;
    var Email = req.body.Email
    var query = `insert into nhacungcap(HoTen,DienThoai,Email,DiaChi) values('${HoTen}',${DienThoai},'${Email}','${DiaChi}')`;
    db.query(query, function (err, result) {
        if (err) res.status(500).send(err);
        res.json("Thêm thanh công");
    });
});

router.put('/edit', function (req, res) {
    console.log(req.body)
    var ma = req.body.MaNhaCungCap;
    var HoTen = req.body.HoTen;
    var DienThoai = req.body.DienThoai;
    var DiaChi = req.body.DiaChi;
    var Email = req.body.Email
    var query = `update nhacungcap set HoTen='${HoTen}',DienThoai='${DienThoai}',DiaChi='${DiaChi}',Email='${Email}' where MaNhaCungCap= ${ma}`;
    db.query(query, function (err, result) {
        if (err)
        {
            res.status(500).send(err);
        }
        else{
            res.json("Sửa thanh công");
        }
    });
});

router.delete('/xoa/:id', function (req, res) {
    var query = `delete  from nhacungcap where MaNhaCungCap= ${req.params.id}`;
    db.query(query, function (err, result) {
        if (err) res.status(500).send(err);
        res.json("Xóa thanh công");
    });
})


module.exports = router;
