const router = require('express').Router();
const multer = require('multer');

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
	const collection = req.body.collection;
	const response = await apiController.getCollections(collection)
	return res.send(response)
})

router.post('/get-my-collections', async (req, res) => {
	const account = req.body.account;
	const response = await apiController.getMyCollections(account)
	return res.send(response)
})
router.post('/create-collection', async (req, res) => {
	const account = req.body.account;
	const ownername = req.body.ownername;
	const logoImg = req.body.logoImg;
	const bannerImg = req.body.bannerImg;
	const featureImg = req.body.featureImg;
	const name = req.body.name;
	const url = req.body.url;
	const description = req.body.description;
	const category = req.body.category;
	const website = req.body.website;
	const discord = req.body.discord;
	const instagram = req.body.instagram;
	const medium = req.body.medium;
	const coins = req.body.coins;
	const theme = req.body.theme;
	const response = await apiController.createCollection(account, ownername, logoImg, bannerImg, featureImg, name, url, description, category, website, discord, instagram, medium, coins, theme)
	return res.send(response)
})
router.post('/update-collection', async (req, res) => {
	const collectionid = req.body.id;
	const account = req.body.account;
	const logoImg = req.body.logoImg;
	const bannerImg = req.body.bannerImg;
	const featureImg = req.body.featureImg;
	const name = req.body.name;
	const url = req.body.url;
	const description = req.body.description;
	const category = req.body.category;
	const website = req.body.website;
	const discord = req.body.discord;
	const instagram = req.body.instagram;
	const medium = req.body.medium;
	const coins = req.body.coins;
	const theme = req.body.theme;
	const response = await apiController.updateCollection(collectionid, account, logoImg, bannerImg, featureImg, name, url, description, category, website, discord, instagram, medium, telegram, coins, theme)
	return res.send(response)
})

router.post('/get-items', async (req, res) => {
	const keyword = req.body.keyword;
	const category = req.body.category;
	const onauction = req.body.onauction;
	const hasoffers = req.body.hasoffers;
	const buynow = req.body.buynow;
	const sort = req.body.sort;
	const min_usd = req.body.min_usd;
	const max_usd = req.body.max_usd;
	const response = await apiController.getItems(keyword, category, onauction, hasoffers,  buynow, sort, min_usd, max_usd)
	return res.send(response)
})
router.post('/add-item', async (req, res) => {
	const owner =req.body.owner;
	const ownername =req.body.ownername;
	const imgid =req.body.imgid;
	const name =req.body.name;
	const website =req.body.website;
	const description =req.body.description;
	const totalSupply =req.body.totalSupply;
	const properties =req.body.properties;
	const levels =req.body.levels;
	const stats =req.body.stats;
	const saletype =req.body.saletype;
	const saleend =req.body.saleend;
	const price =req.body.price;
	const usd =req.body.usd;
	const response = await apiController.addItem(owner, ownername, imgid, name, website, description, totalSupply, properties, levels, stats, saletype, saleend, price, usd)
	return res.send(response)
})

router.post('/set-item-info', async (req, res) => {
	const id =req.body.id;
	const name =req.body.name;
	const website =req.body.website;
	const description =req.body.description;
	const properties =req.body.properties;
	const levels =req.body.levels;
	const stats =req.body.stats;
	const saletype =req.body.saletype;
	const saleend =req.body.saleend;
	const price =req.body.price;
	const usd =req.body.usd;
	const response = await apiController.updateItem(id,  name, website, description,  properties, levels, stats, saletype, saleend, price, usd)
	return res.send(response)
})
router.post('/set-watchlist', async (req, res) => {
	const account = req.body.account;
	const collectionid = req.body.collectionid;
	const response = await apiController.setWatchlist(account, collectionid)
	return res.send(response)
})
router.post('/set-favourite', async (req, res) => {
	const account = req.body.account;
	const nftid = req.body.nftid;
	const response = await apiController.setFavourite(account, nftid);
	return res.send(response)
})
router.post('/view-item', async (req, res) => {
	const id = req.body.id;
	const response = await apiController.viewItem(id)
	return res.send(response)
})
router.post('/get-my-watchlist', async (req, res) => {
	const account = req.body.account;
	const response = await apiController.getMyWatchlist(account)
	return res.send(response)
})
router.post('/get-my-favourites', async (req, res) => {
	const account = req.body.account;
	const response = await apiController.getMyFavourite(account)
	return res.send(response)
})

