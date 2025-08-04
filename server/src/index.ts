import { expressMiddleware } from '@as-integrations/express5';
import http from "http";
// import cors from 'cors';
import createApolloGraphqlServer from "./graphql";
// import dotenv from 'dotenv';
// import { verifyToken } from './utils/jwt';
// import express, { Request, Response } from 'express';
import express from "express";

// dotenv.config();

async function main() {
  const app = express();
  const httpServer = http.createServer(app);

  app.use(express.json());
  //   app.use(
  //     cors({
  //       origin: 'http://localhost:3000',
  //       credentials: true,
  //       methods: ['GET', 'POST', 'OPTIONS'],
  //       allowedHeaders: ['Content-Type', 'Authorization'],
  //     })
  //   );

  //   app.use(cookieParser());

  //   app.use('/', abblyToken);

  app.use("/graphql", expressMiddleware(await createApolloGraphqlServer()));

  app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err);
  res.status(err.status || 500).json({
    message: err.message || "Something went wrong",
  });
});


  await new Promise<void>((resolve) =>
    httpServer.listen({ port: 3001 }, resolve)
  );
  console.log(`🚀 Server ready at http://localhost:3001/`);
}

main();
