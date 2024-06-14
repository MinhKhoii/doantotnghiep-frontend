var router = require('express')();
var db = require('./config');
// var sgMail = require('@sendgrid/mail')

// sgMail.setApiKey()

router.get('/', (req, res) => {
    var query = 'select * from khachhang;';
    db.query(query, (error, result) => {
        if (error) res.status(500).send('Loi ket noi csdl');
        res.json(result);
    })
});

router.get('/:id', function (req, res) {
    var query = 'select * from khachhang where MaKhachHang =' + req.params.id;
    db.query(query, function (err, result) {
        if (err) res.status(500).send(err);
        res.json(result);
    });
});

// router.post('/sendmail',async function(req,res){
//     const { email,bill,products } = req.body
//         console.log("Bill >>> ",bill)
//         console.log("Product >>> ",products)
//         if (!email) {
//             res.status(400).send("Email is required")
//         }

//         const filepath = path.join(__dirname,'../templates/template-send-email.html')
//         const source = fs.readFileSync(filepath,'utf-8').toString()
//         const template = Handlebars.compile(source)
        
//         const replacements = {
//             email:email,
//             products:products.map(product => ({
//                 ProductName: product.ProductName,
//                 ProductPrice: product.ProductPrice,
//                 Quantity:product.Quantity,
//                 ColorName:product.ColorName,
//                 SizeName: product.SizeName,
//                 ProductPath:'http://localhost:8000/'+product.ProductPath
//             })),
//             bill:bill,
//             total_price: bill.TongTien.toString()
//         }

//         const htmlToSend = template(replacements)

//         const msg = {
//             to: email,
//             from: {
//                 email:'minhkhoj2002@gmail.com',
//                 name:'Nanara'
//             },
//             subject: 'Đơn hàng đã đặt thành công',
//             text: `Cảm ơn bạn đã đặt hàng tại cửa hàng của chúng tôi, rất hân hạnh được phục vụ cho quý khách`,
//             html: htmlToSend
//         };

//         try {
//             await sgMail.send(msg);            
//         } catch (error) {
//             if (error.response) {
//                 console.error(error.response.body);
//             }
//             res.status(500).send('Internal Server Error');
//         }
// })

router.post('/them', function (req, res) {
    console.log(req.body);
    var password = req.body.PassWord;
    var HoVaTen = req.body.HoVaTen;
    var SoDienThoai = req.body.SoDienThoai;
    var Email = req.body.Email;
    var DiaChi = req.body.DiaChi;
    var query = `insert into khachhang(PassWord,HoVaTen,SoDienThoai,Email,DiaChi) values('${password}','${HoVaTen}',${SoDienThoai},'${Email}','${DiaChi}')`;
    db.query(query, function (err, result) {
        if (err) res.status(500).send(err);
        res.json("Thêm thanh công");
    });
});

router.post('/login', function (req, res) {
    console.log(req.body);
    var password = req.body.PassWord;
    var Email = req.body.Email
    var query = `select * from khachhang where password = '${password}' and email = '${Email}'`;
    db.query(query, function (err, result) {
        if (err) res.status(500).send({message:err,result:false,data:[]});
        else if(result.length > 0){
            res.json({message:err,result:true,data:result});
        }
        else{
            res.json({message:err,result:false,data:[]});
        }
    });
});

router.put('/edit', function (req, res) {
    var password = req.body.PassWord;
    var HoVaTen = req.body.HoVaTen;
    var SoDienThoai = req.body.SoDienThoai;
    var Email = req.body.Email
    var DiaChi = req.body.DiaChi;
    var query = `update khachhang set PassWord='${password}',HoVaTen='${HoVaTen}',Anh='${Anh}',HoTen='${HoTen}',SoDienThoai=${SoDienThoai},DiaChi='${DiaChi}',Email='${Email}' , Quyen='${Quyen}', TrangThai=${TrangThai} where MaKhachHang= ${ma}`;
    db.query(query, function (err, result) {
        if (err) res.status(500).send(err);
        res.json("Sửa thanh công");
    });
});

router.delete('/xoa/:id', function (req, res) {
    var query = `delete  from khachhang where MaKhachHang= ${req.params.id}`;
    db.query(query, function (err, result) {
        if (err) res.status(500).send(err);
        res.json("Xóa thanh công");
    });
})


module.exports = router;
