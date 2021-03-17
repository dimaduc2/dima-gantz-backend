const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//tạo 1 Schema Model (giả)
let WeaponModel = new Schema(
  {
    name: String,
    image: String,
  },
  {collection: 'Weapon'}          //tên của collection trong MongoDB
);
WeaponModel.index({name:'text', image:'text'})
module.exports = mongoose.model('Weapon', WeaponModel);