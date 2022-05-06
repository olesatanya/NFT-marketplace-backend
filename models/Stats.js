const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Stats_Schema = new Schema({
  account: { type: String, default: '' },
  collectionid: { type: String, default: '' },
  category: { type: Number, default: 0},
  url: { type: String, default: '' },
  registation: { type: Number, default: 0},
  event: { type: String, default: '' },
  items: { type: Number, default: 0},
  owners: { type: Number, default: 0},
})

const StatsModal = mongoose.model('Statsdata', Stats_Schema)
module.exports = { StatsModal }
