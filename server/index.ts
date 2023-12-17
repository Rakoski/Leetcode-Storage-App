import express from 'express';
import bodyParser from 'body-parser';
import { graphqlHTTP } from 'express-graphql';
import { buildSchema, GraphQLSchema } from 'graphql';

const app = express();

app.use(bodyParser.json());

const events = [];

// ! means it will never be able to be null (not null)
const schema: GraphQLSchema = buildSchema(`
  type Event {
    _id: ID!
    title: String!
    description: String!
    price: Float!
    date: String!
  }
  
  input EventInput {
    title: String!
    description: String!
    price: Float!
    date: String!
  }

  type RootQuery {
    events: [Event!]!
  }

  type RootMutation {
     createEvent(eventInput: EventInput): Event
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
            return events;
        },
        createEvent: (args: {eventInput: { title: string; description: string; price: number }}) => {
            const event = {
                _id: Math.random().toString(),
                title: args.eventInput.title,
                description: args.eventInput.description,
                price: +args.eventInput.price,
                date: new Date().toISOString()
            };
            events.push(event);
            return event;
        },
    },
    graphiql: true,
}));

app.listen(4000, () => {
    console.log('Server is running on http://localhost:4000/graphql');
});
