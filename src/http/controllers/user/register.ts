import makeCreateUserUseCase from "@useCases/factories/makeCreateUserUseCase"
import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"

const registerUserController = async (
  req: FastifyRequest,
  rep: FastifyReply
) => {
  const userSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
    role: z.enum(["ORG_ADMIN", "MEMBER"]),
  })

  const parsedBody = userSchema.parse(req.body)

  await makeCreateUserUseCase().execute(parsedBody)

  rep.statusCode = 201
  rep.send()
}

export default registerUserController
