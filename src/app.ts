import fastify, { FastifyInstance } from "fastify"
import env from "@config/env"
import userRouter from "./http/controllers/user/router"

class App {
  app: FastifyInstance

  async init() {
    this.app = fastify()
    this.app.get("/api", (_, reply) => reply.send("Hello World!"))
    await this.loadRoutes()
  }

  async listen() {
    await this.app.listen({ port: env.PORT })
    console.log("====== HttpServer is up and running ======")
  }

  async loadRoutes() {
    this.app.register(userRouter, { prefix: "/api/user" })
  }
}

export default App
