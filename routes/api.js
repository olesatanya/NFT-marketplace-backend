const router = require('express').Router();
const multer = require('multer');
const cloudinary = require("cloudinary").v2;

const config = require("../config/config.js");
cloudinary.config(config.cloudinary);


const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, 'upload/temp/')
	},
	filename: (req, file, cb) => {
		const filename = Math.floor(Math.random()*1000000000)+".png";
		cb(null, filename)
	},
})

const upload = multer({ storage: storage })

const apiController = require('../controllers/apiController.js')

router.post('/get-collections', async (req, res) => {
	try {
		const collection = req.body.collection;
		const response = await apiController.getCollections(collection)
		res.send(response)
	} catch (error) {
		console.log(error)
		res.status(404).send({msg:'error'});
	}
})

router.post('/get-my-collections', async (req, res) => {
	try {
		const account = req.body.account;
		const response = await apiController.getMyCollections(account)
		res.send(response)
	} catch ( error ) {
		console.log(error)
		res.status(404).send({msg:'error'});
	}
})
router.post('/create-collection', async (req, res) => {
	try {
		const {account, ownername, logoImg, bannerImg, featureImg, name, url, description, category, website, discord, instagram, medium, coins, theme} = req.body;
		const response = await apiController.createCollection(account, ownername, logoImg, bannerImg, featureImg, name, url, description, category, website, discord, instagram, medium, coins, theme)
		res.send(response)
	} catch ( error ) {
		console.log(error)
		res.status(404).send({msg:'error'});
	}
})
router.post('/update-collection', async (req, res) => {
	try {
		const {collectionid, account, logoImg, bannerImg, featureImg, name, url, description, category, website, discord, instagram, medium, coins, theme} = req.body;
		const response = await apiController.updateCollection(collectionid, account, logoImg, bannerImg, featureImg, name, url, description, category, website, discord, instagram, medium, telegram, coins, theme)
		res.send(response)
	}catch (error) {
		console.log(error)
		res.status(404).send({msg:'error'});
	}
})

router.post('/get-items', async (req, res) => {
	try{
		const {keyword, category, onauction, hasoffers, buynow, sort, min_usd, max_usd} = req.body;
		const response = await apiController.getItems(keyword, category, onauction, hasoffers,  buynow, sort, min_usd, max_usd)
		res.send(response)
	}catch( error ){
		console.log(error)
		res.status(404).send({msg:'error'});
	}
})
router.post('/add-item', async (req, res) => {
	try{
		const { owner, ownername, imgid, name, website, description, totalSupply, properties, levels, stats, saletype, saleend, price, usd} = req.body;
		const response = await apiController.addItem(owner, ownername, imgid, name, website, description, totalSupply, properties, levels, stats, saletype, saleend, price, usd)
		res.send(response)
	}catch(error) {
		console.log(error)
		res.status(404).send({msg:'error'});
	}
})

router.post('/set-item-info', async (req, res) => {
	try{
		const {id, name, website, description, properties, levels, stats, saletype, saleend, price, usd} = req.body;
		const response = await apiController.updateItem(id,  name, website, description,  properties, levels, stats, saletype, saleend, price, usd)
		res.send(response)
	}
	catch(error){
		console.log(error)
		res.status(404).send({msg:'error'});
	}
})
router.post('/set-watchlist', async (req, res) => {
	try{
		const {account, collectionid} = req.body;
		const response = await apiController.setWatchlist(account, collectionid)
		res.send(response)
	}catch(error) {
		console.log(error)
		res.status(404).send({msg:'error'});
	}
})
router.post('/set-favourite', async (req, res) => {
	try{
		const {account, nftid} = req.body;
		const response = await apiController.setFavourite(account, nftid);
		res.send(response)
	}catch(error) {
		console.log(error)
		res.status(404).send({msg:'error'});
	}
})
router.post('/view-item', async (req, res) => {
	try{
		const {id} = req.body;
		const response = await apiController.viewItem(id)
		res.send(response)
	}catch(error) {
		console.log(error)
		res.status(404).send({msg:'error'});
	}
})
router.post('/get-my-watchlist', async (req, res) => {
	try{
		const {account} = req.body;
		const response = await apiController.getMyWatchlist(account)
		res.send(response)
	} catch (error){
		console.log(error)
		res.status(404).send({msg:'error'});
	}
})
router.post('/get-my-favourites', async (req, res) => {
	try {
		const {account} = req.body;
		const response = await apiController.getMyFavourite(account)
		res.send(response)	
	} catch(error) {
		console.log(error)
		res.status(404).send({msg:'error'});
	}
})

