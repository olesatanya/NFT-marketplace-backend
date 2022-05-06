const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Offer_Schema = new Schema({
  userid: { type: String, default: '' },
  registation: {type: Number, default: 0},
  username: { type: String, default: '' },
  nftid: { type: String, default: '' },
  type: { type: Number, default:  1},  //buy, sell, bid
  expire: { type: Number, default: 1 },
  price: { type: Number, default: 0},
  state: { type: Number, default: 0}
})

const OfferModal = mongoose.model('Offerdata', Offer_Schema)
module.exports = { OfferModal }
