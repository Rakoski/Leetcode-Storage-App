import express from 'express';
import bodyParser from 'body-parser';
import {graphqlHTTP} from 'express-graphql';
import {buildSchema, GraphQLSchema} from 'graphql';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const Event = require('./models/event')

const app = express();

app.use(bodyParser.json());

// ! means it will never be able to be null (not null)
const schema: GraphQLSchema = buildSchema(`
  type Event {
    _id: ID!
    title: String!
    description: String!
    price: Float!
    date: String!
  }
  
  type User {
    _id: ID!
    email: String!
    password: String
  }
  
  input EventInput {
    title: String!
    description: String!
    price: Float!
    date: String!
  }
  
  input UserInput {
    email: String!
    password: String!
  }

  type RootQuery {
    events: [Event!]!
  }

  type RootMutation {
     createEvent(eventInput: EventInput): Event
     createUser(userInput: UserInput): User
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
            return Event.find()
                .then((events: object[]) => {
                    return events.map((event: { _doc: { _id: string }, _id: string }) =>
                        ({ ...event._doc, _id: event._doc._id.toString() }))
                })
                .catch((err: any) => {
                    console.error("Error fetching events:", err);
                    throw err;
                });
        },
        createEvent: (args: {eventInput:
                { title: string; description: string; price: number; date: string }
        }) => {
            const event = new Event({
                title: args.eventInput.title,
                description: args.eventInput.description,
                price: +args.eventInput.price,
                date: new Date(args.eventInput.date)
            });

            event.save().then((result: { _doc: { _id: string } }) => {
                console.log("Event saved successfully",
                    { doc: result._doc, _id: result._doc._id.toString() });
            }).catch((err: string) => {
                console.log("Error in saving an event: ", err);
                throw err
            });
            return event;

        },
    },
    graphiql: true,
}));

mongoose.connect(process.env.MONGODB_URI)
    .then(() => {app.listen(4000, () => {
        console.log('Server is running on http://localhost:4000/graphql');
    });
})
    .catch(err => {
    console.log("Error in MongoDB connection: ", err);
});
