const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
const mongoose = require('mongoose');
const dotenv=require("dotenv")
const cors=require("cors")
const Destination = require('./models/destinationSchema');
const Hostel = require('./models/hostelSchema');

const app = express();
require('dotenv').config();
app.use(cors())
console.log(process.env.MONGO_URL)
mongoose.connect(process.env.MONGO_URL);



 const typeDefs = gql`
  type Destination {
    _id: ID!
    name: String!
    image: String
  }

  type Hostel {
    _id: ID!
    name: String!
    image: String
    destination: Destination!
  }

  type Query {
    destinations: [Destination]
    hostelsByDestination(destinationId: ID!): [Hostel]
    hostelCountByDestination: [DestinationCount]
  }

  type DestinationCount {
    destination: Destination!
    count: Int!
  }

  type Mutation {
    addDestination(name: String!, image: String): Destination
    addHostel(name: String!, image: String, destinationId: ID!): Hostel
  }
`



  
const resolvers = {
  Query: {
    destinations: async () => {
      return await Destination.find();
    },
    hostelsByDestination: async (_, { destinationId }) => {
      return await Hostel.find({ destination: destinationId });
    },
    hostelCountByDestination: async () => {
      const destinations = await Destination.find();
      const counts = [];

      for (const destination of destinations) {
        const count = await Hostel.countDocuments({ destination: destination._id });
        counts.push({
          destination,
          count,
        });
      }

      return counts;
    },
  },

  Mutation: {
    addDestination: async (_, { name, image }) => {
      const newDestination = new Destination({ name, image });
      return await newDestination.save();
    },
    addHostel: async (_, { name, image, destinationId }) => {
      const newHostel = new Hostel({ name, image, destination: destinationId });
      return await newHostel.save();
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

async function startApolloServer() {
    await server.start();
  
    server.applyMiddleware({ app });
  
    const PORT = process.env.PORT || 8080;
  
    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}${server.graphqlPath}`);
    });
  }
  
  startApolloServer();