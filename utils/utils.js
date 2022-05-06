const cron = require("node-cron");

const handleEvent = async (props) => {
    const {
        id,
        provider,
        contract,
        event,
        times,
        handler,
        BlockNumController,
    } = props;

    var latestblocknumber;
    const handletransactions = async () => {
        try {
            let blockNumber = await provider.getBlockNumber();
            console.log(
                "handle transactions : ",
                latestblocknumber,
                blockNumber
            );
            if (blockNumber > latestblocknumber) {
                blockNumber =
                    blockNumber > latestblocknumber + 10
                        ? latestblocknumber + 10
                        : blockNumber;

                var txhistory = contract.queryFilter(
                    event,
                    latestblocknumber + 1,
                    blockNumber
                );
                await txhistory.then(async (res) => {
                    for (var index in res) {
                        handler(res[index], id);
                    }
                });
                latestblocknumber = blockNumber;

                await BlockNumController.update({
                    id: id,
                    latestBlock: blockNumber,
                });
            }
        } catch (err) {
            console.log("err", err);
        }
    };

    const handleEvent = async () => {
        try {
            var blockNumber = (await BlockNumController.find({ id: id }))
                .latestBlock;
            if (!blockNumber) throw new Error("not find");
        } catch (err) {
            blockNumber = await provider.getBlockNumber();
            await BlockNumController.create({
                id: id,
                latestBlock: blockNumber,
            });
        }
        latestblocknumber = blockNumber;
        cron.schedule(`*/${times} * * * * *`, () => {
            console.log(`running a transaction handle every ${times} second`);
            handletransactions();
        });
    };

    handleEvent();
};

module.exports = { handleEvent };
