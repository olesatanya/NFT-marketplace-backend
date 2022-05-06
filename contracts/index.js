const { ethers } = require("ethers");
const ABI = require("./abis.json");

const supportChainId = 4;

const RPCS = {
    1: "http://13.59.118.124/eth",
    4: "https://rinkeby.infura.io/v3/5c9cebeb072b4640819e6397e75a3e3e",
    3: "https://ropsten.infura.io/v3/5c9cebeb072b4640819e6397e75a3e3e",
    250: "https://rpc.ftm.tools/",
    4002: "https://rpc.testnet.fantom.network",
    26: "https://mainnet-rpc.icicbchain.org",
    417: "https://testnet-rpc.icicbchain.org",
    1337: "http://localhost:7545",
    31337: "http://localhost:8545/"
}


const NFT = {
    1:"0x48481dbA5a58e4665Fbcd52fde4Ee08E9A18dd27",
    3:"0x48481dbA5a58e4665Fbcd52fde4Ee08E9A18dd27",
    4:"0x48481dbA5a58e4665Fbcd52fde4Ee08E9A18dd27",
    5:"0x48481dbA5a58e4665Fbcd52fde4Ee08E9A18dd27",
    6:"0x48481dbA5a58e4665Fbcd52fde4Ee08E9A18dd27",
    56:"0x48481dbA5a58e4665Fbcd52fde4Ee08E9A18dd27",
    97:"0x48481dbA5a58e4665Fbcd52fde4Ee08E9A18dd27",
    250:"0x48481dbA5a58e4665Fbcd52fde4Ee08E9A18dd27",
    4002:"0x48481dbA5a58e4665Fbcd52fde4Ee08E9A18dd27"
}

const Marketplace = {
    1:"0x48481dbA5a58e4665Fbcd52fde4Ee08E9A18dd27",
    3:"0x48481dbA5a58e4665Fbcd52fde4Ee08E9A18dd27",
    4:"0x48481dbA5a58e4665Fbcd52fde4Ee08E9A18dd27",
    5:"0x48481dbA5a58e4665Fbcd52fde4Ee08E9A18dd27",
    6:"0x48481dbA5a58e4665Fbcd52fde4Ee08E9A18dd27",
    56:"0x48481dbA5a58e4665Fbcd52fde4Ee08E9A18dd27",
    97:"0x48481dbA5a58e4665Fbcd52fde4Ee08E9A18dd27",
    250:"0x48481dbA5a58e4665Fbcd52fde4Ee08E9A18dd27",
    4002:"0x48481dbA5a58e4665Fbcd52fde4Ee08E9A18dd27"
}

const provider = new ethers.providers.JsonRpcProvider(RPCS[supportChainId])

const NFT_Provider = new ethers.Contract(
	NFT[supportChainId],
	ABI.NFT_ABI,
	provider
);

const Marketplace_Provider = new ethers.Contract(
	Marketplace[supportChainId],
	ABI.Marketplace_ABI,
	provider
);


module.exports = { provider, NFT_Provider, Marketplace_Provider};
