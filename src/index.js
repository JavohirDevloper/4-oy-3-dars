import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { readFileSync } from "fs";

// 01_lesson
// import resolvers from './lesson/01_lesson.js';
// const typeDefs = readFileSync('./src/schema/01_lesson_schema.gql', 'utf8');

// 02_lesson
// import resolvers from './lesson/02_lesson.js';
// const typeDefs = readFileSync('./src/schema/02_lesson_schema.gql', 'utf8');

// 03_lesson
import resolvers from "./lesson/03_lesson.js";
const typeDefs = readFileSync("./src/schema/03_lesson_schema.gql", "utf8");

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

startStandaloneServer(server, { listen: { port: 8586 } }).then(({ url }) => {
  console.log(`Server is running on url: ${url}`);
});
