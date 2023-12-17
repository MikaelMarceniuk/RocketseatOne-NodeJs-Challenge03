import fastify, { FastifyInstance } from "fastify"
import fastifyJwt from "@fastify/jwt"
import env from "@config/env"
import userRouter from "./http/controllers/user/router"

class App {
  app: FastifyInstance

  async init() {
    this.app = fastify()
    await this.loadMiddlewares()
    await this.loadRoutes()
  }

  async listen() {
    await this.app.listen({ port: env.PORT })
    console.log("====== HttpServer is up and running ======")
  }

  async loadMiddlewares() {
    await this.app.register(fastifyJwt, { secret: env.JWT_SECRET })
  }

  async loadRoutes() {
    this.app.get("/api", (_, reply) => reply.send("Hello World!"))

    this.app.register(userRouter, { prefix: "/api/user" })
  }
}

export default App
