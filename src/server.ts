import { Server } from "http";

import mongoose from "mongoose";
import { app } from "./app";
import { promise } from "zod";

let server: Server;

const startServer = () => {
  try {
    mongoose.connect(
      `${process.env.DATABASE_URL}`
    );

    console.log("Mongodb connected");

    server = app.listen(5000, () => {
      console.log("The server is running on the port 5000");
    });
  } catch (err) {
    console.log(err);
  }
};
startServer();

process.on("SIGTERM", () => {
  console.log("Signal termination error ...shut down");
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});

process.on("SIGINT", () => {
  console.log("Signal termination error by author ...shut down");
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});

process.on("unhandledRejection", (err)=>{
    console.log("UnhandeldedRejection... shut down...", err)
    if(server){
        server.close(()=>{
            process.exit(1)
        })
    }
    process.exit(1)
})

process.on("uncaughtException", (err)=>{
    console.log("uncaughtException error ...shut down", err)
    if(server){
        server.close(()=>{
            process.exit(1)
        })
    }
    process.exit(1)
})



