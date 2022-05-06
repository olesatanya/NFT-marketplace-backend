require('dotenv').config();
const express = require('express')
const cors = require('cors');
const mongoose = require("mongoose");
const app = express()

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());



app.use('/api', require('./routes/api'))
app.use(express.static('public'));

process.on('uncaughtException', function (err) {
	// console.log(err);
});
process.on('uncaughtExceptionMonitor', (err, origin) => {
	console.log(err)	
});

// app.get('/*', function (req, res) {
// 	res.sendFile(__dirname + '/index.html', function (err) {
// 		if (err) {
// 			res.status(500).send(err)
// 		}
// 	})
// })


const mongourl = require("./config/config").mongoURI;

mongoose.connect(mongourl, {useUnifiedTopology: true,useNewUrlParser: true,}).then(() => {
	console.log("MongoDB Connected")
	const port = require("./config/config").port;
	app.listen(port, () => console.log(`Marketplace Server running on port ${port}`));
	// event_subscriber.handleEvent()
}).catch((err) => console.log(err));

