const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//tạo 1 Schema Model (giả)
let AlienModel = new Schema(
  {
    name: String,
    species:[String],
    image: String,
  },
  {collection: 'Alien'}          //tên của collection trong MongoDB
);
AlienModel.index({name:'text', image:'text'})
module.exports = mongoose.model('Alien', AlienModel);