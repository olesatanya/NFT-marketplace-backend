const mongoose = require('mongoose')
const Schema = mongoose.Schema

const NFT_Schema = new Schema({
	owner: { type: String, default: '' },
	ownername: { type: String, default: '' },
	creater: { type: String, default: '' },
	creatername: { type: String, default: '' },
	registation: {type:Number, default:0},
	imgid: { type: String, default: '' },
	metadataid: { type: String, default: '' },
	name: { type: String, default: '' },
	sitelink: { type: String, default: '' },
	description: { type: String, default: '' },
	favourites: {type: Number, default: 0},
	views: {type: Number, default: 0},
	totalSupply: {type: Number, default: 1},
	properties: {type: Object, default: ''},
	levels: { type: Object, default: '' },
	stats: { type: Object, default: '' },
	offers:{ type: Number, default: 0},
	saletype: { type: Number, default: 0 },  //0 : no sale  //1:listed 2: auction
	saleend: {type: Number, default: 0},
	price: {type: Number, default: 0},
	usd: {type: Number, default: 0},
})

const NFTModal = mongoose.model('NFTdata', NFT_Schema)
module.exports = { NFTModal }
