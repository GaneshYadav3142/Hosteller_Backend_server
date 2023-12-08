const { gql } = require('apollo-server-express');

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


