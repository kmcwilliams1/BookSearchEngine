const { Tech, Matchup } = require('../models');

const resolvers = {
  Query: {
    books: async (parent, { title }) => {
      const params = await title ? { title } : {};
      return Book.find(params);
    },
    me: async (parent, args, context) => {
      if (context.user) {
        return await User.findOne({ usernam: context.user.usernam }).populate('thoughts');
      }
      throw new AuthenticationError('You need to be logged in!');
    },
  },
  Mutation: {
    createUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    saveBook: async (parent, { thoughtText }, context) => {
      if (context.user) {
        const thought = await Thought.create({
          thoughtText,
          thoughtAuthor: context.user.username,
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },s
          { $addToSet: { thoughts: thought._id } }
        );

        return thought;
      }
      throw new AuthenticationError('You need to be logged in!');
    },

//     removeBook: async (parent, { thoughtId, commentId }, context) => {
//       if (context.user) {
//         return Thought.findOneAndUpdate(
//           { _id: thoughtId },
//           {
//             $pull: {
//               comments: {
//                 _id: commentId,
//                 commentAuthor: context.user.username,
//               },
//             },
//           },
//           { new: true }
//         );
//       }
//       throw new AuthenticationError('You need to be logged in!');
//     },
//   },
// };

module exports = resolvers
