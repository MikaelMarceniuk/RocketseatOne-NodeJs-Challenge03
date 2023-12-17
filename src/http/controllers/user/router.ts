import { FastifyInstance } from "fastify"
import registerUserController from "./register"
import authUserController from "./auth"

const userRouter = async (app: FastifyInstance) => {
  app.post("/", registerUserController)
  app.post("/session", authUserController)
}

export default userRouter
