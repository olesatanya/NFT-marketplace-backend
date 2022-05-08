const NFT = require("../models/NFTs");
const apiController = require('../controllers/apiController');

const resolvers = {
    Query: {
        getCollectionNFTs: async (req, res) => {
            try {
                const collection = req.body.collection;
                const response = await apiController.getCollections(collection)
                res.send(response)
            } catch (error) {
                console.log(error)
                res.status(404).send({msg:'error'});
            }
        },
        getAllNFTs: async (req, res) => {
            try{
                const {keyword, category, onauction, hasoffers, buynow, sort, min_usd, max_usd} = req.body;
                const response = await apiController.getItems(keyword, category, onauction, hasoffers,  buynow, sort, min_usd, max_usd)
                res.send(response)
            }catch( error ){
                console.log(error)
                res.status(404).send({msg:'error'});
            }
        }
    },
};

module.exports = { resolvers };
