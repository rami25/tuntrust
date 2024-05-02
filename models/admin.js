const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
  login:{
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  certifs : [{
    type : mongoose.Types.ObjectId,
    ref : 'Certif'
  }],
  comments : [{
    type : mongoose.Types.ObjectId,
    ref : 'Comment'
  }]
});

const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;