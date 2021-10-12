const { bookSchema, User } = require('../models');
const Book = require('../models/Book');

const resolvers = {
  Query: {
    user: async (parent, { username }, context) => {
      const params = await username ? { username } : {};
      return User.findOne(params);
    },
  },
  Mutation: {
    addUser: async (parent, { username, email, password }, context) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    saveBook: async (parent, { thoughtText }, context) => {
      if (context.user) {
        const thought = await Thought.create({
          thoughtText,
          thoughtAuthor: context.username,
        });

        await User.findOneAndUpdate(
          { _id: context.user._id }, 
          { $addToSet: { thoughts: thought._id } }
        );

        return thought;
      }
      throw new AuthenticationError('You need to be logged in!');
    },

  },
};

module.exports = resolvers
