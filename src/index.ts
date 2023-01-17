import "reflect-metadata";
import "./db";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import express from "express";
import cors from "cors";
import { json } from "body-parser";
import { buildSchema } from "type-graphql";
import { RegisterResolver } from "./modules/user/Register";

const app = express();
const main = async () => {
  try {
    const schema = await buildSchema({
      resolvers: [RegisterResolver],
    });
    const apolloServer = new ApolloServer({ schema });
    await apolloServer.start();

    app.use("/graphql", cors(), json(), expressMiddleware(apolloServer));
  } catch (error) {
    console.error(error);
  }

  app.listen(4000, () => {
    console.log("Server is up on port 4000");
  });
};

main();
