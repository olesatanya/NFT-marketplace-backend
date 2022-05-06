const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Watchlist_Schema = new Schema({
  userid: { type: String, default: '' },
  registation: {type: Number, default: 0},
  collectionid: { type: String, default: '' }
})

const WatchlistModal = mongoose.model('Watchlistdata', Watchlist_Schema)
module.exports = { WatchlistModal }
