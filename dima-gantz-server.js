// đây là Express - Web Server cho website dima-gantz
const express = require('express');		    //phải mượn Express
const gantzRoutes = express.Router();	    //tạo Router để nhận tất cả câu hỏi

const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');     //phải mượn Mongoose
                                          //tìm và nói chuyện với MongoDB ở địa chỉ của nó

const PORT = 5300;				                //địa chỉ Phòng

app.use(cors());
app.use(bodyParser.json());
app.use('/gantz', gantzRoutes);		        //bảo Router chỉ nhận câu hỏi bắt đầu ‘/hanhDong


// let peopleModel = require('./people.model');
let weaponModel = require('./weapon.model');
// let alienModel = require('./alien.model');
let vampireModel = require('./vampire.model');

mongoose.connect('mongodb+srv://dima:dimaduc@cluster0.cfhjv.mongodb.net/dima-gantz-db?retryWrites=true&w=majority', { useNewUrlParser: true })


        .catch(error => console.log('không kết nối được với mongoDB: ' + error));
        // nếu không kết nối được thì thông báo lỗi
const connection = mongoose.connection; //  <=> giữa server và DB

// sau đó, mở kết nối để 2 bên nói chuyện
// hiện ra, thông báo là nói chuyện đc rồi
connection.once('open', function() {
  console.log("Đã nói chuyện với MongoDB");
})

// server bắt đầu nghe và đợi câu hỏi ở phòng PORT 5300
app.listen(PORT, function() {		          //chạy Web Server ở địa chỉ phòng này
  console.log("dima-gantz-server đang chạy ở phòng Port: " + PORT);
});


gantzRoutes.route('/People').get(function(req, res) {
  console.log('đã nhận câu hỏi tất cả People')
  res.json('đã nhận câu hỏi People')
})


gantzRoutes.route('/Weapon').get(function(req, res) {
  console.log('đã nhận câu hỏi tất cả Weapon')
  // res.json('đã nhận câu hỏi Weapon')
  weaponModel.find({}, function(err, timWeapon){
    if (err) {
      console.log(err);
    }
    else {      
      console.log('đã tìm thấy ' + timWeapon.length + ' Weapon là: ' + timWeapon)
      res.json(timWeapon)
    }
  })
})


gantzRoutes.route('/Alien').get(function(req, res) {
  console.log('đã nhận câu hỏi tất cả Alien')
  res.json('đã nhận câu hỏi Alien')
})


gantzRoutes.route('/Vampire').get(function(req, res) {
  console.log('đã nhận câu hỏi tất cả Vampire')
  // res.json('đã nhận câu hỏi Vampire')
  vampireModel.find({}, function(err, timVampire){
    if (err) {
      console.log(err);
    }
    else {      
      console.log('đã tìm thấy ' + timVampire.length + ' Vampire là: ' + timVampire)
      res.json(timVampire)
    }
  })
})



gantzRoutes.route('/vampire/add').post(function(req, res) {
  console.log('đã nhận câu hỏi: ' + req.body.name + ' và ' + req.body.species + ' và ' + req.body.gender);
  let vampireMoi = new vampireModel(
                                      {name:req.body.name}
  );
  vampireMoi.save() 
  .then(vampireMoi => {
    console.log('đã cho thêm tên mới: ' + vampireMoi.name + ', loài: ' + vampireMoi.species + ', giới tinh: ' + vampireMoi.gender);
  })
});
gantzRoutes.route('/vampire/add1').get(function(req, res) {
  console.log('đã nhận câu hỏi: ' + req.query.tenVampire + ' và ' + req.query.gioiTinhVampire + ' và ' + req.query.giaTocVampire + ' và ' + req.query.anhVampire);
  let vampireMoi = new vampireModel({
                                      name: req.query.tenVampire,
                                      species:[req.query.giaTocVampire],
                                      gender: req.query.gioiTinhVampire,
                                      image: req.query.anhVampire,
  });
  vampireMoi.save() 
  .then(vampireMoi => {
    console.log('đã cho thêm tên mới: ' + vampireMoi.name + ', loài mới: ' + vampireMoi.species + ', giới tinh mới: ' + vampireMoi.gender);
  })
});


