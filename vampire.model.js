const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//tạo 1 Schema Model (giả)
let VampireModel = new Schema(
  {
    name: String,
    species:[String],
    gender: String,
    image: String,
  },
  {collection: 'Vampire'}          //tên của collection trong MongoDB
);
VampireModel.index({name:'text', image:'text'})
module.exports = mongoose.model('Vampire', VampireModel);