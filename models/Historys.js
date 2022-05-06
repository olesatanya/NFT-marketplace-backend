const mongoose = require('mongoose')
const Schema = mongoose.Schema

const History_Schema = new Schema({
  account: { type: String, default: '' },
  nftid: { type: String, default: '' },
  url: { type: String, default: '' },
  registation: { type: Number, default: 0},
  event: { type: String, default: '' },
  price: { type: Number, default: '' },
  from: { type: String, default: '' },
  fromname: { type: String, default: '' },
  to: { type: String, default: '' },
  toname: { type: String, default: '' },
  note: { type: String, default: '' }
})

const HistoryModal = mongoose.model('Historydata', History_Schema)
module.exports = { HistoryModal }
