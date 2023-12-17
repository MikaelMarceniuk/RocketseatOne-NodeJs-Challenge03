import { FastifyInstance } from "fastify"
import registerUserController from "./register"
import authUserController from "./auth"
import refreshToken from "./refreshToken"

const userRouter = async (app: FastifyInstance) => {
  app.post("/", registerUserController)
  app.post("/session", authUserController)
  app.patch("/session/refresh", refreshToken)
}

export default userRouter
