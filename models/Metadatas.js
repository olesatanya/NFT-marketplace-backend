const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Metadata_Schema = new Schema({
  owner:  { type: String, default: '' },
  nftid:  { type: String, default: '' },
  type:  {type: Number, default:0},
  filehash: { type: String, default: '' }
})

const MetadataModal = mongoose.model('Metadatadata', Metadata_Schema)
module.exports = { MetadataModal }
