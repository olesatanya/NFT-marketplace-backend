require('dotenv').config();
const express = require('express')
const cors = require('cors');
const mongoose = require("mongoose");
const { ApolloServer } = require("apollo-server-express");
const app = express()
const config = require("./config/config");
const { typeDefs } = require("./graphql/graphql");
const { resolvers } = require("./graphql");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use('/api', require('./routes/api'))
app.use(express.static('public'));

process.on('uncaughtException', function (err) {
	
});
process.on('uncaughtExceptionMonitor', (err, origin) => {
	console.log(err)	
});

const mongourl = config.mongoURI;

mongoose.connect(mongourl, {useUnifiedTopology: true,useNewUrlParser: true,}).then(() => {
	console.log("MongoDB Connected")
		
	const startApolloServer = async (typeDefs, resolvers) => {
		const server = new ApolloServer({ typeDefs, resolvers });
		await server.start();
		server.applyMiddleware({ app, path: "/graphql" });
		console.log("GraphQL server running")
		const PORT = config.port || 80;
		app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
	};

	startApolloServer(typeDefs, resolvers);
}).catch((err) => console.log(err));


