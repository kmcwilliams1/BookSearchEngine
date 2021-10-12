const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID!
    username: String!
    email: String!
    bookCount: String!
    password: String!
    savedBooks: [Book]
  }

  type Book {
    bookId: ID!
    authors: [String]
    description: String!
    image: String
    link: String
    title: String!
  }

  input NewBook{
    bookId: ID!
    authors: String!
    description: String!
    image: String
    link: String
    title: String!
  }

  type Auth {
    token: ID!
    user: User
  }

  
  type Query {
    me: User
  }


  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    saveBook(NewBook: NewBook!): User
    login(email:String! password:String!): Auth
    removeBook(bookId: String!): User
  }
`;

module.exports = typeDefs;
