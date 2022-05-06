
const EventControler = require('./controllers/eventController');


const {Launchpad, provider} = require('./contracts');
const { ethers } = require('ethers');
const BigNumber = ethers.BigNumber;

const handleEvent =  () => {
    console.log("Event Subscribe Started")
    setInterval(async () => {
        const pools = await EventControler.getPoolsList();
        const name = await Launchpad.connect(provider).NAME();
        for(var i=0; i<pools.length; i++) {
            const row = pools[i];
            const token = row['tokenAddress'];
            const decimals = row['token']['decimals'];
            if(token){
                let info = await Launchpad.getPoolInfo(token)
                let totalSold = Number(info['totalSold']) / 10**decimals;
                let closeTime = Number(info['closeTime']) * 1000;
                let withdrawTime = Number(info['withdrawTime']) * 1000;
                EventControler.updatePool(token, closeTime, withdrawTime, totalSold)
            }
        }
    }, 10000);
}

module.exports = {handleEvent}