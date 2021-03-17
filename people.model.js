const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//tạo 1 Schema Model (giả)
let PeopleModel = new Schema(
  {
    name: String,
    species:[String],
    gender: String,
    love: String,
    image: String,
  },
  {collection: 'people'}          //tên của collection trong MongoDB
);
PeopleModel.index({name:'text', image:'text'})
module.exports = mongoose.model('people', PeopleModel);