gantzRoutes.route('/vampire/add2/:tenVampire/:giaTocVampire/:gioiTinhVampire/:anhVampire').get(function(req, res) {
  console.log(req.params.tenVampire+' và '+req.params.giaTocVampire+' và '+req.params.gioiTinhVampire+' và '+req.params.anhVampire)
  let vampireMoi = new vampireModel({
                                      name: req.query.tenVampire,
                                      species:[req.query.giaTocVampire],
                                      gender: req.query.gioiTinhVampire,
                                      image: req.query.anhVampire,
                                    });
  vampireMoi.save() 
  .then(vampireMoi => {
    console.log('đã cho thêm tên mới: ' + vampireMoi.name + ', loài mới: ' + vampireMoi.species + ', giới tinh mới: ' + vampireMoi.gender);
  })
});


gantzRoutes.route('/weapon/tim/').get(function(req, res) {
  console.log('đã nhận câu hỏi tìm: ' + req.query.tenWeapon1 + ' và ' + req.query.tenWeapon2)

  // weaponModel.find({name:req.query.tenWeapon1}}, function(err, timWeapon1){
  weaponModel.find({$or:[{name:req.query.tenWeapon1}, {name:req.query.tenWeapon2}]}, function(err, timWeapon1){
    if(timWeapon1.length===0){
      console.log('không tìm thấy tên 1: ' + req.query.tenWeapon1 + 'và không tìm thấy tên 2: ' + req.query.tenWeapon2)
    }
    else{
      console.log('đã gửi câu trả lời: '+timWeapon1)
      ketQua[0]=timWeapon1[0]
      console.log('đã gửi câu trả lời '+ketQua)

    }
    res.json(timWeapon1)
  })
});


gantzRoutes.route('/weapon/update/').get(function(req, res) {
  console.log('đã nhận câu hỏi tên để update: ' + req.query.idWeaponCu + ' và ' + req.query.anhWeaponMoi)
  weaponModel.findOneAndUpdate({_id: req.query.idWeaponCu} , {image: req.query.anhWeaponMoi}, function(err, idWeaponCuAnhMoi){
    if(idWeaponCuAnhMoi.length===0){
      console.log('không tìm thấy tên cũ: ' + req.query.idWeaponCu)
    }
    else{
      console.log('đã tìm thấy câu hỏi tên cũ: '+req.query.idWeaponCu+' và tạo ảnh mới: '+req.query.anhWeaponMoi)
      
      weaponModel.find({}, function(err, timWeapon){
          res.json(timWeapon)
      })
    }
  })
});

gantzRoutes.route('/weapon/change/').get(function(req, res) {
  console.log('đã nhận câu hỏi tên để change: ' + req.query.name1 + ' sang ' + req.query.name2 + ' và ' + req.query.name2 + ' sang ' + req.query.name1)



  weaponModel.find({$or:[{name: req.query.name1}, {name: req.query.name2}]}, function(err, ketQuaWeapon){
    if(ketQuaWeapon.length===0){
      console.log('không tìm thấy tên: ' + req.query.name1 + ' và ' + req.query.name2)
    }
    else{
      console.log('đã tìm thấy câu hỏi 2 anh: ' + ketQuaWeapon[0].image + ketQuaWeapon[1].image)

      weaponModel.findOneAndUpdate({name: req.query.name1} , {image: ketQuaWeapon[1].image}, function(err, ketQuaTimTen1){
        if(ketQuaTimTen1.length===0){
          console.log('không tìm thấy tên cũ: ' + req.query.name1)
        }
        else{
          console.log('đã tìm thấy câu hỏi tên: '+req.query.name1+' và tạo ảnh mới: '+ketQuaWeapon[1].image)
        }
      })

      weaponModel.findOneAndUpdate({name: req.query.name2} , {image: ketQuaWeapon[0].image}, function(err, ketQuaTimTen2){
        if(ketQuaTimTen2.length===0){
          console.log('không tìm thấy tên cũ: ' + req.query.name2)
        }
        else{
          console.log('đã tìm thấy câu hỏi tên: '+req.query.name2+' và tạo ảnh mới: '+ketQuaWeapon[0].image)
        }
      })

      weaponModel.find({}, function(err, timWeapon){
          res.json(timWeapon)
      })

    }
  })


})


gantzRoutes.route('/vampire/xoa/').get(function(req, res) {
  let id = req.query.id;
  vampireModel.findByIdAndDelete(id, function (err) {
    if (err) {
      console.log(err);
    }
    else {
      console.log('đã xóa ' + id);
      vampireModel.find({}, function(err, ketQuaTimVampire){
        res.json(ketQuaTimVampire)
      })
    }
  });
});