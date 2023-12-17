import InvalidCredentialsError from "@useCases/errors/invalidCredentialsError"
import makeAuthUserUseCase from "@useCases/factories/makeAuthUserUseCase"
import { FastifyRequest, FastifyReply } from "fastify"
import { z } from "zod"

const authUserController = async (req: FastifyRequest, rep: FastifyReply) => {
  const userSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { email, password } = userSchema.parse(req.body)

  try {
    await makeAuthUserUseCase().execute({ email, password })

    rep.status(200).send({ msg: "Authenticated" })
  } catch (e) {
    if (e instanceof InvalidCredentialsError) {
      rep.status(400).send({ message: e.message })
    }

    throw e
  }
}

export default authUserController
