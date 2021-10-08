const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    username: String!
    email: String!
    password: String!
    username: String!
    savedBooks: [Book]
  }

  type Book {
    _id: ID!
    authors: String!
    description: String!
    bookId: String!
    image: String
    link: String
    title: String!
  }

  type Auth {
    token: ID!
    user: User
  }

  
  type Query {
    books: [Book]
    me: User
  }


  type Mutation {
    createUser(username: String!, email: String!, password: String!): Auth
    saveBook()
  }
`;

module.exports = typeDefs;
