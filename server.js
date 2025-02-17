const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const mongoose = require("mongoose");
const typeDefs = require("./schema/typeDefs");
const resolvers = require("./schema/resolvers");

const DB_CONNECTION = `mongodb+srv://enyouthree:0807989870Db@cluster0.f2ocl.mongodb.net/comp3133Assignment1?retryWrites=true&w=majority&appName=Cluster0`

const PORT = process.env.PORT || 4000;

// Connect Database
async function connectDB() {
  try {
    await mongoose.connect(DB_CONNECTION);
    console.log("Database connected");
  } catch (error) {
    console.error("Cannot connect to Database:", error);
    process.exit(1);
  }
}

const app = express();
app.use(express.json());
const server = new ApolloServer({ typeDefs, resolvers });

async function startServer() {
  await connectDB();
  await server.start();
  server.applyMiddleware({ app });

  app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}/graphql`));}

startServer();
