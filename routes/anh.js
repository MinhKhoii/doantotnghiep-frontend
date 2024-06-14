var router = require('express')();
var db = require('./config');
var multer = require('multer');


router.get('/', (req, res) => {
    var query = `select *  from hinhanh 
                `;
    db.query(query, (error, result) => {
        if (error) res.status(500).send('Loi ket noi csdl');
        res.json(result);
    })
});

router.get('/:id', function (req, res) {
    var query = 'select * from hinhanh where MaAnh =' + req.params.id;
    db.query(query, function (err, result) {
        if (err) res.status(500).send(err);
        res.json(result);
    });
});

router.post('/them', function (req, res) {
    var MaMau = req.body.MaMau;
    var DuongDan = req.body.DuongDan;
    var MaChiTietSanPham = req.body.MaChiTietSanPham;
    console.log("url: " + DuongDan)
    var query = `insert into hinhanh(MaMau,Duongdan,MaChiTietSanPham) values('${MaMau}', '${DuongDan}','${MaChiTietSanPham}')`;
    db.query(query, function (err, result) {
        if (err) res.status(500).send(err);
        res.json("Thêm thanh công");
    });
});

router.post('/danhsachanh', function (req, res) {
    var MaMau = req.body.MaMau;
    var MaChiTietSanPham=req.body.MaChiTietSanPham
    var query = `select * from hinhanh where MaMau='${MaMau}', MaChiTietSanPham='${MaChiTietSanPham}';`;
    db.query(query, function (err, result) {
        if (err) res.status(500).send(err);
        res.json("Thêm thanh công");
    });
});

router.put('/edit', function (req, res) {
    var ma = req.body.MaAnh;
    var MaMau = req.body.MaMau;
    var DuongDan = req.body.DuongDan;
    var MaChiTietSanPham=req.body.MaChiTietSanPham
    var query = `update hinhanh set MaMau='${MaMau}',DuongDan='${DuongDan}',MaChiTietSanPham='${MaChiTietSanPham}' where MaAnh= ${ma}`;
    db.query(query, function (err, result) {
        if (err) res.status(500).send(err);
        res.json("Sửa thanh công");
    });
});

router.delete('/xoa/:id', function (req, res) {
    var query = `delete  from hinhanh where MaAnh= ${req.params.id}`;
    db.query(query, function (err, result) {
        if (err) res.status(500).send(err);
        res.json("Xóa thanh công");
    });
})

var path = require('path');
var duongdan = path.join(__dirname, '../public');
router.post('/upload', function (req, res) {
    var filepath = '';
    var fileupload = null;
    if (!req.files) res.status(400).send('Chua chon file gui len');
    fileupload = req.files.fileanh;
    filepath = duongdan + '/uploads/' + fileupload.name;
    fileupload.mv(filepath, function (err) {
        if (err) throw err;
        res.status(200).send({ message: 'File uploaded successfully.', url: 'public/uploads/'+fileupload.name })
    });
})
router.post('/update/:id', function (req, res) {
    var filepath = '';
    var fileupload = null;
    if (!req.files) res.status(400).send('Chua chon file gui len');
    fileupload = req.files.fileanh;
    filepath = duongdan + '/uploads/' + fileupload.name;
    fileupload.mv(filepath, function (err) {
        if (err) throw err;
        res.status(200).send({ message: 'File uploaded successfully.', url: 'public/uploads/'+fileupload.name })
    });
})


// Cấu hình lưu trữ cho Multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // Đặt điều kiện để xác định thư mục đích tùy thuộc vào loại ảnh
        cb(null, 'public/uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});

const upload = multer({ storage: storage });

router.post('/upload', upload.single('file'), (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }
    // Xử lý thành công việc tải lên tệp
    const filePath = req.file.path;
    console.log(filePath);
    return res.status(200).send({ message: 'File uploaded successfully.', url: filePath });
});


module.exports = router;
