const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Collection_Schema = new Schema({
    account: {type: String, default: ''} ,
    ownername: {type: String, default: ''} ,
    registation: {type: Number, default: 0} ,
    logoImg: { type: Number, default: 0 },
    bannerImg: { type: Number, default: 0 },
    featureImg: { type: Number, default: 0 },
    name: { type: String, default: '' },
    url: { type: String, default: '' },
    description: { type: String, default: '' },
    category: { type: Number, default: 0 },
    website: { type: String, default: '' },
    discord: { type: String, default: '' },
    instagram: { type: String, default: '' },
    medium: { type: String, default: '' },
    telegram: { type: String, default: '' },
    paytoken: { type: String, default: '' },    
    theme: {type: Number, default:1},
    items: {type: Number, default:0},
    owner: {type: Number, default:0},
    floorprice: {type: Number, default:0},
    volumeTraded: {type: Number, default:0},
    watchlists:  {type: Number, default:0}
})

const CollectionModal = mongoose.model('Collectiondata', Collection_Schema)
module.exports = { CollectionModal }