router.post('/set-dark-mode', async (req, res) => {
	const account = req.body.account;
	const type = req.body.type;
	const response = await apiController.setDarkMode(account, type)
	return res.send(response)
})

router.post('/save-account', async (req, res) => {
	address, name, bio, email, instagram, website, twitter, avatar, banner, theme
	const address = req.body.address;
	const name = req.body.name;
	const bio = req.body.bio;
	const email = req.body.email;
	const instagram = req.body.instagram;
	const website = req.body.website;
	const twitter = req.body.twitter;
	const avatar = req.body.avatar;
	const banner = req.body.banner;
	const theme = req.body.theme;
	const response = await apiController.saveProfile(address, name, bio, email, instagram, website, twitter, avatar, banner, theme)
	return res.send(response)
})

router.post('/get-my-offers', async (req, res) => {
	const account = req.body.account;
	const response = await apiController.getMyOffers(account)
	return res.send(response)
})

router.post('/update-offer', async (req, res) => {
	const account = req.body.account;
	const nftid = req.body.nftid;
	const expire = req.body.expire;
	const price = req.body.price;
	const response = await apiController.updateOffer(account, nftid, expire, price)
	return res.send(response)
})

router.post('/get-my-transactions', async (req, res) => {
	const account = req.body.account;
	const response = await apiController.getMyTransactions(account)
	return res.send(response)
})

router.post('/login', async (req, res) => {
	const account = req.body.address;
	const response = await apiController.login(account)
	return res.send(response)
})


router.post('/get-stats', async (req, res) => {
	const category = req.body.category;
	const date = req.body.date;
	const response = await apiController.getStats(date, category)
	return res.send(response)
})

router.post('/upload-image', upload.single('file'),	async (req, res) => {
	if(!req.file){
		return res.send({id:'0.png'})
	}
	else {
		return res.send({id:req.file.filename})
	}
})
	
router.post('/make-buy-offer', async (req, res) => {
	const account = req.body.account;
	const nftid = req.body.nftid;
	const price = req.body.price;
	const expire = req.body.expire;
	const response = await apiController.makeBuyOffer(account, nftid, price, expire)
	return res.send(response)
})

router.post('/make-sell-offer', async (req, res) => {
	const account = req.body.account;
	const nftid = req.body.nftid;
	const price = req.body.price;
	const selltype = req.body.type;
	const response = await apiController.makeSellOffer(account, nftid, price, selltype)
	return res.send(response)
})

router.post('/set-auction-winner', async (req, res) => {
	const account = req.body.account;
	const price = req.body.price;
	const nftid = req.body.nftid;
	const response = await apiController.setAuctionWinner(account, price, nftid)
	return res.send(response)
})

router.post('/set-bid', async (req, res) => {
	const account = req.body.account;
	const price = req.body.price;
	const nftid = req.body.nftid;
	const response = await apiController.placeBid(account, price, nftid)
	return res.send(response)
})

router.post('/sell', async (req, res) => {
	const account = req.body.account;
	const nftid = req.body.nftid;
	const price = req.body.price;
	const to = req.body.buyer;
	const response = await apiController.sell(account, nftid, price, to)
	return res.send(response)
})

router.post('/buy', async (req, res) => {
	const account = req.body.account;
	const nftid = req.body.nftid;
	const price = req.body.price;
	const from = req.body.seller;
	const response = await apiController.buy(account, nftid, price, from)
	return res.send(response)
})

router.all('/*', async (req, res) => {
	return res.send({ error: 404, result: { msg: '404' } })
})

module.exports = router
