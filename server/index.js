require('dotenv').config()
const {ApolloServer} = require('apollo-server');
const colors = require('colors');
const connectDB = require('././config/db');
const { typeDefs } = require('./schema/type-def');
const { resolvers } = require('./schema/resolver');
connectDB();
const server = new ApolloServer({typeDefs, resolvers})
server.listen().then(({url}) => {
    console.log(`YOUR API IS RUNNING AT: ${url}`)
});