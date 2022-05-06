const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Favourite_Schema = new Schema({
	userid: { type: String, default: '' },
	nftid: { type: String, default: '' },
	registation: {type: Number, default: 0}
})

const FavouriteModal = mongoose.model('Favouritedata', Favourite_Schema)
module.exports = { FavouriteModal }
