import { Cell, CellType } from '../../db';
import { PubSub, withFilter } from 'graphql-subscriptions';
import { info } from 'winston';

export const pubsub = new PubSub();
export const resolvers = {
  Query: {
    async cellsByType(_, { type }) {
      const cells = await Cell.findByType(<CellType>type);
      return cells;
    },
  },

  Subscription: {
    newCell: {
      subscribe: withFilter(
        () => pubsub.asyncIterator('newCell'),
        (payload, args) => {
          return payload.newCell.type === args.type;
        }
      )
    }
  }
};

export default resolvers;