require('dotenv').config()

const { CollectionModal } = require('../models/Collections')
const { NFTModal } = require('../models/NFTs')
const { FavouriteModal } = require('../models/Favourites')
const { WatchlistModal } = require('../models/Watchlists')
const { OfferModal } = require('../models/Offers')
const { UserModal } = require('../models/Users')
const { MetadataModal } = require('../models/Metadatas')
const { StatsModal } = require('../models/Stats')
const { LogModal } = require('../models/Historys')

const getCollections = async (category) => {
	try {
		var rows = await CollectionModal.find(category===0?{}:{category: category}).sort({registation: 1})
		return { error: 0, result: rows }
	} catch (ex) {
		console.log(ex) 
		return { error: 1, msg: "error" }
	}
}


const getMyCollections = async (account) => {
	try {
		var rows = await CollectionModal.find({account: account}).sort({registation: 1})
		return { error: 0, result: rows }
	} catch (ex) {
		console.log(ex) 
		return { error: 1, msg: "error" }
	}
}

const createCollection = async (account, ownername, logoImg, bannerImg, featureImg, name, url, description, category, website, discord, instagram, medium, coins, theme) => {
	try {
		const collection = {
			account: account,
			ownername: ownername,
			registation: new Date().getTime(),
			logoImg: logoImg,
			bannerImg: bannerImg,
			featureImg: featureImg,
			name: name,
			url: url,
			description: description,
			category: category,
			website: website,
			discord: discord,
			instagram: instagram,
			medium: medium,
			telegram: telegram,
			paytoken: coins,
			theme: theme,
			items: 0,
			owner: account,
			floorprice: 0,
			volumeTraded: 0,
			watchlists:  0
		}
		const instance = new CollectionModal(collection);
		var res = await instance.save()
		var bannerpath1 =  path.resolve(__dirname, "../upload/temp/" + bannerImg);
		var logopath1 =  path.resolve(__dirname, "../upload/temp/" + logoImg);
		var featurepath1 =  path.resolve(__dirname, "../upload/temp/" + featureImg);
		var bannerpath2 =  path.resolve(__dirname, "../upload/banner/" + bannerImg);
		var logopath2 =  path.resolve(__dirname, "../upload/temp/" + logoImg);
		var featurepath2 =  path.resolve(__dirname, "../upload/logo/" + featureImg);
		await fs.renameSync(logopath1, logopath2);
		await fs.renameSync(bannerpath1, bannerpath2);
		await fs.renameSync(featurepath1, featurepath2);
		return { error: 0, msg: 'success', result: res }
	} catch (ex) {
		console.log(ex) 
		return { error: 1, msg: "error" }
	}
}

const updateCollection = async (collectionid, account, logoImg, bannerImg, featureImg, name, url, description, category, website, discord, instagram, medium, telegram, coins, theme) => {
	try {
		await CollectionModal.updateOne({id:collectionid, account : account}, {$set : {logoImg:logoImg, bannerImg:bannerImg, featureImg:featureImg, name: name, url: url, description: description, category: category, website: website, discord: discord, instagram: instagram, medium: medium, telegram: telegram, coins:coins, theme:theme}});
		var bannerpath1 =  path.resolve(__dirname, "../upload/temp/" + bannerImg);
		var logopath1 =  path.resolve(__dirname, "../upload/temp/" + logoImg);
		var featurepath1 =  path.resolve(__dirname, "../upload/temp/" + featureImg);
		var bannerpath2 =  path.resolve(__dirname, "../upload/banner/" + bannerImg);
		var logopath2 =  path.resolve(__dirname, "../upload/temp/" + logoImg);
		var featurepath2 =  path.resolve(__dirname, "../upload/logo/" + featureImg);
		await fs.renameSync(logopath1, logopath2);
		await fs.renameSync(bannerpath1, bannerpath2);
		await fs.renameSync(featurepath1, featurepath2);
		return { error: 0, msg: 'success', result: res }
	} catch (ex) {
		console.log(ex) 
		return { error: 1, msg: "error" }
	}
}

