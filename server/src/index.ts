import express from 'express';
import bodyParser from 'body-parser';
import { graphqlHTTP } from 'express-graphql';
import { buildSchema, GraphQLSchema } from 'graphql';

const app = express();

app.use(bodyParser.json());

const schema: GraphQLSchema = buildSchema(`
  type RootQuery {
    events: [String!]!
  }

  type RootMutation {
     createEvent(name: String): String
  }

  schema {
    query: RootQuery
    mutation: RootMutation
  }
`);

app.use('/graphql', graphqlHTTP({
    schema,
    rootValue: {
        events: () => {
            return ['Cooking', 'Cleaning', 'Coding'];
        },
        createEvent: (args: { name: string }) => {
            return args.name;
        },
    },
    graphiql: true,
}));

app.listen(4000, () => {
    console.log('Server is running on http://localhost:4000/graphql');
});