import { FastifyInstance } from "fastify"
import registerUserController from "./register"

const userRouter = async (app: FastifyInstance) => {
  app.post("/", registerUserController)
}

export default userRouter
