import { config, createSchema } from '@keystone-next/keystone/schema';
import 'dotenv/config';
import { createAuth } from '@keystone-next/auth';
import {
  withItemData,
  statelessSessions,
} from '@keystone-next/keystone/session';
import { User } from './schemas/User';
import { Product } from './schemas/Product';

const databaseURL =
  process.env.DATABASE_URL || 'mongodb://localhost/keystone-sick-fits-tutorial';

const sessionConfig = {
  maxAge: 60 * 60 * 24 * 360, // How long they stay signed in? setting when cookie/session expires
  secret: process.env.COOKIE_SECRET,
};

const { withAuth } = createAuth({
  listKey: 'User',
  identityField: 'email',
  secretField: 'password',
  initFirstItem: {
    fields: ['name', 'email', 'password'],
    // add initial roles
  },
});

export default withAuth(
  config({
    // server config
    server: {
      cors: {
        origin: [process.env.FRONTEND_URL],
        credentials: true,
      },
    },
    db: {
      adapter: 'mongoose',
      url: databaseURL,
      // TODO: Add data seeding here
    },
    lists: createSchema({
      User,
      Product,
    }),
    ui: {
      // Only show UI for people who have access
      isAccessAllowed: ({ session }) =>
        // console.log(session);
        !!session?.data, // if there is a session, if true ? theyre logged in..otherwise theyre not logged in
    },
    session: withItemData(statelessSessions(sessionConfig), {
      User: 'id name email',
    }),
  })
);