const getItems = async (keyword, category, onauction, hasoffers, buynow, sort, min_usd, max_usd) => {
	try {
		var filter = {};
		var sorttype = {};
		if(keyword!=='' && keyword !== null) filter['name'] = { $regex : '.*'+ keyword + '.*' };
		if(category!==0) filter['category'] = category;
		if(onauction!==0) filter['saletype'] = 1;
		if(hasoffers!==0) filter['offers'] > 0;
		if(buynow!==0) filter['saletype'] = 0;
		if(min_usd!==0) filter['usd'] > min_usd;
		if(max_usd!==0) filter['usd'] < max_usd;
		if(sort!==0 && sort !== '' && sort !== null){
			sorttype[sort] = 1;
		}
		var rows = await NFTModal.find(filter).sort(sorttype)
		return { error: 0, result: rows }
	} catch (ex) {
		console.log(ex) 
		return { error: 1, msg: "error" }
	}
}

const addItem = async (owner, ownername, imgid, name, website, description, totalSupply, properties, levels, stats, saletype, saleend, price, usd) => {
	try {
		const collection = {
			owner:  owner,
			ownername: ownername,
			creater: owner,
			creatername: ownername,
			registation: new Date().getTime(),
			imgid: imgid,
			metadataid: '',
			name: name,
			sitelink: website,
			description: description,
			favourites: 0,
			views: 0,
			totalSupply: totalSupply,
			properties: properties,
			levels: levels,
			stats: stats,
			offers:0,
			saletype: saletype,
			saleend: saleend,
			price: price,
			usd: usd
		}
		const instance = new NFTModal(collection);
		var res = await instance.save()
		return { error: 0, msg: 'success', result: res }
	} catch (ex) {
		console.log(ex) 
		return { error: 1, msg: "error" }
	}
}


const updateItem = async (id,  name, website, description,  properties, levels, stats, saletype, saleend, price, usd) => {
	try {
		await CollectionModal.updateOne({id:id}, {$set : {name:name, website: website, description: description, properties:properties, levels: levels, stats: stats, saletype: saletype, saleend: saleend, price: price, usd:usd}});
		return { error: 0, msg: 'success'}
	} catch (ex) {
		console.log(ex) 
		return { error: 1, msg: "error" }
	}
}

const setWatchlist = async(account, collectionid) => {
	try {
		var rows = await WatchlistModal.find({ userid: account, collectionid:collectionid})
		if(rows.length > 0) {
			await WatchlistModal.deleteMany({userid:account, collectionid:collectionid});
			await CollectionModal.updateOne({_id: collectionid}, {$set : {watchlists: watchlists-1}})
		} else {
			const instance = new WatchlistModal({userid: account, collectionid: collectionid, registation: new Date().getTime()});
			await instance.save()
			await CollectionModal.updateOne({_id: collectionid}, {$set : {watchlists: watchlists+1}})
		}
		return { error: 0, msg: 'success'}
	} catch(ex){
		return { error: 1, msg: "error" }
	}
}


const setFavourite = async(account, nftid) => {
	try {
		var rows = await FavouriteModal.find({ userid: account, nftid:nftid})
		if(rows.length > 0) {
			await FavouriteModal.deleteMany({userid:account, nftid:nftid});
			await NFTModal.updateOne({_id: nftid}, {$set : {favourites: favourites-1}})
		} else {
			const instance = new favourites({userid: account, nftid: nftid, registation: new Date().getTime()});
			await instance.save()
			await NFTModal.updateOne({_id: nftid}, {$set : {favourites: favourites+1}})
		}
		return { error: 0, msg: 'success'}
	} catch(ex){
		return { error: 1, msg: "error" }
	}
}

const viewItem = async (id) => {
	try {
		var rows = await NFTModal.find({_id: id});
		await NFTModal.updateOne({_id:id}, {$set: {views: views+1}})
		return { error: 0, result: rows }
	} catch (ex) {
		console.log(ex) 
		return { error: 1, msg: "error" }
	}
}
const viewCollection = async (id) => {
	try {
		var rows = await CollectionModal.find({_id: id});
		return { error: 0, result: rows }
	} catch (ex) {
		console.log(ex) 
		return { error: 1, msg: "error" }
	}
}

const getMyWatchlist = async (account) => {
	try {
		var rows = await WatchlistModal.find({userid: account});
		var lists = [];
		if(rows.length > 0){
			for(var i= 0; i<rows.length; i++){
				var collection = rows[i]['collectionid'];
				var info = await viewCollection(collection);
				info = info.result[0];
				lists.push(info);
			}
		}
		return { error: 0, result: lists}
	} catch (ex) {
		console.log(ex) 
		return { error: 1, msg: "error" }
	}
}