router.post('/set-dark-mode', async (req, res) => {
	try{
		const {account, type} = req.body;
		const response = await apiController.setDarkMode(account, type)
		res.send(response)
	} catch(error) {
		console.log(error)
		res.status(404).send({msg:'error'});
	}
})

router.post('/save-account', async (req, res) => {
	try {
		const { address, name, bio, email, instagram, website, twitter, avatar, banner, theme } = req.body
		const response = await apiController.saveProfile(address, name, bio, email, instagram, website, twitter, avatar, banner, theme)
		res.send(response)
	} catch (error) {
		console.log(error)
		res.status(404).send({msg:'error'});
	}
})

router.post('/get-my-offers', async (req, res) => {
	try {
		const {account} = req.body;
		const response = await apiController.getMyOffers(account)
		res.send(response)
	} catch( error ){
		console.log(error)
		res.status(404).send({msg:'error'});
	}
})

router.post('/update-offer', async (req, res) => {
	try{
		const {account, nftid, expire, price} = req.body;
		const response = await apiController.updateOffer(account, nftid, expire, price)
		res.send(response)
	} catch (error) {
		console.log(error)
		res.status(404).send({msg:'error'});
	}
})

router.post('/get-my-transactions', async (req, res) => {
	try {
		const {account} = req.body;
		const response = await apiController.getMyTransactions(account)
		res.send(response)
	} catch (error) {
		console.log(error)
		res.status(404).send({msg:'error'});
	}
})

router.post('/login', async (req, res) => {
	try {
		const {account} = req.body.address;
		const response = await apiController.login(account)
		res.send(response)
	} catch (error) {
		console.log(error)
		res.status(404).send({msg:'error'});
	}
})


router.post('/get-stats', async (req, res) => {
	try {
		const {category, date} = req.body;
		const response = await apiController.getStats(date, category)
		res.send(response)
	} catch (error) {
		console.log(error)
		res.status(404).send({msg:'error'});
	}
})

router.post('/upload-image', upload.single('file'),	async (req, res) => {
	try {
		if(!req.file){
			return res.send({id:'0.png'})
		}
		else {
			return res.send({id:req.file.filename})
		}
	} catch (error){
		console.log(error)
		res.status(404).send({msg:'error'});
	}
})
	
router.post('/make-buy-offer', async (req, res) => {
	try {
		const { account, username, nftid, price, expire } = req.body
		const response = await apiController.makeBuyOffer(account, username, nftid, price, expire)
		res.send(response)
	} catch (error) {
		console.log(error)
		res.status(404).send('');
	}
})

router.post('/make-sell-offer', async (req, res) => {
	try {
		const { account, nftid, price } = req.body
		const response = await apiController.makeSellOffer(account, nftid, price, selltype)
		res.send(response)
	} catch (error) {
		console.log(error)
		res.status(404).send({msg:'error'});
	}
})

router.post('/set-auction-winner', async (req, res) => {
	try {
		const {account, price, nftid} = req.body;
		const response = await apiController.setAuctionWinner(account, price, nftid)
		res.send(response)
	} catch (error) {
		console.log(error)
		res.status(404).send({msg:'error'});
	}
})

router.post('/set-bid', async (req, res) => {
	try {
		const {account, price, nftid} = req.body;
		const response = await apiController.placeBid(account, price, nftid)
		res.send(response)
	} catch (error) {
		console.log(error)
		res.status(404).send({msg:'error'});
	}
})

router.post('/sell', async (req, res) => {
	try {
		const {account, nftid, price, to} = req.body;
		const response = await apiController.sell(account, nftid, price, to)
		res.send(response)
	} catch (error) {
		console.log(error)
		res.status(404).send({msg:'error'});
	}
})

router.post('/buy', async (req, res) => {
	try {
		const {account, nftid, price, from} = req.body;
		const response = await apiController.buy(account, nftid, price, from)
		res.send(response)
	} catch (error) {
		console.log(error)
		res.status(404).send({msg:'error'});
	}
})

router.all('/*', async (req, res) => {
	try {
		res.send({ error: 404, result: { msg: '404' } })	
	} catch (error) {
		console.log(error)
		res.status(404).send({msg:'error'});
	}
})

module.exports = router
