const mongoose = require('mongoose')
const Schema = mongoose.Schema

const User_Schema = new Schema({
  address: { type: String, default: '' },
  registation: {type: Number, default: 0},
  name: { type: String, default: '' },
  bio: { type: String, default: '' },
  email: { type: String, default: '' },
  instagram: { type: String, default: '' },
  website: { type: String, default: '' },
  twitter: { type: String, default: '' },
  avatar: { type: Number, default: 0 },
  banner: { type: Number, default: 0 },
  theme: { type: Number, default: 0 },
})

const UserModal = mongoose.model('Userdata', User_Schema)
module.exports = { UserModal }
