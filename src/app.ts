import fastify, { FastifyInstance } from "fastify"
import env from "@config/env"

class App {
  app: FastifyInstance

  async init() {
    this.app = fastify()
    this.app.get("/api", (_, reply) => reply.send("Hello World!"))
  }

  async listen() {
    await this.app.listen({ port: env.PORT })
    console.log("====== HttpServer is up and running ======")
  }
}

export default App