const getMyFavourite = async (account) => {
	try {
		var rows = await FavouriteModal.find({userid: account});
		var lists = [];
		if(rows.length > 0){
			for(var i= 0; i<rows.length; i++){
				var item = rows[i]['nftid'];
				var info = await viewItem(item);
				info = info.result[0];
				lists.push(info);
			}
		}
		return { error: 0, result: lists}
	} catch (ex) {
		console.log(ex) 
		return { error: 1, msg: "error" }
	}
}

const setDarkMode = async(account, type) => {
	try {
		await NFTModal.updateOne({address: account}, {$set : {theme: type}})
		return { error: 0, msg: 'success'}
	} catch(ex){
		return { error: 1, msg: "error" }
	}
}
const saveProfile = async(address, name, bio, email, instagram, website, twitter, avatar, banner, theme) => {
	try {
		var rows = await UserModal.find({address: account});
		if(rows.length > 0) {
			await UserModal.updateOne({address: address}, {$set : {name: name, bio:bio, email:email, instagram:instagram, website:website, twitter:twitter, avatar:avatar, banner:banner, theme:theme}})
			var avatarPath1 =  path.resolve(__dirname, "../upload/temp/" + avatar);
			var bannerPath1 =  path.resolve(__dirname, "../upload/temp/" + banner);
			var avatarPath2 =  path.resolve(__dirname, "../upload/user/avatar/" + avatar);
			var bannerPath2 =  path.resolve(__dirname, "../upload/user/banner/" + banner);
			
		} else {
			const collection = {
				address: address,
				registation: new Date().getTime(),
				name: name,
				bio: bio,
				email: email,
				instgram: instagram,
				website: website,
				twitter: twitter,
				avatar: avatar,
				banner: banner,
				theme: theme
			}
			const instance = new UserModal(collection);
			await instance.save()
		}
		await fs.renameSync(avatarPath1, avatarPath2);
		await fs.renameSync(bannerPath1, bannerPath2);
		return { error: 0, msg: 'success'}
	} catch(ex){
		return { error: 1, msg: "error" }
	}
}

const getMyOffers = async (address) => {
	try {
		var rows = await OfferModal.find({userid: address});
		var lists = [];
		if(rows.length > 0){
			for(var i= 0; i<rows.length; i++){
				var nftinfo = rows[i]['nftid'];
				var info = await viewItem(nftinfo);
				info = info.result[0];
				lists.push(info);
			}
		}
		return { error: 0, result: lists}
	} catch (ex) {
		console.log(ex) 
		return { error: 1, msg: "error" }
	}
}

const getMyTransactions = async (address) => {
	try {
		var rows = await LogModal.find({account: address});
		return { error: 0, result: rows}
	} catch (ex) {
		console.log(ex) 
		return { error: 1, msg: "error" }
	}
}

const updateOffer = async( account, nftid, expire, price) => {
	try {
		await OfferModal.updateOne({userid: account, nftid: nftid}, {$set : {expire: expire, price: price}})
		return { error: 0, msg: 'success'}
	} catch(ex){
		return { error: 1, msg: "error" }
	}
}

const login = async (address) => {
	try {
		var rows = await UserModal.findOne({address: address});
		return { error: 0, result: rows}
	} catch (ex) {
		console.log(ex) 
		return { error: 1, msg: "error" }
	}
}
const getStats = async(date, category) => {
	try {
		var filter = {};
		if(category !== 0) filter['category'] = category;
		
		var rows = await StatsModal.find(filter);
		return { error: 0, result: rows}
	} catch (ex) {
		console.log(ex) 
		return { error: 1, msg: "error" }
	}
}

module.exports = {
	getCollections,
	getMyCollections,
	createCollection,
	updateCollection,
	getItems,
	addItem,
	updateItem,
	setWatchlist,
	setFavourite,
	viewItem,
	viewCollection,
	getMyWatchlist,
	getMyFavourite,
	setDarkMode,
	saveProfile,
	getMyOffers,
	updateOffer,
	getMyTransactions,
	login,
	getStats
}
