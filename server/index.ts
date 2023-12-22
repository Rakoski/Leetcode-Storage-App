import express from 'express';
import bodyParser from 'body-parser';
import {graphqlHTTP} from 'express-graphql';
import {buildSchema, GraphQLSchema} from 'graphql';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';

dotenv.config();

const Problem = require('./models/problem')
const User = require('./models/user')

const app = express();

app.use(bodyParser.json());

// ! means it will never be able to be null (not null)
const schema: GraphQLSchema = buildSchema(`
  type Problem {
    _id: ID!
    title: String!
    level: String!
    description: String!
    frequency: Float!
    link: String!
    data_structure: String!
    date: String!
  }
  
  type User {
    _id: ID!
    email: String!
    password: String
  }
  
  input ProblemInput {
    title: String!
    level: String!
    description: String!
    frequency: Float!
    link: String!
    data_structure: String!
    date: String!
  }
  
  input UserInput {
    email: String!
    password: String!
  }

  type RootQuery {
    problems: [Problem!]!
  }

  type RootMutation {
     createProblem(problemInput: ProblemInput): Problem
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
        problems: () => {
            return Problem.find()
                .then((problems: object[]) => {
                    return problems.map((problem: { _doc: { _id: string }, _id: string }) =>
                        ({ ...problem._doc, _id: problem._doc._id.toString() }))
                })
                .catch((err: any) => {
                    console.error("Error fetching problems:", err);
                    throw err;
                });
        },
        createProblem: async (args: { problemInput: { title: string; description: string; level: string; frequency: number; link: string; data_structure: string; date: string } }) => {
            try {
                const { title, description, level, frequency, link, data_structure, date } = args.problemInput;

                const problem = new Problem({
                    title,
                    description,
                    level,
                    frequency,
                    link,
                    data_structure,
                    date: new Date(date),
                    creator: '658551a1b92599c7aedb9bd4',
                });

                const result = await problem.save();
                const user = await User.findById('658551a1b92599c7aedb9bd4');

                if (!user) {
                    throw new Error("User doesn't exist")
                }

                console.log("Problem saved successfully", { doc: result._doc, _id: result._doc._id.toString() });

                return {
                    _id: result._doc._id.toString(),
                    title: result._doc.title,
                    level: result._doc.level,
                    description: result._doc.description,
                    frequency: result._doc.frequency,
                    link: result._doc.link,
                    data_structure: result._doc.data_structure,
                    date: result._doc.date.toISOString(),
                    creator: user
                };
            } catch (err) {
                console.log("Error in saving a problem: ", err);
                throw err;
            }
        },
        createUser: async (args: {userInput: {email: string; password: string}}) => {
            try {
                const existingUser = await User.findOne({email: args.userInput.email});

                if (existingUser) {
                    return {
                        error: {
                            message: "User already exists!",
                            code: 'USER_ALREADY_EXISTS',
                        },
                    };
                }

                const hashedPassword = await bcrypt.hash(args.userInput.password, 12);
                const user = new User({
                    email: args.userInput.email,
                    password: hashedPassword
                });
                const result = await user.save();

                return {...result._doc, _id: result.id, password: null };
            } catch (err) {
                console.log("Error in createUser resolver: ", err);
                return {
                    error: {
                        message: "Error in creating user",
                        code: 'CREATE_USER_ERROR',
                    },
                };
            }
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
